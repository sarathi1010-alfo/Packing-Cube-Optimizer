import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PackItemCategory = 'clothing' | 'electronics' | 'toiletries' | 'documents' | 'misc';

export interface PackItem {
  id: string;
  name: string;
  category: PackItemCategory;
  weight: number;
  isPacked: boolean;
  isEssential: boolean;
}

export interface TripPlan {
  id: string;
  title: string;
  scenario: string;
  items: PackItem[];
  progress: number;
  lastUpdated: string;
}

export interface UserProfile {
  tripsCompleted: number;
  currentStreak: number;
  averageEfficiencyScore: number;
}

interface PackFitState {
  profile: UserProfile;
  savedPlans: TripPlan[];
  activePlanId: string | null;

  // Actions
  addPlan: (plan: TripPlan) => void;
  updatePlan: (id: string, updates: Partial<TripPlan>) => void;
  deletePlan: (id: string) => void;
  setActivePlan: (id: string | null) => void;
  toggleItemPacked: (planId: string, itemId: string) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  completeTrip: (planId: string) => void;
}

export const usePackFitStore = create<PackFitState>()(
  persist(
    (set) => ({
      profile: {
        tripsCompleted: 0,
        currentStreak: 0,
        averageEfficiencyScore: 100,
      },
      savedPlans: [],
      activePlanId: null,

      addPlan: (plan) =>
        set((state) => ({ savedPlans: [...state.savedPlans, plan] })),

      updatePlan: (id, updates) =>
        set((state) => ({
          savedPlans: state.savedPlans.map((plan) =>
            plan.id === id ? { ...plan, ...updates, lastUpdated: new Date().toISOString() } : plan
          ),
        })),

      deletePlan: (id) =>
        set((state) => ({
          savedPlans: state.savedPlans.filter((plan) => plan.id !== id),
          activePlanId: state.activePlanId === id ? null : state.activePlanId,
        })),

      setActivePlan: (id) => set({ activePlanId: id }),

      toggleItemPacked: (planId, itemId) =>
        set((state) => {
          const plans = state.savedPlans.map((plan) => {
            if (plan.id === planId) {
              const items = plan.items.map((item) =>
                item.id === itemId ? { ...item, isPacked: !item.isPacked } : item
              );
              const packedCount = items.filter((i) => i.isPacked).length;
              const progress = items.length > 0 ? Math.round((packedCount / items.length) * 100) : 0;
              return { ...plan, items, progress, lastUpdated: new Date().toISOString() };
            }
            return plan;
          });
          return { savedPlans: plans };
        }),

      updateProfile: (updates) =>
        set((state) => ({ profile: { ...state.profile, ...updates } })),

      completeTrip: (planId) =>
        set((state) => {
          const plan = state.savedPlans.find(p => p.id === planId);
          if (!plan) return state;

          return {
            profile: {
              ...state.profile,
              tripsCompleted: state.profile.tripsCompleted + 1,
              currentStreak: state.profile.currentStreak + 1,
            }
          };
        }),
    }),
    {
      name: 'packfit-storage',
    }
  )
);
