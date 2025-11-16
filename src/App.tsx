import React, { useState } from 'react';
import { Star, CheckCircle, ArrowRight, Phone, Mail, MapPin, ExternalLink, Loader2 } from 'lucide-react';
import { supabase } from './lib/supabase';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const webhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_URL;

      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          company: formData.company || '',
          message: formData.message || '',
          timestamp: new Date().toISOString()
        }),
      });

      if (!webhookResponse.ok) {
        throw new Error('Webhook request failed');
      }

      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            company: formData.company || null,
            message: formData.message || null,
            status: 'new'
          }
        ]);

      if (error) {
        console.error('Supabase error (backup storage):', error);
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToContact = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
  };

  const openAnalysisLink = () => {
    window.open('https://www.genspark.ai/api/page_private?id=cumznxdv', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BahkoStudio
              </h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={openAnalysisLink}
                className="min-h-[44px] px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Få gratis analys av din webbsida"
              >
                Få Gratis Analys
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Vi Fyller Din Kalender med{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Nya Kunder
            </span>{' '}
            inom 30 Dagar
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Garanterade resultat på 30 dagar eller pengarna tillbaka. Vi skapar landningssidor som konverterar + topplacering på Google. Över 200 nöjda kunder.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={scrollToContact}
              className="min-h-[56px] px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
              aria-label="Börja ditt 30-dagars test idag"
            >
              Börja Idag - 30 Dagars Test
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={openAnalysisLink}
              className="min-h-[56px] px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
              aria-label="Få gratis analys av din webbsida"
            >
              Få Min Gratis Analys
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Garanterade Resultat</h3>
              <p className="text-gray-600">30 dagar eller pengarna tillbaka</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">200+ Nöjda Kunder</h3>
              <p className="text-gray-600">Bevisat framgångsrikt system</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Snabba Resultat</h3>
              <p className="text-gray-600">Märkbara förbättringar inom 30 dagar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Våra Tjänster
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kompletta lösningar för att driva mer trafik och konvertera besökare till betalande kunder
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Landningssidor Som Konverterar</h3>
              <p className="text-gray-600 mb-6">
                Vi bygger webbsidor som konverterar besökare till kunder med psykologi-baserad design och optimerade konverteringsflöden.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />Mobiloptimerad design</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />A/B-testad för maximal konvertering</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />Snabba laddningstider</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">SEO Som Verkligen Fungerar</h3>
              <p className="text-gray-600 mb-6">
                Organisk ranking som placerar dig nummer 1 på Google Maps och Google sökning för dina lokala sökord.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />Google My Business optimering</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />Lokal SEO expertis</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />Kontinuerlig optimering</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <ArrowRight className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Digital Marknadsföring</h3>
              <p className="text-gray-600 mb-6">
                Annonser på Google, Facebook, Instagram för att nå varje lokal kund som letar efter dina tjänster.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />Google Ads expertis</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />Facebook & Instagram annonser</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />ROI-fokuserade kampanjer</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={scrollToContact}
              className="min-h-[56px] px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2 mx-auto"
              aria-label="Börja ditt 30-dagars test idag"
            >
              Börja Idag - 30 Dagars Test
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Så Här Fungerar Det
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              En beprövad process som levererar resultat inom 30 dagar
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-2xl font-bold text-blue-600">1</span>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Kostnadsfri Konsultation</h3>
              <p className="text-gray-600">Vi analyserar din nuvarande situation och identifierar förbättringsområden</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-2xl font-bold text-green-600">2</span>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-600 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Strategi & Implementation</h3>
              <p className="text-gray-600">Vi utvecklar en skräddarsydd strategi och börjar implementera lösningarna</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-2xl font-bold text-purple-600">3</span>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-600 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Optimering & Uppföljning</h3>
              <p className="text-gray-600">Kontinuerlig optimering och detaljerad rapportering av resultat</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-2xl font-bold text-yellow-600">4</span>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-600 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Garanterade Resultat</h3>
              <p className="text-gray-600">Märkbara förbättringar inom 30 dagar eller full återbetalning</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={openAnalysisLink}
              className="min-h-[56px] px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2 mx-auto"
              aria-label="Få gratis analys av din webbsida"
            >
              Få Min Gratis Analys
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Våra Resultat Talar för Sig Själva
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Verkliga case studies från våra kunder som har sett dramatiska förbättringar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Case Study 1 - Maykas Kitchen */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-orange-600">Maykas Kitchen</h3>
                <a 
                  href="https://maykaskitchen.se" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="min-h-[32px] text-orange-600 hover:text-orange-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded"
                  aria-label="Besök Maykas Kitchen webbsida"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-600 italic mb-6">
                "BahkoStudio skapade en modern och professionell webbsida för vår restaurang. Designen är vacker och visar verkligen upp vår mat på bästa sätt."
              </blockquote>
              <div className="border-t pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">Modern Design</div>
                  <div className="text-sm text-gray-500">Restaurang Webbsida</div>
                </div>
              </div>
            </div>

            {/* Case Study 2 - Kong Mindset */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-purple-600">Kong Mindset</h3>
                <a 
                  href="https://kongmindset.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="min-h-[32px] text-purple-600 hover:text-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded"
                  aria-label="Besök Kong Mindset webbsida"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-600 italic mb-6">
                "Vi som ägare är otroligt tacksamma och glada över den kursida som BahkoStudio har byggt – den har överträffat våra förväntningar både i design och funktion. Tack vare deras insats har vi nu en professionell plattform som verkligen speglar vårt varumärke och konverterar besökare till deltagare."
              </blockquote>
              <div className="border-t pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">Överträffade</div>
                  <div className="text-sm text-gray-500">Alla förväntningar</div>
                </div>
              </div>
            </div>

            {/* Case Study 3 - Matbodens */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-green-600">Matbodens</h3>
                <a 
                  href="https://matbodens.se" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="min-h-[32px] text-green-600 hover:text-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
                  aria-label="Besök Matbodens webbsida"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-600 italic mb-6">
                "Från 0 till 200+ kunder per månad med automatiserade flöden. BahkoStudio har revolutionerat vårt företag."
              </blockquote>
              <div className="border-t pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">200+</div>
                  <div className="text-sm text-gray-500">Nya kunder/månad</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={scrollToContact}
              className="min-h-[56px] px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2 mx-auto"
              aria-label="Börja ditt 30-dagars test idag"
            >
              Börja Idag - 30 Dagars Test
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white p-12 rounded-2xl shadow-xl">
            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              100% Pengarna-Tillbaka-Garanti
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Vi är så säkra på våra resultat att vi erbjuder en fullständig garanti. 
              Om du inte ser märkbara förbättringar inom 30 dagar, får du alla pengar tillbaka. 
              Inga krångliga villkor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToContact}
                className="min-h-[56px] px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg text-lg font-semibold hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2 justify-center"
                aria-label="Börja ditt 30-dagars test idag"
              >
                Börja Idag - 30 Dagars Test
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={openAnalysisLink}
                className="min-h-[56px] px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center gap-2 justify-center"
                aria-label="Få gratis analys av din webbsida"
              >
                Få Min Gratis Analys
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Låt Oss Hjälpa Dig Växa
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Kontakta oss idag för en kostnadsfri konsultation där vi diskuterar hur vi kan hjälpa ditt företag att nå sina mål.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-blue-400 mr-4 flex-shrink-0" />
                  <a 
                    href="tel:+46764793683" 
                    className="min-h-[32px] text-white hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                    aria-label="Ring BahkoStudio"
                  >
                    +46 76 479 36 83
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-blue-400 mr-4 flex-shrink-0" />
                  <a 
                    href="mailto:mathias@bahkostudio.live" 
                    className="min-h-[32px] text-white hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                    aria-label="Skicka email till BahkoStudio"
                  >
                    mathias@bahkostudio.live
                  </a>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-blue-400 mr-4 flex-shrink-0" />
                  <span className="text-white">Stockholm, Sverige</span>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold text-white mb-4">Varför Välja BahkoStudio?</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    200+ framgångsrika projekt genomförda
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    Genomsnittlig ROI på 300% för våra kunder
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    Specialiserade på den svenska marknaden
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    100% pengarna-tillbaka-garanti
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Börja Din Resa Till Fler Kunder
              </h3>
              
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                  <p className="text-green-800">Tack för ditt meddelande! Vi hör av oss inom 24 timmar.</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800">Något gick fel. Försök igen eller kontakta oss direkt.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Namn *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full min-h-[44px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder="Ditt fullständiga namn"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-post *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full min-h-[44px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder="din@email.se"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Telefonnummer
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full min-h-[44px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder="070-123 45 67"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Företag
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full min-h-[44px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder="Ditt företagsnamn"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Meddelande
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                    placeholder="Berätta om ditt företag och vad du vill uppnå..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[56px] px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  aria-label="Skicka kontaktformulär"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Skickar...
                    </>
                  ) : (
                    <>
                      Skicka Meddelande
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-sm text-gray-500 mt-6 text-center">
                Vi svarar normalt inom 2 timmar under kontorstid
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}