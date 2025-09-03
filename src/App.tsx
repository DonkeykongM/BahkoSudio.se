import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Target, TrendingUp, Star, ArrowRight, Zap, Users, Award, Phone, Mail, Shield, X, ChevronRight, BarChart3, Rocket, Globe, Search, Menu, ExternalLink } from 'lucide-react';

function App() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [countdown, setCountdown] = useState(60);
  const [quizStarted, setQuizStarted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const quizQuestions = [
    {
      question: "Har du en professionell webbsida för ditt företag?",
      options: [
        "Ja, en modern och optimerad sida",
        "Ja, men den är gammal och behöver uppdateras", 
        "Nej, bara sociala medier",
        "Nej, inget online alls"
      ]
    },
    {
      question: "Hur hittar dina kunder dig idag?",
      options: [
        "Via Google-sökningar organiskt",
        "Via rekommendationer och word-of-mouth",
        "Via sociala medier",
        "Vet inte / De hittar mig inte"
      ]
    },
    {
      question: "Vad händer när potentiella kunder besöker din nuvarande webbplats?",
      options: [
        "De kontaktar mig direkt för köp",
        "De browsear runt men få kontaktar mig",
        "Högt avhopp - de lämnar snabbt",
        "Har ingen webbsida att besöka"
      ]
    },
    {
      question: "Hur mycket tid lägger du på att få nya kunder varje vecka?",
      options: [
        "0-5 timmar - det flyter på automatiskt",
        "5-15 timmar - en del manuellt arbete",
        "15-25 timmar - mycket eget letande",
        "25+ timmar - konstant jakt på kunder"
      ]
    }
  ];

  useEffect(() => {
    if (quizStarted && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (quizStarted && countdown === 0) {
      setShowQuiz(false);
      setQuizStarted(false);
      setCurrentQuestion(0);
      setAnswers([]);
      setCountdown(60);
    }
  }, [countdown, quizStarted]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuiz(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed
      const problemScore = newAnswers.reduce((sum, answer, index) => {
        // Higher score = more problems
        if (index === 0 && answer >= 2) return sum + 2; // No website
        if (index === 1 && answer >= 2) return sum + 2; // Not found via Google
        if (index === 2 && answer >= 2) return sum + 2; // High bounce rate
        if (index === 3 && answer >= 2) return sum + 2; // Spending too much time
        return sum + answer;
      }, 0);

      localStorage.setItem('bahko-quiz-score', problemScore.toString());
      setShowQuiz(false);
      setQuizStarted(false);
      // Reset for next time
      setCurrentQuestion(0);
      setAnswers([]);
      setCountdown(60);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Quiz Popup */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-white/20">
            <button 
              onClick={() => setShowQuiz(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {!quizStarted ? (
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Får du tillräckligt med kunder?
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Ta vår 60-sekunders quiz och upptäck vad du missar. 
                  <strong className="text-gray-900"> Få din personliga analys direkt.</strong>
                </p>
                <button 
                  onClick={startQuiz}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Starta quiz (60 sek)
                </button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <div className="text-sm text-gray-500 font-medium">
                    Fråga {currentQuestion + 1} av {quizQuestions.length}
                  </div>
                  <div className="text-sm text-orange-600 font-bold bg-orange-50 px-3 py-1 rounded-full">
                    {countdown}s kvar
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-8">
                  {quizQuestions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className="w-full text-left p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 hover:shadow-sm"
                    >
                      <span className="text-gray-800">{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <img 
                src="https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCisV54LEMpqflOXSIZd3wu9KziagAHJkL4Wb5" 
                alt="BahkoStudio Logo" 
                className="h-10 mr-4"
              />
              <span className="text-2xl font-bold text-gray-900">BahkoStudio</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#tjanster" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Tjänster</a>
              <a href="#process" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Process</a>
              <a href="#kontakt" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Kontakt</a>
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Få gratis analys
              </button>
            </nav>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <a href="#tjanster" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Tjänster</a>
                <a href="#process" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Process</a>
                <a href="#kontakt" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Kontakt</a>
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold w-full">
                  Få gratis analys
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section - David Ogilvy Style */}
      <section className="relative py-20 lg:py-32 overflow-hidden" itemScope itemType="https://schema.org/WebPage">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 75% 75%, #f97316 0%, transparent 50%)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight" itemProp="headline">
              Vi Fyller Din Kalender med Nya Kunder inom 30 Dagar - <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Garanterat</span>
            </h1>
            
            <p className="text-2xl lg:text-3xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed" itemProp="description">
              Sluta vänta på att kunder ska hitta dig.
              <strong className="text-gray-900"> Vi placerar ditt företag framför lokala personer som aktivt söker efter dina tjänster - från och med denna månad.</strong>
            </p>
            
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-8 mb-12 max-w-3xl mx-auto shadow-lg">
              <div className="flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-orange-600 mr-3" />
                <span className="font-bold text-orange-900 text-xl">Om det inte fungerar, återbetalar vi dig</span>
              </div>
              <p className="text-orange-800 mb-6 text-lg">
                Börja smått och se om vi passar bra. Var flexibel - inga långsiktiga åtaganden krävs.
              </p>
              <a 
                href="https://studio--kundflde.us-central1.hosted.app/" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors text-lg"
              >
               Gratis guide <ExternalLink className="w-5 h-5 ml-2" />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
              <button className="bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-12 py-6 rounded-xl font-semibold text-xl transition-all duration-300 transform hover:scale-105 shadow-xl">
                Börja idag - 30 dagars test
              </button>
              
              <div className="text-center">
                <div className="flex items-center text-gray-600 mb-2">
                  <Search className="w-5 h-5 mr-2" />
                  <span className="font-medium">Knappast någon av din tid krävs</span>
                </div>
                <p className="text-gray-500 text-sm">
                  Du gör bara vad du är bäst på: omvandla telefonsamtal till kunder
                </p>
              </div>
            </div>

            {/* Client Testimonials in Hero */}
            <div className="border-t border-gray-200 pt-16">
              <p className="text-gray-500 mb-8 text-lg">Fallstudier - Vi skapade deras hemsidor</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105" itemScope itemType="https://schema.org/Review">
                  <div className="absolute inset-0 opacity-5">
                    <img 
                      src="/api/placeholder/400/300" 
                      alt="BahkoStudio Hemsida" 
                      className="w-full h-full object-cover"
                      style={{
                        background: 'linear-gradient(135deg, #1e293b 0%, #f97316 80%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: 'bold'
                      }}
                    />
                  </div>
                  <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
                    <div className="flex text-yellow-500 mb-4 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current drop-shadow-sm" />
                      ))}
                    </div>
                    <blockquote className="text-gray-800 mb-4 text-lg font-medium text-center leading-relaxed" itemProp="reviewBody">
                      "BahkoStudio skapade vår hemsida och fördubblade vår onlineförsäljning på 6 veckor med SEO och Google Ads."
                    </blockquote>
                    <div className="text-center" itemProp="author" itemScope itemType="https://schema.org/Person">
                      <div className="text-gray-900 font-bold text-lg mb-1" itemProp="name">BahkoStudio</div>
                      <a href="https://maykaskitchen.se" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 text-sm">
                        Automatiseringsbyrå →
                      </a>
                    </div>
                    <meta itemProp="ratingValue" content="5" />
                  </div>
                </div>
                
                <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105" itemScope itemType="https://schema.org/Review">
                  <div className="absolute inset-0 opacity-5">
                    <img 
                      src="/api/placeholder/400/300" 
                      alt="Matbodens Hemsida" 
                      className="w-full h-full object-cover"
                      style={{
                        background: 'linear-gradient(135deg, #7c3aed 0%, #f97316 80%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: 'bold'
                      }}
                    />
                  </div>
                  <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
                    <div className="flex text-yellow-500 mb-4 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current drop-shadow-sm" />
                      ))}
                    </div>
                    <blockquote className="text-gray-800 mb-4 text-lg font-medium text-center leading-relaxed" itemProp="reviewBody">
                      "Från 0 till 200+ kunder per månad efter BahkoStudio byggde vår hemsida och körde Google Ads."
                    </blockquote>
                    <div className="text-center" itemProp="author" itemScope itemType="https://schema.org/Person">
                      <div className="text-gray-900 font-bold text-lg mb-1" itemProp="name">Matbodens</div>
                      <a href="https://matbodens.se" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 text-sm">
                        Restaurang →
                      </a>
                    </div>
                    <meta itemProp="ratingValue" content="5" />
                  </div>
                </div>
                
                <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105" itemScope itemType="https://schema.org/Review">
                  <div className="absolute inset-0 opacity-5">
                    <img 
                      src="/api/placeholder/400/300" 
                      alt="Maykas Kitchen Hemsida" 
                      className="w-full h-full object-cover"
                      style={{
                        background: 'linear-gradient(135deg, #0891b2 0%, #f97316 80%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: 'bold'
                      }}
                    />
                  </div>
                  <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
                    <div className="flex text-yellow-500 mb-4 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current drop-shadow-sm" />
                      ))}
                    </div>
                    <blockquote className="text-gray-800 mb-4 text-lg font-medium text-center leading-relaxed" itemProp="reviewBody">
                      "BahkoStudio byggde vår hemsida och SEO-strategi. Nu kommer kunder direkt från Google 24/7!"
                    </blockquote>
                    <div className="text-center" itemProp="author" itemScope itemType="https://schema.org/Person">
                      <div className="text-gray-900 font-bold text-lg mb-1" itemProp="name">Maykas Kitchen</div>
                      <a href="https://maykaskitchen.se" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 text-sm">
                        Assyrisk matkonst →
                      </a>
                    </div>
                    <meta itemProp="ratingValue" content="5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why BahkoStudio */}
      <section id="tjanster" className="py-24 bg-white/60 backdrop-blur-sm" itemScope itemType="https://schema.org/Service">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" itemProp="name">
              Hur vi kan hjälpa dig att växa
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto" itemProp="description">
              Tre sätt att placera dig framför dina kunder när de letar efter dig
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="text-center group" itemScope itemType="https://schema.org/Service">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                <Search className="w-12 h-12 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4" itemProp="name">Landningssidor Som Konverterar</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4" itemProp="description">
                Vi bygger webbsidor som konverterar besökare till kunder, får besökare att se den och screenas först innan de når din inkorg.
              </p>
              <div className="text-orange-600 font-semibold">Visa upp dig när lokala personer söker efter vad du erbjuder</div>
            </div>
            
            <div className="text-center group" itemScope itemType="https://schema.org/Service">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                <Globe className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4" itemProp="name">Nå VARJE Lokal Kund</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4" itemProp="description">
                Var överallt. Google, Facebook, Instagram, LinkedIn... Vi täcker alla plattformar.
              </p>
              <div className="text-blue-600 font-semibold">Annonser som når kunder där de befinner sig</div>
            </div>
            
            <div className="text-center group" itemScope itemType="https://schema.org/Service">
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                <TrendingUp className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4" itemProp="name">Top 3</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4" itemProp="description">
                Var nummer 1 på Google Maps organiskt. Långsiktig synlighet utan att betala för annonser.
              </p>
              <div className="text-green-600 font-semibold">Organisk ranking som håller i sig</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Det är enkelt
            </h2>
            <p className="text-xl text-gray-600">Hur vi arbetar</p>
          </div>
          
          <div className="space-y-20">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white w-20 h-20 rounded-full flex items-center justify-center font-bold text-3xl mb-8 shadow-lg">
                  1
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Planera Din Framgång</h3>
                <p className="text-xl text-gray-600 mb-8">
                  Vi tar reda på vilka dina kunder är och vad de vill höra innan vi börjar.
                </p>
                <div className="text-orange-600 font-semibold text-lg">Kartläggning av målgrupp och strategi</div>
              </div>
              <div className="lg:w-1/2 bg-white/80 backdrop-blur-sm rounded-3xl p-12 h-80 flex items-center justify-center shadow-lg border border-white/20">
                <Target className="w-32 h-32 text-gray-300" />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center font-bold text-3xl mb-8 shadow-lg">
                  2
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Hantera Allt Dagligen</h3>
                <p className="text-xl text-gray-600 mb-8">
                  Vi skapar annonser, schemalägger dem och hanterar alla dina kampanjer så att du inte behöver.
                </p>
                <div className="text-blue-600 font-semibold text-lg">Fullständig kampanjhantering</div>
              </div>
              <div className="lg:w-1/2 bg-white/80 backdrop-blur-sm rounded-3xl p-12 h-80 flex items-center justify-center shadow-lg border border-white/20">
                <Zap className="w-32 h-32 text-gray-300" />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white w-20 h-20 rounded-full flex items-center justify-center font-bold text-3xl mb-8 shadow-lg">
                  3
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Spåra Vad Som Fungerar</h3>
                <p className="text-xl text-gray-600 mb-8">
                  Vi ser vilka inlägg som lockar kunder och gör mer av det som fungerar.
                </p>
                <div className="text-green-600 font-semibold text-lg">Regelbundna samtal för att granska vad som fungerar</div>
              </div>
              <div className="lg:w-1/2 bg-white/80 backdrop-blur-sm rounded-3xl p-12 h-80 flex items-center justify-center shadow-lg border border-white/20">
                <BarChart3 className="w-32 h-32 text-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section - New */}
      <section className="py-24 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Varför välja BahkoStudio framför alla andra?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-red-800 mb-8 text-center">Andra Byråer</h3>
              <div className="space-y-4">
                <div className="flex items-center text-red-700">
                  <X className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>Generiska innehållsmallar</span>
                </div>
                <div className="flex items-center text-red-700">
                  <X className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>Månatlig rapportering endast</span>
                </div>
                <div className="flex items-center text-red-700">
                  <X className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>Separata team för olika plattformar</span>
                </div>
                <div className="flex items-center text-red-700">
                  <X className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>Långsiktiga kontrakt krävs</span>
                </div>
                <div className="flex items-center text-red-700">
                  <X className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>En-storlek-passar-alla-tillvägagångssätt</span>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-green-800 mb-8 text-center">BahkoStudio</h3>
              <div className="space-y-4">
                <div className="flex items-center text-green-700">
                  <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>Om det inte fungerar, återbetalar vi dig</span>
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>Börja smått och se om vi passar bra</span>
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>Google, Facebook, Instagram - vi täcker allt</span>
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>Var flexibel - inga långsiktiga åtaganden krävs</span>
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>Regelbundna samtal för att granska vad som fungerar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - New */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50" itemScope itemType="https://schema.org/FAQPage">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Vanliga Frågor
            </h2>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20" itemScope itemType="https://schema.org/Question">
              <h3 className="text-xl font-bold text-gray-900 mb-4" itemProp="name">Kan ni visa mig exempel på andra företag som mitt som ni har hjälpt?</h3>
              <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                <p className="text-gray-700 text-lg" itemProp="text">Ja, ta gärna en titt på våra fallstudier och klientportfölj.</p>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20" itemScope itemType="https://schema.org/Question">
              <h3 className="text-xl font-bold text-gray-900 mb-4" itemProp="name">Vad exakt kommer ni att göra för mitt företag?</h3>
              <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                <p className="text-gray-700 text-lg" itemProp="text">Vi kommer att bygga en landningssida som konverterar, få besökare att se den och se till att personerna som faktiskt kontaktar dig screenas först innan de når din inkorg.</p>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20" itemScope itemType="https://schema.org/Question">
              <h3 className="text-xl font-bold text-gray-900 mb-4" itemProp="name">Hur länge tar det att börja se resultat?</h3>
              <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                <p className="text-gray-700 text-lg" itemProp="text">30-dagarstesten är utformat för att ge dig tillräckligt med resultat för att fatta ett informerat beslut om du vill fortsätta.</p>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20" itemScope itemType="https://schema.org/Question">
              <h3 className="text-xl font-bold text-gray-900 mb-4" itemProp="name">Hur mycket kommer detta att kosta mig upfront?</h3>
              <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                <p className="text-gray-700 text-lg" itemProp="text">Kontakta oss för individuell prissättning. Inga åtaganden, inga långsiktiga kontrakt. Du kan avbryta månadsvis.</p>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20" itemScope itemType="https://schema.org/Question">
              <h3 className="text-xl font-bold text-gray-900 mb-4" itemProp="name">Hur mycket av min tid kommer detta att kräva?</h3>
              <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                <p className="text-gray-700 text-lg" itemProp="text">Knappast något. Du gör bara vad du är bäst på: omvandla telefonsamtal till kunder.</p>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20" itemScope itemType="https://schema.org/Question">
              <h3 className="text-xl font-bold text-gray-900 mb-4" itemProp="name">Behöver jag lära mig hur man gör något av detta tekniska?</h3>
              <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                <p className="text-gray-700 text-lg" itemProp="text">Nej, du behöver absolut inte göra NÅGOT av det tekniska. Det är därför vi har ett team av tränade proffs så att du inte behöver lyfta ett finger.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="kontakt" className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #f97316 0%, transparent 50%)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8">
            Börja idag - 30 dagars test
          </h2>
          <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
            Redo att fylla din kalender med nya kunder?<br />
            Vi visar dig exakt hur inom 30 dagar.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 mb-12 max-w-lg mx-auto border border-white/20">
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Ditt namn"
                className="w-full px-8 py-5 rounded-xl bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg shadow-lg"
              />
              <input
                type="email"
                placeholder="Din e-post"
                className="w-full px-8 py-5 rounded-xl bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg shadow-lg"
              />
              <input
                type="tel"
                placeholder="Telefonnummer"
                className="w-full px-8 py-5 rounded-xl bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg shadow-lg"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center group"
              >
                Starta 30-dagars test →
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
            
            <div className="mt-10 text-sm text-gray-300">
              <div className="flex items-center justify-center space-x-8">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  <span>Pengarna-tillbaka-garanti</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Inga långsiktiga kontrakt</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  <span>Resultat inom 30 dagar</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-gray-400 text-lg">
            Vi ser till att vi kan leverera dessa resultat för ditt exakta företag · Ingen bindningstid · Pengarna-tillbaka-garanti
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center mb-8">
                <img 
                  src="https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCisV54LEMpqflOXSIZd3wu9KziagAHJkL4Wb5" 
                  alt="BahkoStudio Logo" 
                  className="h-10 mr-4"
                />
                <h3 className="text-2xl font-bold">BahkoStudio</h3>
              </div>
              <p className="text-gray-400 text-lg">
                Vi automatiserar din kundtillströmning med webbsidor som säljer.
              </p>
              <p className="text-gray-400 mt-4">
                <a 
                  href="https://www.bahkostudio.live" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Vill du ha hjälp med automatisering klicka på länken
                </a>
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-8 text-lg">Tjänster</h4>
              <ul className="space-y-4 text-gray-400">
                <li>Landningssidor</li>
                <li>SEO-optimering</li>
                <li>Kundflödesautomation</li>
                <li>Konverteringsoptimering</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-8 text-lg">Support</h4>
              <ul className="space-y-4 text-gray-400">
                <li>Kontakta oss</li>
                <li>48h-garanti</li>
                <li>Automatiseringguide</li>
                <li>24/7 Support</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-8 text-lg">Kontakt</h4>
              <div className="space-y-6 text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 mr-4" />
                  <a href="tel:+46764793683" className="hover:text-white transition-colors text-lg">
                    076-479 36 83
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 mr-4" />
                  <a href="mailto:mathias@bahkostudio.live" className="hover:text-white transition-colors text-lg">
                    mathias@bahkostudio.live
                  </a>
                </div>
                <div>
                  <a 
                    href="https://wa.me/+46764793683" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors text-lg"
                  >
                    <span className="mr-3 text-xl">💬</span> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-16 pt-10 text-center text-gray-400">
            <p>&copy; 2024 BahkoStudio. Alla rättigheter förbehållna.</p>
            <p className="mt-4">
              <a 
                href="https://www.bahkostudio.live" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Vill du ha hjälp med automatisering klicka på länken
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;