import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useToken = create(
  persist((set, get) => ({
    token: '',
    setToken: (newToken: string) => set({ token: newToken }), 
  }),
  {
    name: 'token-visumatch',
    getStorage: () => sessionStorage
  })
)
