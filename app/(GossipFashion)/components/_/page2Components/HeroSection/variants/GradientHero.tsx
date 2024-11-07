import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { GradientVariant, HeroContent } from '../types';

type GradientHeroProps = {
  variant: GradientVariant;
  data: HeroContent;
}

export const GradientHero: React.FC<GradientHeroProps> = ({ variant, data }) => {
  return (
    <div className="hero-section__basic">
      <figure>
        <img src={data.image} alt={data.title} />
      </figure>
      <div 
        className={`gradient-overlay ${variant.gradient.animate ? 'animate' : ''}`}
        style={{
          background: `linear-gradient(${variant.gradient.direction || '135deg'}, ${variant.gradient.colors.join(', ')})`,
          opacity: variant.gradient.opacity || 0.7
        }}
      />
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

export default GradientHero; 