import React, { useState, useEffect, useRef } from 'react';
import { WrapperRaw, WrapperHeading } from '../../wrappers';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const _data = {
  id: 'collapseExample',
  trigger: {
    tag: 'button',
    text: 'Toggle',
    role: 'button',
    className: 'btn btn-primary'
  },
  content: {
    text: 'Content',
    tag: 'section',
    headingLevel: null,
    role: 'region',
    className: ''
  },
  parent: null,
  show: false,
  transition: true,
  multiTarget: false,
  targets: []
};

export default ({ _, children, $ = _data }) => {
  const {
    id=_data.id,
    trigger=_data.trigger,
    content=_data.content,
    parent=_data.parent,
    show=_data.show,
    transition=_data.transition,
    multiTarget=_data.multiTarget,
    targets=_data.targets
  } = $ || _ || children;

  const [isOpen, setIsOpen] = useState(show);
  const collapseRef = useRef(null);
  const bsCollapse = useRef(null);

  useEffect(() => {
    if (collapseRef.current && transition) {
      bsCollapse.current = new bootstrap.Collapse(collapseRef.current, {
        toggle: false,
        parent: parent
      });

      return () => {
        if (bsCollapse.current) {
          bsCollapse.current.dispose();
        }
      };
    }
  }, [transition, parent]);

  useEffect(() => {
    if (bsCollapse.current && transition) {
      if (isOpen) {
        bsCollapse.current.show();
      } else {
        bsCollapse.current.hide();
      }
    }
  }, [isOpen, transition]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const targetIds = multiTarget ? targets : [id];

  const renderTrigger = () => {
    const triggerProps = {
      onClick: handleToggle,
      className: trigger.className,
      'aria-expanded': isOpen,
      'aria-controls': targetIds.join(' '),
      ...(trigger.tag === 'a' && { role: trigger.role })
    };

    return (
      <WrapperRaw $={{
        elm: trigger.tag,
        props: triggerProps
      }}>
        {trigger.text}
      </WrapperRaw>
    );
  };

  const renderContent = () => {
    const contentClasses = [
      'collapse',
      isOpen && !transition && 'show',
      content.className
    ].filter(Boolean).join(' ');

    const contentProps = {
      id,
      ref: collapseRef,
      className: contentClasses,
      role: content.role,
      'aria-labelledby': `${id}-trigger`,
      ...(parent && { 'data-bs-parent': parent })
    };

    return (
      <WrapperRaw $={{
        elm: content.tag,
        props: contentProps
      }}>
        {content.headingLevel ? (
          <>
            <WrapperHeading $={{
              lvl: content.headingLevel,
              className: 'collapse-heading'
            }}>
              {content.text}
            </WrapperHeading>
            {children}
          </>
        ) : (
          content.text || children
        )}
      </WrapperRaw>
    );
  };

  return (
    <WrapperRaw>
      {renderTrigger()}
      {renderContent()}
    </WrapperRaw>
  );
};
