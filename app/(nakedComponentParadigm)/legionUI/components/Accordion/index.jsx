import React, { useState } from 'react';
import {WrapperList,WrapperRaw,WrapperHeading} from "../../wrappers"
// import "./index.scss"

const toggleItem = (index,setOpenItems) => {
  setOpenItems(prevOpenItems => {
    if (prevOpenItems.includes(index)) {
      return prevOpenItems.filter(item => item !== index)
    } else {
      return [...prevOpenItems, index]
    }
  })
}
, _data = {
  id: "accordionExample",
  className: "b5_accordion",
  flush: false,
  allowMultiple: false,
  items: [
    { label: "Item 1", content: "Contenu de l'item 1" },
    { label: "Item 2", content: "Contenu de l'item 2" },
  ]
};

export default ({ _,children,$=_data,editorProps }) => {
  const {
    id=_data.id,
    className=_data.className,
    items=_data.items,
    flush=_data.flush,
    allowMultiple=_data.allowMultiple
  } = $||_||children
  const [openItems, setOpenItems] = useState([0])

  console.log("editorPropsss: ",editorProps);
  
  editorProps.fn = () => {
    console.log(document.body.data)
    let selector = document.querySelector("#"+id)
    , elts = selector.querySelectorAll("li")

    const targetData = Array.from(elts).map((item,i) => ({
      label: item.querySelector("h2").textContent
      , content: item.querySelector("section").textContent
    }))

    return targetData
  }

  const handleToggle = (index) => {
    setOpenItems(prevOpenItems => {
      if (prevOpenItems.includes(index)) {
        return prevOpenItems.filter(item => item !== index)
      } else {
        return allowMultiple 
          ? [...prevOpenItems, index]
          : [index]
      }
    })
  }

  return (
    <WrapperList $={{
      id,
      className: `${className}${flush ? ' accordion-flush' : ''}`,
      items: accordionItems(items, {
        openItems,
        setOpenItems: handleToggle,
        id,
        allowMultiple
      }),
      editorProps
    }} />
  );
};

const accordionItems = (items,options) => items 
  ? items.map((item,index) => <React.Fragment key={index}>
    <h2>
      <button
        className={`${!options.openItems.includes(index) ? 'collapsed' : ''}`}
        onClick={() => options.setOpenItems(index)}
        aria-expanded={options.openItems.includes(index)}
        aria-controls={`collapse${index}`}
      >
        {item.label}
      </button>
    </h2>
    <section
      id={`collapse${index}`}
      className={`${options.openItems.includes(index) ? 'show' : ''}`}
      {...(!options.allowMultiple && {"data-bs-parent": "#"+options.id})}
    >
      {item.content}
    </section>
  </React.Fragment>
  )
  : []


