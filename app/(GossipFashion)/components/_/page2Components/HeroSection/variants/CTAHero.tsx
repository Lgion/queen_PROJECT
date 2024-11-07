import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CTAVariant, HeroContent } from '../types';

type CTAHeroProps = {
  variant: CTAVariant;
  data: HeroContent;
}

export const CTAHero: React.FC<CTAHeroProps> = ({ variant, data }) => {
  return (
    <div className="hero-section__basic">
      <figure>
        <img src={data.image} alt={data.title} />
      </figure>
      <article className={`cta-${variant.cta.position}`}>
        <header>
          <h1>{data.title}</h1>
          <p role="doc-subtitle">{data.subtitle}</p>
        </header>
        <footer className={variant.cta.animation}>
          <Link href={variant.cta.primary.href}>
            <span 
              role="button" 
              className={`cta-${variant.cta.primary.style}`}
              aria-label={variant.cta.primary.text}
            >
              {variant.cta.primary.text}
              <ArrowRight aria-hidden="true" />
            </span>
          </Link>
          {variant.cta.secondary && (
            <Link href={variant.cta.secondary.href}>
              <span 
                role="button"
                className={`cta-${variant.cta.secondary.style}`}
                aria-label={variant.cta.secondary.text}
              >
                {variant.cta.secondary.text}
                <ArrowRight aria-hidden="true" />
              </span>
            </Link>
          )}
        </footer>
      </article>
    </div>
  );
};

export default CTAHero; 