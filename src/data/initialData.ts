import { SiteData } from '../types';

export const initialSiteData: SiteData = {
  brandVersion: 2,
  hero: {
    autoSlide: true,
    slideIntervalSeconds: 6,
    showOverlay: true,
    mainTagline: {
      de: "HOTEL ARIES & SKY LOUNGE",
      en: "HOTEL ARIES & SKY LOUNGE",
      it: "HOTEL ARIES & SKY LOUNGE"
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
          de: "HOTEL ARIES & SKY LOUNGE",
          en: "HOTEL ARIES & SKY LOUNGE",
          it: "HOTEL ARIES & SKY LOUNGE"
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
  suites: [
    {
      id: "room-executive-king",
      name: {
        de: "Executive King Zimmer",
        en: "Executive King Room",
        it: "Camera Executive King"
      },
      category: "suite",
      type: "suite",
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
        de: "Modernes Zimmer mit King-Size-Bett, edlem Design und elegantem Badezimmer.",
        en: "Contemporary hotel room featuring plush King-size bedding, ergonomic workspace, and designer en-suite.",
        it: "Camera contemporanea con letto king size, zona lavoro ergonomica e bagno di design."
      },
      fullDesc: {
        de: "Das Executive King Zimmer bietet höchsten Komfort für anspruchsvolle Reisende: Hochwertige Bettwaren, schallisolierte Fenster, modernes Unterhaltungssystem und stilvolle Möbel für ein vollendetes Wohlfühlerlebnis.",
        en: "The Executive King Room delivers refined comfort for discerning guests: premium bedding, sound-insulated windows, a modern entertainment system, and custom-styled furnishings for an effortlessly restful stay.",
        it: "La Camera Executive King offre comfort di alto livello con finiture moderne, isolamento acustico, TV smart e bagno privato con doccia a pioggia."
      },
      amenities: [
        "King-Size Luxury Bed",
        "High-Speed Wi-Fi",
        "Smart 4K TV",
        "En-Suite Rain Shower",
        "Climate Control",
        "Artisan Coffee & Tea Station",
        "Room Service Access"
      ],
      highlights: [
        {
          de: "Erstklassiger Schlafkomfort",
          en: "Premium Bedding Comfort",
          it: "Comfort del Letto Superiore"
        },
        {
          de: "Stilvoller Arbeits- & Ruhebereich",
          en: "Work & Relaxation Zone",
          it: "Zona Lavoro e Relax"
        }
      ],
      viewType: {
        de: "Stadt- / Horizontblick",
        en: "City / Horizon View",
        it: "Vista Città / Orizzonte"
      },
      status: "published",
      displayOrder: 1
    },
    {
      id: "room-deluxe-panorama",
      name: {
        de: "Deluxe Panorama Suite",
        en: "Deluxe Panorama Suite",
        it: "Suite Deluxe Panorama"
      },
      category: "suite",
      type: "suite",
      size: "52 m²",
      maxGuests: 3,
      bedrooms: 1,
      priceFrom: 310,
      image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
      ],
      shortDesc: {
        de: "Großzügige Suite mit separater Lounge-Ecke, weitem Panoramablick und luxuriöser Ausstattung.",
        en: "Expansive corner suite featuring a separate lounge sitting area, wide panoramic vistas and elevated appointments.",
        it: "Ampia suite con zona giorno separata, grandi vetrate panoramiche e finiture di pregio."
      },
      fullDesc: {
        de: "Die Deluxe Panorama Suite begeistert durch raumhohe Fenster, einen getrennten Wohn- und Schlafbereich und ein großzügiges Marmorbad mit freistehender Badewanne und Regendusche.",
        en: "The Deluxe Panorama Suite features floor-to-ceiling windows, distinct living and sleeping quarters, and an expansive bathroom with deep soaking tub and rainfall shower.",
        it: "La Suite Deluxe Panorama vanta vetrate a tutta altezza, zona giorno e notte separate e un sontuoso bagno con vasca idromassaggio."
      },
      amenities: [
        "King-Size Boxspring Bed",
        "Separate Living Lounge",
        "Freestanding Soaking Tub",
        "Panoramic Floor-to-Ceiling Windows",
        "Espresso Machine",
        "Bathrobes & Luxury Toiletries",
        "Priority Sky Lounge Reservation"
      ],
      highlights: [
        {
          de: "Freistehende Badewanne",
          en: "Freestanding Soaking Tub",
          it: "Vasca Indipendente"
        },
        {
          de: "Panoramablick",
          en: "Panoramic Skyline View",
          it: "Vista Panoramica"
        }
      ],
      viewType: {
        de: "Weitläufiger Panoramablick",
        en: "Panoramic Skyline View",
        it: "Ampia Vista Panoramica"
      },
      status: "published",
      displayOrder: 2
    },
    {
      id: "room-aries-sky-suite",
      name: {
        de: "Aries Sky Suite",
        en: "Aries Sky Suite",
        it: "Suite Aries Sky"
      },
      category: "suite",
      type: "suite",
      size: "65 m²",
      maxGuests: 3,
      bedrooms: 1,
      priceFrom: 420,
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
      ],
      shortDesc: {
        de: "Exklusive Suite auf den oberen Etagen mit direktem Zugang zur Atmosphäre der Sky Lounge.",
        en: "Signature upper-level suite offering generous private terrace space and seamless proximity to the Sky Lounge.",
        it: "Suite esclusiva ai piani alti con terrazza privata e accesso diretto all'atmosfera della Sky Lounge."
      },
      fullDesc: {
        de: "Die Aries Sky Suite verkörpert die Identität unseres Hauses: Elegantes Interieur, großzügiger privater Balkonbereich mit Loungemöbeln und erstklassige Service-Vorteile.",
        en: "The Aries Sky Suite embodies the spirit of our hotel: sophisticated contemporary interior architecture, private balcony with lounge seating, and bespoke guest privileges.",
        it: "La Suite Aries Sky rappresenta il fiore all'occhiello dell'hotel con ampi spazi esterni privati, arredi di alta manifattura e privilegi esclusivi."
      },
      amenities: [
        "Private Sky Terrace",
        "Master King Bedroom",
        "Walk-In Dressing Room",
        "Double Vanity Marble Bathroom",
        "Bespoke Minibar & Wine Selection",
        "High-Speed Premium Wi-Fi",
        "Dedicated Guest Relations"
      ],
      highlights: [
        {
          de: "Private Dachterrasse",
          en: "Private Terrace",
          it: "Terrazza Privata"
        },
        {
          de: "Exklusiver Sky-Lounge-Zugang",
          en: "Sky Lounge Access",
          it: "Accesso Sky Lounge"
        }
      ],
      viewType: {
        de: "Skyline & Sonnenuntergang",
        en: "Skyline & Sunset View",
        it: "Skyline e Tramonto"
      },
      status: "published",
      displayOrder: 3
    },
    {
      id: "room-presidential-penthouse",
      name: {
        de: "Presidential Penthouse Suite",
        en: "Presidential Penthouse Suite",
        it: "Suite Penthouse Presidenziale"
      },
      category: "penthouse",
      type: "suite",
      size: "95 m²",
      maxGuests: 4,
      bedrooms: 2,
      priceFrom: 650,
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
      ],
      shortDesc: {
        de: "Die Krönung von Hotel Aries: Zwei Schlafzimmer, privater Dining-Bereich und 360-Grad Panorama.",
        en: "The pinnacle of Hotel Aries: Two luxury bedrooms, private dining room, and an unrivaled 360-degree horizon.",
        it: "Il vertice dell'Hotel Aries: due camere da letto, sala da pranzo privata e vista a 360 gradi."
      },
      fullDesc: {
        de: "Das Kronjuwel unseres Hauses bietet unvergleichlichen Raum und Luxus. Ein eleganter Wohn- und Speisebereich, zwei Kingsize-Schlafzimmer mit jeweils eigenem Bad und eine weitläufige Terrasse.",
        en: "Our flagship accommodation provides peerless residential luxury. Featuring a grand living salon, custom private dining area, two master suites with en-suite bathrooms, and an expansive wraparound terrace.",
        it: "La suite più prestigiosa dell'hotel offre salone di rappresentanza, sala da pranzo privata, due camere padronali e una grande terrazza panoramica."
      },
      amenities: [
        "Two Master King Bedrooms",
        "Private Dining & Living Salon",
        "Wraparound Rooftop Terrace",
        "Jacuzzi / Soaking Tub",
        "Full Kitchenette & Bar",
        "VIP Check-In & Concierge",
        "Complimentary Sky Lounge Reserve"
      ],
      highlights: [
        {
          de: "Zwei separate Schlafzimmer",
          en: "Two Master Bedrooms",
          it: "Due Camere Padronali"
        },
        {
          de: "Rundum-Panoramaterrasse",
          en: "Wraparound Rooftop Terrace",
          it: "Terrazza Panoramica a 360°"
        }
      ],
      viewType: {
        de: "360° Rundumblick",
        en: "360° Horizon View",
        it: "Vista a 360 Gradi"
      },
      status: "published",
      displayOrder: 4
    }
  ],
  skyLounge: {
    title: {
      de: "SKY LOUNGE & ROOFTOP BAR",
      en: "SKY LOUNGE & ROOFTOP BAR",
      it: "SKY LOUNGE & ROOFTOP BAR"
    },
    subtitle: {
      de: "Über den Dächern – Wo der Horizont beginnt",
      en: "Above the Ordinary – Where the Horizon Unfolds",
      it: "Sopra l'Ordinario – Dove l'Orizzonte Prende Vita"
    },
    description: {
      de: "Erleben Sie die Sky Lounge im Hotel Aries: Raffinierte Cocktails, stilvolle Sitzbereiche im Freien, atemberaubende Ausblicke und ein vibrierendes Abendambiente.",
      en: "Experience the signature Sky Lounge at Hotel Aries: Handcrafted cocktails, curated small plates, sophisticated open-air seating, and an electric sunset-to-evening atmosphere.",
      it: "Scopri la Sky Lounge dell'Hotel Aries: cocktail d'autore, delizie gourmet, arredi raffinati e un'atmosfera serale indimenticabile sotto le stelle."
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
      de: "Tisch in der Sky Lounge reservieren",
      en: "Reserve Sky Lounge Table",
      it: "Prenota Tavolo Sky Lounge"
    },
    status: "published",
    nightAmbienceImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
    seatingCapacity: "Indoor & Rooftop Terrace Seating",
    features: [
      {
        de: "Panoramablick & Abendsonne",
        en: "Panoramic Skyline Sunset Views",
        it: "Vista Panoramica e Tramonto"
      },
      {
        de: "Signature Cocktails & Weine",
        en: "Signature Cocktails & Fine Wine",
        it: "Cocktail d'Autore & Vini Pregiati"
      },
      {
        de: "Atmosphärische Musik & Beleuchtung",
        en: "Ambient Music & Elegant Lighting",
        it: "Musica d'Atmosfera & Luci Calde"
      }
    ]
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
    },
    {
      id: "cul-dinner",
      title: {
        de: "Fine Dining am Abend",
        en: "Evening Fine Dining",
        it: "Cena Fine Dining"
      },
      desc: {
        de: "Kerzenlicht, mehrgängige Degustationsmenüs und meisterhafte Kochkunst für besondere Anlässe.",
        en: "Candlelit elegance, multi-course chef tasting menus, and impeccable table service for memorable evenings.",
        it: "Cene a lume di candela, menu degustazione e servizio impeccabile per occasioni speciali."
      },
      time: "18:30 – 23:00",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
      category: "dinner",
      status: "published",
      displayOrder: 4
    }
  ],
  wellness: [
    {
      id: "amenity-pool",
      title: {
        de: "Beheizter Pool & Skyline Terrasse",
        en: "Heated Skyline Pool & Sun Deck",
        it: "Piscina Riscaldata & Terrazza Solarium"
      },
      desc: {
        de: "Angenehm temperiertes Wasser und bequeme Liegen zum Entspannen unter freiem Himmel.",
        en: "Temperature-controlled swimming pool with comfortable loungers and open-air horizon views.",
        it: "Piscina con acqua a temperatura controllata e comodi lettini per rilassarsi all'aperto."
      },
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
      tag: {
        de: "Pool & Terrasse",
        en: "Pool & Terrace",
        it: "Piscina & Terrazza"
      },
      category: "pool",
      status: "published",
      displayOrder: 1
    },
    {
      id: "amenity-spa",
      title: {
        de: "Spa, Sauna & Dampfbad",
        en: "Spa, Thermal Sauna & Steam Room",
        it: "Spa, Sauna Termale & Bagno Turco"
      },
      desc: {
        de: "Wohltuende Wärme und stille Ruheräume zur vollkommenen Entschleunigung nach einem erlebnisreichen Tag.",
        en: "Thermal sauna heat, aromatic steam, and peaceful relaxation lounges to unwind and rejuvenate.",
        it: "Calore rilassante della sauna, vapore aromatico e aree relax per rigenerarsi completamente."
      },
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      tag: {
        de: "Regeneration",
        en: "Rejuvenation",
        it: "Rigenerazione"
      },
      category: "spa",
      status: "published",
      displayOrder: 2
    },
    {
      id: "amenity-fitness",
      title: {
        de: "Modernes Fitness Center",
        en: "Modern Fitness Studio",
        it: "Centro Fitness Moderno"
      },
      desc: {
        de: "Modernste Cardio- und Kraftgeräte für Ihr tägliches Workout während des Hotelaufenthalts.",
        en: "State-of-the-art cardio and strength training equipment available for guest wellness and fitness routines.",
        it: "Attrezzature all'avanguardia per cardio e pesi dedicate al benessere e all'allenamento degli ospiti."
      },
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
      tag: {
        de: "Fitness & Training",
        en: "Fitness & Training",
        it: "Fitness & Allenamento"
      },
      category: "gym",
      status: "published",
      displayOrder: 3
    },
    {
      id: "amenity-wifi",
      title: {
        de: "High-Speed Wi-Fi & Business Service",
        en: "High-Speed Wi-Fi & Connectivity",
        it: "Wi-Fi ad Alta Velocità & Connettività"
      },
      desc: {
        de: "Zuverlässiges Hochgeschwindigkeits-Internet in allen Zimmern, Suiten, Loungebereichen und Konferenzräumen.",
        en: "Seamless high-speed wireless connectivity throughout all rooms, suites, lounges, and public spaces.",
        it: "Connessione internet ultraveloce in tutte le camere, suite e spazi comuni dell'hotel."
      },
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      tag: {
        de: "Konnektivität",
        en: "Connectivity",
        it: "Connettività"
      },
      category: "wifi",
      status: "published",
      displayOrder: 4
    },
    {
      id: "amenity-concierge",
      title: {
        de: "24/7 Concierge & Parkservice",
        en: "24/7 Concierge & Valet Parking",
        it: "Concierge 24/7 & Parcheggio"
      },
      desc: {
        de: "Persönlicher Gästeservice rund um die Uhr, Gepäckservice und sichere Parkmöglichkeiten direkt am Hotel.",
        en: "Dedicated round-the-clock guest assistance, secure private parking, and professional luggage handling.",
        it: "Assistenza dedicata 24 ore su 24, parcheggio custodito e servizio bagagli sempre a disposizione."
      },
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      tag: {
        de: "Guest Services",
        en: "Guest Services",
        it: "Servizi Ospiti"
      },
      category: "parking",
      status: "published",
      displayOrder: 5
    }
  ],
  experiences: [
    {
      id: "exp-sunset",
      title: {
        de: "Skyline Sunset Abend",
        en: "Skyline Sunset Evening",
        it: "Serata Sunset Skyline"
      },
      category: "culture",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
      shortDesc: {
        de: "Erleben Sie den spektakulären Sonnenuntergang von unserer Sky Lounge bei einem Glas Champagner oder Cocktail.",
        en: "Take in breathtaking horizon sunset colors from the open terrace of our Sky Lounge with handcrafted cocktails.",
        it: "Ammira gli spettacolari colori del tramonto dalla terrazza della Sky Lounge accompagnato da cocktail d'autore."
      },
      details: {
        de: "Genießen Sie reservierte Premium-Plätze zur goldenen Stunde, abgestimmte Vorspeisen und den Blick auf die leuchtende Skyline.",
        en: "Enjoy reserved prime seating during the golden hour, paired chef small plates, and an elevated social atmosphere.",
        it: "Goditi posti riservati durante l'ora d'oro, assaggi dello chef e una musica lounge d'accompagnamento."
      },
      season: {
        de: "Ganzjährig",
        en: "Year-Round",
        it: "Tutto l'Anno"
      },
      duration: "18:00 – 21:00",
      status: "published",
      displayOrder: 1
    },
    {
      id: "exp-dining",
      title: {
        de: "Exklusives Chefkoch-Dinner",
        en: "Private Chef's Tasting Dinner",
        it: "Cena Degustazione dello Chef"
      },
      category: "culture",
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80",
      shortDesc: {
        de: "Ein individuell abgestimmtes Mehrgang-Menü für besondere private Momente und Feiern.",
        en: "A bespoke multi-course gourmet tasting menu crafted for celebratory occasions and intimate gatherings.",
        it: "Un menu degustazione personalizzato a più portate pensato per ricorrenze e momenti speciali."
      },
      details: {
        de: "Unser Küchenteam kreiert ein exklusives Gourmet-Erlebnis nach Ihren persönlichen Wünschen mit passender Weinbegleitung.",
        en: "Our culinary team designs an exceptional dining journey tailored to your palate, paired with hand-selected vintages.",
        it: "La nostra brigata di cucina crea un'esperienza gastronomica unica calibrata sui vostri gusti con abbinamenti di vini."
      },
      season: {
        de: "Auf Vorbestellung",
        en: "By Reservation",
        it: "Su Prenotazione"
      },
      duration: "ca. 3 Stunden",
      status: "published",
      displayOrder: 2
    }
  ],
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
        de: "Executive Zimmer Interieur",
        en: "Executive Room Interior",
        it: "Interni Camera Executive"
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
        de: "Restaurant & Kulinarik",
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
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85",
      title: {
        de: "Beheizter Skyline Pool",
        en: "Heated Skyline Swimming Pool",
        it: "Piscina Riscaldata Panoramica"
      },
      category: "amenities",
      caption: {
        de: "Entspannung mit Weitblick auf der Sonnenterrasse",
        en: "Sun terrace relaxation with peaceful horizon vistas",
        it: "Relax sulla terrazza solarium con splendida vista"
      },
      altText: "Hotel Aries heated pool terrace",
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
        de: "Panorama Suite Badezimmer",
        en: "Panorama Suite Marble Bathroom",
        it: "Bagno in Marmo Suite Panorama"
      },
      category: "rooms",
      caption: {
        de: "Freistehende Badewanne und Marmorwaschtisch",
        en: "Deep soaking bath and marble double vanity",
        it: "Vasca freestanding e doppio lavabo in marmo"
      },
      altText: "Hotel Aries luxury suite bathroom",
      displayOrder: 7
    },
    {
      id: "gal-8",
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85",
      title: {
        de: "Wellness Spa & Ruheraum",
        en: "Wellness Spa & Relaxation Suite",
        it: "Spa & Area Relax"
      },
      category: "amenities",
      caption: {
        de: "Ruhe und Regeneration für Körper und Geist",
        en: "Rejuvenating thermal tranquility for body and mind",
        it: "Tranquillità termale per corpo e mente"
      },
      altText: "Hotel Aries spa and sauna",
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
    hotelName: "Hotel Aries & Sky Lounge",
    primaryName: "Hotel Aries",
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
    copyrightText: "© Hotel Aries & Sky Lounge. All rights reserved.",
    footerDescription: "Experience modern luxury accommodations, elevated dining, and panoramic rooftop drinks at Hotel Aries & Sky Lounge."
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
      statSuites: "Rooms & Suites",
      statVineyard: "Sky Lounge",
      statSunDays: "24/7 Service"
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
        en: "Hotel Amenities",
        it: "Servizi & Comfort dell'Hotel"
      },
      subtitle: {
        de: "Alles für Ihren Komfort – Beheizter Pool, Fitness, Spa und 24/7 Gästeservice.",
        en: "Everything for your comfort – Heated pool, spa sauna, modern fitness, and 24/7 guest services.",
        it: "Tutto per il vostro benessere – Piscina riscaldata, spa, palestra moderna e servizio 24/7."
      },
      subtext: {
        de: "Erstklassige Annehmlichkeiten sorgen dafür, dass Sie während Ihres Aufenthalts vollkommen entspannen und neue Energie schöpfen können.",
        en: "Thoughtfully curated facilities ensuring total relaxation and seamless convenience throughout your visit.",
        it: "Dotazioni di altissimo livello per garantire relax totale e comfort durante l'intero soggiorno."
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
        de: "Unsere Zimmer und Suiten bieten stilvolle Rückzugsorte mit ergonomischem Design, edlen Betten und moderner Technik. Die Krönung des Hauses bildet die spektakuläre Sky Lounge über den Dächern.",
        en: "Our rooms and suites provide tranquil sanctuaries featuring thoughtful design, premium bedding, and state-of-the-art comforts. Crowning the property is our iconic rooftop Sky Lounge.",
        it: "Le nostre camere e suite offrono oasi di quiete con design contemporaneo, letti ultra-comfort e tecnologie moderne, coronate dalla suggestiva Sky Lounge panoramica."
      },
      storyP3: {
        de: "Unser engagiertes Team ist rund um die Uhr für Sie da, um Ihren Aufenthalt so angenehm und unvergesslich wie möglich zu gestalten.",
        en: "Our dedicated team is on hand 24/7 to provide discreet, attentive hospitality and ensure your stay is seamless from check-in to departure.",
        it: "Il nostro team dedicato è a vostra completa disposizione 24 ore su 24 per rendere ogni soggiorno memorabile e senza pensieri."
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
      metaTitle: "Hotel Aries & Sky Lounge | Official Website",
      metaDescription: "Welcome to Hotel Aries & Sky Lounge. Luxury hotel rooms, panoramic rooftop sky lounge, elevated dining, and exceptional hospitality. Book direct for best rates.",
      keywords: "Hotel Aries, Sky Lounge, Luxury Hotel, Rooftop Bar, Hotel Rooms, Suites, Fine Dining, Hotel Booking",
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
    title: "Heated Skyline Swimming Pool",
    url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85",
    category: "amenities"
  },
  {
    title: "Artisan Dining & Gourmet Breakfast",
    url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85",
    category: "dining"
  },
  {
    title: "Panorama Suite Marble Bath",
    url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85",
    category: "rooms"
  },
  {
    title: "Sky Lounge Evening Cocktails",
    url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=85",
    category: "skylounge"
  },
  {
    title: "Hotel Reception & Concierge",
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85",
    category: "hotel"
  }
];
