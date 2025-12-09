import { Shield, ArrowRight, ExternalLink } from 'lucide-react';

interface GuaranteeProps {
  onScrollToContact: () => void;
  onOpenAnalysis: () => void;
}

export default function Guarantee({ onScrollToContact, onOpenAnalysis }: GuaranteeProps) {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-cyan-50 to-amber-50" />
      <div className="absolute inset-0 gradient-mesh-2030 opacity-50" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-10 md:p-16 rounded-3xl shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-400" />

          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg glow-card">
            <Shield className="w-12 h-12 text-white" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            100%{' '}
            <span className="gradient-text-cyan">Pengarna-Tillbaka</span>-Garanti
          </h2>

          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Vi ar sa sakra pa vara resultat att vi erbjuder en fullstandig garanti.
            Om du inte ser markbara forbattringar inom 30 dagar, far du alla pengar tillbaka.
            <span className="block mt-2 font-semibold text-gray-800">Inga krangliga villkor.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onScrollToContact}
              className="group btn-primary min-h-[56px] px-8 py-4 text-gray-900 rounded-full text-lg font-bold flex items-center justify-center gap-3"
            >
              Borja Idag - 30 Dagars Test
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onOpenAnalysis}
              className="min-h-[56px] px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-full text-lg font-semibold hover:border-cyan-400 hover:bg-cyan-50/50 transition-all duration-200 flex items-center justify-center gap-3"
            >
              Fa Min Gratis Analys
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-100">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                Ingen risk
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                Inga dolda avgifter
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                Avbryt nar som helst
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
