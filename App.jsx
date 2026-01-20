import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Image as ImageIcon,
  Heart,
  History,
  Plus,
  ChevronRight,
  Menu,
  X,
  Home as HomeIcon,
  Sparkles
} from 'lucide-react';

import ProfilesSection from './sections/ProfilesSection';
import MemoryGallery from './sections/MemoryGallery';
import FamilyTree from './sections/FamilyTree';
import TimelineSection from './sections/TimelineSection';
import AddMemberForm from './components/AddMemberForm';
import EditMemberForm from './components/EditMemberForm';
import AddMemoryForm from './components/AddMemoryForm';
import FamilyPulse from './components/FamilyPulse';

// Initial Mock Data
const INITIAL_FAMILY = [
  {
    id: 1,
    name: "Hatif Sheikh",
    birthDate: "1979-03-15",
    ageLabel: "46 Years, 9 Months, 9 Days",
    relationship: "Father",
    occupation: "Senior Software Engineer",
    theme: "#4f46e5",
    bio: "Passionate about tech, family adventures, and classic cars.",
    hobbies: ["Photography", "Racing", "Coding"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80"
  },
  {
    id: 2,
    name: "Rabi",
    birthDate: "1982-06-22",
    ageLabel: "43 Years, 6 Months, 2 Days",
    relationship: "Mother",
    occupation: "Creative Director",
    theme: "#db2777",
    bio: "A heart for art, gardening, and the best family chef.",
    hobbies: ["Painting", "Baking", "Interior Design"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80"
  },
  {
    id: 3,
    name: "Sarim Sheikh",
    birthDate: "2008-07-11",
    ageLabel: "17 Years, 5 Months, 13 Days",
    relationship: "Son",
    occupation: "Student & Gamer",
    theme: "#10b981",
    bio: "Aspiring game developer and tech enthusiast.",
    hobbies: ["Gaming", "Swimming", "Robotics"],
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&h=400&q=80"
  }
];

const INITIAL_MEMORIES = [
  {
    id: 1,
    title: "Summer at Pine Lake",
    date: "August 2024",
    location: "Oregon, USA",
    type: "photo",
    tags: ["Travel", "Summer", "Family"],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Maya's First Gymnastics Meet",
    date: "October 2024",
    location: "City Arena",
    type: "video",
    tags: ["Sports", "Maya", "Milestone"],
    image: "https://images.unsplash.com/photo-1563810168918-771128362548?auto=format&fit=crop&w=400&q=80"
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Load initial state from local storage or defaults
  const [familyMembers, setFamilyMembers] = useState(() => {
    const saved = localStorage.getItem('familyMembers');
    return saved ? JSON.parse(saved) : INITIAL_FAMILY;
  });

  const [memories, setMemories] = useState(() => {
    const saved = localStorage.getItem('memories');
    return saved ? JSON.parse(saved) : INITIAL_MEMORIES;
  });

  const [isSaving, setIsSaving] = useState(false);

  // Auto-save whenever data changes
  useEffect(() => {
    localStorage.setItem('familyMembers', JSON.stringify(familyMembers));
    localStorage.setItem('memories', JSON.stringify(memories));
  }, [familyMembers, memories]);

  const saveToStorage = () => {
    setIsSaving(true);
    localStorage.setItem('familyMembers', JSON.stringify(familyMembers));
    localStorage.setItem('memories', JSON.stringify(memories));
    setTimeout(() => setIsSaving(false), 1000);
  };

  // Modal states
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [isAddingMemory, setIsAddingMemory] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'profiles', label: 'Family Profiles', icon: Users },
    { id: 'gallery', label: 'Memories', icon: ImageIcon },
    { id: 'timeline', label: 'Our Story', icon: History },
    { id: 'pulse', label: 'Family Tree', icon: Heart },
  ];

  const addMember = (member) => {
    setFamilyMembers(prev => [...prev, member]);
  };

  const updateMember = (updatedMember) => {
    setFamilyMembers(prev => prev.map(m => m.id === updatedMember.id ? updatedMember : m));
  };

  const deleteMember = (id) => {
    if (window.confirm("Are you sure you want to remove this family member?")) {
      setFamilyMembers(prev => prev.filter(m => m.id !== id));
    }
  };

  const addMemory = (memory) => {
    setMemories(prev => [memory, ...prev]);
  };

  const Home = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <h1 className="text-5xl md:text-7xl font-bold mb-6">
        Welcome to <span className="gradient-text">FamilyCanvas</span>
      </h1>
      <p className="text-xl text-slate-400 max-w-2xl mb-12">
        Where memories breathe, grow, and connect generations.
        Start by building your family tree or exploring your digital scrapbook.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => setActiveTab('profiles')}
          className="glass-card px-8 py-4 bg-primary/20 border-primary/30 flex items-center gap-2 font-semibold hover:bg-primary/30 transition-all shadow-xl shadow-primary/10"
        >
          <Plus size={20} /> Build Family Tree
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          className="glass-card px-8 py-4 flex items-center gap-2 font-semibold hover:bg-white/5 transition-all text-white border-white/10"
        >
          Explore Memories <ChevronRight size={20} />
        </button>
      </div>

      <FamilyPulse
        familyMembers={familyMembers}
        memories={memories}
        onStatClick={(tabId) => setActiveTab(tabId)}
      />
    </motion.div>
  );

  return (
    <div className="relative min-h-screen">
      {/* Background Elements */}
      <div className="bg-glow glow-1" />
      <div className="bg-glow glow-2" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-slate-950/50 border-b border-white/5">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Users className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight">FamilyCanvas</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${activeTab === item.id
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <item.icon size={18} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-slate-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl md:hidden pt-24 px-6"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`p-4 rounded-xl flex items-center gap-4 transition-all ${activeTab === item.id
                    ? 'bg-primary/20 text-white border border-primary/30'
                    : 'text-slate-400 hover:bg-white/5'
                    }`}
                >
                  <item.icon size={24} />
                  <span className="text-lg font-semibold">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>
        {isAddingMember && (
          <AddMemberForm
            onAdd={addMember}
            onClose={() => setIsAddingMember(false)}
          />
        )}
        {editingMember && (
          <EditMemberForm
            member={editingMember}
            onUpdate={updateMember}
            onClose={() => setEditingMember(null)}
          />
        )}
        {isAddingMemory && (
          <AddMemoryForm
            onAdd={addMemory}
            onClose={() => setIsAddingMemory(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        {activeTab === 'home' && <Home />}
        {activeTab === 'profiles' && (
          <ProfilesSection
            familyMembers={familyMembers}
            onAddClick={() => setIsAddingMember(true)}
            onEditClick={setEditingMember}
            onDeleteClick={deleteMember}
          />
        )}
        {activeTab === 'gallery' && (
          <MemoryGallery
            memories={memories}
            onAddClick={() => setIsAddingMemory(true)}
          />
        )}
        {activeTab === 'timeline' && <TimelineSection />}
        {activeTab === 'pulse' && <FamilyTree />}
        {activeTab !== 'home' && activeTab !== 'profiles' && activeTab !== 'gallery' && activeTab !== 'pulse' && activeTab !== 'timeline' && (
          <div className="flex items-center justify-center min-h-[50vh] text-slate-500 italic">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} coming soon...
          </div>
        )}
      </main>

      {/* Floating Save Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={saveToStorage}
        className={`fixed bottom-8 right-8 z-[60] flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-2xl transition-all ${isSaving
          ? 'bg-emerald-500 text-white shadow-emerald-500/40'
          : 'glass-card bg-primary/20 border-primary/30 text-white hover:bg-primary/30 shadow-primary/20'
          }`}
      >
        {isSaving ? (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-5 h-5 flex items-center justify-center bg-white rounded-full text-emerald-500"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </motion.div>
            Saved!
          </>
        ) : (
          <>
            <Sparkles size={18} className="text-amber-400" />
            Save Canvas
          </>
        )}
      </motion.button>

      {/* Footer */}
      <footer className="mt-auto py-12 px-6 border-t border-white/5 text-center text-slate-500 text-sm">
        <p>&copy; 2025 FamilyCanvas. Preserve. Breathe. Grow.</p>
      </footer>
    </div>
  );
}

export default App;
