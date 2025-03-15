"use client"

import React, { useState, useEffect } from "react"
import { ArrowRight, Star, Trophy, Gift, Lock, CheckCircle, Sparkles, Users } from "lucide-react"

// Custom Toast Implementation
interface ToastProps {
  title: string
  description: string
}

// Toast Context
interface ToastContextType {
  toast: (props: ToastProps) => void
}

const ToastContext = React.createContext<ToastContextType>({
  toast: () => {},
})

export const useToast = () => React.useContext(ToastContext)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<(ToastProps & { id: number })[]>([])

  const addToast = (props: ToastProps) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { ...props, id }])

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-lg p-4 shadow-lg max-w-md"
          >
            <h4 className="font-bold text-white">{toast.title}</h4>
            <p className="text-sm text-purple-200">{toast.description}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// Particle Field from Event Platform
const ParticleField = () => {
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
            background: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 50 + 50}, ${Math.random() * 255}, 0.6)`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `-${Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  )
}

// Animated Card from Event Platform
const AnimatedCard: React.FC<{
  children: React.ReactNode
  delay?: number
  onClick?: () => void
  isSelected?: boolean
}> = ({ children, delay = 0, onClick, isSelected = false }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative group transition-all duration-500 transform 
        ${isSelected ? "scale-105 -translate-y-2" : ""} 
        ${isHovered ? "translate-y-[-8px]" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-400/20 rounded-xl blur-xl 
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

// Game Card Interface
interface GameCardProps {
  title: string
  description: string
  icon: React.ReactNode
  color: string
  completed?: boolean
  locked?: boolean
  onClick: () => void
}

// Game Card Component
const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  icon,
  color,
  completed = false,
  locked = false,
  onClick,
}) => {
  return (
    <AnimatedCard isSelected={completed} onClick={locked ? undefined : onClick}>
      <div className={`relative ${locked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}>
        <div
          className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-r from-purple-600 to-purple-400
          flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500
          ${completed ? "from-purple-500 to-purple-300" : locked ? "from-gray-700 to-gray-600" : ""}`}
        >
          {locked ? <Lock className="w-8 h-8 text-white" /> : icon}
        </div>
        <h3
          className="text-xl font-semibold mb-4 bg-gradient-to-r from-white to-gray-300 
          bg-clip-text text-transparent"
        >
          {title}
          {completed && (
            <span className="ml-2 inline-flex items-center">
              <Star className="w-4 h-4 text-purple-400" />
            </span>
          )}
        </h3>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors mb-4">{description}</p>
        <button
          className={`w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 font-medium
            ${
              completed
                ? "bg-gradient-to-r from-purple-600 to-purple-400 text-white"
                : locked
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-purple-400 text-white hover:opacity-90"
            } transition-all duration-300`}
          disabled={locked}
        >
          <span>{completed ? "Play Again" : locked ? "Locked" : "Play Now"}</span>
          {!locked && <ArrowRight className="w-4 h-4 ml-2" />}
        </button>
      </div>
    </AnimatedCard>
  )
}

// Character Selection Component
interface CharacterProps {
  name: string
  image: string
  selected: boolean
  locked?: boolean
  onClick: () => void
}

const Character: React.FC<CharacterProps> = ({ name, image, selected, locked = false, onClick }) => {
  return (
    <AnimatedCard isSelected={selected} onClick={locked ? undefined : onClick}>
      <div className={`relative ${locked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}>
        <div className="mb-4 rounded-lg overflow-hidden aspect-square">
          <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
          {locked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Lock className="w-8 h-8 text-white" />
            </div>
          )}
        </div>
        <h4 className="text-center font-medium text-white">{name}</h4>
        {selected && (
          <div className="absolute top-2 right-2 bg-purple-500 rounded-full p-1">
            <CheckCircle className="w-4 h-4 text-black" />
          </div>
        )}
      </div>
    </AnimatedCard>
  )
}

// Simple Game Component
interface SimpleGameProps {
  onComplete: () => void
  onBack: () => void
}

const BlockchainGame: React.FC<SimpleGameProps> = ({ onComplete, onBack }) => {
  const [blocks, setBlocks] = useState<number[]>([])
  const [selectedBlocks, setSelectedBlocks] = useState<number[]>([])
  const [validated, setValidated] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Initialize the game with 5 blocks
    setBlocks([1, 2, 3, 4, 5])
  }, [])

  const handleBlockClick = (blockId: number) => {
    if (validated || gameCompleted) return

    // Toggle block selection
    if (selectedBlocks.includes(blockId)) {
      setSelectedBlocks(selectedBlocks.filter((id) => id !== blockId))
    } else {
      setSelectedBlocks([...selectedBlocks, blockId].sort((a, b) => a - b))
    }
  }

  const validateChain = () => {
    setValidated(true)

    // Simple game logic: if they selected all blocks in order, they win
    if (selectedBlocks.length === blocks.length && selectedBlocks.every((block, index) => block === blocks[index])) {
      setTimeout(() => {
        setGameCompleted(true)
        toast({
          title: "Chain Validated!",
          description: "You successfully created a valid blockchain! You earned a badge!",
        })
        setTimeout(() => {
          onComplete()
        }, 2000)
      }, 1500)
    } else {
      toast({
        title: "Try Again",
        description: "That's not quite right. Remember, blocks must connect in order!",
      })
      setTimeout(() => {
        setSelectedBlocks([])
        setValidated(false)
      }, 1500)
    }
  }

  return (
    <div className="relative bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6">
      <button onClick={onBack} className="inline-flex items-center text-purple-400 mb-6 group">
        <ArrowRight className="w-4 h-4 mr-2 transform rotate-180 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Games</span>
      </button>

      <h2
        className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-white to-gray-300 
        bg-clip-text text-transparent"
      >
        Build Your Blockchain!
      </h2>
      <p className="text-center text-gray-300 mb-8">
        Click on the blocks in order (1-5) to create a valid blockchain. All blocks must be connected!
      </p>

      <div className="flex justify-center mb-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {blocks.map((blockId) => (
            <div
              key={blockId}
              onClick={() => handleBlockClick(blockId)}
              className={`relative w-20 h-20 rounded-lg flex items-center justify-center text-2xl font-bold cursor-pointer transition-all duration-300
                ${
                  selectedBlocks.includes(blockId)
                    ? validated
                      ? gameCompleted
                        ? "bg-gradient-to-r from-purple-600 to-purple-400 border-2 border-purple-300"
                        : "bg-gradient-to-r from-purple-600 to-purple-400 border-2 border-purple-300"
                      : "bg-gradient-to-r from-purple-600 to-purple-400 border-2 border-purple-300"
                    : "bg-black/40 backdrop-blur-xl border-2 border-purple-500/30 hover:border-purple-500/50"
                }
                ${selectedBlocks.includes(blockId) && "transform scale-110"}`}
            >
              {blockId}
              {selectedBlocks.includes(blockId) && selectedBlocks.indexOf(blockId) > 0 && (
                <div
                  className={`absolute -left-8 top-1/2 w-8 h-1 
                    ${validated ? (gameCompleted ? "bg-purple-500" : "bg-purple-500") : "bg-purple-500"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={validateChain}
          disabled={selectedBlocks.length !== blocks.length || validated}
          className={`px-8 py-4 rounded-xl font-bold transition-all duration-300
            ${
              selectedBlocks.length !== blocks.length || validated
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-purple-400 text-white hover:opacity-90"
            }`}
        >
          {gameCompleted ? "Blockchain Valid!" : validated ? "Validating..." : "Validate Chain"}
        </button>
      </div>
    </div>
  )
}

// Main Page Component
const KidsPage: React.FC = () => {
  // Using a custom navigate function since we might not have React Router in all environments
  const navigate = (path: string) => {
    window.location.href = path
  }

  const [activeGame, setActiveGame] = useState<number | null>(null)
  const [completedGames, setCompletedGames] = useState<number[]>([])
  const [points, setPoints] = useState(0)
  const [selectedCharacter, setSelectedCharacter] = useState(0)
  const [showCharacterSelection, setShowCharacterSelection] = useState(false)
  const [ocid, setOcid] = useState<string>("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { toast } = useToast()

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = localStorage.getItem("kidsBlockchainData")
    if (savedData) {
      const { completed, userPoints, character } = JSON.parse(savedData)
      setCompletedGames(completed || [])
      setPoints(userPoints || 0)
      setSelectedCharacter(character || 0)
    }

    // Generate a random OCID for content tracking
    const generateRandomOcid = () => {
      const characters = "0123456789abcdef"
      let result = "0x"
      for (let i = 0; i < 40; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
      }
      setOcid(result)
    }

    generateRandomOcid()

    // Track mouse position for cursor effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleGameComplete = () => {
    if (activeGame !== null && !completedGames.includes(activeGame)) {
      // Add points
      const newPoints = points + 50
      setPoints(newPoints)

      // Mark game as completed
      const newCompletedGames = [...completedGames, activeGame]
      setCompletedGames(newCompletedGames)

      // Save progress to localStorage
      localStorage.setItem(
        "kidsBlockchainData",
        JSON.stringify({
          completed: newCompletedGames,
          userPoints: newPoints,
          character: selectedCharacter,
        }),
      )

      // Generate NFT badge notification
      setTimeout(() => {
        toast({
          title: "New Badge Earned!",
          description: "You earned a blockchain explorer badge! It's been added to your collection.",
        })
      }, 1000)
    }

    // Return to game selection
    setTimeout(() => {
      setActiveGame(null)
    }, 2000)
  }

  const handleCharacterSelect = (index: number) => {
    setSelectedCharacter(index)

    // Save to localStorage
    localStorage.setItem(
      "kidsBlockchainData",
      JSON.stringify({
        completed: completedGames,
        userPoints: points,
        character: index,
      }),
    )

    toast({
      title: "Character Selected!",
      description: `You've chosen ${characters[index].name} as your blockchain guide!`,
    })

    setTimeout(() => {
      setShowCharacterSelection(false)
    }, 1000)
  }

  const games = [
    {
      title: "Build a Blockchain",
      description: "Connect blocks together to create your own blockchain!",
      icon: <Sparkles className="w-6 h-6 text-white" />,
      color: "from-purple-600 to-purple-400",
    },
    {
      title: "Crypto Collector",
      description: "Collect digital coins while learning about cryptocurrencies!",
      icon: <Star className="w-6 h-6 text-white" />,
      color: "from-purple-600 to-purple-400",
    },
    {
      title: "Decentralized Heroes",
      description: "Help the heroes protect the network from hackers!",
      icon: <Trophy className="w-6 h-6 text-white" />,
      color: "from-purple-600 to-purple-400",
    },
    {
      title: "NFT Creator",
      description: "Design your own NFT artwork and learn how they work!",
      icon: <Gift className="w-6 h-6 text-white" />,
      color: "from-purple-600 to-purple-400",
    },
  ]

  const characters = [
    {
      name: "Blocky",
      image: "/placeholder.svg?height=150&width=150",
      locked: false,
    },
    {
      name: "Crypto",
      image: "/placeholder.svg?height=150&width=150",
      locked: false,
    },
    {
      name: "Decentrala",
      image: "/placeholder.svg?height=150&width=150",
      locked: points < 100,
    },
    {
      name: "Tokenmaster",
      image: "/placeholder.svg?height=150&width=150",
      locked: points < 200,
    },
  ]

  const stats = [
    { value: completedGames.length, label: "Badges Earned", icon: <Trophy className="w-5 h-5" />, color: "purple" },
    { value: points, label: "Total Points", icon: <Star className="w-5 h-5" />, color: "purple" },
    { value: "5", label: "Available Games", icon: <Gift className="w-5 h-5" />, color: "purple" },
    {
      value: characters.filter((c) => !c.locked).length,
      label: "Characters",
      icon: <Users className="w-5 h-5" />,
      color: "purple",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Particles Background */}
      <ParticleField />

      {/* Dynamic Cursor Effect */}
      <div
        className="fixed w-64 h-64 pointer-events-none z-50 transition-transform duration-100"
        style={{
          transform: `translate(${mousePosition.x - 128}px, ${mousePosition.y - 128}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-300/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="pt-24 pb-10 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <a href="/" className="inline-flex items-center text-purple-300 mb-6 group">
            <ArrowRight className="w-5 h-5 mr-2 transform rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </a>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <div className="overflow-hidden">
                  <span className="inline-block animate-slide-up-fade">Blockchain</span>
                </div>
                <div className="overflow-hidden">
                  <span
                    className="inline-block bg-gradient-to-r from-purple-400 to-purple-200 
                    bg-clip-text text-transparent animate-slide-up-fade delay-200"
                  >
                    Adventures
                  </span>
                </div>
              </h1>
              <p className="text-xl text-gray-300 mb-10 opacity-0 animate-fade-in delay-700">
                Join the fun and learn about blockchain through exciting games and activities!
              </p>
            </div>

            <div className="mt-6 md:mt-0 flex items-center bg-black/40 backdrop-blur-xl rounded-xl p-3 border border-purple-500/30">
              <div className="mr-4 relative">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-purple-400">
                  <img
                    src={characters[selectedCharacter].image || "/placeholder.svg"}
                    alt="Character"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => setShowCharacterSelection(true)}
                  className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full p-1"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </button>
              </div>
              <div>
                <p className="text-xs text-purple-200">Your Guide</p>
                <p className="font-bold text-white">{characters[selectedCharacter].name}</p>
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-purple-400 mr-1" />
                  <span className="text-purple-100">{points} points</span>
                </div>
              </div>
            </div>
          </div>

          {ocid && (
            <div className="mb-6 inline-block bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-xl p-3">
              <p className="text-xs text-purple-200">
                Content OCID:{" "}
                <span className="font-mono">
                  {ocid.slice(0, 10)}...{ocid.slice(-6)}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-6 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="relative group cursor-pointer">
              <div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-400/20 
                rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
              />
              <div
                className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-purple-500/30 
                group-hover:border-purple-500/50 p-4 transform group-hover:translate-y-[-4px] 
                transition-all duration-300"
              >
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-full bg-purple-500/20 
                    flex items-center justify-center mr-3 transform group-hover:scale-110 
                    group-hover:rotate-12 transition-all duration-500"
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <div
                      className="text-2xl font-bold bg-gradient-to-r from-purple-400 
                      to-purple-300 bg-clip-text text-transparent"
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {showCharacterSelection ? (
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 
                  bg-clip-text text-transparent"
                >
                  Choose Your Guide
                </h2>
                <button
                  onClick={() => setShowCharacterSelection(false)}
                  className="text-purple-300 hover:text-white transition-colors"
                >
                  <ArrowRight className="w-5 h-5 transform rotate-180" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {characters.map((character, index) => (
                  <Character
                    key={index}
                    name={character.name}
                    image={character.image}
                    selected={selectedCharacter === index}
                    locked={character.locked}
                    onClick={() => handleCharacterSelect(index)}
                  />
                ))}
              </div>

              {characters.some((char) => char.locked) && (
                <p className="text-center text-purple-200 mt-6 text-sm">Earn more points to unlock all characters!</p>
              )}
            </div>
          ) : activeGame === null ? (
            <>
              <h2
                className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 
                bg-clip-text text-transparent"
              >
                Blockchain Games
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {games.map((game, index) => (
                  <GameCard
                    key={index}
                    title={game.title}
                    description={game.description}
                    icon={game.icon}
                    color={game.color}
                    completed={completedGames.includes(index)}
                    locked={index > 1 && completedGames.length < 1}
                    onClick={() => setActiveGame(index)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* We're only implementing the first game for this example */}
              {activeGame === 0 ? (
                <BlockchainGame onComplete={handleGameComplete} onBack={() => setActiveGame(null)} />
              ) : (
                <div className="text-center bg-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-12">
                  <button
                    onClick={() => setActiveGame(null)}
                    className="inline-flex items-center text-purple-300 mb-8 group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 transform rotate-180 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Games</span>
                  </button>

                  <h2
                    className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 
                    bg-clip-text text-transparent"
                  >
                    {games[activeGame].title}
                  </h2>
                  <p className="text-gray-200 mb-8">This game is under construction! Please check back soon.</p>

                  <div className="flex justify-center">
                    <div className="animate-pulse bg-gradient-to-r from-purple-600 to-purple-400 p-4 rounded-full">
                      {games[activeGame].icon}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default KidsPage

