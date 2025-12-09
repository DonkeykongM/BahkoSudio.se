import React, { useState } from 'react';
import { Star, CheckCircle, ArrowRight, Phone, Mail, MapPin, ExternalLink, Loader2, ChevronDown } from 'lucide-react';
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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Hur lång tid tar det att bygga en hemsida?",
      answer: "En typisk landningssida eller företagshemsida tar 1-2 veckor från start till lansering. För mer komplexa projekt med flera sidor och funktioner kan det ta 3-4 veckor. Vi arbetar snabbt utan att kompromissa med kvaliteten."
    },
    {
      question: "Vad kostar det att bygga en professionell hemsida?",
      answer: "Våra priser börjar från 15 000 kr för en enkel landningssida. En fullständig företagshemsida med flera sidor kostar mellan 25 000-50 000 kr. Vi erbjuder alltid en kostnadsfri konsultation där vi kan ge dig en exakt offert baserat på dina behov."
    },
    {
      question: "Får jag en mobilanpassad hemsida?",
      answer: "Absolut! Alla våra hemsidor är fullt responsiva och ser perfekta ut på mobiler, surfplattor och datorer. Över 60% av alla besökare kommer från mobila enheter, så mobiloptimering är alltid en prioritet i våra projekt."
    },
    {
      question: "Kan jag uppdatera hemsidan själv efteråt?",
      answer: "Ja, vi bygger hemsidor som är enkla att uppdatera. Vi ger dig en genomgång av hur du enkelt kan uppdatera texter, bilder och innehåll. För mer tekniska uppdateringar erbjuder vi löpande support."
    },
    {
      question: "Vad ingår i SEO-optimeringen?",
      answer: "Våra hemsidor är optimerade för sökmotorer från start med snabba laddningstider, semantisk HTML, meta-taggar, strukturerad data, och optimerat innehåll för relevanta sökord. Detta hjälper din hemsida att synas bättre på Google."
    },
    {
      question: "Hjälper ni med webbhotell och domän?",
      answer: "Ja, vi kan hjälpa dig med både webbhotell och domänregistrering. Vi rekommenderar pålitliga leverantörer och kan sköta hela uppsättningen åt dig så att allt fungerar smidigt från dag ett."
    },
    {
      question: "Vad händer efter att hemsidan är klar?",
      answer: "Efter lansering får du full äganderätt till hemsidan. Vi erbjuder support och underhållspaket om du vill ha hjälp med framtida uppdateringar, säkerhetsuppdateringar eller vidareutveckling av hemsidan."
    },
    {
      question: "Kan ni hjälpa till med texterna och bilderna?",
      answer: "Ja! Vi kan hjälpa dig skapa engagerande texter som säljer, eller arbeta med det innehåll du redan har. Vi använder professionella stockfotos från Pexels eller kan integrera dina egna bilder och material."
    },
    {
      question: "Vad är er 30-dagars garanti?",
      answer: "Vi är så säkra på våra resultat att vi erbjuder 30 dagars garanti. Om du inte ser märkbara förbättringar i ditt företag inom 30 dagar får du pengarna tillbaka. Inga krångliga villkor."
    },
    {
      question: "Hur fungerar Google Ads-kampanjer?",
      answer: "Vi skapar och hanterar Google Ads-kampanjer som placerar ditt företag framför kunder som aktivt söker efter dina tjänster. Du betalar bara när någon klickar på din annons. Vi optimerar kontinuerligt för bästa ROI."
    },
    {
      question: "Kan ni ranka mitt företag top 3 på Google Maps?",
      answer: "Ja! Med vår lokala SEO-strategi rankar vi ditt företag top 3 på Google Maps inom 90 dagar. Detta ökar din synlighet dramatiskt för lokala kunder som söker efter dina tjänster i ditt område."
    },
    {
      question: "Vad kostar det att bygga en app?",
      answer: "Priset för en app varierar beroende på funktionalitet och komplexitet. En enkel app börjar från 50 000 kr, medan mer avancerade appar med backend, betalningar och användarkonton kan kosta 100 000-200 000 kr. Vi ger alltid en kostnadsfri offert."
    },
    {
      question: "Erbjuder ni reklamfilmer och videoproduktion?",
      answer: "Ja! Vi producerar professionella reklamfilmer för sociala medier, YouTube och din hemsida. Från koncept till färdig film – vi hjälper dig berätta din historia på ett sätt som engagerar och konverterar."
    },
    {
      question: "Hur snabbt kan jag få nya kunder?",
      answer: "Med våra Google Ads-kampanjer kan du börja få nya leads inom 24-48 timmar efter lansering. För organisk SEO och Google Maps ranking ser du resultat inom 30-90 dagar. Vi fokuserar på snabba, mätbara resultat."
    },
    {
      question: "Jobbar ni med alla branscher?",
      answer: "Vi är specialiserade på lokala företag som restauranger, frisörer, tandläkare, hantverkare, gym och tjänsteföretag. Vår expertis ligger i att hjälpa brick-and-mortar företag att dominera sin lokala marknad online."
    },
    {
      question: "Vad skiljer er från andra webbbyråer?",
      answer: "Vi fokuserar på resultat, inte bara snygga hemsidor. Med vår 30-dagars garanti, beprövade strategier för lokal SEO och paid ads, samt vår specialisering på lokala företag, levererar vi mätbara resultat som fyller din kalender med nya kunder."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <img
                src="https://nikjm8tf0e.ufs.sh/f/mNFirk6dCRarzegIlqhRqJO8ZrmDNjg4Sc2WzeU9pnIB7Kub"
                alt="BahkoStudio Logo"
                className="h-20 w-20 object-contain"
              />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                BahkoStudio
              </h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={openAnalysisLink}
                className="min-h-[48px] px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 group"
                aria-label="Ladda ner gratis guide värd 799 kr"
              >
                <span className="flex items-center gap-2 font-bold">
                  Gratis Guide (799 kr)
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-60"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/50 rounded-full text-sm font-bold text-indigo-700 backdrop-blur-sm uppercase tracking-wide">
              📅 30 Dagar – Garanterat
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight text-balance">
            Vi Fyller Din Kalender{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent inline-block">
              Med Nya Kunder
            </span>
            <br />
            <span className="text-5xl md:text-6xl lg:text-7xl text-gray-700">Inom 30 Dagar</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-normal">
            Sluta vänta på att kunder ska hitta dig.
            <span className="block mt-3 text-lg text-gray-700 font-semibold">Vi placerar ditt företag framför lokala kunder som aktivt söker dina tjänster.</span>
            <span className="block mt-3 text-base text-gray-500">Hemsidor • Appar • Google Ads • SEO • Reklamfilmer</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={scrollToContact}
              className="group min-h-[60px] px-10 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center gap-2 relative overflow-hidden"
              aria-label="Kom igång med din nya hemsida"
            >
              <span className="relative z-10 font-bold uppercase tracking-wide">Boka Samtal</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button
              onClick={openAnalysisLink}
              className="group min-h-[60px] px-10 py-4 glass-card text-gray-800 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center gap-2"
              aria-label="Få en gratis guide värd 799 kr"
            >
              <span>Få Gratis Guide (799 kr)</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-all duration-300 group glow-card">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">30 Dagars Garanti</h3>
              <p className="text-sm text-gray-600 font-medium">Resultat eller pengarna tillbaka</p>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-all duration-300 group glow-card">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Top 3 På Google Maps</h3>
              <p className="text-sm text-gray-600 font-medium">Inom 90 dagar</p>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-all duration-300 group glow-card">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Var Överallt</h3>
              <p className="text-sm text-gray-600 font-medium">Google, Instagram, Facebook, YouTube, ChatGPT, Claude, Grok, Perplexity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/50 rounded-full text-sm font-bold text-indigo-700 backdrop-blur-sm inline-block mb-4 uppercase tracking-wide">
              🚀 Allt Du Behöver
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
              Synas.{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Växa.</span>{' '}
              Dominera.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-normal">
              Sluta vänta på att kunder ska hitta dig. <span className="font-semibold text-gray-800">Var överallt där de letar.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group relative glass-card p-10 rounded-3xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Hemsidor & Appar</h3>
                <p className="text-gray-600 mb-6 leading-relaxed font-medium">
                  Visa upp dig professionellt. Jobba smart. Imponera på varje besökare.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center text-sm font-medium"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3"></div>Hemsidor som konverterar</li>
                  <li className="flex items-center text-sm font-medium"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3"></div>Mobila appar (iOS & Android)</li>
                  <li className="flex items-center text-sm font-medium"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3"></div>Blixtsnabb prestanda</li>
                </ul>
              </div>
            </div>

            <div className="group relative glass-card p-10 rounded-3xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Annonser Som Ger ROI</h3>
                <p className="text-gray-600 mb-6 leading-relaxed font-medium">
                  Nå varje lokal kund som aktivt söker efter dina tjänster.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center text-sm font-medium"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>Google Ads expertis</li>
                  <li className="flex items-center text-sm font-medium"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>Instagram & Facebook kampanjer</li>
                  <li className="flex items-center text-sm font-medium"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>YouTube marknadsföring</li>
                  <li className="flex items-center text-sm font-medium"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>Professionella reklamfilmer</li>
                </ul>
              </div>
            </div>

            <div className="group relative glass-card p-10 rounded-3xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <ArrowRight className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ranka På Första Sidan</h3>
                <p className="text-gray-600 mb-6 leading-relaxed font-medium">
                  Top 3 på Google Maps inom 90 dagar. Garanterad organisk synlighet.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center text-sm font-medium"><div className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-3"></div>Google Maps ranking</li>
                  <li className="flex items-center text-sm font-medium"><div className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-3"></div>Lokal SEO-dominans</li>
                  <li className="flex items-center text-sm font-medium"><div className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-3"></div>70% av trafiken går till topp 3</li>
                </ul>
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
              <p className="text-gray-600 mb-4">Vi analyserar din nuvarande situation och identifierar förbättringsområden</p>
              <button
                onClick={scrollToContact}
                className="min-h-[44px] px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center gap-2"
                aria-label="Kontakta oss för kostnadsfri konsultation"
              >
                Kontakta Oss
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-gray-500 mt-3 max-w-xs mx-auto">
                I meddelande: skriv "kostnadsfri konsultation" med din hemsida så löser vi det gratis
              </p>
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
              className="group min-h-[60px] px-10 py-4 glass-card text-gray-800 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 inline-flex items-center gap-2"
              aria-label="Få en gratis guide värd 799 kr"
            >
              <span>Få Gratis Guide (799 kr)</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/50 rounded-full text-sm font-medium text-indigo-700 backdrop-blur-sm inline-block mb-4">
              ❤️ Projekt Vi Är Stolta Över
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
              Hemsidor som{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">gör skillnad</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Varje projekt är en unik historia där vi hjälper företag växa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Case Study 1 - Maykas Kitchen */}
            <div className="group glass-card p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-orange-600">Maykas Kitchen</h3>
                  <a
                    href="https://maykaskitchen.se"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[32px] text-orange-600 hover:text-orange-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded"
                    aria-label="Besök Maykas Kitchen webbsida"
                  >
                    <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 leading-relaxed mb-6 text-lg">
                  "BahkoStudio skapade en modern och professionell webbsida för vår restaurang. Designen är vacker och visar verkligen upp vår mat på bästa sätt."
                </blockquote>
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-1">Modern Design</div>
                    <div className="text-sm text-gray-500 font-medium">Restaurang Webbsida</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study 2 - Kong Mindset */}
            <div className="group glass-card p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-purple-600">Kong Mindset</h3>
                <a
                  href="https://kongmindset.se"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[32px] text-purple-600 hover:text-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded"
                  aria-label="Besök Kong Mindset webbsida"
                >
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 leading-relaxed mb-6 text-lg">
                  "Vi som ägare är otroligt tacksamma och glada över den kursida som BahkoStudio har byggt – den har överträffat våra förväntningar både i design och funktion."
                </blockquote>
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1">Överträffade</div>
                    <div className="text-sm text-gray-500 font-medium">Alla förväntningar</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study 3 - Matbodens */}
            <div className="group glass-card p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-green-600">Matbodens</h3>
                <a 
                  href="https://matbodens.se" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="min-h-[32px] text-green-600 hover:text-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
                  aria-label="Besök Matbodens webbsida"
                >
                    <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 leading-relaxed mb-6 text-lg">
                  "Från 0 till 200+ kunder per månad med automatiserade flöden. BahkoStudio har revolutionerat vårt företag."
                </blockquote>
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">200+</div>
                    <div className="text-sm text-gray-500 font-medium">Nya kunder/månad</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <button
              onClick={scrollToContact}
              className="group min-h-[60px] px-10 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 inline-flex items-center gap-2 relative overflow-hidden"
              aria-label="Kom igång med din nya hemsida"
            >
              <span className="relative z-10">Börja Din Resa Med Oss</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                    href="tel:+46762540951"
                    className="min-h-[32px] text-white hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                    aria-label="Ring BahkoStudio"
                  >
                    +46 76 254 09 51
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

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Vanliga Frågor om Hemsidor och Webbdesign
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Här hittar du svar på de vanligaste frågorna om att bygga en professionell hemsida
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-blue-300 transition-colors duration-200">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  aria-expanded={openFaqIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-8">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-600 flex-shrink-0 transform transition-transform duration-200 ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Har du fler frågor? Vi svarar gärna på allt du undrar över.
            </p>
            <button
              onClick={scrollToContact}
              className="min-h-[56px] px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center gap-2"
              aria-label="Kontakta oss för att ställa dina frågor"
            >
              Kontakta Oss Idag
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}