// motionVariants.ts
export const containerStagger = {
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};
export const moveUp = (delay: number = 0) => ({
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: delay,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
});

export const moveDown = (delay: number = 0) => ({
  hidden: { opacity: 0, y: -50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: delay,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
});

export const moveLeft = (delay: number = 0) => ({
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      delay: delay,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
});

export const moveRight = (delay: number = 0) => ({
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      delay: delay,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
});

export const fadeIn = (delay: number = 0) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: delay,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
});

export const paragraphItem = {
  hidden: { opacity: 0, y: 50 }, // Start with opacity 0 and slide up from 50px below
  show: {
    opacity: 1,
    y: 0, // Slide to its normal position
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      staggerChildren: 0.1,
    },
  },
};

export const opacityMove = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const listUpMove = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Controls the stagger effect (delay for each item)
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

export const letterContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05, // a little more time between letters
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

export const letterItem = {
  hidden: { y: "100%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: {
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      duration: 0.5,
    },
  },
};


export const letterItemTop = {
  hidden: {
    y: -40, // Start from top
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // cubic-bezier for a soft easeOut
    },
  },
};