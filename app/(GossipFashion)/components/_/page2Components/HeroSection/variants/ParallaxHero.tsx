import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ParallaxVariant, HeroContent } from '../types';

type ParallaxHeroProps = {
  variant: ParallaxVariant;
  data: HeroContent;
  scrollPosition: number;
}

export const ParallaxHero: React.FC<ParallaxHeroProps> = ({ variant, data, scrollPosition }) => {
  return (
    <div className="hero-section__basic">
      {variant.parallax.layers.map((layer, index) => (
        <figure 
          key={index}
          className="parallax-layer"
          style={{ 
            transform: `translateY(${scrollPosition * layer.speed}px)`,
            zIndex: index + 1
          }}
        >
          <img src={layer.image} alt={`Layer ${index + 1}`} />
        </figure>
      ))}
      <article style={{ transform: `translateY(${scrollPosition * 0.5}px)` }}>
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

export default ParallaxHero; 