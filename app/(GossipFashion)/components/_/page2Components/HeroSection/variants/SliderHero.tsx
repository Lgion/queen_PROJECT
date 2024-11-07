import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { SliderVariant, HeroContent } from '../types';

type SliderHeroProps = {
  variant: SliderVariant;
  data: HeroContent;
  currentSlide: number;
  setCurrentSlide: (index: number) => void;
  nextSlide: (variant: SliderVariant) => void;
  prevSlide: (variant: SliderVariant) => void;
}

export const SliderHero: React.FC<SliderHeroProps> = ({ 
  variant, 
  data,
  currentSlide,
  setCurrentSlide,
  nextSlide,
  prevSlide
}) => {
  return (
    <div className="hero-section__basic">
      <div className={`hero-section__slider ${variant.slider.transition || 'fade'}`}>
        {variant.slider.slides.map((slide, index) => (
          <figure
            key={index}
            className={`slider-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={slide.image} alt={slide.title || data.title} />
          </figure>
        ))}
        
        {variant.slider.arrows && (
          <div className="slider-arrows">
            <button onClick={() => prevSlide(variant)} className="slider-arrow prev">
              <ChevronLeft />
            </button>
            <button onClick={() => nextSlide(variant)} className="slider-arrow next">
              <ChevronRight />
            </button>
          </div>
        )}
        
        {variant.slider.dots && (
          <div className="slider-dots">
            {variant.slider.slides.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        )}
      </div>
      
      <article>
        <header>
          <h1>{variant.slider.slides[currentSlide].title || data.title}</h1>
          <p role="doc-subtitle">
            {variant.slider.slides[currentSlide].subtitle || data.subtitle}
          </p>
        </header>
        <footer>
          <Link 
            href={variant.slider.slides[currentSlide].cta?.href || data.cta.href}
          >
            <span role="button">
              {variant.slider.slides[currentSlide].cta?.text || data.cta.text}
              <ArrowRight aria-hidden="true" />
            </span>
          </Link>
        </footer>
      </article>
    </div>
  );
};

export default SliderHero; 