import React, { useEffect, useRef } from 'react';
import { WrapperRaw } from '../../wrappers';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const _data = {
  items: [
    {
      imageUrl: 'https://via.placeholder.com/800x400',
      caption: 'Premier élément',
      description: 'Description du premier élément',
      interval: 5000, // Intervalle spécifique pour ce slide
    },
    {
      imageUrl: 'https://via.placeholder.com/800x400',
      caption: 'Deuxième élément',
      description: 'Description du deuxième élément',
      interval: 4000,
    },
    {
      imageUrl: 'https://via.placeholder.com/800x400',
      caption: 'Troisième élément',
      description: 'Description du troisième élément',
      interval: 3000,
    },
  ],
  controls: true,
  indicators: true,
  dark: false,
  fade: false,
  touch: true,
  autoplay: true,
  interval: 5000,
  pauseOnHover: true,
  keyboard: true,
  wrap: true,
  transition: null
};

export default ({ _, children, $ = _data }) => {
  const {
    items=_data.items,
    controls=_data.controls,
    indicators=_data.indicators,
    dark=_data.dark,
    fade=_data.fade,
    touch=_data.touch,
    autoplay=_data.autoplay,
    interval=_data.interval,
    pauseOnHover=_data.pauseOnHover,
    keyboard=_data.keyboard,
    wrap=_data.wrap,
    transition=_data.transition
  } = $ || _ || children;

  const carouselRef = useRef(null);
  const carouselId = useRef(`carousel-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (carouselRef.current) {
      const carouselElement = carouselRef.current;
      const carousel = new bootstrap.Carousel(carouselElement, {
        interval: autoplay ? interval : false,
        keyboard,
        pause: pauseOnHover ? 'hover' : false,
        ride: autoplay ? 'carousel' : false,
        wrap,
        touch
      });

      // Gestion de prefers-reduced-motion
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handleMotionPreference = (e) => {
        if (e.matches) {
          carousel.pause();
        } else if (autoplay) {
          carousel.cycle();
        }
      };
      mediaQuery.addListener(handleMotionPreference);
      handleMotionPreference(mediaQuery);

      // Cleanup
      return () => {
        carousel.dispose();
        mediaQuery.removeListener(handleMotionPreference);
      };
    }
  }, [autoplay, interval, keyboard, pauseOnHover, wrap, touch]);

  // Construction des classes CSS
  const carouselClasses = [
    'carousel',
    'slide',
    dark && 'carousel-dark',
    fade && 'carousel-fade'
  ].filter(Boolean).join(' ');

  // Style pour la transition personnalisée
  const transitionStyle = transition ? {
    '--bs-carousel-transition-duration': `${transition}ms`
  } : {};

  return (
    <WrapperRaw $={{
      className: carouselClasses,
      props: {
        id: carouselId.current,
        ref: carouselRef,
        style: transitionStyle,
        'data-bs-ride': autoplay ? 'carousel' : undefined,
        'data-bs-touch': touch.toString(),
      }
    }}>
      {indicators && (
        <div className="carousel-indicators">
          {items.map((_, index) => (
            <button
              key={`indicator-${index}`}
              type="button"
              data-bs-target={`#${carouselId.current}`}
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : undefined}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      <section className="carousel-inner">
        {items.map((item, index) => (
          <article 
            key={`slide-${index}`}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
            data-bs-interval={item.interval || interval}
          >
            <figure>
              <img 
                src={item.imageUrl} 
                className="d-block w-100" 
                alt={item.caption || `Slide ${index + 1}`}
              />
              {(item.caption || item.description) && (
                <figcaption className="carousel-caption d-none d-md-block">
                  {item.caption && <h2>{item.caption}</h2>}
                  {item.description && <p>{item.description}</p>}
                </figcaption>
              )}
            </figure>
          </article>
        ))}
      </section>

      {controls && (
        <>
          <button 
            className="carousel-control-prev" 
            type="button" 
            data-bs-target={`#${carouselId.current}`} 
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Précédent</span>
          </button>
          <button 
            className="carousel-control-next" 
            type="button" 
            data-bs-target={`#${carouselId.current}`} 
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Suivant</span>
          </button>
        </>
      )}
    </WrapperRaw>
  );
};
