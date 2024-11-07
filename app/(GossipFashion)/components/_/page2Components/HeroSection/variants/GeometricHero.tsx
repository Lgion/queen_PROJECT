import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { GeometricVariant, HeroContent } from '../types';

type GeometricHeroProps = {
  variant: GeometricVariant;
  data: HeroContent;
}

export const GeometricHero: React.FC<GeometricHeroProps> = ({ variant, data }) => {
  return (
    <div 
      className="hero-section__basic"
      style={{ 
        background: variant.geometric.background.color,
        backgroundImage: `url(/patterns/${variant.geometric.background.pattern}.svg)`
      }}
    >
      {variant.geometric.shapes.map((shape, index) => (
        <div
          key={index}
          className={`geometric-shape ${shape.type} ${shape.animation || ''}`}
          style={{
            width: shape.width || shape.size,
            height: shape.height || shape.size,
            backgroundColor: shape.color,
            ...shape.position
          }}
        />
      ))}
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

export default GeometricHero; 