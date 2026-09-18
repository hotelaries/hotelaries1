import React from 'react';
import { useSite } from '../context/SiteContext';
import { MapPin, Phone, Mail, Navigation, ExternalLink, Compass } from 'lucide-react';
import { extractMapEmbedSrc, DEFAULT_DIRECTIONS_URL } from '../utils/mapUtils';

export const LocationSection: React.FC = () => {
  const { siteData, language } = useSite();
  const contact = siteData.contact;

  // Determine if the map should be shown (default true unless explicitly set to false)
  const isMapEnabled = contact.showMap !== false;

  // Extract clean sanitized embed URL from admin embed HTML or direct URL
  const mapSrc = extractMapEmbedSrc(contact.mapEmbedHtml || contact.mapEmbedUrl);

  const directionsLink = contact.directionsUrl?.trim() || DEFAULT_DIRECTIONS_URL;
  const mapHeight = contact.mapHeight && contact.mapHeight >= 250 ? contact.mapHeight : 450;

  // Phone numbers provided in CMS
  const phone1 = contact.phone || contact.phone1 || '72593 32223';
  const phone2 = contact.phone2 || '89683 99764';
  const email = contact.email || 'hotelaries764@gmail.com';
  const hotelAddress = contact.address || 'SBP, City of dreams, high ground road zirakpur. 140603';
  const addressDetails = [
    (!hotelAddress.toLowerCase().includes(contact.city?.toLowerCase() || 'zirakpur') && contact.city),
    contact.region,
    contact.country
  ].filter(Boolean).join(', ');

  return (
    <section
      id="location-section"
      aria-label="Hotel Location and Directions"
      className="w-full py-16 sm:py-20 lg:py-24 bg-[#FAF8F5] border-t border-[#23201C]/8 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#9E7D53] font-medium font-sans-clean block mb-2">
            {language === 'de' ? 'LAGE & ANREISE' : language === 'it' ? 'POSIZIONE & ARRIVO' : 'LOCATION & ARRIVAL'}
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#1E1B18] tracking-tight">
            {contact.mapTitle || (language === 'de' ? 'Unser Standort' : language === 'it' ? 'La Nostra Posizione' : 'Our Location')}
          </h2>
          <div className="w-12 h-px bg-[#9E7D53] mx-auto mt-4 mb-3" />
          <p className="text-xs sm:text-sm text-[#5B544B] font-light max-w-xl mx-auto">
            {language === 'de'
              ? 'Finden Sie Ihren Weg zu exklusivem Komfort und atemberaubender Aussicht über den Dächern.'
              : language === 'it'
              ? 'Scopri come raggiungerci per vivere momenti esclusivi e una vista panoramica impareggiabile.'
              : 'Find your journey to elevated luxury, curated hospitality, and our iconic rooftop Sky Lounge.'}
          </p>
        </div>

        {/* Layout Grid */}
        <div className={`grid grid-cols-1 ${isMapEnabled ? 'lg:grid-cols-12' : 'max-w-2xl mx-auto'} gap-8 lg:gap-12 items-stretch`}>
          {/* Left Column: Location & Contact Information */}
          <div className={`${isMapEnabled ? 'lg:col-span-5' : 'w-full'} flex flex-col justify-between`}>
            <div className="bg-[#1E1B18] text-[#FAF8F5] p-8 sm:p-10 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden h-full flex flex-col justify-between">
              {/* Subtle luxury background element */}
              <div
                className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-[#9E7D53]/10 pointer-events-none blur-2xl"
                aria-hidden="true"
              />

              <div className="space-y-6 sm:space-y-8 relative z-10">
                {/* Hotel Brand Name */}
                <div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#9E7D53] font-semibold block mb-1">
                    WELCOME TO
                  </span>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light tracking-wide text-white">
                    {contact.hotelName || 'HOTEL ARIES & SKY LOUNGE'}
                  </h3>
                  {contact.subtitle && (
                    <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-sans-clean block mt-0.5">
                      {contact.subtitle}
                    </span>
                  )}
                </div>

                <div className="h-px w-full bg-white/10" />

                {/* Hotel Address */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#9E7D53]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-white/50 block mb-1 font-medium">
                      {language === 'de' ? 'Adresse' : language === 'it' ? 'Indirizzo' : 'Hotel Address'}
                    </span>
                    <p className="text-sm sm:text-base font-light text-white/95 leading-snug">
                      {hotelAddress}
                    </p>
                    {addressDetails && (
                      <p className="text-xs text-white/60 font-light mt-0.5">
                        {addressDetails}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#9E7D53]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-white/50 block mb-1 font-medium">
                      {language === 'de' ? 'Telefon' : language === 'it' ? 'Telefono' : 'Phone'}
                    </span>
                    <div className="space-y-1">
                      {phone1 && (
                        <a
                          href={`tel:${phone1.replace(/\s+/g, '')}`}
                          className="text-sm sm:text-base font-mono font-light text-white/95 hover:text-[#D4AF37] transition-colors block"
                        >
                          {phone1}
                        </a>
                      )}
                      {phone2 && (
                        <a
                          href={`tel:${phone2.replace(/\s+/g, '')}`}
                          className="text-sm sm:text-base font-mono font-light text-white/95 hover:text-[#D4AF37] transition-colors block"
                        >
                          {phone2}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#9E7D53]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-white/50 block mb-1 font-medium">
                      {language === 'de' ? 'E-Mail' : language === 'it' ? 'E-Mail' : 'Email'}
                    </span>
                    <a
                      href={`mailto:${email}`}
                      className="text-sm sm:text-base font-mono font-light text-white/95 hover:text-[#D4AF37] transition-colors break-all"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Button: Get Directions */}
              <div className="pt-8 sm:pt-10 relative z-10">
                <a
                  id="btn-get-directions-primary"
                  href={directionsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#9E7D53] hover:bg-[#B38E5F] text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99] group"
                >
                  <Navigation className="w-4 h-4 text-white group-hover:rotate-45 transition-transform duration-200" />
                  <span>{language === 'de' ? 'ROUTE PLANEN' : language === 'it' ? 'INDICAZIONI STRADALI' : 'GET DIRECTIONS'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/70 ml-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Google Map (Only shown if showMap is ON) */}
          {isMapEnabled && (
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#23201C]/8 shadow-sm flex flex-col h-full">
                {/* Map Container */}
                <div
                  className="w-full rounded-xl overflow-hidden bg-[#ECE8E1] border border-[#23201C]/10 shadow-inner relative flex-1"
                  style={{
                    minHeight: '340px',
                    height: `${mapHeight}px`
                  }}
                >
                  {mapSrc ? (
                    <iframe
                      id="public-google-map-iframe"
                      title={`${contact.hotelName || 'Hotel Aries'} Google Maps Location`}
                      src={mapSrc}
                      width="100%"
                      height="100%"
                      style={{
                        border: 0,
                        width: '100%',
                        height: '100%',
                        display: 'block'
                      }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#7D7468]">
                      <Compass className="w-10 h-10 text-[#9E7D53] mb-3 animate-pulse" />
                      <p className="font-serif-luxury text-lg text-[#1E1B18] mb-1">
                        {contact.hotelName || 'Hotel Aries & Sky Lounge'}
                      </p>
                      <p className="text-xs text-[#5B544B] max-w-sm mb-4">
                        {hotelAddress} {addressDetails && `· ${addressDetails}`}
                      </p>
                      <a
                        href={directionsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#9E7D53] text-white text-xs uppercase tracking-wider"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Open in Google Maps</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Bottom Bar below map */}
                <div className="pt-3 px-1 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#7D7468]">
                  <div className="flex items-center gap-1.5 truncate max-w-full">
                    <MapPin className="w-3.5 h-3.5 text-[#9E7D53] shrink-0" />
                    <span className="truncate">{hotelAddress}</span>
                  </div>
                  <a
                    href={directionsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#9E7D53] hover:text-[#8C6D44] font-medium text-[11px] uppercase tracking-wider hover:underline shrink-0"
                  >
                    <span>View Larger Map & Navigation</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
