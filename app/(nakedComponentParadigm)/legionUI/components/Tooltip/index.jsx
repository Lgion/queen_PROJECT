import React, { useEffect, useRef } from 'react';
import { WrapperRaw } from '../../wrappers';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const _data = {
  content: {
    text: "Tooltip text",
    html: false,
    sanitize: true
  },
  placement: {
    position: "top",
    fallback: ["top", "right", "bottom", "left"],
    boundary: "clippingParents"
  },
  options: {
    animation: true,
    container: false,
    delay: {
      show: 0,
      hide: 0
    },
    trigger: "hover focus"
  },
  style: {
    customClass: null,
    offset: [0, 0]
  },
  accessibility: {
    tabindex: "0",
    disabled: false,
    selector: null
  }
};

export default ({ _, children, $ = _data }) => {
  const {
    content=_data.content,
    placement=_data.placement,
    options=_data.options,
    style=_data.style,
    accessibility=_data.accessibility
  } = $ || _ || children;

  const tooltipRef = useRef(null);
  const tooltipInstance = useRef(null);
  const tooltipId = useRef(`tooltip-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (tooltipRef.current) {
      // Configuration du tooltip
      tooltipInstance.current = new bootstrap.Tooltip(tooltipRef.current, {
        container: options.container,
        animation: options.animation,
        html: content.html,
        placement: placement.position,
        fallbackPlacements: placement.fallback,
        boundary: placement.boundary,
        delay: options.delay,
        trigger: options.trigger,
        sanitize: content.sanitize,
        offset: style.offset,
        customClass: style.customClass,
        title: content.html ? content.text : String(content.text),
        popperConfig: {
          modifiers: [
            {
              name: 'preventOverflow',
              options: {
                boundary: placement.boundary
              }
            }
          ]
        }
      });

      // Gestion de prefers-reduced-motion
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handleMotionPreference = (e) => {
        if (tooltipInstance.current) {
          tooltipInstance.current._config.animation = !e.matches;
        }
      };
      mediaQuery.addListener(handleMotionPreference);
      handleMotionPreference(mediaQuery);

      // Gestion du clavier
      const handleKeyDown = (event) => {
        if (event.key === 'Escape' && tooltipInstance.current) {
          tooltipInstance.current.hide();
        }
      };
      tooltipRef.current.addEventListener('keydown', handleKeyDown);

      return () => {
        if (tooltipInstance.current) {
          tooltipInstance.current.dispose();
        }
        mediaQuery.removeListener(handleMotionPreference);
        tooltipRef.current?.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [
    content.html, content.text, content.sanitize,
    placement.position, placement.fallback, placement.boundary,
    options.container, options.animation, options.delay, options.trigger,
    style.offset, style.customClass
  ]);

  // Rendu pour les éléments désactivés
  if (accessibility.disabled && accessibility.selector) {
    return (
      <WrapperRaw $={{
        elm: accessibility.selector,
        className: "d-inline-block",
        props: {
          tabIndex: accessibility.tabindex
        }
      }}>
        {children}
      </WrapperRaw>
    );
  }

  // Rendu standard
  return (
    <WrapperRaw $={{
      props: {
        ref: tooltipRef,
        id: tooltipId.current,
        tabIndex: accessibility.tabindex,
        'data-bs-toggle': "tooltip",
        'data-bs-placement': placement.position,
        title: content.text,
        role: "tooltip",
        'aria-describedby': tooltipId.current
      }
    }}>
      {children}
    </WrapperRaw>
  );
};
