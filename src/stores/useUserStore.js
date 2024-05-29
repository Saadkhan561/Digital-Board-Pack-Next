import { create } from "zustand";
import { persist } from "zustand/middleware";


const useUserStore = create(
  persist(
    (set, get) => ({
      currentUser: {},
      isLoading: true,
      setCurrentUser: (user) =>
        set((state) => {
          return { currentUser: user, isLoading: false };
        }),
      logout: () => set({ currentUser: null }),
    }),
    { name: process.env.NEXT_PUBLIC_CURRENTUSER_LOCAL_KEY }
  )
);

export default useUserStore;
