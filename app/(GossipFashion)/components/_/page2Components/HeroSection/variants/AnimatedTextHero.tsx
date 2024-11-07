import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimatedTextVariant, HeroContent } from '../types';

type AnimatedTextHeroProps = {
  variant: AnimatedTextVariant;
  data: HeroContent;
  currentWord: number;
}

export const AnimatedTextHero: React.FC<AnimatedTextHeroProps> = ({ 
  variant, 
  data,
  currentWord 
}) => {
  return (
    <div className="hero-section__basic">
      <figure>
        <img src={data.image} alt={data.title} />
      </figure>
      <article>
        <header className={`animated-text ${variant.animation.type}`}>
          <h1>{data.title}</h1>
          {variant.animation.words ? (
            <p className="animated-words">
              {variant.animation.words[currentWord]}
              {variant.animation.cursor && <span className="cursor">|</span>}
            </p>
          ) : (
            <p role="doc-subtitle">{data.subtitle}</p>
          )}
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

export default AnimatedTextHero; 