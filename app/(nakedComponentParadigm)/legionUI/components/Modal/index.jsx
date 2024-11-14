import React, { useEffect, useRef } from 'react';
import { WrapperRaw, WrapperHeading } from '../../wrappers';
import { Btn } from '../../importComponents';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const _data = {
  id: "exampleModal",
  title: {
    content: "Modal title",
    tag: "h5",
    className: ""
  },
  content: {
    text: "Content",
    scrollable: false,
    grid: null,
    form: null
  },
  size: null, // sm, lg, xl
  position: {
    centered: false,
    fullscreen: null // true ou breakpoint
  },
  footer: {
    show: true,
    buttons: [
      {
        text: "Close",
        variant: "secondary",
        dismiss: true
      },
      {
        text: "Save changes",
        variant: "primary",
        onClick: null
      }
    ]
  },
  options: {
    backdrop: true,
    keyboard: true,
    focus: true,
    animation: true
  },
  onShow: null,
  onShown: null,
  onHide: null,
  onHidden: null
};

export default ({ _, children, $ = _data }) => {
  const {
    id=_data.id,
    title=_data.title,
    content=_data.content,
    size=_data.size,
    position=_data.position,
    footer=_data.footer,
    options=_data.options,
    onShow=_data.onShow,
    onShown=_data.onShown,
    onHide=_data.onHide,
    onHidden=_data.onHidden
  } = $ || _ || children;

  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      modalInstance.current = new bootstrap.Modal(modalRef.current, {
        backdrop: options.backdrop,
        keyboard: options.keyboard,
        focus: options.focus
      });

      // Gestion des événements
      const modal = modalRef.current;
      if (onShow) modal.addEventListener('show.bs.modal', onShow);
      if (onShown) modal.addEventListener('shown.bs.modal', onShown);
      if (onHide) modal.addEventListener('hide.bs.modal', onHide);
      if (onHidden) modal.addEventListener('hidden.bs.modal', onHidden);

      return () => {
        if (modalInstance.current) {
          modalInstance.current.dispose();
        }
        if (onShow) modal.removeEventListener('show.bs.modal', onShow);
        if (onShown) modal.removeEventListener('shown.bs.modal', onShown);
        if (onHide) modal.removeEventListener('hide.bs.modal', onHide);
        if (onHidden) modal.removeEventListener('hidden.bs.modal', onHidden);
      };
    }
  }, [options.backdrop, options.keyboard, options.focus, onShow, onShown, onHide, onHidden]);

  const dialogClasses = [
    'modal-dialog',
    size && `modal-${size}`,
    position.centered && 'modal-dialog-centered',
    content.scrollable && 'modal-dialog-scrollable',
    position.fullscreen && (
      position.fullscreen === true 
        ? 'modal-fullscreen'
        : `modal-fullscreen-${position.fullscreen}-down`
    )
  ].filter(Boolean).join(' ');

  const renderForm = () => {
    if (!content.form) return null;
    return (
      <form>
        {content.form.fields.map((field, index) => (
          <div key={index} className="mb-3">
            <label className="form-label">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea className="form-control" rows="3" />
            ) : (
              <input type={field.type} className="form-control" />
            )}
          </div>
        ))}
      </form>
    );
  };

  const renderGrid = () => {
    if (!content.grid) return null;
    // Implémentation de la grille Bootstrap
    return (
      <div className="container-fluid">
        {/* Rendu de la grille selon la configuration */}
      </div>
    );
  };

  const renderContent = () => (
    content.form ? renderForm() :
    content.grid ? renderGrid() :
    content.text || children
  );

  return (
    <WrapperRaw $={{
      className: `modal${options.animation ? ' fade' : ''}`,
      props: {
        id,
        ref: modalRef,
        tabIndex: -1,
        'aria-labelledby': `${id}Label`,
        'aria-hidden': 'true',
        'data-bs-backdrop': options.backdrop,
        'data-bs-keyboard': options.keyboard
      }
    }}>
      <WrapperRaw $={{className: dialogClasses}}>
        <WrapperRaw $={{className: "modal-content"}}>
          <WrapperRaw $={{className: "modal-header"}}>
            <WrapperHeading $={{
              lvl: parseInt(title.tag.replace('h', '')) || 5,
              className: `modal-title ${title.className}`,
              props: { id: `${id}Label` }
            }}>
              {title.content}
            </WrapperHeading>
            <Btn $={{
              variant: 'close',
              props: {
                'data-bs-dismiss': 'modal',
                'aria-label': 'Close'
              }
            }} />
          </WrapperRaw>

          <WrapperRaw $={{className: "modal-body"}}>
            {renderContent()}
          </WrapperRaw>

          {footer.show && (
            <WrapperRaw $={{className: "modal-footer"}}>
              {footer.buttons.map((button, index) => (
                <Btn key={index} $={{
                  content: button.text,
                  variant: button.variant,
                  props: {
                    ...(button.dismiss && { 'data-bs-dismiss': 'modal' }),
                    onClick: button.onClick
                  }
                }} />
              ))}
            </WrapperRaw>
          )}
        </WrapperRaw>
      </WrapperRaw>
    </WrapperRaw>
  );
};
