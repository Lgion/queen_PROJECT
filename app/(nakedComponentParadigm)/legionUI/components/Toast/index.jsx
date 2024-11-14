import React, { useState, useEffect, useRef } from 'react';
import { WrapperRaw } from '../../wrappers';
import { Btn } from '../../importComponents';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const _data = {
  header: {
    title: "Bootstrap",
    subtitle: "11 mins ago",
    image: null,
    closeButton: true
  },
  content: {
    text: "Hello world",
    html: null,
    actions: []
  },
  options: {
    autohide: true,
    delay: 5000,
    animation: true,
    placement: {
      position: "top-right",
      container: null
    }
  },
  style: {
    variant: null,
    translucent: true,
    border: true
  },
  accessibility: {
    role: "alert",
    live: "assertive"
  }
};

export default ({ _, children, $ = _data }) => {
  const {
    header=_data.header,
    content=_data.content,
    options=_data.options,
    style=_data.style,
    accessibility=_data.accessibility
  } = $ || _ || children;

  const [show, setShow] = useState(true);
  const toastRef = useRef(null);
  const toastInstance = useRef(null);

  useEffect(() => {
    if (toastRef.current) {
      toastInstance.current = new bootstrap.Toast(toastRef.current, {
        animation: options.animation,
        autohide: options.autohide,
        delay: options.delay
      });

      if (show) {
        toastInstance.current.show();
      }

      return () => {
        if (toastInstance.current) {
          toastInstance.current.dispose();
        }
      };
    }
  }, [options.animation, options.autohide, options.delay, show]);

  const handleClose = () => {
    if (toastInstance.current) {
      toastInstance.current.hide();
    }
    setShow(false);
  };

  if (!show) return null;

  // Classes pour le conteneur de placement
  const placementClasses = {
    'top-right': 'top-0 end-0',
    'top-left': 'top-0 start-0',
    'bottom-right': 'bottom-0 end-0',
    'bottom-left': 'bottom-0 start-0',
    'top-center': 'top-0 start-50 translate-middle-x',
    'bottom-center': 'bottom-0 start-50 translate-middle-x'
  };

  // Classes pour le toast
  const toastClasses = [
    'toast',
    style.variant && `bg-${style.variant}`,
    style.variant && ['light', 'warning', 'info'].includes(style.variant) ? 'text-dark' : 'text-white',
    style.translucent && 'bg-translucent',
    style.border && 'border',
    options.animation && 'fade'
  ].filter(Boolean).join(' ');

  const renderHeader = () => {
    if (!header.title && !header.subtitle && !header.image && !header.closeButton) {
      return null;
    }

    return (
      <WrapperRaw $={{className: "toast-header"}}>
        {header.image && (
          <img 
            src={header.image} 
            className="rounded me-2" 
            alt=""
            width="20" 
            height="20"
          />
        )}
        <strong className="me-auto">{header.title}</strong>
        {header.subtitle && <small>{header.subtitle}</small>}
        {header.closeButton && (
          <Btn $={{
            variant: 'close',
            props: {
              onClick: handleClose,
              'aria-label': 'Close'
            }
          }} />
        )}
      </WrapperRaw>
    );
  };

  const renderContent = () => (
    <WrapperRaw $={{className: "toast-body"}}>
      {content.html ? (
        <div dangerouslySetInnerHTML={{ __html: content.html }} />
      ) : (
        content.text
      )}
      {content.actions?.length > 0 && (
        <div className="mt-2 pt-2 border-top">
          {content.actions.map((action, index) => (
            <Btn key={index} $={{
              variant: action.variant,
              content: action.text,
              props: {
                onClick: action.onClick,
                className: index > 0 ? 'ms-2' : ''
              }
            }} />
          ))}
        </div>
      )}
    </WrapperRaw>
  );

  const toast = (
    <WrapperRaw $={{
      className: toastClasses,
      props: {
        ref: toastRef,
        role: accessibility.role,
        'aria-live': accessibility.live,
        'aria-atomic': 'true'
      }
    }}>
      {renderHeader()}
      {renderContent()}
    </WrapperRaw>
  );

  // Si un conteneur de placement est spécifié
  if (options.placement.position) {
    return (
      <WrapperRaw $={{
        className: `position-fixed ${placementClasses[options.placement.position]} p-3`,
        props: {
          style: { zIndex: 1050 }
        }
      }}>
        {toast}
      </WrapperRaw>
    );
  }

  // Si un conteneur personnalisé est spécifié
  if (options.placement.container) {
    const container = document.querySelector(options.placement.container);
    return container ? ReactDOM.createPortal(toast, container) : toast;
  }

  return toast;
};
