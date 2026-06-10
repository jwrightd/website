'use client';

import { AdaptiveDpr, Environment, Float, Lightformer, Sparkles, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import {
  Component,
  type ReactNode,
  type RefObject,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Vector2 } from 'three';
import type { Group, Mesh, MeshStandardMaterial } from 'three';

const SPIN_SPEED = 0.24; // rad/s — one full turn ≈ 26s
const REDUCED_SPIN_SPEED = 0.02;

/**
 * Sculpted Staunton knight (~11k tris) extracted from the Khronos glTF sample
 * asset "A Beautiful Game" — © 2020 ASWF (MaterialX Project, original model),
 * © 2022 Ed Mackey (glTF conversion), CC BY 4.0. Geometry plus the original
 * carved-detail normal map and ambient-occlusion map; the metallic material
 * below is ours.
 */
const KNIGHT_URL = '/models/knight.glb';
useGLTF.preload(KNIGHT_URL);

const PIECE_HEIGHT = 2.2; // world units, matching the previous hero framing

function KnightModel() {
  const { nodes, materials } = useGLTF(KNIGHT_URL);
  const geometry = (nodes.Knight as Mesh).geometry;
  // GLTFLoader wires the normal/AO textures with the right flip and color
  // space conventions; borrow the maps from its material for ours. Tolerate a
  // missing material so a stale cached GLB degrades to the plain finish
  // instead of killing the canvas.
  const sourceMaterial = materials.Knight as MeshStandardMaterial | undefined;

  // The source mesh is real-world scale (~10cm tall); normalize it so the
  // piece stands PIECE_HEIGHT tall with its base resting on the group origin.
  const { scale, yOffset, normalScale } = useMemo(() => {
    geometry.computeBoundingBox();
    const box = geometry.boundingBox!;
    const s = PIECE_HEIGHT / (box.max.y - box.min.y);
    // Push the carved detail (eyes, mouth, mane strands) a bit past authored
    // strength so it survives the dark metallic finish.
    const ns = sourceMaterial
      ? sourceMaterial.normalScale.clone().multiplyScalar(1.3)
      : new Vector2(1, 1);
    return { scale: s, yOffset: -box.min.y * s, normalScale: ns };
  }, [geometry, sourceMaterial]);

  return (
    <mesh geometry={geometry} scale={scale} position={[0, yOffset, 0]}>
      <meshStandardMaterial
        color="#9aa6ba"
        metalness={0.88}
        roughness={0.38}
        envMapIntensity={1.15}
        normalMap={sourceMaterial?.normalMap ?? null}
        normalScale={normalScale}
        aoMap={sourceMaterial?.aoMap ?? null}
        aoMapIntensity={1.1}
      />
    </mesh>
  );
}

interface DragState {
  active: boolean;
  /** Radians accumulated from pointer moves, consumed once per frame. */
  pendingDelta: number;
  /** Fling velocity (rad/s) at release; decays back to the ambient spin. */
  velocity: number;
  lastX: number;
  lastT: number;
}

function KnightPiece({
  reducedMotion,
  dragRef,
}: {
  reducedMotion: boolean;
  dragRef: RefObject<DragState>;
}) {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (document.hidden || !group) return;
    const d = dragRef.current;
    if (d.active) {
      group.rotation.y += d.pendingDelta;
      d.pendingDelta = 0;
    } else {
      d.velocity *= Math.exp(-2.6 * delta);
      const ambient = reducedMotion ? REDUCED_SPIN_SPEED : SPIN_SPEED;
      group.rotation.y += (ambient + d.velocity) * delta;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.08, 0]} rotation={[0, Math.PI / 5, 0]}>
      <KnightModel />
    </group>
  );
}

/** WebGL can fail (blocked contexts, exhausted GPU); fall back to the CSS glow behind the canvas. */
class KnightErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const RADS_PER_PIXEL = 0.011;
const MAX_FLING = 6; // rad/s

export default function SpinningKnight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lowPower, setLowPower] = useState(false);
  const dragRef = useRef<DragState>({
    active: false,
    pendingDelta: 0,
    velocity: 0,
    lastX: 0,
    lastT: 0,
  });

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia('(pointer: coarse)');
    const update = () => {
      setReducedMotion(motionQuery.matches);
      setLowPower(pointerQuery.matches);
    };
    const frame = requestAnimationFrame(update);
    motionQuery.addEventListener('change', update);
    pointerQuery.addEventListener('change', update);
    return () => {
      cancelAnimationFrame(frame);
      motionQuery.removeEventListener('change', update);
      pointerQuery.removeEventListener('change', update);
    };
  }, []);

  // Stop the render loop entirely once the hero is scrolled out of view.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '120px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      aria-hidden="true"
      // pan-y keeps vertical page scroll working on touch; horizontal drags rotate.
      style={{ touchAction: 'pan-y' }}
      onPointerDown={(e) => {
        const d = dragRef.current;
        d.active = true;
        d.pendingDelta = 0;
        d.velocity = 0;
        d.lastX = e.clientX;
        d.lastT = performance.now();
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          // Pointer capture is best-effort; drag still works while the cursor stays inside.
        }
      }}
      onPointerMove={(e) => {
        const d = dragRef.current;
        if (!d.active) return;
        const now = performance.now();
        const dx = e.clientX - d.lastX;
        const dt = Math.max(1, now - d.lastT) / 1000;
        d.pendingDelta += dx * RADS_PER_PIXEL;
        const instant = (dx * RADS_PER_PIXEL) / dt;
        d.velocity = Math.max(-MAX_FLING, Math.min(MAX_FLING, d.velocity * 0.7 + instant * 0.3));
        d.lastX = e.clientX;
        d.lastT = now;
      }}
      onPointerUp={() => {
        dragRef.current.active = false;
      }}
      onPointerCancel={() => {
        dragRef.current.active = false;
        dragRef.current.velocity = 0;
      }}
    >
      <KnightErrorBoundary>
        <Canvas
          frameloop={inView ? 'always' : 'never'}
          dpr={lowPower ? [1, 1.25] : [1, 1.75]}
          camera={{ position: [0, 0.25, 5.4], fov: 38 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          // Fade the canvas in when the chunk mounts; hero text never waits on it.
          style={{ position: 'absolute', inset: 0, animation: 'cine-hero-in 300ms ease-out backwards' }}
        >
          <ambientLight intensity={0.32} color="#cdd6e8" />
          <directionalLight position={[3.5, 4.2, 4]} intensity={1.0} color="#eef2ff" />
          <directionalLight position={[-4, 1.6, -2.6]} intensity={1.5} color="#4f8ef7" />
          <directionalLight position={[2.6, -1.4, 2.4]} intensity={0.18} color="#caa45a" />
          <Suspense fallback={null}>
            {reducedMotion ? (
              <KnightPiece reducedMotion dragRef={dragRef} />
            ) : (
              <Float speed={1.3} rotationIntensity={0.18} floatIntensity={0.45} floatingRange={[-0.06, 0.06]}>
                <KnightPiece reducedMotion={false} dragRef={dragRef} />
              </Float>
            )}
            {/* Local light-formers instead of a remote HDRI — keeps the load self-contained. */}
            <Environment resolution={256} frames={1}>
              <Lightformer form="rect" intensity={1.5} position={[0, 4, 3]} scale={[6, 3, 1]} color="#dfe7ff" />
              <Lightformer form="rect" intensity={0.85} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[5, 2, 1]} color="#5d83d6" />
              <Lightformer form="rect" intensity={0.5} position={[5, 0.4, 0]} rotation-y={-Math.PI / 2} scale={[4, 1.5, 1]} color="#9aa3b5" />
              <Lightformer form="circle" intensity={0.4} position={[2.4, -2, 2]} scale={2} color="#caa45a" />
            </Environment>
          </Suspense>
          <Sparkles
            count={lowPower ? 24 : 54}
            scale={[7.5, 5, 3]}
            size={1.15}
            speed={reducedMotion ? 0 : 0.12}
            opacity={0.2}
            color="#b8c7ff"
          />
          {!lowPower && (
            <EffectComposer multisampling={0} enableNormalPass={false}>
              <Bloom intensity={0.3} luminanceThreshold={0.24} luminanceSmoothing={0.85} mipmapBlur />
            </EffectComposer>
          )}
          <AdaptiveDpr pixelated={false} />
        </Canvas>
      </KnightErrorBoundary>
    </div>
  );
}
