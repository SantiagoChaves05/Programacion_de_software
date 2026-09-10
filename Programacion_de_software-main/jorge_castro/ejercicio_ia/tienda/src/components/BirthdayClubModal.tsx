import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cake, X, Sparkles, CheckCircle2, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface BirthdayClubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BirthdayClubModal: React.FC<BirthdayClubModalProps> = ({ isOpen, onClose }) => {
  const { addToast } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    childName: '',
    childAge: '5',
    birthMonth: 'Mayo',
    favoriteToy: 'Bloques & LEGO',
    guardianEmail: '',
    address: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.childName || !formData.guardianEmail) {
      addToast('Por favor completa los datos obligatorios', undefined, 'sparkles');
      return;
    }
    setSubmitted(true);
    addToast(`¡${formData.childName} registrado en el Club Cumpleaños!`, 'Cupón CUMPLE25 generado', 'sparkles');
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-white dark:bg-[#1A1B28] text-[#12131A] dark:text-white rounded-3xl border-[3px] border-[#12131A] dark:border-[#FF2A55] shadow-brutal-xl max-w-lg w-full p-6 sm:p-8 overflow-hidden"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full border-2 border-[#12131A] dark:border-white bg-[#F4F2FD] dark:bg-[#25283A] hover:bg-[#FF2A55] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#10E872] border-[3px] border-[#12131A] flex items-center justify-center mx-auto mb-4 shadow-brutal">
                <CheckCircle2 className="w-8 h-8 text-[#12131A]" />
              </div>
              <span className="text-[10px] font-black uppercase text-[#FF2A55] tracking-wider">
                ¡Misión Cumplida!
              </span>
              <h3 className="font-display font-black text-2xl uppercase mt-1">
                ¡{formData.childName} ya es Miembro VIP!
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2">
                En el mes de {formData.birthMonth} enviaremos la cajita sorpresa y golosinas a tu domicilio sin costo alguno.
              </p>

              <div className="mt-5 p-4 rounded-2xl bg-[#FFE082] dark:bg-[#3D3517] border-2 border-[#12131A] text-center">
                <p className="text-[11px] font-black uppercase text-[#12131A] dark:text-[#FFE082]">
                  Tu Cupón de Bienvenida (25% OFF):
                </p>
                <div className="font-display font-black text-2xl text-[#FF2A55] tracking-widest mt-1 select-all">
                  CUMPLE25
                </div>
              </div>

              <button
                onClick={handleClose}
                className="mt-6 w-full py-3 bg-[#FF2A55] text-white font-display font-black text-xs uppercase rounded-xl border-2 border-[#12131A] shadow-brutal btn-pressable"
              >
                Volver a la Tienda
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FFDADA] border-2 border-[#12131A] flex items-center justify-center shadow-brutal-sm text-[#FF2A55]">
                  <Cake className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#FF2A55] tracking-wider">
                    Club Exclusivo Toyland
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl uppercase leading-tight">
                    Club Cumpleaños Sorpresa
                  </h3>
                </div>
              </div>

              <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-5">
                Registra la fecha de tus peques y recibe una cajita de golosinas y un cupón de 25% de regalo directo a tu hogar.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Nombre del Peque *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.childName}
                    onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                    placeholder="Ej: Lucas o Sofía"
                    className="w-full text-xs p-2.5 rounded-xl border-2 border-[#12131A] dark:border-[#383C56] bg-white dark:bg-[#202232] text-[#12131A] dark:text-white font-semibold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black uppercase mb-1">
                      Mes de Cumpleaños
                    </label>
                    <select
                      value={formData.birthMonth}
                      onChange={(e) => setFormData({ ...formData, birthMonth: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border-2 border-[#12131A] dark:border-[#383C56] bg-white dark:bg-[#202232] text-[#12131A] dark:text-white font-semibold focus:outline-none"
                    >
                      {[
                        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
                      ].map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase mb-1">
                      Edad a Cumplir
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={14}
                      value={formData.childAge}
                      onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border-2 border-[#12131A] dark:border-[#383C56] bg-white dark:bg-[#202232] text-[#12131A] dark:text-white font-semibold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Correo del Papá / Mamá *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.guardianEmail}
                    onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                    placeholder="correo@familia.com"
                    className="w-full text-xs p-2.5 rounded-xl border-2 border-[#12131A] dark:border-[#383C56] bg-white dark:bg-[#202232] text-[#12131A] dark:text-white font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Dirección para la Cajita Sorpresa
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Calle, Número, Ciudad"
                    className="w-full text-xs p-2.5 rounded-xl border-2 border-[#12131A] dark:border-[#383C56] bg-white dark:bg-[#202232] text-[#12131A] dark:text-white font-semibold focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3 bg-[#FF2A55] text-white font-display font-black text-xs uppercase rounded-xl border-[2.5px] border-[#12131A] shadow-brutal btn-pressable flex items-center justify-center gap-2"
                >
                  <Gift className="w-4 h-4" />
                  Inscribir y Obtener Cupón 25%
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
