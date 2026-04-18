import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PartyPopper, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  CheckCircle2, 
  Star, 
  Cake, 
  Music, 
  Users, 
  Camera, 
  ChevronDown,
  Sparkles,
  Palette,
  LayoutGrid,
  Tent,
  Trash2,
  CalendarDays,
  Menu,
  X
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Data ---
const SERVICES = [
  "Urodziny", "Chrzciny", "Komunie", "Wesela", 
  "Bale karnawałowe", "Dni dziecka", "Pikniki szkolne", 
  "Animacje tematyczne", "Wydarzenia okolicznościowe"
];

const ATTRACTIONS = [
  { name: "Malowanie twarzy", icon: Palette, color: "text-pink-500", desc: "Zmieniamy dzieci w ulubione postacie!", image: "https://picsum.photos/seed/facepainting/400/300" },
  { name: "Brokatowe tatuaże", icon: Sparkles, color: "text-purple-500", desc: "Błyszczące ozdoby dla każdego.", image: "https://picsum.photos/seed/tattoos/400/300" },
  { name: "Skręcanie balonów", icon: Tent, color: "text-blue-500", desc: "Miecze, psy, kwiaty i inne cuda.", image: "https://picsum.photos/seed/balloons/400/300" },
  { name: "Gry i zabawy", icon: LayoutGrid, color: "text-yellow-500", desc: "Tory przeszkód, przeciąganie liny.", image: "https://picsum.photos/seed/games/400/300" },
  { name: "Piniata", icon: PartyPopper, color: "text-orange-500", desc: "Słodka niespodzianka na koniec.", image: "https://picsum.photos/seed/pinata/400/300" },
  { name: "Chusta animacyjna", icon: Users, color: "text-green-500", desc: "Integracja przez wspólną zabawę.", image: "https://picsum.photos/seed/parachute/400/300" },
];

const ADDITIONAL_ATTRACTIONS = [
  { name: "Fotobudka", icon: Camera, desc: "Zgadżety i pamiątkowe zdjęcia." },
  { name: "Wata cukrowa", icon: Sparkles, desc: "Słodka chmura radości." },
  { name: "Popcorn", icon: Sparkles, desc: "Chrupiąca przekąska." },
  { name: "Dmuchaniec", icon: Tent, desc: "Skakanie do upadłego!" },
  { name: "Bańki XXL", icon: Star, desc: "Magiczne pokazy gigantycznych baniek." },
  { name: "Trampolina", icon: PartyPopper, desc: "Wyższa dawka energii." },
];

const FAQ = [
  { q: "Ile wcześniej rezerwować termin?", a: "Zalecamy rezerwację z przynajmniej 2-4 tygodniowym wyprzedzeniem, szczególnie w sezonie komunijnym i letnim." },
  { q: "Czy potrzebny jest zadatek?", a: "Tak, rezerwacja terminu wiąże się z wpłatą zadatku określonego w umowie." },
  { q: "Co w przypadku złej pogody?", a: "W przypadku imprez plenerowych ustalamy plan awaryjny (np. przeniesienie zabaw do wewnątrz lub zadaszenie)." },
  { q: "Jakie warunki lokalne są wymagane?", a: "Zależy od atrakcji - np. dmuchaniec wymaga płaskiego terenu i dostępu do prądu." },
  { q: "Czy zapewniamy sprzęt?", a: "Tak, przywozimy cały niezbędny sprzęt do przeprowadzania animacji." },
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'O nas', href: '#about' },
    { name: 'Atrakcje', href: '#attractions' },
    { name: 'Cennik', href: '#pricing' },
    { name: 'Dojazd', href: '#map' },
    { name: 'Kontakt', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 vibrant-gradient rounded-full flex items-center justify-center text-white shadow-lg">
            <PartyPopper size={24} />
          </div>
          <span className={cn(
            "text-2xl font-display font-extrabold tracking-tight",
            isScrolled ? "text-brand-purple" : "text-brand-purple"
          )}>
            Odlotowe Animacje
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={cn(
                "font-medium transition-colors hover:text-brand-pink",
                isScrolled ? "text-gray-700" : "text-gray-800"
              )}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            className="vibrant-gradient text-white px-6 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
          >
            Zarezerwuj
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-2xl p-6 flex flex-col space-y-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionTitle = ({ title, subtitle, centered = true }: { title: string, subtitle?: string, centered?: boolean }) => (
  <div className={cn("mb-12", centered && "text-center")}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-display text-gray-900 mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-xl text-gray-600 max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
    <div className={cn("h-1.5 w-24 vibrant-gradient rounded-full mt-6", centered && "mx-auto")} />
  </div>
);

// --- Background Bubbles Component for Stability ---
const FloatingBubbles = React.memo(() => {
  const [bubbles, setBubbles] = useState<any[]>([]);

  useEffect(() => {
    // Generate bubbles only once on mount
    const newBubbles = [...Array(15)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 40,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      color: i % 3 === 0 ? '#ff00ff22' : i % 3 === 1 ? '#00d2ff22' : '#a855f722'
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full"
          initial={{ left: `${b.x}%`, top: `${b.y}%`, scale: 1, opacity: 0.2 }}
          animate={{ 
            y: [0, -100, 0],
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: b.duration, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: b.delay
          }}
          style={{
            width: b.size + 'px',
            height: b.size + 'px',
            background: `radial-gradient(circle, rgba(255,255,255,0.4) 0%, ${b.color} 70%)`,
          }}
        />
      ))}
    </div>
  );
});

export default function App() {

  return (
    <div className="min-h-screen bubble-bg overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        <FloatingBubbles />

        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-brand-purple font-bold mb-6 border border-white/30">
              <Sparkles size={20} />
              <span>Odlotowe Animacje dla Dzieci</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-display text-gray-900 leading-tight mb-6">
              Tworzymy <span className="text-gradient">odlotowe wspomnienia</span>, które zostają na długo!
            </h1>
            <p className="text-xl text-gray-700 mb-10 leading-relaxed max-w-lg">
              Energia, profesjonalny sprzęt i uśmiech, który udziela się wszystkim uczestnikom. Każde wydarzenie traktujemy indywidualnie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact" 
                className="vibrant-gradient text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-xl shadow-brand-purple/30 text-center hover:scale-105 active:scale-95 transition-all"
              >
                Zarezerwuj termin
              </a>
              <a 
                href="#attractions" 
                className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-xl shadow-lg border border-gray-100 text-center hover:bg-gray-50 transition-all"
              >
                Zobacz atrakcje
              </a>
            </div>
            <div className="mt-12 flex items-center space-x-12 grayscale opacity-70">
              <div className="flex -space-x-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Avatar" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-semibold text-gray-500">
                100+ Zadowolonych <br />rodziców i ich pociech
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              {/* Feature Image */}
              <img 
                src="https://picsum.photos/seed/happykids/800/800" 
                alt="Szczęśliwe dzieci" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                <p className="text-2xl font-display font-bold">Profesjonalizm & Zabawa</p>
                <p className="text-white/80">Najlepszy sprzęt i doświadczenie</p>
              </div>
            </div>
            {/* Floating badges */}
            <motion.div 
              animate={{ 
                y: [0, -12, 0],
                rotate: [3, 1, 3]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute -top-8 -right-4 z-20 glass-morphism p-4 rounded-3xl shadow-2xl border border-white/40"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center text-white shadow-inner">
                  <Star fill="currentColor" size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 leading-none">5.0 Ocena</p>
                  <p className="text-xs text-gray-500 mt-1">Najwyższa jakość</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ 
                y: [0, 15, 0],
                rotate: [-2, 0, -2]
              }}
              transition={{ 
                duration: 7, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute -bottom-6 -left-8 z-20 glass-morphism p-4 rounded-3xl shadow-2xl border border-white/40"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 vibrant-gradient rounded-2xl flex items-center justify-center text-white shadow-inner">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 leading-none">Działamy mobilnie</p>
                  <p className="text-xs text-gray-500 mt-1">Dojazd do klienta</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Services List Section */}
      <section id="about" className="py-24 bg-white/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-display text-gray-900 mb-6">Gdzie nas znajdziesz?</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Specjalizujemy się w obsłudze imprez rodzinnych, szkolnych i firmowych. Obsługujemy wydarzenia wszędzie tam, gdzie trwa dobra zabawa!
              </p>
              <div className="flex flex-wrap gap-3">
                {SERVICES.map((service, i) => (
                  <span key={i} className="bg-white border border-gray-100 shadow-sm px-4 py-2 rounded-xl text-brand-purple font-semibold hover:border-brand-purple transition-colors">
                    {service}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-50 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mb-6">
                  <Users size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">Program dla każdego</h3>
                <p className="text-gray-600">
                  Dostosowujemy gry i zabawy do liczby uczestników oraz wieku dzieci. Nikt nie wyjdzie znudzony!
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-50 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">Bezpieczna zabawa</h3>
                <p className="text-gray-600">
                  Dbamy o dobrą organizację i bezpieczeństwo. Rodzice mogą w pełni cieszyć się wydarzeniem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Attractions Grid */}
      <section id="attractions" className="py-24 px-6 max-w-7xl mx-auto">
        <SectionTitle 
          title="Odlotowe Atrakcje" 
          subtitle="Możesz wybrać pojedyncze atrakcje lub stworzyć pakiet idealnie dopasowany do Twojego wydarzenia."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {ATTRACTIONS.map((attr, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-100"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={attr.image} alt={attr.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-md">
                  <attr.icon className={cn("w-6 h-6", attr.color)} />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{attr.name}</h3>
                <p className="text-gray-600">{attr.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Attractions */}
        <div className="bg-brand-purple/5 rounded-[3rem] p-8 md:p-16 border border-brand-purple/10">
          <h3 className="text-3xl font-display text-center mb-12">Atrakcje dodatkowe & dla najmłodszych</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADDITIONAL_ATTRACTIONS.map((attr, i) => (
              <div key={i} className="flex items-start space-x-4 bg-white p-6 rounded-2xl shadow-sm border border-brand-purple/5 hover:border-brand-purple/20 transition-all">
                <div className="min-w-10 min-h-10 bg-brand-purple/10 rounded-xl flex items-center justify-center text-brand-purple">
                  <attr.icon size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{attr.name}</p>
                  <p className="text-sm text-gray-500">{attr.desc}</p>
                </div>
              </div>
            ))}
            {/* For youngest */}
            <div className="sm:col-span-2 lg:col-span-3 mt-8 p-10 vibrant-gradient rounded-[2rem] text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl">
                  <h4 className="text-3xl font-display mb-4">Dla najmłodszych (0-3 lata)</h4>
                  <p className="text-white/90 text-lg mb-6">
                    Nawet najmłodsi znajdą coś dla siebie: Tablica kredowa, tablice manipulacyjne, basen z kulkami i kolorowanki.
                  </p>
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 inline-block font-semibold">
                    Bonus: Dowolna tematyka kolorowanki pod Twoje wydarzenie!
                  </div>
                </div>
                <div className="hidden lg:block w-48 h-48 bg-white/10 rounded-full flex items-center justify-center blur-sm transform scale-150" />
                <div className="relative z-10 w-64 h-64 rounded-3xl overflow-hidden shadow-2xl rotate-6">
                  <img src="https://picsum.photos/seed/toddler/400/400" alt="Dla najmłodszych" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle 
            title="Cennik i Pakiety" 
            subtitle="Możliwość pełnej personalizacji pod każde wydarzenie."
          />
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Pakiet Podstawowy", price: "X", icon: Users, color: "from-blue-400 to-blue-600", features: ["1 Animatorka", "Wszystkie podstawowe atrakcje", "Gwarancja uśmiechu"] },
              { name: "Pakiet Rozszerzony", price: "X", icon: Sparkles, color: "from-purple-500 to-pink-500", features: ["2 Animatorki", "Większa liczba atrakcji", "Mały pokaz baniek XXL", "Brokatowe tatuaże"], recommended: true },
              { name: "Pakiet Premium", price: "X", icon: PartyPopper, color: "from-orange-400 to-red-500", features: ["Pełna obsługa imprezy", "Dmuchaniec / Fotobudka", "Wata cukrowa & Popcorn", "Nagrody dla dzieci"] },
            ].map((tier, i) => (
              <div key={i} className={cn(
                "relative bg-white p-10 rounded-[2.5rem] shadow-lg border border-gray-100 flex flex-col",
                tier.recommended && "ring-4 ring-brand-purple/20 shadow-2xl scale-105 z-10"
              )}>
                {tier.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 vibrant-gradient text-white px-6 py-1 rounded-full text-sm font-bold uppercase tracking-widest">
                    Polecany
                  </div>
                )}
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 bg-gradient-to-br", tier.color)}>
                  <tier.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-extrabold text-gray-900">{tier.price}</span>
                  <span className="text-gray-500 ml-2">PLN</span>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-center space-x-3 text-gray-600">
                      <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={12} strokeWidth={3} />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={cn(
                  "w-full py-4 rounded-2xl font-bold transition-all",
                  tier.recommended ? "vibrant-gradient text-white shadow-lg" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                )}>
                  Wybierz pakiet
                </button>
              </div>
            ))}
          </div>
          <p className="text-center mt-12 text-gray-500 max-w-2xl mx-auto">
            Ceny są indywidualnie dopasowywane w zależności od liczby dzieci, czasu trwania oraz lokalizacji. Pakiety są elastyczne – skontaktuj się z nami!
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionTitle 
              centered={false}
              title="Gdzie działamy?" 
              subtitle="Nasza siedziba znajduje się w Białej Podlaskiej, ale działamy mobilnie! Dojeżdżamy wszędzie tam, gdzie zaprosisz odlotowe animacje."
            />
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start space-x-4">
                <div className="p-4 bg-green-100 text-green-600 rounded-2xl">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-900">Biała Podlaska + 30 km</h4>
                  <p className="text-gray-600">Dojazd w promieniu 30 km od Białej Podlaskiej jest wliczony w cenę.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start space-x-4">
                <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl">
                  <Users size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-900">Mobilność</h4>
                  <p className="text-gray-600">Realizujemy zlecenia lokalne i nie tylko. Zadzwoń, aby dopytać o dojazd do Twojej miejscowości.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[450px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d78213.6823528416!2d23.053805720935105!3d52.03112833075678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47219142ec464875%3A0xc3f8e58a2d3080c!2zQmlhxYJhIFBvZGxhc2th!5e0!3m2!1spl!2spl!4v1713430000000!5m2!1spl!2spl" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa Biała Podlaska"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white/40">
        <div className="max-w-4xl mx-auto px-6">
          <SectionTitle title="Pytania i Odpowiedzi" subtitle="Najczęściej zadawane pytania" />
          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all">
                <summary className="list-none p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                  <span className="font-bold text-lg text-gray-800">{item.q}</span>
                  <ChevronDown size={24} className="text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section Placeholder */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <SectionTitle title="Galeria Śmiechu" subtitle="Zobacz jak bawią się z nami mali dorośli" />
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {[...Array(6)].map((_, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.02 }}
              className="rounded-3xl overflow-hidden shadow-lg"
            >
              <img 
                src={`https://picsum.photos/seed/dance${i}/400/${i % 2 === 0 ? 500 : 300}`} 
                alt="Galeria" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="relative pt-24 pb-12 bg-gray-900 text-white overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-purple/20 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-pink/20 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-5xl font-display mb-8 text-white">
                Gotowy na <span className="text-gradient">odlotową zabawę?</span>
              </h2>
              <p className="text-gray-300 text-xl mb-12">
                Napisz do nas lub zadzwoń, aby sprawdzić wolne terminy i otrzymać darmową wycenę swojego wydarzenia.
              </p>
              
              <div className="space-y-6">
                <a href="tel:790545796" className="flex items-center space-x-6 group">
                  <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center group-hover:bg-brand-purple/20 transition-all">
                    <Phone size={28} />
                  </div>
                  <div>
                    <p className="text-gray-500 font-semibold mb-1 uppercase tracking-widest text-xs">Zadzwoń do nas</p>
                    <p className="text-2xl font-bold">790-545-796</p>
                  </div>
                </a>
                <a href="mailto:k.smiecinska@o2.pl" className="flex items-center space-x-6 group">
                  <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center group-hover:bg-brand-pink/20 transition-all">
                    <Mail size={28} />
                  </div>
                  <div>
                    <p className="text-gray-500 font-semibold mb-1 uppercase tracking-widest text-xs">Wyślij email</p>
                    <p className="text-2xl font-bold">k.smiecinska@o2.pl</p>
                  </div>
                </a>
              </div>

              <div className="mt-12 flex space-x-6">
                <a 
                  href="https://www.instagram.com/odlotowe_animacje" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-brand-pink transition-all shadow-xl"
                >
                  <Instagram size={28} />
                </a>
                <a 
                  href="https://www.facebook.com/share/1ZeQArQujr/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all shadow-xl"
                >
                  <Facebook size={28} />
                </a>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-10 rounded-[3rem] border border-white/10">
              <h3 className="text-2xl font-display mb-8">Szybki kontakt</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-400">Imię i Nazwisko</label>
                    <input type="text" placeholder="Twoje imię" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-purple outline-none transition-all placeholder:text-gray-600" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-400">Numer telefonu</label>
                    <input type="tel" placeholder="Nr telefonu" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-purple outline-none transition-all placeholder:text-gray-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-400">Typ wydarzenia</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-purple outline-none transition-all text-gray-400 appearance-none">
                    <option>Wybierz okazję...</option>
                    {SERVICES.map((s, i) => <option key={i} className="bg-gray-900">{s}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-400">Moja wiadomość</label>
                  <textarea rows={4} placeholder="Napisz kilka słów o Twoich planach..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-purple outline-none transition-all placeholder:text-gray-600"></textarea>
                </div>
                <button type="submit" className="w-full vibrant-gradient py-5 rounded-2xl font-bold text-xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">
                  Wyślij zapytanie
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm gap-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 vibrant-gradient rounded-full flex items-center justify-center text-white">
                <PartyPopper size={16} />
              </div>
              <span className="font-bold text-white">Odlotowe Animacje</span>
            </div>
            <p>© 2026 Odlotowe Animacje. Wszelkie prawa zastrzeżone.</p>
            <div className="flex space-x-8">
              <a href="#" className="hover:text-white transition-colors">Regulamin</a>
              <a href="#" className="hover:text-white transition-colors">Prywatność</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
