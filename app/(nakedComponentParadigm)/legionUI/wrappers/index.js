import React from "react"
import {SvgPaths,$svgs} from "../B5Elements"
import {adminProps} from "../utils/handlers"


// 1ST LEVEL WRAPPERS

export function WrapperRaw({ _,children,$ }){
    const {id,className,props,editorProps,pass} = $||_||children
    , {___svg: svg} = $||_||children
    , {elm="div",href=""} = $||_||children;

    console.log("props: ",props);
    console.log("editorProps, id: ",editorProps, id);

    const SVG_MODE = <>
      <SvgPaths>
        <use href={("#"+$svgs[svg])||svg}/>
      </SvgPaths>
      <span>
        {children||_}
      </span>
    </>
    , events = editorProps
      ? adminProps(editorProps)
      : {}

  
    return React.createElement(elm,{id,className, ...events, ...props,href:(href?href:undefined),editorProps:(pass?editorProps:undefined)}, svg?SVG_MODE:children||_ )
}
// const WrapperRaw = ({ children,$ }) => React.createElement($.elm,null,children)
  
// Composants séparés pour heading, paragraph et divider
export function WrapperHeading({ _,children, $ }){
    const {editorProps} = $||_||children
    const {lvl=4} = $||_||children
    // return React.createElement("h"+lvl,null,children||_||$.content)
    return React.createElement(WrapperRaw,{$:{elm:"h"+lvl,editorProps}},null,children||_||$.content)
    
    
}
// return React.createElement(`h${lvl}`, { className: "alert-additional-heading" }, children);
  


// 2ND LEVEL WRAPPERS

export function WrapperList({ _,children, $ }){
    const {elm="ul",subElm="li"} = $||_
    , {id,className,items,subElmCn,editorProps} = $||_;


    // console.log("subElmCn:",subElmCn);
    
    return <WrapperRaw $={{id,className,elm}}>
      {items.map((item,i)=><WrapperRaw key={i} $={{elm:subElm,className:subElmCn,editorProps,pass:typeof subElm!=="string"?true:undefined}}>
        {item}
      </WrapperRaw>)}
    </WrapperRaw>

}







