import React, { useState, useRef } from 'react';
import { X, Upload, Camera, Check, Sparkles, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { Product } from '../types';

interface DynamicPhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onPhotoUploaded: (newPhoto: any) => void;
}

export const DynamicPhotoUploadModal: React.FC<DynamicPhotoUploadModalProps> = ({
  isOpen,
  onClose,
  products,
  onPhotoUploaded,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [undertone, setUndertone] = useState<'calido' | 'frio' | 'neutro'>('calido');
  const [selectedProductNames, setSelectedProductNames] = useState<string[]>([products[0]?.name || "L'Éclat Teint Sublime"]);
  const [comment, setComment] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Por favor sube un archivo de imagen válido (JPEG, PNG, WEBP).');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage('La foto no debe exceder 15MB.');
      return;
    }

    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const toggleProduct = (prodName: string) => {
    if (selectedProductNames.includes(prodName)) {
      if (selectedProductNames.length > 1) {
        setSelectedProductNames(selectedProductNames.filter(p => p !== prodName));
      }
    } else {
      setSelectedProductNames([...selectedProductNames, prodName]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) {
      setErrorMessage('Por favor selecciona o captura una fotografía para subir.');
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);

    try {
      const payload = {
        title: title.trim() || 'Look Otoño L\'Éclat',
        author: author.trim() || 'Musa L\'Éclat',
        undertone,
        shadeName: `Subtono ${undertone === 'calido' ? 'Cálido Dorado' : undertone === 'frio' ? 'Frío Rosáceo' : 'Neutro Armónico'}`,
        imageBase64: imagePreview,
        comment: comment.trim() || 'Compartido con la comunidad L\'Éclat.',
        productsUsed: selectedProductNames
      };

      const res = await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Error al guardar la foto en la base de datos de la nube');
      }

      setUploadSuccess(true);
      onPhotoUploaded(data.photo);

      setTimeout(() => {
        setUploadSuccess(false);
        setImagePreview(null);
        setTitle('');
        setAuthor('');
        setComment('');
        onClose();
      }, 1500);
    } catch (err: any) {
      console.error('Error uploading:', err);
      setErrorMessage(err.message || 'Error de conexión con la base de datos en la nube.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-[#fff8f8] dark:bg-[#1c1316] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#f0e6e7] dark:border-[#38262c] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#f0e6e7] dark:border-[#2a1d22] flex items-center justify-between bg-[#fcf1f2] dark:bg-[#22171b]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#4c1425] dark:bg-[#ffd9e0] text-white dark:text-[#3b0619] flex items-center justify-center">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-editorial text-lg font-semibold text-[#1f1a1b] dark:text-[#f9eeef]">
                Carga Dinámica de Fotos
              </h3>
              <p className="text-xs text-[#524346] dark:text-[#a08b8e]">
                Almacena tu look en la base de datos en la nube de L'Éclat
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#857375] hover:text-[#1f1a1b] dark:hover:text-[#fff] hover:bg-[#eae0e1] dark:hover:bg-[#2d1e23] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-5">
          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs flex items-center gap-2 border border-red-200 dark:border-red-900">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {uploadSuccess && (
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 border border-emerald-200 dark:border-emerald-900">
              <Check className="w-4 h-4 shrink-0" />
              <span>¡Foto almacenada con éxito en la base de datos en la nube! Actualizando galería...</span>
            </div>
          )}

          {/* Photo Drop Zone */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#524346] dark:text-[#a08b8e] mb-2">
              Fotografía del Look / Swatch
            </label>

            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden border border-[#d7c1c4] dark:border-[#3d2730] bg-[#140f11] aspect-16/10 flex items-center justify-center">
                <img
                  src={imagePreview}
                  alt="Vista previa del look cargado"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-md bg-[#fff8f8]/90 dark:bg-[#1f1519]/90 backdrop-blur-xs text-xs font-semibold text-[#4c1425] dark:text-[#ffd9e0] hover:bg-white shadow-xs"
                  >
                    Cambiar
                  </button>
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="p-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 shadow-xs"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
                  dragActive
                    ? 'border-[#4c1425] dark:border-[#ffd9e0] bg-[#f6ebec] dark:bg-[#291b20]'
                    : 'border-[#d7c1c4] dark:border-[#38262c] hover:border-[#4c1425] dark:hover:border-[#ffd9e0] bg-[#fcf1f2]/50 dark:bg-[#1c1316]'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-12 h-12 rounded-full bg-[#f6ebec] dark:bg-[#281c21] flex items-center justify-center text-[#4c1425] dark:text-[#ffd9e0]">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1f1a1b] dark:text-[#f9eeef]">
                    Arrastra tu foto aquí o haz clic para examinar
                  </p>
                  <p className="text-xs text-[#857375] dark:text-[#a08b8e] mt-1">
                    Formatos soportados: JPG, PNG, WEBP (Hasta 15MB)
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-lg bg-[#4c1425] dark:bg-[#ffd9e0] text-[#fff8f8] dark:text-[#3b0619] text-xs font-semibold uppercase tracking-wider hover:opacity-90 shadow-xs"
                  >
                    Seleccionar Archivo
                  </button>
                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="px-4 py-2 rounded-lg bg-[#f6ebec] dark:bg-[#26191e] text-[#4c1425] dark:text-[#ffd9e0] text-xs font-semibold uppercase tracking-wider border border-[#d7c1c4]/50 flex items-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Cámara / Selfie</span>
                  </button>
                </div>
              </div>
            )}

            {/* Hidden native inputs */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="user"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
            />
          </div>

          {/* Title & Author Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#524346] dark:text-[#a08b8e] mb-1.5">
                Título del Look
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Labios Berry y Piel Aterciopelada"
                required
                className="w-full bg-[#fcf1f2] dark:bg-[#201519] border border-[#d7c1c4] dark:border-[#38262c] rounded-lg px-3.5 py-2 text-xs text-[#1f1a1b] dark:text-[#f9eeef] focus:outline-hidden focus:border-[#4c1425] dark:focus:border-[#ffd9e0]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#524346] dark:text-[#a08b8e] mb-1.5">
                Tu Nombre o Usuario
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Ej. Sofía Mendoza @sofia_beauty"
                required
                className="w-full bg-[#fcf1f2] dark:bg-[#201519] border border-[#d7c1c4] dark:border-[#38262c] rounded-lg px-3.5 py-2 text-xs text-[#1f1a1b] dark:text-[#f9eeef] focus:outline-hidden focus:border-[#4c1425] dark:focus:border-[#ffd9e0]"
              />
            </div>
          </div>

          {/* Subtono Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#524346] dark:text-[#a08b8e] mb-1.5">
              Subtono de Piel del Look
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setUndertone('calido')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all border ${
                  undertone === 'calido'
                    ? 'bg-[#e5c392] text-[#4c1425] border-[#b5832b]'
                    : 'bg-[#fcf1f2] dark:bg-[#201519] text-[#524346] dark:text-[#a08b8e] border-[#d7c1c4] dark:border-[#38262c]'
                }`}
              >
                Cálido / Dorado
              </button>
              <button
                type="button"
                onClick={() => setUndertone('frio')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all border ${
                  undertone === 'frio'
                    ? 'bg-[#ffb1c2] text-[#4c1425] border-[#d97d64]'
                    : 'bg-[#fcf1f2] dark:bg-[#201519] text-[#524346] dark:text-[#a08b8e] border-[#d7c1c4] dark:border-[#38262c]'
                }`}
              >
                Frío / Rosado
              </button>
              <button
                type="button"
                onClick={() => setUndertone('neutro')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all border ${
                  undertone === 'neutro'
                    ? 'bg-[#c98c87] text-white border-[#954832]'
                    : 'bg-[#fcf1f2] dark:bg-[#201519] text-[#524346] dark:text-[#a08b8e] border-[#d7c1c4] dark:border-[#38262c]'
                }`}
              >
                Neutro
              </button>
            </div>
          </div>

          {/* Products Used (Checkboxes) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#524346] dark:text-[#a08b8e] mb-1.5">
              Productos L'Éclat Utilizados (Selecciona uno o varios)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {products.map((p) => {
                const selected = selectedProductNames.includes(p.name);
                return (
                  <div
                    key={p.id}
                    onClick={() => toggleProduct(p.name)}
                    className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition-all ${
                      selected
                        ? 'bg-[#f6ebec] dark:bg-[#291b20] border-[#4c1425] dark:border-[#ffd9e0] text-[#4c1425] dark:text-[#ffd9e0] font-semibold'
                        : 'bg-[#fcf1f2] dark:bg-[#201519] border-[#d7c1c4] dark:border-[#38262c] text-[#524346] dark:text-[#a08b8e]'
                    }`}
                  >
                    <span className="truncate pr-2">{p.name}</span>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                      selected ? 'bg-[#4c1425] dark:bg-[#ffd9e0] text-white dark:text-[#3b0619]' : 'border border-gray-400'
                    }`}>
                      {selected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Review / Comments */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#524346] dark:text-[#a08b8e] mb-1.5">
              Notas o Ritual de Aplicación
            </label>
            <textarea
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe cómo aplicaste los productos, iluminación o sensación en la piel..."
              className="w-full bg-[#fcf1f2] dark:bg-[#201519] border border-[#d7c1c4] dark:border-[#38262c] rounded-lg px-3.5 py-2 text-xs text-[#1f1a1b] dark:text-[#f9eeef] focus:outline-hidden focus:border-[#4c1425] dark:focus:border-[#ffd9e0]"
            />
          </div>

          {/* Submit Footer */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#f0e6e7] dark:border-[#2a1d22]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-xs font-semibold text-[#524346] dark:text-[#a08b8e] hover:bg-[#f6ebec] dark:hover:bg-[#22171b] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isUploading || uploadSuccess}
              className="px-6 py-2.5 rounded-lg bg-[#4c1425] hover:bg-[#672a3b] dark:bg-[#ffd9e0] dark:hover:bg-[#ffb1c2] text-[#fff8f8] dark:text-[#3b0619] text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white dark:border-[#3b0619] border-t-transparent rounded-full animate-spin" />
                  <span>Guardando en la Nube...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Publicar en la Nube</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
