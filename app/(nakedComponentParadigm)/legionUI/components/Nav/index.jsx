import React, { useEffect, useRef } from 'react';
import { WrapperRaw } from '../../wrappers';
import { Dropdown } from '../../importComponents';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const _data = {
  items: [
    {
      text: "Active",
      href: "#",
      active: true,
      disabled: false,
      dropdown: null,
      target: null,
      icon: null
    },
    {
      text: "Link",
      href: "#",
      active: false,
      disabled: false,
      dropdown: null,
      target: null,
      icon: null
    },
    {
      text: "Disabled",
      href: "#",
      active: false,
      disabled: true,
      dropdown: null,
      target: null,
      icon: null
    }
  ],
  style: {
    type: "tabs", // "tabs", "pills", null
    fill: false,
    justify: false,
    alignment: null, // center, end
    vertical: false,
    responsive: null // sm, md, lg, xl
  },
  tabs: {
    fade: false,
    content: []
  },
  role: "navigation",
  ariaLabel: "Main navigation"
};

export default ({ _, children, $ = _data }) => {
  const {
    items=_data.items,
    style=_data.style,
    tabs=_data.tabs,
    role=_data.role,
    ariaLabel=_data.ariaLabel
  } = $ || _ || children;

  const navRef = useRef(null);
  const tabsInitialized = useRef(false);

  useEffect(() => {
    if (style.type === 'tabs' && !tabsInitialized.current && navRef.current) {
      const tabElements = navRef.current.querySelectorAll('[data-bs-toggle="tab"]');
      tabElements.forEach(tabElement => {
        const tab = new bootstrap.Tab(tabElement);

        // Événements de tab
        tabElement.addEventListener('show.bs.tab', event => {
          const { target } = event;
          // Gérer l'événement show.bs.tab
        });

        tabElement.addEventListener('shown.bs.tab', event => {
          const { target } = event;
          // Gérer l'événement shown.bs.tab
        });
      });

      tabsInitialized.current = true;

      return () => {
        tabElements.forEach(tabElement => {
          const tab = bootstrap.Tab.getInstance(tabElement);
          if (tab) {
            tab.dispose();
          }
        });
      };
    }
  }, [style.type]);

  const navClasses = [
    'nav',
    style.type && `nav-${style.type}`,
    style.fill && 'nav-fill',
    style.justify && 'nav-justified',
    style.alignment && `justify-content-${style.alignment}`,
    style.vertical && (style.responsive 
      ? `flex-${style.responsive}-column`
      : 'flex-column')
  ].filter(Boolean).join(' ');

  const renderIcon = (icon) => {
    if (!icon) return null;
    return <i className={`bi bi-${icon} me-2`}></i>;
  };

  const renderNavItem = (item, index) => {
    if (item.dropdown) {
      return (
        <li key={index} className="nav-item dropdown">
          <Dropdown $={item.dropdown} />
        </li>
      );
    }

    const linkClasses = [
      'nav-link',
      item.active && 'active',
      item.disabled && 'disabled'
    ].filter(Boolean).join(' ');

    const linkProps = {
      className: linkClasses,
      href: item.href,
      ...(item.disabled && { 
        'aria-disabled': 'true',
        tabIndex: -1
      }),
      ...(item.active && { 'aria-current': 'page' }),
      ...(item.target && {
        'data-bs-toggle': 'tab',
        'data-bs-target': item.target,
        role: 'tab',
        'aria-controls': item.target.replace('#', ''),
        'aria-selected': item.active
      })
    };

    return (
      <li key={index} className="nav-item" role={item.target ? 'presentation' : undefined}>
        <WrapperRaw $={{
          elm: "a",
          props: linkProps
        }}>
          {renderIcon(item.icon)}
          {item.text}
        </WrapperRaw>
      </li>
    );
  };

  const renderTabContent = () => {
    if (!tabs.content.length) return null;

    const tabContentClasses = [
      'tab-content',
      tabs.fade && 'fade'
    ].filter(Boolean).join(' ');

    return (
      <div className={tabContentClasses}>
        {tabs.content.map((content, index) => (
          <div
            key={index}
            className={`tab-pane${content.active ? ' show active' : ''}`}
            id={content.id}
            role="tabpanel"
            aria-labelledby={`${content.id}-tab`}
          >
            {content.content}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <WrapperRaw $={{
        elm: "nav",
        className: navClasses,
        props: {
          ref: navRef,
          role,
          'aria-label': ariaLabel
        }
      }}>
        <WrapperRaw $={{
          elm: "ul",
          className: "nav-list"
        }}>
          {items.map((item, index) => renderNavItem(item, index))}
        </WrapperRaw>
      </WrapperRaw>
      {renderTabContent()}
    </>
  );
};
