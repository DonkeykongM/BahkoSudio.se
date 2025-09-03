import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Phone, 
  Mail, 
  MapPin,
  ChevronDown,
  Menu,
  X,
  Target,
  Zap,
  BarChart3,
  Globe,
  Search,
  MessageSquare,
  MousePointer
} from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: { text: string; points: number }[];
}

interface QuizData {
  currentQuestion: number;
  answers: number[];
  totalScore: number;
  isComplete: boolean;
  showForm: boolean;
  formSubmitted: boolean;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Hur många kunder får ditt företag genom din hemsida per månad?",
    options: [
      { text: "0-5 kunder", points: 3 },
      { text: "5-15 kunder", points: 2 },
      { text: "15+ kunder", points: 1 }
    ]
  },
  {
    id: 2,
    question: "Hur syns ditt företag på Google när folk söker efter dina tjänster?",
    options: [
      { text: "Vet inte/syns dåligt", points: 3 },
      { text: "Syns ibland på sidan 2-3", points: 2 },
      { text: "Syns ofta på första sidan", points: 1 }
    ]
  },
  {
    id: 3,
    question: "Hur arbetar du med digital marknadsföring idag?",
    options: [
      { text: "Gör inget eller väldigt lite", points: 3 },
      { text: "Försöker själv då och då", points: 2 },
      { text: "Har hjälp från byrå/expert", points: 1 }
    ]
  }
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [quiz, setQuiz] = useState<QuizData>({
    currentQuestion: 0,
    answers: [],
    totalScore: 0,
    isComplete: false,
    showForm: false,
    formSubmitted: false
  });

  const [quizForm, setQuizForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: ''
  });

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  // Handle quiz answer
  const handleQuizAnswer = (points: number) => {
    const newAnswers = [...quiz.answers, points];
    const newScore = quiz.totalScore + points;
    
    if (quiz.currentQuestion < quizQuestions.length - 1) {
      setQuiz({
        ...quiz,
        currentQuestion: quiz.currentQuestion + 1,
        answers: newAnswers,
        totalScore: newScore
      });
    } else {
      setQuiz({
        ...quiz,
        answers: newAnswers,
        totalScore: newScore,
        isComplete: true,
        showForm: true
      });
    }
  };

  // Start quiz
  const startQuiz = () => {
    setQuiz({
      currentQuestion: 0,
      answers: [],
      totalScore: 0,
      isComplete: false,
      showForm: false,
      formSubmitted: false
    });
  };

  // Reset quiz
  const resetQuiz = () => {
    setQuiz({
      currentQuestion: 0,
      answers: [],
      totalScore: 0,
      isComplete: false,
      showForm: false,
      formSubmitted: false
    });
    setQuizForm({
      name: '',
      email: '',
      phone: '',
      company: '',
      website: ''
    });
  };

  // Submit quiz form
  const submitQuizForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const webhookData = {
        source: 'quiz',
        name: quizForm.name,
        email: quizForm.email,
        phone: quizForm.phone || '',
        company: quizForm.company,
        website: quizForm.website || '',
        quiz_score: quiz.totalScore,
        quiz_answers: quiz.answers,
        timestamp: new Date().toISOString()
      };

      const response = await fetch('https://hook.eu2.make.com/6rs6fuf9gqv0yfy4ygupar495u8glmpx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      });

      if (response.ok) {
        setQuiz({ ...quiz, formSubmitted: true });
        setSubmitMessage('Tack! Du får din personliga analys inom 24 timmar.');
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('Något gick fel. Försök igen eller kontakta oss direkt.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit contact form
  const submitContactForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const webhookData = {
        source: 'contact_form',
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone,
        timestamp: new Date().toISOString()
      };

      const response = await fetch('https://hook.eu2.make.com/6rs6fuf9gqv0yfy4ygupar495u8glmpx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      });

      if (response.ok) {
        setContactForm({ name: '', email: '', phone: '' });
        setSubmitMessage('Tack för ditt meddelande! Vi kontaktar dig inom kort.');
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('Något gick fel. Försök igen eller ring oss på +46764793683.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get quiz result message
  const getQuizResult = () => {
    if (quiz.totalScore >= 7) {
      return {
        title: "Hög potential för tillväxt! 🚀",
        description: "Du har stora möjligheter att öka din kundtillströmning dramatiskt. Vi kan hjälpa dig att fylla din kalender med nya kunder redan första månaden.",
        color: "text-red-600"
      };
    } else if (quiz.totalScore >= 5) {
      return {
        title: "Bra grund, kan förbättras! 💪",
        description: "Du är på rätt väg men det finns utrymme för förbättringar. Vi kan hjälpa dig att optimera och få ännu fler kunder.",
        color: "text-orange-600"
      };
    } else {
      return {
        title: "Du gör redan bra ifrån dig! ✨",
        description: "Du har en stark grund, men vi kan hjälpa dig att ta det till nästa nivå och automatisera dina processer.",
        color: "text-green-600"
      };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => scrollToSection('home')}
              className="font-bold text-xl text-gray-900 hover:text-indigo-600 transition-colors"
            >
              BahkoStudio
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === 'home' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                Hem
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === 'services' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                Tjänster
              </button>
              <button 
                onClick={() => scrollToSection('results')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === 'results' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                Resultat
              </button>
              <button 
                onClick={() => scrollToSection('quiz')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === 'quiz' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                Quiz
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Kontakt
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-2">
              <div className="flex flex-col space-y-1">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  Hem
                </button>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  Tjänster
                </button>
                <button 
                  onClick={() => scrollToSection('results')}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  Resultat
                </button>
                <button 
                  onClick={() => scrollToSection('quiz')}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  Quiz
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="block px-3 py-2 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Kontakt
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Vi Fyller Din Kalender med{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Nya Kunder
              </span>{' '}
              inom 30 Dagar
            </h1>
            
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Garanterade resultat på 30 dagar eller pengarna tillbaka. Vi skapar landningssidor som konverterar + topplacering på Google. Över 200 nöjda kunder.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => scrollToSection('quiz')}
                className="group bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
              >
                Gör Gratis Quiz Nu
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => scrollToSection('contact')}
                className="group bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-all duration-300 flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Ring +46764793683
              </button>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">30 Dagar</div>
                <div className="text-gray-600 mt-1">Garanterade resultat</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">200+</div>
                <div className="text-gray-600 mt-1">Nöjda kunder</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">5.0</div>
                <div className="text-gray-600 mt-1 flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  Stjärnor i betyg
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Vi Levererar Exakt Det Du Behöver
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Allt under samma tak - från SEO-optimerade landningssidor till Google Ads som faktiskt konverterar
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Landningssidor Som Konverterar
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                SEO-optimerade landningssidor, hemsidor med AEO (Answer Engine Optimization) och GEO-targeting som förvandlar besökare till betalande kunder.
              </p>
              <div className="text-sm text-indigo-600 font-medium">
                Långsiktig synlighet utan reklamkostnader
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Nå Top 3 på Google – Helt Gratis
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Bli top 3 på Google Maps helt organiskt – utan att betala för annonser. Syns där dina kunder söker, och låt din synlighet växa över tid.
              </p>
              <div className="text-sm text-green-600 font-medium">
                Långsiktig synlighet utan reklamkostnader
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Annonser Som Faktiskt Fungerar
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Facebook Ads, Google Ads och komplett digital marketing-strategi som når varje lokal kund i ditt område och fyller din kalender snabbt.
              </p>
              <div className="text-sm text-purple-600 font-medium">
                Snabba resultat med målriktade kampanjer
              </div>
            </div>
          </div>

          {/* Technical Expertise */}
          <div className="mt-16 bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Vår Tekniska Expertis
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="font-semibold text-indigo-600">SEO</div>
                  <div className="text-sm text-gray-600 mt-1">Sökoptimering</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="font-semibold text-green-600">AEO</div>
                  <div className="text-sm text-gray-600 mt-1">Answer Engine</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="font-semibold text-blue-600">GEO</div>
                  <div className="text-sm text-gray-600 mt-1">Lokal targeting</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="font-semibold text-purple-600">FB Ads</div>
                  <div className="text-sm text-gray-600 mt-1">Facebook</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="font-semibold text-red-600">Google Ads</div>
                  <div className="text-sm text-gray-600 mt-1">Sökannonsering</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="font-semibold text-orange-600">Marketing</div>
                  <div className="text-sm text-gray-600 mt-1">Digital strategi</div>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-600 mt-6">
              Vi hanterar allt från SEO-optimering till AEO för röstassistenter, GEO-targeting för lokala kunder och alla annonsplattformar under samma tak.
            </p>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
            >
              Boka Gratis Konsultation
            </button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Riktiga Resultat från Riktiga Kunder
            </h2>
            <p className="text-xl text-gray-600">
              Se hur vi har hjälpt svenska företag att explodera sin tillväxt
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Case Study 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  MK
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Maykas Kitchen</h3>
                  <p className="text-gray-600 mb-4">
                    "BahkoStudio fördubblade vår onlineförsäljning på 6 veckor. Från 50 till 100+ beställningar per vecka med deras landningssida och Google Ads strategi."
                  </p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">+200%</div>
                  <div className="text-sm text-gray-600">Ökning försäljning</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">6 veckor</div>
                  <div className="text-sm text-gray-600">Tid till resultat</div>
                </div>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  MB
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Matbodens</h3>
                  <p className="text-gray-600 mb-4">
                    "Från 0 till 200+ kunder per månad med automatiserade flöden. Deras SEO-strategi fick oss att rankas #1 för våra viktigaste sökord på bara 3 månader."
                  </p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">200+</div>
                  <div className="text-sm text-gray-600">Nya kunder/månad</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">#1</div>
                  <div className="text-sm text-gray-600">Google ranking</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Våra Resultat i Siffror
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">200+</div>
                <div className="text-gray-600">Nöjda kunder</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">350%</div>
                <div className="text-gray-600">Genomsnittlig tillväxt</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">30 dagar</div>
                <div className="text-gray-600">Tid till första resultat</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">5.0</div>
                <div className="text-gray-600 flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  Stjärnor i betyg
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => scrollToSection('quiz')}
              className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
            >
              Se Vad Vi Kan Göra För Dig
            </button>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Upptäck Din Tillväxtpotential
            </h2>
            <p className="text-xl text-gray-600">
              Svara på 3 snabba frågor och få en personlig strategi för ditt företag
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg">
            {!quiz.isComplete && quiz.currentQuestion === 0 && quiz.answers.length === 0 && (
              <div className="text-center">
                <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Redo att Upptäcka Din Potential?
                </h3>
                <p className="text-gray-600 mb-8">
                  Det här quizet tar bara 2 minuter och ger dig en skräddarsydd strategi för att växa ditt företag.
                </p>
                <button
                  onClick={startQuiz}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Starta Quiz
                </button>
              </div>
            )}

            {!quiz.isComplete && quiz.answers.length > 0 && (
              <div>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Fråga {quiz.currentQuestion + 1} av {quizQuestions.length}
                    </h3>
                    <button
                      onClick={resetQuiz}
                      className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                      Börja om
                    </button>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((quiz.currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-900 mb-6">
                    {quizQuestions[quiz.currentQuestion].question}
                  </h4>
                  <div className="space-y-4">
                    {quizQuestions[quiz.currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(option.points)}
                        className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {quiz.isComplete && !quiz.showForm && (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Quiz Slutfört!</h3>
                <button
                  onClick={() => setQuiz({...quiz, showForm: true})}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Se Mitt Resultat
                </button>
              </div>
            )}

            {quiz.showForm && !quiz.formSubmitted && (
              <div>
                <div className="text-center mb-8">
                  <div className={`text-xl font-bold mb-2 ${getQuizResult().color}`}>
                    {getQuizResult().title}
                  </div>
                  <p className="text-gray-600">
                    {getQuizResult().description}
                  </p>
                </div>

                <form onSubmit={submitQuizForm} className="space-y-6">
                  <h4 className="text-xl font-semibold text-gray-900 text-center">
                    Få Din Personliga Analys
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Namn *"
                      value={quizForm.name}
                      onChange={(e) => setQuizForm({...quizForm, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="email"
                      placeholder="E-post *"
                      value={quizForm.email}
                      onChange={(e) => setQuizForm({...quizForm, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      placeholder="Telefonnummer (valfritt)"
                      value={quizForm.phone}
                      onChange={(e) => setQuizForm({...quizForm, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Företag *"
                      value={quizForm.company}
                      onChange={(e) => setQuizForm({...quizForm, company: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <input
                    type="url"
                    placeholder="Hemsida (valfritt)"
                    value={quizForm.website}
                    onChange={(e) => setQuizForm({...quizForm, website: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Skickar...' : 'Få min personliga analys →'}
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    Du får din personliga analys och strategiförslag inom 24 timmar
                  </p>
                </form>
              </div>
            )}

            {quiz.formSubmitted && (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Tack!</h3>
                <p className="text-gray-600 mb-6">
                  {submitMessage}
                </p>
                <button
                  onClick={resetQuiz}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Gör Quiz Igen
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Redo att Börja? Låt Oss Prata!
            </h2>
            <p className="text-xl text-gray-600">
              30 dagars garanti - Vi fyller din kalender eller du får pengarna tillbaka
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Boka Gratis Konsultation
              </h3>
              
              <form onSubmit={submitContactForm} className="space-y-6">
                <input
                  type="text"
                  placeholder="Namn *"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
                
                <input
                  type="email"
                  placeholder="E-post *"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
                
                <input
                  type="tel"
                  placeholder="Telefonnummer *"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Skickar...' : (
                    <>
                      <ArrowRight className="w-5 h-5" />
                      Boka Gratis Konsultation
                    </>
                  )}
                </button>
              </form>

              {submitMessage && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800">{submitMessage}</p>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Kontakta Oss Direkt
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Ring oss direkt</div>
                      <a 
                        href="tel:+46764793683" 
                        className="text-indigo-600 hover:underline"
                      >
                        +46764793683
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Skicka e-post</div>
                      <a 
                        href="mailto:mathias@bahkostudio.live" 
                        className="text-green-600 hover:underline"
                      >
                        mathias@bahkostudio.live
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Vi hjälper företag i</div>
                      <div className="text-purple-600">Hela Sverige</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
                <h4 className="text-xl font-bold mb-4">30 Dagars Garanti</h4>
                <p className="mb-4">
                  Vi är så säkra på våra resultat att vi erbjuder full pengarna-tillbaka-garanti om du inte ser resultat inom 30 dagar.
                </p>
                <div className="flex items-center gap-2 text-indigo-200">
                  <CheckCircle className="w-5 h-5" />
                  Ingen risk - bara resultat
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button
        onClick={() => scrollToSection('home')}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-indigo-700 transition-colors flex items-center justify-center z-40"
        aria-label="Scroll to top"
      >
        <ChevronDown className="w-6 h-6 rotate-180" />
      </button>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">BahkoStudio</div>
            <p className="text-gray-400 mb-6">
              Vi fyller din kalender med nya kunder inom 30 dagar - garanterat
            </p>
            
            <div className="flex justify-center gap-6 mb-8">
              <a 
                href="tel:+46764793683" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-6 h-6" />
              </a>
              <a 
                href="mailto:mathias@bahkostudio.live" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400 text-sm">
                © 2024 BahkoStudio. Alla rättigheter förbehållna.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;