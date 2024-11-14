"use client"

// import React from 'react'
import React,{useState,useEffect} from "react"
import {Btn,Accordion,Alert,Badge,Breadcrumb,ButtonGroup,Card,Cards,Carousel,CloseButton,Collapse,Dropdown,ListGroup,Modal,Nav,Navbar,Offcanvas,Pagination,Popover,Progress,Spinner,Scrollspy,Toast,Tooltip}
  from "./importComponents"
// import { ExampleComponent } from 'IZYBootstrap'
// import 'legion-ui/dist/index.css'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./components/index.scss"

const $datas = {
  home: {
    accordion: {
      id: "accordionExample",
      className: "b5_accordion",
      flush: false,
      allowMultiple: true,
      items: [
        { label: "Item 1", content: "Contenu de l'item 1" },
        { label: "Item 2", content: "Contenu de l'item 2" },
      ]
    }
    , alert: { 
      type: "danger", // paramètre requis
      content: "Contenu de l'alert", // paramètre requis
      dismissible: true, // paramètre requis
      _contentPositionWhileAdditionalContentOn:3, // paramètre d'option de configuration
      ___svg: 2, // paramètre de configuration
      ___additionalContent: [ // paramètre de configuration
        { type: 'heading', content: 'Titre supplémentaire pour Alert', lvl: 5 },
        { type: 'divider' },
        { type: 'paragraph', content: 'Paragraphe supplémentaire pour Alert', elm: "div", ___svg: 1 },
      ]
    }
    , badge: {content: "Nouveau",  pill: false,pos:null, hiddenText: "", isIndicator: false, withBorder: false, additionalClasses: ""}
    , card: {
  
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
    , cards: {
      title: "oijoij"
      , items: [
        {
          title: 'Titre de la carte 0',
          content: 'Texte de la carte0',
          imageUrl: 'https://via.placeholder.com/150',
          linkText: 'En savoir plus',
          linkUrl: '#',
        }
        , {
          title: 'Titre de la carte 1',
          content: 'Texte de la carte 1',
          imageUrl: 'https://via.placeholder.com/150',
          linkText: 'En savoir plus',
          linkUrl: '#',
        }
        , {
          title: 'Titre de la carte 2',
          content: 'Texte de la carte 2',
          imageUrl: 'https://via.placeholder.com/150',
          linkText: 'En savoir plus',
          linkUrl: '#',
        }
      ]
    }
  }
}


const App = () => {
  
  const [$data, set$data] = useState($datas)
  , accordionEditorProps = {$:$data,setter:set$data, dataKey: "accordion", dataComponentKey: "items", dataMain:"home"}
  , alertEditorProps = {$:$data,setter:set$data, dataKey: "alert", dataMain:"home"}
  , cardEditorProps = {$:$data,setter:set$data, dataKey: "card", dataMain:"home"}
  , cardsEditorProps = {$:$data,setter:set$data, dataKey: "cards", dataMain:"home"}
  , badgeEditorProps = {$:$data,setter:set$data, dataKey: "badge", dataComponentKey: "content", dataMain:"home"}

  useEffect(() => {
    // alert(document.body.outerHTML)
    document.body._=$data
  }, [])
  
  const accordionItems = [
    { label: "Item 1", content: "Contenu de l'item 1" },
    { label: "Item 2", content: "Contenu de l'item 2" },
  ];

  const breadcrumbItems = [
    { text: "Accueil", href: "/" },
    { text: "Bibliothèque", href: "/library" },
    { text: "Données", href: "#" },
  ];

  const carouselItems = [
    { imageUrl: "https://via.placeholder.com/800x400?text=Slide+1", alt: "Slide 1" },
    { imageUrl: "https://via.placeholder.com/800x400?text=Slide+2", alt: "Slide 2" },
    { imageUrl: "https://via.placeholder.com/800x400?text=Slide+3", alt: "Slide 3" },
  ];

  const dropdownItems = [
    { text: "Action", href: "#" },
    { text: "Another action", href: "#" },
    { text: "Something else here", href: "#" },
  ];

  const listGroupItems = [
    { content: "Item 1", active: true },
    { content: "Item 2" },
    { content: "Item 3" },
  ];

  const navItems = [
    { text: "Accueil", href: "#", active: true },
    { text: "Profil", href: "#" },
    { text: "Messages", href: "#" },
  ];

  const navbarItems = [
    { text: "Accueil", href: "#", active: true },
    { text: "À propos", href: "#" },
    { text: "Contact", href: "#" },
  ];

  const scrollspyItems = [
    { target: "#section1", text: "Section 1" },
    { target: "#section2", text: "Section 2" },
    { target: "#section3", text: "Section 3" },
  ];

  const buttonGroupButtons = [
    { text: "Gauche", type: "secondary", onClick: () => console.log("Gauche cliqué") },
    { text: "Milieu", type: "secondary", onClick: () => console.log("Milieu cliqué") },
    { text: "Droite", type: "secondary", onClick: () => console.log("Droite cliqué") },
  ];
  return <>
    {JSON.stringify($data)}
    <hr />
    <Btn />
    <ButtonGroup props={{buttons: buttonGroupButtons}} />
    <Accordion $={$data.home.accordion} editorProps={accordionEditorProps} />
    <Alert $={$data.home.alert} editorProps={alertEditorProps} />
    <div style={{position:"relative"}}>
      <Badge $={$data.home.badge} editorProps={badgeEditorProps} />
    </div>
    <Breadcrumb />
    <Card editorProps={cardEditorProps}/>
    <Cards $={$data.home.cards}  editorProps={cardsEditorProps}/>
    <Carousel props={{items: carouselItems}} />
    <CloseButton $={{white: false, onClick: () => console.log('Fermé')}} />
    <Collapse  />
    {/* <Collapse $={{
      id: "myCollapse",
      trigger: {
        tag: "button",
        text: "Voir plus",
        className: "btn-primary"
      },
      content: {
        tag: "section",
        headingLevel: 3,
        text: "Contenu détaillé",
        role: "region"
      }
    }} /> */}
    <Dropdown />
    {/* <Dropdown $={{
      trigger: {
        type: "split",
        text: "Actions",
        variant: "danger"
      },
      menu: {
        dark: true,
        direction: "up",
        items: [
          { type: "header", text: "Options" },
          { type: "item", text: "Action 1", href: "#" },
          { type: "divider" },
          { type: "item", text: "Action 2", href: "#", disabled: true }
        ]
      }
    }} /> */}
    <ListGroup props={{items: listGroupItems, numbered: true}} />
    {/* <ListGroup $={{
      items: [
        {
          content: "Item avec badge",
          badge: { text: "New", variant: "danger" }
        },
        {
          customContent: {
            heading: "Titre spécial",
            text: "Description détaillée",
            small: "Il y a 3 jours"
          },
          active: true
        }
      ],
      horizontal: "md",
      flush: true
    }} /> */}
    <Modal />
    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Ouvrir la modal</button>
    {/* <Btn $={{
    content: "Ouvrir la modal",
    variant: "primary",
    onClick: () => document.getElementById('exampleModal').modal('show')
  }} /> */}
    {/* <Modal $={{
      id: "formModal",
      title: { content: "New message" },
      content: {
        form: {
          fields: [
            { label: "Recipient", type: "text" },
            { label: "Message", type: "textarea" }
          ]
        },
        scrollable: true
      },
      size: "lg",
      position: { centered: true },
      footer: {
        buttons: [
          { text: "Send", variant: "primary" },
          { text: "Cancel", dismiss: true }
        ]
      }
    }} /> */}
    <Nav />
    <Navbar />
    <Offcanvas />
    {/* <Offcanvas $={{
      id: "shoppingCart",
      title: { text: "Your Cart" },
      placement: "end",
      options: {
        scroll: true,
        backdrop: false
      },
      trigger: {
        text: "Cart",
        className: "btn btn-success"
      }
    }} /> */}
    <Pagination />
    {/* <Pagination $={{
      currentPage: 3,
      totalPages: 10,
      display: {
        size: "lg",
        alignment: "center",
        icons: true
      },
      maxVisible: 5,
      boundaryLinks: true
    }} /> */}
    <Popover />
    {/* 
    // 1. Exemple basique
    <Popover $={{
        title: "Titre du popover",
        content: "Contenu simple du popover",
        placement: "right"
    }}>
        <button className="btn btn-primary">Cliquez-moi</button>
    </Popover>
    // 2. Exemple avec HTML et délai
    <Popover $ {{
        title: "<em>Titre en italique</em>",
        content: "<strong>Contenu en gras</strong>",
        placement: "top",
        options: {
            html: true,
            delay: {
                show: 500,
                hide: 100
            }
        }
    }}>
        <button className="btn btn-info">Hover avec délai</button>
    </Popover>

    // 3. Exemple avec dismiss et événements
    <Popover $ {{
        title: "Notification",
        content: "Cliquez ailleurs pour fermer",
        placement: "bottom",
        dismiss: {
            enabled: true,
            selector: 'body'
        },
        events: {
            onShow: () => console.log("Popover s'ouvre"),
            onHidden: () => console.log("Popover est fermé")
        }
    }}>
        <button className="btn btn-warning">Notification</button>
    </Popover>

    // 4. Exemple avec accessibilité renforcée
    <Popover $ {{
        title: "Aide",
        content: "Cette action supprimera définitivement l'élément",
        placement: "left",
        trigger: "focus",
        accessibility: {
            tabindex: "0",
            role: "button",
            keyboard: true
        }
    }}>
        <button className="btn btn-danger">Supprimer</button>
    </Popover>

    // 5. Exemple avec positionnement personnalisé
    <Popover $ {{
        title: "Position personnalisée",
        content: "Contenu avec offset",
        placement: "top",
        options: {
            offset: [0, 16],
            container: '#custom-container'
        }
    }}>
        <button className="btn btn-secondary">Position spéciale</button>
    </Popover> */}
    <Progress />
    {/* ??? <Progress props={{value: 75, max: 100, label: true, striped: true, animated: true}} /> */}
    {/* // 1. Progress bar simple
    <Progress $ {{
      value: 25,
      options: {
        label: { show: true }
      }
    }} />
    // 2. Progress bar avec style
    <Progress $ {{
      value: 75,
      bars: [{
        value: 75,
        variant: "success",
        striped: true,
        animated: true
      }]
    }} />
    // 3. Progress bars multiples
    <Progress $ {{
      max: 100,
      bars: [
        { value: 15, variant: "danger" },
        { value: 30, variant: "warning" },
        { value: 20, variant: "success" }
      ]
    }} />
    // 4. Progress avec label personnalisé
    <Progress $ {{
      value: 50,
      options: {
        height: "20px",
        label: {
          show: true,
          format: "custom",
          custom: (value) => ${value}/100 points
        }
      }
    }} /> */}
    <Scrollspy props={{items: scrollspyItems}} />
    <div style={{height: '200px'}}> {/* Pour simuler du contenu scrollable */}
      <h4 id="section1">Section 1</h4>
      <p>Contenu de la section 1</p>
      <h4 id="section2">Section 2</h4>
      <p>Contenu de la section 2</p>
      <h4 id="section3">Section 3</h4>
      <p>Contenu de la section 3</p>
    </div>
    {/* // 1. ScrollSpy simple avec navbar
    <ScrollSpy $ {{
      items: [
        { text: "Section 1", target: "#section1" },
        { text: "Section 2", target: "#section2" }
      ],
      options: { offset: 20 }
    }} />
    // 2. ScrollSpy avec navigation imbriquée
    <ScrollSpy $ {{
      items: [
        {
          text: "Item 1",
          target: "#item1",
          children: [
            { text: "Item 1-1", target: "#item1-1" },
            { text: "Item 1-2", target: "#item1-2" }
          ]
        }
      ],
      options: { nested: true }
    }} />
    // 3. ScrollSpy avec list-group
    <ScrollSpy $ {{
      items: [
        { text: "Item 1", target: "#item1" },
        { text: "Item 2", target: "#item2" }
      ],
      options: {
        type: "list-group",
        method: "position"
      }
    }} /> */}
    <Spinner props={{type: 'border', size: 'sm', color: 'primary'}} />
    {/* // 1. Spinner simple
    <Spinner $ {{
      type: "border",
      variant: { color: "primary" }
    }} />
    // 2. Growing spinner avec taille personnalisée
    <Spinner $ {{
      type: "grow",
      custom: {
        width: "3rem",
        height: "3rem"
      }
    }} />
    // 3. Spinner centré avec marge
    <Spinner $ {{
      type: "border",
      variant: { color: "success" },
      placement: { align: "center" },
      margin: "m-5"
    }} />
    // 4. Spinner dans un bouton
    <button className="btn btn-primary" disabled>
    <Spinner $ {{
      type: "border",
      variant: { size: "sm" },
      accessibility: { hidden: true }
    }} />
    Loading...
    </button> */}
    <Toast props={{title: "Notification", content: "Ceci est un toast!"}} />
    {/* // 1. Toast simple
    <Toast $ {{
      header: {
        title: "Notification",
        subtitle: "À l'instant"
      },
      content: {
        text: "Votre message a été envoyé"
      }
    }} />
    // 2. Toast avec actions
    <Toast $ {{
      header: { title: "Mise à jour" },
      content: {
        text: "Une nouvelle version est disponible",
        actions: [
          { text: "Mettre à jour", variant: "primary" },
          { text: "Plus tard", variant: "secondary" }
        ]
      },
      options: { autohide: false }
    }} />
    // 3. Toast coloré avec placement
    <Toast $ {{
      content: { text: "Erreur de connexion" },
      style: { variant: "danger" },
      options: {
        placement: { position: "bottom-center" }
      }
    }} /> */}
    <Tooltip props={{content: "Ceci est une infobulle"}}>
      <button className="btn btn-secondary">Survolez-moi</button>
    </Tooltip>
    {/* // 1. Tooltip simple
    <Tooltip $ {{
      content: { text: "Info bulle simple" },
      placement: { position: "top" }
    }}>
    <button className="btn btn-primary">Hover me</button>
    </Tooltip>
    // 2. Tooltip avec HTML
    <Tooltip $ {{
      content: {
        text: "<em>Contenu</em> avec <strong>HTML</strong>",
        html: true
      }
    }}>
    <button className="btn btn-info">HTML Tooltip</button>
    </Tooltip>
    // 3. Tooltip sur élément désactivé
    <Tooltip $ {{
      content: { text: "Tooltip sur élément désactivé" },
      accessibility: {
        disabled: true,
        selector: "span"
      }
    }}>
    <span className="d-inline-block">
    <button className="btn btn-primary" disabled>Bouton désactivé</button>
    </span>
    </Tooltip> */}
  </>
}

export default App
