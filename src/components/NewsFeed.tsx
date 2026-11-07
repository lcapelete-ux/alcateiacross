import React, { useState } from 'react';
import { useChampionship } from '../context/ChampionshipContext';
import { NewsItem } from '../types';
import { Newspaper, Calendar, User, ChevronRight, X, AlertCircle } from 'lucide-react';

export const NewsFeed: React.FC = () => {
  const { news } = useChampionship();
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [activeArticle, setActiveArticle] = useState<NewsItem | null>(null);

  const tags = ['ALL', 'Briefing', 'WOD', 'Cronograma', 'Avisos', 'Regulamento'];

  const filteredNews = news.filter((item) => {
    if (selectedTag === 'ALL') return true;
    return item.tag === selectedTag;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
            <Newspaper className="w-4 h-4 text-amber-400" />
            <span>Feed da Matilha · Comunicação Oficial</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mt-1">
            Notícias & Briefings
          </h2>
          <p className="mt-1 text-sm text-slate-400 max-w-xl">
            Fique por dentro de todos os comunicados técnicos, padrões de movimento dos WODs, pesagens e regras da competição.
          </p>
        </div>

        {/* Tag Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap shrink-0 ${
                selectedTag === tag
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {tag === 'ALL' ? 'Todos os Comunicados' : tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of News Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((item) => (
          <article
            key={item.id}
            onClick={() => setActiveArticle(item)}
            className="group p-6 rounded-xl bg-[#101620] border border-slate-800 hover:border-amber-400/50 transition-all flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-amber-500/5"
          >
            <div>
              {/* Unboxed Metadata with Typographic Separator (§1.A) */}
              <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-3">
                <span className="font-semibold uppercase tracking-wider">{item.tag}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-400">{item.date}</span>
                {item.important && (
                  <>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-red-400 font-bold uppercase">Importante</span>
                  </>
                )}
              </div>

              {/* Title */}
              <h3 className="font-heading text-xl font-bold text-white group-hover:text-amber-400 transition-colors uppercase leading-snug">
                {item.title}
              </h3>

              {/* Summary */}
              <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                {item.summary}
              </p>
            </div>

            {/* Card Footer */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 truncate">
                <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{item.author}</span>
              </span>

              <span className="text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                <span>Ler completo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#101620] border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg transition"
              aria-label="Fechar Notícia"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-2">
              <span>{activeArticle.tag}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400 font-normal">{activeArticle.date}</span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white uppercase leading-tight">
              {activeArticle.title}
            </h3>

            <div className="mt-3 text-xs text-slate-400 flex items-center gap-1">
              <span>Publicado por:</span>
              <strong className="text-slate-300">{activeArticle.author}</strong>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800 text-slate-300 text-sm leading-relaxed space-y-4">
              <p className="font-medium text-slate-200">{activeArticle.summary}</p>
              <p className="whitespace-pre-line">{activeArticle.content}</p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-white rounded-lg transition"
              >
                Fechar Comunicado
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
