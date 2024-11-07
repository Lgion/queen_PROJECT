import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SplitVariant, HeroContent } from '../types';

type SplitHeroProps = {
  variant: SplitVariant;
  data: HeroContent;
}

export const SplitHero: React.FC<SplitHeroProps> = ({ variant, data }) => {
  return (
    <div className="hero-section__basic">
      <div className={`hero-section__container ${variant.split.ratio}`}>
        <figure className={variant.split.layout}>
          <img src={data.image} alt={data.title} />
        </figure>
        <article 
          style={{ background: variant.split.background }}
          className={variant.split.contentAlignment}
        >
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
    </div>
  );
};

export default SplitHero; 