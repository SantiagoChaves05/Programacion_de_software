import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Puzzle, X, Heart, Trophy, UploadCloud } from 'lucide-react';
import { MAKER_SUBMISSIONS } from '../data/products';
import { MakerSubmission } from '../types';
import { useCart } from '../context/CartContext';

interface MakersGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MakersGalleryModal: React.FC<MakersGalleryModalProps> = ({ isOpen, onClose }) => {
  const { addToast } = useCart();
  const [submissions, setSubmissions] = useState<MakerSubmission[]>(MAKER_SUBMISSIONS);
  const [votedIds, setVotedIds] = useState<string[]>([]);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newAge, setNewAge] = useState('7');
  const [newCategory, setNewCategory] = useState('Bloques de Construcción');

  if (!isOpen) return null;

  const handleVote = (id: string) => {
    if (votedIds.includes(id)) {
      setVotedIds(votedIds.filter((vId) => vId !== id));
      setSubmissions((prev) =>
        prev.map((sub) => (sub.id === id ? { ...sub, likes: sub.likes - 1 } : sub))
      );
      addToast('Voto retirado', undefined, 'heart');
    } else {
      setVotedIds([...votedIds, id]);
      setSubmissions((prev) =>
        prev.map((sub) => (sub.id === id ? { ...sub, likes: sub.likes + 1 } : sub))
      );
      addToast('¡Voto registrado para el concurso!', 'Ayudaste a sumar puntos esta semana', 'heart');
    }
  };

  const handleNewSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim()) return;

    const newSub: MakerSubmission = {
      id: `maker-${Date.now()}`,
      title: newTitle,
      author: newAuthor,
      age: parseInt(newAge, 10) || 7,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCMfwRQqO7eZpxsroZev5XChX-PBifCk15rdGY6Gm5Brb3_0_jImHh7D60R1wtPLYgzRReXCU9J5DTOte_wqeuiURb6LgIZPT5s0F4LHk6wmumt_n51srq-PFXGQVBF4zYT1uj9DzU6ki8rIdy2aV5TO2v0aLgVrEkOeOuA_7sj-Yt53Cy8nQO0rQRT8P2PerorKtDCUpJaSpe0fa17caJbwsbtWfSh9zOhk-7BeL373bdTb1HlG6fI',
      likes: 1,
      toyCategory: newCategory,
      featured: true,
    };

    setSubmissions([newSub, ...submissions]);
    setVotedIds([...votedIds, newSub.id]);
    setShowSubmitForm(false);
    setNewTitle('');
    setNewAuthor('');
    addToast('¡Creación subida con éxito!', 'Ya está participando en el reto semanal', 'sparkles');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-white dark:bg-[#1A1B28] text-[#12131A] dark:text-white rounded-3xl border-[3px] border-[#12131A] dark:border-[#0050E3] shadow-brutal-xl max-w-2xl w-full p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full border-2 border-[#12131A] dark:border-white bg-[#F4F2FD] dark:bg-[#25283A] hover:bg-[#FF2A55] hover:text-white transition-colors z-10"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-4 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#C9D3FF] border-2 border-[#12131A] flex items-center justify-center text-[#0050E3] shadow-brutal-sm">
                <Puzzle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-[#0050E3] tracking-wider">
                  #ToylandMakers • Reto Semanal
                </span>
                <h3 className="font-display font-black text-xl sm:text-2xl uppercase leading-tight">
                  Galería de Creadores
                </h3>
              </div>
            </div>

            <button
              onClick={() => setShowSubmitForm(!showSubmitForm)}
              className="mr-10 px-3 py-1.5 bg-[#FFD000] text-[#12131A] font-display font-black text-xs uppercase rounded-xl border-2 border-[#12131A] shadow-brutal-sm btn-pressable flex items-center gap-1.5"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              {showSubmitForm ? 'Ver Galería' : 'Subir Creación'}
            </button>
          </div>

          {/* Weekly Prize Notice */}
          <div className="mb-4 p-3 rounded-2xl bg-[#FFE082] dark:bg-[#383013] border-2 border-[#12131A] flex items-center gap-2 text-xs font-bold text-[#12131A] dark:text-[#FFE082] shrink-0">
            <Trophy className="w-4 h-4 text-[#FF2A55] shrink-0" />
            <span>Premio semanal: ¡Tarjeta de regalo de $50 para la creación con más votos!</span>
          </div>

          {/* Submission Form OR Gallery */}
          <div className="flex-1 overflow-y-auto pr-1">
            {showSubmitForm ? (
              <form onSubmit={handleNewSubmission} className="space-y-3 p-1">
                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Título de la Creación *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ej: Castillo Espacial con Cañón Láser"
                    className="w-full text-xs p-2.5 rounded-xl border-2 border-[#12131A] dark:border-[#383C56] bg-white dark:bg-[#202232] text-[#12131A] dark:text-white font-semibold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black uppercase mb-1">
                      Nombre del Peque *
                    </label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="Ej: Mateo"
                      className="w-full text-xs p-2.5 rounded-xl border-2 border-[#12131A] dark:border-[#383C56] bg-white dark:bg-[#202232] text-[#12131A] dark:text-white font-semibold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase mb-1">
                      Edad (Años)
                    </label>
                    <input
                      type="number"
                      min={2}
                      max={15}
                      value={newAge}
                      onChange={(e) => setNewAge(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border-2 border-[#12131A] dark:border-[#383C56] bg-white dark:bg-[#202232] text-[#12131A] dark:text-white font-semibold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Categoría del Juguete
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border-2 border-[#12131A] dark:border-[#383C56] bg-white dark:bg-[#202232] text-[#12131A] dark:text-white font-semibold focus:outline-none"
                  >
                    <option value="Bloques de Construcción">Bloques de Construcción</option>
                    <option value="Robótica & STEM">Robótica & STEM</option>
                    <option value="Juegos Creativos">Juegos Creativos</option>
                    <option value="Pistas & Coches">Pistas & Coches</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 bg-[#0050E3] text-white font-display font-black text-xs uppercase rounded-xl border-2 border-[#12131A] shadow-brutal btn-pressable"
                >
                  Publicar Creación en el Reto
                </button>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {submissions.map((sub) => {
                  const hasVoted = votedIds.includes(sub.id);
                  return (
                    <div
                      key={sub.id}
                      className="bg-[#FFFDF5] dark:bg-[#202232] rounded-2xl p-3 border-2 border-[#12131A] dark:border-[#383C56] shadow-brutal-sm flex flex-col"
                    >
                      <img
                        src={sub.image}
                        alt={sub.title}
                        className="w-full h-36 object-cover rounded-xl border border-[#12131A] mb-2.5"
                      />
                      <span className="text-[10px] font-black uppercase text-[#0050E3] dark:text-[#60A5FA]">
                        {sub.toyCategory}
                      </span>
                      <h4 className="font-display font-black text-sm uppercase text-[#12131A] dark:text-white leading-tight mt-0.5">
                        {sub.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-0.5">
                        Por {sub.author} ({sub.age} años)
                      </p>

                      <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                        <span className="text-xs font-extrabold text-[#0050E3] dark:text-[#60A5FA]">
                          {sub.likes} votos
                        </span>
                        <button
                          onClick={() => handleVote(sub.id)}
                          className={`px-3 py-1 rounded-full text-xs font-display font-black uppercase border border-[#12131A] flex items-center gap-1 transition-all ${
                            hasVoted
                              ? 'bg-[#FF2A55] text-white'
                              : 'bg-white dark:bg-[#181924] text-[#12131A] dark:text-white hover:bg-[#FFDADA]'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${hasVoted ? 'fill-white' : ''}`} />
                          {hasVoted ? '¡Votado!' : 'Votar'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
