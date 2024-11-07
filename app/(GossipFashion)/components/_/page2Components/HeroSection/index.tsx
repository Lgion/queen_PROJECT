import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ParallaxHero } from './variants/ParallaxHero';
import { SplitHero } from './variants/SplitHero';
import { VideoHero } from './variants/VideoHero';
import { MinimalistHero } from './variants/MinimalistHero';
import { GeometricHero } from './variants/GeometricHero';
import { CTAHero } from './variants/CTAHero';
import { AnimatedTextHero } from './variants/AnimatedTextHero';
import { SliderHero } from './variants/SliderHero';
import { GradientHero } from './variants/GradientHero';
import { KenBurnsHero } from './variants/KenBurnsHero';

import {
  HeroContent,
  VariantTypes,
  ParallaxVariant,
  SplitVariant,
  AnimatedTextVariant,
  CTAVariant,
  VideoVariant,
  MinimalistVariant,
  GeometricVariant,
  SliderVariant,
  GradientVariant,
  KenBurnsVariant,
  Variant
} from './types';

type HeroSectionProps = {
  data: HeroContent & {
    type: VariantTypes;
    variants: Variant[];
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const activeVariant = data.variants.find(v => v.type === data.type);

  useEffect(() => {
    if (data.type === 'parallax') {
      const handleScroll = () => setScrollPosition(window.pageYOffset);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [data.type]);

  const renderBasic = () => {
    return (
      <div className="hero-section__basic">
        <figure>
          <img src={data.image} alt={data.title} />
        </figure>
        <article>
          <header>
            <h1>{data.title}</h1>
            <p role="doc-subtitle">{data.subtitle}</p>
          </header>
          <footer>
            <Link href={data.cta.href}>
              <span role="button" aria-label={data.cta.text}>
                {data.cta.text}
                <ArrowRight aria-hidden="true" />
              </span>
            </Link>
          </footer>
        </article>
      </div>
    );
  };

  const renderParallax = (variant: ParallaxVariant) => {
    return <ParallaxHero variant={variant} data={data} scrollPosition={scrollPosition} />;
  };

  const renderSplit = (variant: SplitVariant) => {
    return <SplitHero variant={variant} data={data} />;
  };

  const renderAnimatedText = (variant: AnimatedTextVariant) => {
    return <AnimatedTextHero variant={variant} data={data} currentWord={currentWord} />;
  };

  const renderCTA = (variant: CTAVariant) => {
    return <CTAHero variant={variant} data={data} />;
  };

  const renderVideo = (variant: VideoVariant) => {
    return <VideoHero variant={variant} data={data} />;
  };

  const renderMinimalist = (variant: MinimalistVariant) => {
    return <MinimalistHero variant={variant} data={data} />;
  };

  const renderGeometric = (variant: GeometricVariant) => {
    return <GeometricHero variant={variant} data={data} />;
  };

  const renderSlider = (variant: SliderVariant) => {
    return (
      <SliderHero 
        variant={variant} 
        data={data} 
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
      />
    );
  };

  const renderGradient = (variant: GradientVariant) => {
    return <GradientHero variant={variant} data={data} />;
  };

  const renderKenBurns = (variant: KenBurnsVariant) => {
    return <KenBurnsHero variant={variant} data={data} />;
  };

  const renderContent = () => {
    if (!activeVariant) return renderBasic();

    switch (activeVariant.type) {
      case 'parallax':
        return renderParallax(activeVariant);
      case 'split':
        return renderSplit(activeVariant);
      case 'animated-text':
        return renderAnimatedText(activeVariant);
      case 'cta':
        return renderCTA(activeVariant);
      case 'video':
        return renderVideo(activeVariant);
      case 'minimalist':
        return renderMinimalist(activeVariant);
      case 'geometric':
        return renderGeometric(activeVariant);
      case 'slider':
        return renderSlider(activeVariant);
      case 'gradient':
        return renderGradient(activeVariant);
      case 'kenburns':
        return renderKenBurns(activeVariant);
      default:
        return renderBasic();
    }
  };

  // Fonctions pour le slider
  const nextSlide = useCallback((variant: SliderVariant) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % variant.slider.slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const prevSlide = useCallback((variant: SliderVariant) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + variant.slider.slides.length) % variant.slider.slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  // Effet pour l'autoplay du slider
  useEffect(() => {
    if (activeVariant?.type === 'slider' && activeVariant.slider.autoplay) {
      const interval = setInterval(() => {
        nextSlide(activeVariant);
      }, activeVariant.slider.interval || 5000);
      return () => clearInterval(interval);
    }
  }, [activeVariant, nextSlide]);

  return (
    <section className={`hero-section hero-section--${data.type}`}>
      {renderContent()}
    </section>
  );
};

export default HeroSection; 