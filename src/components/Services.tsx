import { Code, TrendingUp, MapPin, Video, HeadphonesIcon, ArrowRight } from 'lucide-react';

interface ServicesProps {
  onScrollToContact: () => void;
}

export default function Services({ onScrollToContact }: ServicesProps) {
  return (
    <section id="services" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500/10 to-amber-500/10 border border-cyan-200/50 rounded-full text-sm font-bold text-gray-800 mb-6 uppercase tracking-wider">
            Allt Du Behover
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Synas.{' '}
            <span className="gradient-text-cyan">Vaxa.</span>{' '}
            Dominera.
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sluta vanta pa att kunder ska hitta dig.{' '}
            <span className="font-semibold text-gray-800">Var overallt dar de letar.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 bento-item glass-card p-8 lg:p-10 rounded-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Hemsidor & Appar</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Visa upp dig professionellt. Jobba smart. Imponera pa varje besokare med moderna, snabba losningar.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                  <span>Hemsidor som konverterar besokare till kunder</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                  <span>Mobila appar for iOS & Android</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                  <span>Blixtsnabb prestanda & SEO-optimerad</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bento-item glass-card p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Google Ads</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Na varje lokal kund som aktivt soker efter dina tjanster. Betala bara for resultat.
              </p>
            </div>
          </div>

          <div className="bento-item glass-card p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lokal SEO</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Top 3 pa Google Maps inom 90 dagar. 70% av trafiken gar till topp 3.
              </p>
            </div>
          </div>

          <div className="bento-item glass-card p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Video className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reklamfilm</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Professionella reklamfilmer for sociala medier som engagerar och konverterar.
              </p>
            </div>
          </div>

          <div className="bento-item glass-card p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <HeadphonesIcon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Support & Drift</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Lopande support, underhall och vidareutveckling. Vi finns alltid har for dig.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onScrollToContact}
            className="group btn-primary min-h-[56px] px-8 py-4 text-gray-900 rounded-full text-lg font-bold inline-flex items-center gap-3"
          >
            Borja Idag - 30 Dagars Test
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
