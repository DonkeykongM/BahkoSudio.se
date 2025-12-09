import { Star, ExternalLink, ArrowRight } from 'lucide-react';

interface ResultsProps {
  onScrollToContact: () => void;
}

export default function Results({ onScrollToContact }: ResultsProps) {
  const caseStudies = [
    {
      name: 'Maykas Kitchen',
      url: 'https://maykaskitchen.se',
      quote: 'BahkoStudio skapade en modern och professionell webbsida for var restaurang. Designen ar vacker och visar verkligen upp var mat pa basta satt.',
      result: 'Modern Design',
      resultSub: 'Restaurang Webbsida',
      gradientFrom: 'from-orange-500',
      gradientTo: 'to-amber-500',
      textColor: 'text-orange-600',
      bgHover: 'from-orange-500/5 to-amber-500/5',
    },
    {
      name: 'Kong Mindset',
      url: 'https://kongmindset.se',
      quote: 'Vi som agare ar otroligt tacksamma och glada over den kursida som BahkoStudio har byggt – den har overtraffat vara forvantningar bade i design och funktion.',
      result: 'Overtraffade',
      resultSub: 'Alla forvantningar',
      gradientFrom: 'from-cyan-500',
      gradientTo: 'to-blue-500',
      textColor: 'text-cyan-600',
      bgHover: 'from-cyan-500/5 to-blue-500/5',
    },
    {
      name: 'Matbodens',
      url: 'https://matbodens.se',
      quote: 'Fran 0 till 200+ kunder per manad med automatiserade floden. BahkoStudio har revolutionerat vart foretag.',
      result: '200+',
      resultSub: 'Nya kunder/manad',
      gradientFrom: 'from-emerald-500',
      gradientTo: 'to-teal-500',
      textColor: 'text-emerald-600',
      bgHover: 'from-emerald-500/5 to-teal-500/5',
    },
  ];

  return (
    <section id="results" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500/10 to-amber-500/10 border border-cyan-200/50 rounded-full text-sm font-bold text-gray-800 mb-6 uppercase tracking-wider">
            Projekt Vi Ar Stolta Over
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Hemsidor som{' '}
            <span className="gradient-text-cyan">gor skillnad</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Varje projekt ar en unik historia dar vi hjalper foretag vaxa
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="group glass-card p-8 rounded-3xl card-tilt relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${study.bgHover} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-2xl font-bold ${study.textColor}`}>{study.name}</h3>
                  <a
                    href={study.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${study.textColor} hover:opacity-70 transition-opacity duration-200`}
                    aria-label={`Besok ${study.name} webbsida`}
                  >
                    <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 leading-relaxed mb-6 text-lg">
                  "{study.quote}"
                </blockquote>
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="text-center">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${study.gradientFrom} ${study.gradientTo} bg-clip-text text-transparent mb-1`}>
                      {study.result}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">{study.resultSub}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center gap-8 mb-12 p-6 glass-card rounded-2xl">
            <div className="text-center px-6">
              <div className="text-3xl font-bold gradient-text-cyan">200+</div>
              <div className="text-sm text-gray-600">Projekt genomforda</div>
            </div>
            <div className="text-center px-6 border-l border-gray-200">
              <div className="text-3xl font-bold gradient-text-gold">300%</div>
              <div className="text-sm text-gray-600">Genomsnittlig ROI</div>
            </div>
            <div className="text-center px-6 border-l border-gray-200">
              <div className="text-3xl font-bold gradient-text-primary">100%</div>
              <div className="text-sm text-gray-600">Nojda kunder</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onScrollToContact}
            className="group btn-primary min-h-[60px] px-10 py-4 text-gray-900 rounded-full text-lg font-bold inline-flex items-center gap-3"
          >
            <span>Borja Din Resa Med Oss</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
