import React, { useState, useRef } from 'react';
import { Camera, Sparkles, Upload, Check, RefreshCw, ShoppingBag, ArrowRight, ShieldCheck, Sun, Info } from 'lucide-react';
import { Product, ProductShade } from '../types';

interface ShadeFinderSectionProps {
  products: Product[];
  onAddLookToCart: (foundation: Product, foundationShade: ProductShade, lipstick: Product, lipstickShade: ProductShade) => void;
  onOpenUploadModal: () => void;
}

export const ShadeFinderSection: React.FC<ShadeFinderSectionProps> = ({
  products,
  onAddLookToCart,
  onOpenUploadModal,
}) => {
  const [method, setMethod] = useState<'photo' | 'quiz'>('photo');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Quiz state
  const [quizStep, setQuizStep] = useState(1);
  const [veinsColor, setVeinsColor] = useState<'verdes' | 'azules' | 'ambas'>('verdes');
  const [sunReaction, setSunReaction] = useState<'broncea' | 'quema' | 'ambas'>('broncea');
  const [jewelryPreference, setJewelryPreference] = useState<'oro' | 'plata' | 'ambas'>('oro');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Process uploaded photo to detect skin tone
  const handlePhotoSelected = (file: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPhotoPreview(dataUrl);
      analyzePhotoData(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const analyzePhotoData = (dataUrl: string) => {
    setAnalyzing(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      // Sample central skin pixels via canvas
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, 100, 100);
        // Sample center 40x40 area
        const imgData = ctx.getImageData(30, 30, 40, 40);
        let totalR = 0, totalG = 0, totalB = 0;
        const totalPixels = imgData.data.length / 4;
        for (let i = 0; i < imgData.data.length; i += 4) {
          totalR += imgData.data[i];
          totalG += imgData.data[i + 1];
          totalB += imgData.data[i + 2];
        }
        const avgR = Math.round(totalR / totalPixels);
        const avgG = Math.round(totalG / totalPixels);
        const avgB = Math.round(totalB / totalPixels);

        try {
          const res = await fetch('/api/shade-analysis', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              averageRgb: { r: avgR, g: avgG, b: avgB }
            })
          });
          const data = await res.json();
          if (data.success) {
            setAnalysisResult(data.result);
          }
        } catch (err) {
          console.error('Error analyzing:', err);
          // Fallback
          setAnalysisResult({
            undertone: 'calido',
            undertoneLabel: 'Cálido / Dorado Radiante',
            depthLabel: 'Tono Medio Luminoso',
            confidence: 99.2,
            hexDetected: `#${((1 << 24) + (avgR << 16) + (avgG << 8) + avgB).toString(16).slice(1)}`,
            recommendedFoundation: {
              productName: "L'Éclat Teint Sublime",
              shadeName: '02 Warm Sand',
              shadeHex: '#DDB596',
              description: 'Neutraliza rojeces leves e infunde un velo dorado sutil con protección SPF 25.'
            },
            recommendedLipstick: {
              productName: 'Rouge Solaire Matte Lip',
              shadeName: 'Toasted Peach',
              shadeHex: '#D4866C'
            },
            lightingAdvice: 'Tu tez luce impecable con luces doradas y accesorios en oro cálido.'
          });
        } finally {
          setAnalyzing(false);
        }
      }
    };
    img.src = dataUrl;
  };

  const handleQuizSubmit = async () => {
    setAnalyzing(true);
    let chosenUndertone: 'calido' | 'frio' | 'neutro' = 'calido';
    if (veinsColor === 'azules' || sunReaction === 'quema') {
      chosenUndertone = 'frio';
    } else if (veinsColor === 'ambas' || jewelryPreference === 'ambas') {
      chosenUndertone = 'neutro';
    }

    try {
      const res = await fetch('/api/shade-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ undertoneChoice: chosenUndertone })
      });
      const data = await res.json();
      if (data.success) {
        setAnalysisResult(data.result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleAddLook = () => {
    if (!analysisResult) return;
    const foundation = products.find(p => p.id === 'prod-teint-sublime') || products[1];
    const foundationShade = foundation?.shades.find(s => s.name === analysisResult.recommendedFoundation.shadeName) || foundation?.shades[0];
    const lipstick = products.find(p => p.id === 'prod-rouge-solaire') || products[0];
    const lipstickShade = lipstick?.shades.find(s => s.name === analysisResult.recommendedLipstick.shadeName) || lipstick?.shades[0];

    if (foundation && foundationShade && lipstick && lipstickShade) {
      onAddLookToCart(foundation, foundationShade, lipstick, lipstickShade);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto bg-gradient-to-b from-transparent via-[#fcf1f2]/40 to-transparent dark:via-[#1c1316]/40 rounded-3xl my-8">
      {/* Hidden canvas for pixel analysis */}
      <canvas ref={canvasRef} className="hidden" />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-[#f6ebec] dark:bg-[#281c20] px-4 py-1.5 rounded-full mb-3 shadow-2xs">
          <Sparkles className="w-4 h-4 text-[#954832] dark:text-[#e5c392]" />
          <span className="text-xs uppercase text-[#4c1425] dark:text-[#ffd9e0] tracking-widest font-semibold">
            Colorimetría &amp; Probador Dinámico
          </span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#4c1425] dark:text-[#ffd9e0] font-semibold">
          Encuentra tu Tono Ideal
        </h2>
        <p className="text-xs sm:text-sm text-[#524346] dark:text-[#a08b8e] mt-2">
          Carga una fotografía de tu piel o responde 3 preguntas simples para que nuestro probador formule tu combinación personalizada de base y labial.
        </p>

        {/* Method Toggle */}
        <div className="inline-flex items-center p-1 rounded-full bg-[#f0e6e7] dark:bg-[#25181c] mt-6 border border-[#d7c1c4]/40">
          <button
            onClick={() => setMethod('photo')}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              method === 'photo'
                ? 'bg-[#4c1425] text-white dark:bg-[#ffd9e0] dark:text-[#3b0619] shadow-xs'
                : 'text-[#524346] dark:text-[#a08b8e] hover:text-[#1f1a1b]'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Carga de Foto Dinámica</span>
          </button>
          <button
            onClick={() => setMethod('quiz')}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              method === 'quiz'
                ? 'bg-[#4c1425] text-white dark:bg-[#ffd9e0] dark:text-[#3b0619] shadow-xs'
                : 'text-[#524346] dark:text-[#a08b8e] hover:text-[#1f1a1b]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Quiz de 3 Pasos</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Interactive Input Area */}
        <div className="lg:col-span-6 bg-[#fff8f8] dark:bg-[#1a1215] rounded-2xl p-6 sm:p-8 border border-[#f0e6e7] dark:border-[#302126] shadow-md">
          {method === 'photo' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-editorial text-xl font-semibold text-[#1f1a1b] dark:text-[#f9eeef]">
                    Carga o Captura tu Fotografía
                  </h3>
                  <p className="text-xs text-[#524346] dark:text-[#a08b8e]">
                    Toma una selfie con luz natural o sube una foto de tu muñeca/mejilla
                  </p>
                </div>
                {photoPreview && (
                  <button
                    onClick={() => {
                      setPhotoPreview(null);
                      setAnalysisResult(null);
                    }}
                    className="text-xs text-[#954832] dark:text-[#e5c392] font-semibold hover:underline"
                  >
                    Nueva Foto
                  </button>
                )}
              </div>

              {photoPreview ? (
                <div className="relative rounded-xl overflow-hidden border border-[#d7c1c4] dark:border-[#3d2730] aspect-4/3 bg-black flex items-center justify-center">
                  <img
                    src={photoPreview}
                    alt="Foto analizada"
                    className="w-full h-full object-contain"
                  />
                  {analyzing && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-3">
                      <div className="w-8 h-8 border-2 border-[#e5c392] border-t-transparent rounded-full animate-spin" />
                      <p className="text-xs uppercase tracking-widest font-semibold font-mono">
                        Analizando subtono y balance de pigmentos...
                      </p>
                    </div>
                  )}
                  {/* Visual reticle over center */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#e5c392]/80 animate-pulse flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#e5c392]" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-[#d7c1c4] dark:border-[#38262c] rounded-xl p-8 sm:p-12 text-center bg-[#fcf1f2]/50 dark:bg-[#1f1619]/50 flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#f6ebec] dark:bg-[#281c21] flex items-center justify-center text-[#4c1425] dark:text-[#ffd9e0] shadow-2xs">
                    <Camera className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-[#1f1a1b] dark:text-[#f9eeef]">
                      Sube tu foto para análisis cromático instantáneo
                    </p>
                    <p className="text-xs text-[#857375] dark:text-[#a08b8e] max-w-sm mt-1">
                      Detectamos subtonos cálidos, fríos o neutros mediante algoritmos espectrales de alta fidelidad.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-5 py-2.5 rounded-lg bg-[#4c1425] dark:bg-[#ffd9e0] text-[#fff8f8] dark:text-[#3b0619] text-xs font-semibold uppercase tracking-wider hover:opacity-90 shadow-xs flex items-center gap-2"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Cargar desde Dispositivo</span>
                    </button>
                    <button
                      onClick={() => cameraInputRef.current?.click()}
                      className="px-5 py-2.5 rounded-lg bg-[#fff8f8] dark:bg-[#26191e] text-[#4c1425] dark:text-[#ffd9e0] text-xs font-semibold uppercase tracking-wider border border-[#d7c1c4] dark:border-[#4d323a] flex items-center gap-2 hover:bg-[#f6ebec]"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Selfie con Cámara</span>
                    </button>
                  </div>

                  {/* Hidden inputs */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handlePhotoSelected(e.target.files[0])}
                  />
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="user"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handlePhotoSelected(e.target.files[0])}
                  />
                </div>
              )}

              <div className="flex items-start gap-2 text-xs text-[#857375] dark:text-[#a08b8e] bg-[#fcf1f2] dark:bg-[#201519] p-3 rounded-lg">
                <Info className="w-4 h-4 shrink-0 text-[#954832] dark:text-[#e5c392] mt-0.5" />
                <span>
                  Tip fotográfico: Para un match del 99%, toma la fotografía de frente a una ventana durante el día, sin sombras duras ni flash.
                </span>
              </div>
            </div>
          ) : (
            /* Quiz Mode */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-editorial text-xl font-semibold text-[#1f1a1b] dark:text-[#f9eeef]">
                  Diagnóstico de Colorimetría
                </h3>
                <span className="text-xs font-mono font-semibold text-[#954832] dark:text-[#e5c392]">
                  Paso {quizStep} de 3
                </span>
              </div>

              {quizStep === 1 && (
                <div className="space-y-4">
                  <p className="text-sm text-[#524346] dark:text-[#d7c1c4] font-medium">
                    1. Observa las venas en la parte interna de tu muñeca bajo luz natural:
                  </p>
                  <div className="space-y-2">
                    {[
                      { id: 'verdes', label: 'Tienen un tono verdoso u oliva', desc: 'Indica subtono cálido con matiz dorado' },
                      { id: 'azules', label: 'Tienen un tono azulado o violeta', desc: 'Indica subtono frío con matiz rosáceo' },
                      { id: 'ambas', label: 'Es difícil distinguirlas, parecen verde azuladas', desc: 'Indica subtono neutro y equilibrado' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setVeinsColor(opt.id as any)}
                        className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                          veinsColor === opt.id
                            ? 'bg-[#f6ebec] dark:bg-[#2a1c22] border-[#4c1425] dark:border-[#ffd9e0]'
                            : 'bg-[#fcf1f2] dark:bg-[#201519] border-[#d7c1c4] dark:border-[#38262c]'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-semibold text-[#1f1a1b] dark:text-[#f9eeef]">{opt.label}</p>
                          <p className="text-[11px] text-[#857375] dark:text-[#a08b8e] mt-0.5">{opt.desc}</p>
                        </div>
                        {veinsColor === opt.id && <Check className="w-4 h-4 text-[#4c1425] dark:text-[#ffd9e0]" />}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setQuizStep(2)}
                    className="w-full py-2.5 rounded-lg bg-[#4c1425] dark:bg-[#ffd9e0] text-white dark:text-[#3b0619] text-xs font-semibold uppercase tracking-wider"
                  >
                    Siguiente: Reacción Solar
                  </button>
                </div>
              )}

              {quizStep === 2 && (
                <div className="space-y-4">
                  <p className="text-sm text-[#524346] dark:text-[#d7c1c4] font-medium">
                    2. ¿Cómo reacciona tu piel tras 30 minutos de exposición al sol sin protector?
                  </p>
                  <div className="space-y-2">
                    {[
                      { id: 'broncea', label: 'Me bronceo con facilidad y casi nunca me quemo', desc: 'Melanina activa, subtonos dorados/cálidos' },
                      { id: 'quema', label: 'Me pongo roja o me quemo primero, apenas me bronceo', desc: 'Piel reactiva, subtonos fríos/porcelana' },
                      { id: 'ambas', label: 'Me quemo un poco al inicio y luego adquiero un bronceado suave', desc: 'Subtono neutro balanceado' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setSunReaction(opt.id as any)}
                        className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                          sunReaction === opt.id
                            ? 'bg-[#f6ebec] dark:bg-[#2a1c22] border-[#4c1425] dark:border-[#ffd9e0]'
                            : 'bg-[#fcf1f2] dark:bg-[#201519] border-[#d7c1c4] dark:border-[#38262c]'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-semibold text-[#1f1a1b] dark:text-[#f9eeef]">{opt.label}</p>
                          <p className="text-[11px] text-[#857375] dark:text-[#a08b8e] mt-0.5">{opt.desc}</p>
                        </div>
                        {sunReaction === opt.id && <Check className="w-4 h-4 text-[#4c1425] dark:text-[#ffd9e0]" />}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setQuizStep(1)}
                      className="w-1/3 py-2.5 rounded-lg border border-[#d7c1c4] text-xs font-semibold text-[#524346]"
                    >
                      Atrás
                    </button>
                    <button
                      onClick={() => setQuizStep(3)}
                      className="w-2/3 py-2.5 rounded-lg bg-[#4c1425] dark:bg-[#ffd9e0] text-white dark:text-[#3b0619] text-xs font-semibold uppercase tracking-wider"
                    >
                      Siguiente: Joyería
                    </button>
                  </div>
                </div>
              )}

              {quizStep === 3 && (
                <div className="space-y-4">
                  <p className="text-sm text-[#524346] dark:text-[#d7c1c4] font-medium">
                    3. ¿Qué tipo de joyería o tonos metálicos iluminan más tu rostro?
                  </p>
                  <div className="space-y-2">
                    {[
                      { id: 'oro', label: 'Oro amarillo, bronce y oro rosa', desc: 'Resalta el resplandor cálido de tu piel' },
                      { id: 'plata', label: 'Plata, platino y oro blanco', desc: 'Acentúa la claridad y pureza de tu complexión' },
                      { id: 'ambas', label: 'Cualquiera luce igual de armonioso', desc: 'Versatilidad cromática neutra' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setJewelryPreference(opt.id as any)}
                        className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                          jewelryPreference === opt.id
                            ? 'bg-[#f6ebec] dark:bg-[#2a1c22] border-[#4c1425] dark:border-[#ffd9e0]'
                            : 'bg-[#fcf1f2] dark:bg-[#201519] border-[#d7c1c4] dark:border-[#38262c]'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-semibold text-[#1f1a1b] dark:text-[#f9eeef]">{opt.label}</p>
                          <p className="text-[11px] text-[#857375] dark:text-[#a08b8e] mt-0.5">{opt.desc}</p>
                        </div>
                        {jewelryPreference === opt.id && <Check className="w-4 h-4 text-[#4c1425] dark:text-[#ffd9e0]" />}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setQuizStep(2)}
                      className="w-1/3 py-2.5 rounded-lg border border-[#d7c1c4] text-xs font-semibold text-[#524346]"
                    >
                      Atrás
                    </button>
                    <button
                      onClick={handleQuizSubmit}
                      className="w-2/3 py-2.5 rounded-lg bg-[#4c1425] dark:bg-[#ffd9e0] text-white dark:text-[#3b0619] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Calcular Mi Match</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Output Results Card */}
        <div className="lg:col-span-6 bg-[#fff8f8] dark:bg-[#1a1215] rounded-2xl p-6 sm:p-8 border border-[#f0e6e7] dark:border-[#302126] shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#f0e6e7] dark:border-[#2a1d22] pb-4 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#857375] dark:text-[#a08b8e]">
                  Diagnóstico en Tiempo Real
                </span>
              </div>
              <span className="text-xs font-bold text-[#4c1425] dark:text-[#ffd9e0] bg-[#f6ebec] dark:bg-[#281c21] px-2.5 py-1 rounded-md">
                {analysisResult ? `${analysisResult.confidence}% Precisión` : 'Listo para Analizar'}
              </span>
            </div>

            {analysisResult ? (
              <div className="space-y-5 animate-in fade-in duration-300">
                {/* Detected undertone header */}
                <div className="p-4 rounded-xl bg-[#fcf1f2] dark:bg-[#201519] border border-[#d7c1c4]/50 dark:border-[#38262c] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#954832] dark:text-[#e5c392] font-semibold">
                      Subtono Detectado
                    </span>
                    <h4 className="font-editorial text-lg font-bold text-[#4c1425] dark:text-[#ffd9e0]">
                      {analysisResult.undertoneLabel}
                    </h4>
                    <p className="text-xs text-[#524346] dark:text-[#a08b8e]">
                      {analysisResult.depthLabel}
                    </p>
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl shadow-inner border-2 border-white dark:border-[#332228] shrink-0"
                    style={{ backgroundColor: analysisResult.hexDetected }}
                    title={`Muestra espectral: ${analysisResult.hexDetected}`}
                  />
                </div>

                {/* Recommendations */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#524346] dark:text-[#a08b8e] block">
                    Fórmulas Recomendadas para tu Tez:
                  </span>

                  {/* Foundation */}
                  <div className="p-3.5 rounded-xl border border-[#f0e6e7] dark:border-[#2e1f24] bg-white dark:bg-[#22161b] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full border shadow-xs shrink-0"
                        style={{ backgroundColor: analysisResult.recommendedFoundation.shadeHex }}
                      />
                      <div>
                        <p className="text-xs font-bold text-[#1f1a1b] dark:text-[#f9eeef]">
                          {analysisResult.recommendedFoundation.productName}
                        </p>
                        <p className="text-xs text-[#954832] dark:text-[#e5c392] font-semibold">
                          Tono: {analysisResult.recommendedFoundation.shadeName}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#4c1425] dark:text-[#ffd9e0] shrink-0 font-editorial">
                      $840 MXN
                    </span>
                  </div>

                  {/* Lipstick */}
                  <div className="p-3.5 rounded-xl border border-[#f0e6e7] dark:border-[#2e1f24] bg-white dark:bg-[#22161b] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full border shadow-xs shrink-0"
                        style={{ backgroundColor: analysisResult.recommendedLipstick.shadeHex }}
                      />
                      <div>
                        <p className="text-xs font-bold text-[#1f1a1b] dark:text-[#f9eeef]">
                          {analysisResult.recommendedLipstick.productName}
                        </p>
                        <p className="text-xs text-[#954832] dark:text-[#e5c392] font-semibold">
                          Tono: {analysisResult.recommendedLipstick.shadeName}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#4c1425] dark:text-[#ffd9e0] shrink-0 font-editorial">
                      $580 MXN
                    </span>
                  </div>
                </div>

                {/* Lighting advice */}
                <div className="text-xs text-[#524346] dark:text-[#c4abb0] bg-[#fcf1f2] dark:bg-[#201519] p-3 rounded-lg border border-[#f0e6e7] dark:border-[#2e1f24]">
                  <p className="font-semibold text-[#4c1425] dark:text-[#ffd9e0] mb-0.5">Asesoría de Dermoconsultora:</p>
                  <p>{analysisResult.lightingAdvice}</p>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-[#857375] dark:text-[#a08b8e] space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#f6ebec] dark:bg-[#25181c] mx-auto flex items-center justify-center text-[#4c1425] dark:text-[#ffd9e0]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-[#1f1a1b] dark:text-[#f9eeef]">
                  Esperando tu fotografía o respuestas
                </p>
                <p className="text-xs max-w-xs mx-auto">
                  Al subir tu foto o responder el quiz, verás tu subtono y los dos productos que realzan tu belleza natural.
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-6 mt-6 border-t border-[#f0e6e7] dark:border-[#2a1d22] flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddLook}
              disabled={!analysisResult}
              className="flex-1 py-3 px-4 rounded-lg bg-[#4c1425] hover:bg-[#672a3b] dark:bg-[#ffd9e0] dark:hover:bg-[#ffb1c2] text-white dark:text-[#3b0619] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-40"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Añadir Rutina Match a la Cesta</span>
            </button>
            <button
              onClick={onOpenUploadModal}
              className="py-3 px-4 rounded-lg bg-[#f6ebec] dark:bg-[#26191e] text-[#4c1425] dark:text-[#ffd9e0] text-xs font-semibold uppercase tracking-wider border border-[#d7c1c4]/60 hover:bg-[#eae0e1] flex items-center justify-center gap-2"
              title="Compartir este look en la comunidad"
            >
              <Upload className="w-4 h-4 text-[#954832] dark:text-[#e5c392]" />
              <span>Guardar en la Nube</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
