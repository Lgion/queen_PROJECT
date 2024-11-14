import React from 'react';
import { WrapperRaw } from '../../wrappers';

const _data = {
  value: 25,
  max: 100,
  bars: [
    {
      value: 25,
      variant: "success",
      striped: false,
      animated: false,
      label: "25%"
    }
  ],
  options: {
    height: null,
    label: {
      show: true,
      format: "percentage", // percentage, value, custom
      custom: null,
      placement: "center" // start, center, end
    },
    striped: false,
    animated: false
  },
  accessibility: {
    label: "Progress",
    description: null
  }
};

export default ({ _, children, $ = _data }) => {
  const {
    value=_data.value,
    max=_data.max,
    bars=_data.bars,
    options=_data.options,
    accessibility=_data.accessibility
  } = $ || _ || children;

  // Formatage du label
  const formatLabel = (val, format, custom) => {
    if (custom) return custom(val);
    switch (format) {
      case 'percentage':
        return `${Math.round((val / max) * 100)}%`;
      case 'value':
        return val.toString();
      default:
        return '';
    }
  };

  // Style pour la hauteur personnalisée
  const progressStyle = options.height ? { height: options.height } : {};

  // Rendu d'une barre de progression individuelle
  const renderBar = (bar, index, isMultiple) => {
    const percentage = (bar.value / max) * 100;
    const barClasses = [
      'progress-bar',
      bar.variant && `bg-${bar.variant}`,
      (bar.striped || options.striped) && 'progress-bar-striped',
      (bar.animated || options.animated) && 'progress-bar-animated'
    ].filter(Boolean).join(' ');

    // Style pour le placement du texte
    const labelStyle = options.label.placement !== 'center' ? {
      justifyContent: options.label.placement === 'start' ? 'flex-start' : 'flex-end',
      paddingLeft: options.label.placement === 'start' ? '0.5rem' : undefined,
      paddingRight: options.label.placement === 'end' ? '0.5rem' : undefined
    } : {};

    return (
      <WrapperRaw key={index} $={{
        className: barClasses,
        props: {
          role: "progressbar",
          style: {
            width: `${percentage}%`,
            ...labelStyle
          },
          'aria-valuenow': bar.value,
          'aria-valuemin': "0",
          'aria-valuemax': max,
          ...(isMultiple && { 'aria-label': `Progress ${index + 1} of ${bars.length}` })
        }
      }}>
        {options.label.show && (
          bar.label || formatLabel(bar.value, options.label.format, options.label.custom)
        )}
      </WrapperRaw>
    );
  };

  // Gestion des barres multiples ou simple
  const renderBars = () => {
    if (bars.length > 1) {
      return bars.map((bar, index) => renderBar(bar, index, true));
    }
    
    // Si pas de bars spécifiés, utiliser value comme barre unique
    return renderBar({
      value,
      variant: bars[0]?.variant,
      striped: bars[0]?.striped,
      animated: bars[0]?.animated,
      label: bars[0]?.label
    }, 0, false);
  };

  return (
    <WrapperRaw $={{
      className: "progress",
      props: {
        style: progressStyle,
        role: "progressbar",
        'aria-label': accessibility.label,
        ...(accessibility.description && {
          'aria-description': accessibility.description
        })
      }
    }}>
      {renderBars()}
    </WrapperRaw>
  );
};
