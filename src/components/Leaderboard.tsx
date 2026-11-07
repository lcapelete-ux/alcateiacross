import React, { useState, useMemo } from 'react';
import { useChampionship } from '../context/ChampionshipContext';
import { Trophy, Medal, Search, Flame, Shield, CheckCircle2, Clock } from 'lucide-react';

export const Leaderboard: React.FC = () => {
  const { athletes, categories, workouts, scores } = useChampionship();

  // Active filter tab
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(categories[0]?.id || 'all');
  const [genderFilter, setGenderFilter] = useState<'ALL' | 'M' | 'F'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate athlete rankings
  const rankedAthletes = useMemo(() => {
    // 1. Filter by category and gender
    let filtered = athletes.filter((ath) => {
      if (selectedCategoryId !== 'all' && ath.categoryId !== selectedCategoryId) {
        return false;
      }
      if (genderFilter !== 'ALL' && ath.gender !== genderFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = ath.name.toLowerCase().includes(query);
        const matchesBox = ath.box.toLowerCase().includes(query);
        if (!matchesName && !matchesBox) return false;
      }
      return true;
    });

    // 2. Compute total points for each athlete across all workouts
    const athletesWithScores = filtered.map((ath) => {
      const athleteScores = scores.filter((s) => s.athleteId === ath.id);
      const totalPoints = athleteScores.reduce((acc, curr) => acc + (curr.points || 0), 0);

      // Score per workout map
      const scoreByWod: Record<string, string> = {};
      athleteScores.forEach((s) => {
        scoreByWod[s.workoutId] = s.scoreText;
      });

      return {
        athlete: ath,
        totalPoints,
        scoreByWod,
        scoresCount: athleteScores.length,
      };
    });

    // 3. Sort: Athletes with scores sorted by totalPoints descending.
    // Confirmed/paid athletes appear with priority, but all registered can be viewed.
    athletesWithScores.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      // If equal points, alphabetical
      return a.athlete.name.localeCompare(b.athlete.name);
    });

    return athletesWithScores;
  }, [athletes, categories, scores, selectedCategoryId, genderFilter, searchQuery]);

  // Current category details
  const activeCategory = categories.find((c) => c.id === selectedCategoryId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title & Kicker */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Leaderboard Oficial · Tempo Real</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mt-1">
            Classificação da Matilha
          </h2>
          <p className="mt-1 text-sm text-slate-400 max-w-xl">
            Acompanhe o ranking atualizado, pontuações parciais por WOD e os atletas que estão no topo do pódio da Alcatéia.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por atleta ou box..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Category Pills & Filters */}
      <div className="bg-[#101620] border border-slate-800 rounded-xl p-4 mb-6 space-y-3">
        {/* Gender Filter Buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase text-slate-400 mr-1">Filtro:</span>
          {(['ALL', 'M', 'F'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGenderFilter(g)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                genderFilter === g
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {g === 'ALL' ? 'Todos os Gêneros' : g === 'M' ? 'Masculino' : 'Feminino'}
            </button>
          ))}
        </div>

        {/* Category Horizontal Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategoryId('all')}
            className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg border transition whitespace-nowrap shrink-0 ${
              selectedCategoryId === 'all'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            Todas as Categorias ({athletes.length})
          </button>
          {categories
            .filter((c) => genderFilter === 'ALL' || c.gender === genderFilter || c.gender === 'Open')
            .map((cat) => {
              const catAthletesCount = athletes.filter((a) => a.categoryId === cat.id).length;
              const isSelected = selectedCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg border transition whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {cat.name} ({catAthletesCount})
                </button>
              );
            })}
        </div>
      </div>

      {/* Top 3 Podium Cards (if active category has at least 1 athlete with points) */}
      {selectedCategoryId !== 'all' && rankedAthletes.some((a) => a.totalPoints > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* 1st Place */}
          {rankedAthletes[0] && (
            <div className="p-5 rounded-xl bg-gradient-to-b from-amber-500/15 via-[#101620] to-[#101620] border border-amber-500/40 relative shadow-xl order-1 md:order-2">
              <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                <Trophy className="w-3.5 h-3.5 text-slate-950" />
                <span>1º Lugar (Líder)</span>
              </div>
              <div className="text-3xl font-heading font-bold text-amber-400">#01</div>
              <h4 className="font-heading text-xl font-bold text-white uppercase mt-1 truncate">
                {rankedAthletes[0].athlete.name}
              </h4>
              <div className="text-xs text-slate-400">{rankedAthletes[0].athlete.box}</div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 uppercase font-medium">Pontuação Total:</span>
                <span className="font-mono text-2xl font-bold text-amber-400 tabular-nums">
                  {rankedAthletes[0].totalPoints} pts
                </span>
              </div>
            </div>
          )}

          {/* 2nd Place */}
          {rankedAthletes[1] && (
            <div className="p-5 rounded-xl bg-[#101620] border border-slate-700 relative shadow-md order-2 md:order-1">
              <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-300 text-slate-950">
                <Medal className="w-3.5 h-3.5 text-slate-950" />
                <span>2º Lugar</span>
              </div>
              <div className="text-3xl font-heading font-bold text-slate-300">#02</div>
              <h4 className="font-heading text-lg font-bold text-white uppercase mt-1 truncate">
                {rankedAthletes[1].athlete.name}
              </h4>
              <div className="text-xs text-slate-400">{rankedAthletes[1].athlete.box}</div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 uppercase font-medium">Pontuação Total:</span>
                <span className="font-mono text-xl font-bold text-slate-200 tabular-nums">
                  {rankedAthletes[1].totalPoints} pts
                </span>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {rankedAthletes[2] && (
            <div className="p-5 rounded-xl bg-[#101620] border border-amber-700/40 relative shadow-md order-3">
              <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-700 text-amber-100">
                <Medal className="w-3.5 h-3.5 text-amber-100" />
                <span>3º Lugar</span>
              </div>
              <div className="text-3xl font-heading font-bold text-amber-600">#03</div>
              <h4 className="font-heading text-lg font-bold text-white uppercase mt-1 truncate">
                {rankedAthletes[2].athlete.name}
              </h4>
              <div className="text-xs text-slate-400">{rankedAthletes[2].athlete.box}</div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 uppercase font-medium">Pontuação Total:</span>
                <span className="font-mono text-xl font-bold text-amber-500 tabular-nums">
                  {rankedAthletes[2].totalPoints} pts
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Leaderboard Master Table */}
      <div className="bg-[#101620] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400 uppercase font-semibold text-[11px] tracking-wider">
                <th className="py-3.5 px-4 text-center w-14">Pos</th>
                <th className="py-3.5 px-4">Atleta / Box</th>
                <th className="py-3.5 px-3">Categoria</th>
                {workouts.map((w) => (
                  <th key={w.id} className="py-3.5 px-3 text-center">
                    WOD {w.number}
                  </th>
                ))}
                <th className="py-3.5 px-4 text-right">Pontos Totais</th>
                <th className="py-3.5 px-4 text-center w-28">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {rankedAthletes.length === 0 ? (
                <tr>
                  <td colSpan={5 + workouts.length} className="text-center py-12 text-slate-500">
                    Nenhum atleta encontrado com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                rankedAthletes.map((item, index) => {
                  const athleteCat = categories.find((c) => c.id === item.athlete.categoryId);
                  const isPodium = index < 3 && item.totalPoints > 0;

                  return (
                    <tr
                      key={item.athlete.id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        index === 0 && item.totalPoints > 0 ? 'bg-amber-500/[0.04]' : ''
                      }`}
                    >
                      {/* Position */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`font-mono font-bold text-sm tabular-nums ${
                            index === 0 && item.totalPoints > 0
                              ? 'text-amber-400'
                              : index === 1 && item.totalPoints > 0
                              ? 'text-slate-300'
                              : index === 2 && item.totalPoints > 0
                              ? 'text-amber-600'
                              : 'text-slate-400'
                          }`}
                        >
                          #{String(index + 1).padStart(2, '0')}
                        </span>
                      </td>

                      {/* Name & Box */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white flex items-center gap-2">
                          <span>{item.athlete.name}</span>
                          {index === 0 && item.totalPoints > 0 && (
                            <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">{item.athlete.box}</div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-3 whitespace-nowrap text-slate-300 text-xs">
                        {athleteCat?.name || item.athlete.categoryId}
                      </td>

                      {/* Workout Scores */}
                      {workouts.map((w) => {
                        const scoreText = item.scoreByWod[w.id];
                        return (
                          <td key={w.id} className="py-3.5 px-3 text-center whitespace-nowrap">
                            {scoreText ? (
                              <span className="font-mono text-xs font-semibold text-amber-300 tabular-nums px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                                {scoreText}
                              </span>
                            ) : (
                              <span className="text-slate-600 font-mono text-xs">-</span>
                            )}
                          </td>
                        );
                      })}

                      {/* Total Points */}
                      <td className="py-3.5 px-4 text-right">
                        <span className="font-mono font-bold text-base text-amber-400 tabular-nums">
                          {item.totalPoints}
                        </span>
                        <span className="text-[10px] text-slate-500 ml-1 font-mono">pts</span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        {item.athlete.paymentStatus === 'pago' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Confirmado</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400" title="Aguardando baixa manual do PIX pelo Admin">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Pendente PIX</span>
                          </span>
                        )}
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
  );
};
