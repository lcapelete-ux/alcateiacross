import React, { useState } from 'react';
import { useChampionship } from '../context/ChampionshipContext';
import { ShieldCheck, Lock, AlertCircle, X, KeyRound } from 'lucide-react';
import { WolfLogo } from './WolfLogo';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const { loginAdmin } = useChampionship();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (success) {
      setError(false);
      setPassword('');
      onLoginSuccess();
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#101620] border border-slate-700 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg transition"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <WolfLogo size="sm" showText={false} className="justify-center mb-2" />
          <h3 className="font-heading text-2xl font-bold uppercase text-white tracking-wider">
            Acesso Administrativo
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Área restrita aos organizadores da Alcatéia para baixa de pagamentos PIX e lançamento de ranking.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>Senha de Acesso</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Digite a senha..."
              autoFocus
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
            />
            {error && (
              <p className="text-xs text-red-400 flex items-center gap-1 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Senha incorreta. Tente "alcateia" ou "admin123".</span>
              </p>
            )}
          </div>

          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
            <span className="text-amber-400 font-semibold">Dica de Acesso Rápido:</span> Use a senha{' '}
            <code className="text-white bg-slate-800 px-1.5 py-0.5 rounded font-mono">alcateia</code> para gerenciar o torneio.
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-lg shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>Entrar no Painel</span>
          </button>
        </form>
      </div>
    </div>
  );
};
