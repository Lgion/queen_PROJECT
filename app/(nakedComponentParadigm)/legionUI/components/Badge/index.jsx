import React, { useRef } from 'react';
import { WrapperRaw } from '../../wrappers';

const types = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
]
, positions = ["top-0 start-0","top-0 start-50","top-0 start-100","top-50 start-100","top-100 start-100","top-100 start-50","top-100 start-0","top-50 start-0"]
, _data = {content: "Nouveau", type: "info", pill: false,pos:null, hiddenText: "", isIndicator: false, withBorder: false, additionalClasses: ""}

export default ({ _,children,$=_data,editorProps }) => {
  const ref = useRef()
  const { 
    content=_data.content, 
    type=_data.type, 
    pill=_data.pill, 
    pos=_data.pos, 
    hiddenText=_data.hiddenText, 
    isIndicator=_data.isIndicator, 
    withBorder=_data.withBorder, 
    additionalClasses=_data.additionalClasses 
  } = $||_||children
  , needsDarkText = ["warning", "info", "light"].includes(types[type] || typeof type === "string" && type)
  , baseClasses = [
    "badge",
    `bg-${types[type] || typeof type === "string" && type || "primary"}`,
    needsDarkText ? "text-dark" : "",
    pill ? "rounded-pill" : "",
    isIndicator ? "rounded-circle p-2" : "",
    withBorder ? "border border-light" : "",
    additionalClasses,
    pos ? `${positions[pos]} position-absolute translate-middle` : ""
  ].filter(Boolean).join(" ");

  if(editorProps) editorProps.fn = () => ref.current?.textContent
  
  return <WrapperRaw $={{
    elm: "span",
    className: baseClasses,
    editorProps,
    props:{ref}
  }}>
    {hiddenText && <WrapperRaw $={{
      elm: "span",
      className: "visually-hidden"
    }}>{hiddenText}</WrapperRaw>}
    {!isIndicator && content}
  </WrapperRaw>
};
