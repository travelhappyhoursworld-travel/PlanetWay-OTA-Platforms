import React, { useEffect, useMemo, useState } from "react";
import { db } from "./firebase";
import {
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";
/* =========================================================
   PLANETWAY STORAGE
========================================================= */

const STORAGE_KEY = "planetway_arrangements";
const USER_KEY = "planetway_current_user"
const BOOKING_KEY = "planetway_bookings";
const LANGUAGE_KEY = "planetway_language";

/* =========================================================
   LANGUAGES
   OVO JE PRAVI JEZIČKI SISTEM
========================================================= */

const languageOptions = [{ code: "en", name: "English", native: "English", region: "EN", flag: "EN" },{ code: "zh", name: "Chinese", native: "中文", region: "ZH", flag: "ZH" },{ code: "es", name: "Spanish", native: "Español", region: "ES", flag: "ES" },{ code: "ar", name: "Arabic", native: "العربية", region: "AR", flag: "AR" },{ code: "hi", name: "Hindi", native: "हनद", region: "HI", flag: "HI" },{ code: "pt", name: "Portuguese", native: "Português", region: "PT", flag: "PT" },{ code: "fr", name: "French", native: "Français", region: "FR", flag: "FR" },{ code: "ru", name: "Russian", native: "Русский", region: "RU", flag: "RU" },{ code: "de", name: "German", native: "Deutsch", region: "DE", flag: "DE" },{ code: "ja", name: "Japanese", native: "日本語", region: "JA", flag: "JA" },{ code: "it", name: "Italian", native: "Italiano", region: "IT", flag: "IT" },{ code: "sr", name: "Serbian", native: "Srpski", region: "SR", flag: "SR" }];

/* =========================================================
   COMPLETE TRANSLATION DICTIONARY
========================================================= */

const translations = {
  en: {
    language: "English",
    home: "Home",
    flights: "Flights",
    hotels: "Hotels",
    cars: "Rent a Car",
    packages: "Packages",
    contact: "Contact",
    login: "Login",
    register: "Register",
    logout: "Logout",

    discover: "Discover Your",
    world: "World.",
    heroText:
      "Flights, hotels, cars and unforgettable travel experiences in one intelligent global platform.",
    destination: "Destination",
    departure: "Departure",
    return: "Return",
    checkIn: "Check-in",
    checkOut: "Check-out",
    pickup: "Pick-up",
    dropoff: "Drop-off",
    pickupDate: "Pick-up Date",
    dropoffDate: "Drop-off Date",
    class: "Class",
    adults: "Adults",
    children: "Children",
    rooms: "Rooms",
    guests: "Guests",
    travelers: "Travelers",
    economy: "Economy",
    premiumEconomy: "Premium Economy",
    business: "Business",
    firstClass: "First Class",
    search: "Search",
    whereGo: "Where do you want to go?",
    cityDestination: "City or destination",
    pickupLocation: "Pick-up location",
    dropoffLocation: "Drop-off location",
    packageDestination: "Where would you like to travel?",
    startDate: "Start Date",

    bookSmarter: "Book smarter. Travel further.",
    destinations: "Destinations",
    travelSupport: "Travel Support",
    smartPlatform: "Smart Platform",

    esim: "eSIM",
    esimText: "Global mobile connectivity",
    insurance: "Insurance",
    insuranceText: "Travel protection",
    exchange: "Exchange",
    exchangeText: "Currency exchange",
    map: "Map",
    mapText: "Explore destinations",

    searchResults: "SEARCH RESULTS",
    availableArrangements: "Available PlanetWay arrangements",
    matchingDestination: "Results matching your destination.",
    noResults: "No results found",
    tryAnother: "Try another destination.",
    viewBook: "View & Book",

    aiNavigator: "AI Navigator",
    aiTitle: "Tell us where you want to go.",
    aiText:
      "Ask PlanetWay to help you find the right travel service.",
    whatLooking: "What are you looking for?",
    aiPlaceholder:
      "Example: I want a beach hotel in Greece...",
    findTrip: "Find my trip",
    openNavigator: "Open Navigator",
    aiReady: "AI Navigator is ready.",

    welcome: "WELCOME BACK",
    workspace: "Your PlanetWay workspace",
    userWorkspace:
      "Search and manage your travel from one place.",
    staffWorkspace:
      "Manage travel products, bookings and platform operations from one place.",

    overview: "Overview",
    arrangements: "Arrangements",
    bookings: "Bookings",
    users: "Users",
    analytics: "Analytics",
    settings: "Settings",

    uploadArrangement: "Upload arrangement",
    manageArrangements: "Manage arrangements",
    viewBookings: "View bookings",
    newArrangement: "New arrangement",
    addArrangement: "Add arrangement",

    travelArrangements: "Travel arrangements",
    createManage:
      "Create and manage everything published on PlanetWay.",
    noCustom: "No custom arrangements yet",
    uploadFirst: "Upload your first travel arrangement.",

    arrangement: "Arrangement",
    price: "Price",
    status: "Status",
    actions: "Actions",
    published: "Published",
    draft: "Draft",
    publish: "Publish",
    unpublish: "Unpublish",
    edit: "Edit",
    delete: "Delete",

    reservations: "RESERVATIONS",
    bookingManagement: "Booking management",
    allBookings:
      "All PlanetWay booking activity appears here.",
    noBookings: "No bookings yet",
    customerBookings:
      "Customer bookings will appear here.",

    administration: "ADMINISTRATION",
    manageRoles: "Manage platform user roles.",
    addUser: "Add user",
    manage: "Manage",

    businessIntelligence: "BUSINESS INTELLIGENCE",
    planetwayAnalytics: "PlanetWay Analytics",
    performance: "Platform performance overview.",
    totalArrangements: "TOTAL ARRANGEMENTS",
    totalBookings: "TOTAL BOOKINGS",
    revenue: "REVENUE",
    platformActivity: "PLATFORM ACTIVITY",
    growthOverview: "Growth overview",

    platformSettings: "PLATFORM SETTINGS",
    configureWorkspace:
      "Configure your PlanetWay workspace.",
    platformLanguage: "Platform language",
    chooseDashboard:
      "Choose your dashboard language.",
    notifications: "Notifications",
    alerts: "Receive booking and platform alerts.",
    accountRole: "Account role",
    currentAccess: "Current access level.",

    connectivity: "Connectivity",
    travelProtection: "Travel protection",
    currency: "Currency",
    destinationsModule: "Destinations",

    createArrangement: "Create new arrangement",
    editArrangement: "Edit arrangement",
    arrangementTitle: "Arrangement title",
    country: "Country",
    city: "City",
    type: "Type",
    description: "Description",
    describe:
      "Describe this travel arrangement...",
    uploadImage: "Upload image",
    clickUpload: "Click to select a travel image",
    preview: "Preview",
    publishPlanetWay: "Publish on PlanetWay",
    saveChanges: "Save changes",
    create: "Create arrangement",
    close: "Close",

    package: "Package",
    hotel: "Hotel",
    flight: "Flight",
    car: "Car",
    experience: "Experience",
    transfer: "Transfer",

    contactTitle: "Contact PlanetWay",
    contactText:
      "Our travel support team is available to help you.",
    support: "24/7 customer support",

    welcomePlanetWay: "Welcome to PlanetWay",
    email: "Email",
    password: "Password",
    name: "Name",
    forgotPassword: "Forgot password?",
    signIn: "Sign in",
    createAccount: "Create account",
    continueGoogle: "Continue with Google",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",

    backPlanetWay: "Back to PlanetWay",
    controlCenter: "PLANETWAY CONTROL CENTER",
    globalPlatform: "GLOBAL TRAVEL PLATFORM",
    planetwayLanguages: "PlanetWay languages",

    enterTitle: "Enter arrangement title.",
    enterDestination: "Enter destination.",
    arrangementUpdated: "Arrangement updated successfully.",
    arrangementCreated: "Arrangement created successfully.",
    bookingCreated: "Booking created successfully.",
    completeFields: "Please complete all fields.",
    enterEmailPassword:
      "Please enter email and password.",
    enterEmail: "Enter your email address.",
    deleteConfirm: "Delete this arrangement?",
    bookingDelete: "Delete this booking?",
    languageSelected: "Language selected",
    loginGoogle:
      "Google Login will be connected to Firebase Authentication.",
    resetInstructions:
      "Password reset instructions will be sent to",
  },

  sr: {
    language: "Srpski",
    home: "Početna",
    flights: "Letovi",
    hotels: "Hoteli",
    cars: "Rent a Car",
    packages: "Paketi",
    contact: "Kontakt",
    login: "Prijava",
    register: "Registracija",
    logout: "Odjava",

    discover: "Otkrijte svoj",
    world: "svet.",
    heroText:
      "Letovi, hoteli, automobili i nezaboravna putovanja na jednoj inteligentnoj globalnoj platformi.",
    destination: "Destinacija",
    departure: "Polazak",
    return: "Povratak",
    checkIn: "Prijava",
    checkOut: "Odjava",
    pickup: "Preuzimanje",
    dropoff: "Vraćanje",
    pickupDate: "Datum preuzimanja",
    dropoffDate: "Datum vraćanja",
    class: "Klasa",
    adults: "Odrasli",
    children: "Deca",
    rooms: "Sobe",
    guests: "Gosti",
    travelers: "Putnici",
    economy: "Ekonomska",
    premiumEconomy: "Premium ekonomska",
    business: "Biznis",
    firstClass: "Prva klasa",
    search: "Pretraži",
    whereGo: "Gde želite da putujete?",
    cityDestination: "Grad ili destinacija",
    pickupLocation: "Mesto preuzimanja",
    dropoffLocation: "Mesto vraćanja",
    packageDestination: "Gde želite da putujete?",
    startDate: "Datum početka",

    bookSmarter: "Rezervišite pametnije. Putujte dalje.",
    destinations: "Destinacije",
    travelSupport: "Putnička podrška",
    smartPlatform: "Pametna platforma",

    esim: "eSIM",
    esimText: "Globalna mobilna povezanost",
    insurance: "Osiguranje",
    insuranceText: "Zaštita tokom putovanja",
    exchange: "Menjačnica",
    exchangeText: "Menjanje valuta",
    map: "Mapa",
    mapText: "Istražite destinacije",

    searchResults: "REZULTATI PRETRAGE",
    availableArrangements: "Dostupni PlanetWay aranžmani",
    matchingDestination:
      "Rezultati koji odgovaraju vašoj destinaciji.",
    noResults: "Nema rezultata",
    tryAnother: "Pokušajte sa drugom destinacijom.",
    viewBook: "Pogledaj i rezerviši",

    aiNavigator: "AI Navigator",
    aiTitle: "Recite nam gde želite da putujete.",
    aiText:
      "Pitajte PlanetWay da vam pronađe odgovarajuću putničku uslugu.",
    whatLooking: "Šta tražite?",
    aiPlaceholder:
      "Primer: Želim hotel na plaži u Grčkoj...",
    findTrip: "Pronađi moje putovanje",
    openNavigator: "Otvori Navigator",
    aiReady: "AI Navigator je spreman.",

    welcome: "DOBRO DOŠLI NAZAD",
    workspace: "Vaš PlanetWay radni prostor",
    userWorkspace:
      "Pretražujte i upravljajte svojim putovanjima sa jednog mesta.",
    staffWorkspace:
      "Upravljajte turističkim proizvodima, rezervacijama i operacijama platforme sa jednog mesta.",

    overview: "Pregled",
    arrangements: "Aranžmani",
    bookings: "Rezervacije",
    users: "Korisnici",
    analytics: "Analitika",
    settings: "Podešavanja",

    uploadArrangement: "Dodaj aranžman",
    manageArrangements: "Upravljaj aranžmanima",
    viewBookings: "Pregled rezervacija",
    newArrangement: "Novi aranžman",
    addArrangement: "Dodaj aranžman",

    travelArrangements: "Putnički aranžmani",
    createManage:
      "Kreirajte i upravljajte svime što je objavljeno na PlanetWay platformi.",
    noCustom: "Još nema prilagođenih aranžmana",
    uploadFirst: "Dodajte svoj prvi putnički aranžman.",

    arrangement: "Aranžman",
    price: "Cena",
    status: "Status",
    actions: "Akcije",
    published: "Objavljeno",
    draft: "Nacrt",
    publish: "Objavi",
    unpublish: "Povuci objavu",
    edit: "Izmeni",
    delete: "Obriši",

    reservations: "REZERVACIJE",
    bookingManagement: "Upravljanje rezervacijama",
    allBookings:
      "Sve PlanetWay aktivnosti rezervacija prikazuju se ovde.",
    noBookings: "Još nema rezervacija",
    customerBookings:
      "Rezervacije korisnika pojaviće se ovde.",

    administration: "ADMINISTRACIJA",
    manageRoles: "Upravljajte ulogama korisnika platforme.",
    addUser: "Dodaj korisnika",
    manage: "Upravljaj",

    businessIntelligence: "POSLOVNA INTELIGENCIJA",
    planetwayAnalytics: "PlanetWay analitika",
    performance: "Pregled performansi platforme.",
    totalArrangements: "UKUPNO ARANŽMANA",
    totalBookings: "UKUPNO REZERVACIJA",
    revenue: "PRIHOD",
    platformActivity: "AKTIVNOST PLATFORME",
    growthOverview: "Pregled rasta",

    platformSettings: "PODEŠAVANJA PLATFORME",
    configureWorkspace:
      "Podesite svoj PlanetWay radni prostor.",
    platformLanguage: "Jezik platforme",
    chooseDashboard:
      "Izaberite jezik svog dashboarda.",
    notifications: "Obaveštenja",
    alerts: "Primajte obaveštenja o rezervacijama i platformi.",
    accountRole: "Uloga naloga",
    currentAccess: "Trenutni nivo pristupa.",

    connectivity: "Povezanost",
    travelProtection: "Putna zaštita",
    currency: "Valuta",
    destinationsModule: "Destinacije",

    createArrangement: "Kreiraj novi aranžman",
    editArrangement: "Izmeni aranžman",
    arrangementTitle: "Naziv aranžmana",
    country: "Država",
    city: "Grad",
    type: "Tip",
    description: "Opis",
    describe: "Opišite ovaj putnički aranžman...",
    uploadImage: "Dodaj sliku",
    clickUpload: "Kliknite da izaberete sliku putovanja",
    preview: "Pregled",
    publishPlanetWay: "Objavi na PlanetWay",
    saveChanges: "Sačuvaj izmene",
    create: "Kreiraj aranžman",
    close: "Zatvori",

    package: "Paket",
    hotel: "Hotel",
    flight: "Let",
    car: "Automobil",
    experience: "Iskustvo",
    transfer: "Transfer",

    contactTitle: "Kontaktirajte PlanetWay",
    contactText:
      "Naš tim putničke podrške je dostupan da vam pomogne.",
    support: "Podrška korisnicima 24/7",

    welcomePlanetWay: "Dobro došli na PlanetWay",
    email: "Email",
    password: "Lozinka",
    name: "Ime",
    forgotPassword: "Zaboravili ste lozinku?",
    signIn: "Prijavi se",
    createAccount: "Kreiraj nalog",
    continueGoogle: "Nastavi preko Google-a",
    noAccount: "Nemate nalog?",
    haveAccount: "Već imate nalog?",

    backPlanetWay: "Nazad na PlanetWay",
    controlCenter: "PLANETWAY KONTROLNI CENTAR",
    globalPlatform: "GLOBALNA PUTNIČKA PLATFORMA",
    planetwayLanguages: "PlanetWay jezici",

    enterTitle: "Unesite naziv aranžmana.",
    enterDestination: "Unesite destinaciju.",
    arrangementUpdated: "Aranžman je uspešno izmenjen.",
    arrangementCreated: "Aranžman je uspešno kreiran.",
    bookingCreated: "Rezervacija je uspešno kreirana.",
    completeFields: "Molimo popunite sva polja.",
    enterEmailPassword:
      "Molimo unesite email i lozinku.",
    enterEmail: "Unesite svoju email adresu.",
    deleteConfirm: "Obrisati ovaj aranžman?",
    bookingDelete: "Obrisati ovu rezervaciju?",
    languageSelected: "Izabran jezik",
    loginGoogle:
      "Google prijava će biti povezana sa Firebase Authentication.",
    resetInstructions:
      "Instrukcije za resetovanje lozinke biće poslate na",
  },

  de: {
    language: "Deutsch",
    home: "Startseite",
    flights: "Flüge",
    hotels: "Hotels",
    cars: "Mietwagen",
    packages: "Pakete",
    contact: "Kontakt",
    login: "Anmelden",
    register: "Registrieren",
    logout: "Abmelden",

    discover: "Entdecken Sie Ihre",
    world: "Welt.",
    heroText:
      "Flüge, Hotels, Mietwagen und unvergessliche Reiseerlebnisse auf einer intelligenten globalen Plattform.",
    destination: "Reiseziel",
    departure: "Abflug",
    return: "Rückflug",
    checkIn: "Check-in",
    checkOut: "Check-out",
    pickup: "Abholung",
    dropoff: "Rückgabe",
    pickupDate: "Abholdatum",
    dropoffDate: "Rückgabedatum",
    class: "Klasse",
    adults: "Erwachsene",
    children: "Kinder",
    rooms: "Zimmer",
    guests: "Gäste",
    travelers: "Reisende",
    economy: "Economy",
    premiumEconomy: "Premium Economy",
    business: "Business",
    firstClass: "First Class",
    search: "Suchen",
    whereGo: "Wohin möchten Sie reisen?",
    cityDestination: "Stadt oder Reiseziel",
    pickupLocation: "Abholort",
    dropoffLocation: "Rückgabeort",
    packageDestination: "Wohin möchten Sie reisen?",
    startDate: "Startdatum",

    bookSmarter: "Intelligenter buchen. Weiter reisen.",
    destinations: "Reiseziele",
    travelSupport: "Reisesupport",
    smartPlatform: "Smarte Plattform",

    esim: "eSIM",
    esimText: "Globale mobile Verbindung",
    insurance: "Versicherung",
    insuranceText: "Reiseschutz",
    exchange: "Wechsel",
    exchangeText: "Währungsumtausch",
    map: "Karte",
    mapText: "Reiseziele entdecken",

    searchResults: "SUCHERGEBNISSE",
    availableArrangements: "Verfügbare PlanetWay-Angebote",
    matchingDestination:
      "Ergebnisse passend zu Ihrem Reiseziel.",
    noResults: "Keine Ergebnisse",
    tryAnother: "Versuchen Sie ein anderes Reiseziel.",
    viewBook: "Ansehen & Buchen",

    aiNavigator: "AI Navigator",
    aiTitle: "Sagen Sie uns, wohin Sie reisen möchten.",
    aiText:
      "PlanetWay hilft Ihnen, den passenden Reiseservice zu finden.",
    whatLooking: "Wonach suchen Sie?",
    aiPlaceholder:
      "Beispiel: Ich möchte ein Strandhotel in Griechenland...",
    findTrip: "Meine Reise finden",
    openNavigator: "Navigator öffnen",
    aiReady: "AI Navigator ist bereit.",

    welcome: "WILLKOMMEN ZURÜCK",
    workspace: "Ihr PlanetWay-Arbeitsbereich",
    userWorkspace:
      "Verwalten Sie Ihre Reisen an einem Ort.",
    staffWorkspace:
      "Verwalten Sie Reiseprodukte, Buchungen und Plattformoperationen an einem Ort.",

    overview: "Übersicht",
    arrangements: "Reiseangebote",
    bookings: "Buchungen",
    users: "Benutzer",
    analytics: "Analysen",
    settings: "Einstellungen",

    uploadArrangement: "Angebot hochladen",
    manageArrangements: "Angebote verwalten",
    viewBookings: "Buchungen anzeigen",
    newArrangement: "Neues Angebot",
    addArrangement: "Angebot hinzufügen",

    travelArrangements: "Reiseangebote",
    createManage:
      "Erstellen und verwalten Sie alles, was auf PlanetWay veröffentlicht wird.",
    noCustom: "Noch keine eigenen Angebote",
    uploadFirst: "Laden Sie Ihr erstes Reiseangebot hoch.",

    arrangement: "Angebot",
    price: "Preis",
    status: "Status",
    actions: "Aktionen",
    published: "Veröffentlicht",
    draft: "Entwurf",
    publish: "Veröffentlichen",
    unpublish: "Veröffentlichung entfernen",
    edit: "Bearbeiten",
    delete: "Löschen",

    reservations: "RESERVIERUNGEN",
    bookingManagement: "Buchungsverwaltung",
    allBookings:
      "Alle PlanetWay-Buchungsaktivitäten werden hier angezeigt.",
    noBookings: "Noch keine Buchungen",
    customerBookings:
      "Kundenbuchungen werden hier angezeigt.",

    administration: "ADMINISTRATION",
    manageRoles: "Benutzerrollen verwalten.",
    addUser: "Benutzer hinzufügen",
    manage: "Verwalten",

    businessIntelligence: "BUSINESS INTELLIGENCE",
    planetwayAnalytics: "PlanetWay Analysen",
    performance: "Überblick über die Plattformleistung.",
    totalArrangements: "ANGEBOTE GESAMT",
    totalBookings: "BUCHUNGEN GESAMT",
    revenue: "UMSATZ",
    platformActivity: "PLATTFORMAKTIVITÄT",
    growthOverview: "Wachstumsübersicht",

    platformSettings: "PLATTFORMEINSTELLUNGEN",
    configureWorkspace:
      "Konfigurieren Sie Ihren PlanetWay-Arbeitsbereich.",
    platformLanguage: "Plattformsprache",
    chooseDashboard:
      "Wählen Sie die Sprache Ihres Dashboards.",
    notifications: "Benachrichtigungen",
    alerts: "Buchungs- und Plattformbenachrichtigungen erhalten.",
    accountRole: "Kontorolle",
    currentAccess: "Aktuelle Zugriffsebene.",

    connectivity: "Konnektivität",
    travelProtection: "Reiseschutz",
    currency: "Währung",
    destinationsModule: "Reiseziele",

    createArrangement: "Neues Angebot erstellen",
    editArrangement: "Angebot bearbeiten",
    arrangementTitle: "Titel des Angebots",
    country: "Land",
    city: "Stadt",
    type: "Typ",
    description: "Beschreibung",
    describe: "Beschreiben Sie dieses Reiseangebot...",
    uploadImage: "Bild hochladen",
    clickUpload: "Klicken Sie, um ein Reisebild auszuwählen",
    preview: "Vorschau",
    publishPlanetWay: "Auf PlanetWay veröffentlichen",
    saveChanges: "Änderungen speichern",
    create: "Angebot erstellen",
    close: "Schließen",

    package: "Paket",
    hotel: "Hotel",
    flight: "Flug",
    car: "Auto",
    experience: "Erlebnis",
    transfer: "Transfer",

    contactTitle: "PlanetWay kontaktieren",
    contactText:
      "Unser Reisesupport-Team hilft Ihnen gerne.",
    support: "24/7 Kundensupport",

    welcomePlanetWay: "Willkommen bei PlanetWay",
    email: "E-Mail",
    password: "Passwort",
    name: "Name",
    forgotPassword: "Passwort vergessen?",
    signIn: "Anmelden",
    createAccount: "Konto erstellen",
    continueGoogle: "Mit Google fortfahren",
    noAccount: "Noch kein Konto?",
    haveAccount: "Bereits ein Konto?",

    backPlanetWay: "Zurück zu PlanetWay",
    controlCenter: "PLANETWAY KONTROLLZENTRUM",
    globalPlatform: "GLOBALE REISEPLATTFORM",
    planetwayLanguages: "PlanetWay Sprachen",

    enterTitle: "Bitte Angebotstitel eingeben.",
    enterDestination: "Bitte Reiseziel eingeben.",
    arrangementUpdated: "Angebot erfolgreich aktualisiert.",
    arrangementCreated: "Angebot erfolgreich erstellt.",
    bookingCreated: "Buchung erfolgreich erstellt.",
    completeFields: "Bitte alle Felder ausfüllen.",
    enterEmailPassword:
      "Bitte E-Mail und Passwort eingeben.",
    enterEmail: "Bitte Ihre E-Mail-Adresse eingeben.",
    deleteConfirm: "Dieses Angebot löschen?",
    bookingDelete: "Diese Buchung löschen?",
    languageSelected: "Sprache ausgewählt",
    loginGoogle:
      "Google Login wird mit Firebase Authentication verbunden.",
    resetInstructions:
      "Anweisungen zum Zurücksetzen des Passworts werden gesendet an",
  },

  it: {
    language: "Italiano",
    home: "Home",
    flights: "Voli",
    hotels: "Hotel",
    cars: "Noleggio auto",
    packages: "Pacchetti",
    contact: "Contatti",
    login: "Accedi",
    register: "Registrati",
    logout: "Esci",

    discover: "Scopri il tuo",
    world: "mondo.",
    heroText:
      "Voli, hotel, auto ed esperienze di viaggio indimenticabili su un'unica piattaforma globale intelligente.",
    destination: "Destinazione",
    departure: "Partenza",
    return: "Ritorno",
    checkIn: "Check-in",
    checkOut: "Check-out",
    pickup: "Ritiro",
    dropoff: "Riconsegna",
    pickupDate: "Data ritiro",
    dropoffDate: "Data riconsegna",
    class: "Classe",
    adults: "Adulti",
    children: "Bambini",
    rooms: "Camere",
    guests: "Ospiti",
    travelers: "Viaggiatori",
    economy: "Economy",
    premiumEconomy: "Premium Economy",
    business: "Business",
    firstClass: "Prima classe",
    search: "Cerca",
    whereGo: "Dove vuoi andare?",
    cityDestination: "Città o destinazione",
    pickupLocation: "Luogo di ritiro",
    dropoffLocation: "Luogo di riconsegna",
    packageDestination: "Dove vuoi viaggiare?",
    startDate: "Data di inizio",

    bookSmarter: "Prenota meglio. Viaggia più lontano.",
    destinations: "Destinazioni",
    travelSupport: "Assistenza viaggi",
    smartPlatform: "Piattaforma intelligente",

    esim: "eSIM",
    esimText: "Connettività mobile globale",
    insurance: "Assicurazione",
    insuranceText: "Protezione di viaggio",
    exchange: "Cambio",
    exchangeText: "Cambio valuta",
    map: "Mappa",
    mapText: "Esplora destinazioni",

    searchResults: "RISULTATI DI RICERCA",
    availableArrangements: "Offerte PlanetWay disponibili",
    matchingDestination:
      "Risultati per la tua destinazione.",
    noResults: "Nessun risultato",
    tryAnother: "Prova un'altra destinazione.",
    viewBook: "Vedi e prenota",

    aiNavigator: "AI Navigator",
    aiTitle: "Dicci dove vuoi andare.",
    aiText:
      "PlanetWay ti aiuterà a trovare il servizio di viaggio giusto.",
    whatLooking: "Cosa stai cercando?",
    aiPlaceholder:
      "Esempio: voglio un hotel sulla spiaggia in Grecia...",
    findTrip: "Trova il mio viaggio",
    openNavigator: "Apri Navigator",
    aiReady: "AI Navigator è pronto.",

    welcome: "BENTORNATO",
    workspace: "Il tuo spazio PlanetWay",
    userWorkspace:
      "Cerca e gestisci i tuoi viaggi da un unico posto.",
    staffWorkspace:
      "Gestisci prodotti di viaggio, prenotazioni e operazioni della piattaforma da un unico posto.",

    overview: "Panoramica",
    arrangements: "Offerte",
    bookings: "Prenotazioni",
    users: "Utenti",
    analytics: "Analisi",
    settings: "Impostazioni",

    uploadArrangement: "Carica offerta",
    manageArrangements: "Gestisci offerte",
    viewBookings: "Visualizza prenotazioni",
    newArrangement: "Nuova offerta",
    addArrangement: "Aggiungi offerta",

    travelArrangements: "Offerte di viaggio",
    createManage:
      "Crea e gestisci tutto ciò che viene pubblicato su PlanetWay.",
    noCustom: "Nessuna offerta personalizzata",
    uploadFirst: "Carica la tua prima offerta di viaggio.",

    arrangement: "Offerta",
    price: "Prezzo",
    status: "Stato",
    actions: "Azioni",
    published: "Pubblicato",
    draft: "Bozza",
    publish: "Pubblica",
    unpublish: "Rimuovi pubblicazione",
    edit: "Modifica",
    delete: "Elimina",

    reservations: "PRENOTAZIONI",
    bookingManagement: "Gestione prenotazioni",
    allBookings:
      "Tutte le attività di prenotazione PlanetWay sono qui.",
    noBookings: "Nessuna prenotazione",
    customerBookings:
      "Le prenotazioni dei clienti appariranno qui.",

    administration: "AMMINISTRAZIONE",
    manageRoles: "Gestisci i ruoli degli utenti.",
    addUser: "Aggiungi utente",
    manage: "Gestisci",

    businessIntelligence: "BUSINESS INTELLIGENCE",
    planetwayAnalytics: "Analisi PlanetWay",
    performance: "Panoramica delle prestazioni.",
    totalArrangements: "OFFERTE TOTALI",
    totalBookings: "PRENOTAZIONI TOTALI",
    revenue: "RICAVI",
    platformActivity: "ATTIVITÀ PIATTAFORMA",
    growthOverview: "Panoramica crescita",

    platformSettings: "IMPOSTAZIONI PIATTAFORMA",
    configureWorkspace:
      "Configura il tuo spazio PlanetWay.",
    platformLanguage: "Lingua piattaforma",
    chooseDashboard:
      "Scegli la lingua della dashboard.",
    notifications: "Notifiche",
    alerts: "Ricevi avvisi su prenotazioni e piattaforma.",
    accountRole: "Ruolo account",
    currentAccess: "Livello di accesso attuale.",

    connectivity: "Connettività",
    travelProtection: "Protezione viaggio",
    currency: "Valuta",
    destinationsModule: "Destinazioni",

    createArrangement: "Crea nuova offerta",
    editArrangement: "Modifica offerta",
    arrangementTitle: "Titolo offerta",
    country: "Paese",
    city: "Città",
    type: "Tipo",
    description: "Descrizione",
    describe: "Descrivi questa offerta di viaggio...",
    uploadImage: "Carica immagine",
    clickUpload: "Clicca per selezionare un'immagine",
    preview: "Anteprima",
    publishPlanetWay: "Pubblica su PlanetWay",
    saveChanges: "Salva modifiche",
    create: "Crea offerta",
    close: "Chiudi",

    package: "Pacchetto",
    hotel: "Hotel",
    flight: "Volo",
    car: "Auto",
    experience: "Esperienza",
    transfer: "Trasferimento",

    contactTitle: "Contatta PlanetWay",
    contactText:
      "Il nostro team di assistenza è disponibile per aiutarti.",
    support: "Assistenza clienti 24/7",

    welcomePlanetWay: "Benvenuto su PlanetWay",
    email: "Email",
    password: "Password",
    name: "Nome",
    forgotPassword: "Password dimenticata?",
    signIn: "Accedi",
    createAccount: "Crea account",
    continueGoogle: "Continua con Google",
    noAccount: "Non hai un account?",
    haveAccount: "Hai già un account?",

    backPlanetWay: "Torna a PlanetWay",
    controlCenter: "CENTRO DI CONTROLLO PLANETWAY",
    globalPlatform: "PIATTAFORMA DI VIAGGIO GLOBALE",
    planetwayLanguages: "Lingue PlanetWay",

    enterTitle: "Inserisci il titolo dell'offerta.",
    enterDestination: "Inserisci la destinazione.",
    arrangementUpdated: "Offerta aggiornata con successo.",
    arrangementCreated: "Offerta creata con successo.",
    bookingCreated: "Prenotazione creata con successo.",
    completeFields: "Completa tutti i campi.",
    enterEmailPassword:
      "Inserisci email e password.",
    enterEmail: "Inserisci il tuo indirizzo email.",
    deleteConfirm: "Eliminare questa offerta?",
    bookingDelete: "Eliminare questa prenotazione?",
    languageSelected: "Lingua selezionata",
    loginGoogle:
      "Google Login sarà collegato a Firebase Authentication.",
    resetInstructions:
      "Le istruzioni per reimpostare la password saranno inviate a",
  },

  fr: {
    language: "Français",
    home: "Accueil",
    flights: "Vols",
    hotels: "Hôtels",
    cars: "Location de voiture",
    packages: "Forfaits",
    contact: "Contact",
    login: "Connexion",
    register: "Inscription",
    logout: "Déconnexion",
    discover: "Découvrez votre",
    world: "monde.",
    heroText:
      "Vols, hôtels, voitures et expériences de voyage inoubliables sur une plateforme mondiale intelligente.",
    destination: "Destination",
    departure: "Départ",
    return: "Retour",
    checkIn: "Arrivée",
    checkOut: "Départ",
    pickup: "Prise en charge",
    dropoff: "Restitution",
    pickupDate: "Date de prise en charge",
    dropoffDate: "Date de restitution",
    class: "Classe",
    adults: "Adultes",
    children: "Enfants",
    rooms: "Chambres",
    guests: "Voyageurs",
    travelers: "Voyageurs",
    economy: "Économique",
    premiumEconomy: "Économique Premium",
    business: "Affaires",
    firstClass: "Première classe",
    search: "Rechercher",
    whereGo: "Où souhaitez-vous aller?",
    cityDestination: "Ville ou destination",
    pickupLocation: "Lieu de prise en charge",
    dropoffLocation: "Lieu de restitution",
    packageDestination: "Où souhaitez-vous voyager?",
    startDate: "Date de début",
    bookSmarter: "Réservez mieux. Voyagez plus loin.",
    destinations: "Destinations",
    travelSupport: "Assistance voyage",
    smartPlatform: "Plateforme intelligente",
    esim: "eSIM",
    esimText: "Connectivité mobile mondiale",
    insurance: "Assurance",
    insuranceText: "Protection voyage",
    exchange: "Change",
    exchangeText: "Change de devises",
    map: "Carte",
    mapText: "Explorer les destinations",
    searchResults: "RÉSULTATS DE RECHERCHE",
    availableArrangements: "Offres PlanetWay disponibles",
    matchingDestination:
      "Résultats correspondant à votre destination.",
    noResults: "Aucun résultat",
    tryAnother: "Essayez une autre destination.",
    viewBook: "Voir et réserver",
    aiNavigator: "AI Navigator",
    aiTitle: "Dites-nous où vous voulez aller.",
    aiText:
      "PlanetWay vous aidera à trouver le bon service de voyage.",
    whatLooking: "Que recherchez-vous?",
    aiPlaceholder:
      "Exemple : Je veux un hôtel de plage en Grèce...",
    findTrip: "Trouver mon voyage",
    openNavigator: "Ouvrir Navigator",
    aiReady: "AI Navigator est prêt.",
    welcome: "BON RETOUR",
    workspace: "Votre espace PlanetWay",
    userWorkspace:
      "Recherchez et gérez vos voyages depuis un seul endroit.",
    staffWorkspace:
      "Gérez les produits, réservations et opérations de la plateforme depuis un seul endroit.",
    overview: "Aperçu",
    arrangements: "Offres",
    bookings: "Réservations",
    users: "Utilisateurs",
    analytics: "Analyses",
    settings: "Paramètres",
    uploadArrangement: "Télécharger une offre",
    manageArrangements: "Gérer les offres",
    viewBookings: "Voir les réservations",
    newArrangement: "Nouvelle offre",
    addArrangement: "Ajouter une offre",
    travelArrangements: "Offres de voyage",
    createManage:
      "Créez et gérez tout ce qui est publié sur PlanetWay.",
    noCustom: "Aucune offre personnalisée",
    uploadFirst: "Téléchargez votre première offre.",
    arrangement: "Offre",
    price: "Prix",
    status: "Statut",
    actions: "Actions",
    published: "Publié",
    draft: "Brouillon",
    publish: "Publier",
    unpublish: "Dépublier",
    edit: "Modifier",
    delete: "Supprimer",
    reservations: "RÉSERVATIONS",
    bookingManagement: "Gestion des réservations",
    allBookings:
      "Toutes les activités de réservation PlanetWay apparaissent ici.",
    noBookings: "Aucune réservation",
    customerBookings:
      "Les réservations clients apparaîtront ici.",
    administration: "ADMINISTRATION",
    manageRoles: "Gérez les rôles des utilisateurs.",
    addUser: "Ajouter un utilisateur",
    manage: "Gérer",
    businessIntelligence: "BUSINESS INTELLIGENCE",
    planetwayAnalytics: "Analyses PlanetWay",
    performance: "Vue d'ensemble des performances.",
    totalArrangements: "OFFRES TOTALES",
    totalBookings: "RÉSERVATIONS TOTALES",
    revenue: "CHIFFRE D'AFFAIRES",
    platformActivity: "ACTIVITÉ DE LA PLATEFORME",
    growthOverview: "Vue de croissance",
    platformSettings: "PARAMÈTRES DE LA PLATEFORME",
    configureWorkspace:
      "Configurez votre espace PlanetWay.",
    platformLanguage: "Langue de la plateforme",
    chooseDashboard:
      "Choisissez la langue du tableau de bord.",
    notifications: "Notifications",
    alerts:
      "Recevez les alertes de réservation et de plateforme.",
    accountRole: "Rôle du compte",
    currentAccess: "Niveau d'accès actuel.",
    connectivity: "Connectivité",
    travelProtection: "Protection voyage",
    currency: "Devise",
    destinationsModule: "Destinations",
    createArrangement: "Créer une nouvelle offre",
    editArrangement: "Modifier l'offre",
    arrangementTitle: "Titre de l'offre",
    country: "Pays",
    city: "Ville",
    type: "Type",
    description: "Description",
    describe: "Décrivez cette offre de voyage...",
    uploadImage: "Télécharger une image",
    clickUpload:
      "Cliquez pour sélectionner une image de voyage",
    preview: "Aperçu",
    publishPlanetWay: "Publier sur PlanetWay",
    saveChanges: "Enregistrer les modifications",
    create: "Créer l'offre",
    close: "Fermer",
    package: "Forfait",
    hotel: "Hôtel",
    flight: "Vol",
    car: "Voiture",
    experience: "Expérience",
    transfer: "Transfert",
    contactTitle: "Contacter PlanetWay",
    contactText:
      "Notre équipe d'assistance voyage est disponible pour vous aider.",
    support: "Assistance client 24/7",
    welcomePlanetWay: "Bienvenue sur PlanetWay",
    email: "Email",
    password: "Mot de passe",
    name: "Nom",
    forgotPassword: "Mot de passe oublié?",
    signIn: "Se connecter",
    createAccount: "Créer un compte",
    continueGoogle: "Continuer avec Google",
    noAccount: "Vous n'avez pas de compte?",
    haveAccount: "Vous avez déjà un compte?",
    backPlanetWay: "Retour à PlanetWay",
    controlCenter: "CENTRE DE CONTRÔLE PLANETWAY",
    globalPlatform: "PLATEFORME MONDIALE DE VOYAGE",
    planetwayLanguages: "Langues PlanetWay",
    enterTitle: "Entrez le titre de l'offre.",
    enterDestination: "Entrez la destination.",
    arrangementUpdated: "Offre mise à jour avec succès.",
    arrangementCreated: "Offre créée avec succès.",
    bookingCreated: "Réservation créée avec succès.",
    completeFields: "Veuillez remplir tous les champs.",
    enterEmailPassword:
      "Veuillez saisir votre email et votre mot de passe.",
    enterEmail: "Entrez votre adresse email.",
    deleteConfirm: "Supprimer cette offre?",
    bookingDelete: "Supprimer cette réservation?",
    languageSelected: "Langue sélectionnée",
    loginGoogle:
      "Google Login sera connecté à Firebase Authentication.",
    resetInstructions:
      "Les instructions de réinitialisation seront envoyées à",
  },

  es: {
    language: "Español",
    home: "Inicio",
    flights: "Vuelos",
    hotels: "Hoteles",
    cars: "Alquiler de coches",
    packages: "Paquetes",
    contact: "Contacto",
    login: "Iniciar sesión",
    register: "Registrarse",
    logout: "Cerrar sesión",
    discover: "Descubre tu",
    world: "mundo.",
    heroText:
      "Vuelos, hoteles, coches y experiencias de viaje inolvidables en una plataforma global inteligente.",
    destination: "Destino",
    departure: "Salida",
    return: "Regreso",
    checkIn: "Entrada",
    checkOut: "Salida",
    pickup: "Recogida",
    dropoff: "Devolución",
    pickupDate: "Fecha de recogida",
    dropoffDate: "Fecha de devolución",
    class: "Clase",
    adults: "Adultos",
    children: "Niños",
    rooms: "Habitaciones",
    guests: "Huéspedes",
    travelers: "Viajeros",
    economy: "Económica",
    premiumEconomy: "Premium Economy",
    business: "Business",
    firstClass: "Primera clase",
    search: "Buscar",
    whereGo: "¿A dónde quieres ir?",
    cityDestination: "Ciudad o destino",
    pickupLocation: "Lugar de recogida",
    dropoffLocation: "Lugar de devolución",
    packageDestination: "¿A dónde quieres viajar?",
    startDate: "Fecha de inicio",
    bookSmarter: "Reserva mejor. Viaja más lejos.",
    destinations: "Destinos",
    travelSupport: "Asistencia de viaje",
    smartPlatform: "Plataforma inteligente",
    esim: "eSIM",
    esimText: "Conectividad móvil global",
    insurance: "Seguro",
    insuranceText: "Protección de viaje",
    exchange: "Cambio",
    exchangeText: "Cambio de divisas",
    map: "Mapa",
    mapText: "Explorar destinos",
    searchResults: "RESULTADOS DE BÚSQUEDA",
    availableArrangements: "Ofertas PlanetWay disponibles",
    matchingDestination:
      "Resultados para tu destino.",
    noResults: "No se encontraron resultados",
    tryAnother: "Prueba otro destino.",
    viewBook: "Ver y reservar",
    aiNavigator: "AI Navigator",
    aiTitle: "Dinos a dónde quieres ir.",
    aiText:
      "PlanetWay te ayudará a encontrar el servicio de viaje adecuado.",
    whatLooking: "¿Qué estás buscando?",
    aiPlaceholder:
      "Ejemplo: Quiero un hotel de playa en Grecia...",
    findTrip: "Encontrar mi viaje",
    openNavigator: "Abrir Navigator",
    aiReady: "AI Navigator está listo.",
    welcome: "BIENVENIDO DE NUEVO",
    workspace: "Tu espacio PlanetWay",
    userWorkspace:
      "Busca y gestiona tus viajes desde un solo lugar.",
    staffWorkspace:
      "Gestiona productos, reservas y operaciones de la plataforma desde un solo lugar.",
    overview: "Resumen",
    arrangements: "Ofertas",
    bookings: "Reservas",
    users: "Usuarios",
    analytics: "Analítica",
    settings: "Configuración",
    uploadArrangement: "Subir oferta",
    manageArrangements: "Gestionar ofertas",
    viewBookings: "Ver reservas",
    newArrangement: "Nueva oferta",
    addArrangement: "Añadir oferta",
    travelArrangements: "Ofertas de viaje",
    createManage:
      "Crea y gestiona todo lo publicado en PlanetWay.",
    noCustom: "No hay ofertas personalizadas",
    uploadFirst: "Sube tu primera oferta de viaje.",
    arrangement: "Oferta",
    price: "Precio",
    status: "Estado",
    actions: "Acciones",
    published: "Publicado",
    draft: "Borrador",
    publish: "Publicar",
    unpublish: "Despublicar",
    edit: "Editar",
    delete: "Eliminar",
    reservations: "RESERVAS",
    bookingManagement: "Gestión de reservas",
    allBookings:
      "Toda la actividad de reservas de PlanetWay aparece aquí.",
    noBookings: "Aún no hay reservas",
    customerBookings:
      "Las reservas de clientes aparecerán aquí.",
    administration: "ADMINISTRACIÓN",
    manageRoles: "Gestiona los roles de los usuarios.",
    addUser: "Añadir usuario",
    manage: "Gestionar",
    businessIntelligence: "BUSINESS INTELLIGENCE",
    planetwayAnalytics: "Analítica PlanetWay",
    performance: "Resumen del rendimiento.",
    totalArrangements: "OFERTAS TOTALES",
    totalBookings: "RESERVAS TOTALES",
    revenue: "INGRESOS",
    platformActivity: "ACTIVIDAD DE LA PLATAFORMA",
    growthOverview: "Resumen del crecimiento",
    platformSettings: "CONFIGURACIÓN DE LA PLATAFORMA",
    configureWorkspace:
      "Configura tu espacio PlanetWay.",
    platformLanguage: "Idioma de la plataforma",
    chooseDashboard:
      "Elige el idioma del dashboard.",
    notifications: "Notificaciones",
    alerts:
      "Recibe alertas de reservas y de la plataforma.",
    accountRole: "Rol de cuenta",
    currentAccess: "Nivel de acceso actual.",
    connectivity: "Conectividad",
    travelProtection: "Protección de viaje",
    currency: "Moneda",
    destinationsModule: "Destinos",
    createArrangement: "Crear nueva oferta",
    editArrangement: "Editar oferta",
    arrangementTitle: "Título de la oferta",
    country: "País",
    city: "Ciudad",
    type: "Tipo",
    description: "Descripción",
    describe: "Describe esta oferta de viaje...",
    uploadImage: "Subir imagen",
    clickUpload:
      "Haz clic para seleccionar una imagen de viaje",
    preview: "Vista previa",
    publishPlanetWay: "Publicar en PlanetWay",
    saveChanges: "Guardar cambios",
    create: "Crear oferta",
    close: "Cerrar",
    package: "Paquete",
    hotel: "Hotel",
    flight: "Vuelo",
    car: "Coche",
    experience: "Experiencia",
    transfer: "Traslado",
    contactTitle: "Contacta con PlanetWay",
    contactText:
      "Nuestro equipo de asistencia de viajes está disponible para ayudarte.",
    support: "Atención al cliente 24/7",
    welcomePlanetWay: "Bienvenido a PlanetWay",
    email: "Email",
    password: "Contraseña",
    name: "Nombre",
    forgotPassword: "¿Olvidaste tu contraseña?",
    signIn: "Iniciar sesión",
    createAccount: "Crear cuenta",
    continueGoogle: "Continuar con Google",
    noAccount: "¿No tienes una cuenta?",
    haveAccount: "¿Ya tienes una cuenta?",
    backPlanetWay: "Volver a PlanetWay",
    controlCenter: "CENTRO DE CONTROL PLANETWAY",
    globalPlatform: "PLATAFORMA GLOBAL DE VIAJES",
    planetwayLanguages: "Idiomas PlanetWay",
    enterTitle: "Introduce el título de la oferta.",
    enterDestination: "Introduce el destino.",
    arrangementUpdated: "Oferta actualizada correctamente.",
    arrangementCreated: "Oferta creada correctamente.",
    bookingCreated: "Reserva creada correctamente.",
    completeFields: "Completa todos los campos.",
    enterEmailPassword:
      "Introduce email y contraseña.",
    enterEmail: "Introduce tu dirección de email.",
    deleteConfirm: "¿Eliminar esta oferta?",
    bookingDelete: "¿Eliminar esta reserva?",
    languageSelected: "Idioma seleccionado",
    loginGoogle:
      "Google Login se conectará con Firebase Authentication.",
    resetInstructions:
      "Las instrucciones de restablecimiento se enviarán a",
  },

  pt: {
    language: "Português",
    home: "Início",
    flights: "Voos",
    hotels: "Hotéis",
    cars: "Aluguel de carros",
    packages: "Pacotes",
    contact: "Contato",
    login: "Entrar",
    register: "Registrar",
    logout: "Sair",
    discover: "Descubra o seu",
    world: "mundo.",
    heroText:
      "Voos, hotéis, carros e experiências de viagem inesquecíveis em uma plataforma global inteligente.",
    destination: "Destino",
    departure: "Partida",
    return: "Retorno",
    checkIn: "Check-in",
    checkOut: "Check-out",
    pickup: "Retirada",
    dropoff: "Devolução",
    pickupDate: "Data de retirada",
    dropoffDate: "Data de devolução",
    class: "Classe",
    adults: "Adultos",
    children: "Crianças",
    rooms: "Quartos",
    guests: "Hóspedes",
    travelers: "Viajantes",
    economy: "Econômica",
    premiumEconomy: "Econômica Premium",
    business: "Executiva",
    firstClass: "Primeira classe",
    search: "Pesquisar",
    whereGo: "Para onde você quer ir?",
    cityDestination: "Cidade ou destino",
    pickupLocation: "Local de retirada",
    dropoffLocation: "Local de devolução",
    packageDestination: "Para onde você quer viajar?",
    startDate: "Data de início",
    bookSmarter: "Reserve melhor. Viaje mais longe.",
    destinations: "Destinos",
    travelSupport: "Suporte de viagem",
    smartPlatform: "Plataforma inteligente",
    esim: "eSIM",
    esimText: "Conectividade móvel global",
    insurance: "Seguro",
    insuranceText: "Proteção de viagem",
    exchange: "Câmbio",
    exchangeText: "Câmbio de moedas",
    map: "Mapa",
    mapText: "Explore destinos",
    searchResults: "RESULTADOS DA PESQUISA",
    availableArrangements: "Ofertas PlanetWay disponíveis",
    matchingDestination:
      "Resultados correspondentes ao seu destino.",
    noResults: "Nenhum resultado encontrado",
    tryAnother: "Tente outro destino.",
    viewBook: "Ver e reservar",
    aiNavigator: "AI Navigator",
    aiTitle: "Diga-nos para onde você quer ir.",
    aiText:
      "O PlanetWay ajudará você a encontrar o serviço de viagem certo.",
    whatLooking: "O que você está procurando?",
    aiPlaceholder:
      "Exemplo: Quero um hotel na praia na Grécia...",
    findTrip: "Encontrar minha viagem",
    openNavigator: "Abrir Navigator",
    aiReady: "AI Navigator está pronto.",
    welcome: "BEM-VINDO DE VOLTA",
    workspace: "Seu espaço PlanetWay",
    userWorkspace:
      "Pesquise e gerencie suas viagens em um só lugar.",
    staffWorkspace:
      "Gerencie produtos de viagem, reservas e operações da plataforma em um só lugar.",
    overview: "Visão geral",
    arrangements: "Ofertas",
    bookings: "Reservas",
    users: "Usuários",
    analytics: "Análises",
    settings: "Configurações",
    uploadArrangement: "Enviar oferta",
    manageArrangements: "Gerenciar ofertas",
    viewBookings: "Ver reservas",
    newArrangement: "Nova oferta",
    addArrangement: "Adicionar oferta",
    travelArrangements: "Ofertas de viagem",
    createManage:
      "Crie e gerencie tudo publicado no PlanetWay.",
    noCustom: "Nenhuma oferta personalizada",
    uploadFirst: "Envie sua primeira oferta de viagem.",
    arrangement: "Oferta",
    price: "Preço",
    status: "Status",
    actions: "Ações",
    published: "Publicado",
    draft: "Rascunho",
    publish: "Publicar",
    unpublish: "Despublicar",
    edit: "Editar",
    delete: "Excluir",
    reservations: "RESERVAS",
    bookingManagement: "Gestão de reservas",
    allBookings:
      "Todas as atividades de reserva PlanetWay aparecem aqui.",
    noBookings: "Ainda não há reservas",
    customerBookings:
      "As reservas dos clientes aparecerão aqui.",
    administration: "ADMINISTRAÇÃO",
    manageRoles: "Gerencie os papéis dos usuários.",
    addUser: "Adicionar usuário",
    manage: "Gerenciar",
    businessIntelligence: "BUSINESS INTELLIGENCE",
    planetwayAnalytics: "Análises PlanetWay",
    performance: "Visão geral do desempenho.",
    totalArrangements: "TOTAL DE OFERTAS",
    totalBookings: "TOTAL DE RESERVAS",
    revenue: "RECEITA",
    platformActivity: "ATIVIDADE DA PLATAFORMA",
    growthOverview: "Visão de crescimento",
    platformSettings: "CONFIGURAÇÕES DA PLATAFORMA",
    configureWorkspace:
      "Configure seu espaço PlanetWay.",
    platformLanguage: "Idioma da plataforma",
    chooseDashboard:
      "Escolha o idioma do dashboard.",
    notifications: "Notificações",
    alerts:
      "Receba alertas de reservas e da plataforma.",
    accountRole: "Função da conta",
    currentAccess: "Nível de acesso atual.",
    connectivity: "Conectividade",
    travelProtection: "Proteção de viagem",
    currency: "Moeda",
    destinationsModule: "Destinos",
    createArrangement: "Criar nova oferta",
    editArrangement: "Editar oferta",
    arrangementTitle: "Título da oferta",
    country: "País",
    city: "Cidade",
    type: "Tipo",
    description: "Descrição",
    describe: "Descreva esta oferta de viagem...",
    uploadImage: "Enviar imagem",
    clickUpload:
      "Clique para selecionar uma imagem de viagem",
    preview: "Visualização",
    publishPlanetWay: "Publicar no PlanetWay",
    saveChanges: "Salvar alterações",
    create: "Criar oferta",
    close: "Fechar",
    package: "Pacote",
    hotel: "Hotel",
    flight: "Voo",
    car: "Carro",
    experience: "Experiência",
    transfer: "Transferência",
    contactTitle: "Contate o PlanetWay",
    contactText:
      "Nossa equipe de suporte de viagens está disponível para ajudar.",
    support: "Suporte ao cliente 24/7",
    welcomePlanetWay: "Bem-vindo ao PlanetWay",
    email: "Email",
    password: "Senha",
    name: "Nome",
    forgotPassword: "Esqueceu sua senha?",
    signIn: "Entrar",
    createAccount: "Criar conta",
    continueGoogle: "Continuar com Google",
    noAccount: "Não tem uma conta?",
    haveAccount: "Já tem uma conta?",
    backPlanetWay: "Voltar ao PlanetWay",
    controlCenter: "CENTRO DE CONTROLE PLANETWAY",
    globalPlatform: "PLATAFORMA GLOBAL DE VIAGENS",
    planetwayLanguages: "Idiomas PlanetWay",
    enterTitle: "Digite o título da oferta.",
    enterDestination: "Digite o destino.",
    arrangementUpdated: "Oferta atualizada com sucesso.",
    arrangementCreated: "Oferta criada com sucesso.",
    bookingCreated: "Reserva criada com sucesso.",
    completeFields: "Preencha todos os campos.",
    enterEmailPassword:
      "Digite email e senha.",
    enterEmail: "Digite seu endereço de email.",
    deleteConfirm: "Excluir esta oferta?",
    bookingDelete: "Excluir esta reserva?",
    languageSelected: "Idioma selecionado",
    loginGoogle:
      "Google Login será conectado ao Firebase Authentication.",
    resetInstructions:
      "As instruções de redefinição serão enviadas para",
  },

  ru: {
    language: "Русский",
    home: "Главная",
    flights: "Авиабилеты",
    hotels: "Отели",
    cars: "Аренда авто",
    packages: "Пакеты",
    contact: "Контакты",
    login: "Войти",
    register: "Регистрация",
    logout: "Выйти",
    discover: "Откройте свой",
    world: "мир.",
    heroText:
      "Авиабилеты, отели, автомобили и незабываемые путешествия на одной интеллектуальной глобальной платформе.",
    destination: "Направление",
    departure: "Отправление",
    return: "Возвращение",
    checkIn: "Заезд",
    checkOut: "Выезд",
    pickup: "Получение",
    dropoff: "Возврат",
    pickupDate: "Дата получения",
    dropoffDate: "Дата возврата",
    class: "Класс",
    adults: "Взрослые",
    children: "Дети",
    rooms: "Номера",
    guests: "Гости",
    travelers: "Путешественники",
    economy: "Эконом",
    premiumEconomy: "Премиум эконом",
    business: "Бизнес",
    firstClass: "Первый класс",
    search: "Поиск",
    whereGo: "Куда вы хотите поехать?",
    cityDestination: "Город или направление",
    pickupLocation: "Место получения",
    dropoffLocation: "Место возврата",
    packageDestination: "Куда вы хотите отправиться?",
    startDate: "Дата начала",
    bookSmarter: "Бронируйте умнее. Путешествуйте дальше.",
    destinations: "Направления",
    travelSupport: "Поддержка путешественников",
    smartPlatform: "Умная платформа",
    esim: "eSIM",
    esimText: "Глобальная мобильная связь",
    insurance: "Страхование",
    insuranceText: "Защита путешествий",
    exchange: "Обмен",
    exchangeText: "Обмен валют",
    map: "Карта",
    mapText: "Исследуйте направления",
    searchResults: "РЕЗУЛЬТАТЫ ПОИСКА",
    availableArrangements: "Доступные предложения PlanetWay",
    matchingDestination:
      "Результаты для выбранного направления.",
    noResults: "Результатов нет",
    tryAnother: "Попробуйте другое направление.",
    viewBook: "Посмотреть и забронировать",
    aiNavigator: "AI Navigator",
    aiTitle: "Расскажите, куда вы хотите поехать.",
    aiText:
      "PlanetWay поможет найти подходящую туристическую услугу.",
    whatLooking: "Что вы ищете?",
    aiPlaceholder:
      "Пример: Я хочу отель на пляже в Греции...",
    findTrip: "Найти мою поездку",
    openNavigator: "Открыть Navigator",
    aiReady: "AI Navigator готов.",
    welcome: "С ВОЗВРАЩЕНИЕМ",
    workspace: "Ваше рабочее пространство PlanetWay",
    userWorkspace:
      "Ищите и управляйте путешествиями из одного места.",
    staffWorkspace:
      "Управляйте туристическими продуктами, бронированиями и операциями платформы из одного места.",
    overview: "Обзор",
    arrangements: "Предложения",
    bookings: "Бронирования",
    users: "Пользователи",
    analytics: "Аналитика",
    settings: "Настройки",
    uploadArrangement: "Загрузить предложение",
    manageArrangements: "Управление предложениями",
    viewBookings: "Просмотр бронирований",
    newArrangement: "Новое предложение",
    addArrangement: "Добавить предложение",
    travelArrangements: "Туристические предложения",
    createManage:
      "Создавайте и управляйте всем, что опубликовано на PlanetWay.",
    noCustom: "Пользовательских предложений пока нет",
    uploadFirst: "Загрузите первое туристическое предложение.",
    arrangement: "Предложение",
    price: "Цена",
    status: "Статус",
    actions: "Действия",
    published: "Опубликовано",
    draft: "Черновик",
    publish: "Опубликовать",
    unpublish: "Снять публикацию",
    edit: "Изменить",
    delete: "Удалить",
    reservations: "БРОНИРОВАНИЯ",
    bookingManagement: "Управление бронированиями",
    allBookings:
      "Вся активность бронирований PlanetWay отображается здесь.",
    noBookings: "Бронирований пока нет",
    customerBookings:
      "Бронирования клиентов появятся здесь.",
    administration: "АДМИНИСТРАЦИЯ",
    manageRoles: "Управление ролями пользователей.",
    addUser: "Добавить пользователя",
    manage: "Управлять",
    businessIntelligence: "БИЗНЕС-АНАЛИТИКА",
    planetwayAnalytics: "Аналитика PlanetWay",
    performance: "Обзор эффективности платформы.",
    totalArrangements: "ВСЕГО ПРЕДЛОЖЕНИЙ",
    totalBookings: "ВСЕГО БРОНИРОВАНИЙ",
    revenue: "ДОХОД",
    platformActivity: "АКТИВНОСТЬ ПЛАТФОРМЫ",
    growthOverview: "Обзор роста",
    platformSettings: "НАСТРОЙКИ ПЛАТФОРМЫ",
    configureWorkspace:
      "Настройте рабочее пространство PlanetWay.",
    platformLanguage: "Язык платформы",
    chooseDashboard:
      "Выберите язык панели управления.",
    notifications: "Уведомления",
    alerts:
      "Получайте уведомления о бронированиях и платформе.",
    accountRole: "Роль аккаунта",
    currentAccess: "Текущий уровень доступа.",
    connectivity: "Подключение",
    travelProtection: "Защита путешествий",
    currency: "Валюта",
    destinationsModule: "Направления",
    createArrangement: "Создать новое предложение",
    editArrangement: "Изменить предложение",
    arrangementTitle: "Название предложения",
    country: "Страна",
    city: "Город",
    type: "Тип",
    description: "Описание",
    describe: "Опишите туристическое предложение...",
    uploadImage: "Загрузить изображение",
    clickUpload:
      "Нажмите, чтобы выбрать изображение",
    preview: "Предпросмотр",
    publishPlanetWay: "Опубликовать на PlanetWay",
    saveChanges: "Сохранить изменения",
    create: "Создать предложение",
    close: "Закрыть",
    package: "Пакет",
    hotel: "Отель",
    flight: "Рейс",
    car: "Автомобиль",
    experience: "Впечатление",
    transfer: "Трансфер",
    contactTitle: "Связаться с PlanetWay",
    contactText:
      "Наша команда поддержки путешественников готова помочь.",
    support: "Поддержка 24/7",
    welcomePlanetWay: "Добро пожаловать в PlanetWay",
    email: "Email",
    password: "Пароль",
    name: "Имя",
    forgotPassword: "Забыли пароль?",
    signIn: "Войти",
    createAccount: "Создать аккаунт",
    continueGoogle: "Продолжить с Google",
    noAccount: "Нет аккаунта?",
    haveAccount: "Уже есть аккаунт?",
    backPlanetWay: "Вернуться в PlanetWay",
    controlCenter: "ЦЕНТР УПРАВЛЕНИЯ PLANETWAY",
    globalPlatform: "ГЛОБАЛЬНАЯ ТУРИСТИЧЕСКАЯ ПЛАТФОРМА",
    planetwayLanguages: "Языки PlanetWay",
    enterTitle: "Введите название предложения.",
    enterDestination: "Введите направление.",
    arrangementUpdated: "Предложение успешно обновлено.",
    arrangementCreated: "Предложение успешно создано.",
    bookingCreated: "Бронирование успешно создано.",
    completeFields: "Заполните все поля.",
    enterEmailPassword:
      "Введите email и пароль.",
    enterEmail: "Введите адрес электронной почты.",
    deleteConfirm: "Удалить это предложение?",
    bookingDelete: "Удалить это бронирование?",
    languageSelected: "Выбран язык",
    loginGoogle:
      "Google Login будет подключен к Firebase Authentication.",
    resetInstructions:
      "Инструкции по сбросу пароля будут отправлены на",
  },

  zh: {
    language: "中文",
    home: "é¦–é¡µ",
    flights: "èˆªç­",
    hotels: "酒店",
    cars: "ç§Ÿè½¦",
    packages: "套餐",
    contact: "联系我们",
    login: "登录",
    register: "注册",
    logout: "退出",
    discover: "探索你的",
    world: "世界。",
    heroText:
      "在一个智能全球平台上预订航班、酒店、汽车和难忘的旅行体验。",
    destination: "目的地",
    departure: "出发",
    return: "è¿”ç¨‹",
    checkIn: "入住",
    checkOut: "退房",
    pickup: "取车",
    dropoff: "è¿˜è½¦",
    pickupDate: "取车日期",
    dropoffDate: "还车日期",
    class: "舱位",
    adults: "成人",
    children: "儿童",
    rooms: "房间",
    guests: "客人",
    travelers: "旅客",
    economy: "经济舱",
    premiumEconomy: "超级经济舱",
    business: "商务舱",
    firstClass: "头等舱",
    search: "搜索",
    whereGo: "你想去哪里？",
    cityDestination: "城市或目的地",
    pickupLocation: "取车地点",
    dropoffLocation: "还车地点",
    packageDestination: "你想去哪里旅行？",
    startDate: "开始日期",
    bookSmarter: "更聪明地预订，更远地旅行。",
    destinations: "目的地",
    travelSupport: "旅行支持",
    smartPlatform: "智能平台",
    esim: "eSIM",
    esimText: "全球移动连接",
    insurance: "保险",
    insuranceText: "旅行保障",
    exchange: "兑换",
    exchangeText: "货币兑换",
    map: "地图",
    mapText: "探索目的地",
    searchResults: "搜索结果",
    availableArrangements: "可用的 PlanetWay 旅行产品",
    matchingDestination: "符合您目的地的结果。",
    noResults: "没有找到结果",
    tryAnother: "尝试其他目的地。",
    viewBook: "查看并预订",
    aiNavigator: "AI Navigator",
    aiTitle: "告诉我们你想去哪里。",
    aiText: "PlanetWay 将帮助您找到合适的旅行服务。",
    whatLooking: "您在寻找什么？",
    aiPlaceholder: "例如：我想要希腊的海滩酒店……",
    findTrip: "寻找我的旅行",
    openNavigator: "打开 Navigator",
    aiReady: "AI Navigator 已准备就绪。",
    welcome: "欢迎回来",
    workspace: "您的 PlanetWay 工作空间",
    userWorkspace: "在一个地方搜索和管理您的旅行。",
    staffWorkspace: "在一个地方管理旅行产品、预订和平台运营。",
    overview: "概览",
    arrangements: "旅行产品",
    bookings: "é¢„è®¢",
    users: "用户",
    analytics: "分析",
    settings: "è®¾ç½®",
    uploadArrangement: "上传旅行产品",
    manageArrangements: "管理旅行产品",
    viewBookings: "查看预订",
    newArrangement: "新旅行产品",
    addArrangement: "添加旅行产品",
    travelArrangements: "旅行产品",
    createManage: "创建和管理 PlanetWay 上发布的所有内容。",
    noCustom: "暂无自定义旅行产品",
    uploadFirst: "上传您的第一个旅行产品。",
    arrangement: "旅行产品",
    price: "价格",
    status: "状态",
    actions: "操作",
    published: "已发布",
    draft: "è‰ç¨¿",
    publish: "发布",
    unpublish: "取消发布",
    edit: "ç¼–è¾‘",
    delete: "删除",
    reservations: "é¢„è®¢",
    bookingManagement: "é¢„è®¢ç®¡ç†",
    allBookings: "所有 PlanetWay 预订活动都显示在这里。",
    noBookings: "暂无预订",
    customerBookings: "客户预订将在这里显示。",
    administration: "ç®¡ç†",
    manageRoles: "管理平台用户角色。",
    addUser: "添加用户",
    manage: "ç®¡ç†",
    businessIntelligence: "商业智能",
    planetwayAnalytics: "PlanetWay 分析",
    performance: "平台性能概览。",
    totalArrangements: "旅行产品总数",
    totalBookings: "预订总数",
    revenue: "收入",
    platformActivity: "平台活动",
    growthOverview: "增长概览",
    platformSettings: "平台设置",
    configureWorkspace: "配置您的 PlanetWay 工作空间。",
    platformLanguage: "平台语言",
    chooseDashboard: "选择您的控制面板语言。",
    notifications: "é€šçŸ¥",
    alerts: "接收预订和平台提醒。",
    accountRole: "账户角色",
    currentAccess: "当前访问级别。",
    connectivity: "连接",
    travelProtection: "旅行保障",
    currency: "货币",
    destinationsModule: "目的地",
    createArrangement: "创建新旅行产品",
    editArrangement: "编辑旅行产品",
    arrangementTitle: "旅行产品名称",
    country: "国家",
    city: "城市",
    type: "类型",
    description: "描述",
    describe: "描述此旅行产品……",
    uploadImage: "上传图片",
    clickUpload: "点击选择旅行图片",
    preview: "é¢„è§ˆ",
    publishPlanetWay: "发布到 PlanetWay",
    saveChanges: "保存更改",
    create: "创建旅行产品",
    close: "关闭",
    package: "套餐",
    hotel: "酒店",
    flight: "èˆªç­",
    car: "汽车",
    experience: "体验",
    transfer: "接送",
    contactTitle: "è”ç³» PlanetWay",
    contactText: "我们的旅行支持团队随时为您提供帮助。",
    support: "全天候客户支持",
    welcomePlanetWay: "欢迎来到 PlanetWay",
    email: "电子邮件",
    password: "密码",
    name: "姓名",
    forgotPassword: "忘记密码？",
    signIn: "登录",
    createAccount: "创建账户",
    continueGoogle: "使用 Google 继续",
    noAccount: "没有账户？",
    haveAccount: "已经有账户？",
    backPlanetWay: "返回 PlanetWay",
    controlCenter: "PLANETWAY 控制中心",
    globalPlatform: "全球旅行平台",
    planetwayLanguages: "PlanetWay è¯­è¨€",
    enterTitle: "请输入旅行产品名称。",
    enterDestination: "请输入目的地。",
    arrangementUpdated: "旅行产品更新成功。",
    arrangementCreated: "旅行产品创建成功。",
    bookingCreated: "预订创建成功。",
    completeFields: "请填写所有字段。",
    enterEmailPassword: "请输入电子邮件和密码。",
    enterEmail: "请输入您的电子邮件地址。",
    deleteConfirm: "删除此旅行产品？",
    bookingDelete: "删除此预订？",
    languageSelected: "已选择语言",
    loginGoogle: "Google 登录将连接到 Firebase Authentication。",
    resetInstructions: "密码重置说明将发送至",
  },

  ja: {
    language: "日本語",
    home: "ホーム",
    flights: "フライト",
    hotels: "ホテル",
    cars: "レンタカー",
    packages: "パッケージ",
    contact: "お問い合わせ",
    login: "ログイン",
    register: "ç™»éŒ²",
    logout: "ログアウト",
    discover: "あなたの",
    world: "世界を発見。",
    heroText:
      "フライト、ホテル、レンタカー、忘れられない旅行体験を一つのスマートなグローバルプラットフォームで。",
    destination: "目的地",
    departure: "出発",
    return: "帰り",
    checkIn: "チェックイン",
    checkOut: "チェックアウト",
    pickup: "受け取り",
    dropoff: "返却",
    pickupDate: "受取日",
    dropoffDate: "返却日",
    class: "クラス",
    adults: "大人",
    children: "子供",
    rooms: "部屋",
    guests: "ゲスト",
    travelers: "旅行者",
    economy: "エコノミー",
    premiumEconomy: "プレミアムエコノミー",
    business: "ビジネス",
    firstClass: "ファーストクラス",
    search: "検索",
    whereGo: "どこへ行きたいですか？",
    cityDestination: "都市または目的地",
    pickupLocation: "受取場所",
    dropoffLocation: "返却場所",
    packageDestination: "どこへ旅行したいですか？",
    startDate: "開始日",
    bookSmarter: "スマートに予約して、もっと遠くへ。",
    destinations: "目的地",
    travelSupport: "旅行サポート",
    smartPlatform: "スマートプラットフォーム",
    esim: "eSIM",
    esimText: "グローバルモバイル接続",
    insurance: "保険",
    insuranceText: "旅行保護",
    exchange: "両替",
    exchangeText: "通貨交換",
    map: "マップ",
    mapText: "目的地を探索",
    searchResults: "検索結果",
    availableArrangements: "利用可能なPlanetWay旅行商品",
    matchingDestination: "目的地に一致する結果。",
    noResults: "結果がありません",
    tryAnother: "別の目的地をお試しください。",
    viewBook: "表示して予約",
    aiNavigator: "AI Navigator",
    aiTitle: "どこへ行きたいか教えてください。",
    aiText:
      "PlanetWayが最適な旅行サービスを見つけるお手伝いをします。",
    whatLooking: "何をお探しですか？",
    aiPlaceholder:
      "例：ギリシャのビーチホテルが欲しいです…",
    findTrip: "旅行を探す",
    openNavigator: "Navigatorを開く",
    aiReady: "AI Navigatorの準備ができました。",
    welcome: "おかえりなさい",
    workspace: "PlanetWayワークスペース",
    userWorkspace:
      "旅行を一か所から検索・管理できます。",
    staffWorkspace:
      "旅行商品、予約、プラットフォーム運営を一か所から管理できます。",
    overview: "概要",
    arrangements: "旅行商品",
    bookings: "予約",
    users: "ユーザー",
    analytics: "分析",
    settings: "設定",
    uploadArrangement: "旅行商品をアップロード",
    manageArrangements: "旅行商品を管理",
    viewBookings: "予約を見る",
    newArrangement: "新しい旅行商品",
    addArrangement: "旅行商品を追加",
    travelArrangements: "旅行商品",
    createManage:
      "PlanetWayで公開されるすべての旅行商品を作成・管理します。",
    noCustom: "カスタム旅行商品はまだありません",
    uploadFirst: "最初の旅行商品をアップロードしてください。",
    arrangement: "旅行商品",
    price: "価格",
    status: "ステータス",
    actions: "操作",
    published: "公開済み",
    draft: "下書き",
    publish: "公開",
    unpublish: "公開を停止",
    edit: "ç·¨é›†",
    delete: "削除",
    reservations: "予約",
    bookingManagement: "予約管理",
    allBookings:
      "PlanetWayのすべての予約活動がここに表示されます。",
    noBookings: "予約はまだありません",
    customerBookings: "顧客の予約がここに表示されます。",
    administration: "ç®¡ç†",
    manageRoles: "ユーザーの役割を管理します。",
    addUser: "ユーザーを追加",
    manage: "ç®¡ç†",
    businessIntelligence: "ビジネスインテリジェンス",
    planetwayAnalytics: "PlanetWay分析",
    performance: "プラットフォーム性能の概要。",
    totalArrangements: "旅行商品合計",
    totalBookings: "予約合計",
    revenue: "収益",
    platformActivity: "プラットフォーム活動",
    growthOverview: "成長概要",
    platformSettings: "プラットフォーム設定",
    configureWorkspace: "PlanetWayワークスペースを設定します。",
    platformLanguage: "プラットフォーム言語",
    chooseDashboard: "ダッシュボードの言語を選択します。",
    notifications: "é€šçŸ¥",
    alerts: "予約とプラットフォームの通知を受け取ります。",
    accountRole: "アカウント役割",
    currentAccess: "現在のアクセスレベル。",
    connectivity: "接続",
    travelProtection: "旅行保護",
    currency: "é€šè²¨",
    destinationsModule: "目的地",
    createArrangement: "新しい旅行商品を作成",
    editArrangement: "旅行商品を編集",
    arrangementTitle: "旅行商品タイトル",
    country: "国",
    city: "都市",
    type: "タイプ",
    description: "説明",
    describe: "この旅行商品を説明してください…",
    uploadImage: "画像をアップロード",
    clickUpload: "旅行画像を選択するにはクリック",
    preview: "プレビュー",
    publishPlanetWay: "PlanetWayで公開",
    saveChanges: "変更を保存",
    create: "旅行商品を作成",
    close: "閉じる",
    package: "パッケージ",
    hotel: "ホテル",
    flight: "フライト",
    car: "è»Š",
    experience: "体験",
    transfer: "é€è¿Ž",
    contactTitle: "PlanetWayにお問い合わせ",
    contactText:
      "旅行サポートチームがお手伝いいたします。",
    support: "24時間365日サポート",
    welcomePlanetWay: "PlanetWayへようこそ",
    email: "メール",
    password: "パスワード",
    name: "名前",
    forgotPassword: "パスワードを忘れましたか？",
    signIn: "ログイン",
    createAccount: "アカウントを作成",
    continueGoogle: "Googleで続ける",
    noAccount: "アカウントをお持ちでないですか？",
    haveAccount: "すでにアカウントをお持ちですか？",
    backPlanetWay: "PlanetWayへ戻る",
    controlCenter: "PLANETWAYコントロールセンター",
    globalPlatform: "グローバル旅行プラットフォーム",
    planetwayLanguages: "PlanetWayè¨€èªž",
    enterTitle: "旅行商品のタイトルを入力してください。",
    enterDestination: "目的地を入力してください。",
    arrangementUpdated: "旅行商品を更新しました。",
    arrangementCreated: "旅行商品を作成しました。",
    bookingCreated: "予約を作成しました。",
    completeFields: "すべての項目を入力してください。",
    enterEmailPassword: "メールとパスワードを入力してください。",
    enterEmail: "メールアドレスを入力してください。",
    deleteConfirm: "この旅行商品を削除しますか？",
    bookingDelete: "この予約を削除しますか？",
    languageSelected: "選択された言語",
    loginGoogle:
      "GoogleログインはFirebase Authenticationに接続されます。",
    resetInstructions: "パスワードリセット手順を送信します：",
  },

  ar: {
    language: "العربية",
    home: "الرئيسية",
    flights: "الرحلات",
    hotels: "الفنادق",
    cars: "تأجير السيارات",
    packages: "الباقات",
    contact: "اتصل بنا",
    login: "تسجيل الدخول",
    register: "التسجيل",
    logout: "تسجيل الخروج",
    discover: "اكتشف",
    world: "عالمك.",
    heroText:
      "رحلات جوية وفنادق وسيارات وتجارب سفر لا تُنسى في منصة عالمية ذكية واحدة.",
    destination: "الوجهة",
    departure: "المغادرة",
    return: "العودة",
    checkIn: "تسجيل الوصول",
    checkOut: "تسجيل المغادرة",
    pickup: "الاستلام",
    dropoff: "التسليم",
    pickupDate: "تاريخ الاستلام",
    dropoffDate: "تاريخ التسليم",
    class: "الدرجة",
    adults: "البالغون",
    children: "الأطفال",
    rooms: "الغرف",
    guests: "الضيوف",
    travelers: "المسافرون",
    economy: "اقتصادية",
    premiumEconomy: "اقتصادية مميزة",
    business: "رجال الأعمال",
    firstClass: "الدرجة الأولى",
    search: "بحث",
    whereGo: "إلى أين تريد الذهاب؟",
    cityDestination: "المدينة أو الوجهة",
    pickupLocation: "موقع الاستلام",
    dropoffLocation: "موقع التسليم",
    packageDestination: "إلى أين تريد السفر؟",
    startDate: "تاريخ البدء",
    bookSmarter: "احجز بذكاء. سافر أبعد.",
    destinations: "الوجهات",
    travelSupport: "دعم السفر",
    smartPlatform: "منصة ذكية",
    esim: "eSIM",
    esimText: "اتصال محمول عالمي",
    insurance: "التأمين",
    insuranceText: "حماية السفر",
    exchange: "الصرافة",
    exchangeText: "تبادل العملات",
    map: "الخريطة",
    mapText: "استكشف الوجهات",
    searchResults: "نتائج البحث",
    availableArrangements: "عروض PlanetWay المتاحة",
    matchingDestination: "النتائج المطابقة لوجهتك.",
    noResults: "لم يتم العثور على نتائج",
    tryAnother: "جرب وجهة أخرى.",
    viewBook: "عرض وحجز",
    aiNavigator: "AI Navigator",
    aiTitle: "أخبرنا إلى أين تريد السفر.",
    aiText:
      "سيساعدك PlanetWay في العثور على خدمة السفر المناسبة.",
    whatLooking: "ما الذي تبحث عنه؟",
    aiPlaceholder:
      "مثال: أريد فندقًا على الشاطئ في اليونان...",
    findTrip: "اعثر على رحلتي",
    openNavigator: "فتح Navigator",
    aiReady: "AI Navigator جاهز.",
    welcome: "مرحبًا بعودتك",
    workspace: "مساحة عمل PlanetWay الخاصة بك",
    userWorkspace:
      "ابحث عن رحلاتك وأدرها من مكان واحد.",
    staffWorkspace:
      "أدر المنتجات السياحية والحجوزات وعمليات المنصة من مكان واحد.",
    overview: "نظرة عامة",
    arrangements: "العروض",
    bookings: "الحجوزات",
    users: "المستخدمون",
    analytics: "التحليلات",
    settings: "الإعدادات",
    uploadArrangement: "رفع عرض",
    manageArrangements: "إدارة العروض",
    viewBookings: "عرض الحجوزات",
    newArrangement: "عرض جديد",
    addArrangement: "إضافة عرض",
    travelArrangements: "عروض السفر",
    createManage:
      "أنشئ وأدر كل ما يتم نشره على PlanetWay.",
    noCustom: "لا توجد عروض مخصصة بعد",
    uploadFirst: "ارفع أول عرض سفر لك.",
    arrangement: "العرض",
    price: "السعر",
    status: "الحالة",
    actions: "الإجراءات",
    published: "منشور",
    draft: "مسودة",
    publish: "نشر",
    unpublish: "إلغاء النشر",
    edit: "تعديل",
    delete: "حذف",
    reservations: "الحجوزات",
    bookingManagement: "إدارة الحجوزات",
    allBookings:
      "تظهر جميع أنشطة حجوزات PlanetWay هنا.",
    noBookings: "لا توجد حجوزات بعد",
    customerBookings:
      "ستظهر حجوزات العملاء هنا.",
    administration: "الإدارة",
    manageRoles: "إدارة أدوار مستخدمي المنصة.",
    addUser: "إضافة مستخدم",
    manage: "إدارة",
    businessIntelligence: "ذكاء الأعمال",
    planetwayAnalytics: "تحليلات PlanetWay",
    performance: "نظرة عامة على أداء المنصة.",
    totalArrangements: "إجمالي العروض",
    totalBookings: "إجمالي الحجوزات",
    revenue: "الإيرادات",
    platformActivity: "نشاط المنصة",
    growthOverview: "نظرة عامة على النمو",
    platformSettings: "إعدادات المنصة",
    configureWorkspace:
      "قم بإعداد مساحة عمل PlanetWay الخاصة بك.",
    platformLanguage: "لغة المنصة",
    chooseDashboard:
      "اختر لغة لوحة التحكم.",
    notifications: "الإشعارات",
    alerts: "تلقي تنبيهات الحجوزات والمنصة.",
    accountRole: "دور الحساب",
    currentAccess: "مستوى الوصول الحالي.",
    connectivity: "الاتصال",
    travelProtection: "حماية السفر",
    currency: "العملة",
    destinationsModule: "الوجهات",
    createArrangement: "إنشاء عرض جديد",
    editArrangement: "تعديل العرض",
    arrangementTitle: "عنوان العرض",
    country: "الدولة",
    city: "المدينة",
    type: "النوع",
    description: "الوصف",
    describe: "صف عرض السفر هذا...",
    uploadImage: "رفع صورة",
    clickUpload: "انقر لاختيار صورة سفر",
    preview: "معاينة",
    publishPlanetWay: "النشر على PlanetWay",
    saveChanges: "حفظ التغييرات",
    create: "إنشاء العرض",
    close: "إغلاق",
    package: "باقة",
    hotel: "فندق",
    flight: "رحلة",
    car: "سيارة",
    experience: "تجربة",
    transfer: "Ù†Ù‚Ù„",
    contactTitle: "اتصل بـ PlanetWay",
    contactText:
      "فريق دعم السفر لدينا متاح لمساعدتك.",
    support: "دعم العملاء على مدار الساعة",
    welcomePlanetWay: "مرحبًا بك في PlanetWay",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    name: "الاسم",
    forgotPassword: "هل نسيت كلمة المرور؟",
    signIn: "تسجيل الدخول",
    createAccount: "إنشاء حساب",
    continueGoogle: "المتابعة باستخدام Google",
    noAccount: "ليس لديك حساب؟",
    haveAccount: "لديك حساب بالفعل؟",
    backPlanetWay: "العودة إلى PlanetWay",
    controlCenter: "مركز تحكم PLANETWAY",
    globalPlatform: "منصة السفر العالمية",
    planetwayLanguages: "لغات PlanetWay",
    enterTitle: "أدخل عنوان العرض.",
    enterDestination: "أدخل الوجهة.",
    arrangementUpdated: "تم تحديث العرض بنجاح.",
    arrangementCreated: "تم إنشاء العرض بنجاح.",
    bookingCreated: "تم إنشاء الحجز بنجاح.",
    completeFields: "يرجى إكمال جميع الحقول.",
    enterEmailPassword:
      "يرجى إدخال البريد الإلكتروني وكلمة المرور.",
    enterEmail: "أدخل عنوان بريدك الإلكتروني.",
    deleteConfirm: "هل تريد حذف هذا العرض؟",
    bookingDelete: "هل تريد حذف هذا الحجز؟",
    languageSelected: "تم اختيار اللغة",
    loginGoogle:
      "سيتم ربط تسجيل الدخول عبر Google بـ Firebase Authentication.",
    resetInstructions:
      "سيتم إرسال تعليمات إعادة تعيين كلمة المرور إلى",
  },

  tr: {
    language: "Türkçe",
    home: "Ana Sayfa",
    flights: "Uçuşlar",
    hotels: "Oteller",
    cars: "Araç Kiralama",
    packages: "Paketler",
    contact: "İletişim",
    login: "Giriş",
    register: "Kayıt",
    logout: "Çıkış",
    discover: "Dünyanızı",
    world: "keşfedin.",
    heroText:
      "Uçuşlar, oteller, araçlar ve unutulmaz seyahat deneyimleri tek akıllı global platformda.",
    destination: "Destinasyon",
    departure: "Kalkış",
    return: "Dönüş",
    checkIn: "Giriş",
    checkOut: "Çıkış",
    pickup: "Alış",
    dropoff: "Bırakış",
    pickupDate: "Alış Tarihi",
    dropoffDate: "Bırakış Tarihi",
    class: "Sınıf",
    adults: "Yetişkin",
    children: "Çocuk",
    rooms: "Odalar",
    guests: "Misafirler",
    travelers: "Yolcular",
    economy: "Ekonomi",
    premiumEconomy: "Premium Ekonomi",
    business: "Business",
    firstClass: "Birinci Sınıf",
    search: "Ara",
    whereGo: "Nereye gitmek istiyorsunuz?",
    cityDestination: "Şehir veya destinasyon",
    pickupLocation: "Alış noktası",
    dropoffLocation: "Bırakış noktası",
    packageDestination: "Nereye seyahat etmek istiyorsunuz?",
    startDate: "Başlangıç Tarihi",
    bookSmarter: "Daha akıllı rezervasyon. Daha uzak seyahat.",
    destinations: "Destinasyonlar",
    travelSupport: "Seyahat Desteği",
    smartPlatform: "Akıllı Platform",
    esim: "eSIM",
    esimText: "Global mobil bağlantı",
    insurance: "Sigorta",
    insuranceText: "Seyahat koruması",
    exchange: "Döviz",
    exchangeText: "Para birimi değişimi",
    map: "Harita",
    mapText: "Destinasyonları keşfedin",
    searchResults: "ARAMA SONUÇLARI",
    availableArrangements: "Mevcut PlanetWay seyahat teklifleri",
    matchingDestination:
      "Destinasyonunuza uygun sonuçlar.",
    noResults: "Sonuç bulunamadı",
    tryAnother: "Başka bir destinasyon deneyin.",
    viewBook: "Görüntüle ve Rezervasyon Yap",
    aiNavigator: "AI Navigator",
    aiTitle: "Nereye gitmek istediğinizi söyleyin.",
    aiText:
      "PlanetWay doğru seyahat hizmetini bulmanıza yardımcı olur.",
    whatLooking: "Ne arıyorsunuz?",
    aiPlaceholder:
      "Örnek: Yunanistan'da sahil oteli istiyorum...",
    findTrip: "Seyahatimi bul",
    openNavigator: "Navigator'ı Aç",
    aiReady: "AI Navigator hazır.",
    welcome: "TEKRAR HOŞ GELDİNİZ",
    workspace: "PlanetWay çalışma alanınız",
    userWorkspace:
      "Seyahatlerinizi tek bir yerden arayın ve yönetin.",
    staffWorkspace:
      "Seyahat ürünlerini, rezervasyonları ve platform operasyonlarını tek yerden yönetin.",
    overview: "Genel Bakış",
    arrangements: "Teklifler",
    bookings: "Rezervasyonlar",
    users: "Kullanıcılar",
    analytics: "Analitik",
    settings: "Ayarlar",
    uploadArrangement: "Teklif Yükle",
    manageArrangements: "Teklifleri Yönet",
    viewBookings: "Rezervasyonları Gör",
    newArrangement: "Yeni Teklif",
    addArrangement: "Teklif Ekle",
    travelArrangements: "Seyahat Teklifleri",
    createManage:
      "PlanetWay'de yayınlanan her şeyi oluşturun ve yönetin.",
    noCustom: "Henüz özel teklif yok",
    uploadFirst: "İlk seyahat teklifinizi yükleyin.",
    arrangement: "Teklif",
    price: "Fiyat",
    status: "Durum",
    actions: "İşlemler",
    published: "Yayınlandı",
    draft: "Taslak",
    publish: "Yayınla",
    unpublish: "Yayından kaldır",
    edit: "Düzenle",
    delete: "Sil",
    reservations: "REZERVASYONLAR",
    bookingManagement: "Rezervasyon Yönetimi",
    allBookings:
      "Tüm PlanetWay rezervasyon aktiviteleri burada görünür.",
    noBookings: "Henüz rezervasyon yok",
    customerBookings:
      "Müşteri rezervasyonları burada görünecektir.",
    administration: "YÖNETİM",
    manageRoles: "Platform kullanıcı rollerini yönetin.",
    addUser: "Kullanıcı Ekle",
    manage: "Yönet",
    businessIntelligence: "İŞ ZEKASI",
    planetwayAnalytics: "PlanetWay Analitik",
    performance: "Platform performans özeti.",
    totalArrangements: "TOPLAM TEKLİFLER",
    totalBookings: "TOPLAM REZERVASYON",
    revenue: "GELİR",
    platformActivity: "PLATFORM AKTİVİTESİ",
    growthOverview: "Büyüme Özeti",
    platformSettings: "PLATFORM AYARLARI",
    configureWorkspace:
      "PlanetWay çalışma alanınızı yapılandırın.",
    platformLanguage: "Platform Dili",
    chooseDashboard:
      "Dashboard dilini seçin.",
    notifications: "Bildirimler",
    alerts:
      "Rezervasyon ve platform bildirimlerini alın.",
    accountRole: "Hesap Rolü",
    currentAccess: "Mevcut erişim seviyesi.",
    connectivity: "Bağlantı",
    travelProtection: "Seyahat Koruması",
    currency: "Para Birimi",
    destinationsModule: "Destinasyonlar",
    createArrangement: "Yeni Teklif Oluştur",
    editArrangement: "Teklifi Düzenle",
    arrangementTitle: "Teklif Başlığı",
    country: "Ülke",
    city: "Şehir",
    type: "Tür",
    description: "Açıklama",
    describe: "Bu seyahat teklifini açıklayın...",
    uploadImage: "Görsel Yükle",
    clickUpload: "Seyahat görseli seçmek için tıklayın",
    preview: "Önizleme",
    publishPlanetWay: "PlanetWay'de Yayınla",
    saveChanges: "Değişiklikleri Kaydet",
    create: "Teklif Oluştur",
    close: "Kapat",
    package: "Paket",
    hotel: "Otel",
    flight: "Uçuş",
    car: "Araç",
    experience: "Deneyim",
    transfer: "Transfer",
    contactTitle: "PlanetWay ile İletişim",
    contactText:
      "Seyahat destek ekibimiz size yardımcı olmaya hazır.",
    support: "7/24 müşteri desteği",
    welcomePlanetWay: "PlanetWay'e Hoş Geldiniz",
    email: "E-posta",
    password: "Şifre",
    name: "Ad",
    forgotPassword: "Şifrenizi mi unuttunuz?",
    signIn: "Giriş Yap",
    createAccount: "Hesap Oluştur",
    continueGoogle: "Google ile devam et",
    noAccount: "Hesabınız yok mu?",
    haveAccount: "Zaten hesabınız var mı?",
    backPlanetWay: "PlanetWay'e Dön",
    controlCenter: "PLANETWAY KONTROL MERKEZİ",
    globalPlatform: "GLOBAL SEYAHAT PLATFORMU",
    planetwayLanguages: "PlanetWay Dilleri",
    enterTitle: "Teklif başlığını girin.",
    enterDestination: "Destinasyonu girin.",
    arrangementUpdated: "Teklif başarıyla güncellendi.",
    arrangementCreated: "Teklif başarıyla oluşturuldu.",
    bookingCreated: "Rezervasyon başarıyla oluşturuldu.",
    completeFields: "Lütfen tüm alanları doldurun.",
    enterEmailPassword:
      "Lütfen e-posta ve şifre girin.",
    enterEmail: "E-posta adresinizi girin.",
    deleteConfirm: "Bu teklif silinsin mi?",
    bookingDelete: "Bu rezervasyon silinsin mi?",
    languageSelected: "Dil seçildi",
    loginGoogle:
      "Google Login Firebase Authentication ile bağlanacaktır.",
    resetInstructions:
      "Şifre sıfırlama talimatları şu adrese gönderilecek:",
  },

  el: {
    language: "Ελληνικά",
    home: "Αρχική",
    flights: "Πτήσεις",
    hotels: "Ξενοδοχεία",
    cars: "Ενοικίαση αυτοκινήτου",
    packages: "Πακέτα",
    contact: "Επικοινωνία",
    login: "Σύνδεση",
    register: "Εγγραφή",
    logout: "Αποσύνδεση",
    discover: "Ανακαλύψτε τον",
    world: "κόσμο σας.",
    heroText:
      "Πτήσεις, ξενοδοχεία, αυτοκίνητα και αξέχαστες ταξιδιωτικές εμπειρίες σε μία έξυπνη παγκόσμια πλατφόρμα.",
    destination: "Προορισμός",
    departure: "Αναχώρηση",
    return: "Επιστροφή",
    checkIn: "Check-in",
    checkOut: "Check-out",
    pickup: "Παραλαβή",
    dropoff: "Παράδοση",
    pickupDate: "Ημερομηνία παραλαβής",
    dropoffDate: "Ημερομηνία παράδοσης",
    class: "Κατηγορία",
    adults: "Ενήλικες",
    children: "Παιδιά",
    rooms: "Δωμάτια",
    guests: "Επισκέπτες",
    travelers: "Ταξιδιώτες",
    economy: "Οικονομική",
    premiumEconomy: "Premium Economy",
    business: "Business",
    firstClass: "Πρώτη θέση",
    search: "Αναζήτηση",
    whereGo: "Πού θέλετε να πάτε;",
    cityDestination: "Πόλη ή προορισμός",
    pickupLocation: "Τοποθεσία παραλαβής",
    dropoffLocation: "Τοποθεσία παράδοσης",
    packageDestination: "Πού θέλετε να ταξιδέψετε;",
    startDate: "Ημερομηνία έναρξης",
    bookSmarter: "Κάντε κράτηση πιο έξυπνα. Ταξιδέψτε πιο μακριά.",
    destinations: "Προορισμοί",
    travelSupport: "Υποστήριξη ταξιδιού",
    smartPlatform: "Έξυπνη πλατφόρμα",
    esim: "eSIM",
    esimText: "Παγκόσμια κινητή συνδεσιμότητα",
    insurance: "Ασφάλιση",
    insuranceText: "Ταξιδιωτική προστασία",
    exchange: "Συνάλλαγμα",
    exchangeText: "Ανταλλαγή νομισμάτων",
    map: "Χάρτης",
    mapText: "Εξερευνήστε προορισμούς",
    searchResults: "ΑΠΟΤΕΛΕΣΜΑΤΑ ΑΝΑΖΗΤΗΣΗΣ",
    availableArrangements: "Διαθέσιμες προσφορές PlanetWay",
    matchingDestination:
      "Αποτελέσματα για τον προορισμό σας.",
    noResults: "Δεν βρέθηκαν αποτελέσματα",
    tryAnother: "Δοκιμάστε άλλον προορισμό.",
    viewBook: "Προβολή και κράτηση",
    aiNavigator: "AI Navigator",
    aiTitle: "Πείτε μας πού θέλετε να πάτε.",
    aiText:
      "Το PlanetWay θα σας βοηθήσει να βρείτε τη σωστή ταξιδιωτική υπηρεσία.",
    whatLooking: "Τι ψάχνετε;",
    aiPlaceholder:
      "Παράδειγμα: Θέλω ξενοδοχείο στην παραλία στην Ελλάδα...",
    findTrip: "Βρείτε το ταξίδι μου",
    openNavigator: "Άνοιγμα Navigator",
    aiReady: "Το AI Navigator είναι έτοιμο.",
    welcome: "ΚΑΛΩΣ ΗΡΘΑΤΕ ΠΙΣΩ",
    workspace: "Ο χώρος εργασίας σας στο PlanetWay",
    userWorkspace:
      "Αναζητήστε και διαχειριστείτε τα ταξίδια σας από ένα σημείο.",
    staffWorkspace:
      "Διαχειριστείτε προϊόντα, κρατήσεις και λειτουργίες της πλατφόρμας από ένα σημείο.",
    overview: "Επισκόπηση",
    arrangements: "Προσφορές",
    bookings: "Κρατήσεις",
    users: "Χρήστες",
    analytics: "Αναλύσεις",
    settings: "Ρυθμίσεις",
    uploadArrangement: "Μεταφόρτωση προσφοράς",
    manageArrangements: "Διαχείριση προσφορών",
    viewBookings: "Προβολή κρατήσεων",
    newArrangement: "Νέα προσφορά",
    addArrangement: "Προσθήκη προσφοράς",
    travelArrangements: "Ταξιδιωτικές προσφορές",
    createManage:
      "Δημιουργήστε και διαχειριστείτε ό,τι δημοσιεύεται στο PlanetWay.",
    noCustom: "Δεν υπάρχουν προσαρμοσμένες προσφορές",
    uploadFirst: "Μεταφορτώστε την πρώτη σας ταξιδιωτική προσφορά.",
    arrangement: "Προσφορά",
    price: "Τιμή",
    status: "Κατάσταση",
    actions: "Ενέργειες",
    published: "Δημοσιευμένο",
    draft: "Πρόχειρο",
    publish: "Δημοσίευση",
    unpublish: "Κατάργηση δημοσίευσης",
    edit: "Επεξεργασία",
    delete: "Διαγραφή",
    reservations: "ΚΡΑΤΗΣΕΙΣ",
    bookingManagement: "Διαχείριση κρατήσεων",
    allBookings:
      "Όλη η δραστηριότητα κρατήσεων του PlanetWay εμφανίζεται εδώ.",
    noBookings: "Δεν υπάρχουν κρατήσεις",
    customerBookings:
      "Οι κρατήσεις πελατών θα εμφανίζονται εδώ.",
    administration: "ΔΙΑΧΕΙΡΙΣΗ",
    manageRoles: "Διαχειριστείτε τους ρόλους χρηστών.",
    addUser: "Προσθήκη χρήστη",
    manage: "Διαχείριση",
    businessIntelligence: "BUSINESS INTELLIGENCE",
    planetwayAnalytics: "Αναλύσεις PlanetWay",
    performance: "Επισκόπηση απόδοσης πλατφόρμας.",
    totalArrangements: "ΣΥΝΟΛΟ ΠΡΟΣΦΟΡΩΝ",
    totalBookings: "ΣΥΝΟΛΟ ΚΡΑΤΗΣΕΩΝ",
    revenue: "ΕΣΟΔΑ",
    platformActivity: "ΔΡΑΣΤΗΡΙΟΤΗΤΑ ΠΛΑΤΦΟΡΜΑΣ",
    growthOverview: "Επισκόπηση ανάπτυξης",
    platformSettings: "ΡΥΘΜΙΣΕΙΣ ΠΛΑΤΦΟΡΜΑΣ",
    configureWorkspace:
      "Ρυθμίστε τον χώρο εργασίας σας στο PlanetWay.",
    platformLanguage: "Γλώσσα πλατφόρμας",
    chooseDashboard:
      "Επιλέξτε τη γλώσσα του dashboard.",
    notifications: "Ειδοποιήσεις",
    alerts: "Λήψη ειδοποιήσεων κρατήσεων και πλατφόρμας.",
    accountRole: "Ρόλος λογαριασμού",
    currentAccess: "Τρέχον επίπεδο πρόσβασης.",
    connectivity: "Συνδεσιμότητα",
    travelProtection: "Ταξιδιωτική προστασία",
    currency: "Νόμισμα",
    destinationsModule: "Προορισμοί",
    createArrangement: "Δημιουργία νέας προσφοράς",
    editArrangement: "Επεξεργασία προσφοράς",
    arrangementTitle: "Τίτλος προσφοράς",
    country: "Χώρα",
    city: "Πόλη",
    type: "Τύπος",
    description: "Περιγραφή",
    describe: "Περιγράψτε αυτή την ταξιδιωτική προσφορά...",
    uploadImage: "Μεταφόρτωση εικόνας",
    clickUpload: "Κάντε κλικ για να επιλέξετε εικόνα",
    preview: "Προεπισκόπηση",
    publishPlanetWay: "Δημοσίευση στο PlanetWay",
    saveChanges: "Αποθήκευση αλλαγών",
    create: "Δημιουργία προσφοράς",
    close: "Κλείσιμο",
    package: "Πακέτο",
    hotel: "Ξενοδοχείο",
    flight: "Πτήση",
    car: "Αυτοκίνητο",
    experience: "Εμπειρία",
    transfer: "Μεταφορά",
    contactTitle: "Επικοινωνία με PlanetWay",
    contactText:
      "Η ομάδα ταξιδιωτικής υποστήριξης είναι διαθέσιμη να σας βοηθήσει.",
    support: "Υποστήριξη 24/7",
    welcomePlanetWay: "Καλώς ήρθατε στο PlanetWay",
    email: "Email",
    password: "Κωδικός",
    name: "Όνομα",
    forgotPassword: "Ξεχάσατε τον κωδικό;",
    signIn: "Σύνδεση",
    createAccount: "Δημιουργία λογαριασμού",
    continueGoogle: "Συνέχεια με Google",
    noAccount: "Δεν έχετε λογαριασμό;",
    haveAccount: "Έχετε ήδη λογαριασμό;",
    backPlanetWay: "Επιστροφή στο PlanetWay",
    controlCenter: "ΚΕΝΤΡΟ ΕΛΕΓΧΟΥ PLANETWAY",
    globalPlatform: "ΠΑΓΚΟΣΜΙΑ ΠΛΑΤΦΟΡΜΑ ΤΑΞΙΔΙΩΝ",
    planetwayLanguages: "Γλώσσες PlanetWay",
    enterTitle: "Εισάγετε τίτλο προσφοράς.",
    enterDestination: "Εισάγετε προορισμό.",
    arrangementUpdated: "Η προσφορά ενημερώθηκε επιτυχώς.",
    arrangementCreated: "Η προσφορά δημιουργήθηκε επιτυχώς.",
    bookingCreated: "Η κράτηση δημιουργήθηκε επιτυχώς.",
    completeFields: "Συμπληρώστε όλα τα πεδία.",
    enterEmailPassword:
      "Εισάγετε email και κωδικό.",
    enterEmail: "Εισάγετε τη διεύθυνση email σας.",
    deleteConfirm: "Διαγραφή αυτής της προσφοράς;",
    bookingDelete: "Διαγραφή αυτής της κράτησης;",
    languageSelected: "Επιλεγμένη γλώσσα",
    loginGoogle:
      "Το Google Login θα συνδεθεί με το Firebase Authentication.",
    resetInstructions:
      "Οι οδηγίες επαναφοράς κωδικού θα σταλούν στο",
  },

  nl: {
    language: "Nederlands",
    home: "Home",
    flights: "Vluchten",
    hotels: "Hotels",
    cars: "Autoverhuur",
    packages: "Pakketten",
    contact: "Contact",
    login: "Inloggen",
    register: "Registreren",
    logout: "Uitloggen",
    discover: "Ontdek jouw",
    world: "wereld.",
    heroText:
      "Vluchten, hotels, auto's en onvergetelijke reiservaringen op één slim wereldwijd platform.",
    destination: "Bestemming",
    departure: "Vertrek",
    return: "Terugreis",
    checkIn: "Inchecken",
    checkOut: "Uitchecken",
    pickup: "Ophalen",
    dropoff: "Inleveren",
    pickupDate: "Ophaaldatum",
    dropoffDate: "Inleverdatum",
    class: "Klasse",
    adults: "Volwassenen",
    children: "Kinderen",
    rooms: "Kamers",
    guests: "Gasten",
    travelers: "Reizigers",
    economy: "Economy",
    premiumEconomy: "Premium Economy",
    business: "Business",
    firstClass: "Eerste klasse",
    search: "Zoeken",
    whereGo: "Waar wil je naartoe?",
    cityDestination: "Stad of bestemming",
    pickupLocation: "Ophaallocatie",
    dropoffLocation: "Inleverlocatie",
    packageDestination: "Waar wil je naartoe reizen?",
    startDate: "Startdatum",
    bookSmarter: "Slimmer boeken. Verder reizen.",
    destinations: "Bestemmingen",
    travelSupport: "Reisondersteuning",
    smartPlatform: "Slim platform",
    esim: "eSIM",
    esimText: "Wereldwijde mobiele verbinding",
    insurance: "Verzekering",
    insuranceText: "Reisbescherming",
    exchange: "Wisselen",
    exchangeText: "Valutawissel",
    map: "Kaart",
    mapText: "Bestemmingen ontdekken",
    searchResults: "ZOEKRESULTATEN",
    availableArrangements: "Beschikbare PlanetWay-aanbiedingen",
    matchingDestination:
      "Resultaten voor jouw bestemming.",
    noResults: "Geen resultaten gevonden",
    tryAnother: "Probeer een andere bestemming.",
    viewBook: "Bekijken en boeken",
    aiNavigator: "AI Navigator",
    aiTitle: "Vertel ons waar je naartoe wilt.",
    aiText:
      "PlanetWay helpt je de juiste reisdienst te vinden.",
    whatLooking: "Waar ben je naar op zoek?",
    aiPlaceholder:
      "Voorbeeld: Ik wil een strandhotel in Griekenland...",
    findTrip: "Vind mijn reis",
    openNavigator: "Navigator openen",
    aiReady: "AI Navigator is klaar.",
    welcome: "WELKOM TERUG",
    workspace: "Jouw PlanetWay-werkruimte",
    userWorkspace:
      "Zoek en beheer je reizen vanaf één plek.",
    staffWorkspace:
      "Beheer reisproducten, boekingen en platformactiviteiten vanaf één plek.",
    overview: "Overzicht",
    arrangements: "Aanbiedingen",
    bookings: "Boekingen",
    users: "Gebruikers",
    analytics: "Analytics",
    settings: "Instellingen",
    uploadArrangement: "Aanbod uploaden",
    manageArrangements: "Aanbiedingen beheren",
    viewBookings: "Boekingen bekijken",
    newArrangement: "Nieuw aanbod",
    addArrangement: "Aanbod toevoegen",
    travelArrangements: "Reisaanbiedingen",
    createManage:
      "Maak en beheer alles wat op PlanetWay wordt gepubliceerd.",
    noCustom: "Nog geen aangepaste aanbiedingen",
    uploadFirst: "Upload je eerste reisaanbieding.",
    arrangement: "Aanbod",
    price: "Prijs",
    status: "Status",
    actions: "Acties",
    published: "Gepubliceerd",
    draft: "Concept",
    publish: "Publiceren",
    unpublish: "Publicatie verwijderen",
    edit: "Bewerken",
    delete: "Verwijderen",
    reservations: "BOEKINGEN",
    bookingManagement: "Boekingsbeheer",
    allBookings:
      "Alle PlanetWay-boekingsactiviteiten verschijnen hier.",
    noBookings: "Nog geen boekingen",
    customerBookings:
      "Klantboekingen verschijnen hier.",
    administration: "ADMINISTRATIE",
    manageRoles: "Beheer gebruikersrollen.",
    addUser: "Gebruiker toevoegen",
    manage: "Beheren",
    businessIntelligence: "BUSINESS INTELLIGENCE",
    planetwayAnalytics: "PlanetWay Analytics",
    performance: "Overzicht van platformprestaties.",
    totalArrangements: "TOTAAL AANBIEDINGEN",
    totalBookings: "TOTAAL BOEKINGEN",
    revenue: "OMZET",
    platformActivity: "PLATFORMACTIVITEIT",
    growthOverview: "Groeioverzicht",
    platformSettings: "PLATFORMINSTELLINGEN",
    configureWorkspace:
      "Configureer je PlanetWay-werkruimte.",
    platformLanguage: "Platformtaal",
    chooseDashboard:
      "Kies de taal van je dashboard.",
    notifications: "Meldingen",
    alerts: "Ontvang boekings- en platformmeldingen.",
    accountRole: "Accountrol",
    currentAccess: "Huidig toegangsniveau.",
    connectivity: "Connectiviteit",
    travelProtection: "Reisbescherming",
    currency: "Valuta",
    destinationsModule: "Bestemmingen",
    createArrangement: "Nieuw aanbod maken",
    editArrangement: "Aanbod bewerken",
    arrangementTitle: "Titel van aanbod",
    country: "Land",
    city: "Stad",
    type: "Type",
    description: "Beschrijving",
    describe: "Beschrijf dit reisaanbod...",
    uploadImage: "Afbeelding uploaden",
    clickUpload: "Klik om een reisafbeelding te selecteren",
    preview: "Voorbeeld",
    publishPlanetWay: "Publiceren op PlanetWay",
    saveChanges: "Wijzigingen opslaan",
    create: "Aanbod maken",
    close: "Sluiten",
    package: "Pakket",
    hotel: "Hotel",
    flight: "Vlucht",
    car: "Auto",
    experience: "Ervaring",
    transfer: "Transfer",
    contactTitle: "Contact opnemen met PlanetWay",
    contactText:
      "Ons reisondersteuningsteam staat voor je klaar.",
    support: "24/7 klantenservice",
    welcomePlanetWay: "Welkom bij PlanetWay",
    email: "E-mail",
    password: "Wachtwoord",
    name: "Naam",
    forgotPassword: "Wachtwoord vergeten?",
    signIn: "Inloggen",
    createAccount: "Account maken",
    continueGoogle: "Doorgaan met Google",
    noAccount: "Nog geen account?",
    haveAccount: "Heb je al een account?",
    backPlanetWay: "Terug naar PlanetWay",
    controlCenter: "PLANETWAY CONTROLECENTRUM",
    globalPlatform: "WERELDWIJD REISPLATFORM",
    planetwayLanguages: "PlanetWay-talen",
    enterTitle: "Voer de titel van het aanbod in.",
    enterDestination: "Voer de bestemming in.",
    arrangementUpdated: "Aanbod succesvol bijgewerkt.",
    arrangementCreated: "Aanbod succesvol aangemaakt.",
    bookingCreated: "Boeking succesvol aangemaakt.",
    completeFields: "Vul alle velden in.",
    enterEmailPassword:
      "Voer e-mail en wachtwoord in.",
    enterEmail: "Voer je e-mailadres in.",
    deleteConfirm: "Dit aanbod verwijderen?",
    bookingDelete: "Deze boeking verwijderen?",
    languageSelected: "Taal geselecteerd",
    loginGoogle:
      "Google Login wordt verbonden met Firebase Authentication.",
    resetInstructions:
      "Instructies voor het resetten van je wachtwoord worden verzonden naar",
  },

  pl: {
    language: "Polski",
    home: "Strona główna",
    flights: "Loty",
    hotels: "Hotele",
    cars: "Wynajem samochodów",
    packages: "Pakiety",
    contact: "Kontakt",
    login: "Zaloguj",
    register: "Rejestracja",
    logout: "Wyloguj",
    discover: "Odkryj swój",
    world: "świat.",
    heroText:
      "Loty, hotele, samochody i niezapomniane podróże na jednej inteligentnej globalnej platformie.",
    destination: "Miejsce docelowe",
    departure: "Wylot",
    return: "Powrót",
    checkIn: "Zameldowanie",
    checkOut: "Wymeldowanie",
    pickup: "Odbiór",
    dropoff: "Zwrot",
    pickupDate: "Data odbioru",
    dropoffDate: "Data zwrotu",
    class: "Klasa",
    adults: "Dorośli",
    children: "Dzieci",
    rooms: "Pokoje",
    guests: "Goście",
    travelers: "Podróżni",
    economy: "Ekonomiczna",
    premiumEconomy: "Premium Economy",
    business: "Biznes",
    firstClass: "Pierwsza klasa",
    search: "Szukaj",
    whereGo: "Dokąd chcesz pojechać?",
    cityDestination: "Miasto lub miejsce docelowe",
    pickupLocation: "Miejsce odbioru",
    dropoffLocation: "Miejsce zwrotu",
    packageDestination: "Dokąd chcesz podróżować?",
    startDate: "Data rozpoczęcia",
    bookSmarter: "Rezerwuj mądrzej. Podróżuj dalej.",
    destinations: "Miejsca",
    travelSupport: "Wsparcie podróżnych",
    smartPlatform: "Inteligentna platforma",
    esim: "eSIM",
    esimText: "Globalna łączność mobilna",
    insurance: "Ubezpieczenie",
    insuranceText: "Ochrona podróży",
    exchange: "Wymiana",
    exchangeText: "Wymiana walut",
    map: "Mapa",
    mapText: "Odkrywaj miejsca",
    searchResults: "WYNIKI WYSZUKIWANIA",
    availableArrangements: "Dostępne oferty PlanetWay",
    matchingDestination:
      "Wyniki pasujące do wybranego miejsca.",
    noResults: "Nie znaleziono wyników",
    tryAnother: "Spróbuj innego miejsca.",
    viewBook: "Zobacz i zarezerwuj",
    aiNavigator: "AI Navigator",
    aiTitle: "Powiedz nam, dokąd chcesz pojechać.",
    aiText:
      "PlanetWay pomoże Ci znaleźć odpowiednią usługę turystyczną.",
    whatLooking: "Czego szukasz?",
    aiPlaceholder:
      "Przykład: Chcę hotel przy plaży w Grecji...",
    findTrip: "Znajdź moją podróż",
    openNavigator: "Otwórz Navigator",
    aiReady: "AI Navigator jest gotowy.",
    welcome: "WITAJ PONOWNIE",
    workspace: "Twoja przestrzeń PlanetWay",
    userWorkspace:
      "Szukaj i zarządzaj podróżami w jednym miejscu.",
    staffWorkspace:
      "Zarządzaj produktami turystycznymi, rezerwacjami i operacjami platformy w jednym miejscu.",
    overview: "Przegląd",
    arrangements: "Oferty",
    bookings: "Rezerwacje",
    users: "Użytkownicy",
    analytics: "Analityka",
    settings: "Ustawienia",
    uploadArrangement: "Dodaj ofertę",
    manageArrangements: "Zarządzaj ofertami",
    viewBookings: "Zobacz rezerwacje",
    newArrangement: "Nowa oferta",
    addArrangement: "Dodaj ofertę",
    travelArrangements: "Oferty turystyczne",
    createManage:
      "Twórz i zarządzaj wszystkim, co jest publikowane na PlanetWay.",
    noCustom: "Brak niestandardowych ofert",
    uploadFirst: "Dodaj swoją pierwszą ofertę turystyczną.",
    arrangement: "Oferta",
    price: "Cena",
    status: "Status",
    actions: "Akcje",
    published: "Opublikowano",
    draft: "Szkic",
    publish: "Opublikuj",
    unpublish: "Cofnij publikację",
    edit: "Edytuj",
    delete: "Usuń",
    reservations: "REZERWACJE",
    bookingManagement: "Zarządzanie rezerwacjami",
    allBookings:
      "Cała aktywność rezerwacyjna PlanetWay jest tutaj.",
    noBookings: "Brak rezerwacji",
    customerBookings:
      "Rezerwacje klientów pojawią się tutaj.",
    administration: "ADMINISTRACJA",
    manageRoles: "Zarządzaj rolami użytkowników.",
    addUser: "Dodaj użytkownika",
    manage: "Zarządzaj",
    businessIntelligence: "BUSINESS INTELLIGENCE",
    planetwayAnalytics: "Analityka PlanetWay",
    performance: "Przegląd wydajności platformy.",
    totalArrangements: "ŁĄCZNA LICZBA OFERT",
    totalBookings: "ŁĄCZNA LICZBA REZERWACJI",
    revenue: "PRZYCHÓD",
    platformActivity: "AKTYWNOŚĆ PLATFORMY",
    growthOverview: "Przegląd wzrostu",
    platformSettings: "USTAWIENIA PLATFORMY",
    configureWorkspace:
      "Skonfiguruj swoją przestrzeń PlanetWay.",
    platformLanguage: "Język platformy",
    chooseDashboard:
      "Wybierz język dashboardu.",
    notifications: "Powiadomienia",
    alerts: "Otrzymuj alerty dotyczące rezerwacji i platformy.",
    accountRole: "Rola konta",
    currentAccess: "Obecny poziom dostępu.",
    connectivity: "Łączność",
    travelProtection: "Ochrona podróży",
    currency: "Waluta",
    destinationsModule: "Miejsca",
    createArrangement: "Utwórz nową ofertę",
    editArrangement: "Edytuj ofertę",
    arrangementTitle: "Tytuł oferty",
    country: "Kraj",
    city: "Miasto",
    type: "Typ",
    description: "Opis",
    describe: "Opisz tę ofertę turystyczną...",
    uploadImage: "Dodaj zdjęcie",
    clickUpload: "Kliknij, aby wybrać zdjęcie",
    preview: "Podgląd",
    publishPlanetWay: "Opublikuj na PlanetWay",
    saveChanges: "Zapisz zmiany",
    create: "Utwórz ofertę",
    close: "Zamknij",
    package: "Pakiet",
    hotel: "Hotel",
    flight: "Lot",
    car: "Samochód",
    experience: "Doświadczenie",
    transfer: "Transfer",
    contactTitle: "Skontaktuj się z PlanetWay",
    contactText:
      "Nasz zespół wsparcia podróżnych jest dostępny, aby pomóc.",
    support: "Wsparcie klienta 24/7",
    welcomePlanetWay: "Witamy w PlanetWay",
    email: "Email",
    password: "Hasło",
    name: "Imię",
    forgotPassword: "Zapomniałeś hasła?",
    signIn: "Zaloguj",
    createAccount: "Utwórz konto",
    continueGoogle: "Kontynuuj z Google",
    noAccount: "Nie masz konta?",
    haveAccount: "Masz już konto?",
    backPlanetWay: "Wróć do PlanetWay",
    controlCenter: "CENTRUM KONTROLI PLANETWAY",
    globalPlatform: "GLOBALNA PLATFORMA PODRÓŻNICZA",
    planetwayLanguages: "Języki PlanetWay",
    enterTitle: "Wpisz tytuł oferty.",
    enterDestination: "Wpisz miejsce docelowe.",
    arrangementUpdated: "Oferta została pomyślnie zaktualizowana.",
    arrangementCreated: "Oferta została pomyślnie utworzona.",
    bookingCreated: "Rezerwacja została pomyślnie utworzona.",
    completeFields: "Wypełnij wszystkie pola.",
    enterEmailPassword:
      "Wpisz email i hasło.",
    enterEmail: "Wpisz swój adres email.",
    deleteConfirm: "Usunąć tę ofertę?",
    bookingDelete: "Usunąć tę rezerwację?",
    languageSelected: "Wybrany język",
    loginGoogle:
      "Google Login zostanie połączony z Firebase Authentication.",
    resetInstructions:
      "Instrukcje resetowania hasła zostaną wysłane na",
  },

  /* =========================================================
     FALLBACK / ADDITIONAL LANGUAGES
     ========================================================= */

  sv: {},
  no: {},
  da: {},
};

/* =========================================================
   COMPLETE FALLBACK
   Ako neki dodatni jezik nema pojedinačan prevod,
   koristi engleski tekst umesto da UI nestane.
========================================================= */

const paymentTranslations = {
  en:{bookingSummary:"Booking Summary",destination:"Destination",total:"Total",paymentMethod:"Payment method",cardStripe:"Card / Stripe",wallets:"Apple Pay / Google Pay / Link",paypal:"PayPal (where available)",bankTransfer:"Bank Transfer",payNow:"PAY NOW",cancel:"Cancel",bankPending:"Bank transfer remains pending until verified.",stripeSecure:"Stripe Checkout securely processes the payment. Wallets and PayPal appear only when enabled and supported."},
  sr:{bookingSummary:"Pregled rezervacije",destination:"Destinacija",total:"Ukupno",paymentMethod:"Način plaćanja",cardStripe:"Kartica / Stripe",wallets:"Apple Pay / Google Pay / Link",paypal:"PayPal (gde je dostupan)",bankTransfer:"Bankovni transfer",payNow:"PLATI SADA",cancel:"Otkaži",bankPending:"Bankovni transfer ostaje na čekanju dok se ne potvrdi.",stripeSecure:"Stripe Checkout bezbedno obrađuje plaćanje. Novčanici i PayPal se prikazuju kada su omogućeni i podržani."},
  de:{bookingSummary:"Buchungsübersicht",destination:"Reiseziel",total:"Gesamt",paymentMethod:"Zahlungsmethode",cardStripe:"Karte / Stripe",wallets:"Apple Pay / Google Pay / Link",paypal:"PayPal (falls verfügbar)",bankTransfer:"Banküberweisung",payNow:"JETZT BEZAHLEN",cancel:"Abbrechen",bankPending:"Banküberweisung bleibt bis zur Bestätigung ausstehend.",stripeSecure:"Stripe Checkout verarbeitet die Zahlung sicher. Wallets und PayPal erscheinen, wenn sie aktiviert und unterstützt werden."},
  it:{bookingSummary:"Riepilogo prenotazione",destination:"Destinazione",total:"Totale",paymentMethod:"Metodo di pagamento",cardStripe:"Carta / Stripe",wallets:"Apple Pay / Google Pay / Link",paypal:"PayPal (se disponibile)",bankTransfer:"Bonifico bancario",payNow:"PAGA ORA",cancel:"Annulla",bankPending:"Il bonifico resta in sospeso fino alla verifica.",stripeSecure:"Stripe Checkout elabora il pagamento in modo sicuro. Wallet e PayPal appaiono quando disponibili."},
  fr:{bookingSummary:"Résumé de la réservation",destination:"Destination",total:"Total",paymentMethod:"Mode de paiement",cardStripe:"Carte / Stripe",wallets:"Apple Pay / Google Pay / Link",paypal:"PayPal (si disponible)",bankTransfer:"Virement bancaire",payNow:"PAYER MAINTENANT",cancel:"Annuler",bankPending:"Le virement bancaire reste en attente jusqu'à vérification.",stripeSecure:"Stripe Checkout traite le paiement en toute sécurité. Les portefeuilles et PayPal apparaissent lorsqu'ils sont disponibles."},
  es:{bookingSummary:"Resumen de reserva",destination:"Destino",total:"Total",paymentMethod:"Método de pago",cardStripe:"Tarjeta / Stripe",wallets:"Apple Pay / Google Pay / Link",paypal:"PayPal (si está disponible)",bankTransfer:"Transferencia bancaria",payNow:"PAGAR AHORA",cancel:"Cancelar",bankPending:"La transferencia bancaria queda pendiente hasta su verificación.",stripeSecure:"Stripe Checkout procesa el pago de forma segura. Wallets y PayPal aparecen cuando están disponibles."},
  pt:{bookingSummary:"Resumo da reserva",destination:"Destino",total:"Total",paymentMethod:"Método de pagamento",cardStripe:"Cartão / Stripe",wallets:"Apple Pay / Google Pay / Link",paypal:"PayPal (quando disponível)",bankTransfer:"Transferência bancária",payNow:"PAGAR AGORA",cancel:"Cancelar",bankPending:"A transferência bancária fica pendente até ser verificada.",stripeSecure:"O Stripe Checkout processa o pagamento com segurança. Carteiras e PayPal aparecem quando disponíveis."},
  ru:{bookingSummary:"Итоги бронирования",destination:"Направление",total:"Итого",paymentMethod:"Способ оплаты",cardStripe:"Карта / Stripe",wallets:"Apple Pay / Google Pay / Link",paypal:"PayPal (если доступен)",bankTransfer:"Банковский перевод",payNow:"ОПЛАТИТЬ",cancel:"Отмена",bankPending:"Банковский перевод ожидает подтверждения.",stripeSecure:"Stripe Checkout безопасно обрабатывает оплату. Кошельки и PayPal отображаются при доступности."},
  zh:{bookingSummary:"预订摘要",destination:"目的地",total:"总计",paymentMethod:"付款方式",cardStripe:"银行卡 / Stripe",wallets:"Apple Pay / Google Pay / Link",paypal:"PayPal（如可用）",bankTransfer:"银行转账",payNow:"立即付款",cancel:"取消",bankPending:"银行转账在确认前保持待处理状态。",stripeSecure:"Stripe Checkout 安全处理付款。钱包和 PayPal 仅在可用时显示。"},
  ja:{bookingSummary:"予約概要",destination:"目的地",total:"合計",paymentMethod:"支払い方法",cardStripe:"カード / Stripe",wallets:"Apple Pay / Google Pay / Link",paypal:"PayPal（利用可能な場合）",bankTransfer:"銀行振込",payNow:"今すぐ支払う",cancel:"キャンセル",bankPending:"銀行振込は確認されるまで保留されます。",stripeSecure:"Stripe Checkout が安全に決済を処理します。利用可能なウォレットとPayPalが表示されます。"},
  ar:{bookingSummary:"ملخص الحجز",destination:"الوجهة",total:"الإجمالي",paymentMethod:"طريقة الدفع",cardStripe:"بطاقة / Stripe",wallets:"Apple Pay / Google Pay / Link",paypal:"PayPal (متاح عند توفره)",bankTransfer:"تحويل بنكي",payNow:"ادفع الآن",cancel:"إلغاء",bankPending:"يبقى التحويل البنكي قيد الانتظار حتى التحقق.",stripeSecure:"يعالج Stripe Checkout الدفع بأمان. تظهر المحافظ وPayPal عند توفرها."},
  tr:{bookingSummary:"Rezervasyon özeti",destination:"Destinasyon",total:"Toplam",paymentMethod:"Ödeme yöntemi",cardStripe:"Kart / Stripe",wallets:"Apple Pay / Google Pay / Link",paypal:"PayPal (mevcutsa)",bankTransfer:"Banka havalesi",payNow:"ŞİMDİ ÖDE",cancel:"İptal",bankPending:"Banka havalesi doğrulanana kadar beklemede kalır.",stripeSecure:"Stripe Checkout ödemeyi güvenli şekilde işler. Cüzdanlar ve PayPal kullanılabilir olduğunda görünür."},
  el:{bookingSummary:"Σύνοψη κράτησης",destination:"Προορισμός",total:"Σύνολο",paymentMethod:"Τρόπος πληρωμής",cardStripe:"Κάρτα / Stripe",wallets:"Apple Pay / Google Pay / Link",paypal:"PayPal (όπου διαθέσιμο)",bankTransfer:"Τραπεζική μεταφορά",payNow:"ΠΛΗΡΩΜΗ ΤΩΡΑ",cancel:"Ακύρωση",bankPending:"Η τραπεζική μεταφορά παραμένει σε αναμονή μέχρι την επιβεβαίωση.",stripeSecure:"Το Stripe Checkout επεξεργάζεται την πληρωμή με ασφάλεια. Τα πορτοφόλια και το PayPal εμφανίζονται όταν υποστηρίζονται."},
  nl:{bookingSummary:"Boekingsoverzicht",destination:"Bestemming",total:"Totaal",paymentMethod:"Betaalmethode",cardStripe:"Kaart / Stripe",wallets:"Apple Pay / Google Pay / Link",paypal:"PayPal (waar beschikbaar)",bankTransfer:"Bankoverschrijving",payNow:"NU BETALEN",cancel:"Annuleren",bankPending:"De bankoverschrijving blijft in behandeling totdat deze is geverifieerd.",stripeSecure:"Stripe Checkout verwerkt de betaling veilig. Wallets en PayPal verschijnen wanneer beschikbaar."},
  pl:{bookingSummary:"Podsumowanie rezerwacji",destination:"Cel podróży",total:"Razem",paymentMethod:"Metoda płatności",cardStripe:"Karta / Stripe",wallets:"Apple Pay / Google Pay / Link",paypal:"PayPal (jeśli dostępny)",bankTransfer:"Przelew bankowy",payNow:"ZAPŁAĆ TERAZ",cancel:"Anuluj",bankPending:"Przelew bankowy pozostaje oczekujący do czasu weryfikacji.",stripeSecure:"Stripe Checkout bezpiecznie przetwarza płatność. Portfele i PayPal pojawiają się, gdy są dostępne."}
};

function getTranslation(code, key) {
  return translations[code]?.[key] || translations.en[key] || paymentTranslations[code]?.[key] || paymentTranslations.en[key] || key;
}

/* =========================================================
   STORAGE HELPERS
========================================================= */

function readStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;

  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));

  window.dispatchEvent(
    new Event("planetway:refresh")
  );
}

function getStoredArrangements() {
  return readStorage(STORAGE_KEY, []);
}

function getStoredBookings() {
  return readStorage(BOOKING_KEY, []);
}

function getCurrentUser() {
  return readStorage(USER_KEY, null);
}

function getStoredLanguage() {
  if (typeof window === "undefined") return "en";

  return (
    localStorage.getItem(LANGUAGE_KEY) || "en"
  );
}

/* =========================================================
   DEMO DATA
========================================================= */

const demoPackages = [
  {
    id: "demo-1",
    title: "Paris Escape",
    destination: "Paris, France",
    description:
      "A complete city break in Paris.",
    price: 499,
    type: "package",
    status: "Approved",
    published: true,
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "demo-2",
    title: "Greek Island Holiday",
    destination: "Santorini, Greece",
    description:
      "Relax on the Greek islands.",
    price: 699,
    type: "package",
    status: "Approved",
    published: true,
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "demo-3",
    title: "Dubai Luxury Stay",
    destination: "Dubai, UAE",
    description:
      "Luxury hotel and unforgettable experiences.",
    price: 899,
    type: "hotel",
    status: "Approved",
    published: true,
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    ],
  },
];

/* =========================================================
   APP / ROUTING
========================================================= */

export default function App() {
  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  const [paymentBooking, setPaymentBooking] = useState(null);

    useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePaymentReturn = async () => {
      const params = new URLSearchParams(
        window.location.search
      );

      /* =====================================================
         PAYPAL RETURN
      ===================================================== */

      if (params.get("paypal") === "success") {
        const orderId = params.get("token");

        if (!orderId) {
          console.error(
            "PayPal return: missing order ID."
          );
          return;
        }

        const bookings = getStoredBookings();

        const booking = bookings.find(
          (item) =>
            item.paypalOrderId === orderId
        );

        if (!booking) {
          console.error(
            "PayPal return: booking not found.",
            orderId
          );
          return;
        }

        try {
          console.log(
            "PAYPAL RETURN - CAPTURING:",
            {
              orderId,
              bookingId: booking.id,
            }
          );

          const base =
            import.meta.env.VITE_API_BASE_URL ||
            "http://localhost:5000";

          const response = await fetch(
            `${base}/api/paypal/capture-order`,
            {
              method: "POST",

              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify({
                orderId,
                bookingId: booking.id,
              }),
            }
          );

          const data =
            await response
              .json()
              .catch(() => ({}));

          console.log(
            "PAYPAL CAPTURE RESPONSE:",
            data
          );

          if (!response.ok || !data.success) {
            throw new Error(
              data.error ||
                "PayPal payment could not be completed."
            );
          }

          /* ===============================================
             UPDATE LOCAL BOOKING
          =============================================== */

          saveStorage(
            BOOKING_KEY,
            getStoredBookings().map(
              (item) =>
                item.id === booking.id
                  ? {
                      ...item,
                      status: "Confirmed",
                      paymentStatus: "Paid",
                      paymentMethod: "paypal",
                      paypalOrderId:
                        data.id ||
                        orderId,
                      paidAt:
                        new Date().toISOString(),
                    }
                  : item
            )
          );

          console.log(
            "PAYPAL PAYMENT COMPLETED:",
            booking.id
          );

          /* ===============================================
             CLEAN URL
          =============================================== */

          window.history.replaceState(
            {},
            document.title,
            "/"
          );

          /* ===============================================
             SHOW SUCCESS PAGE / DASHBOARD
          =============================================== */

          window.location.href =
            "/?payment=success&booking_id=" +
            encodeURIComponent(
              booking.id
            );

        } catch (error) {
          console.error(
            "PayPal capture failed:",
            error
          );
        }

        return;
      }

      /* =====================================================
         STRIPE RETURN
      ===================================================== */

      const bookingId =
        params.get("booking_id");

      if (
        bookingId &&
        params.get("payment") ===
          "success"
      ) {
        saveStorage(
          BOOKING_KEY,
          getStoredBookings().map(
            (booking) =>
              booking.id === bookingId
                ? {
                    ...booking,
                    status: "Paid",
                    paymentStatus: "paid",
                  }
                : booking
          )
        );
      }
    };

    handlePaymentReturn();
  }, []);
  const page =
    path === "/payment"
      ? <PaymentPage />
      : path === "/admin"
        ? <Dashboard forcedRole="admin" />
        : path === "/employee"
          ? <EmployeeDashboard
              arrangements={getStoredArrangements()}
              bookings={getStoredBookings()}
              onNewArrangement={() => {}}
              onArrangements={() => {}}
              onBookings={() => {}}
              onLogout={() => {
                localStorage.removeItem(USER_KEY);
                window.location.href = "/";
              }}
            />
          : path === "/user"
            ? <UserDashboard />
            : <HomePage />;

  return (
    <>
      {page}
      <DashboardStyles />
      {paymentBooking && (
        <PaymentModal
          booking={paymentBooking}
          onClose={() => setPaymentBooking(null)}
        />
      )}
    </>
  );
}

/* =========================================================
   LANGUAGE SELECTOR
   OVO JE SELECTOR KOJI SE NALAZI NA NASLOVNOJ
========================================================= */

function LanguageSelector({ language, setLanguage }) {
  const [open, setOpen] = useState(false);
  const selected = languageOptions.find((item) => item.code === language) || languageOptions[0];
  const visibleLanguages = languageOptions.slice(0, 12);
  const flags = { en: String.fromCodePoint(0x1F1EC,0x1F1E7), zh: String.fromCodePoint(0x1F1E8,0x1F1F3), es: String.fromCodePoint(0x1F1EA,0x1F1F8), ar: String.fromCodePoint(0x1F1E6,0x1F1EA), hi: String.fromCodePoint(0x1F1EE,0x1F1F3), pt: String.fromCodePoint(0x1F1F5,0x1F1F9), fr: String.fromCodePoint(0x1F1EB,0x1F1F7), ru: String.fromCodePoint(0x1F1F7,0x1F1FA), de: String.fromCodePoint(0x1F1E9,0x1F1EA), ja: String.fromCodePoint(0x1F1EF,0x1F1F5), it: String.fromCodePoint(0x1F1EE,0x1F1F9), sr: String.fromCodePoint(0x1F1F7,0x1F1F8) };

  return (
    <div className="planetway-language-selector">
      <button type="button" className="pw-language-trigger" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>
        <span className="pw-language-trigger-flag">{flags[selected.code]}</span>
        <span>{selected.native}</span>
        <span className="pw-language-arrow" aria-hidden="true"></span>
      </button>

      {open && (
        <div className="pw-language-overlay" onClick={() => setOpen(false)}>
          <aside className="pw-language-drawer" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <div className="pw-language-drawer-header">
              <div>
                <div className="pw-language-drawer-title">Choose Language</div>
                <div className="pw-language-drawer-subtitle">Select your preferred language</div>
              </div>
              <button type="button" className="pw-language-close" onClick={() => setOpen(false)} aria-label="Close language selector"></button>
            </div>

            <div className="pw-language-list">
              {visibleLanguages.map((item) => (
                <button key={item.code} type="button" className={item.code === language ? "pw-language-option active" : "pw-language-option"} onClick={() => { setLanguage(item.code); setOpen(false); }}>
                  <span className="pw-language-flag" aria-hidden="true">{flags[item.code]}</span>
                  <span className="pw-language-text">
                    <span className="pw-language-native">{item.native}</span>
                    <span className="pw-language-name">{item.name}</span>
                  </span>
                  <span className="pw-language-chevron" aria-hidden="true"></span>
                </button>
              ))}
            </div>

            <div className="pw-language-globe">
              <div className="pw-language-globe-orbit orbit-one"></div>
              <div className="pw-language-globe-orbit orbit-two"></div>
              <div className="pw-language-globe-core"><span></span></div>
              <div className="pw-language-globe-caption">One Planet. More Possibilities.</div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
/* =========================================================
   HOME PAGE
========================================================= */

function HomePage() {
  const [language, setLanguageState] =
    useState(getStoredLanguage());

  const [mode, setMode] =
    useState("flights");

  const [destination, setDestination] =
    useState("");

  const [departure, setDeparture] =
    useState("");

  const [returnDate, setReturnDate] =
    useState("");

  const [checkIn, setCheckIn] =
    useState("");

  const [checkOut, setCheckOut] =
    useState("");

  const [pickupDate, setPickupDate] =
    useState("");

  const [dropoffDate, setDropoffDate] =
    useState("");

  const [dropoffLocation, setDropoffLocation] =
    useState("");

  const [travelClass, setTravelClass] =
    useState("Economy");

  const [adults, setAdults] =
    useState(1);

  const [children, setChildren] =
    useState(0);

  const [rooms, setRooms] =
    useState(1);

  const [searchText, setSearchText] =
    useState("");

  const [hasSearched, setHasSearched] =
    useState(false);

  const [showLogin, setShowLogin] =
    useState(false);

  const [showRegister, setShowRegister] =
    useState(false);

  const [showContact, setShowContact] =
    useState(false);

  const [showAI, setShowAI] =
    useState(false);

  const [navOpen, setNavOpen] = useState(false);

  const [showCookie, setShowCookie] =
    useState(false);

  const [legalPage, setLegalPage] =
    useState(null);

  const [loginEmail, setLoginEmail] =
    useState("");

  const [loginPassword, setLoginPassword] =
    useState("");

  const [registerName, setRegisterName] =
    useState("");

  const [registerEmail, setRegisterEmail] =
    useState("");

  const [registerPassword, setRegisterPassword] =
    useState("");

  const [forgotEmail, setForgotEmail] =
    useState("");

  const [showForgot, setShowForgot] =
    useState(false);

  const [aiQuestion, setAIQuestion] =
    useState("");

  const [arrangements, setArrangements] =
    useState([]);

  /* -------------------------------------------------------
     LANGUAGE
  ------------------------------------------------------- */

  function setLanguage(nextLanguage) {
    setLanguageState(nextLanguage);

    localStorage.setItem(
      LANGUAGE_KEY,
      nextLanguage
    );

    window.dispatchEvent(
      new Event("planetway:language")
    );
  }

  const t = (key) =>
    getTranslation(language, key);

  /* -------------------------------------------------------
     LOAD ARRANGEMENTS
  ------------------------------------------------------- */

  useEffect(() => {
    if (!localStorage.getItem("planetway_cookie_ok")) {
      setShowCookie(true);
    }
  }, []);


  useEffect(() => {
    const load = () => {
      setArrangements(
        getStoredArrangements()
      );
    };

    load();

    window.addEventListener(
      "storage",
      load
    );

    window.addEventListener(
      "planetway:refresh",
      load
    );

    return () => {
      window.removeEventListener(
        "storage",
        load
      );

      window.removeEventListener(
        "planetway:refresh",
        load
      );
    };
  }, []);

  /* -------------------------------------------------------
     APPROVED ARRANGEMENTS
  ------------------------------------------------------- */

  const allPackages = useMemo(() => {
    const approved =
      arrangements.filter((item) => {
        if (!item) return false;

        const approvedStatus =
          item.status === "Approved" ||
          item.status === "approved" ||
          item.status === "Published" ||
          item.status === "published";

        const published =
          item.published === true ||
          item.published === undefined;

        return (
          approvedStatus &&
          published
        );
      });

    return [
      ...demoPackages,
      ...approved,
    ];
  }, [arrangements]);

  /* -------------------------------------------------------
     SEARCH
  ------------------------------------------------------- */

  const results = useMemo(() => {
    const query =
      searchText.trim().toLowerCase();

    if (!query) {
      return allPackages;
    }

    return allPackages.filter(
      (item) => {
        const text = [
          item.title,
          item.name,
          item.destination,
          item.country,
          item.city,
          item.description,
          item.type,
          item.category,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return text.includes(query);
      }
    );
  }, [allPackages, searchText]);

  function changeMode(nextMode) {
    setMode(nextMode);
    setHasSearched(false);
  }

  function executeSearch() {
    setSearchText(
      destination.trim()
    );

    setHasSearched(true);
  }

  /* -------------------------------------------------------
     AI
  ------------------------------------------------------- */

  function handleAI() {
    const question =
      aiQuestion.trim();

    if (!question) {
      alert(t("whereGo"));
      return;
    }

    const lower =
      question.toLowerCase();

    if (
      lower.includes("hotel") ||
      lower.includes("resort") ||
      lower.includes("beach") ||
      lower.includes("hotel")
    ) {
      setMode("hotels");
    } else if (
      lower.includes("car") ||
      lower.includes("rent")
    ) {
      setMode("cars");
    } else if (
      lower.includes("flight") ||
      lower.includes("plane") ||
      lower.includes("airport")
    ) {
      setMode("flights");
    } else {
      setMode("packages");
    }

    setDestination(question);
    setSearchText(question);
    setHasSearched(true);
    setShowAI(false);
  }

  /* -------------------------------------------------------
     LOGIN
  ------------------------------------------------------- */

  function login() {
  const email = loginEmail.trim().toLowerCase();
  const password = loginPassword.trim();

  if (!email || !password) {
    alert(t("enterEmailPassword"));
    return;
  }

  let role = "user";

  if (email === "admin@planetway.com") {
    if (password !== "admin@12345") {
      alert("Pogrešna admin lozinka.");
      return;
    }

    role = "admin";
  } else if (email === "employee@planetway.com") {
    if (password !== "employee@12345") {
      alert("Pogrešna employee lozinka.");
      return;
    }

    role = "employee";
  }

  const user = {
    email,
    role,
    loggedIn: true,
    language,
  };

  saveStorage(USER_KEY, user);
  setShowLogin(false);

  if (role === "admin") {
    window.location.href = "/admin";
    return;
  }

  if (role === "employee") {
    window.location.href = "/employee";
    return;
  }

  window.location.href = "/user";
}
  /* -------------------------------------------------------
     REGISTER
  ------------------------------------------------------- */

  function register() {
    if (
      !registerName.trim() ||
      !registerEmail.trim() ||
      !registerPassword.trim()
    ) {
      alert(t("completeFields"));
      return;
    }

    saveStorage(USER_KEY, {
      name: registerName.trim(),
      email:
        registerEmail
          .trim()
          .toLowerCase(),
      role: "user",
      loggedIn: true,
      language,
    });

    setShowRegister(false);

    window.location.href =
      "/user";
  }

  /* -------------------------------------------------------
     GOOGLE
  ------------------------------------------------------- */

  function googleLogin() {
    alert(t("loginGoogle"));
  }

  /* -------------------------------------------------------
     FORGOT PASSWORD
  ------------------------------------------------------- */

  function forgotPassword() {
    if (!forgotEmail.trim()) {
      alert(t("enterEmail"));
      return;
    }

    alert(
      `${t("resetInstructions")} ${forgotEmail.trim()}.`
    );

    setShowForgot(false);
  }

  /* -------------------------------------------------------
     CREATE BOOKING
  ------------------------------------------------------- */

   async function createBooking(item) {
    const bookings = getStoredBookings();

    const newBooking = {
      id: `booking-${Date.now()}`,
      title: item.title || item.name || "PlanetWay Travel",
      destination:
        item.destination ||
        item.city ||
        item.country ||
        "",
      price: item.price ?? item.amount ?? 0,
      type: item.type || item.category || "Travel",
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    try {
      await setDoc(
        doc(db, "bookings", newBooking.id),
        {
          ...newBooking,
          createdAt: serverTimestamp(),
        }
      );

      console.log(
        "FIREBASE BOOKING CREATED:",
        newBooking.id
      );
    } catch (error) {
      console.error(
        "FIREBASE BOOKING ERROR:",
        error
      );
alert(
  "FIREBASE ERROR: " +
  (error?.code || "") +
  " | " +
  (error?.message || error)
);
      alert(
        "Rezervacija nije mogla da se sačuva u Firebase."
      );

      return;
    }

    saveStorage(
      BOOKING_KEY,
      [...bookings, newBooking]
    );

    window.location.href =
      `/payment?booking_id=${encodeURIComponent(
        newBooking.id
      )}`;
  } /* -------------------------------------------------------
     HOME JSX
  ------------------------------------------------------- */

  return (
    <main
      className="pw-page"
      dir={
        language === "ar"
          ? "rtl"
          : "ltr"
      }
    >
      <header className="pw-navbar">
        <button
          type="button"
          className="pw-brand"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <span className="pw-brand-text">
            <strong>PLANETWAY</strong>
            <small>GLOBAL TRAVEL PLATFORM</small>
          </span>
        </button>

        <button
          type="button"
          className="pw-hamburger"
          aria-label="Menu"
          aria-expanded={navOpen}
          onClick={() => setNavOpen((value) => !value)}
        >
          <span></span><span></span><span></span>
        </button>

        <nav className={navOpen ? "pw-nav mobile-open" : "pw-nav"}>
          <button
            type="button"
            onClick={() => {
              setNavOpen(false);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            {t("home")}
          </button>

          <button
            type="button"
            onClick={() => {
              setNavOpen(false);
              changeMode("flights");
            }}
          >
            {t("flights")}
          </button>

          <button
            type="button"
            onClick={() => {
              setNavOpen(false);
              changeMode("hotels");
            }}
          >
            {t("hotels")}
          </button>

          <button
            type="button"
            onClick={() => {
              setNavOpen(false);
              changeMode("cars");
            }}
          >
            {t("cars")}
          </button>

          <button
            type="button"
            onClick={() => {
              setNavOpen(false);
              changeMode("packages");
            }}
          >
            {t("packages")}
          </button>

          <button
            type="button"
            onClick={() => {
              setNavOpen(false);
              setShowContact(true);
            }}
          >
            {t("contact")}
          </button>
        </nav>

        <div className="pw-auth-cluster">
          <div className="pw-auth-language">
            <LanguageSelector
              language={language}
              setLanguage={setLanguage}
            />
          </div>
          <div className="pw-auth">
            <button
              type="button"
              className="pw-login"
              onClick={() => setShowLogin(true)}
            >
              {t("login")}
            </button>
            <button
              type="button"
              className="pw-register"
              onClick={() => setShowRegister(true)}
            >
              {t("register")}
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="pw-hero">
        <div className="pw-hero-overlay">
          <div className="pw-hero-content">
            <div className="pw-eyebrow">
              PLANETWAY TRAVEL
            </div>

            <h1>
              {t("discover")}{" "}
              <span>
                {t("world")}
              </span>
            </h1>

            <p>
              {t("heroText")}
            </p>

            <SearchPanel
              language={language}
              t={t}
              mode={mode}
              setMode={changeMode}
              destination={
                destination
              }
              setDestination={
                setDestination
              }
              departure={departure}
              setDeparture={
                setDeparture
              }
              returnDate={
                returnDate
              }
              setReturnDate={
                setReturnDate
              }
              checkIn={checkIn}
              setCheckIn={
                setCheckIn
              }
              checkOut={checkOut}
              setCheckOut={
                setCheckOut
              }
              pickupDate={
                pickupDate
              }
              setPickupDate={
                setPickupDate
              }
              dropoffDate={
                dropoffDate
              }
              setDropoffDate={
                setDropoffDate
              }
              dropoffLocation={
                dropoffLocation
              }
              setDropoffLocation={
                setDropoffLocation
              }
              travelClass={
                travelClass
              }
              setTravelClass={
                setTravelClass
              }
              adults={adults}
              setAdults={setAdults}
              children={children}
              setChildren={
                setChildren
              }
              rooms={rooms}
              setRooms={setRooms}
              onSearch={
                executeSearch
              }
            />

            <div className="pw-slogan">
              {t("bookSmarter")}
            </div>

            <div className="pw-hero-stats">
              <div>
                <strong>
                  190+
                </strong>

                <span>
                  {t("destinations")}
                </span>
              </div>

              <div>
                <strong>
                  24/7
                </strong>

                <span>
                  {t("travelSupport")}
                </span>
              </div>

              <div>
                <strong>
                  1
                </strong>

                <span>
                  {t("smartPlatform")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section className="pw-services">
        <ServiceCard
          icon="◉"
          title={t("esim")}
          text={t("esimText")}
          onClick={() =>
            alert(t("esim"))
          }
        />

        <ServiceCard
          icon="◆"
          title={t("insurance")}
          text={t("insuranceText")}
          onClick={() =>
            alert(
              t("insurance")
            )
          }
        />

        <ServiceCard
          icon="$"
          title={t("exchange")}
          text={t("exchangeText")}
          onClick={() =>
            alert(
              t("exchange")
            )
          }
        />

        <ServiceCard
          icon="⌖"
          title={t("map")}
          text={t("mapText")}
          onClick={() =>
            alert(t("map"))
          }
        />
      </section>

      {/* =====================================================
          RESULTS
      ===================================================== */}

      {hasSearched && (
        <section className="pw-results">
          <div className="pw-section-heading">
            <span>
              {t("searchResults")}
            </span>

            <h2>
              {t(
                "availableArrangements"
              )}
            </h2>

            <p>
              {t(
                "matchingDestination"
              )}
            </p>
          </div>

          <div className="pw-results-grid">
            {results.length === 0 ? (
              <div className="pw-empty">
                <h3>
                  {t("noResults")}
                </h3>

                <p>
                  {t(
                    "tryAnother"
                  )}
                </p>
              </div>
            ) : (
              results.map(
                (item, index) => (
                  <article
                    key={
                      item.id ||
                      `${item.title}-${index}`
                    }
                    className="pw-result-card"
                  >
                    <img
                      src={
                        item.images?.[0] ||
                        item.image ||
                        item.coverImage ||
                        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
                      }
                      alt={
                        item.title ||
                        item.name ||
                        "PlanetWay"
                      }
                    />

                    <div className="pw-result-content">
                      <span>
                        {item.type ||
                          item.category ||
                          t("arrangement")}
                      </span>

                      <h3>
                        {item.title ||
                          item.name}
                      </h3>

                      <p>
                        {item.destination ||
                          item.city ||
                          item.country ||
                          ""}
                      </p>

                      <strong>
                        €
                        {item.price ??
                          item.amount ??
                          0}
                      </strong>

                      <button
                        type="button"
                        onClick={() =>
                          createBooking(
                            item
                          )
                        }
                      >
                        {t(
                          "viewBook"
                        )}
                      </button>
                    </div>
                  </article>
                )
              )
            )}
          </div>
        </section>
      )}

      {/* AI NAVIGATOR CARD */}
      <div className="pw-ai-card-wrap">
      <button type="button" className="pw-ai-card" aria-label={t("aiNavigator")} onClick={() => setShowAI(true)}>
        <span className="pw-ai-card-badge">AI</span>
        <span className="pw-ai-card-content">
          <strong>{t("aiNavigator")}</strong>
          <small>{t("whatLooking")}</small>
        </span>
      </button>

      <button type="button" className="pw-ai-float" aria-label={t("aiNavigator")} title={t("aiNavigator")} onClick={() => setShowAI(true)}>
        <span className="pw-ai-orb">AI</span>
      </button>
      </div>

      <footer className="pw-global-footer">
        <span> {new Date().getFullYear()} PlanetWay</span>
        <div>
          <button type="button" onClick={() => setLegalPage("terms")}>Terms & Conditions</button>
          <button type="button" onClick={() => setLegalPage("privacy")}>Privacy Policy</button>
          <button type="button" onClick={() => setLegalPage("cookies")}>Cookie Settings</button>
        </div>
      </footer>

      {/* =====================================================
          AI MODAL
      ===================================================== */}

      {showAI && (
        <Modal
          title={t(
            "aiNavigator"
          )}
          onClose={() =>
            setShowAI(false)
          }
        >
          <p>
            {t(
              "whatLooking"
            )}
          </p>

          <textarea
            className="pw-modal-input"
            value={aiQuestion}
            onChange={(event) =>
              setAIQuestion(
                event.target.value
              )
            }
            placeholder={t(
              "aiPlaceholder"
            )}
          />

          <button
            type="button"
            className="pw-modal-primary"
            onClick={handleAI}
          >
            {t("findTrip")}
          </button>
        </Modal>
      )}

      {/* =====================================================
          LOGIN
      ===================================================== */}

      {showLogin && (
        <Modal
          title={t(
            "welcomePlanetWay"
          )}
          onClose={() =>
            setShowLogin(false)
          }
        >
          <FormInput
            label={t("email")}
            type="email"
            value={loginEmail}
            onChange={
              setLoginEmail
            }
          />

          <FormInput
            label={t("password")}
            type="password"
            value={loginPassword}
            onChange={
              setLoginPassword
            }
          />

          <button
            type="button"
            className="pw-modal-primary"
            onClick={login}
          >
            {t("signIn")}
          </button>

          <button
            type="button"
            className="pw-google-button"
            onClick={
              googleLogin
            }
          >
            {t(
              "continueGoogle"
            )}
          </button>

          <button
            type="button"
            className="pw-link-button"
            onClick={() => {
              setShowLogin(
                false
              );
              setShowForgot(true);
            }}
          >
            {t(
              "forgotPassword"
            )}
          </button>
        </Modal>
      )}

      {/* =====================================================
          REGISTER
      ===================================================== */}

      {showRegister && (
        <Modal
          title={t(
            "createAccount"
          )}
          onClose={() =>
            setShowRegister(
              false
            )
          }
        >
          <FormInput
            label={t("name")}
            value={registerName}
            onChange={
              setRegisterName
            }
          />

          <FormInput
            label={t("email")}
            type="email"
            value={registerEmail}
            onChange={
              setRegisterEmail
            }
          />

          <FormInput
            label={t("password")}
            type="password"
            value={
              registerPassword
            }
            onChange={
              setRegisterPassword
            }
          />

          <button
            type="button"
            className="pw-modal-primary"
            onClick={register}
          >
            {t(
              "createAccount"
            )}
          </button>
        </Modal>
      )}

      {/* =====================================================
          FORGOT
      ===================================================== */}

      {showForgot && (
        <Modal
          title={t(
            "forgotPassword"
          )}
          onClose={() =>
            setShowForgot(false)
          }
        >
          <FormInput
            label={t("email")}
            type="email"
            value={forgotEmail}
            onChange={
              setForgotEmail
            }
          />

          <button
            type="button"
            className="pw-modal-primary"
            onClick={
              forgotPassword
            }
          >
            {t(
              "forgotPassword"
            )}
          </button>
        </Modal>
      )}

      {/* =====================================================
          CONTACT
      ===================================================== */}

      {showContact && (
        <Modal
          title={t(
            "contactTitle"
          )}
          onClose={() =>
            setShowContact(
              false
            )
          }
        >
          <p>
            {t(
              "contactText"
            )}
          </p>

          <p>
            {t("support")}
          </p>

          <button
            type="button"
            className="pw-modal-primary"
            onClick={() =>
              setShowContact(
                false
              )
            }
          >
            {t("close")}
          </button>
        </Modal>
      )}

      {legalPage && (
        <div className="pw-global-overlay" onClick={() => setLegalPage(null)}>
          <div className="pw-global-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="pw-global-close" onClick={() => setLegalPage(null)}></button>
            <span className="pw-modal-kicker">PLANETWAY</span>
            <h2>{legalPage === "terms" ? "Terms & Conditions" : legalPage === "privacy" ? "Privacy Policy" : "Cookie Settings"}</h2>
            <p>{legalPage === "terms" ? "These Terms & Conditions explain the rules for using PlanetWay travel services and platform features." : legalPage === "privacy" ? "PlanetWay respects your privacy. Personal information is used to provide services, process bookings and support your account." : "Cookie settings help PlanetWay remember your preferences and support essential platform functionality."}</p>
            <div className="pw-terms-list">
              <div> Use of the platform is subject to applicable laws and service rules.</div>
              <div> Booking and payment information is processed through the relevant service providers.</div>
              <div> Privacy and cookie practices may be updated as the platform develops.</div>
            </div>
            <button type="button" className="pw-global-primary" onClick={() => setLegalPage(null)}>Close</button>
          </div>
        </div>
      )}

      {showCookie && (
        <button
          type="button"
          className="pw-cookie-popup"
          aria-label="Cookies"
          onClick={() => {
            localStorage.setItem("planetway_cookie_ok", "1");
            setShowCookie(false);
          }}
        >
          Cookies
        </button>
      )}

    </main>
  );
}

/* =========================================================
   SEARCH PANEL
========================================================= */

function SearchPanel({
  t,
  mode,
  setMode,
  destination,
  setDestination,
  departure,
  setDeparture,
  returnDate,
  setReturnDate,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  pickupDate,
  setPickupDate,
  dropoffDate,
  setDropoffDate,
  dropoffLocation,
  setDropoffLocation,
  travelClass,
  setTravelClass,
  adults,
  setAdults,
  children,
  setChildren,
  rooms,
  setRooms,
  onSearch,
}) {
  const tabs = [
    [
      "flights",
      `✈ ${t("flights")}`,
    ],
    [
      "hotels",
      `▣ ${t("hotels")}`,
    ],
    [
      "cars",
      `🚗 ${t("cars")}`,
    ],
    [
      "packages",
      `✦ ${t("packages")}`,
    ],
  ];

  return (
    <div className="pw-search-card">
      <div className="pw-search-tabs">
        {tabs.map(
          ([value, label]) => (
            <button
              key={value}
              type="button"
              className={
                mode === value
                  ? "active"
                  : ""
              }
              onClick={() =>
                setMode(value)
              }
            >
              {label}
            </button>
          )
        )}
      </div>

      <div className="pw-search-fields">
        {mode === "flights" && (
          <>
            <Field
              label={t(
                "destination"
              )}
              value={
                destination
              }
              onChange={
                setDestination
              }
              placeholder={t(
                "whereGo"
              )}
            />

            <Field
              label={t(
                "departure"
              )}
              type="date"
              value={departure}
              onChange={
                setDeparture
              }
            />

            <Field
              label={t("return")}
              type="date"
              value={
                returnDate
              }
              onChange={
                setReturnDate
              }
            />

            <div className="pw-field">
              <label>
                {t("class")}
              </label>

              <select
                value={
                  travelClass
                }
                onChange={(event) =>
                  setTravelClass(
                    event.target
                      .value
                  )
                }
              >
                <option>
                  {t(
                    "economy"
                  )}
                </option>

                <option>
                  {t(
                    "premiumEconomy"
                  )}
                </option>

                <option>
                  {t(
                    "business"
                  )}
                </option>

                <option>
                  {t(
                    "firstClass"
                  )}
                </option>
              </select>
            </div>

            <Counter
              label={t("adults")}
              value={adults}
              onMinus={() =>
                setAdults(
                  (v) =>
                    Math.max(
                      1,
                      v - 1
                    )
                )
              }
              onPlus={() =>
                setAdults(
                  (v) =>
                    v + 1
                )
              }
            />

            <Counter
              label={t(
                "children"
              )}
              value={
                children
              }
              onMinus={() =>
                setChildren(
                  (v) =>
                    Math.max(
                      0,
                      v - 1
                    )
                )
              }
              onPlus={() =>
                setChildren(
                  (v) =>
                    v + 1
                )
              }
            />
          </>
        )}

        {mode === "hotels" && (
          <>
            <Field
              label={t(
                "destination"
              )}
              value={
                destination
              }
              onChange={
                setDestination
              }
              placeholder={t(
                "cityDestination"
              )}
            />

            <Field
              label={t(
                "checkIn"
              )}
              type="date"
              value={checkIn}
              onChange={
                setCheckIn
              }
            />

            <Field
              label={t(
                "checkOut"
              )}
              type="date"
              value={checkOut}
              onChange={
                setCheckOut
              }
            />

            <Counter
              label={t("rooms")}
              value={rooms}
              onMinus={() =>
                setRooms(
                  (v) =>
                    Math.max(
                      1,
                      v - 1
                    )
                )
              }
              onPlus={() =>
                setRooms(
                  (v) =>
                    v + 1
                )
              }
            />

            <Counter
              label={t("guests")}
              value={adults}
              onMinus={() =>
                setAdults(
                  (v) =>
                    Math.max(
                      1,
                      v - 1
                    )
                )
              }
              onPlus={() =>
                setAdults(
                  (v) =>
                    v + 1
                )
              }
            />
          </>
        )}

        {mode === "cars" && (
          <>
            <Field
              label={t(
                "pickup"
              )}
              value={
                destination
              }
              onChange={
                setDestination
              }
              placeholder={t(
                "pickupLocation"
              )}
            />

            <Field
              label={t(
                "dropoff"
              )}
              value={
                dropoffLocation
              }
              onChange={
                setDropoffLocation
              }
              placeholder={t(
                "dropoffLocation"
              )}
            />

            <Field
              label={t(
                "pickupDate"
              )}
              type="date"
              value={
                pickupDate
              }
              onChange={
                setPickupDate
              }
            />

            <Field
              label={t(
                "dropoffDate"
              )}
              type="date"
              value={
                dropoffDate
              }
              onChange={
                setDropoffDate
              }
            />
          </>
        )}

        {mode === "packages" && (
          <>
            <Field
              label={t(
                "destination"
              )}
              value={
                destination
              }
              onChange={
                setDestination
              }
              placeholder={t(
                "packageDestination"
              )}
            />

            <Field
              label={t(
                "startDate"
              )}
              type="date"
              value={
                departure
              }
              onChange={
                setDeparture
              }
            />

            <Counter
              label={t(
                "travelers"
              )}
              value={adults}
              onMinus={() =>
                setAdults(
                  (v) =>
                    Math.max(
                      1,
                      v - 1
                    )
                )
              }
              onPlus={() =>
                setAdults(
                  (v) =>
                    v + 1
                )
              }
            />
          </>
        )}

        <button
          type="button"
          className="pw-search-button"
          onClick={onSearch}
        >
          {t("search")} →
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({
  forcedRole,
}) {
  const [currentUser, setCurrentUser] =
    useState(
      getCurrentUser()
    );

  const [language, setLanguageState] =
    useState(
      currentUser?.language ||
        getStoredLanguage()
    );

  const role =
    forcedRole ||
    currentUser?.role ||
    "user";

  const [active, setActive] =
    useState("overview");

  const [arrangements, setArrangements] =
    useState(
      getStoredArrangements()
    );

  const [bookings, setBookings] =
    useState(
      getStoredBookings()
    );

  const [showArrangement, setShowArrangement] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] =
    useState({
      title: "",
      destination: "",
      country: "",
      city: "",
      description: "",
      price: "",
      type: "Package",
      category: "Travel",
      status: "Draft",
      published: false,
      image: "",
    });

  const t = (key) =>
    getTranslation(
      language,
      key
    );

  /* -------------------------------------------------------
     LANGUAGE PERSISTENCE
  ------------------------------------------------------- */

  function changeLanguage(
    nextLanguage
  ) {
    setLanguageState(
      nextLanguage
    );

    localStorage.setItem(
      LANGUAGE_KEY,
      nextLanguage
    );

    const existing =
      getCurrentUser();

    if (existing) {
      const updated = {
        ...existing,
        language:
          nextLanguage,
      };

      saveStorage(
        USER_KEY,
        updated
      );

      setCurrentUser(
        updated
      );
    }

    window.dispatchEvent(
      new Event(
        "planetway:language"
      )
    );
  }

  /* -------------------------------------------------------
     REFRESH
  ------------------------------------------------------- */

  function refreshData() {
    setArrangements(
      getStoredArrangements()
    );

    setBookings(
      getStoredBookings()
    );
  }

  useEffect(() => {
    const refresh = () => {
      refreshData();

      const user =
        getCurrentUser();

      if (user) {
        setCurrentUser(user);

        if (user.language) {
          setLanguageState(
            user.language
          );
        }
      }
    };

    window.addEventListener(
      "planetway:refresh",
      refresh
    );

    window.addEventListener(
      "storage",
      refresh
    );

    window.addEventListener(
      "planetway:language",
      refresh
    );

    return () => {
      window.removeEventListener(
        "planetway:refresh",
        refresh
      );

      window.removeEventListener(
        "storage",
        refresh
      );

      window.removeEventListener(
        "planetway:language",
        refresh
      );
    };
  }, []);

  /* -------------------------------------------------------
     LOGOUT
  ------------------------------------------------------- */

  function logout() {
    localStorage.removeItem(
      USER_KEY
    );

    window.location.href =
      "/";
  }

  /* -------------------------------------------------------
     NEW ARRANGEMENT
  ------------------------------------------------------- */

  function openNewArrangement() {
    if (role === "user") return;

    setEditingId(null);

    setForm({
      title: "",
      destination: "",
      country: "",
      city: "",
      description: "",
      price: "",
      type: "Package",
      category: "Travel",
      status: "Draft",
      published: false,
      image: "",
    });

    setShowArrangement(true);
  }

  /* -------------------------------------------------------
     EDIT ARRANGEMENT
  ------------------------------------------------------- */

  function editArrangement(
    item
  ) {
    if (role === "user") return;

    setEditingId(
      item.id
    );

    setForm({
      title:
        item.title || "",
      destination:
        item.destination ||
        "",
      country:
        item.country || "",
      city:
        item.city || "",
      description:
        item.description ||
        "",
      price:
        item.price || "",
      type:
        item.type ||
        "Package",
      category:
        item.category ||
        "Travel",
      status:
        item.status ||
        "Draft",
      published:
        item.published ===
        true,
      image:
        item.images?.[0] ||
        item.image ||
        item.coverImage ||
        "",
    });

    setShowArrangement(true);
  }

  /* -------------------------------------------------------
     SAVE ARRANGEMENT
  ------------------------------------------------------- */

  function saveArrangement() {
    if (role === "user") return;

    if (!form.title.trim()) {
      alert(
        t("enterTitle")
      );
      return;
    }

    if (
      !form.destination.trim()
    ) {
      alert(
        t(
          "enterDestination"
        )
      );
      return;
    }

    const old =
      getStoredArrangements();

    if (editingId) {
      saveStorage(
        STORAGE_KEY,
        old.map((item) =>
          item.id ===
          editingId
            ? {
                ...item,
                ...form,
                title:
                  form.title.trim(),
                destination:
                  form.destination.trim(),
                country:
                  form.country.trim(),
                city:
                  form.city.trim(),
                description:
                  form.description.trim(),
                price:
                  Number(
                    form.price
                  ) || 0,
                images:
                  form.image
                    ? [
                        form.image,
                      ]
                    : item.images ||
                      [],
              }
            : item
        )
      );

      alert(
        t(
          "arrangementUpdated"
        )
      );
    } else {
      saveStorage(
        STORAGE_KEY,
        [
          ...old,
          {
            id:
              `arr-${Date.now()}`,
            title:
              form.title.trim(),
            destination:
              form.destination.trim(),
            country:
              form.country.trim(),
            city:
              form.city.trim(),
            description:
              form.description.trim(),
            price:
              Number(
                form.price
              ) || 0,
            type:
              form.type,
            category:
              form.category,
            status:
              form.status,
            published:
              form.published,
            images:
              form.image
                ? [
                    form.image,
                  ]
                : [],
            createdAt:
              new Date().toISOString(),
          },
        ]
      );

      alert(
        t(
          "arrangementCreated"
        )
      );
    }

    setShowArrangement(false);
    setEditingId(null);
    refreshData();
  }

  /* -------------------------------------------------------
     UPLOAD IMAGE
     OVO JE VRACEN FUNKCIONALNI UPLOAD
  ------------------------------------------------------- */

  function handleUpload(
    event
  ) {
    if (role === "user")
      return;

    const file =
      event.target.files?.[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onload = () => {
      setForm(
        (previous) => ({
          ...previous,
          image:
            String(
              reader.result
            ),
        })
      );
    };

    reader.readAsDataURL(
      file
    );
  }

  /* -------------------------------------------------------
     DELETE
  ------------------------------------------------------- */

  function deleteArrangement(
    id
  ) {
    if (role === "user")
      return;

    if (
      !window.confirm(
        t(
          "deleteConfirm"
        )
      )
    ) {
      return;
    }

    saveStorage(
      STORAGE_KEY,
      getStoredArrangements().filter(
        (item) =>
          item.id !== id
      )
    );

    refreshData();
  }

  /* -------------------------------------------------------
     PUBLISH / UNPUBLISH
  ------------------------------------------------------- */

  function togglePublished(item) {
  if (role === "user") {
    return;
  }

  const approvalAction =
    item.__approvalAction;

  saveStorage(
    STORAGE_KEY,
    getStoredArrangements().map(
      (arr) => {
        if (arr.id !== item.id) {
          return arr;
        }

        // ADMIN APPROVE
        if (
          approvalAction ===
          "approve"
        ) {
          const {
            __approvalAction,
            ...cleanItem
          } = item;

          return {
            ...cleanItem,
            status: "Approved",
            published: true,
            approvedAt:
              new Date().toISOString(),
          };
        }

        // ADMIN REJECT
        if (
          approvalAction ===
          "reject"
        ) {
          const {
            __approvalAction,
            ...cleanItem
          } = item;

          return {
            ...cleanItem,
            status: "Rejected",
            published: false,
            rejectedAt:
              new Date().toISOString(),
          };
        }

        // NORMAL PUBLISH / UNPUBLISH
        return {
          ...arr,
          published:
            !arr.published,
          status:
            !arr.published
              ? "Published"
              : "Draft",
        };
      }
    )
  );

  refreshData();
}
  /* -------------------------------------------------------
     STATS
  ------------------------------------------------------- */

  const stats = {
    arrangements:
      arrangements.length,

    bookings:
      bookings.length,

    users:
      role === "admin"
        ? 1248
        : 1,

    revenue:
      bookings.reduce(
        (sum, item) =>
          sum +
          Number(
            item.price || 0
          ),
        0
      ),
  };

  return (
    <div
      className={`pw-dashboard ${role === "admin" ? "pw-admin-dashboard" : ""}`}
      dir={
        language === "ar"
          ? "rtl"
          : "ltr"
      }
    >
      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <aside className="pw-dash-sidebar">
        <div className="pw-dash-brand">
          <div className="pw-dash-mark">
            P
          </div>

          <div>
            <strong>
              PLANETWAY
            </strong>

            <small>
              {t(
                "globalPlatform"
              )}
            </small>
          </div>
        </div>

        <div className="pw-role-badge">
          {role.toUpperCase()}
        </div>

        <nav className="pw-dash-menu">
          <DashButton
            icon="⌂"
            text={t("overview")}
            active={
              active ===
              "overview"
            }
            onClick={() =>
              setActive(
                "overview"
              )
            }
          />

          {role !== "user" && (
            <DashButton
              icon="▣"
              text={t(
                "arrangements"
              )}
              active={
                active ===
                "arrangements"
              }
              onClick={() =>
                setActive(
                  "arrangements"
                )
              }
            />
          )}

          <DashButton
            icon="◫"
            text={t("bookings")}
            active={
              active ===
              "bookings"
            }
            onClick={() =>
              setActive(
                "bookings"
              )
            }
          />

          {role === "admin" && (
            <DashButton
              icon="♙"
              text={t("users")}
              active={
                active ===
                "users"
              }
              onClick={() =>
                setActive(
                  "users"
                )
              }
            />
          )}

          <DashButton
            icon="↗"
            text={t(
              "analytics"
            )}
            active={
              active ===
              "analytics"
            }
            onClick={() =>
              setActive(
                "analytics"
              )
            }
          />

          <DashButton
            icon="⚙"
            text={t(
              "settings"
            )}
            active={
              active ===
              "settings"
            }
            onClick={() =>
              setActive(
                "settings"
              )
            }
          />
        </nav>

        <div className="pw-dash-bottom">
          <button
            type="button"
            onClick={() =>
              (window.location.href =
                "/")
            }
          >
            ←{" "}
            {t(
              "backPlanetWay"
            )}
          </button>

          <button
            type="button"
            onClick={logout}
          >
            ⇥ {t("logout")}
          </button>
        </div>
      </aside>

      {/* ===================================================
          MAIN
      =================================================== */}

      <main className="pw-dash-main">
        <header className="pw-dash-header">
          <div>
            <span>
              {t(
                "controlCenter"
              )}
            </span>

            <h1>
              {active ===
                "overview" &&
                t("overview")}

              {active ===
                "arrangements" &&
                t(
                  "travelArrangements"
                )}

              {active ===
                "bookings" &&
                t("bookings")}

              {active ===
                "users" &&
                t("users")}

              {active ===
                "analytics" &&
                t("analytics")}

              {active ===
                "settings" &&
                t("settings")}
            </h1>
          </div>

          <div className="pw-dash-user">
            <LanguageSelector
              language={
                language
              }
              setLanguage={
                changeLanguage
              }
            />

            <div className="pw-user-avatar">
              {(
                currentUser?.email ||
                "P"
              )
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <strong>
                {currentUser?.name ||
                  currentUser?.email ||
                  role}
              </strong>

              <small>
                {role}
              </small>
            </div>
          </div>
        </header>

        {/* =================================================
            OVERVIEW
        ================================================= */}

        {active ===
          "overview" && (
          <DashboardOverview
            t={t}
            stats={stats}
            role={role}
            onNewArrangement={
              openNewArrangement
            }
            onArrangements={() =>
              setActive(
                "arrangements"
              )
            }
            onBookings={() =>
              setActive(
                "bookings"
              )
            }
          />
        )}

        {/* =================================================
            ARRANGEMENTS
        ================================================= */}

        {active ===
          "arrangements" &&
          role !== "user" && (
            <ArrangementsPanel
              t={t}
              arrangements={
                arrangements
              }
              onNew={
                openNewArrangement
              }
              onEdit={
                editArrangement
              }
              onDelete={
                deleteArrangement
              }
              onToggle={
                togglePublished
              }
            />
          )}

        {/* =================================================
            BOOKINGS
        ================================================= */}

        {active ===
          "bookings" && (
          <BookingsPanel
            t={t}
            bookings={bookings}
            onRefresh={
              refreshData
            }
          />
        )}

        {/* =================================================
            USERS
        ================================================= */}

        {active ===
          "users" &&
          role === "admin" && (
            <UsersPanel t={t} />
          )}

        {/* =================================================
            ANALYTICS
        ================================================= */}

        {active ===
          "analytics" && (
          <AnalyticsPanel
            t={t}
            stats={stats}
            bookings={
              bookings
            }
            arrangements={
              arrangements
            }
          />
        )}

        {/* =================================================
            SETTINGS
        ================================================= */}

        {active ===
          "settings" && (
          <SettingsPanel
            t={t}
            role={role}
            language={
              language
            }
            onLanguageChange={
              changeLanguage
            }
          />
        )}
      </main>

      {/* =====================================================
          ADD / EDIT ARRANGEMENT MODAL
          UPLOAD JE OVDE POTPUNO FUNKCIONALAN
      ===================================================== */}

      {showArrangement &&
        role !== "user" && (
          <ArrangementModal
            t={t}
            form={form}
            setForm={setForm}
            editingId={
              editingId
            }
            onClose={() =>
              setShowArrangement(
                false
              )
            }
            onSave={
              saveArrangement
            }
            onUpload={
              handleUpload
            }
          />
        )}
    </div>
  );
}
/* =========================================================
   EMPLOYEE DASHBOARD
   PLANETWAY EMPLOYEE WORKSPACE
========================================================= */

function EmployeeDashboard({
  arrangements,
  bookings,
  onNewArrangement,
  onArrangements,
  onBookings,
  onLogout,
}) {
  const [active, setActive] = useState("dashboard");

  const currentUser =
    getCurrentUser();

  const employeeEmail =
    currentUser?.email ||
    "employee@planetway.com";

  const employeeName =
    currentUser?.name ||
    "PlanetWay Employee";

  const totalSales =
    bookings.reduce(
      (sum, item) =>
        sum +
        Number(item.price || 0),
      0
    );

  const pendingArrangements =
    arrangements.filter(
      (item) =>
        item.status ===
          "Pending Approval" ||
        item.status ===
          "pending" ||
        item.status ===
          "Submitted"
    ).length;

  const approvedArrangements =
    arrangements.filter(
      (item) =>
        item.status ===
          "Approved" ||
        item.status ===
          "approved" ||
        item.status ===
          "Published" ||
        item.status ===
          "published"
    ).length;

  function openSection(section) {
    setActive(section);
  }

  function handleNewArrangement() {
    if (onNewArrangement) {
      onNewArrangement();
    }
  }

  function handleArrangements() {
    setActive("arrangements");

    if (onArrangements) {
      onArrangements();
    }
  }

  function handleBookings() {
    setActive("bookings");

    if (onBookings) {
      onBookings();
    }
  }

  return (
    <div className="employee-workspace">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="employee-sidebar">

        <div className="employee-brand">
          <div className="employee-brand-mark">
            P
          </div>

          <div>
            <strong>
              PLANETWAY
            </strong>

            <span>
              EMPLOYEE WORKSPACE
            </span>
          </div>
        </div>

        <div className="employee-user-mini">
          <div className="employee-avatar">
            {employeeName
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <strong>
              {employeeName}
            </strong>

            <span>
              Travel Employee
            </span>
          </div>
        </div>

        <nav className="employee-navigation">

          <button
            type="button"
            className={
              active === "dashboard"
                ? "employee-nav-button active"
                : "employee-nav-button"
            }
            onClick={() =>
              openSection(
                "dashboard"
              )
            }
          >
            <span>⌂</span>
            <strong>
              Dashboard
            </strong>
          </button>

          <button
            type="button"
            className={
              active === "arrangements"
                ? "employee-nav-button active"
                : "employee-nav-button"
            }
            onClick={
              handleArrangements
            }
          >
            <span>✈</span>
            <strong>
              My Arrangements
            </strong>
          </button>

          <button
            type="button"
            className="employee-nav-button"
            onClick={
              handleNewArrangement
            }
          >
            <span>ï¼‹</span>
            <strong>
              New Arrangement
            </strong>
          </button>

          <button
            type="button"
            className={
              active === "bookings"
                ? "employee-nav-button active"
                : "employee-nav-button"
            }
            onClick={
              handleBookings
            }
          >
            <span>▣</span>
            <strong>
              My Bookings
            </strong>
          </button>

          <button
            type="button"
            className={
              active === "customers"
                ? "employee-nav-button active"
                : "employee-nav-button"
            }
            onClick={() =>
              openSection(
                "customers"
              )
            }
          >
            <span>♙</span>
            <strong>
              Customers
            </strong>
          </button>

          <button
            type="button"
            className={
              active === "sales"
                ? "employee-nav-button active"
                : "employee-nav-button"
            }
            onClick={() =>
              openSection(
                "sales"
              )
            }
          >
            <span>€</span>
            <strong>
              Sales
            </strong>
          </button>

          <button
            type="button"
            className={
              active === "performance"
                ? "employee-nav-button active"
                : "employee-nav-button"
            }
            onClick={() =>
              openSection(
                "performance"
              )
            }
          >
            <span>↗</span>
            <strong>
              My Performance
            </strong>
          </button>

          <button
            type="button"
            className={
              active === "notifications"
                ? "employee-nav-button active"
                : "employee-nav-button"
            }
            onClick={() =>
              openSection(
                "notifications"
              )
            }
          >
            <span>🔔</span>
            <strong>
              Notifications
            </strong>

            {pendingArrangements >
              0 && (
              <em>
                {pendingArrangements}
              </em>
            )}
          </button>

          <button
            type="button"
            className={
              active === "settings"
                ? "employee-nav-button active"
                : "employee-nav-button"
            }
            onClick={() =>
              openSection(
                "settings"
              )
            }
          >
            <span>⚙</span>
            <strong>
              Settings
            </strong>
          </button>

        </nav>

        <div className="employee-sidebar-bottom">

          <button
            type="button"
            onClick={() =>
              (window.location.href =
                "/")
            }
          >
            ← Back to PlanetWay
          </button>

          <button
            type="button"
            onClick={onLogout}
          >
            ⇥ Logout
          </button>

        </div>

      </aside>

      {/* =================================================
          MAIN AREA
      ================================================= */}

      <main className="employee-main">

        {/* TOP BAR */}

        <header className="employee-topbar">

          <div className="employee-search">

            <span>
              🔍
            </span>

            <input
              type="text"
              placeholder="Search arrangements, bookings, customers..."
            />

          </div>

          <div className="employee-top-actions">

            <button
              type="button"
              className="employee-icon-button"
              onClick={() =>
                openSection(
                  "notifications"
                )
              }
            >
              🔔

              {pendingArrangements >
                0 && (
                <i>
                  {pendingArrangements}
                </i>
              )}
            </button>

            <div className="employee-profile">

              <div className="employee-avatar">
                {employeeName
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>
                <strong>
                  {employeeName}
                </strong>

                <span>
                  {employeeEmail}
                </span>
              </div>

            </div>

          </div>

        </header>

        {/* =================================================
            DASHBOARD HOME
        ================================================= */}

        {active ===
          "dashboard" && (
          <section className="employee-content">

            <div className="employee-welcome">

              <div>
                <span>
                  PLANETWAY EMPLOYEE WORKSPACE
                </span>

                <h1>
                  Good morning,{" "}
                  {employeeName}
                  👋
                </h1>

                <p>
                  Manage your travel
                  arrangements, bookings
                  and customers from one
                  professional workspace.
                </p>
              </div>

              <button
                type="button"
                className="employee-primary-button"
                onClick={
                  handleNewArrangement
                }
              >
                ï¼‹ New Arrangement
              </button>

            </div>

            {/* KPI CARDS */}

            <div className="employee-kpi-grid">

              <div className="employee-kpi-card">

                <div className="employee-kpi-icon">
                  ✈
                </div>

                <div>
                  <span>
                    My Arrangements
                  </span>

                  <strong>
                    {
                      arrangements.length
                    }
                  </strong>

                  <small>
                    Travel products
                  </small>
                </div>

              </div>

              <div className="employee-kpi-card">

                <div className="employee-kpi-icon">
                  ◷
                </div>

                <div>
                  <span>
                    Pending Approval
                  </span>

                  <strong>
                    {
                      pendingArrangements
                    }
                  </strong>

                  <small>
                    Awaiting admin review
                  </small>
                </div>

              </div>

              <div className="employee-kpi-card">

                <div className="employee-kpi-icon">
                  ✓
                </div>

                <div>
                  <span>
                    Approved
                  </span>

                  <strong>
                    {
                      approvedArrangements
                    }
                  </strong>

                  <small>
                    Available on PlanetWay
                  </small>
                </div>

              </div>

              <div className="employee-kpi-card">

                <div className="employee-kpi-icon">
                  €
                </div>

                <div>
                  <span>
                    My Sales
                  </span>

                  <strong>
                    €
                    {totalSales.toLocaleString(
                      "en-US"
                    )}
                  </strong>

                  <small>
                    Total booking value
                  </small>
                </div>

              </div>

            </div>

            {/* QUICK ACTIONS */}

            <div className="employee-section-grid">

              <div className="employee-panel">

                <div className="employee-panel-header">

                  <div>
                    <span>
                      QUICK ACTIONS
                    </span>

                    <h2>
                      Work faster
                    </h2>
                  </div>

                </div>

                <div className="employee-quick-actions">

                  <button
                    type="button"
                    onClick={
                      handleNewArrangement
                    }
                  >
                    <b>ï¼‹</b>

                    <span>
                      <strong>
                        New Arrangement
                      </strong>

                      <small>
                        Create a new travel
                        product
                      </small>
                    </span>

                    <em>
                      →
                    </em>
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleArrangements
                    }
                  >
                    <b>✈</b>

                    <span>
                      <strong>
                        My Arrangements
                      </strong>

                      <small>
                        Manage your travel
                        products
                      </small>
                    </span>

                    <em>
                      →
                    </em>
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleBookings
                    }
                  >
                    <b>▣</b>

                    <span>
                      <strong>
                        My Bookings
                      </strong>

                      <small>
                        Review customer
                        reservations
                      </small>
                    </span>

                    <em>
                      →
                    </em>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openSection(
                        "performance"
                      )
                    }
                  >
                    <b>↗</b>

                    <span>
                      <strong>
                        My Performance
                      </strong>

                      <small>
                        View your sales
                        performance
                      </small>
                    </span>

                    <em>
                      →
                    </em>
                  </button>

                </div>

              </div>

              {/* STATUS PANEL */}

              <div className="employee-panel">

                <div className="employee-panel-header">

                  <div>
                    <span>
                      WORK STATUS
                    </span>

                    <h2>
                      Today
                    </h2>
                  </div>

                  <div className="employee-online">
                    <i />
                    Online
                  </div>

                </div>

                <div className="employee-status-list">

                  <div>
                    <span>
                      Arrangements
                    </span>

                    <strong>
                      {
                        arrangements.length
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Pending approval
                    </span>

                    <strong>
                      {
                        pendingArrangements
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Approved
                    </span>

                    <strong>
                      {
                        approvedArrangements
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Bookings
                    </span>

                    <strong>
                      {
                        bookings.length
                      }
                    </strong>
                  </div>

                </div>

              </div>

            </div>

            {/* RECENT ARRANGEMENTS */}

            <div className="employee-panel employee-recent-panel">

              <div className="employee-panel-header">

                <div>
                  <span>
                    TRAVEL PRODUCTS
                  </span>

                  <h2>
                    Recent Arrangements
                  </h2>
                </div>

                <button
                  type="button"
                  className="employee-text-button"
                  onClick={
                    handleArrangements
                  }
                >
                  View all →
                </button>

              </div>

              {arrangements.length ===
              0 ? (
                <div className="employee-empty">

                  <div>
                    ✈
                  </div>

                  <h3>
                    No arrangements yet
                  </h3>

                  <p>
                    Create your first
                    PlanetWay travel
                    arrangement.
                  </p>

                  <button
                    type="button"
                    onClick={
                      handleNewArrangement
                    }
                  >
                    ï¼‹ Create Arrangement
                  </button>

                </div>
              ) : (
                <div className="employee-recent-list">

                  {arrangements
                    .slice(0, 5)
                    .map(
                      (item) => (
                        <div
                          className="employee-recent-row"
                          key={
                            item.id
                          }
                        >

                          <div className="employee-recent-image">

                            <img
                              src={
                                item.images?.[0] ||
                                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80"
                              }
                              alt=""
                            />

                          </div>

                          <div className="employee-recent-info">

                            <strong>
                              {
                                item.title ||
                                item.name ||
                                "Travel Arrangement"
                              }
                            </strong>

                            <span>
                              {
                                item.destination ||
                                "-"
                              }
                            </span>

                          </div>

                          <strong>
                            €
                            {item.price ||
                              0}
                          </strong>

                          <span
                            className={
                              item.status ===
                                "Approved" ||
                              item.status ===
                                "Published"
                                ? "employee-status approved"
                                : item.status ===
                                    "Rejected"
                                  ? "employee-status rejected"
                                  : "employee-status pending"
                            }
                          >
                            {
                              item.status ||
                              "Draft"
                            }
                          </span>

                        </div>
                      )
                    )}

                </div>
              )}

            </div>

          </section>
        )}

      </main>

    </div>
  );
}
/* =========================================================
   PLANETWAY USER DASHBOARD
   MODERN GLOBAL TRAVEL WORKSPACE
========================================================= */

function UserDashboard() {
  const currentUser = getCurrentUser();
  const userName = currentUser?.name || "Marko Bazovic";
  const userEmail = currentUser?.email || "traveler@planetway.com";

  const [active, setActive] = useState("home");
  const [mode, setMode] = useState("flights");
  const [destination, setDestination] = useState("");
  const [from, setFrom] = useState("Belgrade (BEG)");
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [travelClass, setTravelClass] = useState("Economy");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [savedIds, setSavedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("planetway_saved_items") || "[]");
    } catch {
      return [];
    }
  });
  const [showMore, setShowMore] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [currency, setCurrency] = useState("EUR");

  const demoDestinations = [
    { name: "Paris", country: "France", price: 299, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85" },
    { name: "Rome", country: "Italy", price: 249, image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=900&q=85" },
    { name: "Santorini", country: "Greece", price: 399, image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=85" },
    { name: "Dubai", country: "UAE", price: 599, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85" },
    { name: "New York", country: "USA", price: 499, image: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?auto=format&fit=crop&w=900&q=85" },
    { name: "Bangkok", country: "Thailand", price: 349, image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=85" },
  ];

  const allArrangements = useMemo(() => {
    const local = getStoredArrangements();
    const approved = local.filter((item) => {
      const approvedStatus = ["Approved", "approved", "Published", "published"].includes(item?.status);
      const published = item?.published === true || item?.published === undefined;
      return approvedStatus && published;
    });
    return [...demoPackages, ...approved];
  }, [hasSearched, active]);

  const results = useMemo(() => {
    const query = (searchQuery || destination).trim().toLowerCase();
    if (!query) return allArrangements;
    return allArrangements.filter((item) =>
      [item.title, item.name, item.destination, item.country, item.city, item.description, item.type, item.category]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [allArrangements, searchQuery, destination]);

  const bookings = getStoredBookings();
  const paidBookings = bookings.filter((item) => item?.paymentStatus === "paid" || item?.paymentStatus === "Paid" || item?.status === "Confirmed");
  const totalSpent = bookings.reduce((sum, item) => sum + Number(item?.price || 0), 0);

  function persistSaved(next) {
    setSavedIds(next);
    localStorage.setItem("planetway_saved_items", JSON.stringify(next));
  }

  function toggleSaved(item) {
    const id = item.id || item.title || item.name;
    const next = savedIds.includes(id)
      ? savedIds.filter((value) => value !== id)
      : [...savedIds, id];
    persistSaved(next);
  }

  function runSearch(nextMode = mode) {
    setMode(nextMode);
    setSearchQuery(destination.trim());
    setHasSearched(true);
    setActive("search");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectDestination(name) {
    setDestination(name);
    setSearchQuery(name);
    setHasSearched(true);
    setActive("search");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function createUserBooking(item) {
    const existing = getStoredBookings();
    const newBooking = {
      id: `booking-${Date.now()}`,
      title: item.title || item.name || "PlanetWay Travel",
      destination: item.destination || item.city || item.country || item.name || "",
      price: item.price ?? item.amount ?? 0,
      type: item.type || item.category || "Travel",
      status: "Pending",
      paymentStatus: "pending",
      createdAt: new Date().toISOString(),
      customerEmail: userEmail,
      customerName: userName,
    };

    try {
      await setDoc(doc(db, "bookings", newBooking.id), {
        ...newBooking,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("USER BOOKING FIREBASE ERROR:", error);
      alert("Rezervacija nije mogla da se sačuva. Proverite Firebase konekciju.");
      return;
    }

    saveStorage(BOOKING_KEY, [...existing, newBooking]);
    window.location.href = `/payment?booking_id=${encodeURIComponent(newBooking.id)}`;
  }

  function logoutUser() {
    localStorage.removeItem(USER_KEY);
    window.location.href = "/";
  }

  function openBooking(booking) {
    if (!booking?.id) return;
    window.location.href = `/payment?booking_id=${encodeURIComponent(booking.id)}`;
  }

  function openSection(section) {
    setActive(section);
    setShowMore(false);
    setShowProfile(false);
    setShowNotifications(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const navItems = [
    ["home", "Home"],
    ["flights", "Flights"],
    ["hotels", "Hotels"],
    ["packages", "Packages"],
    ["cars", "Rent a Car"],
    ["experiences", "Experiences"],
  ];

  return (
    <div className="user-portal">
      <header className="user-portal-header">
        <button className="user-brand" type="button" onClick={() => openSection("home")}>
          <span className="user-brand-globe">✈</span>
          <span><strong>PlanetWay</strong><small>TRAVEL THE WORLD TOGETHER</small></span>
        </button>

        <nav className="user-main-nav">
          {navItems.map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={active === key || (key !== "home" && active === "search" && mode === key) ? "active" : ""}
              onClick={() => {
                if (key === "home") openSection("home");
                else {
                  setMode(key);
                  openSection("search");
                  setHasSearched(false);
                }
              }}
            >
              {label}
            </button>
          ))}
          <div className="user-more-wrap">
            <button type="button" onClick={() => setShowMore((v) => !v)}>More⌄</button>
            {showMore && (
              <div className="user-more-menu">
                <button type="button" onClick={() => openSection("saved")}>♡ Saved Items</button>
                <button type="button" onClick={() => openSection("loyalty")}>★ Loyalty Program</button>
                <button type="button" onClick={() => openSection("support")}>◉ Travel Support</button>
                <button type="button" onClick={() => openSection("exchange")}>€ Exchange Rates</button>
              </div>
            )}
          </div>
        </nav>

        <div className="user-header-actions">
          <button type="button" className="user-header-small" onClick={() => setCurrency(currency === "EUR" ? "USD" : "EUR")}>{currency}</button>
          <button type="button" className="user-header-small" onClick={() => setShowNotifications((v) => !v)}>♧<i>{bookings.length}</i></button>
          <div className="user-profile-wrap">
            <button type="button" className="user-profile-button" onClick={() => setShowProfile((v) => !v)}>
              <span className="user-avatar">{userName.charAt(0).toUpperCase()}</span>
              <span><strong>{userName}</strong><small>User Account</small></span>⌄
            </button>
            {showProfile && (
              <div className="user-profile-menu">
                <button type="button" onClick={() => openSection("profile")}>My Profile</button>
                <button type="button" onClick={() => openSection("bookings")}>My Bookings</button>
                <button type="button" onClick={() => openSection("saved")}>Saved Items</button>
                <button type="button" onClick={logoutUser}>Logout</button>
              </div>
            )}
          </div>
        </div>

        {showNotifications && (
          <div className="user-notification-popover">
            <strong>Notifications</strong>
            {bookings.length ? <p>You have {bookings.length} booking{bookings.length === 1 ? "" : "s"} in your account.</p> : <p>No new notifications.</p>}
            <button type="button" onClick={() => openSection("bookings")}>View bookings →</button>
          </div>
        )}
      </header>

      {active === "home" && (
        <>
          <section className="user-hero">
            <div className="user-hero-content">
              <span>PLANETWAY TRAVEL PLATFORM</span>
              <h1>Discover Your<br /><b>Next Adventure.</b></h1>
              <p>Flights, hotels, cars and unforgettable experiences in one intelligent global platform.</p>
            </div>
          </section>

          <section className="user-search-card">
            <div className="user-search-tabs">
              {[["flights","✈","Flights"],["hotels","▣","Hotels"],["packages","◆","Packages"],["cars","▰","Rent a Car"],["experiences","◇","Experiences"]].map(([key, icon, label]) => (
                <button key={key} type="button" className={mode === key ? "active" : ""} onClick={() => { setMode(key); setHasSearched(false); }}><b>{icon}</b>{label}</button>
              ))}
              <span className="multi-city">⇄ Multi-city</span>
            </div>
            <div className="user-search-row">
              <label><span>From</span><input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Departure" /></label>
              <button type="button" className="swap-button" onClick={() => { const x = from; setFrom(destination); setDestination(x); }}>⇄</button>
              <label><span>{mode === "cars" ? "Pick-up" : "To"}</span><input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder={mode === "hotels" ? "City or hotel" : "Destination"} /></label>
              <label><span>{mode === "hotels" ? "Check-in" : mode === "cars" ? "Pick-up Date" : "Departure"}</span><input type="date" value={departure} onChange={(e) => setDeparture(e.target.value)} /></label>
              <label><span>{mode === "hotels" ? "Check-out" : mode === "cars" ? "Drop-off Date" : "Return"}</span><input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} /></label>
              <label className="compact-field"><span>Adults</span><select value={adults} onChange={(e) => setAdults(Number(e.target.value))}>{[1,2,3,4,5,6,7,8,9].map(n => <option key={n}>{n}</option>)}</select></label>
              <label className="compact-field"><span>Children</span><select value={children} onChange={(e) => setChildren(Number(e.target.value))}>{[0,1,2,3,4,5].map(n => <option key={n}>{n}</option>)}</select></label>
              <label className="class-field"><span>Class</span><select value={travelClass} onChange={(e) => setTravelClass(e.target.value)}><option>Economy</option><option>Premium Economy</option><option>Business</option><option>First Class</option></select></label>
              <button type="button" className="user-search-button" onClick={() => runSearch(mode)}>⌕ Search</button>
            </div>
          </section>

          <section className="user-service-grid">
            {[['✈','Flights','Best prices','flights'],['▣','Hotels','Worldwide stays','hotels'],['◆','Packages','Flight + Hotel','packages'],['▰','Rent a Car','Freedom to explore','cars'],['◇','Experiences','Tours & Activities','experiences'],['◈','eSIM','Stay connected','esim'],['♢','Insurance','Travel protection','insurance'],['▤','Airport Transfer','Get there easily','transfer']].map(([icon,title,sub,key]) => (
              <button type="button" key={title} onClick={() => openSection(key === "esim" || key === "insurance" || key === "transfer" ? key : "search")}>
                <b>{icon}</b><strong>{title}</strong><span>{sub}</span>
              </button>
            ))}
          </section>

          <section className="user-section">
            <div className="user-section-heading"><div><span>EXPLORE THE WORLD</span><h2>Top Destinations</h2><p>Popular destinations from PlanetWay travelers</p></div><button type="button" onClick={() => openSection("destinations")}>View all destinations →</button></div>
            <div className="destination-grid">
              {demoDestinations.map((item) => <button type="button" className="destination-card" key={item.name} onClick={() => selectDestination(item.name)}><span className="destination-heart" onClick={(e) => { e.stopPropagation(); toggleSaved(item); }}>{savedIds.includes(item.name) ? "♥" : "♡"}</span><img src={item.image} alt={item.name} /><div><strong>{item.name}</strong><span>{item.country}</span><b>from €{item.price}</b></div></button>)}
            </div>
          </section>

          <section className="user-promo-grid">
            <button type="button" className="promo-blue" onClick={() => openSection("navigator")}><b>◉</b><span><small>PLANETWAY AI</small><strong>AI Travel Navigator</strong><em>Tell us where you want to go. Our AI will help you plan your trip.</em></span><u>Try AI Navigator →</u></button>
            <button type="button" className="promo-green" onClick={() => openSection("sustainable")}><b>♧</b><span><small>SUSTAINABLE TRAVEL</small><strong>Travel with a lighter footprint</strong><em>Explore destinations and experiences with responsible travel options.</em></span><u>Learn More →</u></button>
            <button type="button" className="promo-gold" onClick={() => openSection("deals")}><b>%</b><span><small>PLANETWAY DEALS</small><strong>Exclusive travel offers</strong><em>Discover special offers available to PlanetWay travelers.</em></span><u>View Deals →</u></button>
          </section>

          <section className="user-tools-row">
            <button type="button" onClick={() => openSection("destinations")}>◫ <strong>Map Explorer</strong><span>Find destinations visually</span></button>
            <button type="button" onClick={() => openSection("exchange")}>€ <strong>Exchange Rates</strong><span>Check your currency</span></button>
            <button type="button" onClick={() => openSection("support")}>◉ <strong>Travel Support</strong><span>24/7 assistance</span></button>
            <button type="button" onClick={() => openSection("bookings")}>▣ <strong>My Bookings</strong><span>Manage reservations</span></button>
            <button type="button" onClick={() => openSection("saved")}>♡ <strong>Saved Items</strong><span>Your favorites</span></button>
            <button type="button" onClick={() => openSection("loyalty")}>★ <strong>Loyalty Program</strong><span>Rewards & benefits</span></button>
          </section>
        </>
      )}

      {active === "search" && (
        <main className="user-page-body">
          <section className="user-inner-search">
            <div><span>SEARCH</span><h1>Find your next trip</h1><p>Search PlanetWay arrangements by destination, service or travel type.</p></div>
            <div className="user-search-row user-search-row-inner">
              <label><span>From</span><input value={from} onChange={(e) => setFrom(e.target.value)} /></label>
              <label><span>Destination</span><input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Paris, Rome, Santorini..." /></label>
              <label><span>Departure</span><input type="date" value={departure} onChange={(e) => setDeparture(e.target.value)} /></label>
              <label><span>Return</span><input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} /></label>
              <button type="button" className="user-search-button" onClick={() => runSearch(mode)}>⌕ Search</button>
            </div>
          </section>
          <section className="user-results-section">
            <div className="user-section-heading"><div><span>SEARCH RESULTS</span><h2>{hasSearched ? `Results for ${searchQuery || "all destinations"}` : "Available PlanetWay arrangements"}</h2></div><button type="button" onClick={() => openSection("home")}>← Back to home</button></div>
            <div className="user-result-grid">
              {results.length ? results.map((item, index) => <article className="user-result-card" key={`${item.id || item.title || item.name}-${index}`}><img src={item.images?.[0] || item.image || demoDestinations[index % demoDestinations.length].image} alt="" /><div><span>{item.type || item.category || "Travel"}</span><h3>{item.title || item.name || item.destination || "PlanetWay Travel"}</h3><p>{item.destination || item.city || item.country || "Worldwide"}</p><strong>€{item.price ?? 0}</strong><div><button type="button" onClick={() => toggleSaved(item)}>{savedIds.includes(item.id || item.title || item.name) ? "♥ Saved" : "♡ Save"}</button><button type="button" className="book-now" onClick={() => createUserBooking(item)}>View & Book →</button></div></div></article>) : <div className="user-empty-state"><b>⌕</b><h3>No results found</h3><p>Try another destination or browse our popular destinations.</p><button type="button" onClick={() => openSection("home")}>Explore destinations</button></div>}
            </div>
          </section>
        </main>
      )}

      {active === "bookings" && (
        <main className="user-page-body"><section className="user-content-panel"><span>MY TRAVEL</span><h1>My Bookings</h1><p>Manage your reservations and continue to payment when needed.</p>{bookings.length ? <div className="user-booking-list">{bookings.map((booking) => <div className="user-booking-row" key={booking.id}><div className="booking-icon">✈</div><div><strong>{booking.title}</strong><span>{booking.destination} · {booking.type}</span></div><b>€{booking.price || 0}</b><em className={booking.status === "Confirmed" || booking.paymentStatus === "paid" ? "confirmed" : "pending"}>{booking.status || "Pending"}</em><button type="button" onClick={() => openBooking(booking)}>{booking.paymentStatus === "paid" || booking.status === "Confirmed" ? "View" : "Continue Payment →"}</button></div>)}</div> : <div className="user-empty-state"><b>▣</b><h3>No bookings yet</h3><p>Your reservations will appear here after you book a PlanetWay travel product.</p><button type="button" onClick={() => openSection("home")}>Find a trip</button></div>}</section></main>
      )}

      {active === "saved" && (
        <main className="user-page-body"><section className="user-content-panel"><span>YOUR COLLECTION</span><h1>Saved Items</h1><p>Keep your favorite destinations and travel products in one place.</p><div className="user-result-grid">{allArrangements.filter(item => savedIds.includes(item.id || item.title || item.name)).length ? allArrangements.filter(item => savedIds.includes(item.id || item.title || item.name)).map((item,index) => <article className="user-result-card" key={item.id || item.title || index}><img src={item.images?.[0] || item.image || demoDestinations[index % demoDestinations.length].image} alt="" /><div><span>{item.type || "Travel"}</span><h3>{item.title || item.name}</h3><p>{item.destination}</p><strong>€{item.price || 0}</strong><div><button type="button" onClick={() => toggleSaved(item)}>♥ Remove</button><button type="button" className="book-now" onClick={() => createUserBooking(item)}>Book →</button></div></div></article>) : <div className="user-empty-state"><b>♡</b><h3>No saved items</h3><p>Tap the heart on any destination or travel product to save it.</p><button type="button" onClick={() => openSection("home")}>Explore now</button></div>}</div></section></main>
      )}

      {active === "profile" && (
        <main className="user-page-body"><section className="user-content-panel user-profile-page"><span>ACCOUNT</span><h1>My Profile</h1><p>Manage your PlanetWay traveler account.</p><div className="profile-large"><span>{userName.charAt(0).toUpperCase()}</span><div><h2>{userName}</h2><p>{userEmail}</p><em>PlanetWay Traveler</em></div></div><div className="profile-actions"><button type="button" onClick={() => alert("Profile editing will be connected to Firebase Authentication.")}>Edit Profile</button><button type="button" onClick={() => alert("Password reset instructions will be sent to your email.")}>Change Password</button><button type="button" onClick={logoutUser}>Logout</button></div></section></main>
      )}

      {active === "destinations" && <main className="user-page-body"><section className="user-content-panel"><span>DISCOVER</span><h1>Explore Destinations</h1><p>Choose a destination and start your search.</p><div className="destination-grid">{demoDestinations.map(item => <button type="button" className="destination-card" key={item.name} onClick={() => selectDestination(item.name)}><img src={item.image} alt={item.name}/><div><strong>{item.name}</strong><span>{item.country}</span><b>from €{item.price}</b></div></button>)}</div></section></main>}

      {active === "support" && <main className="user-page-body"><section className="user-content-panel"><span>PLANETWAY CARE</span><h1>Travel Support</h1><p>Our support team is here to help with bookings and travel questions.</p><div className="support-cards"><button type="button" onClick={() => window.location.href = "mailto:support@planetway.com"}>✉ <strong>Email Support</strong><span>support@planetway.com</span></button><button type="button" onClick={() => alert("PlanetWay support chat will open here.")}>◉ <strong>Live Chat</strong><span>Available 24/7</span></button><button type="button" onClick={() => alert("Help Center will open here.")}>? <strong>Help Center</strong><span>Travel & booking help</span></button></div></section></main>}

      {active === "exchange" && <main className="user-page-body"><section className="user-content-panel"><span>TRAVEL TOOLS</span><h1>Exchange Rates</h1><p>Use EUR as your PlanetWay display currency or switch to USD.</p><div className="exchange-box"><strong>€ 1 EUR</strong><span>≈</span><b>{currency === "EUR" ? "1.00 EUR" : "1.17 USD"}</b><button type="button" onClick={() => setCurrency(currency === "EUR" ? "USD" : "EUR")}>Switch to {currency === "EUR" ? "USD" : "EUR"}</button></div></section></main>}

      {active === "loyalty" && <main className="user-page-body"><section className="user-content-panel"><span>PLANETWAY REWARDS</span><h1>Loyalty Program</h1><p>Earn points from eligible PlanetWay bookings and travel services.</p><div className="loyalty-card"><div><small>YOUR TRAVEL POINTS</small><strong>{Math.round(totalSpent)}</strong><span>Points</span></div><div><small>MEMBER STATUS</small><strong>Traveler</strong><span>{paidBookings.length} completed booking{paidBookings.length === 1 ? "" : "s"}</span></div></div><button type="button" className="primary-wide" onClick={() => openSection("search")}>Start earning points →</button></section></main>}

      {active === "navigator" && <main className="user-page-body"><section className="user-content-panel navigator-panel"><span>PLANETWAY AI</span><h1>AI Travel Navigator</h1><p>Tell PlanetWay where you want to go and we will help you discover matching travel options.</p><div className="navigator-form"><input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="e.g. beach holiday in Greece under €800"/><button type="button" onClick={() => runSearch("packages")}>Find my trip →</button></div></section></main>}

      {active === "sustainable" && <main className="user-page-body"><section className="user-content-panel"><span>PLANETWAY RESPONSIBLE TRAVEL</span><h1>Sustainable Travel</h1><p>Explore travel choices that can help you make more responsible decisions.</p><div className="info-feature"><b>♧</b><div><h2>Travel thoughtfully</h2><p>Choose local experiences, consider direct routes where practical, and support destinations and businesses in a responsible way.</p></div></div></section></main>}

      {active === "deals" && <main className="user-page-body"><section className="user-content-panel"><span>PLANETWAY DEALS</span><h1>Exclusive Offers</h1><p>Explore available PlanetWay travel arrangements and current offers.</p><button type="button" className="primary-wide" onClick={() => runSearch("packages")}>View available offers →</button></section></main>}

      {active === "esim" && <main className="user-page-body"><section className="user-content-panel"><span>CONNECTIVITY</span><h1>Global eSIM</h1><p>Keep your phone connected while traveling.</p><div className="info-feature"><b>◈</b><div><h2>Travel connectivity</h2><p>eSIM plans and activation will be connected here.</p></div></div><button type="button" className="primary-wide" onClick={() => alert("eSIM marketplace will be connected here.")}>Explore eSIM plans →</button></section></main>}

      {active === "insurance" && <main className="user-page-body"><section className="user-content-panel"><span>TRAVEL PROTECTION</span><h1>Travel Insurance</h1><p>Review travel protection options before your journey.</p><div className="info-feature"><b>♢</b><div><h2>Travel protection</h2><p>Insurance products will be connected here.</p></div></div><button type="button" className="primary-wide" onClick={() => alert("Insurance marketplace will be connected here.")}>Explore insurance →</button></section></main>}

      {active === "transfer" && <main className="user-page-body"><section className="user-content-panel"><span>GROUND TRANSPORT</span><h1>Airport Transfer</h1><p>Plan your transfer from airport to hotel and back.</p><button type="button" className="primary-wide" onClick={() => runSearch("cars")}>Find transfer options →</button></section></main>}

      <footer className="user-portal-footer"><span>© {new Date().getFullYear()} PlanetWay</span><button type="button" onClick={() => alert("PlanetWay Terms & Travel Rules")}>Travel Terms</button><button type="button" onClick={() => alert("PlanetWay Privacy Policy")}>Privacy</button><button type="button" onClick={() => window.location.href = "mailto:support@planetway.com"}>Support</button><button type="button" onClick={logoutUser}>Logout</button></footer>
    </div>
  );
}

/* =========================================================
   USER DASHBOARD SEARCH
========================================================= */

function UserDashboardSearch({
  t,
}) {
  const [mode, setMode] =
    useState("flights");

  const [destination, setDestination] =
    useState("");

  const [departure, setDeparture] =
    useState("");

  const [returnDate, setReturnDate] =
    useState("");

  const [checkIn, setCheckIn] =
    useState("");

  const [checkOut, setCheckOut] =
    useState("");

  const [pickupDate, setPickupDate] =
    useState("");

  const [dropoffDate, setDropoffDate] =
    useState("");

  const [dropoffLocation, setDropoffLocation] =
    useState("");

  const [travelClass, setTravelClass] =
    useState("Economy");

  const [adults, setAdults] =
    useState(1);

  const [children, setChildren] =
    useState(0);

  const [rooms, setRooms] =
    useState(1);

  const [searchText, setSearchText] =
    useState("");

  const [hasSearched, setHasSearched] =
    useState(false);

  const arrangements =
    getStoredArrangements();

  const approved =
    arrangements.filter(
      (item) => {
        const status =
          item.status ===
            "Approved" ||
          item.status ===
            "approved" ||
          item.status ===
            "Published" ||
          item.status ===
            "published";

        return (
          status &&
          (item.published ===
            true ||
            item.published ===
              undefined)
        );
      }
    );

  const results = [
    ...demoPackages,
    ...approved,
  ].filter((item) => {
    const query =
      searchText
        .trim()
        .toLowerCase();

    if (!query) return true;

    return [
      item.title,
      item.name,
      item.destination,
      item.country,
      item.city,
      item.description,
      item.type,
      item.category,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  function search() {
    setSearchText(
      destination.trim()
    );

    setHasSearched(true);
  }

  async function createBooking(item) {
    const bookings = getStoredBookings();

    const newBooking = {
      id: `booking-${Date.now()}`,
      title: item.title || item.name || "PlanetWay Travel",
      destination:
        item.destination ||
        item.city ||
        item.country ||
        "",
      price: item.price ?? item.amount ?? 0,
      type: item.type || item.category || "Travel",
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    try {
      await setDoc(
        doc(db, "bookings", newBooking.id),
        {
          ...newBooking,
          createdAt: serverTimestamp(),
        }
      );

      console.log(
        "FIREBASE BOOKING CREATED:",
        newBooking.id
      );
    } catch (error) {
      console.error(
        "FIREBASE BOOKING ERROR:",
        error
      );

      alert(
        "Rezervacija nije mogla da se sačuva u Firebase."
      );

      return;
    }

    saveStorage(
      BOOKING_KEY,
      [...bookings, newBooking]
    );

    window.location.href =
      `/payment?booking_id=${encodeURIComponent(
        newBooking.id
      )}`;
  }
  return (
    <section className="dash-card user-dashboard-search">
      <div className="card-heading">
        <div>
          <span>
            PLANETWAY TRAVEL SEARCH
          </span>

          <h3>
            {t("whereGo")}
          </h3>
        </div>
      </div>

      <SearchPanel
        t={t}
        mode={mode}
        setMode={(next) => {
          setMode(next);
          setHasSearched(false);
        }}
        destination={
          destination
        }
        setDestination={
          setDestination
        }
        departure={
          departure
        }
        setDeparture={
          setDeparture
        }
        returnDate={
          returnDate
        }
        setReturnDate={
          setReturnDate
        }
        checkIn={checkIn}
        setCheckIn={
          setCheckIn
        }
        checkOut={
          checkOut
        }
        setCheckOut={
          setCheckOut
        }
        pickupDate={
          pickupDate
        }
        setPickupDate={
          setPickupDate
        }
        dropoffDate={
          dropoffDate
        }
        setDropoffDate={
          setDropoffDate
        }
        dropoffLocation={
          dropoffLocation
        }
        setDropoffLocation={
          setDropoffLocation
        }
        travelClass={
          travelClass
        }
        setTravelClass={
          setTravelClass
        }
        adults={adults}
        setAdults={
          setAdults
        }
        children={
          children
        }
        setChildren={
          setChildren
        }
        rooms={rooms}
        setRooms={setRooms}
        onSearch={search}
      />

      {hasSearched && (
        <div
          style={{
            marginTop: 24,
          }}
        >
          <div className="pw-section-heading">
            <span>
              {t(
                "searchResults"
              )}
            </span>

            <h2>
              {t(
                "availableArrangements"
              )}
            </h2>

            <p>
              {t(
                "matchingDestination"
              )}
            </p>
          </div>

          <div className="pw-results-grid">
            {results.length ===
            0 ? (
              <div className="pw-empty">
                <h3>
                  {t(
                    "noResults"
                  )}
                </h3>

                <p>
                  {t(
                    "tryAnother"
                  )}
                </p>
              </div>
            ) : (
              results.map(
                (item, index) => (
                  <article
                    className="pw-result-card"
                    key={
                      item.id ||
                      `${item.title}-${index}`
                    }
                  >
                    <img
                      src={
                        item.images?.[0] ||
                        item.image ||
                        item.coverImage ||
                        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
                      }
                      alt={
                        item.title ||
                        item.name ||
                        "PlanetWay"
                      }
                    />

                    <div className="pw-result-content">
                      <span>
                        {item.type ||
                          item.category ||
                          t(
                            "arrangement"
                          )}
                      </span>

                      <h3>
                        {item.title ||
                          item.name}
                      </h3>

                      <p>
                        {item.destination ||
                          item.city ||
                          item.country}
                      </p>

                      <strong>
                        €
                        {item.price ??
                          0}
                      </strong>

                      <button
                        type="button"
                        onClick={() =>
                          createBooking(
                            item
                          )
                        }
                      >
                        {t(
                          "viewBook"
                        )}
                      </button>
                    </div>
                  </article>
                )
              )
            )}
          </div>
        </div>
      )}
    </section>
  );
}
/* =========================================================
   EMPLOYEE DASHBOARD
========================================================= */

function AdminDashboardOverview({
  t,
  stats,
  onNewArrangement,
  onArrangements,
  onBookings,
}) {
  const destinations = [
    {
      name: "Paris",
      country: "France",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85",
    },
    {
      name: "Rome",
      country: "Italy",
      image:
        "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=900&q=85",
    },
    {
      name: "Santorini",
      country: "Greece",
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85",
    },
    {
      name: "New York",
      country: "USA",
      image:
        "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=900&q=85",
    },
    {
      name: "Dubai",
      country: "UAE",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85",
    },
  ];

  return (
    <section className="pw-admin-overview">
      <div className="pw-admin-hero">
        <img
          src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1800&q=90"
          alt="Santorini"
        />
        <div className="pw-admin-hero-overlay" />
        <div className="pw-admin-hero-content">
          <span>PLANETWAY CONTROL CENTER</span>
          <h2>Welcome back, Marko!</h2>
          <p>
            Your PlanetWay workspace — manage bookings, customers
            and grow your travel business from one place.
          </p>
          <div className="pw-admin-hero-actions">
            <button type="button" onClick={onNewArrangement}>
              + New Arrangement
            </button>
            <button
              type="button"
              className="ghost"
              onClick={onBookings}
            >
              View Bookings
            </button>
          </div>
        </div>
      </div>

      <div className="pw-admin-search-card">
        <div className="pw-admin-service-tabs">
          <button className="active" type="button">✈ Flights</button>
          <button type="button">▣ Hotels</button>
          <button type="button">🚗 Rent a Car</button>
          <button type="button">✦ Packages</button>
        </div>

        <div className="pw-admin-search-grid">
          <label>
            <span>DESTINATION</span>
            <input placeholder="Where do you want to go?" />
          </label>
          <label>
            <span>DEPARTURE</span>
            <input type="date" />
          </label>
          <label>
            <span>RETURN</span>
            <input type="date" />
          </label>
          <label>
            <span>CLASS</span>
            <select defaultValue="Economy">
              <option>Economy</option>
              <option>Premium Economy</option>
              <option>Business</option>
              <option>First Class</option>
            </select>
          </label>
          <label className="traveler-field">
            <span>TRAVELERS</span>
            <div>− <strong>1</strong> +</div>
          </label>
          <button type="button" className="pw-admin-search-btn">
            Search Flights →
          </button>
        </div>

        <div className="pw-admin-popular">
          <span>Popular:</span>
          <button type="button">Paris</button>
          <button type="button">Rome</button>
          <button type="button">Santorini</button>
          <button type="button">Dubai</button>
          <button type="button">New York</button>
        </div>
      </div>

      <div className="pw-admin-stats">
        <div className="pw-admin-stat">
          <span className="stat-icon">✦</span>
          <div>
            <small>MY ARRANGEMENTS</small>
            <strong>{stats.arrangements}</strong>
            <em>Published & managed offers</em>
          </div>
        </div>
        <div className="pw-admin-stat">
          <span className="stat-icon">◫</span>
          <div>
            <small>TOTAL BOOKINGS</small>
            <strong>{stats.bookings}</strong>
            <em>Platform reservations</em>
          </div>
        </div>
        <div className="pw-admin-stat">
          <span className="stat-icon">♙</span>
          <div>
            <small>USERS</small>
            <strong>{stats.users}</strong>
            <em>Registered platform users</em>
          </div>
        </div>
        <div className="pw-admin-stat">
          <span className="stat-icon">€</span>
          <div>
            <small>TOTAL REVENUE</small>
            <strong>€{stats.revenue}</strong>
            <em>Recorded booking value</em>
          </div>
        </div>
      </div>

      <div className="pw-admin-main-grid">
        <div>
          <div className="pw-admin-section-heading">
            <div>
              <span>EXPLORE</span>
              <h3>Top Destinations</h3>
            </div>
            <button type="button" onClick={onArrangements}>
              View all →
            </button>
          </div>

          <div className="pw-admin-destinations">
            {destinations.map((destination) => (
              <article key={destination.name}>
                <img src={destination.image} alt={destination.name} />
                <div>
                  <strong>{destination.name}</strong>
                  <span>{destination.country}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="pw-admin-quick">
          <div className="pw-admin-section-heading">
            <div>
              <span>CONTROL CENTER</span>
              <h3>Quick Actions</h3>
            </div>
          </div>

          <button type="button" onClick={onNewArrangement}>
            <span>ï¼‹</span>
            <div>
              <strong>New Booking</strong>
              <small>Create a new customer reservation</small>
            </div>
            <b>→</b>
          </button>

          <button type="button" onClick={onBookings}>
            <span>◫</span>
            <div>
              <strong>Manage Bookings</strong>
              <small>Review and manage reservations</small>
            </div>
            <b>→</b>
          </button>

          <button type="button" onClick={() => window.dispatchEvent(new Event("planetway:analytics"))}>
            <span>↗</span>
            <div>
              <strong>View Analytics</strong>
              <small>Track PlanetWay performance</small>
            </div>
            <b>→</b>
          </button>

          <button type="button" onClick={() => alert("PlanetWay Customer Support")}>
            <span>?</span>
            <div>
              <strong>Customer Support</strong>
              <small>Support and platform assistance</small>
            </div>
            <b>→</b>
          </button>
        </aside>
      </div>

      <div className="pw-admin-promo">
        <div>
          <span>PLANETWAY GLOBAL TRAVEL PLATFORM</span>
          <h3>Explore the world. Manage it from one place.</h3>
          <p>
            Flights, hotels, cars, packages, bookings and business
            operations — connected in one PlanetWay workspace.
          </p>
          <button type="button" onClick={() => (window.location.href = "/")}>
            Back to PlanetWay →
          </button>
        </div>
        <div className="promo-orb">P</div>
      </div>
    </section>
  );
}

function DashboardOverview({
  t,
  stats,
  role,
  onNewArrangement,
  onArrangements,
  onBookings,
}) {
  if (role === "admin") {
    return (
      <AdminDashboardOverview
        t={t}
        stats={stats}
        onNewArrangement={onNewArrangement}
        onArrangements={onArrangements}
        onBookings={onBookings}
      />
    );
  }

  return (
    <>
      <div className="dash-welcome">
        <div>
          <span>
            {t("welcome")}
          </span>

          <h2>
            {t("workspace")}
          </h2>

          <p>
            {role ===
            "user"
              ? t(
                  "userWorkspace"
                )
              : t(
                  "staffWorkspace"
                )}
          </p>
        </div>

        {role !==
          "user" && (
          <button
            type="button"
            onClick={
              onNewArrangement
            }
          >
            +{" "}
            {t(
              "newArrangement"
            )}
          </button>
        )}
      </div>

      {role === "user" && (
        <UserDashboardSearch
          t={t}
        />
      )}

      <div className="stats-grid">
        <StatCard
          icon="◈"
          title={t(
            "arrangements"
          )}
          value={
            stats.arrangements
          }
        />

        <StatCard
          icon="◫"
          title={t(
            "bookings"
          )}
          value={
            stats.bookings
          }
        />

        <StatCard
          icon="♙"
          title={t(
            "users"
          )}
          value={stats.users}
        />

        <StatCard
          icon="€"
          title={t(
            "revenue"
          )}
          value={`€${stats.revenue}`}
        />
      </div>

      <div className="dashboard-columns">
        <div className="dash-card">
          <div className="card-heading">
            <span>
              {t(
                "actions"
              )}
            </span>

            <h3>
              {t(
                "manageArrangements"
              )}
            </h3>
          </div>

          <div className="quick-grid">
            {role !==
              "user" && (
              <>
                <button
                  type="button"
                  onClick={
                    onNewArrangement
                  }
                >
                  <b>↑</b>
                  {t(
                    "uploadArrangement"
                  )}
                </button>

                <button
                  type="button"
                  onClick={
                    onArrangements
                  }
                >
                  <b>▣</b>
                  {t(
                    "manageArrangements"
                  )}
                </button>
              </>
            )}

            <button
              type="button"
              onClick={
                onBookings
              }
            >
              <b>◫</b>
              {t(
                "viewBookings"
              )}
            </button>

            <button
              type="button"
              onClick={() =>
                alert(
                  t(
                    "aiReady"
                  )
                )
              }
            >
              <b>AI</b>
              {t(
                "aiNavigator"
              )}
            </button>
          </div>
        </div>

        <div className="dash-card ai-dashboard-card">
          <div className="dashboard-ai-ball">
            AI
          </div>

          <span>
            PLANETWAY AI NAVIGATOR
          </span>

          <h3>
            {t("aiTitle")}
          </h3>

          <p>
            {t("aiText")}
          </p>

          <button
            type="button"
            onClick={() =>
              alert(
                t(
                  "aiReady"
                )
              )
            }
          >
            {t(
              "openNavigator"
            )} →
          </button>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   ARRANGEMENTS PANEL
========================================================= */

function ArrangementsPanel({
  t,
  arrangements,
  onNew,
  onEdit,
  onDelete,
  onToggle,
}) {
  const pending = arrangements.filter(
    (item) =>
      item.status === "Pending Approval" ||
      item.status === "pending" ||
      item.status === "Submitted"
  );

  const approved = arrangements.filter(
    (item) =>
      item.status === "Approved" ||
      item.status === "approved" ||
      item.status === "Published" ||
      item.status === "published"
  );

  const rejected = arrangements.filter(
    (item) =>
      item.status === "Rejected" ||
      item.status === "rejected"
  );

  const getStatusLabel = (item) => {
    if (
      item.status === "Approved" ||
      item.status === "approved" ||
      item.status === "Published" ||
      item.status === "published"
    ) {
      return "Approved";
    }

    if (
      item.status === "Rejected" ||
      item.status === "rejected"
    ) {
      return "Rejected";
    }

    if (
      item.status === "Pending Approval" ||
      item.status === "pending" ||
      item.status === "Submitted"
    ) {
      return "Pending Approval";
    }

    return item.published
      ? "Published"
      : "Draft";
  };

  const statusClass = (item) => {
    const status = getStatusLabel(item);

    if (status === "Approved") {
      return "status published";
    }

    if (status === "Rejected") {
      return "status draft";
    }

    if (status === "Pending Approval") {
      return "status pending";
    }

    return item.published
      ? "status published"
      : "status draft";
  };

  return (
    <section>
      <div className="panel-top">
        <div>
          <span>ADMIN CONTROL CENTER</span>

          <h2>
            Travel Arrangements
          </h2>

          <p>
            Review, approve and manage all PlanetWay travel arrangements.
          </p>
        </div>

        <button
          type="button"
          className="primary-action"
          onClick={onNew}
        >
          + Add Arrangement
        </button>
      </div>

      {/* =================================================
          APPROVAL SUMMARY
      ================================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div className="stat-card">
          <span>Pending Approval</span>
          <strong>{pending.length}</strong>
          <small>
            Awaiting admin review
          </small>
        </div>

        <div className="stat-card">
          <span>Approved</span>
          <strong>{approved.length}</strong>
          <small>
            Visible in Packages
          </small>
        </div>

        <div className="stat-card">
          <span>Rejected</span>
          <strong>{rejected.length}</strong>
          <small>
            Returned to employee
          </small>
        </div>
      </div>

      {/* =================================================
          ARRANGEMENT LIST
      ================================================= */}

      {arrangements.length === 0 ? (
        <div className="empty-dashboard">
          <div className="empty-icon">
            ↑
          </div>

          <h3>
            No arrangements yet
          </h3>

          <p>
            Create the first PlanetWay travel arrangement.
          </p>

          <button
            type="button"
            onClick={onNew}
          >
            Add Arrangement
          </button>
        </div>
      ) : (
        <div className="arrangement-table">

          <div className="table-head">
            <span>
              Arrangement
            </span>

            <span>
              Destination
            </span>

            <span>
              Price
            </span>

            <span>
              Status
            </span>

            <span>
              Actions
            </span>
          </div>

          {arrangements.map(
            (item) => (
              <div
                className="table-row"
                key={item.id}
              >

                {/* ARRANGEMENT */}

                <div className="arrangement-name">
                  <img
                    src={
                      item.images?.[0] ||
                      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80"
                    }
                    alt=""
                  />

                  <div>
                    <strong>
                      {item.title ||
                        item.name ||
                        "Untitled Arrangement"}
                    </strong>

                    <small>
                      {item.type ||
                        "Travel Arrangement"}
                    </small>
                  </div>
                </div>

                {/* DESTINATION */}

                <span>
                  {item.destination ||
                    "-"}
                </span>

                {/* PRICE */}

                <strong>
                  €
                  {item.price || 0}
                </strong>

                {/* STATUS */}

                <span
                  className={statusClass(
                    item
                  )}
                >
                  {getStatusLabel(
                    item
                  )}
                </span>

                {/* ACTIONS */}

                <div className="row-actions">

                  {/* PENDING */}

                  {(
                    item.status ===
                      "Pending Approval" ||
                    item.status ===
                      "pending" ||
                    item.status ===
                      "Submitted"
                  ) && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          onToggle({
                            ...item,
                            __approvalAction:
                              "approve",
                          })
                        }
                      >
                        ✓ Approve
                      </button>

                      <button
                        type="button"
                        className="danger"
                        onClick={() =>
                          onToggle({
                            ...item,
                            __approvalAction:
                              "reject",
                          })
                        }
                      >
                        ✕ Reject
                      </button>
                    </>
                  )}

                  {/* APPROVED */}

                  {(
                    item.status ===
                      "Approved" ||
                    item.status ===
                      "approved" ||
                    item.status ===
                      "Published" ||
                    item.status ===
                      "published"
                  ) && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          onEdit(item)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onToggle(item)
                        }
                      >
                        Unpublish
                      </button>
                    </>
                  )}

                  {/* REJECTED */}

                  {(
                    item.status ===
                      "Rejected" ||
                    item.status ===
                      "rejected"
                  ) && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          onEdit(item)
                        }
                      >
                        Review
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onDelete(item.id)
                        }
                        className="danger"
                      >
                        Delete
                      </button>
                    </>
                  )}

                  {/* DRAFT */}

                  {(!item.status ||
                    item.status ===
                      "Draft") && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          onEdit(item)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onToggle(item)
                        }
                      >
                        Publish
                      </button>

                      <button
                        type="button"
                        className="danger"
                        onClick={() =>
                          onDelete(item.id)
                        }
                      >
                        Delete
                      </button>
                    </>
                  )}

                </div>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}
/* =========================================================
   BOOKINGS PANEL
========================================================= */

function BookingsPanel({
  t,
  bookings,
  onRefresh,
}) {
  function deleteBooking(
    id
  ) {
    if (
      !window.confirm(
        t(
          "bookingDelete"
        )
      )
    ) {
      return;
    }

    saveStorage(
      BOOKING_KEY,
      getStoredBookings().filter(
        (item) =>
          item.id !== id
      )
    );

    onRefresh();
  }

  return (
    <section>
      <div className="panel-top">
        <div>
          <span>
            {t(
              "reservations"
            )}
          </span>

          <h2>
            {t(
              "bookingManagement"
            )}
          </h2>

          <p>
            {t(
              "allBookings"
            )}
          </p>
        </div>
      </div>

      {bookings.length ===
      0 ? (
        <div className="empty-dashboard">
          <div className="empty-icon">
            ◫
          </div>

          <h3>
            {t(
              "noBookings"
            )}
          </h3>

          <p>
            {t(
              "customerBookings"
            )}
          </p>
        </div>
      ) : (
        <div className="booking-list">
          {bookings.map(
            (booking) => (
              <div
                className="booking-card"
                key={
                  booking.id
                }
              >
                <div className="booking-icon">
                  ◫
                </div>

                <div>
                  <strong>
                    {
                      booking.title
                    }
                  </strong>

                  <span>
                    {
                      booking.destination
                    }
                  </span>
                </div>

                <strong>
                  €
                  {
                    booking.price
                  }
                </strong>

                <span className="status pending">
                  {
                    booking.status
                  }
                </span>

                <button
                  type="button"
                  className="danger-outline"
                  onClick={() =>
                    deleteBooking(
                      booking.id
                    )
                  }
                >
                  {t(
                    "delete"
                  )}
                </button>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}

/* =========================================================
   USERS
========================================================= */

function UsersPanel({
  t,
}) {
  const users = [
    {
      name:
        "PlanetWay Administrator",
      email:
        "admin@planetway.com",
      role: "Admin",
    },
    {
      name:
        "PlanetWay Employee",
      email:
        "employee@planetway.com",
      role: "Employee",
    },
    {
      name:
        "Demo Customer",
      email:
        "customer@example.com",
      role: "User",
    },
  ];

  return (
    <section>
      <div className="panel-top">
        <div>
          <span>
            {t(
              "administration"
            )}
          </span>

          <h2>
            {t("users")}
          </h2>

          <p>
            {t(
              "manageRoles"
            )}
          </p>
        </div>

        <button
          type="button"
          className="primary-action"
          onClick={() =>
            alert(
              t(
                "addUser"
              )
            )
          }
        >
          +{" "}
          {t("addUser")}
        </button>
      </div>

      <div className="user-table">
        {users.map(
          (user) => (
            <div
              className="user-row"
              key={user.email}
            >
              <div className="user-row-avatar">
                {user.name
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>
                <strong>
                  {user.name}
                </strong>

                <span>
                  {user.email}
                </span>
              </div>

              <span className="role-chip">
                {user.role}
              </span>

              <button
                type="button"
                onClick={() =>
                  alert(
                    `${t(
                      "manage"
                    )}: ${
                      user.email
                    }`
                  )
                }
              >
                {t(
                  "manage"
                )}
              </button>
            </div>
          )
        )}
      </div>
    </section>
  );
}

/* =========================================================
   ANALYTICS
========================================================= */

function AnalyticsPanel({
  t,
  stats,
  bookings,
  arrangements,
}) {
  return (
    <section>
      <div className="panel-top">
        <div>
          <span>
            {t(
              "businessIntelligence"
            )}
          </span>

          <h2>
            {t(
              "planetwayAnalytics"
            )}
          </h2>

          <p>
            {t(
              "performance"
            )}
          </p>
        </div>
      </div>

      <div className="analytics-grid">
        <AnalyticsCard
          title={t(
            "totalArrangements"
          )}
          value={
            stats.arrangements
          }
          percent={Math.min(
            100,
            Math.max(
              10,
              stats.arrangements *
                10
            )
          )}
        />

        <AnalyticsCard
          title={t(
            "totalBookings"
          )}
          value={
            stats.bookings
          }
          percent={Math.min(
            100,
            Math.max(
              10,
              stats.bookings *
                15
            )
          )}
        />

        <AnalyticsCard
          title={t("revenue")}
          value={`€${stats.revenue}`}
          percent={
            stats.revenue >
            0
              ? 75
              : 8
          }
        />
      </div>

      <div className="dash-card analytics-large">
        <div className="card-heading">
          <span>
            {t(
              "platformActivity"
            )}
          </span>

          <h3>
            {t(
              "growthOverview"
            )}
          </h3>
        </div>

        <div className="fake-chart">
          {[
            35, 55, 42, 70,
            60, 84, 76, 94,
          ].map(
            (
              height,
              index
            ) => (
              <div
                className="chart-column"
                key={index}
              >
                <i
                  style={{
                    height: `${height}%`,
                  }}
                />

                <small>
                  {index + 1}
                </small>
              </div>
            )
          )}
        </div>

        <div className="analytics-summary">
          <span>
            {
              arrangements.length
            }{" "}
            {t(
              "arrangements"
            )}
          </span>

          <span>
            {
              bookings.length
            }{" "}
            {t(
              "bookings"
            )}
          </span>

          <span>
            PlanetWay Global
            Platform
          </span>
        </div>
      </div>
    </section>
  );
}

function AnalyticsCard({
  title,
  value,
  percent,
}) {
  return (
    <div className="analytics-card">
      <span>
        {title}
      </span>

      <strong>
        {value}
      </strong>

      <div className="analytics-bar">
        <i
          style={{
            width: `${percent}%`,
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   SETTINGS
========================================================= */

function SettingsPanel({
  t,
  role,
  language,
  onLanguageChange,
}) {
  const [
    notifications,
    setNotifications,
  ] = useState(true);

  return (
    <section>
      <div className="panel-top">
        <div>
          <span>
            {t(
              "platformSettings"
            )}
          </span>

          <h2>
            {t(
              "settings"
            )}
          </h2>

          <p>
            {t(
              "configureWorkspace"
            )}
          </p>
        </div>
      </div>

      <div className="settings-card">
        <div className="setting-row">
          <div>
            <strong>
              {t(
                "platformLanguage"
              )}
            </strong>

            <span>
              {t(
                "chooseDashboard"
              )}
            </span>
          </div>

          <select
            value={language}
            onChange={(event) =>
              onLanguageChange(
                event.target
                  .value
              )
            }
          >
            {languageOptions.map(
              (item) => (
                <option
                  key={
                    item.code
                  }
                  value={
                    item.code
                  }
                >
                  {
                    item.flag
                  }{" "}
                  {
                    item.native
                  }
                </option>
              )
            )}
          </select>
        </div>

        <div className="setting-row">
          <div>
            <strong>
              {t(
                "notifications"
              )}
            </strong>

            <span>
              {t("alerts")}
            </span>
          </div>

          <button
            type="button"
            className={
              notifications
                ? "toggle active"
                : "toggle"
            }
            onClick={() =>
              setNotifications(
                !notifications
              )
            }
          >
            <i />
          </button>
        </div>

        <div className="setting-row">
          <div>
            <strong>
              {t(
                "accountRole"
              )}
            </strong>

            <span>
              {t(
                "currentAccess"
              )}
            </span>
          </div>

          <b className="role-chip">
            {role.toUpperCase()}
          </b>
        </div>
      </div>

      <div className="settings-modules">
        <button
          type="button"
          onClick={() =>
            alert(
              t("esim")
            )
          }
        >
          <b>◉</b>

          {t("esim")}

          <small>
            {t(
              "connectivity"
            )}
          </small>
        </button>

        <button
          type="button"
          onClick={() =>
            alert(
              t(
                "insurance"
              )
            )
          }
        >
          <b>◆</b>

          {t(
            "insurance"
          )}

          <small>
            {t(
              "travelProtection"
            )}
          </small>
        </button>

        <button
          type="button"
          onClick={() =>
            alert(
              t(
                "exchange"
              )
            )
          }
        >
          <b>$</b>

          {t(
            "exchange"
          )}

          <small>
            {t(
              "currency"
            )}
          </small>
        </button>

        <button
          type="button"
          onClick={() =>
            alert(
              t("map")
            )
          }
        >
          <b>⌖</b>

          {t("map")}

          <small>
            {t(
              "destinationsModule"
            )}
          </small>
        </button>
      </div>
    </section>
  );
}

/* =========================================================
   ARRANGEMENT MODAL
   UPLOAD ARANŽMANA + IMAGE
========================================================= */

function ArrangementModal({
  t,
  form,
  setForm,
  editingId,
  onClose,
  onSave,
  onUpload,
}) {
  return (
    <div className="dash-modal-overlay">
      <div className="dash-modal">
        <button
          type="button"
          className="dash-modal-close"
          onClick={
            onClose
          }
        >
          ×
        </button>

        <div className="dash-modal-title">
          <span>
            PLANETWAY ARRANGEMENT
          </span>

          <h2>
            {editingId
              ? t(
                  "editArrangement"
                )
              : t(
                  "createArrangement"
                )}
          </h2>
        </div>

        <div className="arrangement-form">
          <FormInput
            label={t(
              "arrangementTitle"
            )}
            value={
              form.title
            }
            onChange={(value) =>
              setForm({
                ...form,
                title: value,
              })
            }
            placeholder="Luxury Paris Escape"
          />

          <FormInput
            label={t(
              "destination"
            )}
            value={
              form.destination
            }
            onChange={(value) =>
              setForm({
                ...form,
                destination:
                  value,
              })
            }
            placeholder="Paris, France"
          />

          <div className="form-grid">
            <FormInput
              label={t(
                "country"
              )}
              value={
                form.country
              }
              onChange={(value) =>
                setForm({
                  ...form,
                  country:
                    value,
                })
              }
            />

            <FormInput
              label={t(
                "city"
              )}
              value={
                form.city
              }
              onChange={(value) =>
                setForm({
                  ...form,
                  city: value,
                })
              }
            />

            <FormInput
              label={`${t(
                "price"
              )} €`}
              type="number"
              value={
                form.price
              }
              onChange={(value) =>
                setForm({
                  ...form,
                  price: value,
                })
              }
            />

            <div className="form-control">
              <label>
                {t("type")}
              </label>

              <select
                value={
                  form.type
                }
                onChange={(
                  event
                ) =>
                  setForm({
                    ...form,
                    type:
                      event
                        .target
                        .value,
                  })
                }
              >
                <option>
                  {t(
                    "package"
                  )}
                </option>

                <option>
                  {t(
                    "hotel"
                  )}
                </option>

                <option>
                  {t(
                    "flight"
                  )}
                </option>

                <option>
                  {t("car")}
                </option>

                <option>
                  {t(
                    "experience"
                  )}
                </option>

                <option>
                  {t(
                    "transfer"
                  )}
                </option>
              </select>
            </div>
          </div>

          <div className="form-control">
            <label>
              {t(
                "description"
              )}
            </label>

            <textarea
              value={
                form.description
              }
              onChange={(event) =>
                setForm({
                  ...form,
                  description:
                    event
                      .target
                      .value,
                })
              }
              placeholder={t(
                "describe"
              )}
            />
          </div>

          {/* =================================================
              UPLOAD
          ================================================= */}

          <div className="upload-area">
            <input
              id="planetway-upload"
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              onChange={
                onUpload
              }
              hidden
            />

            <label
              htmlFor="planetway-upload"
              className="upload-button"
            >
              <span className="upload-arrow">
                ↑
              </span>

              <strong>
                {t(
                  "uploadImage"
                )}
              </strong>

              <small>
                {t(
                  "clickUpload"
                )}
              </small>
            </label>

            {form.image && (
              <img
                src={
                  form.image
                }
                alt={t(
                  "preview"
                )}
                className="upload-preview"
              />
            )}
          </div>

          <div className="form-grid">
            <div className="form-control">
              <label>
                {t(
                  "status"
                )}
              </label>

              <select
                value={
                  form.status
                }
                onChange={(
                  event
                ) =>
                  setForm({
                    ...form,
                    status:
                      event
                        .target
                        .value,
                  })
                }
              >
                <option>
                  {t(
                    "draft"
                  )}
                </option>

                <option>
                  Pending
                </option>

                <option>
                  Approved
                </option>

                <option>
                  {t(
                    "published"
                  )}
                </option>
              </select>
            </div>

            <label className="publish-check">
              <input
                type="checkbox"
                checked={
                  form.published
                }
                onChange={(event) =>
                  setForm({
                    ...form,
                    published:
                      event
                        .target
                        .checked,
                  })
                }
              />

              <span>
                {t(
                  "publishPlanetWay"
                )}
              </span>
            </label>
          </div>

          <button
            type="button"
            className="save-arrangement"
            onClick={
              onSave
            }
          >
            {editingId
              ? t(
                  "saveChanges"
                )
              : t(
                  "create"
                )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="pw-field">
      <label>
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(
            event.target
              .value
          )
        }
        placeholder={
          placeholder
        }
      />
    </div>
  );
}

function Counter({
  label,
  value,
  onMinus,
  onPlus,
}) {
  return (
    <div className="pw-field pw-counter">
      <label>
        {label}
      </label>

      <div className="counter-control">
        <button
          type="button"
          onClick={
            onMinus
          }
        >
          −
        </button>

        <strong>
          {value}
        </strong>

        <button
          type="button"
          onClick={
            onPlus
          }
        >
          +
        </button>
      </div>
    </div>
  );
}

function ServiceCard({
  icon,
  title,
  text,
  onClick,
}) {
  return (
    <button
      type="button"
      className="service-card"
      onClick={onClick}
    >
      <span className="service-icon">
        {icon}
      </span>

      <strong>
        {title}
      </strong>

      <small>
        {text}
      </small>
    </button>
  );
}

function StatCard({
  icon,
  title,
  value,
}) {
  return (
    <div className="stat-card">
      <span>
        {icon}
      </span>

      <div>
        <small>
          {title}
        </small>

        <strong>
          {value}
        </strong>
      </div>
    </div>
  );
}

function DashButton({
  icon,
  text,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      className={
        active
          ? "dash-menu-button active"
          : "dash-menu-button"
      }
      onClick={onClick}
    >
      <b>
        {icon}
      </b>

      <span>
        {text}
      </span>
    </button>
  );
}

function FormInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="form-control">
      <label>
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(
            event.target
              .value
          )
        }
        placeholder={
          placeholder
        }
      />
    </div>
  );
}

function Modal({
  title,
  children,
  onClose,
}) {
  return (
    <div className="pw-modal-overlay">
      <div className="pw-modal">
        <button
          type="button"
          className="pw-modal-close"
          onClick={onClose}
        >
          ×
        </button>

        <h2>
          {title}
        </h2>

        {children}
      </div>
    </div>
  );
}

/* =========================================================
   DASHBOARD STYLES
   ZADRŽANI CLASS NAME-OVI IZ TVOG PRETHODNOG APP.CSS
========================================================= */

function PaymentPage() {
  const language = getStoredLanguage();
  const tr = (key) => getTranslation(language, key);
  const [booking, setBooking] = useState(null);
  const [method, setMethod] = useState("stripe");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("booking_id");
    const found = getStoredBookings().find((item) => item.id === id);
    setBooking(found || null);
  }, []);

  if (!booking) {
    return (
      <main className="planetway-payment-page">
        <div className="planetway-payment-page-card">
          <div className="planetway-payment-kicker">PLANETWAY TRAVEL</div>
          <h1>Payment</h1>
          <p>Booking not found. Please return to PlanetWay and select an offer again.</p>
          <button className="planetway-pay-now-button" onClick={() => { window.location.href = "/"; }}>
            Back to PlanetWay
          </button>
        </div>
      </main>
    );
  }

  const amount = Number(booking.price ?? booking.amount ?? 0);

  async function payNow() {
    setError("");
    setMessage("");

    if (method === "bank") {
      saveStorage(
        BOOKING_KEY,
        getStoredBookings().map((b) =>
          b.id === booking.id
            ? { ...b, status: "Pending", paymentStatus: "pending_bank_transfer", paymentMethod: "bank_transfer" }
            : b
        )
      );
      setMessage(`${tr("bankPending")} Booking ID: ${booking.id}`);
      return;
    }

    try {
      setLoading(true);
      const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

      if (method === "paypal") {
        const response = await fetch(`${base}/api/paypal/create-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            bookingId: booking.id,
            returnUrl: window.location.origin,
            cancelUrl: window.location.origin,
          }),
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.id) {
          throw new Error(data.error || "PayPal order could not be created.");
        }

        const approvalLink = data.links?.find((link) => link.rel === "approve" || link.rel === "payer-action");
        if (!approvalLink?.href) {
          throw new Error("PayPal approval link is missing.");
        }

        saveStorage(
          BOOKING_KEY,
          getStoredBookings().map((b) =>
            b.id === booking.id
              ? { ...b, status: "Payment Started", paymentStatus: "paypal_created", paymentMethod: "paypal", paypalOrderId: data.id }
              : b
          )
        );

        window.location.href = approvalLink.href;
        return;
      }

      const payload = {
        bookingId: booking.id,
        amount,
        currency: "EUR",
        title: booking.title || "PlanetWay Travel",
        destination: booking.destination || "",
        customerEmail: getCurrentUser()?.email || "",
        paymentMethod: method,
        successUrl: `${window.location.origin}/?payment=success&booking_id=${encodeURIComponent(booking.id)}`,
        cancelUrl: `${window.location.origin}/payment?payment=cancel&booking_id=${encodeURIComponent(booking.id)}`,
      };

      let response = await fetch(`${base}/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        response = await fetch(`${base}/api/create-payment-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Payment session could not be created.");
      }

      saveStorage(
        BOOKING_KEY,
        getStoredBookings().map((b) =>
          b.id === booking.id
            ? { ...b, status: "Payment Started", paymentStatus: "checkout_created", paymentMethod: method }
            : b
        )
      );

      window.location.href = data.url;
    } catch (e) {
      setError(e?.message || "Payment failed to start.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="planetway-payment-page" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="planetway-payment-page-card">
        <button
          className="planetway-payment-back"
          type="button"
          onClick={() => { window.location.href = "/"; }}
        >
          ← PlanetWay
        </button>

        <div className="planetway-payment-kicker">PLANETWAY TRAVEL</div>
        <h1>{tr("bookingSummary")}</h1>
        <p className="planetway-payment-subtitle">Secure payment for your travel booking</p>

        <div className="planetway-payment-summary">
          <div><span>Booking ID</span><strong>{booking.id}</strong></div>
          <div><span>Travel</span><strong>{booking.title || "PlanetWay Travel"}</strong></div>
          <div><span>{tr("destination")}</span><strong>{booking.destination || "—"}</strong></div>
          <div><span>{tr("total")}</span><strong>€{amount.toFixed(2)}</strong></div>
        </div>

        <h2>{tr("paymentMethod")}</h2>
        <div className="planetway-payment-methods">
          {[
            ["stripe", "💳", "cardStripe"],
            ["wallet", "ï£¿ / G", "wallets"],
            ["paypal", "🅿", "paypal"],
            ["bank", "🏦", "bankTransfer"],
          ].map(([id, icon, key]) => (
            <button
              type="button"
              key={id}
              className={method === id ? "active" : ""}
              onClick={() => { setMethod(id); setMessage(""); setError(""); }}
            >
              <span className="planetway-payment-method-icon">{icon}</span>
              <span>{tr(key)}</span>
            </button>
          ))}
        </div>

        <div className="planetway-payment-security">
          <strong>🔒 Secure payment</strong>
          <span>{method === "bank" ? tr("bankPending") : tr("stripeSecure")}</span>
        </div>

        {message && <div className="planetway-payment-message">{message}</div>}
        {error && <div className="planetway-payment-error">{error}</div>}

        <button
          type="button"
          className="planetway-pay-now-button"
          disabled={loading}
          onClick={payNow}
        >
          {loading ? "Processing…" : method === "bank" ? "Confirm Bank Transfer" : `${tr("payNow")} • €${amount.toFixed(2)}`}
        </button>

        <p className="planetway-payment-footer-note">
          By continuing, you will be redirected to the secure payment provider.
        </p>
      </div>
    </main>
  );
}

function PaymentModal({ booking, onClose }) {
  const language = getStoredLanguage();
  const tr = (key) => getTranslation(language, key);
  const [method, setMethod] = useState("stripe");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const amount = Number(booking?.price ?? booking?.amount ?? 0);

  async function payNow() {
    setError("");
    setMessage("");

    if (!booking?.id) {
      setError("Missing booking ID.");
      return;
    }

    if (method === "bank") {
      saveStorage(
        BOOKING_KEY,
        getStoredBookings().map((b) =>
          b.id === booking.id
            ? { ...b, status: "Pending", paymentStatus: "pending_bank_transfer", paymentMethod: "bank_transfer" }
            : b
        )
      );
      setMessage("Bank transfer selected. Use Booking ID " + booking.id + " as payment reference. The reservation stays pending until verified.");
      return;
    }

    try {
      setLoading(true);
      const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

      if (method === "paypal") {
        const response = await fetch(`${base}/api/paypal/create-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            bookingId: booking.id,
            returnUrl: window.location.origin,
            cancelUrl: window.location.origin,
          }),
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.id) {
          throw new Error(data.error || "PayPal order could not be created.");
        }

        const approvalLink = data.links?.find((link) => link.rel === "approve" || link.rel === "payer-action");
        if (!approvalLink?.href) {
          throw new Error("PayPal approval link is missing.");
        }

        saveStorage(
          BOOKING_KEY,
          getStoredBookings().map((b) =>
            b.id === booking.id
              ? { ...b, status: "Payment Started", paymentStatus: "paypal_created", paymentMethod: "paypal", paypalOrderId: data.id }
              : b
          )
        );

        window.location.href = approvalLink.href;
        return;
      }

      const payload = {
        bookingId: booking.id,
        amount,
        currency: "EUR",
        title: booking.title || "PlanetWay Travel",
        destination: booking.destination || "",
        customerEmail: getCurrentUser()?.email || "",
        paymentMethod: method,
        successUrl: `${window.location.origin}/?payment=success&booking_id=${encodeURIComponent(booking.id)}`,
        cancelUrl: `${window.location.origin}/?payment=cancel&booking_id=${encodeURIComponent(booking.id)}`,
      };

      let response = await fetch(`${base}/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        response = await fetch(`${base}/api/create-payment-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Payment session could not be created.");
      }

      saveStorage(
        BOOKING_KEY,
        getStoredBookings().map((b) =>
          b.id === booking.id
            ? { ...b, status: "Payment Started", paymentStatus: "checkout_created", paymentMethod: method }
            : b
        )
      );

      window.location.href = data.url;
    } catch (e) {
      setError(e?.message || "Payment failed to start.");
    } finally {
      setLoading(false);
    }
  }

  return <div className="planetway-payment-overlay">
    <div className="planetway-payment-modal">
      <button className="planetway-payment-close" type="button" onClick={onClose}>×</button>
      <div className="planetway-payment-kicker">PLANETWAY TRAVEL</div>
      <h2>{tr("bookingSummary")}</h2>
      <p>{booking?.title || "PlanetWay Travel"}</p>
      <div className="planetway-payment-summary">
        <div><span>Booking ID</span><strong>{booking?.id}</strong></div>
        <div><span>{tr("destination")}</span><strong>{booking?.destination || "—"}</strong></div>
        <div><span>{tr("total")}</span><strong>€{amount.toFixed(2)}</strong></div>
      </div>
      <h3>{tr("paymentMethod")}</h3>
      <div className="planetway-payment-methods">
        {[['stripe','💳','cardStripe'],['wallet','/G','wallets'],['paypal','🅿','paypal'],['bank','🏦','bankTransfer']].map(([id,icon,key]) => <button type="button" key={id} className={method===id?'active':''} onClick={()=>setMethod(id)}>{icon} {tr(key)}</button>)}
      </div>
      <p className="planetway-payment-note">{method === "bank" ? tr("bankPending") : tr("stripeSecure")}</p>
      {message && <div className="planetway-payment-message">{message}</div>}
      {error && <div className="planetway-payment-error">{error}</div>}
      <button type="button" className="planetway-pay-now-button" disabled={loading} onClick={payNow}>{loading ? "Processing…" : method === "bank" ? "Confirm Bank Transfer" : tr("payNow")}</button>
      <button type="button" className="planetway-payment-cancel" onClick={onClose}>{tr("cancel")}</button>
    </div>
  </div>;
}

function DashboardStyles() {
  return (
    <style>{`
      .planetway-language-selector select {
        min-width: 145px;
        padding: 8px 12px;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,.25);
        background: rgba(255,255,255,.08);
        color: inherit;
        cursor: pointer;
        font-size: 14px;
      }

      .planetway-language-selector option {
        background: #ffffff;
        color: #111827;
      }

      .pw-dash-user {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .pw-dash-user .planetway-language-selector {
        margin-right: 10px;
      }

      .pw-language-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 10px;
        margin-top: 18px;
      }

      .pw-language-grid button {
        border: 1px solid #d9e1ec;
        background: #fff;
        border-radius: 10px;
        padding: 10px;
        cursor: pointer;
      }

      .pw-language-grid button:hover {
        transform: translateY(-1px);
      }

      .pw-modal-overlay,
      .dash-modal-overlay {
        position: fixed;
        inset: 0;
        z-index: 9999;
        background: rgba(5, 15, 30, .72);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        overflow-y: auto;
      }

      .pw-modal {
        position: relative;
        width: min(520px, 100%);
        background: #fff;
        border-radius: 22px;
        padding: 30px;
        box-shadow: 0 30px 80px rgba(0,0,0,.3);
      }

      .pw-modal-close,
      .dash-modal-close {
        position: absolute;
        top: 14px;
        right: 16px;
        border: 0;
        background: transparent;
        font-size: 28px;
        cursor: pointer;
      }

      .pw-modal-input {
        width: 100%;
        min-height: 130px;
        resize: vertical;
        padding: 14px;
        border: 1px solid #d7deea;
        border-radius: 12px;
        margin: 12px 0;
      }

      .pw-modal-primary,
      .pw-google-button,
      .pw-link-button {
        width: 100%;
        border: 0;
        border-radius: 10px;
        padding: 13px 16px;
        margin-top: 10px;
        cursor: pointer;
      }

      .pw-modal-primary {
        background: #1261a0;
        color: white;
      }

      .pw-google-button {
        background: #f2f5f9;
      }

      .pw-link-button {
        background: transparent;
        color: #1261a0;
      }

      .dash-modal {
        position: relative;
        width: min(850px, 100%);
        background: #fff;
        border-radius: 22px;
        padding: 32px;
        box-shadow: 0 30px 80px rgba(0,0,0,.3);
      }

      .upload-area {
        border: 2px dashed #b8c5d8;
        border-radius: 16px;
        padding: 20px;
        margin: 18px 0;
        text-align: center;
      }

      .upload-button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        min-height: 130px;
        cursor: pointer;
      }

      .upload-arrow {
        font-size: 36px;
        font-weight: 700;
      }

      .upload-button small {
        opacity: .7;
      }

      .upload-preview {
        display: block;
        max-width: 100%;
        max-height: 250px;
        object-fit: cover;
        border-radius: 12px;
        margin: 18px auto 0;
      }

      .arrangement-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .form-control {
        display: flex;
        flex-direction: column;
        gap: 7px;
      }

      .form-control input,
      .form-control textarea,
      .form-control select {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #d7deea;
        border-radius: 10px;
        padding: 12px 13px;
        background: white;
      }

      .form-control textarea {
        min-height: 130px;
        resize: vertical;
      }

      .form-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 15px;
      }

      .save-arrangement {
        border: 0;
        border-radius: 12px;
        padding: 14px 18px;
        cursor: pointer;
        background: #1261a0;
        color: white;
        font-weight: 700;
      }

      .pw-dashboard {
        min-height: 100vh;
      }

      .pw-dashboard[dir="rtl"] {
        direction: rtl;
      }

      .pw-dashboard[dir="rtl"] .pw-dash-sidebar {
        text-align: right;
      }

      .pw-dashboard[dir="rtl"] .pw-dash-user {
        flex-direction: row-reverse;
      }

      .pw-dashboard[dir="rtl"] .dash-modal-close,
      .pw-dashboard[dir="rtl"] .pw-modal-close {
        right: auto;
        left: 16px;
      }

      @media (max-width: 900px) {
        .pw-nav {
          display: none;
        }

        .form-grid {
          grid-template-columns: 1fr;
        }

        .pw-dash-user .planetway-language-selector {
          display: none;
        }

        .pw-language-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 600px) {
        .pw-top-strip {
          gap: 8px;
        }

        .planetway-language-selector select {
          min-width: 120px;
        }

        .pw-language-grid {
          grid-template-columns: 1fr;
        }
      }
      .planetway-payment-page{min-height:100vh;background:linear-gradient(135deg,#f4f8ff,#ffffff 55%,#eef5ff);display:flex;align-items:center;justify-content:center;padding:40px 20px;font-family:Arial,sans-serif}.planetway-payment-page-card{width:min(760px,100%);background:#fff;border:1px solid #e2e8f0;border-radius:28px;padding:34px;box-shadow:0 24px 80px rgba(15,35,65,.14)}.planetway-payment-back{border:0;background:#f4f7fb;border-radius:10px;padding:10px 14px;color:#1769d2;font-weight:700;cursor:pointer;margin-bottom:24px}.planetway-payment-page h1{font-size:34px;margin:8px 0}.planetway-payment-page h2{font-size:20px;margin:24px 0 12px}.planetway-payment-subtitle{color:#64748b;margin-top:0}.planetway-payment-security{display:flex;flex-direction:column;gap:5px;background:#f5f9ff;border:1px solid #dbeafe;border-radius:14px;padding:14px;margin:16px 0;color:#475569}.planetway-payment-method-icon{font-size:20px}.planetway-payment-footer-note{text-align:center;color:#94a3b8;font-size:12px;margin:14px 0 0}@media(max-width:600px){.planetway-payment-page{padding:16px}.planetway-payment-page-card{padding:22px;border-radius:20px}.planetway-payment-page h1{font-size:28px}.planetway-payment-methods{grid-template-columns:1fr}}
      .planetway-payment-overlay{position:fixed;inset:0;z-index:10050;background:rgba(4,12,25,.78);display:flex;align-items:center;justify-content:center;padding:20px;overflow:auto}
      .planetway-payment-modal{position:relative;width:min(620px,100%);max-height:calc(100vh - 40px);overflow:auto;background:#fff;border-radius:22px;padding:28px;box-shadow:0 30px 90px rgba(0,0,0,.35)}
      .planetway-payment-close{position:absolute;right:16px;top:10px;border:0;background:transparent;font-size:30px;cursor:pointer}.planetway-payment-kicker{font-size:12px;letter-spacing:2px;font-weight:800;color:#1769d2}.planetway-payment-summary{display:grid;gap:10px;background:#f5f8fc;border:1px solid #e2e8f0;border-radius:16px;padding:16px;margin:20px 0}.planetway-payment-summary div{display:flex;justify-content:space-between;gap:15px}.planetway-payment-summary strong{text-align:right;word-break:break-word}.planetway-payment-methods{display:grid;grid-template-columns:1fr 1fr;gap:10px}.planetway-payment-methods button{padding:14px;border-radius:13px;border:1px solid #dbe3ee;background:#fff;cursor:pointer;text-align:left;font-weight:700}.planetway-payment-methods button.active{border-color:#1677ff;background:#f5f9ff}.planetway-payment-note{font-size:13px;line-height:1.5;color:#64748b}.planetway-payment-error{background:#fff1f2;color:#be123c;border:1px solid #fecdd3;padding:12px;border-radius:10px;margin:10px 0}.planetway-payment-message{background:#effdf5;color:#166534;border:1px solid #bbf7d0;padding:12px;border-radius:10px;margin:10px 0}.planetway-pay-now-button{width:100%;border:0;border-radius:13px;padding:15px;background:#1267e8;color:#fff;font-size:16px;font-weight:800;cursor:pointer}.planetway-pay-now-button:disabled{opacity:.65}.planetway-payment-cancel{width:100%;margin-top:8px;border:0;background:transparent;padding:10px;color:#64748b;cursor:pointer}
    
      .pw-admin-dashboard .pw-dash-main{
        background:#f4f8fc;
      }
      .pw-admin-dashboard .pw-dash-header{
        background:rgba(255,255,255,.94);
        border-bottom:1px solid #e5edf5;
        box-shadow:0 4px 18px rgba(30,70,110,.04);
      }
      .pw-admin-dashboard .pw-dash-header > div:first-child{
        flex:1;
      }
      .pw-admin-dashboard .pw-dash-header > div:first-child:after{
        content:"Search destinations, hotels, flights...";
        display:block;
        width:min(520px,48vw);
        margin-top:10px;
        padding:11px 16px;
        border:1px solid #dbe6f1;
        border-radius:12px;
        background:#f8fbfe;
        color:#8a9aad;
        font-size:13px;
        box-sizing:border-box;
      }
      .pw-admin-overview{
        max-width:1500px;
        margin:0 auto;
        padding:4px 0 40px;
      }
      .pw-admin-hero{
        position:relative;
        height:310px;
        overflow:hidden;
        border-radius:24px;
        margin-bottom:22px;
        box-shadow:0 18px 45px rgba(24,65,105,.14);
      }
      .pw-admin-hero img{
        width:100%;
        height:100%;
        object-fit:cover;
      }
      .pw-admin-hero-overlay{
        position:absolute;
        inset:0;
        background:linear-gradient(90deg,rgba(4,31,59,.82),rgba(4,31,59,.35),rgba(4,31,59,.05));
      }
      .pw-admin-hero-content{
        position:absolute;
        left:38px;
        top:50%;
        transform:translateY(-50%);
        max-width:650px;
        color:#fff;
      }
      .pw-admin-hero-content > span,
      .pw-admin-section-heading span{
        display:block;
        font-size:11px;
        font-weight:800;
        letter-spacing:.18em;
        color:#168df0;
      }
      .pw-admin-hero-content > span{
        color:#8bd1ff;
      }
      .pw-admin-hero-content h2{
        margin:9px 0 8px;
        font-size:38px;
        line-height:1.08;
        letter-spacing:-.04em;
      }
      .pw-admin-hero-content p{
        margin:0;
        max-width:610px;
        font-size:15px;
        line-height:1.65;
        color:rgba(255,255,255,.88);
      }
      .pw-admin-hero-actions{
        display:flex;
        gap:10px;
        margin-top:22px;
      }
      .pw-admin-hero-actions button{
        border:0;
        border-radius:10px;
        padding:11px 17px;
        background:#168df0;
        color:#fff;
        font-weight:700;
        cursor:pointer;
      }
      .pw-admin-hero-actions .ghost{
        background:rgba(255,255,255,.14);
        border:1px solid rgba(255,255,255,.35);
      }
      .pw-admin-search-card{
        position:relative;
        margin:-54px 28px 24px;
        z-index:2;
        background:#fff;
        border:1px solid #e1eaf3;
        border-radius:20px;
        padding:0 18px 18px;
        box-shadow:0 20px 48px rgba(20,61,100,.15);
      }
      .pw-admin-service-tabs{
        display:flex;
        gap:4px;
        border-bottom:1px solid #e8eef5;
      }
      .pw-admin-service-tabs button{
        border:0;
        background:transparent;
        padding:16px 18px 13px;
        color:#60758c;
        font-weight:700;
        cursor:pointer;
        border-bottom:3px solid transparent;
      }
      .pw-admin-service-tabs button.active{
        color:#118be9;
        border-bottom-color:#118be9;
        background:#eef8ff;
        border-radius:10px 10px 0 0;
      }
      .pw-admin-search-grid{
        display:grid;
        grid-template-columns:1.5fr 1fr 1fr 1fr .75fr auto;
        gap:10px;
        padding-top:14px;
        align-items:end;
      }
      .pw-admin-search-grid label{
        display:flex;
        flex-direction:column;
        gap:7px;
      }
      .pw-admin-search-grid label > span{
        font-size:9px;
        font-weight:800;
        letter-spacing:.15em;
        color:#7d91a5;
      }
      .pw-admin-search-grid input,
      .pw-admin-search-grid select{
        height:48px;
        box-sizing:border-box;
        width:100%;
        border:1px solid #dce7f1;
        border-radius:10px;
        background:#fff;
        padding:0 12px;
        color:#18314d;
        outline:none;
      }
      .pw-admin-search-grid input:focus,
      .pw-admin-search-grid select:focus{
        border-color:#168df0;
        box-shadow:0 0 0 3px rgba(22,141,240,.08);
      }
      .traveler-field div{
        height:48px;
        border:1px solid #dce7f1;
        border-radius:10px;
        display:flex;
        align-items:center;
        justify-content:center;
        gap:12px;
        color:#168df0;
      }
      .traveler-field strong{color:#19314d}
      .pw-admin-search-btn{
        height:48px;
        border:0;
        border-radius:10px;
        padding:0 20px;
        background:#128ce9;
        color:#fff;
        font-weight:800;
        box-shadow:0 10px 22px rgba(18,140,233,.22);
        cursor:pointer;
        white-space:nowrap;
      }
      .pw-admin-popular{
        display:flex;
        flex-wrap:wrap;
        gap:7px;
        align-items:center;
        padding-top:12px;
        font-size:12px;
        color:#7a8da1;
      }
      .pw-admin-popular button{
        border:1px solid #dce7f1;
        background:#f8fbfe;
        border-radius:999px;
        padding:6px 11px;
        color:#4f6881;
        cursor:pointer;
      }
      .pw-admin-stats{
        display:grid;
        grid-template-columns:repeat(4,1fr);
        gap:14px;
        margin-bottom:28px;
      }
      .pw-admin-stat{
        display:flex;
        align-items:flex-start;
        gap:14px;
        padding:20px;
        background:#fff;
        border:1px solid #e1eaf3;
        border-radius:16px;
        box-shadow:0 8px 25px rgba(24,62,98,.06);
      }
      .pw-admin-stat .stat-icon{
        width:42px;
        height:42px;
        display:grid;
        place-items:center;
        border-radius:12px;
        background:#eaf6ff;
        color:#168df0;
        font-weight:800;
      }
      .pw-admin-stat small{
        display:block;
        font-size:9px;
        letter-spacing:.13em;
        font-weight:800;
        color:#7f92a6;
      }
      .pw-admin-stat strong{
        display:block;
        margin:4px 0;
        color:#172e49;
        font-size:25px;
      }
      .pw-admin-stat em{
        display:block;
        font-style:normal;
        color:#91a0ae;
        font-size:11px;
      }
      .pw-admin-main-grid{
        display:grid;
        grid-template-columns:minmax(0,1fr) 360px;
        gap:20px;
      }
      .pw-admin-section-heading{
        display:flex;
        justify-content:space-between;
        align-items:end;
        margin-bottom:14px;
      }
      .pw-admin-section-heading h3{
        margin:5px 0 0;
        font-size:23px;
        color:#172e49;
      }
      .pw-admin-section-heading > button{
        border:0;
        background:transparent;
        color:#118be9;
        font-weight:700;
        cursor:pointer;
      }
      .pw-admin-destinations{
        display:grid;
        grid-template-columns:repeat(5,1fr);
        gap:12px;
      }
      .pw-admin-destinations article{
        min-width:0;
        overflow:hidden;
        background:#fff;
        border:1px solid #e1eaf3;
        border-radius:15px;
        box-shadow:0 8px 24px rgba(24,62,98,.06);
      }
      .pw-admin-destinations img{
        width:100%;
        height:145px;
        object-fit:cover;
        display:block;
      }
      .pw-admin-destinations article div{
        padding:12px;
      }
      .pw-admin-destinations strong,
      .pw-admin-destinations span{
        display:block;
      }
      .pw-admin-destinations strong{
        color:#172e49;
        font-size:14px;
      }
      .pw-admin-destinations span{
        margin-top:3px;
        color:#8495a6;
        font-size:11px;
      }
      .pw-admin-quick{
        background:#fff;
        border:1px solid #e1eaf3;
        border-radius:18px;
        padding:20px;
        box-shadow:0 8px 25px rgba(24,62,98,.06);
      }
      .pw-admin-quick > button{
        width:100%;
        display:grid;
        grid-template-columns:36px 1fr 18px;
        gap:10px;
        align-items:center;
        text-align:left;
        border:0;
        border-top:1px solid #edf2f6;
        background:#fff;
        padding:14px 2px;
        cursor:pointer;
      }
      .pw-admin-quick > button > span{
        width:34px;
        height:34px;
        display:grid;
        place-items:center;
        background:#edf7ff;
        color:#118be9;
        border-radius:10px;
        font-weight:800;
      }
      .pw-admin-quick strong,
      .pw-admin-quick small{
        display:block;
      }
      .pw-admin-quick strong{color:#203852;font-size:13px}
      .pw-admin-quick small{color:#8a9aaa;font-size:10px;margin-top:3px}
      .pw-admin-quick b{color:#9aabba}
      .pw-admin-promo{
        margin-top:24px;
        min-height:185px;
        overflow:hidden;
        position:relative;
        border-radius:20px;
        background:linear-gradient(120deg,#082f56,#0b5b91);
        padding:32px 38px;
        box-sizing:border-box;
        color:#fff;
      }
      .pw-admin-promo span{
        font-size:10px;
        letter-spacing:.18em;
        color:#8ed4ff;
        font-weight:800;
      }
      .pw-admin-promo h3{
        margin:8px 0;
        font-size:27px;
        max-width:650px;
      }
      .pw-admin-promo p{
        max-width:650px;
        margin:0;
        color:rgba(255,255,255,.78);
        line-height:1.55;
        font-size:13px;
      }
      .pw-admin-promo button{
        margin-top:16px;
        border:1px solid rgba(255,255,255,.3);
        background:rgba(255,255,255,.12);
        color:#fff;
        border-radius:9px;
        padding:9px 14px;
        font-weight:700;
        cursor:pointer;
      }
      .pw-admin-promo .promo-orb{
        position:absolute;
        right:50px;
        top:50%;
        transform:translateY(-50%);
        width:150px;
        height:150px;
        border-radius:50%;
        display:grid;
        place-items:center;
        font-size:70px;
        font-weight:900;
        color:rgba(255,255,255,.16);
        border:1px solid rgba(255,255,255,.16);
      }
      @media(max-width:1200px){
        .pw-admin-search-grid{grid-template-columns:1fr 1fr 1fr}
        .pw-admin-stats{grid-template-columns:1fr 1fr}
        .pw-admin-destinations{grid-template-columns:repeat(3,1fr)}
        .pw-admin-main-grid{grid-template-columns:1fr}
      }
      @media(max-width:760px){
        .pw-admin-hero{height:360px}
        .pw-admin-hero-content{left:22px;right:22px}
        .pw-admin-hero-content h2{font-size:29px}
        .pw-admin-search-card{margin:-30px 8px 20px}
        .pw-admin-search-grid{grid-template-columns:1fr}
        .pw-admin-stats{grid-template-columns:1fr}
        .pw-admin-destinations{grid-template-columns:1fr 1fr}
        .pw-admin-promo .promo-orb{display:none}
      }

      /* =====================================================
         PLANETWAY USER DASHBOARD - MODERN GLOBAL OTA UI
      ===================================================== */
      .user-portal{min-height:100vh;background:#f5f8fc;color:#10233f;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;overflow-x:hidden}
      .user-portal button,.user-portal input,.user-portal select{font:inherit}
      .user-portal-header{height:72px;background:rgba(255,255,255,.97);border-bottom:1px solid #e7edf5;display:flex;align-items:center;padding:0 42px;gap:26px;position:sticky;top:0;z-index:1000;box-sizing:border-box;box-shadow:0 4px 18px rgba(20,52,87,.04)}
      .user-brand{border:0;background:none;display:flex;align-items:center;gap:10px;cursor:pointer;color:#102b4d;padding:0;min-width:238px;text-align:left}
      .user-brand-globe{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#e7f5ff,#bce6ff);color:#087fe6;font-size:22px;box-shadow:inset 0 0 0 1px #d5edff}
      .user-brand strong{display:block;font-size:22px;line-height:22px;letter-spacing:-.03em}.user-brand small{display:block;font-size:8px;letter-spacing:.12em;color:#7890a8;margin-top:3px}
      .user-main-nav{display:flex;align-items:center;gap:3px;flex:1;height:100%}.user-main-nav>button,.user-more-wrap>button{border:0;background:transparent;padding:11px 13px;border-radius:10px;color:#243a55;font-weight:600;font-size:13px;cursor:pointer;white-space:nowrap}.user-main-nav>button:hover,.user-main-nav>button.active,.user-more-wrap>button:hover{background:#edf6ff;color:#087fe6}.user-more-wrap{position:relative}.user-more-menu,.user-profile-menu{position:absolute;right:0;top:calc(100% + 9px);background:#fff;border:1px solid #e3ebf4;border-radius:14px;padding:8px;min-width:190px;box-shadow:0 18px 50px rgba(26,57,91,.16);z-index:30}.user-more-menu button,.user-profile-menu button{display:block;width:100%;border:0;background:#fff;text-align:left;padding:10px 12px;border-radius:9px;cursor:pointer;color:#29405a}.user-more-menu button:hover,.user-profile-menu button:hover{background:#f2f7fb;color:#087fe6}
      .user-header-actions{display:flex;align-items:center;gap:9px}.user-header-small{position:relative;border:0;background:#f5f8fc;color:#31506e;border-radius:10px;padding:9px 11px;cursor:pointer;font-weight:700}.user-header-small i{position:absolute;right:-4px;top:-5px;background:#ef4444;color:#fff;font-size:9px;font-style:normal;width:17px;height:17px;border-radius:50%;display:grid;place-items:center}.user-profile-wrap{position:relative}.user-profile-button{border:0;background:transparent;display:flex;align-items:center;gap:9px;cursor:pointer;text-align:left;color:#172f4c}.user-avatar{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#0b8cf0,#1559d6);color:#fff;display:grid;place-items:center;font-weight:800}.user-profile-button strong,.user-profile-button small{display:block}.user-profile-button strong{font-size:12px}.user-profile-button small{font-size:10px;color:#8a9aab;margin-top:2px}.user-notification-popover{position:fixed;right:205px;top:78px;width:260px;background:#fff;border:1px solid #e1eaf3;border-radius:15px;padding:17px;box-shadow:0 18px 50px rgba(26,57,91,.15);z-index:1001}.user-notification-popover strong{font-size:14px}.user-notification-popover p{font-size:12px;color:#71849a;line-height:1.5}.user-notification-popover button{border:0;background:none;color:#087fe6;font-weight:700;cursor:pointer;padding:0}
      .user-hero{height:305px;background:linear-gradient(90deg,rgba(2,40,77,.88),rgba(7,91,151,.22)),url("https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=2000&q=90") center/cover;position:relative}.user-hero-content{max-width:1380px;margin:auto;padding:43px 42px;color:#fff}.user-hero-content>span{font-size:10px;font-weight:800;letter-spacing:.18em;color:#b9e8ff}.user-hero-content h1{font-size:48px;line-height:1.02;margin:14px 0 11px;letter-spacing:-.04em}.user-hero-content h1 b{color:#4fd2ff}.user-hero-content p{font-size:15px;line-height:1.55;max-width:490px;color:rgba(255,255,255,.9);margin:0}
      .user-search-card{max-width:1390px;margin:-64px auto 0;position:relative;z-index:5;background:rgba(255,255,255,.98);border:1px solid #e4ebf3;border-radius:19px;box-shadow:0 18px 45px rgba(25,64,100,.16);padding:0 18px 16px}.user-search-tabs{height:54px;display:flex;align-items:center;gap:4px;border-bottom:1px solid #edf2f7}.user-search-tabs button{border:0;background:transparent;border-radius:11px;padding:10px 15px;color:#28415d;font-size:13px;font-weight:700;cursor:pointer}.user-search-tabs button.active{background:#0b89ee;color:#fff}.user-search-tabs button b{margin-right:7px}.multi-city{margin-left:auto;font-size:12px;color:#58708a;font-weight:700;padding-right:8px}.user-search-row{display:flex;align-items:flex-end;gap:8px;padding-top:13px}.user-search-row label{min-width:0;flex:1}.user-search-row label span{display:block;font-size:10px;color:#6d8196;font-weight:700;margin:0 0 5px 10px}.user-search-row input,.user-search-row select{width:100%;height:43px;box-sizing:border-box;border:1px solid #dce6ef;border-radius:10px;background:#fff;padding:0 11px;color:#29415c;outline:none;font-size:12px}.user-search-row input:focus,.user-search-row select:focus{border-color:#55b9fa;box-shadow:0 0 0 3px rgba(27,151,238,.08)}.user-search-row .compact-field{max-width:86px}.user-search-row .class-field{max-width:145px}.swap-button{width:34px;height:34px;border-radius:50%;border:1px solid #cde4f8;background:#edf8ff;color:#0787ed;cursor:pointer;margin-bottom:4px;flex:0 0 auto}.user-search-button{height:43px;border:0;border-radius:10px;background:#0789ed;color:#fff;padding:0 25px;font-weight:800;cursor:pointer;white-space:nowrap;box-shadow:0 7px 16px rgba(8,137,237,.2)}.user-search-button:hover{transform:translateY(-1px);background:#067bd8}
      .user-service-grid{max-width:1390px;margin:20px auto 0;display:grid;grid-template-columns:repeat(8,1fr);gap:12px;padding:0 0}.user-service-grid button{border:1px solid #e7edf4;background:#fff;border-radius:17px;min-height:104px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 5px 18px rgba(23,56,91,.045);transition:.18s}.user-service-grid button:hover{transform:translateY(-3px);box-shadow:0 13px 28px rgba(23,56,91,.1);border-color:#cce7fa}.user-service-grid b{width:39px;height:39px;border-radius:50%;display:grid;place-items:center;background:#eaf7ff;color:#0789ed;font-size:19px;margin-bottom:7px}.user-service-grid strong{font-size:12px;color:#183250}.user-service-grid span{font-size:9px;color:#8293a5;margin-top:3px}
      .user-section,.user-promo-grid,.user-tools-row,.user-page-body{max-width:1390px;margin:31px auto 0}.user-section-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:15px}.user-section-heading>div>span,.user-content-panel>span,.user-inner-search>div>span{font-size:9px;letter-spacing:.16em;font-weight:800;color:#138be8}.user-section-heading h2,.user-content-panel h1,.user-inner-search h1{margin:5px 0 2px;font-size:24px;letter-spacing:-.025em;color:#162e4b}.user-section-heading p,.user-content-panel>p,.user-inner-search p{margin:0;color:#8292a4;font-size:12px}.user-section-heading>button{border:0;background:none;color:#087fe6;font-weight:800;font-size:12px;cursor:pointer}.destination-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:15px}.destination-card{position:relative;border:1px solid #e3ebf2;background:#fff;border-radius:15px;overflow:hidden;padding:0;text-align:left;cursor:pointer;box-shadow:0 5px 18px rgba(23,56,91,.04)}.destination-card img{display:block;width:100%;height:145px;object-fit:cover}.destination-card>div{padding:10px 12px 12px}.destination-card strong,.destination-card span{display:block}.destination-card strong{font-size:13px;color:#173252}.destination-card span{font-size:10px;color:#7890a8;margin-top:2px}.destination-card b{display:block;text-align:right;margin-top:-15px;font-size:11px;color:#087fe6}.destination-heart{position:absolute!important;right:9px;top:8px!important;z-index:2;background:rgba(0,0,0,.2);backdrop-filter:blur(4px);color:#fff!important;width:28px;height:28px;border-radius:50%;display:grid!important;place-items:center;font-size:18px!important}
      .user-promo-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:13px}.user-promo-grid>button{min-height:138px;border:0;border-radius:17px;padding:20px;display:grid;grid-template-columns:45px 1fr;grid-template-rows:auto auto;gap:2px 12px;text-align:left;color:#fff;cursor:pointer;overflow:hidden;position:relative}.promo-blue{background:linear-gradient(125deg,#087fe9,#0752bc)}.promo-green{background:linear-gradient(125deg,#168c83,#166b55)}.promo-gold{background:linear-gradient(125deg,#b87817,#7d4a0e)}.user-promo-grid button>b{font-size:25px;grid-row:1/3;width:43px;height:43px;border-radius:50%;background:rgba(255,255,255,.17);display:grid;place-items:center}.user-promo-grid small{display:block;font-size:8px;letter-spacing:.14em;opacity:.78}.user-promo-grid strong{display:block;font-size:17px;margin-top:4px}.user-promo-grid em{display:block;font-style:normal;font-size:10px;opacity:.78;line-height:1.4;margin-top:5px}.user-promo-grid u{grid-column:2;text-decoration:none;font-size:10px;font-weight:800;margin-top:8px}.user-tools-row{display:grid;grid-template-columns:repeat(6,1fr);gap:7px;padding-bottom:28px}.user-tools-row button{border:0;background:transparent;padding:13px 8px;text-align:left;cursor:pointer;color:#1c3653;border-radius:10px}.user-tools-row button:hover{background:#fff}.user-tools-row button:first-letter{color:#0789ed}.user-tools-row strong,.user-tools-row span{display:block;margin-left:27px}.user-tools-row strong{font-size:11px}.user-tools-row span{font-size:9px;color:#8796a7;margin-top:2px}
      .user-page-body{padding:35px 0 60px;min-height:calc(100vh - 72px);box-sizing:border-box}.user-inner-search,.user-content-panel{background:#fff;border:1px solid #e2eaf3;border-radius:20px;box-shadow:0 8px 30px rgba(26,57,91,.055);padding:27px}.user-search-row-inner{margin-top:22px}.user-results-section{margin-top:22px}.user-result-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.user-result-card{background:#fff;border:1px solid #e2eaf3;border-radius:16px;overflow:hidden;box-shadow:0 6px 22px rgba(26,57,91,.05)}.user-result-card>img{width:100%;height:170px;object-fit:cover;display:block}.user-result-card>div{padding:15px}.user-result-card span{font-size:9px;text-transform:uppercase;letter-spacing:.08em;color:#0b89ed;font-weight:800}.user-result-card h3{margin:5px 0;font-size:16px}.user-result-card p{margin:0;color:#7c8fa2;font-size:11px}.user-result-card>div>strong{display:block;font-size:19px;color:#123354;margin:10px 0}.user-result-card>div>div{display:flex;gap:8px}.user-result-card button{border:1px solid #dbe6ef;background:#fff;border-radius:9px;padding:9px 10px;font-size:11px;font-weight:700;cursor:pointer}.user-result-card .book-now{background:#0789ed;border-color:#0789ed;color:#fff;flex:1}.user-empty-state{text-align:center;padding:60px 20px;background:#fff;border:1px dashed #d7e2ed;border-radius:18px;grid-column:1/-1}.user-empty-state>b{font-size:34px;color:#0789ed}.user-empty-state h3{margin:10px 0 5px}.user-empty-state p{font-size:12px;color:#8192a4}.user-empty-state button,.primary-wide{border:0;background:#0789ed;color:#fff;border-radius:10px;padding:11px 18px;font-weight:800;cursor:pointer}
      .user-booking-list{margin-top:24px}.user-booking-row{display:grid;grid-template-columns:44px 1fr 100px 110px 145px;align-items:center;gap:15px;border-top:1px solid #edf2f6;padding:14px 0}.booking-icon{width:38px;height:38px;border-radius:10px;background:#eaf7ff;color:#0789ed;display:grid;place-items:center}.user-booking-row strong,.user-booking-row span{display:block}.user-booking-row strong{font-size:13px}.user-booking-row span{font-size:10px;color:#8293a5;margin-top:3px}.user-booking-row>b{font-size:13px}.user-booking-row em{font-style:normal;font-size:10px;font-weight:800}.user-booking-row em.confirmed{color:#16956a}.user-booking-row em.pending{color:#d18a18}.user-booking-row button{border:1px solid #d7e4ef;background:#fff;border-radius:9px;padding:9px;font-size:10px;font-weight:800;color:#087fe6;cursor:pointer}
      .profile-large{display:flex;align-items:center;gap:18px;margin:28px 0;padding:22px;background:#f7fbff;border-radius:16px}.profile-large>span{width:72px;height:72px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#0b8cf0,#1559d6);color:#fff;font-size:28px;font-weight:800}.profile-large h2{margin:0}.profile-large p{margin:5px 0;color:#73869a}.profile-large em{font-style:normal;font-size:10px;color:#0789ed;font-weight:800}.profile-actions{display:flex;gap:10px}.profile-actions button{border:1px solid #dbe5ee;background:#fff;border-radius:10px;padding:11px 15px;font-weight:700;cursor:pointer}.profile-actions button:first-child{background:#0789ed;color:#fff;border-color:#0789ed}.support-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:25px}.support-cards button{border:1px solid #e1eaf2;background:#fff;border-radius:15px;padding:20px;text-align:left;cursor:pointer}.support-cards button:hover{border-color:#b9dcf5;transform:translateY(-2px)}.support-cards strong,.support-cards span{display:block;margin-top:8px}.support-cards span{font-size:11px;color:#8193a5}.exchange-box,.loyalty-card{margin-top:25px;padding:30px;border-radius:17px;background:linear-gradient(120deg,#f0f8ff,#fff);border:1px solid #dcebf6;display:flex;align-items:center;gap:20px}.exchange-box strong{font-size:24px}.exchange-box b{font-size:24px;color:#0789ed}.exchange-box button{margin-left:auto;border:0;background:#0789ed;color:#fff;border-radius:10px;padding:11px 15px;font-weight:800;cursor:pointer}.loyalty-card{justify-content:space-between}.loyalty-card>div{display:flex;flex-direction:column}.loyalty-card small{font-size:9px;letter-spacing:.13em;color:#8194a8}.loyalty-card strong{font-size:28px;margin:4px 0}.loyalty-card span{font-size:10px;color:#8293a5}.primary-wide{margin-top:18px}.navigator-form{display:flex;gap:10px;margin-top:25px}.navigator-form input{flex:1;height:47px;border:1px solid #dce7f0;border-radius:10px;padding:0 14px;outline:none}.navigator-form button{border:0;background:#0789ed;color:#fff;border-radius:10px;padding:0 22px;font-weight:800;cursor:pointer}.info-feature{display:flex;gap:18px;align-items:flex-start;margin-top:25px;background:#f6fbff;border:1px solid #deebf4;border-radius:16px;padding:24px}.info-feature>b{font-size:28px;color:#0789ed}.info-feature h2{margin:0 0 5px}.info-feature p{margin:0;color:#71849a;font-size:12px;line-height:1.6}.user-portal-footer{max-width:1390px;margin:0 auto;padding:22px 0 35px;border-top:1px solid #e3eaf1;display:flex;align-items:center;gap:20px;color:#8b9aaa;font-size:10px}.user-portal-footer button{border:0;background:none;color:#64788e;cursor:pointer;font-size:10px}.user-portal-footer button:hover{color:#0789ed}
      @media(max-width:1250px){.user-portal-header{padding:0 20px}.user-brand{min-width:190px}.user-main-nav>button,.user-more-wrap>button{padding:10px 8px;font-size:11px}.user-service-grid{padding:0 20px;grid-template-columns:repeat(4,1fr)}.user-section,.user-promo-grid,.user-tools-row,.user-page-body{margin-left:20px;margin-right:20px}.user-search-card{margin-left:20px;margin-right:20px}.user-search-row{flex-wrap:wrap}.user-search-row label{min-width:140px}.destination-grid{grid-template-columns:repeat(3,1fr)}.user-tools-row{grid-template-columns:repeat(3,1fr)}}
      @media(max-width:820px){.user-portal-header{height:auto;min-height:72px;flex-wrap:wrap;padding:12px 16px}.user-brand{min-width:auto}.user-main-nav{order:3;width:100%;overflow:auto}.user-header-actions{margin-left:auto}.user-hero{height:320px}.user-hero-content{padding:40px 22px}.user-hero-content h1{font-size:38px}.user-search-card{margin-top:-45px}.user-search-row{display:grid;grid-template-columns:1fr 1fr}.swap-button{display:none}.user-search-row .compact-field,.user-search-row .class-field{max-width:none}.user-search-button{width:100%}.user-promo-grid{grid-template-columns:1fr}.user-result-grid{grid-template-columns:1fr}.support-cards{grid-template-columns:1fr}.user-booking-row{grid-template-columns:40px 1fr 90px}.user-booking-row em,.user-booking-row button{grid-column:2}.destination-grid{grid-template-columns:1fr 1fr}.user-tools-row{grid-template-columns:1fr 1fr}.profile-actions{flex-direction:column}.user-notification-popover{right:15px;top:132px}}
      @media(max-width:520px){.user-hero-content h1{font-size:31px}.user-search-row{grid-template-columns:1fr}.destination-grid{grid-template-columns:1fr}.user-service-grid{grid-template-columns:1fr 1fr;padding:0 14px}.user-section,.user-promo-grid,.user-tools-row,.user-page-body{margin-left:14px;margin-right:14px}.user-search-card{margin-left:14px;margin-right:14px}.user-tools-row{grid-template-columns:1fr}.user-portal-footer{margin:0 14px;flex-wrap:wrap}}
`}</style>
  );
}

















