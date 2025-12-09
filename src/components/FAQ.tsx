import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface FAQProps {
  onScrollToContact: () => void;
}

const faqs = [
  {
    question: "Hur lang tid tar det att bygga en hemsida?",
    answer: "En typisk landningssida eller foretagshemsida tar 1-2 veckor fran start till lansering. For mer komplexa projekt med flera sidor och funktioner kan det ta 3-4 veckor. Vi arbetar snabbt utan att kompromissa med kvaliteten."
  },
  {
    question: "Vad kostar det att bygga en professionell hemsida?",
    answer: "Vara priser borjar fran 15 000 kr for en enkel landningssida. En fullstandig foretagshemsida med flera sidor kostar mellan 25 000-50 000 kr. Vi erbjuder alltid en kostnadsfri konsultation dar vi kan ge dig en exakt offert baserat pa dina behov."
  },
  {
    question: "Far jag en mobilanpassad hemsida?",
    answer: "Absolut! Alla vara hemsidor ar fullt responsiva och ser perfekta ut pa mobiler, surfplattor och datorer. Over 60% av alla besokare kommer fran mobila enheter, sa mobiloptimering ar alltid en prioritet i vara projekt."
  },
  {
    question: "Kan jag uppdatera hemsidan sjalv efterat?",
    answer: "Ja, vi bygger hemsidor som ar enkla att uppdatera. Vi ger dig en genomgang av hur du enkelt kan uppdatera texter, bilder och innehall. For mer tekniska uppdateringar erbjuder vi lopande support."
  },
  {
    question: "Vad ingar i SEO-optimeringen?",
    answer: "Vara hemsidor ar optimerade for sokmotorer fran start med snabba laddningstider, semantisk HTML, meta-taggar, strukturerad data, och optimerat innehall for relevanta sokord. Detta hjalper din hemsida att synas battre pa Google."
  },
  {
    question: "Hjalper ni med webbhotell och doman?",
    answer: "Ja, vi kan hjalpa dig med bade webbhotell och domanregistrering. Vi rekommenderar palitliga leverantorer och kan skota hela uppsattningen at dig sa att allt fungerar smidigt fran dag ett."
  },
  {
    question: "Vad hander efter att hemsidan ar klar?",
    answer: "Efter lansering far du full aganderatt till hemsidan. Vi erbjuder support och underhallspaket om du vill ha hjalp med framtida uppdateringar, sakerhetsuppdateringar eller vidareutveckling av hemsidan."
  },
  {
    question: "Kan ni hjalpa till med texterna och bilderna?",
    answer: "Ja! Vi kan hjalpa dig skapa engagerande texter som saljer, eller arbeta med det innehall du redan har. Vi anvander professionella stockfotos fran Pexels eller kan integrera dina egna bilder och material."
  },
  {
    question: "Vad ar er 30-dagars garanti?",
    answer: "Vi ar sa sakra pa vara resultat att vi erbjuder 30 dagars garanti. Om du inte ser markbara forbattringar i ditt foretag inom 30 dagar far du pengarna tillbaka. Inga krangliga villkor."
  },
  {
    question: "Hur fungerar Google Ads-kampanjer?",
    answer: "Vi skapar och hanterar Google Ads-kampanjer som placerar ditt foretag framfor kunder som aktivt soker efter dina tjanster. Du betalar bara nar nagon klickar pa din annons. Vi optimerar kontinuerligt for basta ROI."
  },
  {
    question: "Kan ni ranka mitt foretag top 3 pa Google Maps?",
    answer: "Ja! Med var lokala SEO-strategi rankar vi ditt foretag top 3 pa Google Maps inom 90 dagar. Detta okar din synlighet dramatiskt for lokala kunder som soker efter dina tjanster i ditt omrade."
  },
  {
    question: "Vad kostar det att bygga en app?",
    answer: "Priset for en app varierar beroende pa funktionalitet och komplexitet. En enkel app borjar fran 50 000 kr, medan mer avancerade appar med backend, betalningar och anvandarkonton kan kosta 100 000-200 000 kr. Vi ger alltid en kostnadsfri offert."
  },
  {
    question: "Erbjuder ni reklamfilmer och videoproduktion?",
    answer: "Ja! Vi producerar professionella reklamfilmer for sociala medier, YouTube och din hemsida. Fran koncept till fardig film – vi hjalper dig beratta din historia pa ett satt som engagerar och konverterar."
  },
  {
    question: "Hur snabbt kan jag fa nya kunder?",
    answer: "Med vara Google Ads-kampanjer kan du borja fa nya leads inom 24-48 timmar efter lansering. For organisk SEO och Google Maps ranking ser du resultat inom 30-90 dagar. Vi fokuserar pa snabba, matbara resultat."
  },
  {
    question: "Jobbar ni med alla branscher?",
    answer: "Vi ar specialiserade pa lokala foretag som restauranger, frisorer, tandlakare, hantverkare, gym och tjansteforetag. Var expertis ligger i att hjalpa brick-and-mortar foretag att dominera sin lokala marknad online."
  },
  {
    question: "Vad skiljer er fran andra webbbyraer?",
    answer: "Vi fokuserar pa resultat, inte bara snygga hemsidor. Med var 30-dagars garanti, beprovade strategier for lokal SEO och paid ads, samt var specialisering pa lokala foretag, levererar vi matbara resultat som fyller din kalender med nya kunder."
  }
];

export default function FAQ({ onScrollToContact }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500/10 to-amber-500/10 border border-cyan-200/50 rounded-full text-sm font-bold text-gray-800 mb-6 uppercase tracking-wider">
            Vanliga Fragor
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Fragor om{' '}
            <span className="gradient-text-cyan">Hemsidor & Webbdesign</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Har hittar du svar pa de vanligaste fragorna om att bygga en professionell hemsida
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:border-cyan-200 transition-colors duration-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-inset"
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-cyan-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Har du fler fragor? Vi svarar garna pa allt du undrar over.
          </p>
          <button
            onClick={onScrollToContact}
            className="group btn-secondary min-h-[56px] px-8 py-4 text-white rounded-full text-lg font-bold inline-flex items-center gap-3"
          >
            Kontakta Oss Idag
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
