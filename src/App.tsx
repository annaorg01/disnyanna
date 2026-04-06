/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, ArrowRight, Check, Sparkles, Star, Heart, Music, Car, User, Shield } from 'lucide-react';

// --- Types ---
interface Profile {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

// --- Constants ---
const AVATAR_CATEGORIES = [
  {
    title: 'דיסני ופיקסאר',
    items: [
      { name: 'מיקי', url: 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/FFA0BEADE30CA2CC417D6AAFC3C3FD8E435EAD6C3D9C4736189233198E07D4E6/scale?width=280&aspectRatio=1.00&format=png' },
      { name: 'באז', url: 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/5A51E0F92F62338699047BF8D2D0C734C4761831BB5321FA5A9FD571F912723E/scale?width=280&aspectRatio=1.00&format=png' },
      { name: 'וודי', url: 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/B86C7995A98316105A9FBA3516659B1F232A64474653B338C451C69E9117BC35/scale?width=280&aspectRatio=1.00&format=png' },
      { name: 'אולף', url: 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/2EFB5E305D5975C95D06C6646A1F6416A1F6416A1F6416A1F6416A1F6416A1F6/scale?width=280&aspectRatio=1.00&format=png' },
    ]
  },
  {
    title: 'גיבורי על',
    items: [
      { name: 'ספיידרמן', url: 'https://picsum.photos/seed/spiderman/280/280' },
      { name: 'איירון מן', url: 'https://picsum.photos/seed/ironman/280/280' },
      { name: 'וונדר וומן', url: 'https://picsum.photos/seed/wonderwoman/280/280' },
      { name: 'באטמן', url: 'https://picsum.photos/seed/batman/280/280' },
      { name: 'קפטן אמריקה', url: 'https://picsum.photos/seed/captain/280/280' },
      { name: 'האלק', url: 'https://picsum.photos/seed/hulk/280/280' },
    ]
  },
  {
    title: 'מכוניות',
    items: [
      { name: 'ספידי מקווין', url: 'https://picsum.photos/seed/cars1/280/280' },
      { name: 'מכונית כחולה', url: 'https://picsum.photos/seed/cars2/280/280' },
      { name: 'מכונית ירוקה', url: 'https://picsum.photos/seed/cars3/280/280' },
      { name: 'מכונית משטרה', url: 'https://picsum.photos/seed/police/280/280' },
      { name: 'כבאי', url: 'https://picsum.photos/seed/fire/280/280' },
    ]
  },
  {
    title: 'ילדים וילדות',
    items: [
      { name: 'ילדה 1', url: 'https://picsum.photos/seed/girl1/280/280' },
      { name: 'ילד 1', url: 'https://picsum.photos/seed/boy1/280/280' },
      { name: 'ילדה 2', url: 'https://picsum.photos/seed/girl2/280/280' },
      { name: 'ילד 2', url: 'https://picsum.photos/seed/boy2/280/280' },
      { name: 'תינוק חמוד', url: 'https://picsum.photos/seed/baby/280/280' },
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
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileAvatar, setNewProfileAvatar] = useState(AVATAR_CATEGORIES[0].items[0].url);
  const [newProfileColor, setNewProfileColor] = useState(COLORS[0]);

  useEffect(() => {
    localStorage.setItem('anna_disney_profiles', JSON.stringify(profiles));
  }, [profiles]);

  const handleAddProfile = () => {
    if (!newProfileName.trim()) return;
    const newProfile: Profile = {
      id: Date.now().toString(),
      name: newProfileName,
      avatar: newProfileAvatar,
      color: newProfileColor,
    };
    setProfiles([...profiles, newProfile]);
    setNewProfileName('');
    setView('who_watching');
  };

  const selectProfile = (profile: Profile) => {
    setSelectedProfile(profile);
    setView('home');
  };

  const deleteProfile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProfiles(profiles.filter(p => p.id !== id));
  };

  // --- Components ---

  const WhoWatching = () => (
    <div className="min-h-screen bg-[#1a1d29] text-white flex flex-col items-center justify-center p-8 font-sans" dir="rtl">
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
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${profile.id}/280/280`;
                }}
              />
            </div>
            <span className="mt-6 text-xl md:text-2xl font-bold text-gray-400 group-hover:text-white transition-colors">
              {profile.name}
            </span>
            
            {profiles.length > 1 && (
              <button
                onClick={(e) => deleteProfile(profile.id, e)}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
              >
                <X size={20} />
              </button>
            )}
          </motion.div>
        ))}

        {profiles.length < 8 && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setView('add_profile')}
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
    </div>
  );

  const AddProfile = () => (
    <div className="min-h-screen bg-[#1a1d29] text-white flex flex-col p-6 md:p-12 font-sans" dir="rtl">
      <button 
        onClick={() => setView('who_watching')}
        className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors mb-12 self-start"
      >
        <ArrowRight size={32} />
        <span className="text-2xl font-bold">ביטול</span>
      </button>

      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-5xl font-black mb-16 text-center">יצירת פרופיל חדש</h2>
        
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          <div className="flex flex-col items-center gap-8 sticky top-12">
            <div className={`w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-8 border-white/20 shadow-2xl ${newProfileColor}`}>
              <img 
                src={newProfileAvatar} 
                alt="Preview" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <input
              type="text"
              placeholder="איך קוראים לך?"
              value={newProfileName}
              onChange={(e) => setNewProfileName(e.target.value)}
              className="w-full bg-[#2a2e3d] border-none rounded-2xl p-6 text-3xl text-center focus:ring-4 focus:ring-blue-500 outline-none placeholder:text-gray-600 font-bold"
              autoFocus
            />
            <button
              onClick={handleAddProfile}
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
                  {category.title === 'מכוניות' && <Car size={28} />}
                  {category.title === 'ילדים וילדות' && <User size={28} />}
                  {category.title}
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
                  {category.items.map((avatar, idx) => (
                    <button
                      key={idx}
                      onClick={() => setNewProfileAvatar(avatar.url)}
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
                    onClick={() => setNewProfileColor(color)}
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
          <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter text-blue-400">אנה+</h1>
          <div className="hidden lg:flex gap-10 text-lg font-black tracking-widest text-gray-300">
            <span className="hover:text-white cursor-pointer flex items-center gap-2 transition-colors"><Sparkles size={20}/> קסם</span>
            <span className="hover:text-white cursor-pointer flex items-center gap-2 transition-colors"><Star size={20}/> סרטים</span>
            <span className="hover:text-white cursor-pointer flex items-center gap-2 transition-colors"><Heart size={20}/> מועדפים</span>
          </div>
        </div>
        <div 
          onClick={() => setView('who_watching')}
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
            <button className="bg-white text-black px-12 py-5 rounded-xl font-black text-2xl hover:bg-gray-200 transition-all flex items-center gap-3 shadow-2xl transform active:scale-95">
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
        <ContentRow title="קלאסיקות של דיסני" seed="classic" />
        <ContentRow title="האהובים של פיקסאר" seed="pixar" />
        <ContentRow title="גיבורי על בפעולה" seed="hero" />
      </div>
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
