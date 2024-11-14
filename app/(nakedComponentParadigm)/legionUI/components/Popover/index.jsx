import React, { useEffect, useRef } from 'react';
import { WrapperRaw } from '../../wrappers';
import { Btn } from '../../importComponents';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const _data = {
  title: "Popover title",
  content: "Content",
  placement: "right",
  trigger: "click",
  trigger_element: {
    type: "button",
    text: "Click me",
    variant: "primary",
    size: null,
    className: "",
    icon: null,
    custom: null
  },
  options: {
    html: false,
    animation: true,
    delay: {
      show: 0,
      hide: 0
    },
    container: false,
    sanitize: true,
    offset: [0, 8]
  },
  dismiss: {
    enabled: false,
    selector: 'body'
  },
  events: {
    onShow: null,
    onShown: null,
    onHide: null,
    onHidden: null
  },
  accessibility: {
    tabindex: "0",
    role: "button",
    keyboard: true
  }
};

export default ({ _, children, $ = _data }) => {
  const {
    title=_data.title,
    content=_data.content,
    placement=_data.placement,
    trigger=_data.trigger,
    trigger_element=_data.trigger_element,
    options=_data.options,
    dismiss=_data.dismiss,
    events=_data.events,
    accessibility=_data.accessibility
  } = $ || _ || children;

  const triggerRef = useRef(null);
  const popoverId = useRef(`popover-${Math.random().toString(36).substr(2, 9)}`);
  const popoverInstance = useRef(null);

  useEffect(() => {
    if (triggerRef.current) {
      // Configuration du popover
      popoverInstance.current = new bootstrap.Popover(triggerRef.current, {
        container: options.container,
        content: options.html ? content : String(content),
        html: options.html,
        placement,
        trigger,
        animation: options.animation,
        delay: options.delay,
        sanitize: options.sanitize,
        offset: options.offset,
        title,
        customClass: dismiss.enabled ? 'dismiss-enabled' : ""
      });

      const element = triggerRef.current;

      // Gestion des événements
      if (events.onShow) element.addEventListener('show.bs.popover', events.onShow);
      if (events.onShown) element.addEventListener('shown.bs.popover', events.onShown);
      if (events.onHide) element.addEventListener('hide.bs.popover', events.onHide);
      if (events.onHidden) element.addEventListener('hidden.bs.popover', events.onHidden);

      // Gestion du dismiss
      if (dismiss.enabled) {
        const handleDismiss = (event) => {
          const target = event.target;
          if (!triggerRef.current.contains(target)) {
            popoverInstance.current.hide();
          }
        };

        document.querySelector(dismiss.selector).addEventListener('click', handleDismiss);
        return () => {
          document.querySelector(dismiss.selector).removeEventListener('click', handleDismiss);
        };
      }

      // Gestion du clavier
      if (accessibility.keyboard) {
        const handleKeyDown = (event) => {
          if (event.key === 'Escape') {
            popoverInstance.current.hide();
          }
        };

        element.addEventListener('keydown', handleKeyDown);
        return () => {
          element.removeEventListener('keydown', handleKeyDown);
        };
      }

      return () => {
        if (popoverInstance.current) {
          // Nettoyage des événements
          if (events.onShow) element.removeEventListener('show.bs.popover', events.onShow);
          if (events.onShown) element.removeEventListener('shown.bs.popover', events.onShown);
          if (events.onHide) element.removeEventListener('hide.bs.popover', events.onHide);
          if (events.onHidden) element.removeEventListener('hidden.bs.popover', events.onHidden);

          // Destruction du popover
          popoverInstance.current.dispose();
        }
      };
    }
  }, [
    title, content, placement, trigger, 
    options.container, options.html, options.animation, 
    options.delay, options.sanitize, options.offset,
    dismiss.enabled, dismiss.selector,
    events.onShow, events.onShown, events.onHide, events.onHidden,
    accessibility.keyboard
  ]);

  const renderTriggerElement = () => {
    const commonProps = {
      ref: triggerRef,
      id: popoverId.current,
      tabIndex: accessibility.tabindex,
      role: accessibility.role,
      'aria-describedby': `${popoverId.current}-content`
    };

    if (children) {
      return (
        <WrapperRaw $={{props: commonProps}}>
          {children}
        </WrapperRaw>
      );
    }

    switch (trigger_element.type) {
      case 'link':
        return (
          <WrapperRaw $={{
            elm: "a",
            className: trigger_element.className,
            props: {
              ...commonProps,
              href: "#"
            }
          }}>
            {trigger_element.icon && <i className={`bi bi-${trigger_element.icon} me-2`}/>}
            {trigger_element.text}
          </WrapperRaw>
        );

      case 'custom':
        return (
          <WrapperRaw $={{
            props: {
              ...commonProps,
              className: trigger_element.className
            }
          }}>
            {trigger_element.custom}
          </WrapperRaw>
        );

      default: // 'button'
        return (
          <Btn $={{
            content: trigger_element.text,
            variant: trigger_element.variant,
            size: trigger_element.size,
            className: trigger_element.className,
            props: commonProps
          }} />
        );
    }
  };

  return renderTriggerElement();
};
