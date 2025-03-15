// "use client"

// import { useState, useEffect } from "react"
// import { ethers } from "ethers"

// // Define types for wallet connection
// export interface WalletState {
//   address: string
//   isConnected: boolean
//   isConnecting: boolean
//   chainId: string | null
//   provider: ethers.BrowserProvider | null
//   signer: ethers.JsonRpcSigner | null
// }

// export interface WalletActions {
//   connect: () => Promise<void>
//   disconnect: () => void
//   switchChain: (chainId: string) => Promise<void>
// }

// // Initial wallet state
// const initialWalletState: WalletState = {
//   address: "",
//   isConnected: false,
//   isConnecting: false,
//   chainId: null,
//   provider: null,
//   signer: null,
// }

// // Check if MetaMask is installed
// const isMetaMaskInstalled = (): boolean => {
//   return typeof window !== "undefined" && window.ethereum !== undefined
// }

// // Hook for wallet connection
// export const useWalletConnector = (): [WalletState, WalletActions] => {
//   const [walletState, setWalletState] = useState<WalletState>(initialWalletState)

//   // Handle account changes
//   const handleAccountsChanged = async (accounts: unknown) => {
//     if (!Array.isArray(accounts)) return // Ensure it's an array
//     const accountList = accounts as string[]

//     if (accountList.length === 0) {
//       setWalletState(initialWalletState)
//     } else if (accountList[0] !== walletState.address) {
//       try {
//         const provider = new ethers.BrowserProvider(window.ethereum!)
//         const signer = await provider.getSigner()
//         const address = await signer.getAddress()

//         setWalletState((prev) => ({
//           ...prev,
//           address,
//           signer,
//         }))
//       } catch (error) {
//         console.error("Error handling account change:", error)
//       }
//     }
//   }

//   // Handle chain changes
//   const handleChainChanged = (chainId: unknown) => {
//     if (typeof chainId !== "string") return
//     window.location.reload() // Reload the page on chain change
//   }

//   // Handle wallet disconnect
//   const handleDisconnect = () => {
//     setWalletState(initialWalletState)
//   }

//   // Initialize wallet connection on component mount
//   useEffect(() => {
//     const checkConnection = async () => {
//       if (!isMetaMaskInstalled()) return

//       try {
//         const provider = new ethers.BrowserProvider(window.ethereum as ethers.Eip1193Provider)
//         const accounts = await provider.listAccounts()

//         if (accounts.length > 0) {
//           const signer = await provider.getSigner()
//           const address = await signer.getAddress()
//           const network = await provider.getNetwork()
//           const chainId = network.chainId.toString()

//           setWalletState({
//             address,
//             isConnected: true,
//             isConnecting: false,
//             chainId,
//             provider,
//             signer,
//           })
//         }
//       } catch (error) {
//         console.error("Error checking wallet connection:", error)
//       }
//     }

//     checkConnection()

//     if (isMetaMaskInstalled()) {
//       window.ethereum?.on("accountsChanged", handleAccountsChanged)
//       window.ethereum?.on("chainChanged", handleChainChanged)
//       window.ethereum?.on("disconnect", handleDisconnect)
//     }

//     return () => {
//       if (isMetaMaskInstalled()) {
//         window.ethereum?.removeListener("accountsChanged", handleAccountsChanged)
//         window.ethereum?.removeListener("chainChanged", handleChainChanged)
//         window.ethereum?.removeListener("disconnect", handleDisconnect)
//       }
//     }
//   }, [])

//   // Connect wallet
//   const connect = async () => {
//     if (!isMetaMaskInstalled()) {
//       window.open("https://metamask.io/download/", "_blank")
//       return
//     }

//     setWalletState((prev) => ({ ...prev, isConnecting: true }))

//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum as ethers.Eip1193Provider)
//       await window.ethereum?.request({ method: "eth_requestAccounts" })

//       const signer = await provider.getSigner()
//       const address = await signer.getAddress()
//       const network = await provider.getNetwork()
//       const chainId = network.chainId.toString()

//       setWalletState({
//         address,
//         isConnected: true,
//         isConnecting: false,
//         chainId,
//         provider,
//         signer,
//       })
//     } catch (error) {
//       console.error("Error connecting wallet:", error)
//       setWalletState((prev) => ({ ...prev, isConnecting: false }))
//     }
//   }

//   // Disconnect wallet (MetaMask doesn't support programmatic disconnection)
//   const disconnect = () => {
//     setWalletState(initialWalletState)
//   }

//   // Switch blockchain network
//   const switchChain = async (chainId: string) => {
//     if (!isMetaMaskInstalled() || !walletState.isConnected) return

//     try {
//       await window.ethereum?.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId }],
//       })
//     } catch (error: any) {
//       if (error.code === 4902) {
//         console.error("Chain not added to MetaMask")
//       } else {
//         console.error("Error switching chain:", error)
//       }
//     }
//   }

//   const walletActions: WalletActions = {
//     connect,
//     disconnect,
//     switchChain,
//   }

//   return [walletState, walletActions]
// }
