import { ArrowRight, ExternalLink, CheckCircle, Star, Globe, ChevronDown } from 'lucide-react';

interface HeroProps {
  onScrollToContact: () => void;
  onOpenAnalysis: () => void;
}

export default function Hero({ onScrollToContact, onOpenAnalysis }: HeroProps) {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50">
      <div className="absolute inset-0 gradient-mesh-2030 opacity-80" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-[10%] w-96 h-96 bg-cyan-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div className="absolute top-40 right-[10%] w-80 h-80 bg-amber-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 left-[30%] w-72 h-72 bg-emerald-400/15 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
        <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 bg-gradient-to-r from-cyan-500/10 to-amber-500/10 border border-cyan-200/50 rounded-full animate-pulse-slow">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-sm font-bold text-gray-800 uppercase tracking-wider">
            30 Dagar - Garanterat Resultat
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-[1.1] text-balance">
          Vi Fyller Din Kalender{' '}
          <span className="gradient-text-primary inline-block">
            Med Nya Kunder
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
          Sluta vanta pa att kunder ska hitta dig.
        </p>
        <p className="text-lg text-gray-700 font-semibold mb-4 max-w-2xl mx-auto">
          Vi placerar ditt foretag framfor lokala kunder som aktivt soker dina tjanster.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['Hemsidor', 'Appar', 'Google Ads', 'SEO', 'Reklamfilm'].map((service) => (
            <span
              key={service}
              className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 border border-gray-200/50 hover:border-cyan-300 hover:bg-cyan-50/50 transition-all duration-300"
            >
              {service}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            onClick={onScrollToContact}
            className="group btn-primary min-h-[60px] px-10 py-4 text-gray-900 rounded-full text-lg font-bold flex items-center gap-3 relative overflow-hidden"
          >
            <span className="relative z-10">Boka Gratis Samtal</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button
            onClick={onOpenAnalysis}
            className="group min-h-[60px] px-10 py-4 bg-white/80 backdrop-blur-sm text-gray-800 rounded-full text-lg font-semibold border-2 border-gray-200 hover:border-cyan-400 hover:bg-cyan-50/50 transition-all duration-300 flex items-center gap-3"
          >
            <span>Gratis Guide (799 kr)</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="glass-card p-6 rounded-2xl text-center card-tilt glow-card">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">30 Dagars Garanti</h3>
            <p className="text-sm text-gray-600 font-medium">Resultat eller pengarna tillbaka</p>
          </div>
          <div className="glass-card p-6 rounded-2xl text-center card-tilt glow-card">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Top 3 Pa Google Maps</h3>
            <p className="text-sm text-gray-600 font-medium">Inom 90 dagar</p>
          </div>
          <div className="glass-card p-6 rounded-2xl text-center card-tilt glow-card">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Var Overallt</h3>
            <p className="text-sm text-gray-600 font-medium">Google, Instagram, Facebook, YouTube, AI</p>
          </div>
        </div>

        <button
          onClick={scrollToServices}
          className="mt-16 flex flex-col items-center gap-2 text-gray-500 hover:text-cyan-600 transition-colors duration-300 mx-auto"
          aria-label="Scrolla ner"
        >
          <span className="text-sm font-medium">Utforska mer</span>
          <ChevronDown className="w-6 h-6 scroll-indicator" />
        </button>
      </div>
    </section>
  );
}
