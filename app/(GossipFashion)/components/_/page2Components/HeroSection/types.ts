export type HeroContent = {
  title: string;
  subtitle: string;
  image: string;
  cta: {
    text: string;
    href: string;
  };
}

export type ParallaxVariant = {
  type: 'parallax';
  parallax: {
    layers: {
      image: string;
      speed: number;
    }[];
  };
}

export type SplitVariant = {
  type: 'split';
  split: {
    layout: 'image-left' | 'image-right';
    ratio: '1:1' | '2:1' | '1:2';
    contentAlignment: 'center' | 'top' | 'bottom';
    background: string;
  };
}

export type VideoVariant = {
  type: 'video';
  video: {
    src: string;
    poster?: string;
    muted?: boolean;
    loop?: boolean;
    autoplay?: boolean;
    overlay?: {
      color?: string;
      gradient?: string;
    };
  };
}

export type MinimalistVariant = {
  type: 'minimalist';
  minimalist: {
    typography: {
      titleSize: '4xl' | '5xl' | '6xl';
      subtitleSize: 'xl' | '2xl';
      fontFamily: 'serif' | 'sans' | 'mono';
    };
    spacing: 'loose' | 'tight' | 'normal';
    colors: {
      background: string;
      text: string;
    };
  };
}

export type GeometricVariant = {
  type: 'geometric';
  geometric: {
    shapes: Array<{
      type: 'circle' | 'triangle' | 'rectangle';
      size?: string;
      width?: string;
      height?: string;
      color: string;
      position: {
        top?: string;
        left?: string;
        bottom?: string;
        right?: string;
      };
      animation?: 'float' | 'rotate' | 'pulse';
    }>;
    background: {
      pattern: 'dots' | 'grid' | 'lines';
      color: string;
    };
  };
}

export type CTAVariant = {
  type: 'cta';
  cta: {
    primary: {
      text: string;
      href: string;
      style: 'filled' | 'outlined' | 'gradient';
    };
    secondary?: {
      text: string;
      href: string;
      style: 'filled' | 'outlined' | 'gradient';
    };
    position: 'center' | 'left' | 'right';
    animation?: 'pulse' | 'bounce' | 'shake';
  };
}

export type AnimatedTextVariant = {
  type: 'animated-text';
  animation: {
    type: 'typewriter' | 'fade-in' | 'slide-up';
    speed: number;
    delay: number;
    words?: string[];
    cursor?: boolean;
  };
}

export type SliderVariant = {
  type: 'slider';
  slider: {
    slides: Array<{
      image: string;
      title?: string;
      subtitle?: string;
      cta?: {
        text: string;
        href: string;
      };
    }>;
    autoplay?: boolean;
    interval?: number;
    arrows?: boolean;
    dots?: boolean;
    transition?: 'fade' | 'slide';
  };
}

export type GradientVariant = {
  type: 'gradient';
  gradient: {
    colors: string[];
    direction?: string;
    opacity?: number;
    animate?: boolean;
  };
}

export type VariantTypes = 'basic' | 'parallax' | 'split' | 'animated-text' | 'cta' | 
                          'video' | 'minimalist' | 'geometric' | 'slider' | 'gradient' | 'kenburns';

export type KenBurnsVariant = {
  type: 'kenburns';
  kenburns: {
    scale?: number;
    duration?: number;
    direction?: 'in' | 'out';
    movement?: {
      x?: 'left' | 'right';
      y?: 'top' | 'bottom';
    };
  };
}

export type Variant = ParallaxVariant | SplitVariant | AnimatedTextVariant | 
                     CTAVariant | VideoVariant | MinimalistVariant | GeometricVariant | 
                     SliderVariant | GradientVariant | KenBurnsVariant;
