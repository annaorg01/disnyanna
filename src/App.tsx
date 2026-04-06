/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, ArrowRight, Check, Sparkles, Star, Heart, Music, Car, User, Shield, Ghost, Dog, Cat, Rocket, Pencil, Volume2, VolumeX } from 'lucide-react';

// --- Types ---
interface Profile {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

// --- Constants ---
const SOUNDS = {
  click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  delete: 'https://assets.mixkit.co/active_storage/sfx/256/256-preview.mp3',
  pop: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3',
};

const AVATAR_CATEGORIES = [
  {
    title: 'חברים מצוירים',
    items: [
      { name: 'מיקי', url: 'https://picsum.photos/seed/mickey_mouse/280/280' },
      { name: 'באז', url: 'https://picsum.photos/seed/buzz_lightyear/280/280' },
      { name: 'וודי', url: 'https://picsum.photos/seed/woody_toy/280/280' },
      { name: 'אולף', url: 'https://picsum.photos/seed/olaf_snow/280/280' },
      { name: 'סטיץ', url: 'https://picsum.photos/seed/stitch_blue/280/280' },
      { name: 'סימבה', url: 'https://picsum.photos/seed/simba_lion/280/280' },
      { name: 'פו הדב', url: 'https://picsum.photos/seed/pooh/280/280' },
      { name: 'פיגלט', url: 'https://picsum.photos/seed/piglet/280/280' },
    ]
  },
  {
    title: 'גיבורי על',
    items: [
      { name: 'ספיידרמן', url: 'https://picsum.photos/seed/hero_spider/280/280' },
      { name: 'איירון מן', url: 'https://picsum.photos/seed/hero_iron/280/280' },
      { name: 'וונדר וומן', url: 'https://picsum.photos/seed/hero_wonder/280/280' },
      { name: 'באטמן', url: 'https://picsum.photos/seed/hero_bat/280/280' },
      { name: 'קפטן אמריקה', url: 'https://picsum.photos/seed/hero_captain/280/280' },
      { name: 'האלק', url: 'https://picsum.photos/seed/hero_hulk/280/280' },
      { name: 'סופרמן', url: 'https://picsum.photos/seed/superman/280/280' },
      { name: 'פלאש', url: 'https://picsum.photos/seed/flash/280/280' },
    ]
  },
  {
    title: 'מכוניות ורכבים',
    items: [
      { name: 'מכונית אדומה', url: 'https://picsum.photos/seed/red_car/280/280' },
      { name: 'מכונית כחולה', url: 'https://picsum.photos/seed/blue_car/280/280' },
      { name: 'מכונית ירוקה', url: 'https://picsum.photos/seed/green_car/280/280' },
      { name: 'מכונית משטרה', url: 'https://picsum.photos/seed/police_car/280/280' },
      { name: 'כבאי', url: 'https://picsum.photos/seed/fire_truck/280/280' },
      { name: 'חללית', url: 'https://picsum.photos/seed/spaceship/280/280' },
      { name: 'טרקטור', url: 'https://picsum.photos/seed/tractor/280/280' },
      { name: 'מטוס', url: 'https://picsum.photos/seed/airplane/280/280' },
    ]
  },
  {
    title: 'ילדים וחיות',
    items: [
      { name: 'ילדה 1', url: 'https://picsum.photos/seed/happy_girl1/280/280' },
      { name: 'ילד 1', url: 'https://picsum.photos/seed/happy_boy1/280/280' },
      { name: 'ילדה 2', url: 'https://picsum.photos/seed/happy_girl2/280/280' },
      { name: 'ילד 2', url: 'https://picsum.photos/seed/happy_boy2/280/280' },
      { name: 'ילדה 3', url: 'https://picsum.photos/seed/happy_girl3/280/280' },
      { name: 'ילד 3', url: 'https://picsum.photos/seed/happy_boy3/280/280' },
      { name: 'כלבלב', url: 'https://picsum.photos/seed/cute_dog/280/280' },
      { name: 'חתלתול', url: 'https://picsum.photos/seed/cute_cat/280/280' },
      { name: 'ארנב', url: 'https://picsum.photos/seed/cute_rabbit/280/280' },
      { name: 'דובי', url: 'https://picsum.photos/seed/teddy_bear/280/280' },
      { name: 'פנדה', url: 'https://picsum.photos/seed/panda/280/280' },
      { name: 'קואלה', url: 'https://picsum.photos/seed/koala/280/280' },
    ]
  }
];

const COLORS = [
  'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-yellow-500', 'bg-green-500', 'bg-red-500', 'bg-orange-500', 'bg-teal-500'
];

export default function App() {
  const [profiles, setProfiles] = useState<Profile[]>(() => {
    const saved = localStorage.getItem('anna_disney_profiles');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'אנה', avatar: AVATAR_CATEGORIES[0].items[0].url, color: 'bg-blue-500' }
    ];
  });

  const [view, setView] = useState<'who_watching' | 'add_profile' | 'home'>('who_watching');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileAvatar, setNewProfileAvatar] = useState(AVATAR_CATEGORIES[0].items[0].url);
  const [newProfileColor, setNewProfileColor] = useState(COLORS[0]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    localStorage.setItem('anna_disney_profiles', JSON.stringify(profiles));
  }, [profiles]);

  const playSound = (type: keyof typeof SOUNDS) => {
    if (!soundEnabled) return;
    const audio = new Audio(SOUNDS[type]);
    audio.play().catch(() => {});
  };

  const handleSaveProfile = () => {
    if (!newProfileName.trim()) return;
    
    if (editingProfile) {
      setProfiles(profiles.map(p => p.id === editingProfile.id ? {
        ...p,
        name: newProfileName,
        avatar: newProfileAvatar,
        color: newProfileColor
      } : p));
      playSound('success');
    } else {
      const newProfile: Profile = {
        id: Date.now().toString(),
        name: newProfileName,
        avatar: newProfileAvatar,
        color: newProfileColor,
      };
      setProfiles([...profiles, newProfile]);
      setShowCelebration(true);
      playSound('success');
      setTimeout(() => setShowCelebration(false), 3000);
    }
    
    setNewProfileName('');
    setEditingProfile(null);
    setView('who_watching');
  };

  const startEditing = (profile: Profile, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingProfile(profile);
    setNewProfileName(profile.name);
    setNewProfileAvatar(profile.avatar);
    setNewProfileColor(profile.color);
    setView('add_profile');
    playSound('pop');
  };

  const selectProfile = (profile: Profile) => {
    setSelectedProfile(profile);
    setView('home');
    playSound('click');
  };

  const deleteProfile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProfiles(profiles.filter(p => p.id !== id));
    playSound('delete');
  };

  // --- Components ---

  const WhoWatching = () => (
    <div className="min-h-screen bg-[#1a1d29] text-white flex flex-col items-center justify-center p-8 font-sans relative" dir="rtl">
      <button 
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="absolute top-8 left-8 p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all"
      >
        {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold mb-16 tracking-tight text-center"
      >
        מי צופה עכשיו?
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-10 md:gap-16 max-w-7xl">
        {profiles.map((profile) => (
          <motion.div
            key={profile.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => selectProfile(profile)}
            className="group relative flex flex-col items-center cursor-pointer"
          >
            <div className={`w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-transparent group-hover:border-white transition-all duration-300 shadow-2xl ${profile.color}`}>
              <img 
                src={profile.avatar} 
                alt={profile.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="mt-6 text-xl md:text-2xl font-bold text-gray-400 group-hover:text-white transition-colors">
              {profile.name}
            </span>
            
            <div className="absolute -top-2 -right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => deleteProfile(profile.id, e)}
                className="bg-red-500 rounded-full p-2 hover:bg-red-600 shadow-lg"
              >
                <X size={20} />
              </button>
              <button
                onClick={(e) => startEditing(profile, e)}
                className="bg-blue-500 rounded-full p-2 hover:bg-blue-600 shadow-lg"
              >
                <Pencil size={20} />
              </button>
            </div>
          </motion.div>
        ))}

        {profiles.length < 8 && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setEditingProfile(null);
              setNewProfileName('');
              setView('add_profile');
              playSound('pop');
            }}
            className="group flex flex-col items-center cursor-pointer"
          >
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-[#2a2e3d] flex items-center justify-center border-4 border-transparent group-hover:border-white transition-all duration-300">
              <Plus size={64} className="text-gray-400 group-hover:text-white" />
            </div>
            <span className="mt-6 text-xl md:text-2xl font-bold text-gray-400 group-hover:text-white transition-colors">
              הוספת פרופיל
            </span>
          </motion.div>
        )}
      </div>

      <div className="mt-20 text-gray-600 text-sm font-bold">
        משחק הפרופילים של אנה - גרסת מעריצים
      </div>

      <AnimatePresence>
        {showCelebration && (
          <div className="fixed inset-0 pointer-events-none z-[200] flex items-center justify-center">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  x: (Math.random() - 0.5) * 1000,
                  y: (Math.random() - 0.5) * 1000,
                  rotate: Math.random() * 360
                }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute"
              >
                {i % 3 === 0 ? <Star className="text-yellow-400" size={40} /> : 
                 i % 3 === 1 ? <Heart className="text-pink-500" size={40} /> : 
                 <Sparkles className="text-blue-400" size={40} />}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  const AddProfile = () => (
    <div className="min-h-screen bg-[#1a1d29] text-white flex flex-col p-6 md:p-12 font-sans" dir="rtl">
      <button 
        onClick={() => {
          setView('who_watching');
          playSound('click');
        }}
        className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors mb-12 self-start"
      >
        <ArrowRight size={32} />
        <span className="text-2xl font-bold">ביטול</span>
      </button>

      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-5xl font-black mb-16 text-center">
          {editingProfile ? 'עריכת פרופיל' : 'יצירת פרופיל חדש'}
        </h2>
        
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          <div className="flex flex-col items-center gap-8 sticky top-12">
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-8 border-white/20 shadow-2xl ${newProfileColor}`}
            >
              <img 
                src={newProfileAvatar} 
                alt="Preview" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <input
              type="text"
              placeholder="איך קוראים לך?"
              value={newProfileName}
              onChange={(e) => setNewProfileName(e.target.value)}
              className="w-full bg-[#2a2e3d] border-none rounded-2xl p-6 text-3xl text-center focus:ring-4 focus:ring-blue-500 outline-none placeholder:text-gray-600 font-bold"
              autoFocus
            />
            <button
              onClick={handleSaveProfile}
              disabled={!newProfileName.trim()}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-black py-6 rounded-2xl text-3xl transition-all shadow-2xl transform active:scale-95"
            >
              שמירה
            </button>
          </div>

          <div className="space-y-12 bg-black/20 p-8 rounded-3xl backdrop-blur-sm">
            {AVATAR_CATEGORIES.map((category, catIdx) => (
              <div key={catIdx}>
                <h3 className="text-2xl font-black mb-6 text-blue-400 flex items-center gap-3">
                  {category.title === 'גיבורי על' && <Shield size={28} />}
                  {category.title === 'מכוניות ורכבים' && <Car size={28} />}
                  {category.title === 'ילדים וחיות' && <User size={28} />}
                  {category.title === 'חברים מצוירים' && <Rocket size={28} />}
                  {category.title}
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
                  {category.items.map((avatar, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setNewProfileAvatar(avatar.url);
                        playSound('pop');
                      }}
                      className={`relative rounded-full overflow-hidden border-4 transition-all aspect-square ${newProfileAvatar === avatar.url ? 'border-blue-500 scale-110 z-10 shadow-blue-500/50 shadow-xl' : 'border-transparent hover:border-white/50'}`}
                    >
                      <img 
                        src={avatar.url} 
                        alt={avatar.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {newProfileAvatar === avatar.url && (
                        <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                          <Check size={32} className="text-white stroke-[4px]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <h3 className="text-2xl font-black mb-6 text-blue-400">בחירת צבע רקע</h3>
              <div className="flex flex-wrap gap-6">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setNewProfileColor(color);
                      playSound('pop');
                    }}
                    className={`w-14 h-14 rounded-full border-4 transition-all ${color} ${newProfileColor === color ? 'border-white scale-125 shadow-xl' : 'border-transparent hover:scale-110'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Home = () => (
    <div className="min-h-screen bg-[#1a1d29] text-white font-sans overflow-x-hidden" dir="rtl">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/90 to-transparent p-6 md:p-8 flex justify-between items-center">
        <div className="flex items-center gap-12">
          <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter text-blue-400">העולם של אנה</h1>
          <div className="hidden lg:flex gap-10 text-lg font-black tracking-widest text-gray-300">
            <span className="hover:text-white cursor-pointer flex items-center gap-2 transition-colors"><Sparkles size={20}/> קסם</span>
            <span className="hover:text-white cursor-pointer flex items-center gap-2 transition-colors"><Star size={20}/> סרטים</span>
            <span className="hover:text-white cursor-pointer flex items-center gap-2 transition-colors"><Heart size={20}/> מועדפים</span>
          </div>
        </div>
        <div 
          onClick={() => {
            setView('who_watching');
            playSound('click');
          }}
          className="flex items-center gap-4 cursor-pointer group bg-white/5 hover:bg-white/10 p-2 pr-4 rounded-full transition-all"
        >
          <span className="text-lg font-black hidden md:block group-hover:text-blue-400 transition-colors">{selectedProfile?.name}</span>
          <div className={`w-12 h-12 rounded-full overflow-hidden border-2 border-transparent group-hover:border-white transition-all shadow-lg ${selectedProfile?.color}`}>
            <img src={selectedProfile?.avatar} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[85vh] w-full">
        <img 
          src="https://picsum.photos/seed/disney-hero/1920/1080" 
          alt="Hero" 
          className="w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1d29] via-[#1a1d29]/20 to-transparent" />
        <div className="absolute bottom-32 right-12 md:right-24 max-w-3xl text-right">
          <motion.h2 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-black mb-6 leading-tight"
          >
            הרפתקה קסומה
          </motion.h2>
          <p className="text-2xl md:text-3xl text-gray-300 mb-12 font-medium leading-relaxed">בואי להכיר את כל החברים האהובים עלייך בעולם של דמיון. הכל מחכה במיוחד בשבילך, {selectedProfile?.name}!</p>
          <div className="flex gap-6 justify-end">
            <button 
              onClick={() => playSound('success')}
              className="bg-white text-black px-12 py-5 rounded-xl font-black text-2xl hover:bg-gray-200 transition-all flex items-center gap-3 shadow-2xl transform active:scale-95"
            >
              <Plus size={28} /> צפייה עכשיו
            </button>
            <button className="bg-black/40 text-white border-2 border-white/30 px-12 py-5 rounded-xl font-black text-2xl hover:bg-white/10 transition-all backdrop-blur-md">
              פרטים נוספים
            </button>
          </div>
        </div>
      </section>

      {/* Content Rows */}
      <div className="px-8 md:px-24 pb-32 space-y-20 -mt-24 relative z-10">
        <ContentRow title="מומלץ במיוחד עבורך" seed="magic" />
        <ContentRow title="קלאסיקות אהובות" seed="classic" />
        <ContentRow title="עולם הדמיון" seed="pixar" />
        <ContentRow title="גיבורים בפעולה" seed="hero" />
      </div>

      <footer className="p-12 text-center text-gray-600 font-bold border-t border-white/5">
        זהו משחק פרטי המיועד לשימוש אישי בלבד.
      </footer>
    </div>
  );

  const ContentRow = ({ title, seed }: { title: string, seed: string }) => (
    <div className="space-y-6">
      <h3 className="text-3xl md:text-4xl font-black text-white pr-2 border-r-8 border-blue-500">{title}</h3>
      <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar pr-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.08, zIndex: 20, y: -10 }}
            onClick={() => playSound('pop')}
            className="flex-none w-72 md:w-96 aspect-video rounded-2xl overflow-hidden bg-[#2a2e3d] cursor-pointer shadow-2xl border-4 border-transparent hover:border-white transition-all"
          >
            <img 
              src={`https://picsum.photos/seed/${seed}-${i}/600/338`} 
              alt="Content" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );

  const [showInstallHint, setShowInstallHint] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallHint(false);
    } else {
      const timer = setTimeout(() => setShowInstallHint(true), 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="selection:bg-blue-500 selection:text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {view === 'who_watching' && (
          <motion.div
            key="who"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WhoWatching />
          </motion.div>
        )}
        {view === 'add_profile' && (
          <motion.div
            key="add"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
          >
            <AddProfile />
          </motion.div>
        )}
        {view === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Home />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Install Hint Overlay */}
      <AnimatePresence>
        {showInstallHint && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 left-6 right-6 z-[100] bg-blue-600 p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4 border-2 border-white/20"
            dir="rtl"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-xl">
                <Plus size={24} />
              </div>
              <div>
                <p className="font-black text-lg">רוצה להוסיף את המשחק למסך הבית?</p>
                <p className="text-sm opacity-80">לחצי על שלוש הנקודות למעלה ובחרי "הוספה למסך הבית"</p>
              </div>
            </div>
            <button 
              onClick={() => setShowInstallHint(false)}
              className="p-2 hover:bg-white/10 rounded-full"
            >
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;800&display=swap');
        body {
          font-family: 'Assistant', sans-serif;
          background-color: #1a1d29;
        }
      `}</style>
    </div>
  );
}
