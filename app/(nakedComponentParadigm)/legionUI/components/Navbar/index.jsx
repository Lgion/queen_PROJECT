import React, { useEffect, useRef } from 'react';
import { WrapperRaw } from '../../wrappers';
import { Dropdown, Btn } from '../../importComponents';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const _data = {
  brand: {
    text: "Navbar",
    image: null,
    href: "#"
  },
  theme: {
    style: "light",
    bg: "light",
    expand: "lg"
  },
  placement: null,
  container: "fluid",
  items: [
    {
      text: "Home",
      href: "#",
      active: true,
      disabled: false,
      dropdown: null
    },
    {
      text: "Link",
      href: "#",
      active: false,
      disabled: false,
      dropdown: null
    },
    {
      text: "Disabled",
      href: "#",
      active: false,
      disabled: true,
      dropdown: null
    }
  ],
  form: null,
  text: null,
  scroll: null
};

export default ({ _, children, $ = _data }) => {
  const {
    brand=_data.brand,
    theme=_data.theme,
    placement=_data.placement,
    container=_data.container,
    items=_data.items,
    form=_data.form,
    text=_data.text,
    scroll=_data.scroll
  } = $ || _ || children;

  const navbarId = useRef(`navbar-${Math.random().toString(36).substr(2, 9)}`);
  const collapseRef = useRef(null);

  useEffect(() => {
    if (collapseRef.current) {
      const collapse = new bootstrap.Collapse(collapseRef.current, {
        toggle: false
      });

      return () => {
        collapse.dispose();
      };
    }
  }, []);

  const navbarClasses = [
    'navbar',
    theme.style && `navbar-${theme.style}`,
    theme.bg && `bg-${theme.bg}`,
    theme.expand && `navbar-expand-${theme.expand}`,
    placement
  ].filter(Boolean).join(' ');

  const renderBrand = () => {
    const brandContent = brand.image ? (
      <>
        <img src={brand.image} alt={brand.text} height="30" className="d-inline-block align-text-top me-2" />
        {brand.text}
      </>
    ) : brand.text;

    return (
      <WrapperRaw $={{
        elm: "a",
        className: "navbar-brand",
        props: {
          href: brand.href
        }
      }}>
        {brandContent}
      </WrapperRaw>
    );
  };

  const renderToggler = () => (
    <Btn $={{
      className: "navbar-toggler",
      props: {
        type: "button",
        'data-bs-toggle': "collapse",
        'data-bs-target': `#${navbarId.current}`,
        'aria-controls': navbarId.current,
        'aria-expanded': "false",
        'aria-label': "Toggle navigation"
      }
    }}>
      <span className="navbar-toggler-icon"></span>
    </Btn>
  );

  const renderNavItem = (item, index) => {
    if (item.dropdown) {
      return (
        <li key={index} className="nav-item">
          <Dropdown $={item.dropdown} />
        </li>
      );
    }

    return (
      <li key={index} className="nav-item">
        <WrapperRaw $={{
          elm: "a",
          className: `nav-link${item.active ? ' active' : ''}${item.disabled ? ' disabled' : ''}`,
          props: {
            href: item.href,
            ...(item.disabled && {
              'aria-disabled': 'true',
              tabIndex: -1
            }),
            ...(item.active && { 'aria-current': 'page' })
          }
        }}>
          {item.text}
        </WrapperRaw>
      </li>
    );
  };

  const renderForm = () => {
    if (!form) return null;
    return (
      <form className="d-flex">
        {form.search && (
          <div className="input-group">
            <input 
              type="search" 
              className="form-control" 
              placeholder={form.placeholder || "Search"}
              aria-label="Search"
            />
            <Btn $={{
              variant: "outline-success",
              content: "Search"
            }} />
          </div>
        )}
      </form>
    );
  };

  const renderCollapse = () => {
    const collapseClasses = [
      'collapse navbar-collapse',
      scroll && 'navbar-nav-scroll'
    ].filter(Boolean).join(' ');

    const scrollStyle = scroll ? {
      '--bs-scroll-height': scroll.height
    } : {};

    return (
      <WrapperRaw $={{
        className: collapseClasses,
        props: {
          id: navbarId.current,
          ref: collapseRef,
          style: scrollStyle
        }
      }}>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {items.map((item, index) => renderNavItem(item, index))}
        </ul>
        {text && <span className="navbar-text">{text}</span>}
        {renderForm()}
      </WrapperRaw>
    );
  };

  return (
    <WrapperRaw $={{
      elm: "nav",
      className: navbarClasses,
      props: {
        role: "navigation",
        'aria-label': "Main navigation"
      }
    }}>
      <WrapperRaw $={{
        className: container === true ? 'container' : 'container-fluid'
      }}>
        {renderBrand()}
        {renderToggler()}
        {renderCollapse()}
      </WrapperRaw>
    </WrapperRaw>
  );
};
