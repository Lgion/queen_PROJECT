import React from 'react';
import {WrapperRaw} from "../../wrappers"
import Btn from "../Button"

const _data = {
    vertical: false,
    size: null,           // "lg" ou "sm"
    label: "Basic example",
    isToolbar: false,    
    spacing: null,       // "me-2", etc.
    items: [
        {
            content: "Left",
            variant: "secondary",
            type: "button",     // "button", "checkbox", "radio", "link"
            outline: false,     
            active: false,      
            dropdown: null,     
            href: null,        
            inputGroup: null   
        },
        {
            content: "Middle",
            variant: "secondary",
            type: "button"
        },
        {
            content: "Right",
            variant: "secondary",
            type: "button"
        }
    ]
}

export default ({_,children,$=_data}) => {
    const {
        vertical=_data.vertical,
        size=_data.size,
        label=_data.label,
        isToolbar=_data.isToolbar,
        spacing=_data.spacing,
        items=_data.items
    } = $||_||children;

    // Classes de base pour le groupe
    const baseClasses = [
        isToolbar ? 'btn-toolbar' : vertical ? 'btn-group-vertical' : 'btn-group',
        size && `btn-group-${size}`,
        spacing,
    ].filter(Boolean).join(' ');

    // Gestion des items avec radio/checkbox
    const [checkedItems, setCheckedItems] = React.useState(
        items.reduce((acc, item, index) => {
            if (item.type === 'checkbox' || item.type === 'radio') {
                acc[index] = item.active || false;
            }
            return acc;
        }, {})
    );

    const handleItemClick = (index, type) => {
        if (type === 'checkbox') {
            setCheckedItems(prev => ({
                ...prev,
                [index]: !prev[index]
            }));
        } else if (type === 'radio') {
            setCheckedItems(
                Object.keys(checkedItems).reduce((acc, key) => ({
                    ...acc,
                    [key]: parseInt(key) === index
                }), {})
            );
        }
    };

    const renderItem = (item, index) => {
        const isCheckable = item.type === 'checkbox' || item.type === 'radio';
        const itemProps = {
            ...item,
            active: isCheckable ? checkedItems[index] : item.active,
            onClick: isCheckable ? () => handleItemClick(index, item.type) : undefined,
            props: {
                ...(item.props || {}),
                ...(isCheckable ? {
                    'aria-pressed': checkedItems[index],
                    'data-bs-toggle': item.type
                } : {})
            }
        };

        // Gestion des input groups
        if (item.inputGroup) {
            return (
                <WrapperRaw key={index} $={{
                    className: "input-group",
                    children: [
                        <Btn key="btn" $={itemProps} />,
                        item.inputGroup
                    ]
                }} />
            );
        }

        // Gestion des dropdowns
        if (item.dropdown) {
            return (
                <WrapperRaw key={index} $={{
                    className: "btn-group",
                    children: [
                        <Btn key="btn" $={itemProps} />,
                        item.dropdown
                    ]
                }} />
            );
        }

        return <Btn key={index} $={itemProps} />;
    };

    return (
        <WrapperRaw $={{
            className: baseClasses,
            props: {
                role: isToolbar ? "toolbar" : "group",
                'aria-label': label
            }
        }}>
            {items.map((item, index) => renderItem(item, index))}
        </WrapperRaw>
    );
};
