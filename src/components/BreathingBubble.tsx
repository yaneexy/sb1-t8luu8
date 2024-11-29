import { motion, AnimatePresence } from 'framer-motion';
import { useBreathingStore } from '../store/useBreathingStore';
import { useBreathingAnimation } from '../hooks/useBreathingAnimation';

export function BreathingBubble() {
  const { selectedPattern, isPlaying } = useBreathingStore();
  const { phase, progress } = useBreathingAnimation(selectedPattern, isPlaying);

  const bubbleVariants = {
    inhale: { scale: 1.5, transition: { duration: selectedPattern.inhale } },
    hold: { scale: 1.5, transition: { duration: selectedPattern.hold } },
    exhale: { scale: 1, transition: { duration: selectedPattern.exhale } },
  };

  const colors = {
    inhale: 'bg-blue-400',
    hold: 'bg-green-400',
    exhale: 'bg-red-400',
  };

  return (
    <div className="relative flex items-center justify-center w-64 h-64">
      <AnimatePresence>
        <motion.div
          className={`w-32 h-32 rounded-full ${colors[phase]} opacity-80`}
          variants={bubbleVariants}
          animate={phase}
        />
      </AnimatePresence>
      <div className="absolute text-2xl font-medium text-white">
        {phase.charAt(0).toUpperCase() + phase.slice(1)}
      </div>
    </div>
  );
}