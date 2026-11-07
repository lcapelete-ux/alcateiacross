import React, { createContext, useContext, useState, useEffect } from 'react';
import { Athlete, Category, Workout, WorkoutScore, NewsItem } from '../types';
import {
  INITIAL_ATHLETES,
  INITIAL_CATEGORIES,
  INITIAL_WORKOUTS,
  INITIAL_SCORES,
  INITIAL_NEWS,
} from '../data/initialData';

interface ChampionshipContextType {
  athletes: Athlete[];
  categories: Category[];
  workouts: Workout[];
  scores: WorkoutScore[];
  news: NewsItem[];
  isAdmin: boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  registerAthlete: (
    data: Omit<Athlete, 'id' | 'paymentStatus' | 'registrationDate' | 'paymentDate'>,
    proofText?: string,
    proofUrl?: string
  ) => Athlete;
  confirmPayment: (athleteId: string) => void;
  revertPayment: (athleteId: string) => void;
  deleteAthlete: (athleteId: string) => void;
  addCategory: (cat: Omit<Category, 'id'>) => void;
  updateCategory: (cat: Category) => void;
  deleteCategory: (catId: string) => void;
  clearAllCategories: () => void;
  resetCategories: () => void;
  saveScore: (athleteId: string, workoutId: string, scoreText: string, scoreNumeric: number) => void;
  addNews: (news: Omit<NewsItem, 'id' | 'date'>) => void;
  deleteNews: (newsId: string) => void;
  resetAllData: () => void;
}

const ChampionshipContext = createContext<ChampionshipContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ATHLETES: 'alcateia_athletes_v1',
  CATEGORIES: 'alcateia_categories_v1',
  WORKOUTS: 'alcateia_workouts_v1',
  SCORES: 'alcateia_scores_v1',
  NEWS: 'alcateia_news_v1',
  ADMIN_AUTH: 'alcateia_admin_auth_v1',
};

export const ChampionshipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [athletes, setAthletes] = useState<Athlete[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ATHLETES);
      return saved ? JSON.parse(saved) : INITIAL_ATHLETES;
    } catch {
      return INITIAL_ATHLETES;
    }
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [workouts] = useState<Workout[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WORKOUTS);
      return saved ? JSON.parse(saved) : INITIAL_WORKOUTS;
    } catch {
      return INITIAL_WORKOUTS;
    }
  });

  const [scores, setScores] = useState<WorkoutScore[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SCORES);
      return saved ? JSON.parse(saved) : INITIAL_SCORES;
    } catch {
      return INITIAL_SCORES;
    }
  });

  const [news, setNews] = useState<NewsItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NEWS);
      return saved ? JSON.parse(saved) : INITIAL_NEWS;
    } catch {
      return INITIAL_NEWS;
    }
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ATHLETES, JSON.stringify(athletes));
  }, [athletes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, isAdmin ? 'true' : 'false');
  }, [isAdmin]);

  const loginAdmin = (pass: string) => {
    // Admin password (convenient default for championship managers)
    if (pass.trim() === 'alcateia' || pass.trim() === 'admin123' || pass.trim() === 'alcateia2025') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
  };

  const registerAthlete = (
    data: Omit<Athlete, 'id' | 'paymentStatus' | 'registrationDate' | 'paymentDate'>,
    proofText?: string,
    proofUrl?: string
  ): Athlete => {
    const newAthlete: Athlete = {
      ...data,
      id: `ath-${Date.now()}`,
      paymentStatus: 'pendente',
      paymentProofText: proofText || 'Comprovante PIX enviado na inscrição',
      paymentProofUrl: proofUrl,
      registrationDate: new Date().toISOString().split('T')[0],
    };

    setAthletes((prev) => [newAthlete, ...prev]);
    return newAthlete;
  };

  const confirmPayment = (athleteId: string) => {
    const now = new Date();
    const formatted = `${now.toISOString().split('T')[0]} ${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    setAthletes((prev) =>
      prev.map((ath) =>
        ath.id === athleteId
          ? {
              ...ath,
              paymentStatus: 'pago',
              paymentDate: formatted,
            }
          : ath
      )
    );
  };

  const revertPayment = (athleteId: string) => {
    setAthletes((prev) =>
      prev.map((ath) =>
        ath.id === athleteId
          ? {
              ...ath,
              paymentStatus: 'pendente',
              paymentDate: undefined,
            }
          : ath
      )
    );
  };

  const deleteAthlete = (athleteId: string) => {
    setAthletes((prev) => prev.filter((ath) => ath.id !== athleteId));
    setScores((prev) => prev.filter((s) => s.athleteId !== athleteId));
  };

  const addCategory = (cat: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...cat,
      id: `cat-${Date.now()}`,
    };
    setCategories((prev) => [...prev, newCat]);
  };

  const updateCategory = (cat: Category) => {
    setCategories((prev) => prev.map((c) => (c.id === cat.id ? cat : c)));
  };

  const deleteCategory = (catId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== catId));
  };

  const clearAllCategories = () => {
    setCategories([]);
  };

  const resetCategories = () => {
    setCategories(INITIAL_CATEGORIES);
  };

  const saveScore = (
    athleteId: string,
    workoutId: string,
    scoreText: string,
    scoreNumeric: number
  ) => {
    setScores((prev) => {
      const existingIdx = prev.findIndex(
        (s) => s.athleteId === athleteId && s.workoutId === workoutId
      );

      const targetWorkout = workouts.find((w) => w.id === workoutId);
      const isForTime = targetWorkout?.type === 'for_time';

      let updated = [...prev];
      if (existingIdx >= 0) {
        updated[existingIdx] = {
          ...updated[existingIdx],
          scoreText,
          scoreNumeric,
        };
      } else {
        updated.push({
          athleteId,
          workoutId,
          scoreText,
          scoreNumeric,
        });
      }

      // Recalculate ranks and points for this workout across all athletes in same workout
      const workoutScores = updated.filter((s) => s.workoutId === workoutId);
      // Sort: if for_time, lower numeric is better (seconds). Else higher numeric is better (reps / kg)
      workoutScores.sort((a, b) =>
        isForTime ? a.scoreNumeric - b.scoreNumeric : b.scoreNumeric - a.scoreNumeric
      );

      // assign points: 1st gets 100, 2nd 95, 3rd 90, 4th 85, 5th 80, etc.
      const rankedMap = new Map<string, { rank: number; points: number }>();
      workoutScores.forEach((s, idx) => {
        const rank = idx + 1;
        const points = Math.max(10, 100 - (rank - 1) * 5);
        rankedMap.set(s.athleteId, { rank, points });
      });

      return updated.map((s) => {
        if (s.workoutId === workoutId) {
          const rankInfo = rankedMap.get(s.athleteId);
          if (rankInfo) {
            return {
              ...s,
              rank: rankInfo.rank,
              points: rankInfo.points,
            };
          }
        }
        return s;
      });
    });
  };

  const addNews = (item: Omit<NewsItem, 'id' | 'date'>) => {
    const today = new Date();
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const dateFormatted = `${String(today.getDate()).padStart(2, '0')} ${months[today.getMonth()]} ${today.getFullYear()}`;

    const newItem: NewsItem = {
      ...item,
      id: `news-${Date.now()}`,
      date: dateFormatted,
    };
    setNews((prev) => [newItem, ...prev]);
  };

  const deleteNews = (newsId: string) => {
    setNews((prev) => prev.filter((n) => n.id !== newsId));
  };

  const resetAllData = () => {
    localStorage.clear();
    setAthletes(INITIAL_ATHLETES);
    setCategories(INITIAL_CATEGORIES);
    setScores(INITIAL_SCORES);
    setNews(INITIAL_NEWS);
    setIsAdmin(false);
  };

  return (
    <ChampionshipContext.Provider
      value={{
        athletes,
        categories,
        workouts,
        scores,
        news,
        isAdmin,
        loginAdmin,
        logoutAdmin,
        registerAthlete,
        confirmPayment,
        revertPayment,
        deleteAthlete,
        addCategory,
        updateCategory,
        deleteCategory,
        clearAllCategories,
        resetCategories,
        saveScore,
        addNews,
        deleteNews,
        resetAllData,
      }}
    >
      {children}
    </ChampionshipContext.Provider>
  );
};

export const useChampionship = () => {
  const context = useContext(ChampionshipContext);
  if (!context) {
    throw new Error('useChampionship must be used within a ChampionshipProvider');
  }
  return context;
};
