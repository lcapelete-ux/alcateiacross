import React, { useState } from 'react';
import { useChampionship } from '../context/ChampionshipContext';
import { Category, Workout } from '../types';
import {
  CheckCircle2,
  Clock,
  Search,
  Check,
  RotateCcw,
  Trash2,
  Plus,
  Trophy,
  Users,
  DollarSign,
  Tag,
  Newspaper,
  Eye,
  X,
  LogOut,
  Save,
  AlertCircle,
  FileText,
  Filter,
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    athletes,
    categories,
    workouts,
    scores,
    news,
    confirmPayment,
    revertPayment,
    deleteAthlete,
    addCategory,
    updateCategory,
    deleteCategory,
    saveScore,
    addNews,
    deleteNews,
    logoutAdmin,
    resetAllData,
  } = useChampionship();

  // Active admin sub-tab
  const [adminTab, setAdminTab] = useState<'payments' | 'categories' | 'ranking' | 'news'>('payments');

  // Filter for payments tab
  const [paymentFilter, setPaymentFilter] = useState<'ALL' | 'pendente' | 'pago'>('ALL');
  const [searchAthlete, setSearchAthlete] = useState('');
  const [selectedProofAthleteId, setSelectedProofAthleteId] = useState<string | null>(null);

  // New Category Form State ("o admin digita")
  const [showCatModal, setShowCatModal] = useState(false);
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [catName, setCatName] = useState('');
  const [catGender, setCatGender] = useState<'M' | 'F' | 'Open'>('M');
  const [catPrice, setCatPrice] = useState(170);
  const [catDesc, setCatDesc] = useState('');
  const [catStandards, setCatStandards] = useState('');
  const [catMaxSpots, setCatMaxSpots] = useState(20);

  // Score Entry State
  const [scoreWodId, setScoreWodId] = useState<string>(workouts[0]?.id || 'wod-1');
  const [scoreCatId, setScoreCatId] = useState<string>(categories[0]?.id || '');
  const [scoreInputs, setScoreInputs] = useState<Record<string, { text: string; num: string }>>({});
  const [scoreSaveFeedback, setScoreSaveFeedback] = useState<string | null>(null);

  // New Post Form State
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsTag, setNewsTag] = useState<'Briefing' | 'WOD' | 'Cronograma' | 'Avisos' | 'Regulamento'>('Avisos');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsAuthor, setNewsAuthor] = useState('Coordenação Alcatéia');
  const [newsImportant, setNewsImportant] = useState(false);

  // Metrics Calculation
  const totalAthletes = athletes.length;
  const paidAthletes = athletes.filter((a) => a.paymentStatus === 'pago');
  const pendingAthletes = athletes.filter((a) => a.paymentStatus === 'pendente');
  const totalRevenue = paidAthletes.reduce((acc, curr) => {
    const cat = categories.find((c) => c.id === curr.categoryId);
    return acc + (cat?.price || 150);
  }, 0);

  // Filtered Athletes
  const filteredAthletes = athletes.filter((ath) => {
    if (paymentFilter !== 'ALL' && ath.paymentStatus !== paymentFilter) return false;
    if (searchAthlete.trim()) {
      const q = searchAthlete.toLowerCase();
      return (
        ath.name.toLowerCase().includes(q) ||
        ath.cpf.toLowerCase().includes(q) ||
        ath.box.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Category modal open for create or edit
  const handleOpenCatModal = (cat?: Category) => {
    if (cat) {
      setEditingCatId(cat.id);
      setCatName(cat.name);
      setCatGender(cat.gender);
      setCatPrice(cat.price);
      setCatDesc(cat.description);
      setCatStandards(cat.standards?.join(', ') || '');
      setCatMaxSpots(cat.maxSpots);
    } else {
      setEditingCatId(null);
      setCatName('');
      setCatGender('M');
      setCatPrice(170);
      setCatDesc('');
      setCatStandards('');
      setCatMaxSpots(20);
    }
    setShowCatModal(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;

    const standardsArray = catStandards
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingCatId) {
      updateCategory({
        id: editingCatId,
        name: catName.trim(),
        gender: catGender,
        price: Number(catPrice),
        description: catDesc.trim(),
        standards: standardsArray,
        maxSpots: Number(catMaxSpots),
        active: true,
      });
    } else {
      addCategory({
        name: catName.trim(),
        gender: catGender,
        price: Number(catPrice),
        description: catDesc.trim(),
        standards: standardsArray,
        maxSpots: Number(catMaxSpots),
        active: true,
      });
    }
    setShowCatModal(false);
  };

  // Score Entry Save
  const handleSaveAthleteScore = (athleteId: string) => {
    const input = scoreInputs[athleteId];
    if (!input || !input.text.trim()) return;

    const numVal = parseFloat(input.num) || 0;
    saveScore(athleteId, scoreWodId, input.text.trim(), numVal);

    setScoreSaveFeedback(`Pontuação salva para o atleta!`);
    setTimeout(() => setScoreSaveFeedback(null), 3000);
  };

  // Create news
  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsContent.trim()) return;

    addNews({
      title: newsTitle.trim(),
      tag: newsTag,
      summary: newsSummary.trim() || newsContent.slice(0, 100) + '...',
      content: newsContent.trim(),
      author: newsAuthor.trim() || 'Staff Alcatéia',
      important: newsImportant,
    });

    setShowNewsModal(false);
    setNewsTitle('');
    setNewsSummary('');
    setNewsContent('');
  };

  // Target athlete for proof modal
  const proofAthlete = athletes.find((a) => a.id === selectedProofAthleteId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Bar */}
      <div className="bg-[#101620] border border-amber-500/30 rounded-2xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
            <span>Área do Administrador</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Coordenação Geral da Alcatéia</span>
          </div>
          <h2 className="font-heading text-3xl font-bold uppercase text-white mt-1">
            Painel de Controle do Campeonato
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Dê baixa em pagamentos PIX, gerencie categorias digitadas pelo admin, lance pontuações e publique comunicados.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Deseja resetar os dados para a configuração padrão inicial?')) {
                resetAllData();
              }
            }}
            className="px-3 py-2 text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition"
            title="Resetar dados para o estado inicial de demonstração"
          >
            Resetar Dados
          </button>
          <button
            onClick={logoutAdmin}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair do Painel</span>
          </button>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-[#101620] border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase font-medium">Inscritos Totais</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1 tabular-nums">
            {totalAthletes}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#101620] border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase font-medium">Baixas Confirmadas</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-bold text-emerald-400 mt-1 tabular-nums">
            {paidAthletes.length}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#101620] border border-amber-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-400 uppercase font-medium">Pendentes de Baixa</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-bold text-amber-400 mt-1 tabular-nums">
            {pendingAthletes.length}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#101620] border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase font-medium">Arrecadação Confirmada</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-bold text-amber-400 mt-1 tabular-nums font-mono">
            R$ {totalRevenue.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 mb-8 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setAdminTab('payments')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-lg transition whitespace-nowrap ${
            adminTab === 'payments'
              ? 'bg-amber-500 text-slate-950 font-bold border-t-2 border-amber-300'
              : 'text-slate-400 hover:text-white bg-slate-900/50'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Baixa de Pagamentos</span>
          {pendingAthletes.length > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold">
              {pendingAthletes.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminTab('categories')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-lg transition whitespace-nowrap ${
            adminTab === 'categories'
              ? 'bg-amber-500 text-slate-950 font-bold border-t-2 border-amber-300'
              : 'text-slate-400 hover:text-white bg-slate-900/50'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Gerenciar Categorias ("Admin Digita")</span>
        </button>

        <button
          onClick={() => setAdminTab('ranking')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-lg transition whitespace-nowrap ${
            adminTab === 'ranking'
              ? 'bg-amber-500 text-slate-950 font-bold border-t-2 border-amber-300'
              : 'text-slate-400 hover:text-white bg-slate-900/50'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Lançamento de Pontos & Ranking</span>
        </button>

        <button
          onClick={() => setAdminTab('news')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-lg transition whitespace-nowrap ${
            adminTab === 'news'
              ? 'bg-amber-500 text-slate-950 font-bold border-t-2 border-amber-300'
              : 'text-slate-400 hover:text-white bg-slate-900/50'
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>Publicar Notícias</span>
        </button>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 1: BAIXA DE PAGAMENTOS PIX */}
      {/* ───────────────────────────────────────────────────────────── */}
      {adminTab === 'payments' && (
        <div className="space-y-6">
          {/* Filters & Search */}
          <div className="bg-[#101620] border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold uppercase">Status:</span>
              {(['ALL', 'pendente', 'pago'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setPaymentFilter(st)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                    paymentFilter === st
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {st === 'ALL'
                    ? `Todos (${athletes.length})`
                    : st === 'pendente'
                    ? `Pendentes (${pendingAthletes.length})`
                    : `Confirmados (${paidAthletes.length})`}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchAthlete}
                onChange={(e) => setSearchAthlete(e.target.value)}
                placeholder="Buscar por nome, CPF ou box..."
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Athletes List */}
          <div className="bg-[#101620] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-semibold tracking-wider">
                    <th className="py-3 px-4">Atleta</th>
                    <th className="py-3 px-3">Categoria / Box</th>
                    <th className="py-3 px-3">Camiseta</th>
                    <th className="py-3 px-3">Contatos</th>
                    <th className="py-3 px-3">Comprovante</th>
                    <th className="py-3 px-4 text-center">Status Pagamento</th>
                    <th className="py-3 px-4 text-right">Ação do Admin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredAthletes.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-slate-500">
                        Nenhum atleta encontrado para este filtro.
                      </td>
                    </tr>
                  ) : (
                    filteredAthletes.map((ath) => {
                      const cat = categories.find((c) => c.id === ath.categoryId);
                      const isPending = ath.paymentStatus === 'pendente';

                      return (
                        <tr
                          key={ath.id}
                          className={`hover:bg-slate-800/30 transition-colors ${
                            isPending ? 'bg-amber-500/[0.03]' : ''
                          }`}
                        >
                          {/* Name & CPF */}
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-white">{ath.name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{ath.cpf}</div>
                          </td>

                          {/* Category & Box */}
                          <td className="py-3.5 px-3 whitespace-nowrap">
                            <div className="text-slate-200 font-medium">{cat?.name || ath.categoryId}</div>
                            <div className="text-[11px] text-slate-400">{ath.box}</div>
                          </td>

                          {/* Tshirt */}
                          <td className="py-3.5 px-3">
                            <span className="font-mono font-bold text-amber-400 text-xs px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                              {ath.tshirtSize}
                            </span>
                          </td>

                          {/* Contacts */}
                          <td className="py-3.5 px-3 text-xs">
                            <div className="text-slate-300 font-mono">{ath.whatsapp}</div>
                            <div className="text-[11px] text-slate-500">{ath.email}</div>
                          </td>

                          {/* Proof */}
                          <td className="py-3.5 px-3">
                            <button
                              type="button"
                              onClick={() => setSelectedProofAthleteId(ath.id)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded transition"
                            >
                              <FileText className="w-3.5 h-3.5 text-amber-400" />
                              <span>Ver Dados PIX</span>
                            </button>
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            {ath.paymentStatus === 'pago' ? (
                              <div>
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Pago / Confirmado</span>
                                </span>
                                {ath.paymentDate && (
                                  <div className="text-[10px] text-slate-500 font-mono">
                                    {ath.paymentDate}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400">
                                <Clock className="w-3.5 h-3.5" />
                                <span>Pendente Baixa</span>
                              </span>
                            )}
                          </td>

                          {/* Action (Dar Baixa / Reverter) */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              {isPending ? (
                                <button
                                  type="button"
                                  onClick={() => confirmPayment(ath.id)}
                                  className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                                  title="Confirmar recebimento do PIX e liberar vaga"
                                >
                                  <Check className="w-4 h-4" />
                                  <span>Dar Baixa</span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => revertPayment(ath.id)}
                                  className="px-2.5 py-1 text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded transition flex items-center gap-1"
                                  title="Reverter para pendente se houver estorno"
                                >
                                  <RotateCcw className="w-3 h-3" />
                                  <span>Reverter</span>
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm(`Excluir inscrição de ${ath.name}?`)) {
                                    deleteAthlete(ath.id);
                                  }
                                }}
                                className="p-1.5 text-slate-500 hover:text-red-400 rounded transition"
                                title="Excluir Atleta"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 2: GESTÃO DE CATEGORIAS ("o admin digita") */}
      {/* ───────────────────────────────────────────────────────────── */}
      {adminTab === 'categories' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-xl font-bold uppercase text-white">
                Categorias Oficiais da Competição
              </h3>
              <p className="text-xs text-slate-400">
                Cadastre novas categorias, altere taxas de inscrição, limite de vagas e requisitos mínimos.
              </p>
            </div>

            <button
              onClick={() => handleOpenCatModal()}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Digitar Nova Categoria</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const enrolled = athletes.filter((a) => a.categoryId === cat.id).length;
              return (
                <div
                  key={cat.id}
                  className="bg-[#101620] border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-lg relative"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400 font-mono">
                        {cat.gender === 'M' ? 'Masculino' : cat.gender === 'F' ? 'Feminino' : 'Misto/Open'}
                      </span>
                      <span className="font-mono text-base font-bold text-white tabular-nums">
                        R$ {cat.price.toFixed(2)}
                      </span>
                    </div>

                    <h4 className="font-heading text-xl font-bold uppercase text-white mt-2">
                      {cat.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {cat.description || 'Sem descrição cadastrada.'}
                    </p>

                    {cat.standards && cat.standards.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-slate-800">
                        <span className="text-[10px] uppercase font-semibold text-slate-500">
                          Padrões de Movimento:
                        </span>
                        <div className="text-xs text-slate-300 mt-0.5">
                          {cat.standards.join(' · ')}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>
                      Inscritos: <strong className="text-white">{enrolled}</strong> / {cat.maxSpots}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenCatModal(cat)}
                        className="text-xs text-amber-400 hover:underline font-semibold"
                      >
                        Editar
                      </button>
                      <span className="text-slate-600">·</span>
                      <button
                        onClick={() => {
                          if (window.confirm(`Excluir a categoria "${cat.name}"?`)) {
                            deleteCategory(cat.id);
                          }
                        }}
                        className="text-xs text-red-400 hover:underline"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 3: LANÇAMENTO DE PONTOS & RANKING */}
      {/* ───────────────────────────────────────────────────────────── */}
      {adminTab === 'ranking' && (
        <div className="space-y-6">
          {scoreSaveFeedback && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-500 text-emerald-300 rounded-lg text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{scoreSaveFeedback}</span>
            </div>
          )}

          {/* Select Category and Workout */}
          <div className="bg-[#101620] border border-slate-800 rounded-xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                1. Selecione a Prova (WOD)
              </label>
              <select
                value={scoreWodId}
                onChange={(e) => setScoreWodId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-amber-400"
              >
                {workouts.map((w) => (
                  <option key={w.id} value={w.id}>
                    WOD {w.number}: {w.title} ({w.scoreTypeDesc})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                2. Selecione a Categoria
              </label>
              <select
                value={scoreCatId}
                onChange={(e) => setScoreCatId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-amber-400"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active WOD Info */}
          {(() => {
            const currentWod = workouts.find((w) => w.id === scoreWodId);
            return currentWod ? (
              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <div className="font-heading text-lg font-bold text-amber-400 uppercase">
                  {currentWod.title}
                </div>
                <p className="mt-1">{currentWod.description}</p>
                <div className="mt-2 text-slate-400 flex items-center gap-4">
                  <span>Cap: <strong className="text-white">{currentWod.timeCap}</strong></span>
                  <span>Critério: <strong className="text-white">{currentWod.scoreTypeDesc}</strong></span>
                </div>
              </div>
            ) : null;
          })()}

          {/* Athletes in this category */}
          <div className="bg-[#101620] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h4 className="font-heading text-base font-bold text-white uppercase">
                Lançar Resultados dos Atletas Inscritos
              </h4>
              <span className="text-xs text-slate-400">
                O ranking e os pontos são recalculados automaticamente ao salvar.
              </span>
            </div>

            <div className="divide-y divide-slate-800">
              {athletes
                .filter((a) => (scoreCatId ? a.categoryId === scoreCatId : true))
                .map((ath) => {
                  const existingScore = scores.find(
                    (s) => s.athleteId === ath.id && s.workoutId === scoreWodId
                  );
                  const currentInput = scoreInputs[ath.id] || {
                    text: existingScore?.scoreText || '',
                    num: existingScore ? String(existingScore.scoreNumeric) : '',
                  };

                  return (
                    <div
                      key={ath.id}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/30 transition"
                    >
                      <div>
                        <div className="font-semibold text-white flex items-center gap-2">
                          <span>{ath.name}</span>
                          {ath.paymentStatus === 'pago' ? (
                            <span className="text-[10px] text-emerald-400 font-mono">
                              [Inscrição Confirmada]
                            </span>
                          ) : (
                            <span className="text-[10px] text-amber-400 font-mono">
                              [Pendente PIX]
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400">{ath.box}</div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <label className="text-[10px] uppercase text-slate-400 font-semibold mb-0.5">
                            Resultado Exibido (Ex: 06:14, 135 kg, 180 reps)
                          </label>
                          <input
                            type="text"
                            value={currentInput.text}
                            onChange={(e) =>
                              setScoreInputs((prev) => ({
                                ...prev,
                                [ath.id]: {
                                  ...currentInput,
                                  text: e.target.value,
                                },
                              }))
                            }
                            placeholder="Ex: 06:14 ou 110 kg"
                            className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono w-44 outline-none focus:border-amber-400"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="text-[10px] uppercase text-slate-400 font-semibold mb-0.5">
                            Valor Numérico para Cálculo
                          </label>
                          <input
                            type="number"
                            value={currentInput.num}
                            onChange={(e) =>
                              setScoreInputs((prev) => ({
                                ...prev,
                                [ath.id]: {
                                  ...currentInput,
                                  num: e.target.value,
                                },
                              }))
                            }
                            placeholder="Ex: 374 ou 110"
                            className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono w-32 outline-none focus:border-amber-400"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => handleSaveAthleteScore(ath.id)}
                          className="mt-4 px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition flex items-center gap-1 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Salvar</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 4: GERENCIAR NOTÍCIAS */}
      {/* ───────────────────────────────────────────────────────────── */}
      {adminTab === 'news' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-xl font-bold uppercase text-white">
                Comunicados Oficiais & Feed
              </h3>
              <p className="text-xs text-slate-400">
                Publique comunicados para os atletas e torcedores acompanharem o campeonato.
              </p>
            </div>

            <button
              onClick={() => setShowNewsModal(true)}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nova Notícia</span>
            </button>
          </div>

          <div className="bg-[#101620] border border-slate-800 rounded-xl overflow-hidden shadow-xl divide-y divide-slate-800">
            {news.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
                    <span className="uppercase">{item.tag}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-slate-400">{item.date}</span>
                    {item.important && (
                      <span className="text-red-400 uppercase font-bold">Importante</span>
                    )}
                  </div>
                  <h4 className="font-heading text-lg font-bold text-white uppercase">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{item.summary}</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Excluir o comunicado "${item.title}"?`)) {
                      deleteNews(item.id);
                    }
                  }}
                  className="p-2 text-slate-500 hover:text-red-400 rounded transition"
                  title="Excluir Notícia"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* MODAL: PROOF OF PAYMENT DETAIL */}
      {/* ───────────────────────────────────────────────────────────── */}
      {selectedProofAthleteId && proofAthlete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#101620] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedProofAthleteId(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading text-xl font-bold uppercase text-white mb-2">
              Comprovante PIX · {proofAthlete.name}
            </h3>
            <div className="text-xs text-slate-400 mb-4">
              CPF: <span className="font-mono text-slate-300">{proofAthlete.cpf}</span> · Box: {proofAthlete.box}
            </div>

            <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-3">
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400">
                  Dados Informados pelo Atleta:
                </span>
                <p className="text-xs text-slate-200 mt-1 font-mono bg-slate-950 p-2.5 rounded border border-slate-800/80">
                  {proofAthlete.paymentProofText || 'Nenhum detalhe textual inserido.'}
                </p>
              </div>

              {proofAthlete.paymentProofUrl && (
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400">
                    Imagem do Comprovante:
                  </span>
                  <div className="mt-1 max-h-48 overflow-hidden rounded border border-slate-800">
                    <img
                      src={proofAthlete.paymentProofUrl}
                      alt="Comprovante"
                      className="w-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedProofAthleteId(null)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white transition"
              >
                Fechar
              </button>

              {proofAthlete.paymentStatus === 'pendente' && (
                <button
                  type="button"
                  onClick={() => {
                    confirmPayment(proofAthlete.id);
                    setSelectedProofAthleteId(null);
                  }}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Aprovar & Dar Baixa</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* MODAL: CATEGORY CREATION / EDITING ("o admin digita") */}
      {/* ───────────────────────────────────────────────────────────── */}
      {showCatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#101620] border border-slate-700 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowCatModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading text-2xl font-bold uppercase text-white mb-1">
              {editingCatId ? 'Editar Categoria' : 'Digitar Nova Categoria'}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Defina o nome da categoria, gênero, taxa de inscrição e padrões de movimento.
            </p>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Nome da Categoria *
                </label>
                <input
                  type="text"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="Ex: Scale Masculino, RX Feminino, Master 40+..."
                  required
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Gênero
                  </label>
                  <select
                    value={catGender}
                    onChange={(e) => setCatGender(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-amber-400"
                  >
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                    <option value="Open">Misto / Open</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Valor Inscrição (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={catPrice}
                    onChange={(e) => setCatPrice(parseFloat(e.target.value))}
                    required
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Limite de Vagas
                  </label>
                  <input
                    type="number"
                    value={catMaxSpots}
                    onChange={(e) => setCatMaxSpots(parseInt(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Padrões (separados por vírgula)
                  </label>
                  <input
                    type="text"
                    value={catStandards}
                    onChange={(e) => setCatStandards(e.target.value)}
                    placeholder="Pull-up, Deadlift 80kg..."
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Descrição Curta
                </label>
                <textarea
                  rows={2}
                  value={catDesc}
                  onChange={(e) => setCatDesc(e.target.value)}
                  placeholder="Explique o nível atlético esperado para esta categoria..."
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCatModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow transition"
                >
                  Salvar Categoria
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* MODAL: NEW ANNOUNCEMENT POST */}
      {/* ───────────────────────────────────────────────────────────── */}
      {showNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#101620] border border-slate-700 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowNewsModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading text-2xl font-bold uppercase text-white mb-1">
              Publicar Novo Comunicado
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              A publicação ficará disponível imediatamente para todos os atletas no Feed Oficial.
            </p>

            <form onSubmit={handleSaveNews} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Título da Notícia *
                </label>
                <input
                  type="text"
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  placeholder="Ex: Liberação da Bateria Oficial de Sábado"
                  required
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Tag / Categoria
                  </label>
                  <select
                    value={newsTag}
                    onChange={(e) => setNewsTag(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-amber-400"
                  >
                    <option value="Briefing">Briefing</option>
                    <option value="WOD">WOD</option>
                    <option value="Cronograma">Cronograma</option>
                    <option value="Avisos">Avisos</option>
                    <option value="Regulamento">Regulamento</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Autor da Publicação
                  </label>
                  <input
                    type="text"
                    value={newsAuthor}
                    onChange={(e) => setNewsAuthor(e.target.value)}
                    placeholder="Ex: Head Coach Marcus"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Resumo Curto
                </label>
                <input
                  type="text"
                  value={newsSummary}
                  onChange={(e) => setNewsSummary(e.target.value)}
                  placeholder="Uma frase destacando o anúncio..."
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Conteúdo Completo *
                </label>
                <textarea
                  rows={4}
                  value={newsContent}
                  onChange={(e) => setNewsContent(e.target.value)}
                  placeholder="Escreva as diretrizes, links ou instruções completas..."
                  required
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="importantPost"
                  checked={newsImportant}
                  onChange={(e) => setNewsImportant(e.target.checked)}
                  className="rounded border-slate-700 text-amber-500 focus:ring-amber-400"
                />
                <label htmlFor="importantPost" className="text-xs text-slate-300 font-medium">
                  Marcar como Comunicado Urgente / Importante
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewsModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow transition"
                >
                  Publicar no Feed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
