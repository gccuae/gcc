export interface Home {
  metaTitle: string;
  metaDescription: string;
  banners: {
    image: string;
    imageAlt: string;
    title: string;
    description: string;
  }[];
}

// Animation types for Framer Motion
import { Transition } from 'framer-motion';

export type AnimationProps = {
  initial?: {
    opacity: number;
    x?: number;
  };
  animate?: {
    opacity: number;
    x?: number;
  };
  exit?: {
    opacity: number;
    x?: number;
  };
  transition?: Transition;
}
