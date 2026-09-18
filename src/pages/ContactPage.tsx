import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { MapPin, Phone, Mail, Clock, Car, Train, Plane, Send, CheckCircle2, Navigation, ExternalLink } from 'lucide-react';
import { extractMapEmbedSrc, DEFAULT_DIRECTIONS_URL } from '../utils/mapUtils';

export const ContactPage: React.FC = () => {
  const { siteData, language, t, submitInquiry } = useSite();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dates, setDates] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    submitInquiry({
      arrivalDate: dates || new Date().toISOString().split('T')[0],
      departureDate: '',
      adults: 2,
      children: 0,
      guestName: name,
      guestEmail: email,
      guestPhone: phone,
      notes: message,
      type: 'inquiry'
    });

    setSent(true);
  };

  return (
    <div id="contact-page" className="w-full pt-28 pb-20 bg-[#FAF8F5]">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-[#9E7D53] font-medium font-sans-clean">
          {language === 'de' ? 'Anreise & Kontakt' : language === 'it' ? 'Contatto & Posizione' : 'Reach Out & Location'}
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-[#1E1B18] mt-2 mb-4 tracking-tight">
          {language === 'de' ? 'Ihr Weg zu uns' : language === 'it' ? 'Come Raggiungerci' : 'Your Journey to Hotel Aries'}
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#5B544B] font-light leading-relaxed">
          {language === 'de'
            ? 'Wir freuen uns auf Ihre Nachricht. Ob Zimmerbuchung, Sky Lounge Reservierung oder Anreisefragen – unser Team ist jederzeit für Sie da.'
            : language === 'it'
            ? 'Siamo a vostra completa disposizione per prenotazioni camere, sky lounge o informazioni di viaggio.'
            : 'We look forward to hearing from you. For room bookings, Sky Lounge reservations, or travel inquiries, our team is at your service.'}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info & Directions */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#F5F2EB] p-8 rounded-2xl border border-[#23201C]/8 space-y-6">
              <h3 className="font-serif-luxury text-2xl font-light text-[#1E1B18]">
                {siteData.contact.hotelName} – {siteData.contact.subtitle}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#3D3831] font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#9E7D53] shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-[#1E1B18] block">{language === 'de' ? 'Adresse' : 'Address'}</span>
                    <span>{siteData.contact.address}</span>
                    {siteData.contact.postalCode && !siteData.contact.address.includes(siteData.contact.postalCode) && (
                      <>
                        <br />
                        <span>{siteData.contact.postalCode} {siteData.contact.city}</span>
                      </>
                    )}
                    <br />
                    <span>{siteData.contact.region}, {siteData.contact.country}</span>
                    <span className="block font-mono text-[11px] text-[#7D7468] mt-1">
                      GPS: {siteData.contact.coordinates}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Phone className="w-4 h-4 text-[#9E7D53] shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-[#1E1B18] block">{language === 'de' ? 'Telefon' : 'Phone'}</span>
                    <div className="space-y-1 mt-0.5">
                      <a href={`tel:${siteData.contact.phoneFormatted || '+917259332223'}`} className="hover:underline font-mono block">
                        {siteData.contact.phone}
                      </a>
                      {siteData.contact.phone2 && (
                        <a href={`tel:${siteData.contact.phone2Formatted || '+918968399764'}`} className="hover:underline font-mono block">
                          {siteData.contact.phone2}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <Mail className="w-4 h-4 text-[#9E7D53] shrink-0" />
                  <div>
                    <span className="font-semibold text-[#1E1B18] block">E-Mail</span>
                    <a href={`mailto:${siteData.contact.email}`} className="hover:underline font-mono">
                      {siteData.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <Clock className="w-4 h-4 text-[#9E7D53] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1E1B18] block">{language === 'de' ? 'Öffnungszeiten & Check-In' : 'Hours & Check-In'}</span>
                    <span>Ganzjährig geöffnet · 24/7 Rezeption</span>
                    <br />
                    <span className="text-[#7D7468]">Check-in ab 14:00 · Check-out bis 11:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Directions options */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#9E7D53] font-semibold">
                {language === 'de' ? 'Anreisemöglichkeiten' : 'How to Arrive'}
              </h4>

              <div className="space-y-3 text-xs text-[#5B544B] font-light">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-[#23201C]/6">
                  <Car className="w-4 h-4 text-[#9E7D53] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1E1B18] block font-medium font-sans-clean">Mit dem Auto:</strong>
                    Brennerautobahn A22 Ausfahrt Bozen Süd, Weiterfahrt über die Schnellstraße MeBo (SS38) Richtung Meran, Ausfahrt Kaltern/Eppan. Kostenlose Tiefgarage mit E-Ladestationen inklusive.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-[#23201C]/6">
                  <Train className="w-4 h-4 text-[#9E7D53] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1E1B18] block font-medium font-sans-clean">Mit der Bahn:</strong>
                    Direktverbindungen (ICE/EC/Frecciargento) bis Hauptbahnhof Bozen. Auf Wunsch organisieren wir gerne unseren kostenfreien VIP-Shuttle direkt zur Residence.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-[#23201C]/6">
                  <Plane className="w-4 h-4 text-[#9E7D53] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1E1B18] block font-medium font-sans-clean">Mit dem Flugzeug:</strong>
                    Flughafen Bozen (BZO) nur 15 Minuten entfernt (SkyAlps). Alternativ Innsbruck (INN) oder Verona (VRN) in ca. 1,5 Stunden erreichbar.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form & Map */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#23201C]/8 shadow-xs">
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#1E1B18] mb-2">
                {language === 'de' ? 'Schreiben Sie uns' : language === 'it' ? 'Inviaci un messaggio' : 'Send Us a Message'}
              </h3>
              <p className="text-xs text-[#7D7468] mb-6 font-light">
                {language === 'de' ? 'Wir antworten in der Regel innerhalb weniger Stunden.' : 'We usually reply within a few hours.'}
              </p>

              {sent ? (
                <div className="text-center py-10 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#9E7D53] mx-auto" />
                  <h4 className="font-serif-luxury text-2xl font-light text-[#1E1B18]">
                    {language === 'de' ? 'Nachricht erfolgreich versendet' : 'Message Sent Successfully'}
                  </h4>
                  <p className="text-xs text-[#5B544B] max-w-sm mx-auto font-light">
                    {language === 'de'
                      ? 'Vielen Dank für Ihre Kontaktaufnahme. Wir freuen uns sehr darauf, Sie bald im Hotel Aries & Sky Lounge begrüßen zu dürfen.'
                      : 'Thank you for reaching out. We look forward to welcoming you to Hotel Aries & Sky Lounge.'}
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 px-4 py-2 border border-[#9E7D53] text-[#9E7D53] text-xs uppercase tracking-wider rounded-lg"
                  >
                    Neue Nachricht
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.18em] text-[#7D7468] font-semibold mb-1">
                        {language === 'de' ? 'Ihr Name *' : 'Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="z.B. Elisabeth Gruber"
                        className="w-full border border-[#23201C]/15 rounded-lg px-3 py-2 text-xs sm:text-sm text-[#1E1B18] focus:outline-none focus:border-[#9E7D53]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.18em] text-[#7D7468] font-semibold mb-1">
                        {language === 'de' ? 'E-Mail-Adresse *' : 'Email Address *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="elisabeth@domain.com"
                        className="w-full border border-[#23201C]/15 rounded-lg px-3 py-2 text-xs sm:text-sm text-[#1E1B18] focus:outline-none focus:border-[#9E7D53]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.18em] text-[#7D7468] font-semibold mb-1">
                        {language === 'de' ? 'Telefon' : 'Phone'}
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+49 171 0000000"
                        className="w-full border border-[#23201C]/15 rounded-lg px-3 py-2 text-xs sm:text-sm text-[#1E1B18] focus:outline-none focus:border-[#9E7D53]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.18em] text-[#7D7468] font-semibold mb-1">
                        {language === 'de' ? 'Gewünschter Reisezeitraum' : 'Preferred Dates'}
                      </label>
                      <input
                        type="text"
                        value={dates}
                        onChange={(e) => setDates(e.target.value)}
                        placeholder="z.B. 14. – 21. September"
                        className="w-full border border-[#23201C]/15 rounded-lg px-3 py-2 text-xs sm:text-sm text-[#1E1B18] focus:outline-none focus:border-[#9E7D53]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] text-[#7D7468] font-semibold mb-1">
                      {language === 'de' ? 'Ihre Nachricht / Wünsche' : 'Your Message / Inquiry'}
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={language === 'de' ? 'Wie können wir Ihren Aufenthalt unvergesslich machen?' : 'How can we make your retreat exceptional?'}
                      className="w-full border border-[#23201C]/15 rounded-lg p-3 text-xs sm:text-sm text-[#1E1B18] focus:outline-none focus:border-[#9E7D53] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg bg-[#9E7D53] hover:bg-[#8C6D44] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{language === 'de' ? 'Nachricht absenden' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Embedded Location Map (Dynamic from CMS) */}
            {siteData.contact.showMap !== false && (
              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden border border-[#23201C]/10 shadow-sm h-72 sm:h-80 bg-neutral-100">
                  {extractMapEmbedSrc(siteData.contact.mapEmbedHtml || siteData.contact.mapEmbedUrl) ? (
                    <iframe
                      title="Hotel Aries & Sky Lounge Location Map"
                      src={extractMapEmbedSrc(siteData.contact.mapEmbedHtml || siteData.contact.mapEmbedUrl)!}
                      width="100%"
                      height="100%"
                      style={{ border: 0, width: '100%', height: '100%', display: 'block' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#7D7468]">
                      <MapPin className="w-8 h-8 text-[#9E7D53] mb-2" />
                      <p className="font-serif-luxury text-base text-[#1E1B18]">{siteData.contact.hotelName}</p>
                      <p className="text-xs text-[#5B544B]">{siteData.contact.address || 'SBP City of Dreams, Sector 115'}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between px-1 text-xs">
                  <span className="text-[#7D7468] truncate max-w-[200px] sm:max-w-none">
                    {siteData.contact.address || 'SBP City of Dreams, Sector 115'}
                  </span>
                  <a
                    href={siteData.contact.directionsUrl || DEFAULT_DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#9E7D53] hover:bg-[#8C6D44] text-white text-[11px] uppercase tracking-wider font-medium transition-colors"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3 text-white/70" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
