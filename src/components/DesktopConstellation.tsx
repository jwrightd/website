'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { AdaptiveDpr, Sparkles } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Group,
  Points,
  ShaderMaterial,
  Vector2,
} from 'three';
import { CONSTELLATION_EVENT, type ConstellationEventDetail } from '@/lib/constellation-events';

const PARTICLE_COUNT = 76;
const POINTER_WORLD_X = 4.6;
const POINTER_WORLD_Y = 2.7;

function createPositions() {
  const values: number[] = [];

  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    const t = i / PARTICLE_COUNT;
    const ring = i % 4;
    const angle = t * Math.PI * 2 * 3.15 + ring * 0.72;
    const radius = 1.25 + ring * 0.82 + Math.sin(i * 1.91) * 0.18;
    const x = Math.cos(angle) * radius + Math.sin(i * 0.77) * 1.35;
    const y = Math.sin(angle * 0.82) * (radius * 0.58) + Math.cos(i * 0.41) * 0.82;
    const z = Math.sin(i * 1.37) * 0.42;

    values.push(x, y, z);
  }

  return new Float32Array(values);
}

function createThreadPositions(points: Float32Array) {
  const lines: number[] = [];

  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    const ix = i * 3;
    const x = points[ix];
    const y = points[ix + 1];
    const z = points[ix + 2];

    let bestIndex = -1;
    let bestDistance = Number.POSITIVE_INFINITY;

    for (let j = i + 1; j < PARTICLE_COUNT; j += 1) {
      const jx = j * 3;
      const dx = x - points[jx];
      const dy = y - points[jx + 1];
      const dz = z - points[jx + 2];
      const distance = dx * dx + dy * dy + dz * dz;

      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = j;
      }
    }

    if (bestIndex !== -1 && bestDistance < 1.55) {
      const bx = bestIndex * 3;
      lines.push(x, y, z, points[bx], points[bx + 1], points[bx + 2]);
    }
  }

  return new Float32Array(lines);
}

function ConstellationField() {
  const groupRef = useRef<Group>(null);
  const pointsRef = useRef<Points>(null);
  const pointMaterialRef = useRef<ShaderMaterial>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pulseRef = useRef(0);
  const alignmentRef = useRef(0);

  const positions = useMemo(() => createPositions(), []);
  const threadPositions = useMemo(() => createThreadPositions(positions), [positions]);
  const pointGeometry = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    return geometry;
  }, [positions]);
  const threadGeometry = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(threadPositions, 3));
    return geometry;
  }, [threadPositions]);
  const pointUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new Vector2(0, 0) },
      uPulse: { value: 0 },
      uAlignment: { value: 0 },
    }),
    []
  );
  const vertexShader = useMemo(
    () => `
          uniform float uTime;
          uniform vec2 uPointer;
          uniform float uPulse;
          uniform float uAlignment;
          varying float vAlpha;

          void main() {
            vec3 p = position;
            float d = distance(p.xy, uPointer);
            float lift = smoothstep(2.2, 0.0, d);
            float center = smoothstep(4.2, 0.25, length(position.xy));
            float wave = sin(uTime * 2.4 - length(position.xy) * 1.35);
            p.z += lift * 0.42;
            p.z += center * uPulse * (0.18 + wave * 0.08);
            p.z += center * uAlignment * 0.12;
            p.z += sin(uTime * 0.55 + position.x * 0.9 + position.y) * 0.035;

            vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = (2.0 + lift * 2.1 + center * uPulse * 0.55 + center * uAlignment * 0.22) * (110.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
            vAlpha = 0.2 + lift * 0.38 + center * uPulse * 0.16 + center * uAlignment * 0.1;
          }
        `,
    []
  );
  const fragmentShader = useMemo(
    () => `
          varying float vAlpha;

          void main() {
            vec2 c = gl_PointCoord - vec2(0.5);
            float d = length(c);
            float edge = smoothstep(0.5, 0.08, d);
            gl_FragColor = vec4(0.62, 0.72, 1.0, edge * vAlpha);
          }
        `,
    []
  );

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current.x = (event.clientX / window.innerWidth - 0.5) * POINTER_WORLD_X * 2;
      pointerRef.current.y = -(event.clientY / window.innerHeight - 0.5) * POINTER_WORLD_Y * 2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useEffect(() => {
    const handleConstellationEvent = (event: Event) => {
      const detail = (event as CustomEvent<ConstellationEventDetail>).detail;
      if (!detail) return;

      const baseIntensity = detail.intensity ?? 0.3;
      const pulseByKind: Record<ConstellationEventDetail['kind'], number> = {
        hover: 0.16,
        open: 0.34,
        arrange: 0.42,
        workspace: 0.58,
        recruiter: 0.76,
      };
      const alignmentByKind: Record<ConstellationEventDetail['kind'], number> = {
        hover: 0.08,
        open: 0.16,
        arrange: 0.52,
        workspace: 0.68,
        recruiter: 0.95,
      };

      pulseRef.current = Math.min(1.15, pulseRef.current + pulseByKind[detail.kind] * baseIntensity);
      alignmentRef.current = Math.max(alignmentRef.current, alignmentByKind[detail.kind] * baseIntensity);

      if (detail.kind === 'workspace' || detail.kind === 'recruiter' || detail.kind === 'arrange') {
        pointerRef.current.x *= 0.22;
        pointerRef.current.y *= 0.22;
      }
    };

    window.addEventListener(CONSTELLATION_EVENT, handleConstellationEvent);
    return () => window.removeEventListener(CONSTELLATION_EVENT, handleConstellationEvent);
  }, []);

  useFrame(({ clock }) => {
    if (document.hidden) return;

    const target = pointerRef.current;
    const material = pointMaterialRef.current;
    pulseRef.current += (0 - pulseRef.current) * 0.045;
    alignmentRef.current += (0 - alignmentRef.current) * 0.018;

    const pulse = pulseRef.current;
    const alignment = alignmentRef.current;

    if (material) {
      material.uniforms.uTime.value = clock.elapsedTime;
      material.uniforms.uPointer.value.set(target.x, target.y);
      material.uniforms.uPulse.value = pulse;
      material.uniforms.uAlignment.value = alignment;
    }

    if (groupRef.current) {
      const alignmentDamp = 1 - alignment * 0.78;
      groupRef.current.rotation.y += (target.x * 0.018 * alignmentDamp - groupRef.current.rotation.y) * 0.035;
      groupRef.current.rotation.x += (-target.y * 0.018 * alignmentDamp - groupRef.current.rotation.x) * 0.035;
      groupRef.current.position.x += (target.x * 0.045 * alignmentDamp - groupRef.current.position.x) * 0.025;
      groupRef.current.position.y += (target.y * 0.035 * alignmentDamp - groupRef.current.position.y) * 0.025;
      const scale = 1 + pulse * 0.018 + alignment * 0.012;
      groupRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef} position={[0.4, -0.1, 0]}>
      <Sparkles
        count={34}
        scale={[8.2, 3.8, 1]}
        size={1.1}
        speed={0.08}
        opacity={0.16}
        color="#b8c7ff"
      />
      <lineSegments geometry={threadGeometry}>
        <lineBasicMaterial color="#8ba9ff" transparent opacity={0.13} depthWrite={false} />
      </lineSegments>
      <points ref={pointsRef} geometry={pointGeometry}>
        <shaderMaterial
          ref={pointMaterialRef}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          uniforms={pointUniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </points>
    </group>
  );
}

export default function DesktopConstellation() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const widthQuery = window.matchMedia('(min-width: 768px)');

    const update = () => setEnabled(!motionQuery.matches && widthQuery.matches);
    const frame = requestAnimationFrame(update);

    motionQuery.addEventListener('change', update);
    widthQuery.addEventListener('change', update);

    return () => {
      cancelAnimationFrame(frame);
      motionQuery.removeEventListener('change', update);
      widthQuery.removeEventListener('change', update);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.68]">
      <Canvas
        orthographic
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], zoom: 86 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <ConstellationField />
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom intensity={0.16} luminanceThreshold={0.16} luminanceSmoothing={0.86} mipmapBlur />
          <Vignette offset={0.48} darkness={0.18} />
        </EffectComposer>
        <AdaptiveDpr pixelated={false} />
      </Canvas>
    </div>
  );
}
