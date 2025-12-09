import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import Results from './components/Results';
import Guarantee from './components/Guarantee';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import FloatingCTA from './components/FloatingCTA';

export default function App() {
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

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation
        onScrollToContact={scrollToContact}
        onOpenAnalysis={openAnalysisLink}
      />

      <Hero
        onScrollToContact={scrollToContact}
        onOpenAnalysis={openAnalysisLink}
      />

      <Services onScrollToContact={scrollToContact} />

      <Results onScrollToContact={scrollToContact} />

      <Process
        onScrollToContact={scrollToContact}
        onOpenAnalysis={openAnalysisLink}
      />

      <Guarantee
        onScrollToContact={scrollToContact}
        onOpenAnalysis={openAnalysisLink}
      />

      <Contact />

      <FAQ onScrollToContact={scrollToContact} />

      <FloatingCTA onScrollToContact={scrollToContact} />

      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://nikjm8tf0e.ufs.sh/f/mNFirk6dCRarzegIlqhRqJO8ZrmDNjg4Sc2WzeU9pnIB7Kub"
                  alt="BahkoStudio Logo"
                  className="h-12 w-12 object-contain"
                />
                <span className="text-xl font-bold gradient-text-primary">BahkoStudio</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Vi hjalper lokala foretag att vaxa med moderna hemsidor, appar och digital marknadsforing.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Tjanster</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-cyan-400 transition-colors">Hemsidor</button></li>
                <li><button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-cyan-400 transition-colors">Appar</button></li>
                <li><button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-cyan-400 transition-colors">Google Ads</button></li>
                <li><button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-cyan-400 transition-colors">SEO</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Kontakt</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="tel:+46762540951" className="hover:text-cyan-400 transition-colors">
                    +46 76 254 09 51
                  </a>
                </li>
                <li>
                  <a href="mailto:mathias@bahkostudio.live" className="hover:text-cyan-400 transition-colors">
                    mathias@bahkostudio.live
                  </a>
                </li>
                <li>Stockholm, Sverige</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} BahkoStudio. Alla rattigheter forbehallna.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <button className="hover:text-cyan-400 transition-colors">Integritetspolicy</button>
              <button className="hover:text-cyan-400 transition-colors">Villkor</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
