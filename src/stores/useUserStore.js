import { create } from "zustand";
import { persist } from "zustand/middleware";


const useUserStore = create(
  persist(
    (set, get) => ({
      currentUser: {},
      setCurrentUser: (user) =>
        set((state) => {
          return { currentUser: user };
        }),
      logout: () => set({ currentUser: null }),
    }),
    { name: process.env.NEXT_PUBLIC_CURRENTUSER_LOCAL_KEY }
  )
);

export default useUserStore;
