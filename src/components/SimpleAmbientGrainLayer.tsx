'use client';

import { useEffect, useRef, useState } from 'react';

export default function SimpleAmbientGrainLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');
    const update = () => setEnabled(!reducedMotion.matches && !coarsePointer.matches);
    const frame = window.requestAnimationFrame(update);

    reducedMotion.addEventListener('change', update);
    coarsePointer.addEventListener('change', update);

    return () => {
      window.cancelAnimationFrame(frame);
      reducedMotion.removeEventListener('change', update);
      coarsePointer.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context) return;

    let frame = 0;
    let animationFrame = 0;

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * scale);
      canvas.height = Math.floor(window.innerHeight * scale);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const draw = () => {
      frame += 1;

      if (frame % 18 === 0) {
        const width = canvas.width;
        const height = canvas.height;
        const imageData = context.createImageData(width, height);
        const data = imageData.data;

        for (let index = 0; index < data.length; index += 4) {
          const value = 120 + Math.random() * 70;
          data[index] = value;
          data[index + 1] = value;
          data[index + 2] = value;
          data[index + 3] = 12;
        }

        context.putImageData(imageData, 0, 0);
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return <canvas ref={canvasRef} className="simple-ambient-grain" aria-hidden="true" />;
}
