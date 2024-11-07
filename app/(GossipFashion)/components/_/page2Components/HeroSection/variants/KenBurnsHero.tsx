import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { KenBurnsVariant, HeroContent } from '../types';

type KenBurnsHeroProps = {
  variant: KenBurnsVariant;
  data: HeroContent;
}

export const KenBurnsHero: React.FC<KenBurnsHeroProps> = ({ variant, data }) => {
  const { scale = 1.2, duration = 20, direction = 'in', movement } = variant.kenburns;
  
  return (
    <div className="hero-section__basic">
      <figure className={`kenburns ${direction} ${movement?.x || ''} ${movement?.y || ''}`}>
        <img 
          src={data.image} 
          alt={data.title}
          style={{
            '--scale': scale,
            '--duration': `${duration}s`
          } as React.CSSProperties}
        />
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

export default KenBurnsHero; 