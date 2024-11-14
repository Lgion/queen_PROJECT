import React from 'react';
import { WrapperRaw } from '../../wrappers';
import { Badge } from '../../importComponents';

const _data = {
  items: [
    {
      content: "Texte Liste Group 0",
      active: false,
      disabled: false,
      type: "item", // item, link, button
      href: null,
      variant: null, // primary, success, etc.
      badge: null, // { text: "14", variant: "primary" }
      checkbox: false,
      radio: false,
      customContent: null, // { heading: "Titre", text: "Description", small: "Info" }
      onClick: null
    },
    {
      content: "Texte Liste Group 1",
      active: false,
      disabled: false,
      type: "item", // item, link, button
      href: null,
      variant: null, // primary, success, etc.
      badge: null, // { text: "14", variant: "primary" }
      checkbox: false,
      radio: false,
      customContent: null, // { heading: "Titre", text: "Description", small: "Info" }
      onClick: null
    },
    {
      content: "Texte Liste Group 2",
      active: false,
      disabled: false,
      type: "item", // item, link, button
      href: null,
      variant: null, // primary, success, etc.
      badge: null, // { text: "14", variant: "primary" }
      checkbox: false,
      radio: false,
      customContent: null, // { heading: "Titre", text: "Description", small: "Info" }
      onClick: null
    }
  ],
  numbered: false,
  flush: false,
  horizontal: null, // true ou breakpoint (sm, md, etc.)
  actionable: false
};

export default ({ _, children, $ = _data }) => {
  const {
    items=_data.items,
    numbered=_data.numbered,
    flush=_data.flush,
    horizontal=_data.horizontal,
    actionable=_data.actionable
  } = $ || _ || children;

  // Construction des classes pour le conteneur
  const groupClasses = [
    'list-group',
    numbered && 'list-group-numbered',
    flush && 'list-group-flush',
    horizontal && (typeof horizontal === 'string' 
      ? `list-group-horizontal-${horizontal}`
      : 'list-group-horizontal')
  ].filter(Boolean).join(' ');

  const renderCustomContent = (content) => (
    <>
      <div className="ms-2 me-auto">
        <div className="fw-bold">{content.heading}</div>
        {content.text}
      </div>
      {content.small && <small>{content.small}</small>}
    </>
  );

  const renderItem = (item, index) => {
    // Classes de base pour l'item
    const itemClasses = [
      'list-group-item',
      item.variant && `list-group-item-${item.variant}`,
      item.active && 'active',
      item.disabled && 'disabled',
      (actionable || item.type !== 'item') && 'list-group-item-action'
    ].filter(Boolean).join(' ');

    // Props communs pour tous les types d'items
    const commonProps = {
      className: itemClasses,
      'aria-current': item.active ? 'true' : undefined,
      'aria-disabled': item.disabled ? 'true' : undefined,
      onClick: !item.disabled && item.onClick,
      ...(item.type === 'button' && { type: 'button' })
    };

    // Contenu de l'item
    const itemContent = (
      <>
        {item.checkbox && (
          <input 
            className="form-check-input me-2" 
            type="checkbox" 
            value="" 
            aria-label={`Checkbox for ${item.content}`}
          />
        )}
        {item.radio && (
          <input 
            className="form-check-input me-2" 
            type="radio" 
            name="listGroupRadio" 
            value="" 
            aria-label={`Radio for ${item.content}`}
          />
        )}
        {item.customContent 
          ? renderCustomContent(item.customContent)
          : item.content
        }
        {item.badge && (
          <Badge $={{
            content: item.badge.text,
            type: item.badge.variant,
            className: "ms-2"
          }} />
        )}
      </>
    );

    // Rendu selon le type
    switch (item.type) {
      case 'link':
        return (
          <WrapperRaw key={index} $={{
            elm: "a",
            props: {
              ...commonProps,
              href: item.disabled ? undefined : (item.href || '#')
            }
          }}>
            {itemContent}
          </WrapperRaw>
        );

      case 'button':
        return (
          <WrapperRaw key={index} $={{
            elm: "button",
            props: commonProps
          }}>
            {itemContent}
          </WrapperRaw>
        );

      default:
        return (
          <WrapperRaw key={index} $={{
            elm: "li",
            props: commonProps
          }}>
            {itemContent}
          </WrapperRaw>
        );
    }
  };

  return (
    <WrapperRaw $={{
      elm: "ul",
      className: groupClasses,
      props: {
        role: "list"
      }
    }}>
      {items.map((item, index) => renderItem(item, index))}
    </WrapperRaw>
  );
};
