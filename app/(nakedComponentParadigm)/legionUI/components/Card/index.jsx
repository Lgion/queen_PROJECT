import React, {useRef} from 'react';
import {WrapperRaw, WrapperHeading, WrapperList} from '../../wrappers';
import {Btn} from "../../importComponents"
  // import "./index.scss";

const _data = {
  
  header: null,// header: null, // Valeurs possibles: null, string
  title: 'Titre de la carte',// title: 'Titre de la carte', // Valeurs possibles: string
  subtitle: "llklklk",// subtitle: "llklklk", // Valeurs possibles: string
  content: 'Texte de la carte',// content: 'Texte de la carte', // Valeurs possibles: string
  imageUrl: 'https://via.placeholder.com/150',// imageUrl: 'https://via.placeholder.com/150', // Valeurs possibles: string
  imageOverlay: false,// imageOverlay: false, // Valeurs possibles: boolean
  listItems: [],// listItems: [], // Valeurs possibles: array d'objets
  footer: true,// footer: true, // Valeurs possibles: boolean
  variant: "warning",// variant: "warning", // Valeurs possibles: string (success, danger, warning, info, primary, secondary, light, dark)
  border: "danger",// border: "danger", // Valeurs possibles: string (success, danger, warning, info, primary, secondary, light, dark)
  alignment: 'start',// alignment: 'start', // Valeurs possibles: string (start, end, center)
  horizontal: false,// horizontal: false, // Valeurs possibles: boolean
  linkText: 'En savoir plus',// linkText: 'En savoir plus', // Valeurs possibles: string
  linkUrl: '#',// linkUrl: '#', // Valeurs possibles: string
}

export default ({ _, children, $ = _data, editorProps }) => {
  const { 
    header=_data.header, 
    title=_data.title, 
    subtitle=_data.subtitle, 
    content=_data.content, 
    imageUrl=_data.imageUrl, 
    imageOverlay=_data.imageOverlay,
    listItems=_data.listItems, 
    footer=_data.footer, 
    variant=_data.variant, 
    border=_data.border, 
    alignment=_data.alignment,
    horizontal=_data.horizontal, 
    linkText=_data.linkText, 
    linkUrl=_data.linkUrl 
  } = $ || _ || children;
  // Construction des classes CSS
  const cardClasses = [
    'card',
    variant && `bg-${variant}`,
    border && `border-${border}`,
    alignment && `text-${alignment}`,
    horizontal && 'card-horizontal',
  ].filter(Boolean).join(' ');
  const cardRef = useRef(null);  // Référence pour l'élément alert

  const fn = () => {
    // console.log("editorProps: ",editorProps);
    // alert(cardRef.current.querySelector('h5').textContent)
    $.title = cardRef.current.querySelector('h5').textContent
    $.subtitle = cardRef.current.querySelector('h6').textContent
    $.content = cardRef.current.querySelector('p').textContent
    $.linkText = cardRef.current.querySelector('a').textContent
    return $
    
    // if()

  }
  editorProps.fn = fn
  

  return (
    <WrapperRaw $={{className: cardClasses, editorProps, props:{ref:cardRef}}} >
      {header && (
        <WrapperRaw $={{className: "card-header", editorProps}}>
          {header} - "ihkjh"
        </WrapperRaw>
      )}
      
      {imageUrl && !imageOverlay && (
        <WrapperRaw $={{elm: "img", className: "card-img-top", props: {src: imageUrl, alt: title}}} />
      )}

      {imageUrl && imageOverlay ? (
        <>
          <WrapperRaw $={{elm: "img", className: "card-img", props: {src: imageUrl, alt: title}}} />
          <WrapperRaw $={{className: "card-img-overlay", editorProps}}>
            {title && <WrapperHeading $={{lvl:5, className:"card-title", editorProps}}>{title}</WrapperHeading>}
            {subtitle && <WrapperHeading $={{lvl:6, className:"card-subtitle mb-2 text-muted", editorProps}}>{subtitle}</WrapperHeading>}
            {content && <WrapperRaw $={{elm:"p", className:"card-text", editorProps}}>{content}</WrapperRaw>}
          </WrapperRaw>
        </>
      ) : (
        <section className="card-body">
          {title && <WrapperHeading $={{lvl:5, className:"card-title", editorProps}}>{title}</WrapperHeading>}
          {subtitle && <WrapperHeading $={{lvl:6, className:"card-subtitle mb-2 text-muted", editorProps}}>{subtitle}</WrapperHeading>}
          {content && <WrapperRaw $={{elm:"p", className:"card-text", editorProps}}>{content}</WrapperRaw>}
          {listItems.length > 0 && (
            <WrapperList $={{
              className: "list-group list-group-flush",
              items: listItems,
              subElmCn: "list-group-item",
              editorProps
            }} />
          )}
          {linkText && linkUrl && (
            // <WrapperRaw $={{elm:"a", href:linkUrl, className:"card-link", editorProps}}>{linkText}</WrapperRaw>
            <Btn $={{outline:false, href: linkUrl, className: "card-link", editorProps}}>{linkText}</Btn>
          )}
        </section>
      )}

      {footer && (
        <WrapperRaw $={{className: "card-footer", editorProps}}>
          {footer}
        </WrapperRaw>
      )}
    </WrapperRaw>
  );
};
