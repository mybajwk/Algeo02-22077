// import { create } from "zustand"
// import { persist } from "zustand/middleware"

// export interface TokenProps {
//   token: string;
//   setToken: (newToken: string) => void;
// }

// export const useToken = create<TokenProps>()(
//   persist((set, get) => ({
//     token: "",
//     setToken: (newToken: string) => set({ token: newToken }), 
//   }),
//   {
//     name: 'token-visumatch',
//     getStorage: () => localStorage
//   })
// )
