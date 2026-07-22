'use client';
import { cn } from '@/lib/utils';
import { useMotionValue, animate, motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import useMeasure from 'react-use-measure';

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [key, setKey] = useState(0);
  const isHovering = useRef(false);
  const hoverDuration = durationOnHover ?? duration * 4;

  useEffect(() => {
    let controls;
    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;
    const d = isHovering.current ? hoverDuration : duration;

    controls = animate(translation, [from, to], {
      ease: 'linear',
      duration: d,
      repeat: Infinity,
      repeatType: 'loop',
      repeatDelay: 0,
      onRepeat: () => {
        translation.set(from);
      },
    });

    return controls?.stop;
  }, [key, translation, width, height, gap, direction, reverse, duration, hoverDuration]);

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          isHovering.current = true;
          setKey((k) => k + 1);
        },
        onHoverEnd: () => {
          isHovering.current = false;
          setKey((k) => k + 1);
        },
      }
    : {};

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className='flex w-max'
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
