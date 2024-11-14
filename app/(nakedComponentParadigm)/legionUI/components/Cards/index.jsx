import React from 'react';
import Card from "../Card"
import {WrapperList} from '../../wrappers'; // Assurez-vous que le chemin est correct
// import "./index.scss"

const _data = {
  title: "oijoij"
  , items: [
    {
      title: 'Titre de la carte 0',
      text: 'Texte de la carte0',
      imageUrl: 'https://via.placeholder.com/150',
      linkText: 'En savoir plus',
      linkUrl: '#',
    }
    , {
      title: 'Titre de la carte 1',
      text: 'Texte de la carte 1',
      imageUrl: 'https://via.placeholder.com/150',
      linkText: 'En savoir plus',
      linkUrl: '#',
    }
    , {
      title: 'Titre de la carte 2',
      text: 'Texte de la carte 2',
      imageUrl: 'https://via.placeholder.com/150',
      linkText: 'En savoir plus',
      linkUrl: '#',
    }
  ]
}

export default ({ _, children, $ = _data,editorProps }) => {
  const { 
    title=_data.title, 
    items=_data.items 
  } = $ || _ || children;

  return (
    <WrapperList $={{elm:"section",subElm:Card,className:"cards",items,editorProps}} />
  );
};
