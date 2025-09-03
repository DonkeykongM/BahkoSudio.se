import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  Target, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Star,
  ArrowRight,
  ChevronUp
} from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: { text: string; points: number }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Hur många nya kunder behöver du för att nå dina mål?",
    options: [
      { text: "1-5 nya kunder/månad", points: 1 },
      { text: "6-15 nya kunder/månad", points: 2 },
      { text: "16-30 nya kunder/månad", points: 3 },
      { text: "30+ nya kunder/månad", points: 4 }
    ]
  },
  {
    id: 2,
    question: "Vilken typ av företag driver du?",
    options: [
      { text: "Lokal tjänst (VVS, elektriker, städ)", points: 4 },
      { text: "Restaurant/café", points: 3 },
      { text: "E-handel/webshop", points: 2 },
      { text: "Konsultverksamhet", points: 3 }
    ]
  },
  {
    id: 3,
    question: "Vad är din största utmaning just nu?",
    options: [
      { text: "För få kunder", points: 4 },
      { text: "Svårt att nå rätt målgrupp", points: 3 },
      { text: "Konkurrensen är för hård", points: 3 },
      { text: "Vet inte var jag ska marknadsföra", points: 4 }
    ]
  },
  {
    id: 4,
    question: "Hur mycket spenderar du på marknadsföring per månad?",
    options: [
      { text: "0-2 000 kr", points: 4 },
      { text: "2 000-10 000 kr", points: 3 },
      { text: "10 000-25 000 kr", points: 2 },
      { text: "25 000+ kr", points: 1 }
    ]
  },
  {
    id: 5,
    question: "Har du en professionell hemsida?",
    options: [
      { text: "Nej, ingen hemsida", points: 4 },
      { text: "Ja, men den är gammal/dålig", points: 3 },
      { text: "Ja, men den konverterar inte", points: 3 },
      { text: "Ja, modern och funktionell", points: 1 }
    ]
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showQuizForm, setShowQuizForm] = useState(false);
  
  // Form states
  const [contactForm, setContactForm] = useState({
    name: '', 
    email: '', 
    phone: ''
  });
  const [quizForm, setQuizForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollTop(scrollY > 400);
      
      // Update active section based on scroll position
      const sections = ['hero', 'services', 'results', 'quiz', 'contact'];
      const sectionElements = sections.map(id => document.getElementById(id));
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollY + 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  // Quiz functions
  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setShowQuizForm(false);
    setQuizSubmitted(false);
  };

  const handleQuizAnswer = (points: number) => {
    setScore(score + points);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setShowQuizForm(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setShowQuizForm(false);
    setQuizSubmitted(false);
  };

  // Form submissions
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://hook.eu2.make.com/6rs6fuf9gqv0yfy4ygupar495u8glmpx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...contactForm,
          source: 'contact_form'
        }),
      });

      if (response.ok) {
        setContactSubmitted(true);
        setContactForm({ name: '', email: '', phone: '' });
        setTimeout(() => setContactSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error sending contact form:', error);
    }
  };

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://hook.eu2.make.com/6rs6fuf9gqv0yfy4ygupar495u8glmpx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...quizForm,
          score: score,
          source: 'quiz'
        }),
      });

      const contentType = response.headers.get("content-type");
      let result;
      
      if (contentType && contentType.indexOf("application/json") !== -1) {
        result = await response.json();
      } else {
        result = await response.text();
      }
      
      if (response.ok) {
        setQuizSubmitted(true);
        setQuizForm({ name: '', email: '', phone: '', company: '', website: '' });
        setTimeout(() => {
          setQuizSubmitted(false);
          resetQuiz();
        }, 5000);
      }
    } catch (error) {
      console.error('Error sending quiz data:', error);
    }
  };

  const getQuizResultText = () => {
    if (score <= 8) return "Din digitala närvaro har stor potential för förbättring!";
    if (score <= 12) return "Du har en bra grund, men det finns rum för optimering!";
    if (score <= 16) return "Imponerande! Du har en stark digital strategi!";
    return "Fantastisk! Du är redan en digital mästare!";
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">BahkoStudio</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'hero', label: 'Hem' },
                { id: 'services', label: 'Tjänster' },
                { id: 'results', label: 'Resultat' },
                { id: 'quiz', label: 'Quiz' },
                { id: 'contact', label: 'Kontakt' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`hover:text-blue-600 transition-colors cursor-pointer ${
                    activeSection === id ? 'text-blue-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t">
              {[
                { id: 'hero', label: 'Hem' },
                { id: 'services', label: 'Tjänster' },
                { id: 'results', label: 'Resultat' },
                { id: 'quiz', label: 'Quiz' },
                { id: 'contact', label: 'Kontakt' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`block w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${
                    activeSection === id ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Vi Fyller Din Kalender med Nya Kunder inom{' '}
              <span className="text-blue-600">30 Dagar</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Garanterade resultat eller pengarna tillbaka. Vi skapar landningssidor som konverterar + 
              topplacering på Google. Över 200 nöjda kunder i Sverige.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('quiz')}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg cursor-pointer"
              >
                Gör Gratis Quiz Nu →
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Ring +46764793683
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Våra Tjänster Som Garanterar Resultat
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              En komplett lösning för att skala ditt företag digitalt
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Landningssidor Som Konverterar</h3>
              <p className="text-gray-600">Vi bygger webbsidor som konverterar besökare till kunder med genomsnittligt 25% högre konvertering än branschstandarder.</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100 hover:shadow-lg transition-all duration-300">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">SEO Optimering</h3>
              <p className="text-gray-600">Organisk ranking som placerar dig nummer 1 på Google Maps och sökning för dina viktigaste sökord.</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-white border border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Digital Marknadsföring</h3>
              <p className="text-gray-600">Annonser på Google, Facebook, Instagram för att nå varje lokal kund i din målgrupp med precision.</p>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg cursor-pointer"
            >
              Boka Gratis Konsultation →
            </button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Verkliga Resultat från Våra Kunder
            </h2>
            <p className="text-xl text-gray-600">
              Se vad vi har åstadkommit för svenska företag
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 text-lg mb-6 leading-relaxed">
                "BahkoStudio fördubblade vår onlineförsäljning på 6 veckor. Deras landningssida konverterade 40% av besökarna till kunder."
              </blockquote>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">Maykas Kitchen</p>
                <p className="text-gray-600">Restaurang, Stockholm</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 text-lg mb-6 leading-relaxed">
                "Från 0 till 200+ kunder per månad med automatiserade flöden. ROI på 800% första året."
              </blockquote>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">Matbodens</p>
                <p className="text-gray-600">Livsmedelsleverans, Göteborg</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 text-lg mb-6 leading-relaxed">
                "Nummer 1 på Google för alla våra tjänster. Bookningarna ökade med 300% första månaden."
              </blockquote>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">VVS Proffsen</p>
                <p className="text-gray-600">VVS-tjänster, Malmö</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => scrollToSection('quiz')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg cursor-pointer"
            >
              Se Vad Vi Kan Göra För Dig →
            </button>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upptäck Din Digitala Potential
            </h2>
            <p className="text-xl text-gray-600">
              Ta vårt gratis quiz och få en personlig strategi inom 24 timmar
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg">
            {!quizStarted ? (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  5 Snabba Frågor - 2 Minuter
                </h3>
                <p className="text-gray-600 mb-8">
                  Få en personlig analys av ditt företags digitala mognad och konkreta råd för nästa steg.
                </p>
                <button 
                  onClick={startQuiz}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg cursor-pointer"
                >
                  Starta Quiz →
                </button>
              </div>
            ) : !quizCompleted ? (
              <div>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-600">
                      Fråga {currentQuestion + 1} av {quizQuestions.length}
                    </span>
                    <button 
                      onClick={resetQuiz}
                      className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                      Börja om
                    </button>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    {quizQuestions[currentQuestion].question}
                  </h3>
                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(option.points)}
                        className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : showQuizForm ? (
              !quizSubmitted ? (
                <div>
                  <div className="text-center mb-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Quiz Slutfört!</h3>
                    <p className="text-lg text-gray-700 mb-2">{getQuizResultText()}</p>
                    <p className="text-gray-600">
                      Fyll i dina uppgifter för att få din personliga analys inom 24 timmar.
                    </p>
                  </div>

                  <form onSubmit={handleQuizSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Namn *"
                        required
                        value={quizForm.name}
                        onChange={(e) => setQuizForm({...quizForm, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="email"
                        placeholder="E-post *"
                        required
                        value={quizForm.email}
                        onChange={(e) => setQuizForm({...quizForm, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="tel"
                        placeholder="Telefonnummer (valfritt)"
                        value={quizForm.phone}
                        onChange={(e) => setQuizForm({...quizForm, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Företag *"
                        required
                        value={quizForm.company}
                        onChange={(e) => setQuizForm({...quizForm, company: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <input
                      type="url"
                      placeholder="Hemsida (valfritt)"
                      value={quizForm.website}
                      onChange={(e) => setQuizForm({...quizForm, website: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <button 
                      type="submit"
                      className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 cursor-pointer"
                    >
                      Få Min Personliga Analys →
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Tack!</h3>
                  <p className="text-gray-600 mb-6">
                    Vi skickar din personliga analys inom 24 timmar till din e-post.
                  </p>
                  <button 
                    onClick={resetQuiz}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Gör Quiz Igen
                  </button>
                </div>
              )
            ) : null}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Redo Att Starta Ditt 30-Dagars Test?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Kontakta oss idag för en gratis konsultation och se hur vi kan fördubbla dina kunder
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-6">Kontaktinformation</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="text-gray-300">Ring oss direkt</p>
                    <a href="tel:+46764793683" className="text-lg font-semibold text-white hover:text-blue-400 transition-colors cursor-pointer">
                      +46 76 479 36 83
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="text-gray-300">E-posta oss</p>
                    <a href="mailto:mathias@bahkostudio.live" className="text-lg font-semibold text-white hover:text-blue-400 transition-colors cursor-pointer">
                      mathias@bahkostudio.live
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-2xl">
                <h4 className="text-lg font-bold mb-3 text-blue-400">30-Dagars Garanti</h4>
                <p className="text-gray-300">
                  Vi är så säkra på våra resultat att vi erbjuder full pengarna-tillbaka-garanti om du inte ser förbättring inom 30 dagar.
                </p>
              </div>
            </div>

            <div>
              {!contactSubmitted ? (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Namn *"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      placeholder="E-post *"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="tel"
                      placeholder="Telefonnummer *"
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                      className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 cursor-pointer"
                  >
                    Få Gratis Konsultation →
                  </button>
                </form>
              ) : (
                <div className="bg-green-900/50 border border-green-500 rounded-2xl p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-400 mb-2">Meddelandet Skickat!</h3>
                  <p className="text-gray-300">
                    Vi hör av oss inom 24 timmar för att boka din gratis konsultation.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold text-blue-400 mb-4 md:mb-0">BahkoStudio</div>
            <div className="flex space-x-8">
              <a href="tel:+46764793683" className="hover:text-blue-400 transition-colors cursor-pointer">
                +46 76 479 36 83
              </a>
              <a href="mailto:mathias@bahkostudio.live" className="hover:text-blue-400 transition-colors cursor-pointer">
                mathias@bahkostudio.live
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BahkoStudio. Alla rättigheter förbehållna.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-110 transition-all duration-200 z-50 cursor-pointer"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
}