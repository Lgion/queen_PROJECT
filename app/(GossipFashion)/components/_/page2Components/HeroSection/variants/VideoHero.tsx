import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { VideoVariant, HeroContent } from '../types';

type VideoHeroProps = {
  variant: VideoVariant;
  data: HeroContent;
}

export const VideoHero: React.FC<VideoHeroProps> = ({ variant, data }) => {
  return (
    <div className="hero-section__basic">
      <figure>
        <video
          src={variant.video.src}
          poster={variant.video.poster}
          muted={variant.video.muted}
          loop={variant.video.loop}
          autoPlay={variant.video.autoplay}
          playsInline
        />
        {variant.video.overlay && (
          <div 
            className="video-overlay"
            style={variant.video.overlay.gradient ? 
              { background: variant.video.overlay.gradient } :
              { backgroundColor: variant.video.overlay.color }
            }
          />
        )}
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

export default VideoHero; 