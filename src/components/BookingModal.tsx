import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { X, Calendar, Users, Mail, Phone, User, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    closeBookingModal,
    bookingPrefill,
    siteData,
    language,
    t,
    submitInquiry
  } = useSite();

  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [suiteId, setSuiteId] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingType, setBookingType] = useState<'inquiry' | 'direct_booking'>('inquiry');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedInquiryId, setSubmittedInquiryId] = useState('');

  // Update fields when opened with prefill
  useEffect(() => {
    if (isBookingModalOpen) {
      setIsSubmitted(false);
      if (bookingPrefill) {
        if (bookingPrefill.arrivalDate) setArrivalDate(bookingPrefill.arrivalDate);
        if (bookingPrefill.departureDate) setDepartureDate(bookingPrefill.departureDate);
        if (bookingPrefill.adults) setAdults(bookingPrefill.adults);
        if (bookingPrefill.suiteId) setSuiteId(bookingPrefill.suiteId);
        if (bookingPrefill.type) setBookingType(bookingPrefill.type);
      } else {
        // defaults
        const d = new Date();
        d.setDate(d.getDate() + 7);
        setArrivalDate(d.toISOString().split('T')[0]);
        d.setDate(d.getDate() + 5);
        setDepartureDate(d.toISOString().split('T')[0]);
        setSuiteId(siteData.suites[0]?.id || '');
      }
    }
  }, [isBookingModalOpen, bookingPrefill, siteData.suites]);

  if (!isBookingModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail) return;

    const selectedSuiteObj = siteData.suites.find((s) => s.id === suiteId);
    const chosenSuiteName = selectedSuiteObj ? t(selectedSuiteObj.name) : undefined;

    submitInquiry({
      arrivalDate,
      departureDate,
      adults,
      children: childrenCount,
      suiteId,
      suiteName: chosenSuiteName,
      guestName,
      guestEmail,
      guestPhone,
      notes,
      type: bookingType
    });

    setSubmittedInquiryId(`ARIES-${Math.floor(100000 + Math.random() * 900000)}`);
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      <div
        id="booking-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={closeBookingModal}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#FAF8F5] text-[#23201C] w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-white/40 my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#23201C]/10 bg-[#F5F2EB]/70">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D53] font-semibold block">
                {siteData.contact.hotelName} · {siteData.contact.subtitle}
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#1E1B18] mt-0.5">
                {bookingType === 'direct_booking'
                  ? language === 'de'
                    ? 'Verbindliche Buchungsanfrage'
                    : language === 'it'
                    ? 'Prenotazione Diretta'
                    : 'Direct Reservation Request'
                  : language === 'de'
                  ? 'Unverbindliche Urlaubsanfrage'
                  : language === 'it'
                  ? 'Richiesta di Soggiorno'
                  : 'Vacation Inquiry'}
              </h3>
            </div>
            <button
              onClick={closeBookingModal}
              aria-label="Close"
              className="p-2 rounded-full hover:bg-[#23201C]/10 text-[#23201C] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8">
            {isSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-[#9E7D53]/15 text-[#9E7D53] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#1E1B18]">
                  {language === 'de' ? 'Herzlichen Dank für Ihre Anfrage!' : language === 'it' ? 'Grazie per la vostra richiesta!' : 'Thank You For Your Inquiry!'}
                </h4>
                <p className="text-sm text-[#5B544B] max-w-md mx-auto font-light leading-relaxed">
                  {language === 'de'
                    ? `Ihre Anfrage wurde unter der Referenznummer ${submittedInquiryId} aufgenommen. Unser Reservierungsteam meldet sich innerhalb von 12 Stunden persönlich mit Ihrem maßgeschneiderten Angebot.`
                    : `Your request was logged with reference ${submittedInquiryId}. Our reservations concierge will contact you personally within 12 hours with a bespoke offer.`}
                </p>
                <div className="pt-4">
                  <button
                    onClick={closeBookingModal}
                    className="px-6 py-2.5 bg-[#9E7D53] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-lg hover:bg-[#8C6D44] transition-colors"
                  >
                    {language === 'de' ? 'Schließen' : 'Close'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Booking Type Pill Selector */}
                <div className="flex rounded-lg bg-[#EFECE6] p-1 text-xs font-sans-clean">
                  <button
                    type="button"
                    onClick={() => setBookingType('inquiry')}
                    className={`flex-1 py-2 rounded-md font-medium text-center uppercase tracking-wider transition-all ${
                      bookingType === 'inquiry'
                        ? 'bg-white text-[#1E1B18] shadow-xs'
                        : 'text-[#7D7468] hover:text-[#1E1B18]'
                    }`}
                  >
                    {language === 'de' ? 'Unverbindlich anfragen' : language === 'it' ? 'Richiesta non vincolante' : 'Non-binding Inquiry'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingType('direct_booking')}
                    className={`flex-1 py-2 rounded-md font-medium text-center uppercase tracking-wider transition-all ${
                      bookingType === 'direct_booking'
                        ? 'bg-[#9E7D53] text-white shadow-xs'
                        : 'text-[#7D7468] hover:text-[#1E1B18]'
                    }`}
                  >
                    {language === 'de' ? 'Direkt reservieren' : language === 'it' ? 'Prenota subito' : 'Direct Reservation'}
                  </button>
                </div>

                {/* Dates & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] text-[#7D7468] font-semibold mb-1">
                      {language === 'de' ? 'Anreise' : language === 'it' ? 'Data Arrivo' : 'Arrival Date'}
                    </label>
                    <div className="flex items-center gap-2 border border-[#23201C]/15 bg-white rounded-lg px-3 py-2">
                      <Calendar className="w-4 h-4 text-[#9E7D53]" />
                      <input
                        type="date"
                        required
                        value={arrivalDate}
                        onChange={(e) => setArrivalDate(e.target.value)}
                        className="w-full bg-transparent text-xs sm:text-sm text-[#1E1B18] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] text-[#7D7468] font-semibold mb-1">
                      {language === 'de' ? 'Abreise' : language === 'it' ? 'Data Partenza' : 'Departure Date'}
                    </label>
                    <div className="flex items-center gap-2 border border-[#23201C]/15 bg-white rounded-lg px-3 py-2">
                      <Calendar className="w-4 h-4 text-[#9E7D53]" />
                      <input
                        type="date"
                        required
                        min={arrivalDate}
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="w-full bg-transparent text-xs sm:text-sm text-[#1E1B18] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Suite Preference & Guests Count */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-6">
                    <label className="block text-[10px] uppercase tracking-[0.18em] text-[#7D7468] font-semibold mb-1">
                      {language === 'de' ? 'Gewünschte Suite' : language === 'it' ? 'Suite Desiderata' : 'Preferred Suite'}
                    </label>
                    <select
                      value={suiteId}
                      onChange={(e) => setSuiteId(e.target.value)}
                      className="w-full border border-[#23201C]/15 bg-white rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#1E1B18] focus:outline-none"
                    >
                      {siteData.suites.map((s) => (
                        <option key={s.id} value={s.id}>
                          {t(s.name)} ({s.size} · ab €{s.priceFrom})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[10px] uppercase tracking-[0.18em] text-[#7D7468] font-semibold mb-1">
                      {language === 'de' ? 'Erwachsene' : language === 'it' ? 'Adulti' : 'Adults'}
                    </label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(parseInt(e.target.value, 10))}
                      className="w-full border border-[#23201C]/15 bg-white rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#1E1B18] focus:outline-none"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[10px] uppercase tracking-[0.18em] text-[#7D7468] font-semibold mb-1">
                      {language === 'de' ? 'Kinder' : language === 'it' ? 'Bambini' : 'Children'}
                    </label>
                    <select
                      value={childrenCount}
                      onChange={(e) => setChildrenCount(parseInt(e.target.value, 10))}
                      className="w-full border border-[#23201C]/15 bg-white rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#1E1B18] focus:outline-none"
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                </div>

                {/* Personal Guest Details */}
                <div className="space-y-4 pt-2 border-t border-[#23201C]/10">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] text-[#7D7468] font-semibold mb-1">
                      {language === 'de' ? 'Vor- & Nachname *' : language === 'it' ? 'Nome & Cognome *' : 'Full Name *'}
                    </label>
                    <div className="flex items-center gap-2 border border-[#23201C]/15 bg-white rounded-lg px-3 py-2">
                      <User className="w-4 h-4 text-[#9E7D53]" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Christian Weber"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full bg-transparent text-xs sm:text-sm text-[#1E1B18] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.18em] text-[#7D7468] font-semibold mb-1">
                        {language === 'de' ? 'E-Mail-Adresse *' : language === 'it' ? 'E-Mail *' : 'Email Address *'}
                      </label>
                      <div className="flex items-center gap-2 border border-[#23201C]/15 bg-white rounded-lg px-3 py-2">
                        <Mail className="w-4 h-4 text-[#9E7D53]" />
                        <input
                          type="email"
                          required
                          placeholder="christian@domain.com"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          className="w-full bg-transparent text-xs sm:text-sm text-[#1E1B18] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.18em] text-[#7D7468] font-semibold mb-1">
                        {language === 'de' ? 'Telefonnummer' : language === 'it' ? 'Telefono' : 'Phone Number'}
                      </label>
                      <div className="flex items-center gap-2 border border-[#23201C]/15 bg-white rounded-lg px-3 py-2">
                        <Phone className="w-4 h-4 text-[#9E7D53]" />
                        <input
                          type="tel"
                          placeholder="+49 170 1234567"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          className="w-full bg-transparent text-xs sm:text-sm text-[#1E1B18] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] text-[#7D7468] font-semibold mb-1">
                      {language === 'de' ? 'Besondere Wünsche / Anmerkungen' : language === 'it' ? 'Richieste particolari' : 'Special Wishes / Requests'}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={language === 'de' ? 'z.B. Anreisezeit, Allergien, Weinverkostung...' : 'e.g. arrival time, allergies, e-bike booking...'}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full border border-[#23201C]/15 bg-white rounded-lg p-3 text-xs sm:text-sm text-[#1E1B18] focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-lg bg-[#9E7D53] hover:bg-[#8C6D44] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>
                      {bookingType === 'direct_booking'
                        ? language === 'de'
                          ? 'Verbindliche Reservierung anfragen'
                          : language === 'it'
                          ? 'Richiedi Prenotazione'
                          : 'Request Reservation'
                        : language === 'de'
                        ? 'Unverbindliche Anfrage absenden'
                        : language === 'it'
                        ? 'Invia Richiesta'
                        : 'Submit Vacation Inquiry'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-center text-[#7D7468] mt-2 font-light">
                    {language === 'de'
                      ? 'Bestpreisgarantie bei Direktbuchung · Kostenlose Stornierung bis 14 Tage vor Anreise'
                      : 'Best rate guarantee when booking direct · Free cancellation up to 14 days prior'}
                  </p>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
