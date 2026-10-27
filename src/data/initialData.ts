import { SiteData } from '../types';

export const initialSiteData: SiteData = {
  brandVersion: 6,
  hero: {
    autoSlide: true,
    slideIntervalSeconds: 6,
    showOverlay: true,
    mainTagline: {
      de: "ARIES & HOTEL SKY LOUNGE",
      en: "ARIES & HOTEL SKY LOUNGE",
      it: "ARIES & HOTEL SKY LOUNGE"
    },
    heroSubtitle: {
      de: "Ihr Aufenthalt über dem Gewöhnlichen – Luxus, Panoramablick & herzliche Gastfreundschaft",
      en: "Your Stay, Above the Ordinary – Luxury Rooms, Rooftop Sky Lounge & Fine Hospitality",
      it: "Il tuo soggiorno oltre l'ordinario – Camere di lusso, Sky Lounge e calda ospitalità"
    },
    buttonInquiryText: {
      de: "Anfrage",
      en: "Inquire",
      it: "Richiesta"
    },
    buttonBookText: {
      de: "Jetzt Buchen",
      en: "Book Now",
      it: "Prenota Ora"
    },
    slides: [
      {
        id: "hero-1",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=85",
        title: {
          de: "ARIES & HOTEL SKY LOUNGE",
          en: "ARIES & HOTEL SKY LOUNGE",
          it: "ARIES & HOTEL SKY LOUNGE"
        },
        subtitle: {
          de: "Ihr Aufenthalt über dem Gewöhnlichen",
          en: "Your Stay, Above the Ordinary",
          it: "Il tuo soggiorno oltre l'ordinario"
        },
        caption: {
          de: "Exklusive Hotelzimmer & Suiten",
          en: "Luxury Hotel Rooms",
          it: "Camere e Suite di Lusso"
        },
        locationLabel: {
          de: "Willkommen",
          en: "Welcome",
          it: "Benvenuti"
        },
        button1Text: {
          de: "Jetzt Buchen",
          en: "Book Now",
          it: "Prenota Ora"
        },
        button1Link: "#book",
        button2Text: {
          de: "Zimmer entdecken",
          en: "Explore Rooms",
          it: "Scopri le Camere"
        },
        button2Link: "#rooms",
        active: true,
        displayOrder: 1
      },
      {
        id: "hero-2",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85",
        title: {
          de: "PANORAMA SKY LOUNGE",
          en: "PANORAMIC SKY LOUNGE",
          it: "PANORAMICA SKY LOUNGE"
        },
        subtitle: {
          de: "Feine Drinks, weite Ausblicke und stilvolles Ambiente über den Dächern",
          en: "Handcrafted cocktails, skyline horizons and an elevated rooftop atmosphere",
          it: "Cocktail d'autore, viste panoramiche e atmosfera esclusiva sopra i tetti"
        },
        caption: {
          de: "Sky Lounge & Bar",
          en: "Sky Lounge & Terrace",
          it: "Sky Lounge & Terrazza"
        },
        button1Text: {
          de: "Sky Lounge Tisch anfragen",
          en: "Reserve Sky Lounge",
          it: "Prenota Sky Lounge"
        },
        button1Link: "#skylounge",
        button2Text: {
          de: "Ambiente ansehen",
          en: "View Ambience",
          it: "Guarda l'Ambiente"
        },
        button2Link: "#gallery",
        active: true,
        displayOrder: 2
      },
      {
        id: "hero-3",
        image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=2000&q=85",
        title: {
          de: "KULINARIK & RESTAURANT",
          en: "ELEVATED DINING & RESTAURANT",
          it: "RISTORANTE & ESPERIENZA CULINARIA"
        },
        subtitle: {
          de: "Frische Gourmet-Küche vom reichhaltigen Frühstück bis zum exquisiten Abendessen",
          en: "Fresh culinary craft from gourmet morning breakfast to refined evening dinners",
          it: "Cucina gourmet raffinata dalla colazione ricca alle cene serali"
        },
        caption: {
          de: "Dining Experience",
          en: "Dining Experience",
          it: "Esperienza Culinaria"
        },
        button1Text: {
          de: "Restaurant entdecken",
          en: "Explore Dining",
          it: "Scopri il Ristorante"
        },
        button1Link: "#dining",
        button2Text: {
          de: "Tisch anfragen",
          en: "Inquire Dining",
          it: "Richiedi Informazioni"
        },
        button2Link: "#inquire",
        active: true,
        displayOrder: 3
      },
      {
        id: "hero-4",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85",
        title: {
          de: "ABENDSTIMMUNG & RELAXATION",
          en: "EVENING AMBIENCE",
          it: "ATMOSFERA SERALE"
        },
        subtitle: {
          de: "Entspannen unter dem Abendhimmel mit warmem Licht und sanfter Musik",
          en: "Unwind beneath the stars with sophisticated music and golden lighting",
          it: "Rilassati sotto le stelle con illuminazione calda e musica lounge"
        },
        caption: {
          de: "Abendflair",
          en: "Evening Ambience",
          it: "Atmosfera Serale"
        },
        button1Text: {
          de: "Galerie öffnen",
          en: "View Gallery",
          it: "Vedi Galleria"
        },
        button1Link: "#gallery",
        button2Text: {
          de: "Jetzt Buchen",
          en: "Book Now",
          it: "Prenota Ora"
        },
        button2Link: "#book",
        active: true,
        displayOrder: 4
      },
      {
        id: "hero-5",
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=2000&q=85",
        title: {
          de: "ERSTKLASSIGE GASTFREUNDSCHAFT",
          en: "PREMIUM HOSPITALITY",
          it: "OSPITALITÀ DI PRESTIGIO"
        },
        subtitle: {
          de: "Aufmerksamer Service und persönliche Betreuung für einen unvergesslichen Aufenthalt",
          en: "Attentive service and personalized care for a truly memorable hotel experience",
          it: "Servizio attento e cura personalizzata per un soggiorno indimenticabile"
        },
        caption: {
          de: "Herzlicher Service",
          en: "Attentive Service",
          it: "Servizio Attento"
        },
        button1Text: {
          de: "Jetzt Buchen",
          en: "Book Now",
          it: "Prenota Ora"
        },
        button1Link: "#book",
        button2Text: {
          de: "Kontakt aufnehmen",
          en: "Contact Us",
          it: "Contattaci"
        },
        button2Link: "#contact",
        active: true,
        displayOrder: 5
      }
    ]
  },
  roomOverview: {
    totalRooms: 26,
    deluxeRoomsCount: 24,
    supremeRoomsCount: 2,
    heading: {
      de: "26 Exklusive Zimmer",
      en: "26 Rooms & Suites",
      it: "26 Camere & Suite"
    },
    subtitle: {
      de: "24 Deluxe Zimmer · 2 Supreme Zimmer",
      en: "24 Deluxe Rooms · 2 Supreme Rooms",
      it: "24 Camere Deluxe · 2 Camere Supreme"
    },
    description: {
      de: "Unser Boutique-Hotel bietet insgesamt 26 durchdacht gestaltete Unterkünfte: 24 Deluxe Zimmer und 2 Supreme Zimmer für gehobenen Komfort.",
      en: "Our boutique hotel features 26 thoughtfully appointed accommodations: 24 Deluxe Rooms and 2 Supreme Rooms crafted for elevated comfort.",
      it: "Il nostro boutique hotel dispone di 26 alloggi arredati con cura: 24 Camere Deluxe e 2 Camere Supreme studiate per il massimo comfort."
    }
  },
  suites: [
    {
      id: "room-deluxe",
      name: {
        de: "Deluxe Zimmer",
        en: "Deluxe Room",
        it: "Camera Deluxe"
      },
      category: "Deluxe",
      type: "suite",
      roomCount: 24,
      size: "38 m²",
      maxGuests: 2,
      bedrooms: 1,
      priceFrom: 220,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80"
      ],
      shortDesc: {
        de: "24 Deluxe Zimmer mit modernem Komfort, edlem Ambiente und durchdachtem Interieur.",
        en: "24 Deluxe Rooms offering contemporary luxury, plush bedding, and dedicated hospitality.",
        it: "24 Camere Deluxe con arredi moderni, massimo comfort e atmosfera rilassante."
      },
      fullDesc: {
        de: "Unsere 24 Deluxe Zimmer verbinden elegantes Design mit höchstem Schlafkomfort. Schallisolierte Fenster, ein modernes Bad mit Regendusche und ausgewählte Annehmlichkeiten schaffen den perfekten Rückzugsort.",
        en: "Our 24 Deluxe Rooms blend understated sophistication with serene restful comfort. Featuring sound-insulated interiors, a spa-inspired rain shower, and attentive hotel services for a seamless stay.",
        it: "Le nostre 24 Camere Deluxe uniscono design contemporaneo e riposo impeccabile, con finiture curate, bagno moderno con doccia a pioggia e servizi dedicati."
      },
      amenities: [
        "Plush Luxury Bedding",
        "High-Speed Wi-Fi",
        "Smart 4K TV",
        "En-Suite Rain Shower",
        "Climate Control",
        "Artisan Coffee & Tea Station",
        "Room Service Access"
      ],
      highlights: [
        {
          de: "24 Zimmer verfügbar",
          en: "24 Rooms Available",
          it: "24 Camere Disponibili"
        },
        {
          de: "Erstklassiger Schlafkomfort",
          en: "Premium Bedding Comfort",
          it: "Comfort del Letto Superiore"
        }
      ],
      viewType: {
        de: "Stadt- & Horizontblick",
        en: "City & Horizon View",
        it: "Vista Città & Orizzonte"
      },
      status: "published",
      displayOrder: 1
    },
    {
      id: "room-supreme",
      name: {
        de: "Supreme Zimmer",
        en: "Supreme Room",
        it: "Camera Supreme"
      },
      category: "Supreme",
      type: "suite",
      roomCount: 2,
      size: "54 m²",
      maxGuests: 3,
      bedrooms: 1,
      priceFrom: 340,
      image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
      ],
      shortDesc: {
        de: "2 exklusive Supreme Zimmer mit erweiterten Räumlichkeiten, separater Sitzecke und feinsten Details.",
        en: "2 exclusive Supreme Rooms offering expansive proportions, an inviting sitting area, and refined appointments.",
        it: "2 esclusive Camere Supreme con ambienti spaziosi, salottino privato e dettagli di alto pregio."
      },
      fullDesc: {
        de: "Unsere 2 Supreme Zimmer repräsentieren die Spitzenkategorie unseres Hauses. Großzügig geschnittene Räume, exklusive Möbel und besondere Ausstattungsdetails bieten ein herausragendes Übernachtungserlebnis.",
        en: "Our 2 Supreme Rooms represent the signature tier of Hotel Aries & Sky Lounge. Expansive layouts, curated designer accents, and privileged amenities deliver an extraordinary hospitality experience.",
        it: "Le nostre 2 Camere Supreme rappresentano l'eccellenza della nostra ospitalità, con ampi spazi dedicati al relax e finiture prestigiose."
      },
      amenities: [
        "King-Size Boxspring Bed",
        "Separate Lounge Sitting Area",
        "Panoramic Windows",
        "Luxury Rain Shower & Vanity",
        "Artisan Espresso Machine",
        "Bathrobes & Premium Toiletries",
        "Priority Sky Lounge Reservation"
      ],
      highlights: [
        {
          de: "Nur 2 exklusive Zimmer",
          en: "Only 2 Exclusive Rooms",
          it: "Solo 2 Camere Esclusive"
        },
        {
          de: "Erweiterte Lounge-Ecke",
          en: "Expanded Lounge Seating",
          it: "Salottino Privato"
        }
      ],
      viewType: {
        de: "Weitläufiger Panoramablick",
        en: "Panoramic Skyline View",
        it: "Ampia Vista Panoramica"
      },
      status: "published",
      displayOrder: 2
    }
  ],
  skyLounge: {
    title: {
      de: "ROOFTOP SKY BAR",
      en: "ROOFTOP SKY BAR",
      it: "ROOFTOP SKY BAR"
    },
    subtitle: {
      de: "Hotel Aries & Sky Lounge Rooftop Erlebnis",
      en: "Hotel Aries & Sky Lounge Rooftop Experience",
      it: "Esperienza Rooftop Hotel Aries & Sky Lounge"
    },
    description: {
      de: "Genießen Sie stilvolle Momente in unserer Rooftop Sky Bar mit weitem Blick über die Stadt, elegantem Open-Air-Ambiente und erstklassiger Gastfreundschaft.",
      en: "Enjoy elevated moments at our signature Rooftop Sky Bar featuring sweeping skyline horizons, sophisticated open-air seating, and curated hospitality.",
      it: "Goditi momenti esclusivi nel nostro Rooftop Sky Bar con vista panoramica sulla città, arredi eleganti all'aperto e un servizio impeccabile."
    },
    mainImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: {
      de: "Täglich geöffnet · Cocktails & Speisen",
      en: "Open Daily · Cocktails & Dining",
      it: "Aperto Tutti i Giorni · Cocktail e Ristoro"
    },
    menuLink: "",
    reservationCtaText: {
      de: "Rooftop Sky Bar anfragen",
      en: "Inquire Rooftop Sky Bar",
      it: "Richiedi Rooftop Sky Bar"
    },
    ctaText: {
      de: "Rooftop Sky Bar anfragen",
      en: "Inquire Rooftop Sky Bar",
      it: "Richiedi Rooftop Sky Bar"
    },
    ctaUrl: "#inquire",
    status: "published",
    visible: true,
    nightAmbienceImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
    seatingCapacity: "Indoor & Rooftop Terrace Seating",
    features: [
      {
        de: "Weitläufiger Panoramablick & Skyline-Horizont",
        en: "Expansive Panoramic Skyline Views",
        it: "Ampia Vista Panoramica sullo Skyline"
      },
      {
        de: "Stilvolles Open-Air & Lounge-Ambiente",
        en: "Sophisticated Open-Air Lounge Setting",
        it: "Ambiente Lounge Raffinato all'Aperto"
      },
      {
        de: "Exklusive Abendstimmung & Drinks",
        en: "Curated Evening Ambience & Refreshments",
        it: "Atmosfera Serale Esclusiva & Drink Selezionati"
      }
    ]
  },
  restaurant: {
    title: {
      de: "RESTAURANT & DINING",
      en: "RESTAURANT & DINING",
      it: "RISTORANTE & DINING"
    },
    subtitle: {
      de: "Kulinarische Gastfreundschaft im Hotel Aries",
      en: "Culinary Hospitality at Hotel Aries",
      it: "Ospitalità Culinaria all'Hotel Aries"
    },
    description: {
      de: "Unser Hotelrestaurant heißt Gäste mit erlesenen Speisen, sorgfältig ausgewählten Zutaten und aufmerksamem Service in einem warmen, eleganten Ambiente willkommen.",
      en: "Our hotel restaurant welcomes guests with fine culinary hospitality, thoughtfully prepared dishes, and attentive table service in a warm, refined atmosphere.",
      it: "Il nostro ristorante accoglie gli ospiti con una raffinata proposta gastronomica, ingredienti selezionati e un servizio attento in un ambiente accogliente ed elegante."
    },
    mainImage: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      {
        de: "Elegantes Speiseambiente für Hotelgäste & Besucher",
        en: "Refined Dining Atmosphere for Hotel Guests & Visitors",
        it: "Atmosfera Raffinata per Ospiti e Visitatori"
      },
      {
        de: "Frische Zutaten & aufmerksame Gastfreundschaft",
        en: "Fresh Ingredients & Attentive Hospitality",
        it: "Ingredienti Freschi e Ospitalità Premurosa"
      },
      {
        de: "Tischreservierung & Zimmerservice auf Anfrage",
        en: "Table Reservations & In-Room Dining Inquiries",
        it: "Prenotazione Tavoli e Servizio in Camera su Richiesta"
      }
    ],
    ctaText: {
      de: "Tisch anfragen",
      en: "Reserve a Table",
      it: "Richiedi un Tavolo"
    },
    ctaUrl: "#inquire",
    status: "published",
    visible: true
  },
  culinary: [
    {
      id: "cul-breakfast",
      title: {
        de: "Gourmet Frühstück",
        en: "Gourmet Breakfast",
        it: "Colazione Gourmet"
      },
      desc: {
        de: "Frisch gebackene Brote und Croissants, Barista-Kaffee, frische Früchte, erlesene Aufstriche und à la carte zubereitete Eierspeisen.",
        en: "Freshly baked artisan pastries, barista espresso, fresh fruit juices, gourmet spreads, and eggs prepared to your preference.",
        it: "Croissant e pani caldi artigianali, caffè espresso, frutta fresca e piatti caldi preparati al momento."
      },
      time: "07:00 – 10:30",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
      category: "breakfast",
      status: "published",
      displayOrder: 1
    },
    {
      id: "cul-restaurant",
      title: {
        de: "Hotel Restaurant & All-Day Dining",
        en: "Hotel Restaurant & All-Day Dining",
        it: "Ristorante dell'Hotel & All-Day Dining"
      },
      desc: {
        de: "Moderne saisonale Küche, leichte Mittagsgerichte und anspruchsvolle Menüs in entspannter, gehobener Atmosphäre.",
        en: "Contemporary culinary craft, light afternoon fare, and sophisticated seasonal menus in an elegant dining room.",
        it: "Cucina contemporanea con piatti leggeri e creazioni dello chef servite in una sala raffinata e accogliente."
      },
      time: "12:00 – 22:30",
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80",
      category: "restaurant",
      status: "published",
      displayOrder: 2
    },
    {
      id: "cul-skylounge-plates",
      title: {
        de: "Sky Lounge Tapas & Cocktails",
        en: "Sky Lounge Small Plates & Cocktails",
        it: "Sky Lounge Piatti Condivisi & Cocktail"
      },
      desc: {
        de: "Handwerklich gemixte Signature-Cocktails, erlesene Weine und fein abgestimmte Häppchen auf der Dachterrasse.",
        en: "Handcrafted signature cocktails, curated cellar wines, and savory sharing plates enjoyed with open-air views.",
        it: "Cocktail d'autore, selezione di vini e stuzzichini gourmet da condividere ammirando l'orizzonte."
      },
      time: "Ab 16:00",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80",
      category: "skylounge",
      status: "published",
      displayOrder: 3
    }
  ],
  wellness: [],
  experiences: [],
  gallery: [
    {
      id: "gal-1",
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85",
      title: {
        de: "Hotel Aries Außenansicht & Architektur",
        en: "Hotel Aries Exterior & Architecture",
        it: "Hotel Aries Esterno & Architettura"
      },
      category: "hotel",
      caption: {
        de: "Modernes Luxushotel mit zeitgenössischer Eleganz",
        en: "Contemporary luxury hotel with sophisticated architectural lines",
        it: "Hotel di lusso contemporaneo con linee architettoniche eleganti"
      },
      altText: "Hotel Aries exterior architecture",
      displayOrder: 1,
      featured: true
    },
    {
      id: "gal-2",
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85",
      title: {
        de: "Sky Lounge Rooftop Bar",
        en: "Sky Lounge Rooftop Bar",
        it: "Sky Lounge Rooftop Bar"
      },
      category: "skylounge",
      caption: {
        de: "Panoramablick und exklusives Ambiente über den Dächern",
        en: "Panoramic horizon views and open-air rooftop luxury",
        it: "Viste panoramiche e atmosfera esclusiva sul tetto"
      },
      altText: "Panoramic Sky Lounge at Hotel Aries",
      displayOrder: 2,
      featured: true
    },
    {
      id: "gal-3",
      url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85",
      title: {
        de: "Deluxe Zimmer Interieur",
        en: "Deluxe Room Interior",
        it: "Interni Camera Deluxe"
      },
      category: "rooms",
      caption: {
        de: "Großzügiges Kingsize-Bett und maßgefertigtes Mobiliar",
        en: "Spacious King-size bed and bespoke designer furnishings",
        it: "Letto king size e arredi moderni su misura"
      },
      altText: "Hotel Aries luxury room interior",
      displayOrder: 3,
      featured: true
    },
    {
      id: "gal-4",
      url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=85",
      title: {
        de: "Restaurant & Dining",
        en: "Dining Room & Restaurant",
        it: "Ristorante & Sala da Pranzo"
      },
      category: "dining",
      caption: {
        de: "Frische Gourmetgerichte und erstklassiger Service",
        en: "Fine dining ambiance and attentive tableside service",
        it: "Atmosfera fine dining e servizio impeccabile"
      },
      altText: "Hotel Aries dining restaurant",
      displayOrder: 4,
      featured: true
    },
    {
      id: "gal-5",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85",
      title: {
        de: "Hotel Lobby & Rezeption",
        en: "Hotel Lobby & Welcome Reception",
        it: "Lobby dell'Hotel & Ricevimento"
      },
      category: "hotel",
      caption: {
        de: "Herzlicher Empfang und persönliche Gästebetreuung",
        en: "Warm welcome and personalized guest assistance",
        it: "Calorosa accoglienza e assistenza dedicata agli ospiti"
      },
      altText: "Hotel Aries lobby and reception",
      displayOrder: 5,
      featured: true
    },
    {
      id: "gal-6",
      url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=85",
      title: {
        de: "Sky Lounge Abendatmosphäre",
        en: "Sky Lounge Night Ambience",
        it: "Sky Lounge Atmosfera Notturna"
      },
      category: "skylounge",
      caption: {
        de: "Warme Beleuchtung, feine Drinks und sternenklarer Himmel",
        en: "Warm golden lighting, artisan drinks and starlit skies",
        it: "Luci soffuse, drink artigianali e cielo stellato"
      },
      altText: "Evening atmosphere at Hotel Aries Sky Lounge",
      displayOrder: 6,
      featured: true
    },
    {
      id: "gal-7",
      url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85",
      title: {
        de: "Modernes Badezimmer mit Regendusche",
        en: "Modern Luxury Bathroom & Vanity",
        it: "Bagno Moderno con Doccia a Pioggia"
      },
      category: "rooms",
      caption: {
        de: "Elegante Regendusche und Marmorwaschtisch",
        en: "Spacious rain shower and marble vanity",
        it: "Doccia a pioggia e lavabo in marmo"
      },
      altText: "Hotel Aries luxury room bathroom",
      displayOrder: 7
    },
    {
      id: "gal-8",
      url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=85",
      title: {
        de: "Supreme Zimmer Lounge",
        en: "Supreme Room Seating & Suite Lounge",
        it: "Lounge Camera Supreme"
      },
      category: "rooms",
      caption: {
        de: "Erweiterte Sitzecke und höchster Schlafkomfort",
        en: "Extended lounge sitting area and supreme bedding comfort",
        it: "Ampio salotto e massimo comfort per il riposo"
      },
      altText: "Hotel Aries supreme room seating",
      displayOrder: 8
    }
  ],
  testimonials: [
    {
      id: "test-1",
      quote: {
        de: "Hotel Aries & Sky Lounge übertrifft alle Erwartungen: Die Zimmer sind wunderschön eingerichtet, und der Blick von der Sky Lounge bei Sonnenuntergang ist einfach unvergesslich.",
        en: "Hotel Aries & Sky Lounge exceeded every expectation: The rooms are exquisitely appointed, and watching the sunset from the Sky Lounge was an absolute highlight of our stay.",
        it: "L'Hotel Aries & Sky Lounge ha superato ogni aspettativa: camere impeccabili e il tramonto dalla Sky Lounge è stato memorabile."
      },
      author: "Victoria S.",
      role: "Verified Guest Review",
      publication: "Direct Guest Review",
      rating: 5,
      status: "published"
    },
    {
      id: "test-2",
      quote: {
        de: "Hervorragender Service, aufmerksames Personal und eine unvergleichliche Gastfreundschaft. Wir kommen auf jeden Fall wieder.",
        en: "Outstanding personalized service, attentive staff, and truly exceptional hospitality. We will definitely return on our next visit.",
        it: "Servizio eccellente, personale attento e ospitalità di altissimo livello. Torneremo sicuramente."
      },
      author: "Marcus & Elena D.",
      role: "Verified Guest Review",
      publication: "Direct Guest Review",
      rating: 5,
      status: "published"
    },
    {
      id: "test-3",
      quote: {
        de: "Das Frühstück war frisch und vielfältig, die Betten unglaublich bequem und die Atmosphäre in der Sky Lounge am Abend war fantastisch.",
        en: "Breakfast was delightfully fresh, the bedding exceptionally comfortable, and the evening rooftop atmosphere at the Sky Lounge was sublime.",
        it: "Colazione freschissima, letti comodissimi e un'atmosfera serale sulla Sky Lounge davvero impareggiabile."
      },
      author: "David R.",
      role: "Business & Leisure Guest",
      publication: "Direct Guest Review",
      rating: 5,
      status: "published"
    }
  ],
  contact: {
    hotelName: "Aries & Hotel Sky Lounge",
    primaryName: "Aries & Hotel Sky Lounge",
    subtitle: "Sky Lounge",
    address: "SBP, City of dreams, high ground road zirakpur. 140603",
    postalCode: "140603",
    city: "Zirakpur",
    region: "Punjab",
    country: "India",
    phone: "72593 32223",
    phoneFormatted: "7259332223",
    phone1: "72593 32223",
    phone2: "89683 99764",
    phone2Formatted: "8968399764",
    email: "hotelaries764@gmail.com",
    bookingUrl: "#booking",
    mapEmbedHtml: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3224.9501964112824!2d76.79173985798217!3d30.644296504010327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feb000446373b%3A0x1f90de76ad89d2b4!2sSbp%20city%20of%20dreams!5e0!3m2!1sen!2sin!4v1789748501524!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>',
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3224.9501964112824!2d76.79173985798217!3d30.644296504010327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feb000446373b%3A0x1f90de76ad89d2b4!2sSbp%20city%20of%20dreams!5e0!3m2!1sen!2sin!4v1789748501524!5m2!1sen!2sin",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=SBP+City+of+dreams+high+ground+road+zirakpur+140603",
    mapTitle: "Location & Directions",
    showMap: true,
    mapHeight: 450,
    updatedAt: "2026-09-18T10:15:00.000Z",
    googleMaps: "https://www.google.com/maps/dir/?api=1&destination=SBP+City+of+dreams+high+ground+road+zirakpur+140603",
    coordinates: "30.6443° N, 76.7917° E",
    whatsapp: "7259332223",
    instagram: "",
    facebook: "",
    youtube: "",
    vatNumber: "",
    logo: "",
    logoLight: "",
    logoDark: "",
    logoHeight: 40,
    logoDisplayMode: "logo_and_text",
    logoShape: "natural",
    showLogoInFooter: true,
    showLogoInDrawer: true,
    copyrightText: "© Aries & Hotel Sky Lounge. All rights reserved.",
    footerDescription: "Experience modern luxury accommodations, elevated dining, and panoramic rooftop drinks at Aries & Hotel Sky Lounge."
  },
  pages: {
    intro: {
      eyebrow: {
        de: "HOTEL ARIES & SKY LOUNGE",
        en: "HOTEL ARIES & SKY LOUNGE",
        it: "HOTEL ARIES & SKY LOUNGE"
      },
      heading: {
        de: "Ihr Aufenthalt über dem Gewöhnlichen – Luxus, Weitblick & Gastfreundschaft.",
        en: "Your Stay, Above the Ordinary – Luxury Accommodations & Panoramic Sky Lounge.",
        it: "Il tuo soggiorno oltre l'ordinario – Comfort esclusivo e Sky Lounge panoramica."
      },
      body1: {
        de: "Willkommen im Hotel Aries & Sky Lounge. Unser Haus verbindet zeitlose architektonische Eleganz mit herzlicher Gastfreundschaft, stilvollen Zimmern und einer unvergleichlichen Sky Lounge über den Dächern.",
        en: "Welcome to Hotel Aries & Sky Lounge, where contemporary architectural elegance meets genuine hospitality, luxury suites, and a breathtaking rooftop Sky Lounge designed for memorable gatherings.",
        it: "Benvenuti all'Hotel Aries & Sky Lounge, dove l'eleganza contemporanea incontra l'accoglienza autentica, camere di lusso e una spettacolare Sky Lounge panoramica."
      },
      body2: {
        de: "Vom ersten Moment an genießen Sie persönliche Aufmerksamkeit, komfortable Rückzugsorte für erholsamen Schlaf und erstklassige kulinarische Erlebnisse.",
        en: "From the moment you arrive, enjoy thoughtful personal attention, quiet sanctuaries crafted for rejuvenating rest, and elevated culinary moments from morning to night.",
        it: "Fin dal vostro arrivo, potrete godere di attenzioni personalizzate, oasi di quiete studiate per un riposo perfetto ed esperienze culinarie d'eccellenza."
      },
      quote: {
        de: "„Gastfreundschaft bedeutet, jedem Gast ein Gefühl von Zuhause zu schenken und jeden Moment über das Alltägliche zu heben.“",
        en: "“True hospitality is the art of making every guest feel entirely at home, while elevating each moment above the everyday.”",
        it: "“L'autentica ospitalità consiste nel far sentire ogni ospite a casa, elevando ogni istante oltre l'ordinario.”"
      },
      quoteAuthor: "Hotel Aries Management",
      statSuites: "26 Rooms",
      statVineyard: "Sky Bar",
      statSunDays: "Restaurant"
    },
    suitesIntro: {
      heading: {
        de: "Zimmer & Suiten",
        en: "Rooms & Suites",
        it: "Camere & Suite"
      },
      subtitle: {
        de: "Moderne Eleganz, edle Materialien und großzügige Raumgestaltung für vollkommenen Komfort.",
        en: "Understated luxury, bespoke furnishings and spacious layouts crafted for supreme comfort.",
        it: "Eleganza moderna, materiali di pregio e spazi ampi studiati per il massimo relax."
      }
    },
    experienceIntro: {
      heading: {
        de: "Erlebnisse & Momente",
        en: "Experiences",
        it: "Esperienze"
      },
      subtitle: {
        de: "Besondere Momente und exklusive Erlebnisse rund um Ihren Hotelaufenthalt.",
        en: "Curated experiences and memorable moments designed to enrich your stay.",
        it: "Esperienze esclusive e momenti unici per arricchire il vostro soggiorno."
      }
    },
    culinaryIntro: {
      heading: {
        de: "Kulinarik & Restaurant",
        en: "Dining & Restaurant",
        it: "Ristorante & Gastronomia"
      },
      subtitle: {
        de: "Frische Gourmetküche vom Frühstück über leichte Mittagsgerichte bis zum Abendessen.",
        en: "Fresh culinary artistry from bountiful morning breakfasts to evening fine dining.",
        it: "Arte culinaria d'eccellenza dalla prima colazione alle cene gourmet della sera."
      },
      subtext: {
        de: "Genießen Sie kulinarische Köstlichkeiten in unserem Restaurant sowie handgemixte Drinks in der Sky Lounge.",
        en: "Savor exquisite dishes prepared with seasonal ingredients in our dining room, accompanied by signature drinks at the Sky Lounge.",
        it: "Gusta creazioni speciali preparate con ingredienti selezionati e cocktail d'autore alla Sky Lounge."
      }
    },
    wellnessIntro: {
      heading: {
        de: "Hotel-Ausstattung & Annehmlichkeiten",
        en: "Hotel Amenities & Services",
        it: "Servizi & Comfort dell'Hotel"
      },
      subtitle: {
        de: "Alles für Ihren Komfort – Moderne Zimmer, Rooftop Sky Bar, Restaurant und aufmerksamer Service.",
        en: "Everything for your comfort – Modern guest rooms, rooftop Sky Bar, restaurant dining, and attentive hospitality.",
        it: "Tutto per il vostro comfort – Camere moderne, Rooftop Sky Bar, ristorante e accoglienza calorosa."
      },
      subtext: {
        de: "Durchdachte Ausstattungen und herzlicher Service sorgen für einen rundum angenehmen Aufenthalt.",
        en: "Thoughtfully curated facilities and warm hospitality ensuring seamless comfort throughout your visit.",
        it: "Dotazioni curate e calda ospitalità per garantire un soggiorno piacevole e senza pensieri."
      }
    },
    aboutStory: {
      title: {
        de: "Über Hotel Aries",
        en: "About Hotel Aries",
        it: "Chi Siamo - Hotel Aries"
      },
      subtitle: {
        de: "Komfort, Stil & Panorama-Gastfreundschaft",
        en: "Comfort, Style & Panoramic Hospitality",
        it: "Comfort, Stile & Ospitalità Panoramica"
      },
      storyP1: {
        de: "Hotel Aries & Sky Lounge wurde mit einer klaren Vision geschaffen: Einen Ort zu etablieren, an dem moderner Hotelkomfort, herausragender Service und eine lebendige Sky-Lounge-Atmosphäre harmonisch verschmelzen.",
        en: "Hotel Aries & Sky Lounge was established with a singular vision: to create a premier hospitality destination combining contemporary room luxury, attentive service, and an elevated social sky lounge experience.",
        it: "L'Hotel Aries & Sky Lounge nasce con una visione chiara: offrire un'ospitalità moderna di alto livello combinando camere raffinate, servizio impeccabile e una spettacolare Sky Lounge."
      },
      storyP2: {
        de: "Unsere 26 Zimmer – darunter 24 Deluxe Zimmer und 2 exklusive Supreme Zimmer – bieten stilvolle Rückzugsorte mit ergonomischem Design, edlen Betten und moderner Technik. Die Krönung des Hauses bildet die spektakuläre Rooftop Sky Bar über den Dächern.",
        en: "Our 26 rooms – featuring 24 Deluxe Rooms and 2 exclusive Supreme Rooms – provide tranquil sanctuaries with ergonomic design, premium bedding, and modern comforts. Crowning the property is our iconic Rooftop Sky Bar.",
        it: "Le nostre 26 camere – tra cui 24 Camere Deluxe e 2 esclusive Camere Supreme – offrono oasi di quiete con design contemporaneo, letti ultra-comfort e tecnologie moderne, coronate dalla suggestiva Rooftop Sky Bar."
      },
      storyP3: {
        de: "Unser engagiertes Team heißt Sie herzlich willkommen und sorgt für einen aufmerksamen, persönlichen Service während Ihres gesamten Aufenthalts.",
        en: "Our dedicated team welcomes you warmly and provides attentive, personal hospitality throughout your entire stay.",
        it: "Il nostro team dedicato vi dà un caloroso benvenuto offrendo un servizio attento e personalizzato durante tutto il soggiorno."
      },
      hostName: "Hotel Aries Team",
      hostRole: {
        de: "Gastgeber & Management",
        en: "Hosts & Management",
        it: "Direzione & Ospitalità"
      },
      hostImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    },
    seo: {
      metaTitle: "Aries & Hotel Sky Lounge | Official Website",
      metaDescription: "Welcome to Aries & Hotel Sky Lounge. Boutique 26-room hotel with 24 Deluxe Rooms, 2 Supreme Rooms, panoramic Rooftop Sky Bar, and refined Hotel Restaurant dining in Zirakpur.",
      keywords: "Aries Hotel, Hotel Aries, Sky Lounge, Luxury Hotel Zirakpur, 26 Rooms Hotel, Deluxe Rooms, Supreme Rooms, Rooftop Bar, Hotel Restaurant, High Ground Road Zirakpur",
      ogImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
    }
  }
};

export const sampleImageLibrary = [
  {
    title: "Hotel Aries Exterior Twilight",
    url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85",
    category: "hotel"
  },
  {
    title: "Sky Lounge Rooftop Bar Ambience",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85",
    category: "skylounge"
  },
  {
    title: "Luxury King Bedroom Interior",
    url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85",
    category: "rooms"
  },
  {
    title: "Supreme Room Lounge Suite",
    url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=85",
    category: "rooms"
  },
  {
    title: "Artisan Dining & Breakfast",
    url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85",
    category: "dining"
  },
  {
    title: "Modern Luxury Rain Shower & Vanity",
    url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85",
    category: "rooms"
  },
  {
    title: "Sky Lounge Evening Cocktails",
    url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=85",
    category: "skylounge"
  },
  {
    title: "Hotel Reception & Welcome Desk",
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85",
    category: "hotel"
  }
];
