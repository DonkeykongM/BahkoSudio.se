import { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const webhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_URL;

      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          company: formData.company || '',
          message: formData.message || '',
          timestamp: new Date().toISOString()
        }),
      });

      if (!webhookResponse.ok) {
        throw new Error('Webhook request failed');
      }

      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            company: formData.company || null,
            message: formData.message || null,
            status: 'new'
          }
        ]);

      if (error) {
        console.error('Supabase error (backup storage):', error);
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/30 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-amber-500/30 rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 rounded-full text-sm font-bold text-white mb-6 uppercase tracking-wider">
              Lat Oss Prata
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Lat Oss Hjalpa Dig{' '}
              <span className="gradient-text-primary">Vaxa</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Kontakta oss idag for en kostnadsfri konsultation dar vi diskuterar hur vi kan hjalpa ditt foretag att na sina mal.
            </p>

            <div className="space-y-6 mb-12">
              <a
                href="tel:+46762540951"
                className="flex items-center gap-4 text-white hover:text-cyan-400 transition-colors duration-200 group"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-lg">+46 76 254 09 51</span>
              </a>
              <a
                href="mailto:mathias@bahkostudio.live"
                className="flex items-center gap-4 text-white hover:text-cyan-400 transition-colors duration-200 group"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-lg">mathias@bahkostudio.live</span>
              </a>
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-lg">Stockholm, Sverige</span>
              </div>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Varfor Valja BahkoStudio?</h3>
              <ul className="space-y-3">
                {[
                  '200+ framgangsrika projekt genomforda',
                  'Genomsnittlig ROI pa 300% for vara kunder',
                  'Specialiserade pa den svenska marknaden',
                  '100% pengarna-tillbaka-garanti'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Borja Din Resa Till Fler Kunder
            </h3>
            <p className="text-gray-600 mb-8">Fyll i formularet sa hor vi av oss inom 2 timmar</p>

            {submitStatus === 'success' && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <p className="text-emerald-800">Tack for ditt meddelande! Vi hor av oss inom 24 timmar.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <p className="text-red-800">Nagot gick fel. Forsok igen eller kontakta oss direkt.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Namn *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full min-h-[48px] px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                    placeholder="Ditt namn"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    E-post *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full min-h-[48px] px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                    placeholder="din@email.se"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full min-h-[48px] px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                    placeholder="070-123 45 67"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                    Foretag
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full min-h-[48px] px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                    placeholder="Ditt foretag"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Meddelande
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Beratta om ditt foretag och vad du vill uppna..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary min-h-[56px] px-8 py-4 text-gray-900 rounded-xl text-lg font-bold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Skickar...
                  </>
                ) : (
                  <>
                    Skicka Meddelande
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-6 text-center">
              Vi svarar normalt inom 2 timmar under kontorstid
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
