import React, { useState, useEffect, useRef } from 'react';
import {WrapperRaw,WrapperHeading} from "../../wrappers"
import Btn from "../Button"
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';


const alertColors = {
  primary: 'alert-primary',
  secondary: 'alert-secondary',
  success: 'alert-success',
  danger: 'alert-danger',
  warning: 'alert-warning',
  info: 'alert-info',
  light: 'alert-light',
  dark: 'alert-dark',
}
, _data = { 
  type: "danger", // paramètre requis
  content: "Contenu de l'alert", // paramètre requis
  dismissible: true, // paramètre requis
  _contentPositionWhileAdditionalContentOn:2, // paramètre d'option de configuration
  ___svg: 2, // paramètre de configuration
  ___additionalContent: [ // paramètre de configuration
    { type: 'heading', content: 'Titre supplémentaire pour Alert', lvl: 5 },
    { type: 'divider' },
    { type: 'paragraph', content: 'Paragraphe supplémentaire pour Alert', elm: "div", ___svg: 1 },
  ]
}



export default ({ _,children,$ = _data,editorProps }) => {
  const {     type=_data.type, 
    content=_data.content, 
    dismissible=_data.dismissible,
    ___svg: svg=_data.___svg,
    ___additionalContent: additionalContent=_data.___additionalContent,
    onClose,    // Nouveau prop pour close.bs.alert
    onClosed    // Nouveau prop pour closed.bs.alert
    , _contentPositionWhileAdditionalContentOn: contentPositionWhileAdditionalContentOn = _data._contentPositionWhileAdditionalContentOn
    , alertClass = `alert ${alertColors[type] || 'alert-primary'}`
    , className= `${alertClass} ${dismissible ? 'alert-dismissible fade show' : ''}`
  } = $||_||children
  

  const [isVisible, setIsVisible] = useState(true);
  const alertRef = useRef(null);  // Référence pour l'élément alert

  editorProps.fn = () => {

    if(additionalContent){
      
      const headingIndex = additionalContent.findIndex(elt=>elt.type=="heading")
      , paragraphIndex = additionalContent.findIndex(elt=>elt.type=="paragraph")
      if(headingIndex!==-1)additionalContent[headingIndex].content = alertRef.current.firstChild.textContent
      if(paragraphIndex!==-1)additionalContent[paragraphIndex].content = alertRef.current.querySelector(".ac span").textContent
      $.content = alertRef.current.querySelector('div:not(.ac)>span').textContent
      return $
    }else {
      return {...$, content: alertRef.current.textContent}
    }
    alert('"okok')
  }
  

  useEffect(() => {
    const alertElement = alertRef.current;
    
    if (dismissible && alertElement) {
      const handleClose = (e) => {
        if (onClose) onClose(e);
      };
      
      const handleClosed = (e) => {
        if (onClosed) onClosed(e);
      };

      alertElement.addEventListener('close.bs.alert', handleClose);
      alertElement.addEventListener('closed.bs.alert', handleClosed);

      return () => {
        alertElement.removeEventListener('close.bs.alert', handleClose);
        alertElement.removeEventListener('closed.bs.alert', handleClosed);
      };
    }
  }, [dismissible, onClose, onClosed]);

  const handleDismiss = () => {
    const alertElement = alertRef.current;
    if (alertElement) {
      alertElement.classList.remove('show');
      setTimeout(() => {
        setIsVisible(false);
      }, 150); // Durée de l'animation Bootstrap
    }
  };

  if (!isVisible) return null;

  return (
    <WrapperRaw $={{className,props:{role:"alert",ref: alertRef}}} >
      {additionalContent 
        ? renderWithAdditionalContent(additionalContent, {content, contentPositionWhileAdditionalContentOn,svg,editorProps})
        : svg!==undefined
          ? <WrapperRaw $={{___svg:svg,editorProps}}>{content}</WrapperRaw>
          : <WrapperRaw $={{editorProps}}>{content}</WrapperRaw>
      }
      {dismissible && (
        <Btn 
          $={{props: {
            type:"button",
            className:"btn-close",
            'aria-label':"Close",
            onClick: handleDismiss
          }}}
        />
      )}
    </WrapperRaw>
  );
};



const renderWithAdditionalContent = (additionalContent,options) => additionalContent.map(
  (item, index) => {
    console.log("options:",options);
    const tmp = []
    , {contentPositionWhileAdditionalContentOn,svg,content,editorProps} = options
    , tmpPushXORSvg = () => {
        tmp.push(svg !== undefined
          ? <WrapperRaw key={`content_after_${index}`} $={{___svg:svg,editorProps}} _={content} />
          : <WrapperRaw key={`content_after_${index}`} $={{editorProps}}>{content}</WrapperRaw>
        );
    }

    if(index === contentPositionWhileAdditionalContentOn) tmpPushXORSvg()
    
    switch(item.type) {
      case 'heading':
        tmp.push(<WrapperHeading key={`alert_h_${index}`} children={item.content} $={{lvl:item.lvl,editorProps}} />);
        break;
      case 'paragraph':
        tmp.push(<WrapperRaw key={`alert_p_${index}`} _={item.content} $={{elm:item.elm, ___svg:item.___svg,editorProps,className:"ac"}} />);
        break;
      case 'divider':
        tmp.push(<Divider key={`alert_divider_${index}`} />);
        break;
      default:
        tmp.push(null);
        break;
    }

    if(contentPositionWhileAdditionalContentOn === (index+1)) tmpPushXORSvg()

    return tmp;
  }
);







// const Paragraph = ({ content, elm = "p", svg }) => React.createElement(elm, { className: "alert-additional-paragraph" }, svg 
//     ? (
//       <>
//         <SvgPaths><use href={"#"+$svgs[svg]}/></SvgPaths>
//         <span>{content}</span>
//       </>
//     ) 
//     : content
//   );

const Divider = () => React.createElement("hr", {className:"alert-divider"},);
