"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Sparkles,
  Zap,
  Key,
  Gem,
  ChevronRight,
  Ticket,
  Activity,
  Globe,
  Power,
  Code,
  User,
  Lightbulb,
  MessageSquare,
  Shield,
} from "lucide-react"

// Add this at the top of the file, after the imports
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

// TypeScript interfaces
interface AnimatedCardProps {
  children: React.ReactNode
  delay: number
  onClick: () => void
  isSelected: boolean
}

interface TestimonialProps {
  quote: string
  author: string
  role: string
  image: string
  delay?: number
}

interface UserType {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  cta: string
  path: string
}

interface Testimonial {
  quote: string
  author: string
  role: string
  image: string
}

interface SuccessStory {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

interface NavItem {
  name: string
  path: string
}

// Add this with the other interfaces
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

// Toast component
interface ToastProps {
  title: string
  description: string
}

const Toast: React.FC<ToastProps> = ({ title, description }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-md border border-purple-500/30 rounded-lg p-4 shadow-lg z-50 max-w-md">
      <h4 className="font-medium text-white mb-1">{title}</h4>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  )
}

// Toast hook
const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = (props: ToastProps) => {
    const id = Date.now()
    setToasts((prev) => [...prev, props])

    setTimeout(() => {
      setToasts((prev) => prev.filter((_, i) => i !== 0))
    }, 3000)
  }

  return { toast, toasts }
}

// Particle field component
const ParticleField: React.FC = () => {
  return (
    <div className="fixed inset-0 opacity-30">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: `rgba(${Math.random() * 255}, ${Math.random() * 100 + 155}, 255, 0.6)`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `-${Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  )
}

// Animated card component
const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, delay, onClick, isSelected }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  return (
    <div
      className={`relative group transition-all duration-500 transform cursor-pointer
        ${isSelected ? "scale-105 -translate-y-2" : ""} 
        ${isHovered ? "translate-y-[-8px]" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl blur-xl 
        group-hover:blur-2xl transition-all duration-300"
      />
      <div
        className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-purple-500/30 
        group-hover:border-purple-500/50 p-6 transition-all duration-300"
      >
        {children}
      </div>
    </div>
  )
}

// Testimonial component
const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, image, delay = 0 }) => {
  return (
    <div
      className="relative opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-xl blur-lg" />
      <div className="relative bg-black/30 backdrop-blur-md rounded-xl border border-purple-500/20 p-6">
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <MessageSquare className="w-8 h-8 text-purple-400 opacity-50" />
          </div>
          <p className="text-gray-300 italic mb-6">{quote}</p>
          <div className="mt-auto flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gradient-to-r from-purple-500 to-blue-500 p-0.5">
              <img src={image || "/placeholder.svg"} alt={author} className="w-full h-full rounded-full object-cover" />
            </div>
            <div>
              <h4 className="font-medium text-white">{author}</h4>
              <p className="text-sm text-gray-400">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const { toast, toasts } = useToast()
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [selectedUserType, setSelectedUserType] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [walletConnected, setWalletConnected] = useState<boolean>(false)
  const [isConnecting, setIsConnecting] = useState<boolean>(false)
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [ocid, setOcid] = useState<string>("")
  const [showWalletModal, setShowWalletModal] = useState<boolean>(false)

  useEffect(() => {
    setIsVisible(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Generate a random OCID (Blockchain Open Content ID)
    const generateRandomOcid = () => {
      const characters = "0123456789abcdef"
      let result = "0x"
      for (let i = 0; i < 40; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
      }
      setOcid(result)
    }

    generateRandomOcid()

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const userTypes: UserType[] = [
    {
      icon: <User className="w-8 h-8" />,
      title: "For Beginners",
      description: "New to blockchain? Start here with simple explanations and interactive guides.",
      color: "from-purple-600 to-blue-600",
      cta: "Start Learning",
      path: "/beginners",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "For Kids",
      description: "Fun games and activities that teach blockchain concepts in an engaging way.",
      color: "from-blue-600 to-purple-600",
      cta: "Play & Learn",
      path: "/kids",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "For Developers",
      description: "Dive deep into blockchain development with tutorials and code examples.",
      color: "from-purple-600 to-pink-600",
      cta: "Explore Docs",
      path: "/developers",
    },
  ]

  const testimonials: Testimonial[] = [
    {
      quote: "This platform made blockchain concepts so easy to understand. I finally get what all the hype is about!",
      author: "Sarah Johnson",
      role: "Marketing Professional",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote: "My 10-year-old is obsessed with the games. She's learning about blockchain without even realizing it!",
      author: "Michael Chen",
      role: "Parent",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "The developer resources helped me build my first dApp. The step-by-step tutorials are incredibly valuable.",
      author: "Alex Rodriguez",
      role: "Software Engineer",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const features: Feature[] = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Decentralized",
      description: "No single entity controls the network. It's maintained by a community of users.",
      color: "from-purple-600 to-blue-600",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure",
      description: "Advanced cryptography ensures that once data is recorded, it cannot be altered.",
      color: "from-blue-600 to-purple-600",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Transparent",
      description: "All transactions are visible to everyone on the network, creating trust.",
      color: "from-purple-600 to-pink-600",
    },
  ]

  const successStories: SuccessStory[] = [
    {
      icon: <Ticket className="w-8 h-8" />,
      title: "Event Ticketing",
      description: "Blockchain prevents ticket fraud and scalping by creating verifiable digital tickets.",
      color: "from-purple-600 to-blue-600",
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Supply Chain",
      description: "Companies track products from source to consumer, ensuring authenticity and quality.",
      color: "from-blue-600 to-purple-600",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Digital Identity",
      description: "Secure, self-sovereign identity solutions give people control over their personal data.",
      color: "from-purple-600 to-pink-600",
    },
  ]

  const navItems: NavItem[] = [
    { name: "Home", path: "#home" },
    { name: "Learn", path: "#learn" },
    { name: "Explore", path: "#explore" },
    { name: "About", path: "#about" },
  ]

  // Update the wallet connection function to focus on MetaMask and EduChain wallet
  const connectWallet = async (): Promise<void> => {
    setIsConnecting(true)

    try {
      // Check if EduChain wallet is available first (prioritize it)
      if (window.eduChainWallet) {
        try {
          const account = await window.eduChainWallet.connect()

          setWalletAddress(account)
          setWalletConnected(true)

          // Create an NFT for the user
          createEducationalNFT()

          toast({
            title: "EduChain Wallet Connected",
            description: `Successfully connected to ${account.slice(0, 6)}...${account.slice(-4)}`,
          })
        } catch (error) {
          console.error("EduChain wallet connection failed", error)
          toast({
            title: "Connection Failed",
            description: "EduChain wallet connection failed",
          })
        }
      }
      // If EduChain wallet is not available, try MetaMask
      else if (window.ethereum) {
        try {
          // Request account access
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
          const account = accounts[0]

          setWalletAddress(account)
          setWalletConnected(true)

          // Create an NFT for the user
          createEducationalNFT()

          toast({
            title: "Wallet Connected",
            description: `Successfully connected to ${account.slice(0, 6)}...${account.slice(-4)}`,
          })
        } catch (error) {
          console.error("User denied account access", error)
          toast({
            title: "Connection Failed",
            description: "You rejected the connection request",
          })
        }
      }
      // No wallet found
      else {
        toast({
          title: "Wallet Not Found",
          description: "Please install EduChain wallet or MetaMask extension",
        })

        // Open wallet selection modal
        setShowWalletModal(true)
      }
    } catch (error) {
      console.error("Wallet connection error:", error)
      toast({
        title: "Connection Error",
        description: "An error occurred while connecting to your wallet",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = async (): Promise<void> => {
    try {
      // If using EduChain wallet
      if (window.eduChainWallet) {
        await window.eduChainWallet.disconnect()
      }

      setWalletConnected(false)
      setWalletAddress("")

      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected successfully",
      })
    } catch (error) {
      console.error("Error disconnecting wallet:", error)
      toast({
        title: "Disconnection Error",
        description: "An error occurred while disconnecting your wallet",
      })
    }
  }

  const createEducationalNFT = (): void => {
    // This would interact with a smart contract in a real implementation
    // Here we're just simulating the NFT creation

    setTimeout(() => {
      toast({
        title: "Welcome NFT Minted!",
        description: "Your educational journey NFT has been minted to your wallet",
      })
    }, 3000)
  }

  const handleUserTypeSelect = (index: number): void => {
    setSelectedUserType(index)
    const selectedType = userTypes[index]

    // Navigate to the corresponding page
    setTimeout(() => {
      navigate(selectedType.path)
    }, 500)
  }

  // Update the WalletSelectionModal component to show MetaMask and EduChain wallet options
  const WalletSelectionModal = () => {
    if (!showWalletModal) return null

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-black/80 border border-purple-500/30 rounded-xl p-6 max-w-md w-full">
          <h3 className="text-xl font-bold mb-4 text-white">Connect Wallet</h3>
          <p className="text-gray-300 mb-6">Select a wallet to connect to EduChain</p>

          <div className="grid gap-4">
            <button
              onClick={() => {
                window.open("https://educhain.com/wallet", "_blank")
                setShowWalletModal(false)
              }}
              className="flex items-center justify-between p-4 bg-black/40 border border-purple-500/30 rounded-lg hover:border-purple-500/50 transition-all"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold">E</span>
                </div>
                <div>
                  <h4 className="font-medium text-white">EduChain Wallet</h4>
                  <p className="text-xs text-gray-400">Connect using EduChain wallet</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button
              onClick={() => {
                window.open("https://metamask.io/download/", "_blank")
                setShowWalletModal(false)
              }}
              className="flex items-center justify-between p-4 bg-black/40 border border-purple-500/30 rounded-lg hover:border-purple-500/50 transition-all"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                  <span className="text-white font-bold">M</span>
                </div>
                <div>
                  <h4 className="font-medium text-white">MetaMask</h4>
                  <p className="text-xs text-gray-400">Connect using MetaMask wallet</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <button
            onClick={() => setShowWalletModal(false)}
            className="mt-6 w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  // Add this with the other useEffect hooks
  useEffect(() => {
    // Listen for account changes
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: unknown) => {
        const addressArray = accounts as string[]
        if (addressArray.length === 0) {
          // User disconnected their wallet
          setWalletConnected(false)
          setWalletAddress("")
          toast({
            title: "Wallet Disconnected",
            description: "Your wallet connection was lost",
          })
        } else {
          // User switched accounts
          setWalletAddress(addressArray[0])
          toast({
            title: "Account Changed",
            description: `Switched to ${addressArray[0].slice(0, 6)}...${addressArray[0].slice(-4)}`,
          })
        }
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)

      // Clean up the event listener when component unmounts
      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        }
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <ParticleField />

      {/* Dynamic Cursor Effect */}
      <div
        className="fixed w-64 h-64 pointer-events-none z-50 transition-transform duration-100"
        style={{
          transform: `translate(${mousePosition.x - 128}px, ${mousePosition.y - 128}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Enhanced Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-1000 
        ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10 backdrop-blur-xl" />
          <div className="relative max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="relative w-12 h-12">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl 
                    group-hover:scale-110 group-hover:rotate-180 transition-all duration-700"
                  />
                  <div className="absolute inset-1 bg-black rounded-lg" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">E</span>
                  </div>
                </div>
                <span
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
                  from-purple-400 to-blue-400 group-hover:from-purple-300 group-hover:to-blue-300 
                  transition-all duration-300"
                >
                  EduChain
                </span>
              </div>

              <div className="flex items-center space-x-8">
                {navItems.map(({ name, path }) => (
                  <a key={name} href={path} className="relative group py-2 cursor-pointer">
                    <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors duration-300">
                      {name}
                    </span>
                    <span
                      className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 
                      group-hover:w-full group-hover:left-0 transition-all duration-300"
                    />
                  </a>
                ))}
                <button
                  onClick={walletConnected ? disconnectWallet : connectWallet}
                  disabled={isConnecting}
                  className="relative px-8 py-3 group overflow-hidden rounded-xl cursor-pointer"
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-70 
                    group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-xl 
                    group-hover:blur-2xl transition-all duration-300"
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    {isConnecting ? (
                      "Connecting..."
                    ) : walletConnected ? (
                      <>
                        <span>{`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}</span>
                        <Power className="w-4 h-4" />
                      </>
                    ) : (
                      "Connect Wallet"
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-6" id="home">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-1000 delay-300 
            ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <div className="overflow-hidden">
                <span className="inline-block animate-slide-up-fade">Understand</span>
              </div>
              <div className="overflow-hidden">
                <span className="inline-block animate-slide-up-fade delay-200">Blockchain</span>
              </div>
              <div className="overflow-hidden">
                <span
                  className="inline-block bg-gradient-to-r from-purple-400 to-blue-400 
                  bg-clip-text text-transparent animate-slide-up-fade delay-400"
                >
                  Made Simple
                </span>
              </div>
            </h1>

            <p className="text-xl text-gray-300 mb-10 opacity-0 animate-fade-in delay-700">
              Your gateway to the world of blockchain technology. Learn, explore, and master the concepts that are
              reshaping our digital future.
            </p>

            {ocid && (
              <div className="mb-8 bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-4">
                <p className="text-sm text-purple-300">EduChain Blockchain OCID:</p>
                <p className="text-xs text-gray-400 font-mono">{ocid}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              <a href="#learn">
                <button className="group relative px-8 py-4 rounded-xl overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600" />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-xl 
                    group-hover:blur-2xl transition-all duration-300"
                  />
                  <div className="relative z-10 flex items-center space-x-2">
                    <span>Get Started</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </a>

              <a href="#explore">
                <button className="group relative px-8 py-4 rounded-xl overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 border border-purple-500 rounded-xl" />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 
                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  />
                  <span className="relative z-10">Explore</span>
                </button>
              </a>

              <a href="#about">
                <button className="group relative px-8 py-4 rounded-xl overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-black/40 border border-purple-500/30 rounded-xl" />
                  <span className="relative z-10">Learn More</span>
                </button>
              </a>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-500 
            ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
          >
            <div className="relative w-full aspect-square group">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl 
                    opacity-20 blur-3xl group-hover:blur-2xl transition-all duration-500"
                  style={{
                    transform: `rotate(${i * 30}deg)`,
                    animationDelay: `${i * 200}ms`,
                  }}
                />
              ))}
              <img
                src="/placeholder.svg?height=500&width=500"
                alt="Blockchain visualization"
                className="relative z-10 w-full h-auto object-cover rounded-3xl transform 
                  group-hover:scale-105 group-hover:rotate-3 transition-all duration-700"
              />

              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-xl shadow-lg transform rotate-6 animate-bounce-slow">
                <Gem className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl shadow-lg transform -rotate-6 animate-bounce-slow animation-delay-1000">
                <Key className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* What is Blockchain Section */}
      <section className="py-20 px-6 relative" id="learn">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              What is Blockchain?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Blockchain is a revolutionary technology that creates a secure, unchangeable record of transactions across
              a network of computers. Think of it as a digital ledger that everyone can see but no one can alter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedCard key={index} delay={index * 200} isSelected={false} onClick={() => {}}>
                <div className="relative group-hover:scale-105 transition-transform duration-300">
                  <div
                    className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-r ${feature.color} 
                    flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500`}
                  >
                    {feature.icon}
                  </div>
                  <h3
                    className="text-xl font-semibold mb-4 bg-gradient-to-r from-white to-gray-300 
                    bg-clip-text text-transparent"
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.description}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 px-6 relative" id="explore">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Choose Your Path
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userTypes.map((userType, index) => (
              <AnimatedCard
                key={index}
                delay={index * 200}
                isSelected={selectedUserType === index}
                onClick={() => handleUserTypeSelect(index)}
              >
                <div className={`relative group-hover:scale-105 transition-transform duration-300`}>
                  <div
                    className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-r ${userType.color} 
                    flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500`}
                  >
                    {userType.icon}
                  </div>
                  <h3
                    className="text-xl font-semibold mb-4 bg-gradient-to-r from-white to-gray-300 
                    bg-clip-text text-transparent"
                  >
                    {userType.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors mb-6">
                    {userType.description}
                  </p>
                  <div className="mt-auto">
                    <button
                      onClick={() => navigate(userType.path)}
                      className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 
                      border border-purple-500/30 hover:border-purple-500/50 text-white transition-all duration-300 cursor-pointer"
                    >
                      {userType.cta}
                    </button>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories / Blockchain Use Cases */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Blockchain Success Stories
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how blockchain technology is transforming industries and creating new opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="relative group">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-xl blur-lg 
                  group-hover:blur-xl transition-all duration-300"
                />
                <div
                  className="relative bg-black/30 backdrop-blur-md rounded-xl border border-purple-500/20 
                  group-hover:border-purple-500/40 p-6 h-full transform group-hover:translate-y-[-8px] 
                  transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 mb-6 rounded-xl bg-gradient-to-r ${story.color} 
                    flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500`}
                  >
                    {story.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">{story.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{story.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            What Our Users Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                image={testimonial.image}
                delay={index * 300}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative overflow-hidden rounded-3xl p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-md" />
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-10" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Ready to Start Your Blockchain Journey?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of learners discovering the exciting world of blockchain technology. Whether you're a
                beginner, a kid, or a developer, we have resources for you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#learn">
                  <button className="group relative px-10 py-5 rounded-xl overflow-hidden cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600" />
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-xl 
                      group-hover:blur-2xl transition-all duration-300"
                    />
                    <div className="relative z-10 flex items-center space-x-2 text-lg font-medium">
                      <span>Get Started Now</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </a>

                <button
                  onClick={walletConnected ? disconnectWallet : connectWallet}
                  disabled={isConnecting}
                  className="group relative px-10 py-5 rounded-xl overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 border border-purple-500 rounded-xl" />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 
                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    {isConnecting
                      ? "Connecting..."
                      : walletConnected
                        ? "Wallet Connected"
                        : "Connect Wallet for Personalized Experience"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 relative" id="about">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10 backdrop-blur-sm" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl" />
                  <div className="absolute inset-1 bg-black rounded-lg" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold">E</span>
                  </div>
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                  EduChain
                </span>
              </div>
              <p className="text-gray-400 text-sm">Making blockchain education accessible for everyone.</p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/beginners" className="text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
                    For Beginners
                  </a>
                </li>
                <li>
                  <a href="/kids" className="text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
                    For Kids
                  </a>
                </li>
                <li>
                  <a href="/developers" className="text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
                    For Developers
                  </a>
                </li>
                <li>
                  <a href="/glossary" className="text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
                    Blockchain Glossary
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about-us" className="text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/team" className="text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
                    Our Team
                  </a>
                </li>
                <li>
                  <a href="/careers" className="text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy" className="text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/cookies" className="text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2025 EduChain. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.878 3.77c.636-.247 1.363-.416 2.427-.465C10.329 3.247 10.684 3.234 13.114 3.234h.63z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast Messages */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast, index) => (
          <Toast key={index} title={toast.title} description={toast.description} />
        ))}
      </div>
      {/* Add this just before the final closing div */}
      <WalletSelectionModal />
    </div>
  )
}

export default HomePage

