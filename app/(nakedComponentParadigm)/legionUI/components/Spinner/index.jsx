import React, { useEffect, useRef } from 'react';
import { WrapperRaw } from '../../wrappers';

const _data = {
  type: "border",
  variant: {
    color: null,
    size: null
  },
  custom: {
    width: null,
    height: null
  },
  placement: {
    align: null,
    flex: false,
    float: null
  },
  accessibility: {
    label: "Loading...",
    hidden: true
  },
  margin: null
};

export default ({ _, children, $ = _data }) => {
  const {
    type=_data.type,
    variant=_data.variant,
    custom=_data.custom,
    placement=_data.placement,
    accessibility=_data.accessibility,
    margin=_data.margin
  } = $ || _ || children;

  const spinnerRef = useRef(null);

  useEffect(() => {
    // Gestion de prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionPreference = (e) => {
      if (spinnerRef.current) {
        if (e.matches) {
          spinnerRef.current.style.animation = 'none';
        } else {
          spinnerRef.current.style.animation = '';
        }
      }
    };

    mediaQuery.addListener(handleMotionPreference);
    handleMotionPreference(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMotionPreference);
    };
  }, []);

  // Construction des classes CSS
  const spinnerClasses = [
    `spinner-${type}`,
    variant.size && `spinner-${type}-${variant.size}`,
    variant.color && `text-${variant.color}`,
    placement.align && `text-${placement.align}`,
    placement.flex && 'd-flex justify-content-center',
    placement.float && `float-${placement.float}`,
    margin
  ].filter(Boolean).join(' ');

  // Style personnalisé pour les dimensions
  const customStyle = {
    ...(custom.width && { width: custom.width }),
    ...(custom.height && { height: custom.height })
  };

  // Conteneur pour l'alignement flex si nécessaire
  const renderSpinner = () => (
    <WrapperRaw $={{
      className: spinnerClasses,
      props: {
        ref: spinnerRef,
        role: "status",
        style: customStyle
      }
    }}>
      {accessibility.hidden && (
        <WrapperRaw $={{
          elm: "span",
          className: "visually-hidden"
        }}>
          {accessibility.label}
        </WrapperRaw>
      )}
    </WrapperRaw>
  );

  // Si flex est activé, on enveloppe dans un conteneur flex
  if (placement.flex) {
    return (
      <WrapperRaw $={{
        className: "d-flex justify-content-center"
      }}>
        {renderSpinner()}
      </WrapperRaw>
    );
  }

  return renderSpinner();
};
