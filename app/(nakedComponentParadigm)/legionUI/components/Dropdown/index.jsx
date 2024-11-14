import React, { useEffect, useRef } from 'react';
import { WrapperRaw } from '../../wrappers';
import { Btn } from "../../importComponents";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const _data = {
  trigger: {
    type: "button",    // "button", "link", "split"
    text: "Dropdown",
    variant: "primary",
    size: null,        // lg, sm
    split: false
  },
  menu: {
    items: [
      {
        type: "item",  // item, header, divider, text
        text: "Action 0",
        href: "#",
        active: false,
        disabled: false
      },
      {
        type: "item",  // item, header, divider, text
        text: "Action 1",
        href: "#",
        active: false,
        disabled: false
      },
      {
        type: "item",  // item, header, divider, text
        text: "Action 2",
        href: "#",
        active: false,
        disabled: false
      }
    ],
    dark: false,
    alignment: "start", // start, end
    direction: null,    // up, end, start
    static: false,
    offset: null,
    padding: null
  },
  autoClose: true,     // true, false, 'inside', 'outside'
  reference: "toggle"  // toggle, parent
};

export default ({ _, children, $ = _data }) => {
  const {
    trigger=_data.trigger,
    menu=_data.menu,
    autoClose=_data.autoClose,
    reference=_data.reference
  } = $ || _ || children;

  const dropdownRef = useRef(null);
  const dropdownId = useRef(`dropdown-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (dropdownRef.current) {
      const dropdown = new bootstrap.Dropdown(dropdownRef.current, {
        autoClose,
        reference
      });

      return () => {
        dropdown.dispose();
      };
    }
  }, [autoClose, reference]);

  const renderTrigger = () => {
    const commonProps = {
      variant: trigger.variant,
      size: trigger.size,
      props: {
        'data-bs-toggle': "dropdown",
        'aria-expanded': "false",
        ref: dropdownRef
      }
    };

    if (trigger.split) {
      return (
        <div className="btn-group">
          <Btn $={{
            ...commonProps,
            content: trigger.text
          }} />
          <Btn $={{
            ...commonProps,
            className: "dropdown-toggle dropdown-toggle-split",
            props: {
              ...commonProps.props,
              'aria-label': "Toggle Dropdown"
            }
          }} />
        </div>
      );
    }

    return (
      <Btn $={{
        ...commonProps,
        content: trigger.text,
        className: "dropdown-toggle",
        tag: trigger.type === "link" ? "a" : "button"
      }} />
    );
  };

  const renderMenuItem = (item, index) => {
    switch (item.type) {
      case "header":
        return (
          <WrapperRaw key={index} $={{
            elm: "h6",
            className: "dropdown-header"
          }}>
            {item.text}
          </WrapperRaw>
        );

      case "divider":
        return (
          <WrapperRaw key={index} $={{
            elm: "hr",
            className: "dropdown-divider"
          }} />
        );

      case "text":
        return (
          <WrapperRaw key={index} $={{
            elm: "span",
            className: "dropdown-item-text"
          }}>
            {item.text}
          </WrapperRaw>
        );

      default: // "item"
        return (
          <WrapperRaw key={index} $={{
            elm: "a",
            className: `dropdown-item${item.active ? ' active' : ''}${item.disabled ? ' disabled' : ''}`,
            props: {
              href: item.href,
              ...(item.disabled && { 
                'aria-disabled': "true",
                tabIndex: -1
              })
            }
          }}>
            {item.text}
          </WrapperRaw>
        );
    }
  };

  const menuClasses = [
    "dropdown-menu",
    menu.dark && "dropdown-menu-dark",
    menu.alignment && `dropdown-menu-${menu.alignment}`,
    menu.direction && `drop${menu.direction}`,
    menu.static && "position-static"
  ].filter(Boolean).join(" ");

  const menuStyle = {
    ...(menu.offset && { '--bs-dropdown-offset': menu.offset }),
    ...(menu.padding && { '--bs-dropdown-padding-y': menu.padding })
  };

  return (
    <WrapperRaw $={{
      className: `dropdown${menu.direction ? ` drop${menu.direction}` : ''}`
    }}>
      {renderTrigger()}
      <WrapperRaw $={{
        elm: "ul",
        className: menuClasses,
        props: {
          'aria-labelledby': dropdownId.current,
          style: menuStyle
        }
      }}>
        {menu.items.map((item, index) => (
          <li key={index}>
            {renderMenuItem(item, index)}
          </li>
        ))}
      </WrapperRaw>
    </WrapperRaw>
  );
};
