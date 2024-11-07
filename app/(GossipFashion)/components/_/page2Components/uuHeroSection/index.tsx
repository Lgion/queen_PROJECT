import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

type HeroContent = {
  title: string;
  subtitle: string;
  image: string;
  cta: {
    text: string;
    href: string;
  };
}

type HeroBaseData = HeroContent & {
  ___type?: 'basic';
  ___overlay?: {
    color: string;
    opacity: number;
  };
}

type CarouselData = HeroContent & {
  ___type: 'carousel';
  ___overlay?: {
    color: string;
    opacity: number;
  };
  ___slides: HeroContent[];
  ___carousel: {
    autoplaySpeed?: number;
    arrows?: boolean;
    dots?: boolean;
    transition?: 'fade' | 'slide' | 'zoom';
  };
}

type HeroSectionProps = {
  data: HeroBaseData | CarouselData;
}

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplaying, setIsAutoplaying] = useState(true);

  const isCarousel = data.___type === 'carousel';
  const slides = isCarousel ? data.___slides : [data];
  const carouselConfig = isCarousel ? data.___carousel : undefined;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!isCarousel || !isAutoplaying || !carouselConfig?.autoplaySpeed) return;
    const interval = setInterval(nextSlide, carouselConfig.autoplaySpeed);
    return () => clearInterval(interval);
  }, [isAutoplaying, isCarousel, carouselConfig?.autoplaySpeed]);

  const classes = [
    'hero-section',
    data.___type && `hero-section--${data.___type}`,
    isCarousel && carouselConfig?.transition && 
      `hero-section--${carouselConfig.transition}`
  ].filter(Boolean).join(' ');

  const overlayStyle = data.___overlay ? {
    backgroundColor: data.___overlay.color,
    opacity: data.___overlay.opacity
  } : undefined;

  return (
    <section 
      className={classes}
      {...(isCarousel ? {
        onMouseEnter: () => setIsAutoplaying(false),
        onMouseLeave: () => setIsAutoplaying(true)
      } : {})}
    >
      <div className="hero-section__slides">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`hero-section__slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="hero-section__image">
              <img src={slide.image} alt={slide.title} />
            </div>
            {data.___overlay && (
              <div className="hero-section__overlay" style={overlayStyle} />
            )}
            <div className="hero-section__content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <Link href={slide.cta.href}>
                <span className="hero-section__cta">
                  {slide.cta.text}
                  <ArrowRight />
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {isCarousel && carouselConfig?.arrows && (
        <div className="hero-section__arrows">
          <button onClick={prevSlide} className="hero-section__arrow prev">
            <ChevronLeft />
          </button>
          <button onClick={nextSlide} className="hero-section__arrow next">
            <ChevronRight />
          </button>
        </div>
      )}

      {isCarousel && carouselConfig?.dots && (
        <div className="hero-section__dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`hero-section__dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSection; 