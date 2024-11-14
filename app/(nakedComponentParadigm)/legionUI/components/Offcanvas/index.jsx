import React, { useEffect, useRef } from 'react';
import { WrapperRaw, WrapperHeading } from '../../wrappers';
import { Btn } from '../../importComponents';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const _data = {
  id: "offcanvasExample",
  title: {
    text: "Offcanvas title",
    tag: "h5",
    className: ""
  },
  content: {
    text: "Content",
    html: null
  },
  placement: "start",
  options: {
    scroll: false,
    backdrop: true,
    keyboard: true
  },
  show: false,
  onShow: null,
  onShown: null,
  onHide: null,
  onHidden: null,
  trigger: {
    tag: "button",
    text: "Open",
    className: "btn btn-primary"
  }
};

export default ({ _, children, $ = _data }) => {
  const {
    id=_data.id,
    title=_data.title,
    content=_data.content,
    placement=_data.placement,
    options=_data.options,
    show=_data.show,
    onShow=_data.onShow,
    onShown=_data.onShown,
    onHide=_data.onHide,
    onHidden=_data.onHidden,
    trigger=_data.trigger
  } = $ || _ || children;

  const offcanvasRef = useRef(null);
  const offcanvasInstance = useRef(null);

  useEffect(() => {
    if (offcanvasRef.current) {
      offcanvasInstance.current = new bootstrap.Offcanvas(offcanvasRef.current, {
        backdrop: options.backdrop,
        keyboard: options.keyboard,
        scroll: options.scroll
      });

      // Gestion des événements
      const offcanvas = offcanvasRef.current;
      if (onShow) offcanvas.addEventListener('show.bs.offcanvas', onShow);
      if (onShown) offcanvas.addEventListener('shown.bs.offcanvas', onShown);
      if (onHide) offcanvas.addEventListener('hide.bs.offcanvas', onHide);
      if (onHidden) offcanvas.addEventListener('hidden.bs.offcanvas', onHidden);

      // Afficher si show est true initialement
      if (show) offcanvasInstance.current.show();

      return () => {
        if (offcanvasInstance.current) {
          offcanvasInstance.current.dispose();
        }
        if (onShow) offcanvas.removeEventListener('show.bs.offcanvas', onShow);
        if (onShown) offcanvas.removeEventListener('shown.bs.offcanvas', onShown);
        if (onHide) offcanvas.removeEventListener('hide.bs.offcanvas', onHide);
        if (onHidden) offcanvas.removeEventListener('hidden.bs.offcanvas', onHidden);
      };
    }
  }, [options.backdrop, options.keyboard, options.scroll, show, onShow, onShown, onHide, onHidden]);

  const renderTrigger = () => (
    <WrapperRaw $={{
      elm: trigger.tag,
      className: trigger.className,
      props: {
        type: trigger.tag === 'button' ? 'button' : undefined,
        'data-bs-toggle': "offcanvas",
        'data-bs-target': `#${id}`,
        'aria-controls': id
      }
    }}>
      {trigger.text}
    </WrapperRaw>
  );

  const renderContent = () => {
    if (content.html) {
      return <div dangerouslySetInnerHTML={{ __html: content.html }} />;
    }
    return content.text || children;
  };

  return (
    <>
      {renderTrigger()}
      <WrapperRaw $={{
        className: `offcanvas offcanvas-${placement}`,
        props: {
          id,
          ref: offcanvasRef,
          tabIndex: -1,
          'aria-labelledby': `${id}Label`,
          'data-bs-backdrop': options.backdrop,
          'data-bs-keyboard': options.keyboard,
          'data-bs-scroll': options.scroll
        }
      }}>
        <WrapperRaw $={{className: "offcanvas-header"}}>
          <WrapperHeading $={{
            lvl: parseInt(title.tag.replace('h', '')) || 5,
            className: `offcanvas-title ${title.className}`,
            props: { id: `${id}Label` }
          }}>
            {title.text}
          </WrapperHeading>
          <Btn $={{
            variant: 'close',
            props: {
              'data-bs-dismiss': 'offcanvas',
              'aria-label': 'Close'
            }
          }} />
        </WrapperRaw>
        <WrapperRaw $={{className: "offcanvas-body"}}>
          {renderContent()}
        </WrapperRaw>
      </WrapperRaw>
    </>
  );
};
