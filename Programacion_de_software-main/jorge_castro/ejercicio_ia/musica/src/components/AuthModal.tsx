import { CheckCircle, Lock, LogOut, ShieldCheck, UserCheck, X } from 'lucide-react';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { VibeLogo } from './VibeLogo';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    loginWithProvider,
    loginWithEmail,
    user,
    logout,
    authError,
    isLoading,
  } = useAuth();

  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [mode, setMode] = useState<'oauth' | 'email'>('oauth');

  if (!isAuthModalOpen) return null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    await loginWithEmail(emailInput, nameInput);
  };

  return (
    <div
      id="auth-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeAuthModal}
    >
      <div
        id="auth-modal-card"
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-md bg-[#181818] dark:bg-[#181818] light:bg-white border border-white/10 dark:border-white/10 light:border-neutral-300 rounded-xl shadow-2xl p-6 md:p-8 text-white dark:text-white light:text-neutral-900"
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          aria-label="Cerrar modal de autenticación"
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header / Brand */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <VibeLogo size="md" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-1">
            {user ? 'Cuenta Conectada' : 'Acceso Seguro a VIBE'}
          </h2>
          <p className="text-sm text-[#B3B3B3] dark:text-[#B3B3B3] light:text-neutral-600">
            {user
              ? 'Gestiona tu sesión y perfil de audio Hi-Fi'
              : 'Sincroniza tus playlists, favoritos y audio sin pérdidas en todos tus dispositivos'}
          </p>
        </div>

        {/* If already logged in, show profile card */}
        {user ? (
          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-[#242424] dark:bg-[#242424] light:bg-neutral-100 border border-white/10">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#1DB954]"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-base truncate">{user.name}</h3>
                  <UserCheck className="w-4 h-4 text-[#1DB954] shrink-0" />
                </div>
                <p className="text-xs text-[#B3B3B3] truncate">{user.email}</p>
                <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-semibold text-[#1DB954] bg-[#1DB954]/10 px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-3 h-3" />
                  {user.plan} • OAuth Activo ({user.provider.toUpperCase()})
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 text-xs text-[#B3B3B3] space-y-1.5">
              <div className="flex items-center gap-2 text-white font-medium">
                <ShieldCheck className="w-4 h-4 text-[#1DB954]" />
                <span>Seguridad Verificada</span>
              </div>
              <p>Tu token criptográfico se encuentra firmado y cifrado mediante tokens OAuth 2.0 PKCE con expiración automática.</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeAuthModal}
                className="flex-1 py-2.5 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-sm transition-all"
              >
                Continuar Escuchando
              </button>
              <button
                onClick={() => {
                  logout();
                  closeAuthModal();
                }}
                className="px-4 py-2.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold text-sm transition-all flex items-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {authError && (
              <div className="p-3 text-xs bg-red-500/20 border border-red-500/40 text-red-300 rounded-lg">
                {authError}
              </div>
            )}

            {mode === 'oauth' ? (
              <div className="space-y-3">
                {/* Google OAuth Button */}
                <button
                  id="oauth-btn-google"
                  disabled={isLoading}
                  onClick={() => loginWithProvider('google')}
                  className="w-full py-3 px-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all flex items-center justify-center gap-3 shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.37 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.63 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Continuar con Google</span>
                </button>

                {/* Spotify OAuth Button */}
                <button
                  id="oauth-btn-spotify"
                  disabled={isLoading}
                  onClick={() => loginWithProvider('spotify')}
                  className="w-full py-3 px-4 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold text-sm transition-all flex items-center justify-center gap-3 shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                >
                  <svg className="w-5 h-5 shrink-0 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  <span>Sincronizar con Spotify</span>
                </button>

                {/* Apple ID OAuth Button */}
                <button
                  id="oauth-btn-apple"
                  disabled={isLoading}
                  onClick={() => loginWithProvider('apple')}
                  className="w-full py-3 px-4 rounded-full bg-neutral-900 border border-white/20 hover:bg-neutral-800 text-white font-semibold text-sm transition-all flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                >
                  <svg className="w-5 h-5 shrink-0 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.59-.73.99-1.75.88-2.77-.88.04-1.95.59-2.58 1.33-.55.63-.98 1.65-.85 2.64.98.08 1.97-.47 2.55-1.2" />
                  </svg>
                  <span>Iniciar con Apple ID</span>
                </button>

                {/* GitHub OAuth Button */}
                <button
                  id="oauth-btn-github"
                  disabled={isLoading}
                  onClick={() => loginWithProvider('github')}
                  className="w-full py-3 px-4 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-sm transition-all flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                >
                  <svg className="w-5 h-5 shrink-0 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>Acceder con GitHub</span>
                </button>

                <div className="relative my-4 flex items-center justify-center">
                  <div className="border-t border-white/10 w-full"></div>
                  <span className="bg-[#181818] px-3 text-xs text-[#B3B3B3] uppercase tracking-wider font-semibold">
                    O con correo
                  </span>
                </div>

                <button
                  onClick={() => setMode('email')}
                  className="w-full py-2.5 rounded-full border border-white/20 text-white font-medium text-xs hover:border-white transition-colors"
                >
                  Continuar con correo electrónico
                </button>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#B3B3B3] mb-1">Tu Nombre</label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    placeholder="Ej. Alex Santander"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#242424] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#B3B3B3] mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    placeholder="usuario@ejemplo.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#242424] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setMode('oauth')}
                    className="flex-1 py-2.5 rounded-full bg-neutral-800 text-xs font-semibold hover:bg-neutral-700"
                  >
                    Volver a OAuth
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-2.5 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black text-xs font-bold transition-all disabled:opacity-50"
                  >
                    {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
                  </button>
                </div>
              </form>
            )}

            {/* Security Guarantee */}
            <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-[#B3B3B3]">
              <Lock className="w-3.5 h-3.5 text-[#1DB954]" />
              <span>Cifrado de extremo a extremo • OAuth 2.0 PKCE</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
