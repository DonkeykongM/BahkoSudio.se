import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onScrollToContact: () => void;
  onOpenAnalysis: () => void;
}

export default function Navigation({ onScrollToContact, onOpenAnalysis }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Hem', id: 'hero' },
    { label: 'Tjanster', id: 'services' },
    { label: 'Resultat', id: 'results' },
    { label: 'Process', id: 'process' },
    { label: 'FAQ', id: 'faq' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'nav-solid py-3' : 'nav-blur py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src="https://nikjm8tf0e.ufs.sh/f/mNFirk6dCRarzegIlqhRqJO8ZrmDNjg4Sc2WzeU9pnIB7Kub"
                alt="BahkoStudio Logo"
                className={`object-contain transition-all duration-300 ${isScrolled ? 'h-12 w-12' : 'h-16 w-16'}`}
              />
              <h1 className={`font-bold gradient-text-primary transition-all duration-300 ${isScrolled ? 'text-2xl' : 'text-3xl'}`}>
                BahkoStudio
              </h1>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-amber-500 group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={onOpenAnalysis}
                className="px-5 py-2.5 text-gray-700 font-semibold hover:text-cyan-600 transition-colors duration-200"
              >
                Gratis Guide
              </button>
              <button
                onClick={onScrollToContact}
                className="btn-primary px-6 py-2.5 text-gray-900 rounded-full font-bold hover:scale-105 transition-all duration-300"
              >
                Boka Samtal
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-cyan-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-0 right-0 w-80 max-w-full h-full bg-white shadow-2xl">
            <div className="pt-24 px-6">
              <div className="space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="block w-full text-left py-3 text-lg font-medium text-gray-800 hover:text-cyan-600 border-b border-gray-100 transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
              <div className="mt-8 space-y-4">
                <button
                  onClick={() => { onOpenAnalysis(); setIsMobileMenuOpen(false); }}
                  className="w-full py-3 text-gray-700 font-semibold border border-gray-200 rounded-xl hover:border-cyan-500 transition-colors"
                >
                  Gratis Guide
                </button>
                <button
                  onClick={() => { onScrollToContact(); setIsMobileMenuOpen(false); }}
                  className="w-full btn-primary py-3 text-gray-900 rounded-xl font-bold"
                >
                  Boka Samtal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
