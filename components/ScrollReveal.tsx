"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image, { type ImageProps } from "next/image";
import type { ElementType, HTMLAttributes, ReactNode } from "react";

const MotionImage = motion.create(Image);

const motionElements = {
  button: motion.button,
  div: motion.div,
  fieldset: motion.fieldset,
  footer: motion.footer,
  form: motion.form,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  label: motion.label,
  li: motion.li,
  ol: motion.ol,
  p: motion.p,
  section: motion.section,
  span: motion.span,
  time: motion.time,
} as const;

type RevealTag = keyof typeof motionElements;

type RevealOptions = {
  amount?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  y?: number;
};

type ScrollRevealProps = HTMLAttributes<HTMLElement> &
  RevealOptions & {
    as?: RevealTag;
    children?: ReactNode;
    dateTime?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
  };

type RevealImageProps = Omit<
  ImageProps,
  | "layout"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onAnimationStart"
  | "onDrag"
  | "onDragEnd"
  | "onDragStart"
> &
  RevealOptions;

const easing = [0.22, 1, 0.36, 1] as const;

function animationProps({
  amount = 0.22,
  delay = 0,
  duration = 0.72,
  once = true,
  reduceMotion,
  y = 18,
}: RevealOptions & { reduceMotion: boolean }) {
  if (reduceMotion) {
    return {};
  }

  const hidden = y === 0 ? { opacity: 0, filter: "blur(5px)" } : { opacity: 0, y, filter: "blur(5px)" };
  const visible =
    y === 0 ? { opacity: 1, filter: "blur(0px)" } : { opacity: 1, y: 0, filter: "blur(0px)" };

  return {
    initial: hidden,
    transition: { delay, duration, ease: easing },
    viewport: { amount, margin: "0px 0px -10% 0px", once },
    whileInView: visible,
  };
}

export function ScrollReveal({
  amount,
  as = "div",
  children,
  delay,
  duration,
  once,
  y,
  ...props
}: ScrollRevealProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const Component = motionElements[as] as ElementType;

  return (
    <Component {...animationProps({ amount, delay, duration, once, reduceMotion, y })} {...props}>
      {children}
    </Component>
  );
}

export function RevealImage({
  amount,
  delay,
  duration,
  once,
  y,
  ...props
}: RevealImageProps) {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <MotionImage
      {...animationProps({ amount, delay, duration, once, reduceMotion, y })}
      {...props}
    />
  );
}
