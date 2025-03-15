import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
    interface Window {
      ethereum?: {
        isMetaMask?: boolean
        request: (request: { method: string; params?: any[] }) => Promise<any>
        on: (eventName: string, callback: (...args: any[]) => void) => void
        removeListener: (eventName: string, callback: (...args: any[]) => void) => void
      }
      eduChainWallet?: {
        connect: () => Promise<string>
        disconnect: () => Promise<void>
      }
    }
  }
  
  // This export is needed to make this a module
  export {}
  
  