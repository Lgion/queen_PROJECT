import { WrapperRaw } from "../../wrappers";

const variants = {
    primary: "primary",
    secondary: "secondary",
    success: "success",
    danger: "danger",
    warning: "warning text-dark",
    info: "info text-dark",
    light: "light text-dark",
    dark: "dark",
    close: "close"
}

const _data = {
    content: "Button text",
    variant: "primary", // primary, secondary, success, etc., ou 'close' pour un close button
    outline: true, // true pour btn-outline-*
    size: null, // lg, sm
    tag: "button", // a, button, input
    disabled: false,
    toggle: false,
    active: false,
    noWrap: false,
    href: null,
    role: null,
    value: null,
    type: "button", // button, submit, reset (pour <button> et <input>)
    white: false, // Nouveau: pour btn-close-white
}

export default ({_,children,$=_data}) => {
    const {
        variant=_data.variant,
        outline=_data.outline,
        size=_data.size,
        tag=_data.tag,
        disabled=_data.disabled,
        toggle=_data.toggle,
        active=_data.active,
        noWrap=_data.noWrap,
        href=_data.href,
        role=_data.role,
        value=_data.value,
        type=_data.type,
        white=_data.white,
        content,
        props
    } = $||_||children;

    // Construction de la classe CSS principale
    const isCloseButton = variant === 'close';
    const btnClasses = [
        isCloseButton ? 'btn-close' : 'btn',
        !isCloseButton && (
            outline 
                ? `btn-outline-${variants[variant] || variant}`
                : `btn-${variants[variant] || variant}`
        ),
        size && (isCloseButton ? `btn-close-${size}` : `btn-${size}`),
        active && 'active',
        noWrap && 'text-nowrap',
        disabled && tag === 'a' && 'disabled',
        white && isCloseButton && 'btn-close-white'
    ].filter(Boolean).join(' ');

    // Attributs communs pour l'accessibilité et les fonctionnalités
    const commonProps = {
        className: btnClasses,
        role: role || (tag === 'a' ? 'button' : undefined),
        'aria-pressed': toggle ? active : undefined,
        'data-bs-toggle': toggle ? 'button' : undefined,
        disabled: disabled && tag !== 'a' ? true : undefined,
        tabIndex: disabled && tag === 'a' ? -1 : undefined,
        'aria-label': isCloseButton ? (content || 'Close') : undefined,
        ...props
    };

    // Attributs spécifiques selon le tag
    const specificProps = {
        a: {
            href: !disabled ? href : undefined,
            'aria-disabled': disabled ? true : undefined
        },
        button: {
            type: type || 'button'
        },
        input: {
            type: type || 'button',
            value: value || content
        }
    };

    // Fusion des props selon le tag
    const finalProps = {
        ...commonProps,
        ...(specificProps[tag] || {})
    };

    // Si c'est un input ou un close button, pas besoin de children
    const finalContent = tag === 'input' || isCloseButton ? null : (children || content);

    return <WrapperRaw $={{
        elm: tag || 'button',
        props: finalProps
    }} _={finalContent} />;
};