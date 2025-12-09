import { ArrowRight, ExternalLink } from 'lucide-react';

interface ProcessProps {
  onScrollToContact: () => void;
  onOpenAnalysis: () => void;
}

export default function Process({ onScrollToContact, onOpenAnalysis }: ProcessProps) {
  const steps = [
    {
      number: '1',
      title: 'Kostnadsfri Konsultation',
      description: 'Vi analyserar din nuvarande situation och identifierar forbattringsomraden',
      color: 'from-cyan-400 to-cyan-600',
      bgColor: 'bg-cyan-50',
      hasCta: true,
    },
    {
      number: '2',
      title: 'Strategi & Plan',
      description: 'Vi utvecklar en skraddarsydd strategi baserat pa dina mal och budget',
      color: 'from-emerald-400 to-emerald-600',
      bgColor: 'bg-emerald-50',
      hasCta: false,
    },
    {
      number: '3',
      title: 'Implementation',
      description: 'Vi bygger och lanserar dina losningar med fokus pa kvalitet och hastighet',
      color: 'from-amber-400 to-amber-600',
      bgColor: 'bg-amber-50',
      hasCta: false,
    },
    {
      number: '4',
      title: 'Resultat & Optimering',
      description: 'Markbara forbattringar inom 30 dagar eller full aterbetalning',
      color: 'from-rose-400 to-rose-600',
      bgColor: 'bg-rose-50',
      hasCta: false,
    },
  ];

  return (
    <section id="process" className="py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500/10 to-amber-500/10 border border-cyan-200/50 rounded-full text-sm font-bold text-gray-800 mb-6 uppercase tracking-wider">
            Sa Har Fungerar Det
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Fran Ide Till{' '}
            <span className="gradient-text-gold">Resultat</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            En beprovad process som levererar mätbara resultat inom 30 dagar
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-1 timeline-connector rounded-full" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className={`${step.bgColor} p-8 rounded-3xl relative z-10 h-full flex flex-col`}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{step.description}</p>
                  {step.hasCta && (
                    <div>
                      <button
                        onClick={onScrollToContact}
                        className="btn-secondary px-5 py-2.5 text-white rounded-full font-semibold inline-flex items-center gap-2 text-sm"
                      >
                        Kontakta Oss
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <p className="text-xs text-gray-500 mt-3">
                        Skriv "kostnadsfri konsultation" med din hemsida sa loser vi det gratis
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <button
            onClick={onOpenAnalysis}
            className="group min-h-[60px] px-10 py-4 bg-white text-gray-800 rounded-full text-lg font-semibold border-2 border-gray-200 hover:border-cyan-400 hover:bg-cyan-50/50 transition-all duration-300 inline-flex items-center gap-3"
          >
            <span>Fa Gratis Guide (799 kr)</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
