import React, { useEffect, useRef, useState } from 'react';
import { WrapperRaw } from '../../wrappers';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const _data = {
  items: [
    {
      text: "Section 1",
      target: "#section1",
      children: []
    }
  ],
  options: {
    offset: 10,
    method: "auto", // auto, offset, position
    type: "nav", // nav, list-group
    nested: false
  },
  style: {
    variant: "pills", // pills, tabs, null
    alignment: "start", // start, center, end
    className: ""
  },
  events: {
    onActivate: null
  }
};

export default ({ _, children, $ = _data }) => {
  const {
    items=_data.items,
    options=_data.options,
    style=_data.style,
    events=_data.events
  } = $ || _ || children;

  const [activeId, setActiveId] = useState('');
  const scrollspyRef = useRef(null);
  const scrollspyInstance = useRef(null);

  useEffect(() => {
    if (scrollspyRef.current) {
      // Initialisation du ScrollSpy
      scrollspyInstance.current = new bootstrap.ScrollSpy(document.body, {
        target: scrollspyRef.current,
        offset: options.offset,
        method: options.method
      });

      // Gestion de l'événement activate
      if (events.onActivate) {
        document.body.addEventListener('activate.bs.scrollspy', (e) => {
          const id = e.relatedTarget;
          setActiveId(id);
          events.onActivate(id);
        });
      }

      // Observer les modifications du DOM pour refresh
      const observer = new MutationObserver(() => {
        scrollspyInstance.current?.refresh();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      return () => {
        if (scrollspyInstance.current) {
          scrollspyInstance.current.dispose();
        }
        observer.disconnect();
        if (events.onActivate) {
          document.body.removeEventListener('activate.bs.scrollspy', events.onActivate);
        }
      };
    }
  }, [options.offset, options.method, events.onActivate]);

  const renderNestedItems = (items) => {
    return items.map((item, index) => (
      <li key={index} className={options.type === 'nav' ? 'nav-item' : ''}>
        <WrapperRaw $={{
          elm: "a",
          className: getItemClasses(item),
          props: {
            href: item.target,
            'aria-current': item.target === activeId ? 'true' : undefined,
            role: "button",
            tabIndex: 0
          }
        }}>
          {item.text}
        </WrapperRaw>
        {options.nested && item.children?.length > 0 && (
          <WrapperRaw $={{
            elm: "ul",
            className: options.type === 'nav' ? 'nav ms-3' : 'list-group'
          }}>
            {renderNestedItems(item.children)}
          </WrapperRaw>
        )}
      </li>
    ));
  };

  const getItemClasses = (item) => {
    if (options.type === 'nav') {
      return [
        'nav-link',
        item.target === activeId && 'active'
      ].filter(Boolean).join(' ');
    }
    return [
      'list-group-item',
      'list-group-item-action',
      item.target === activeId && 'active'
    ].filter(Boolean).join(' ');
  };

  const getContainerClasses = () => {
    if (options.type === 'nav') {
      return [
        'nav',
        style.variant && `nav-${style.variant}`,
        style.alignment !== 'start' && `justify-content-${style.alignment}`,
        style.className
      ].filter(Boolean).join(' ');
    }
    return [
      'list-group',
      style.className
    ].filter(Boolean).join(' ');
  };

  return (
    <WrapperRaw $={{
      elm: options.type === 'nav' ? 'nav' : 'div',
      className: getContainerClasses(),
      props: {
        ref: scrollspyRef,
        'data-bs-spy': 'scroll',
        'data-bs-target': '#scrollspy',
        'data-bs-offset': options.offset,
        'data-bs-method': options.method,
        role: options.type === 'nav' ? 'navigation' : 'complementary',
        'aria-label': 'Page navigation'
      }
    }}>
      <WrapperRaw $={{
        elm: "ul",
        className: options.type === 'nav' ? 'nav' : 'list-group',
        props: {
          id: 'scrollspy'
        }
      }}>
        {renderNestedItems(items)}
      </WrapperRaw>
    </WrapperRaw>
  );
};
