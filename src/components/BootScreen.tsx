'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BootScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeIn' }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: '#0f0f11' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex flex-col items-center gap-6"
          >
            {/* Logo mark */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
              style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                boxShadow: '0 0 40px rgba(99,102,241,0.4)',
              }}
            >
              J
            </div>

            <div className="text-center">
              <p className="text-[22px] font-bold text-white tracking-tight">JamesOS</p>
              <p className="text-[12px] text-white/30 mt-1 tracking-widest uppercase">Starting up</p>
            </div>

            {/* Progress bar */}
            <div className="w-32 h-[2px] rounded-full overflow-hidden bg-white/8">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
