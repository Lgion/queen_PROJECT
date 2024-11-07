export default {
    heroSection: {
        title: "Beauté d'Abidjan",
        subtitle: "Découvrez notre collection de produits de beauté et bien-être",
        image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2",
        cta: {
            text: "Voir les produits",
            href: "/products",
        },
        type: "video",
        variants: [
            {
                type: "parallax",
                parallax: {
                    layers: [
                        {
                            image: "/images/parallax/bg.jpg",
                            speed: 0.2
                        },
                        {
                            image: "/images/parallax/middle.png",
                            speed: 0.5
                        },
                        {
                            image: "/images/parallax/front.png",
                            speed: 0.8
                        }
                    ]
                }
            },
            {
                type: "split",
                split: {
                    layout: "image-left",
                    ratio: "1:1",
                    contentAlignment: "center",
                    background: "#f5f5f5"
                }
            },
            {
                type: "animated-text",
                animation: {
                    type: "typewriter",
                    speed: 50,
                    delay: 200,
                    words: ["Élégance", "Beauté", "Style"],
                    cursor: true
                }
            },
            {
                type: "cta",
                cta: {
                    primary: {
                        text: "Réserver maintenant",
                        href: "/booking",
                        style: "filled"
                    },
                    secondary: {
                        text: "En savoir plus",
                        href: "/about",
                        style: "outlined"
                    },
                    position: "center",
                    animation: "pulse"
                }
            },
            {
                type: "video",
                video: {
                    src: "https://jiddo-website.s3.amazonaws.com/Jiddo_Text+2.mp4",
                    poster: "/images/poster.jpg",
                    muted: true,
                    loop: true,
                    autoplay: true,
                    overlay: {
                        color: "rgba(0,0,0,0.5)",
                        gradient: "linear-gradient(45deg, rgba(0,0,0,0.8), transparent)"
                    }
                }
            },
            {
                type: "minimalist",
                minimalist: {
                    typography: {
                        titleSize: "4xl",
                        subtitleSize: "xl",
                        fontFamily: "serif"
                    },
                    spacing: "loose",
                    colors: {
                        background: "#ffffff",
                        text: "#000000"
                    }
                }
            },
            {
                type: "geometric",
                geometric: {
                    shapes: [
                        {
                            type: "circle",
                            size: "100px",
                            color: "#FF5733",
                            position: { top: "10%", left: "10%" },
                            animation: "float"
                        },
                        {
                            type: "triangle",
                            size: "80px",
                            color: "#33FF57",
                            position: { bottom: "20%", right: "15%" },
                            animation: "rotate"
                        },
                        {
                            type: "rectangle",
                            width: "150px",
                            height: "75px",
                            color: "#3357FF",
                            position: { top: "30%", right: "10%" },
                            animation: "pulse"
                        }
                    ],
                    background: {
                        pattern: "dots",
                        color: "#f0f0f0"
                    }
                }
            },
            {
                type: "slider",
                slider: {
                    slides: [
                        {
                            image: "https://images.unsplash.com/photo-1...",
                            title: "Collection Été",
                            subtitle: "Des soins adaptés à la saison",
                            cta: {
                                text: "Découvrir",
                                href: "/summer-collection"
                            }
                        },
                        {
                            image: "https://images.unsplash.com/photo-2...",
                            title: "Soins Naturels",
                            subtitle: "Le meilleur de la nature",
                            cta: {
                                text: "Explorer",
                                href: "/natural-care"
                            }
                        },
                        {
                            image: "https://images.unsplash.com/photo-3...",
                            title: "Nouveautés",
                            subtitle: "Les dernières innovations beauté",
                            cta: {
                                text: "Voir plus",
                                href: "/new-products"
                            }
                        }
                    ],
                    autoplay: true,
                    interval: 5000,
                    arrows: true,
                    dots: true,
                    transition: "fade"
                }
            },
            {
                type: "gradient",
                gradient: {
                    colors: [
                        "rgba(106, 17, 203, 0.9)",
                        "rgba(37, 117, 252, 0.9)",
                        "rgba(200, 80, 192, 0.8)"
                    ],
                    direction: "135deg",
                    opacity: 0.8,
                    animate: true
                }
            },
            {
                type: 'kenburns',
                kenburns: {
                  scale: 1.3,
                  duration: 15,
                  direction: 'in',
                  movement: {
                    x: 'right',
                    y: 'bottom'
                  }
                }
            },
        ]
    }
}; 