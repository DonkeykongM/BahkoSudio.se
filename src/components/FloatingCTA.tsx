import { useState, useEffect } from 'react';
import { Phone, X, MessageCircle } from 'lucide-react';

interface FloatingCTAProps {
  onScrollToContact: () => void;
}

export default function FloatingCTA({ onScrollToContact }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded && (
        <div className="absolute bottom-20 right-0 w-72 bg-white rounded-2xl shadow-2xl p-6 animate-scale-in">
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Stang"
          >
            <X className="w-5 h-5" />
          </button>
          <h4 className="text-lg font-bold text-gray-900 mb-2">Behover du hjalp?</h4>
          <p className="text-sm text-gray-600 mb-4">
            Vi ar tillgangliga for att svara pa dina fragor
          </p>
          <div className="space-y-3">
            <a
              href="tel:+46762540951"
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-cyan-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center group-hover:bg-cyan-200 transition-colors">
                <Phone className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Ring oss</div>
                <div className="text-xs text-gray-500">+46 76 254 09 51</div>
              </div>
            </a>
            <button
              onClick={() => { onScrollToContact(); setIsExpanded(false); }}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-amber-50 transition-colors group w-full"
            >
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                <MessageCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-900">Skicka meddelande</div>
                <div className="text-xs text-gray-500">Svar inom 2 timmar</div>
              </div>
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`floating-cta w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isExpanded
            ? 'bg-gray-800 hover:bg-gray-700'
            : 'btn-primary hover:scale-110'
        }`}
        aria-label={isExpanded ? 'Stang meny' : 'Oppna kontaktmeny'}
      >
        {isExpanded ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-gray-900" />
        )}
      </button>
    </div>
  );
}
