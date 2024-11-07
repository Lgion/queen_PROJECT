import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MinimalistVariant, HeroContent } from '../types';

type MinimalistHeroProps = {
  variant: MinimalistVariant;
  data: HeroContent;
}

export const MinimalistHero: React.FC<MinimalistHeroProps> = ({ variant, data }) => {
  const { typography, spacing, colors } = variant.minimalist;
  
  return (
    <div 
      className={`hero-section__basic spacing-${spacing}`}
      style={{ background: colors.background }}
    >
      <figure>
        <img src={data.image} alt={data.title} />
      </figure>
      <article style={{ color: colors.text }}>
        <header className={`font-${typography.fontFamily}`}>
          <h1 className={`text-${typography.titleSize}`}>{data.title}</h1>
          <p 
            role="doc-subtitle" 
            className={`text-${typography.subtitleSize}`}
          >
            {data.subtitle}
          </p>
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

export default MinimalistHero; 