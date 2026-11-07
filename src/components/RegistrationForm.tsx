import React, { useState } from 'react';
import { useChampionship } from '../context/ChampionshipContext';
import { Category } from '../types';
import {
  CheckCircle2,
  Copy,
  Check,
  Upload,
  AlertCircle,
  QrCode,
  ShieldAlert,
  ArrowRight,
  User,
  CreditCard,
  Building2,
  Info,
} from 'lucide-react';

interface RegistrationFormProps {
  onSuccessRedirect: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccessRedirect }) => {
  const { categories, registerAthlete, athletes } = useChampionship();

  // Form states
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form inputs
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [box, setBox] = useState('CrossFit Alcatéia');
  const [gender, setGender] = useState<'M' | 'F'>('M');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [tshirtSize, setTshirtSize] = useState<'P' | 'M' | 'G' | 'GG' | 'XGG'>('M');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  // Payment proof states
  const [proofText, setProofText] = useState('');
  const [proofFilePreview, setProofFilePreview] = useState<string | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);
  const [registeredAthleteId, setRegisteredAthleteId] = useState<string | null>(null);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Active categories for the selected gender
  const availableCategories = categories.filter(
    (c) => c.active && (c.gender === gender || c.gender === 'Open')
  );

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId) || availableCategories[0];

  // PIX constants
  const PIX_KEY = 'pix@crossfitalcateia.com.br';
  const PIX_NAME = 'CROSSFIT ALCATEIA LTDA';
  const PIX_BANK = 'Banco Inter (077)';

  const handleCopyPix = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Nome completo é obrigatório';
    if (!cpf.trim()) newErrors.cpf = 'CPF é obrigatório';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'E-mail válido é obrigatório';
    if (!whatsapp.trim()) newErrors.whatsapp = 'WhatsApp para contato é obrigatório';
    if (!box.trim()) newErrors.box = 'Box ou academia de origem é obrigatória';
    if (!emergencyContact.trim()) newErrors.emergencyContact = 'Nome do contato de emergência é obrigatório';
    if (!emergencyPhone.trim()) newErrors.emergencyPhone = 'Telefone de emergência é obrigatório';

    const chosenCat = selectedCategoryId || availableCategories[0]?.id;
    if (!chosenCat) newErrors.category = 'Selecione uma categoria válida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      if (!selectedCategoryId && availableCategories[0]) {
        setSelectedCategoryId(availableCategories[0].id);
      }
      setCurrentStep(2);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handleFinalizeRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCategoryId = selectedCategoryId || availableCategories[0]?.id;
    if (!finalCategoryId) return;

    const newAth = registerAthlete(
      {
        name: name.trim(),
        cpf: cpf.trim(),
        email: email.trim(),
        whatsapp: whatsapp.trim(),
        box: box.trim(),
        gender,
        categoryId: finalCategoryId,
        tshirtSize,
        emergencyContact: emergencyContact.trim(),
        emergencyPhone: emergencyPhone.trim(),
      },
      proofText.trim() || 'Comprovante PIX anexado pelo atleta',
      proofFilePreview || undefined
    );

    setRegisteredAthleteId(newAth.id);
    setCurrentStep(3);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
          Inscrição Oficial do Atleta
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Preencha seus dados individuais, selecione sua categoria de disputa e conclua o pagamento via PIX para garantir sua vaga na arena.
        </p>

        {/* Progress Tracker */}
        <div className="mt-6 flex items-center justify-center gap-3 text-xs sm:text-sm font-medium">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
              currentStep === 1
                ? 'bg-amber-500/10 border-amber-500/50 text-amber-400 font-semibold'
                : 'border-slate-800 text-slate-400'
            }`}
          >
            <User className="w-4 h-4" />
            <span>1. Dados & Categoria</span>
          </div>
          <span className="text-slate-600">→</span>
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
              currentStep === 2
                ? 'bg-amber-500/10 border-amber-500/50 text-amber-400 font-semibold'
                : 'border-slate-800 text-slate-400'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>2. Pagamento PIX</span>
          </div>
          <span className="text-slate-600">→</span>
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
              currentStep === 3
                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 font-semibold'
                : 'border-slate-800 text-slate-400'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>3. Confirmação</span>
          </div>
        </div>
      </div>

      {/* STEP 1: ATHLETE DATA & CATEGORY */}
      {currentStep === 1 && (
        <form onSubmit={handleProceedToPayment} className="space-y-8 bg-[#101620] border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl">
          {/* Gender Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Gênero de Disputa (Individual)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setGender('M');
                  setSelectedCategoryId('');
                }}
                className={`py-3 px-4 text-sm font-bold uppercase tracking-wider rounded-lg border transition-all text-center ${
                  gender === 'M'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                Masculino Individual
              </button>
              <button
                type="button"
                onClick={() => {
                  setGender('F');
                  setSelectedCategoryId('');
                }}
                className={`py-3 px-4 text-sm font-bold uppercase tracking-wider rounded-lg border transition-all text-center ${
                  gender === 'F'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                Feminino Individual
              </button>
            </div>
          </div>

          {/* Category Selection Cards */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Selecione a Categoria de Disputa
              </label>
              <span className="text-[11px] text-slate-400">
                {availableCategories.length} categorias disponíveis para {gender === 'M' ? 'Homens' : 'Mulheres'}
              </span>
            </div>

            {errors.category && (
              <p className="text-xs text-red-400 flex items-center gap-1 mb-2">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.category}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableCategories.map((cat) => {
                const isSelected = (selectedCategoryId || availableCategories[0]?.id) === cat.id;
                const registeredInCat = athletes.filter((a) => a.categoryId === cat.id).length;
                const spotsLeft = Math.max(0, cat.maxSpots - registeredInCat);

                return (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`relative p-4 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-400 ring-1 ring-amber-400 shadow-lg shadow-amber-500/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-heading text-lg font-bold text-white uppercase">
                          {cat.name}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {cat.description}
                        </p>
                      </div>
                      <span className="font-mono font-bold text-amber-400 text-base shrink-0 tabular-nums">
                        R$ {cat.price.toFixed(2)}
                      </span>
                    </div>

                    {cat.standards && cat.standards.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-slate-800/80">
                        <span className="text-[10px] uppercase font-semibold text-slate-500">
                          Movimentos de Referência:
                        </span>
                        <div className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">
                          {cat.standards.join(' · ')}
                        </div>
                      </div>
                    )}

                    <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Vagas restantes:</span>
                      <span className="font-mono font-medium text-slate-300">
                        {spotsLeft} de {cat.maxSpots}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Personal Info Grid */}
          <div className="pt-4 border-t border-slate-800">
            <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-400" />
              <span>Dados Pessoais do Atleta</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nome */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Carlos Gabriel Silva"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm text-white placeholder-slate-500 outline-none transition"
                />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>

              {/* CPF */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  CPF (Documento) *
                </label>
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="000.000.000-00"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm text-white placeholder-slate-500 outline-none transition"
                />
                {errors.cpf && <p className="text-xs text-red-400 mt-1">{errors.cpf}</p>}
              </div>

              {/* E-mail */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  E-mail Oficial *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="atleta@email.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm text-white placeholder-slate-500 outline-none transition"
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  WhatsApp (DDD + Número) *
                </label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="(41) 99999-9999"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm text-white placeholder-slate-500 outline-none transition"
                />
                {errors.whatsapp && <p className="text-xs text-red-400 mt-1">{errors.whatsapp}</p>}
              </div>

              {/* Box Affiliation */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Box / Academia de Origem *</span>
                </label>
                <input
                  type="text"
                  value={box}
                  onChange={(e) => setBox(e.target.value)}
                  placeholder="Ex: CrossFit Alcatéia, CrossFit Viking..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm text-white placeholder-slate-500 outline-none transition"
                />
                {errors.box && <p className="text-xs text-red-400 mt-1">{errors.box}</p>}
              </div>

              {/* T-Shirt Size */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Tamanho da Camiseta Oficial (Kit Atleta)
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {(['P', 'M', 'G', 'GG', 'XGG'] as const).map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setTshirtSize(size)}
                      className={`py-2 text-xs font-bold rounded border transition-all ${
                        tshirtSize === size
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contato de Emergência */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Contato de Emergência (Nome / Parentesco) *
                </label>
                <input
                  type="text"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  placeholder="Ex: Maria Silva (Mãe / Esposa)"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm text-white placeholder-slate-500 outline-none transition"
                />
                {errors.emergencyContact && (
                  <p className="text-xs text-red-400 mt-1">{errors.emergencyContact}</p>
                )}
              </div>

              {/* Telefone de Emergência */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Telefone de Emergência *
                </label>
                <input
                  type="tel"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  placeholder="(41) 98888-8888"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm text-white placeholder-slate-500 outline-none transition"
                />
                {errors.emergencyPhone && (
                  <p className="text-xs text-red-400 mt-1">{errors.emergencyPhone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold uppercase tracking-wider text-sm rounded-lg shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Prosseguir para Pagamento PIX</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: PIX CHECKOUT & PROOF UPLOAD */}
      {currentStep === 2 && (
        <form onSubmit={handleFinalizeRegistration} className="space-y-6 bg-[#101620] border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl">
          {/* Order Summary */}
          <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Resumo da Inscrição</div>
              <div className="font-heading text-xl font-bold text-white uppercase mt-0.5">
                {name} · {selectedCategory?.name}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Box: {box} · Camiseta: {tshirtSize} · {gender === 'M' ? 'Masculino' : 'Feminino'}
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs text-slate-400 block">Total a Pagar</span>
              <span className="font-mono text-2xl font-bold text-amber-400 tabular-nums">
                R$ {(selectedCategory?.price || 150).toFixed(2)}
              </span>
            </div>
          </div>

          {/* PIX instructions and QR Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
            {/* Visual QR Code Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center flex flex-col items-center">
              <div className="relative p-3 bg-white rounded-lg shadow-inner inline-block">
                {/* SVG QR Code Illustration */}
                <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer markers */}
                  <rect x="5" y="5" width="26" height="26" fill="#0F172A" rx="3" />
                  <rect x="9" y="9" width="18" height="18" fill="white" rx="1" />
                  <rect x="13" y="13" width="10" height="10" fill="#0F172A" />

                  <rect x="69" y="5" width="26" height="26" fill="#0F172A" rx="3" />
                  <rect x="73" y="9" width="18" height="18" fill="white" rx="1" />
                  <rect x="77" y="13" width="10" height="10" fill="#0F172A" />

                  <rect x="5" y="69" width="26" height="26" fill="#0F172A" rx="3" />
                  <rect x="9" y="73" width="18" height="18" fill="white" rx="1" />
                  <rect x="13" y="77" width="10" height="10" fill="#0F172A" />

                  {/* Matrix dots simulating real PIX */}
                  <rect x="36" y="8" width="5" height="5" fill="#0F172A" />
                  <rect x="46" y="8" width="5" height="5" fill="#0F172A" />
                  <rect x="56" y="8" width="5" height="5" fill="#0F172A" />
                  <rect x="36" y="18" width="5" height="5" fill="#0F172A" />
                  <rect x="46" y="24" width="8" height="5" fill="#0F172A" />
                  <rect x="58" y="18" width="5" height="5" fill="#0F172A" />

                  <rect x="8" y="36" width="5" height="5" fill="#0F172A" />
                  <rect x="18" y="42" width="6" height="5" fill="#0F172A" />
                  <rect x="28" y="36" width="5" height="5" fill="#0F172A" />

                  <rect x="36" y="36" width="8" height="8" fill="#F59E0B" rx="1" />
                  <rect x="48" y="38" width="6" height="6" fill="#0F172A" />
                  <rect x="58" y="36" width="6" height="8" fill="#0F172A" />

                  <rect x="69" y="36" width="6" height="6" fill="#0F172A" />
                  <rect x="79" y="42" width="6" height="5" fill="#0F172A" />
                  <rect x="88" y="36" width="7" height="6" fill="#0F172A" />

                  <rect x="36" y="48" width="6" height="6" fill="#0F172A" />
                  <rect x="46" y="48" width="8" height="6" fill="#0F172A" />
                  <rect x="58" y="48" width="6" height="6" fill="#0F172A" />

                  <rect x="36" y="60" width="8" height="6" fill="#0F172A" />
                  <rect x="48" y="60" width="6" height="8" fill="#0F172A" />
                  <rect x="58" y="60" width="6" height="6" fill="#0F172A" />

                  <rect x="36" y="72" width="6" height="8" fill="#0F172A" />
                  <rect x="46" y="72" width="8" height="6" fill="#0F172A" />
                  <rect x="58" y="72" width="6" height="8" fill="#0F172A" />

                  <rect x="69" y="69" width="6" height="6" fill="#0F172A" />
                  <rect x="79" y="69" width="8" height="6" fill="#0F172A" />
                  <rect x="69" y="79" width="6" height="8" fill="#0F172A" />
                  <rect x="79" y="79" width="16" height="6" fill="#0F172A" />
                </svg>
              </div>

              <div className="mt-3 text-xs text-slate-300 font-medium">
                Abra seu banco e escaneie o código
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Favorecido: {PIX_NAME}
              </div>
            </div>

            {/* PIX Key Copia e Cola */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Chave PIX Oficial da Alcatéia (E-mail)
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs sm:text-sm text-amber-400 select-all overflow-hidden truncate">
                    {PIX_KEY}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPix}
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer"
                  >
                    {copiedPix ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-400 space-y-1 bg-slate-900/40 p-3 rounded-lg border border-slate-800/80">
                <div className="flex items-center gap-1 text-slate-300 font-medium">
                  <Info className="w-3.5 h-3.5 text-amber-400" />
                  <span>Instruções de Pagamento:</span>
                </div>
                <p>1. Transfira o valor exato de <strong>R$ {(selectedCategory?.price || 150).toFixed(2)}</strong>.</p>
                <p>2. Salve o comprovante no seu celular ou anote o código de autenticação.</p>
                <p>3. Anexe o comprovante abaixo para o Administrador da Alcatéia dar baixa na sua inscrição.</p>
              </div>
            </div>
          </div>

          {/* Upload and Receipt Input */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Upload className="w-4 h-4 text-amber-400" />
              <span>Comprovante de Pagamento PIX</span>
            </h3>

            {/* File Upload / Image */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Anexar Foto ou PDF do Comprovante (Opcional, mas agiliza a baixa)
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg text-xs font-medium text-slate-300 hover:text-white cursor-pointer transition">
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>Escolher Arquivo</span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                {proofFilePreview && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Arquivo anexado com sucesso
                  </span>
                )}
              </div>

              {proofFilePreview && (
                <div className="mt-3 p-2 bg-slate-900 border border-slate-800 rounded-lg max-w-xs">
                  <img
                    src={proofFilePreview}
                    alt="Preview do comprovante"
                    className="max-h-36 object-contain rounded mx-auto"
                  />
                </div>
              )}
            </div>

            {/* Receipt Identification Text */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Identificador / Protocolo / Informações Adicionais do PIX
              </label>
              <textarea
                rows={2}
                value={proofText}
                onChange={(e) => setProofText(e.target.value)}
                placeholder="Ex: PIX enviado via Banco Nubank às 14h30 por Carlos Gabriel. ID Transação: E0000000..."
                className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 focus:border-amber-400 text-xs text-white placeholder-slate-500 outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition"
            >
              ← Voltar aos Dados
            </button>

            <button
              type="submit"
              className="px-7 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold uppercase tracking-wider text-sm rounded-lg shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Concluir Inscrição e Enviar</span>
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: SUCCESS & PENDING CONFIRMATION */}
      {currentStep === 3 && (
        <div className="bg-[#101620] border border-amber-500/30 rounded-xl p-8 text-center space-y-6 shadow-2xl animate-fadeIn">
          <div className="w-16 h-16 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
              Protocolo #{registeredAthleteId}
            </span>
            <h3 className="font-heading text-3xl font-bold text-white uppercase mt-1">
              Inscrição Pré-Confirmada na Alcatéia!
            </h3>
            <p className="text-sm text-slate-300 mt-2 max-w-lg mx-auto">
              Seus dados foram gravados com sucesso. O seu pagamento PIX está com o status de{' '}
              <strong className="text-amber-400">"Pendente de Baixa"</strong>.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg text-left max-w-md mx-auto text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold">
              <ShieldAlert className="w-4 h-4" />
              <span>Próximos Passos:</span>
            </div>
            <p>
              • A coordenação da <strong>Alcatéia CrossFit</strong> fará a conferência do comprovante na conta bancária e dará a baixa manual.
            </p>
            <p>
              • Assim que a baixa for concedida, seu status mudará para <strong className="text-emerald-400">"Confirmado / Pago"</strong> no Leaderboard oficial.
            </p>
            <p>
              • Retirada de kit atleta na sexta-feira pré-torneio mediante documento com foto.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onSuccessRedirect}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-lg shadow-md transition"
            >
              Ver Tabela de Inscritos & Leaderboard
            </button>
            <button
              onClick={() => {
                // Reset form to register another athlete
                setName('');
                setCpf('');
                setEmail('');
                setWhatsapp('');
                setProofText('');
                setProofFilePreview(null);
                setCurrentStep(1);
              }}
              className="px-5 py-3 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold transition"
            >
              Inscrever Outro Atleta
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
