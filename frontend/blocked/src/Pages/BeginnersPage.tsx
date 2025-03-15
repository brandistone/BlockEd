"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Shield,
  BookOpen,
  Clock,
  ArrowRight,
  CheckCircle,
  Star,
  Lightbulb,
  DollarSign,
  Wallet,
  Mail,
} from "lucide-react"

// Simple toast notification component
const Toast = ({ message, type, onClose }: { message: string; type: string; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 ${type === "success" ? "bg-green-600" : "bg-purple-600"}`}
    >
      <p className="text-white">{message}</p>
    </div>
  )
}

// Custom toast hook
const useToast = () => {
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null)

  const showToast = (message: string, type = "default") => {
    setToast({ message, type })
  }

  const hideToast = () => {
    setToast(null)
  }

  return { toast, showToast, hideToast }
}

// Auth Modal Component
const AuthModal = ({ isOpen, onClose, onAuth }: { isOpen: boolean; onClose: () => void; onAuth: () => void }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black/80 border border-purple-500/30 rounded-xl p-6 w-full max-w-md">
        <h3 className="text-2xl font-bold text-white mb-4">Sign In Required</h3>
        <p className="text-gray-300 mb-6">
          To access learning modules and track your progress, please sign in with one of the following methods:
        </p>

        <div className="space-y-4 mb-6">
          <button
            onClick={onAuth}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:opacity-90 flex items-center justify-center"
          >
            <Wallet className="w-5 h-5 mr-2" />
            <span>Connect Wallet</span>
          </button>

          <button
            onClick={onAuth}
            className="w-full py-3 px-4 rounded-lg bg-white text-gray-800 font-medium hover:bg-gray-100 flex items-center justify-center"
          >
            <Mail className="w-5 h-5 mr-2" />
            <span>Sign in with Google</span>
          </button>
        </div>

        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

// Components and Layout
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

// Module Card Interface
interface ModuleCardProps {
  title: string
  description: string
  icon: React.ReactNode
  completed?: boolean
  locked?: boolean
  duration: string
  onClick: () => void
}

// Module Card Component
const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon,
  completed = false,
  locked = false,
  duration,
  onClick,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-xl transition-all duration-300 
        ${locked ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:translate-y-[-5px]"}`}
      onClick={locked ? undefined : onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-xl blur-lg" />
      <div
        className={`relative bg-black/30 backdrop-blur-md border rounded-xl h-full p-6 
          ${completed ? "border-green-500/30" : "border-purple-500/30"}`}
      >
        <div className="flex items-start mb-4">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 
              ${completed ? "bg-green-600" : "bg-gradient-to-r from-purple-600 to-blue-600"}`}
          >
            {completed ? <CheckCircle className="w-6 h-6 text-white" /> : icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-medium text-white mb-1">{title}</h3>
            <div className="flex items-center text-sm text-gray-400">
              <Clock className="w-4 h-4 mr-1" />
              <span>{duration}</span>
            </div>
          </div>
          {completed && <div className="bg-green-600/20 text-green-400 text-xs px-2 py-1 rounded">Completed</div>}
          {locked && <div className="bg-gray-600/20 text-gray-400 text-xs px-2 py-1 rounded">Locked</div>}
        </div>
        <p className="text-gray-300 mb-4">{description}</p>
        <button
          className={`w-full py-2 px-4 rounded-lg flex items-center justify-center space-x-2 
            ${
              completed
                ? "bg-green-600/20 text-green-400 hover:bg-green-600/30"
                : locked
                  ? "bg-gray-600/20 text-gray-400"
                  : "bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 text-white hover:border-purple-500/50"
            } transition-all duration-300`}
          disabled={locked}
        >
          <span>{completed ? "Review" : locked ? "Unlock" : "Start Learning"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// Quiz Card Interface
interface QuizCardProps {
  question: string
  options: string[]
  correctAnswer: number
  onAnswer: (isCorrect: boolean) => void
  onBack: () => void
}

// Quiz Card Component
const QuizCard: React.FC<QuizCardProps> = ({ question, options, correctAnswer, onAnswer, onBack }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)

  const handleOptionSelect = (index: number) => {
    if (answered) return

    setSelectedOption(index)
  }

  const handleSubmit = () => {
    if (selectedOption === null) return

    const isCorrect = selectedOption === correctAnswer
    setAnswered(true)
    onAnswer(isCorrect)
  }

  return (
    <div className="relative bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-6">
      <button
        onClick={onBack}
        className="absolute top-4 left-4 text-purple-400 hover:text-purple-300 transition-colors flex items-center"
      >
        <ArrowRight className="w-4 h-4 mr-1 transform rotate-180" />
        <span>Back to Notes</span>
      </button>

      <h3 className="text-xl font-medium text-white mb-6 mt-8">{question}</h3>

      <div className="space-y-3 mb-8">
        {options.map((option, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 
              ${
                selectedOption === index
                  ? answered
                    ? index === correctAnswer
                      ? "border-green-500 bg-green-500/20"
                      : "border-red-500 bg-red-500/20"
                    : "border-purple-500 bg-purple-500/20"
                  : "border-gray-700 hover:border-purple-500/50 hover:bg-purple-500/10"
              }
              ${answered && index === correctAnswer && "border-green-500 bg-green-500/20"}`}
            onClick={() => handleOptionSelect(index)}
          >
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full border mr-3 flex items-center justify-center
                  ${
                    selectedOption === index
                      ? answered
                        ? index === correctAnswer
                          ? "border-green-500 bg-green-500"
                          : "border-red-500 bg-red-500"
                        : "border-purple-500 bg-purple-500"
                      : "border-gray-500"
                  }
                  ${answered && index === correctAnswer && "border-green-500 bg-green-500"}`}
              >
                {(answered && index === correctAnswer) || (answered && selectedOption === index) ? (
                  <CheckCircle className={`w-4 h-4 text-white`} />
                ) : null}
              </div>
              <span className="text-gray-200">{option}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={selectedOption === null || answered}
        className={`w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium 
          ${selectedOption === null || answered ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}
      >
        {answered ? "Answered" : "Submit Answer"}
      </button>

      {answered && (
        <div
          className={`mt-4 p-4 rounded-lg ${selectedOption === correctAnswer ? "bg-green-500/20" : "bg-red-500/20"}`}
        >
          <p className={`text-sm ${selectedOption === correctAnswer ? "text-green-400" : "text-red-400"}`}>
            {selectedOption === correctAnswer
              ? "Correct! Well done."
              : `Incorrect. The correct answer is: ${options[correctAnswer]}`}
          </p>
        </div>
      )}
    </div>
  )
}

// Main Page Component
const BeginnersPage: React.FC = () => {
  const [activeModule, setActiveModule] = useState<number | null>(null)
  const [completedModules, setCompletedModules] = useState<number[]>([])
  const [progress, setProgress] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [ocid, setOcid] = useState<string>("")
  const { toast, showToast, hideToast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      // In a real app, this would check for a valid session token, wallet connection, etc.
      const hasAuth = localStorage.getItem("userAuthenticated") === "true"
      setIsAuthenticated(hasAuth)
    }

    checkAuth()

    // Load progress from localStorage (only if authenticated)
    if (isAuthenticated) {
      const savedProgress = localStorage.getItem("beginnerProgress")
      if (savedProgress) {
        const { completed, progressPercentage } = JSON.parse(savedProgress)
        setCompletedModules(completed)
        setProgress(progressPercentage)
      }
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
  }, [isAuthenticated])

  const handleModuleClick = (moduleIndex: number) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }

    setActiveModule(moduleIndex)
    // Always reset quiz state when changing modules
    setShowQuiz(false)
    setQuizCompleted(false)

    // If module is not completed, show in-progress toast
    if (!completedModules.includes(moduleIndex)) {
      showToast("Module In Progress. You've started this module. Complete it to earn an NFT badge!", "default")
    }
  }

  const handleQuizAnswer = (isCorrect: boolean) => {
    if (isCorrect && !quizCompleted) {
      // Mark the quiz as completed
      setQuizCompleted(true)

      // Only add to completed modules if not already completed
      if (activeModule !== null && !completedModules.includes(activeModule)) {
        const newCompletedModules = [...completedModules, activeModule]
        setCompletedModules(newCompletedModules)

        // Calculate new progress
        const newProgress = Math.round((newCompletedModules.length / modules.length) * 100)
        setProgress(newProgress)

        // Save to localStorage
        localStorage.setItem(
          "beginnerProgress",
          JSON.stringify({
            completed: newCompletedModules,
            progressPercentage: newProgress,
          }),
        )

        // Show completion message
        setTimeout(() => {
          showToast("Module Completed! Congratulations! You've earned an NFT badge for this module.", "success")

          // Mint NFT logic would be here in a real application
        }, 1500)
      }
    }
  }

  const handleAuthentication = () => {
    // In a real app, this would handle wallet connection or Google sign-in
    // For demo purposes, we'll just set a flag in localStorage
    localStorage.setItem("userAuthenticated", "true")
    setIsAuthenticated(true)
    setShowAuthModal(false)
    showToast("Successfully signed in! You can now access all learning modules.", "success")
  }

  const modules = [
    {
      title: "Introduction to Blockchain",
      description: "Learn the fundamentals of blockchain technology and why it matters.",
      icon: <BookOpen className="w-6 h-6 text-white" />,
      duration: "15 minutes",
    },
    {
      title: "How Blocks Work",
      description: "Understand the structure of blocks and how they form a chain.",
      icon: <Shield className="w-6 h-6 text-white" />,
      duration: "20 minutes",
    },
    {
      title: "Decentralization Explained",
      description: "Explore why decentralization is a key feature of blockchain systems.",
      icon: <Lightbulb className="w-6 h-6 text-white" />,
      duration: "15 minutes",
    },
    {
      title: "Cryptocurrencies Basics",
      description: "Understand the relationship between blockchain and cryptocurrencies.",
      icon: <DollarSign className="w-6 h-6 text-white" />,
      duration: "25 minutes",
    },
    {
      title: "Blockchain in Everyday Life",
      description: "Discover real-world applications of blockchain technology.",
      icon: <Star className="w-6 h-6 text-white" />,
      duration: "20 minutes",
    },
  ]

  // Quizzes for each module
  const quizzes = [
    {
      // Module 0: Introduction to Blockchain
      question: "What is the main innovation of blockchain technology?",
      options: [
        "Fast internet connections",
        "Decentralized, immutable record-keeping",
        "Artificial intelligence algorithms",
        "Cloud storage solutions",
      ],
      correctAnswer: 1,
    },
    {
      // Module 1: How Blocks Work
      question: "What creates the 'chain' in blockchain?",
      options: [
        "Physical connections between computers",
        "Each block containing a hash reference to the previous block",
        "Chains of transactions within a single block",
        "The sequential order of timestamps",
      ],
      correctAnswer: 1,
    },
    {
      // Module 2: Decentralization Explained
      question: "Which of the following is NOT a benefit of decentralization?",
      options: [
        "Increased resilience against attacks",
        "Faster transaction processing in all cases",
        "Reduced need for trusted third parties",
        "Censorship resistance",
      ],
      correctAnswer: 1,
    },
    {
      // Module 3: Cryptocurrencies Basics
      question: "What is the primary purpose of a cryptocurrency wallet?",
      options: [
        "To physically store digital coins",
        "To connect to mining pools",
        "To store private keys that prove ownership",
        "To create new cryptocurrencies",
      ],
      correctAnswer: 2,
    },
    {
      // Module 4: Blockchain in Everyday Life
      question: "What are smart contracts?",
      options: [
        "Legal documents written by AI",
        "Self-executing contracts with the terms written in code",
        "Contracts that require biometric verification",
        "Agreements between blockchain developers",
      ],
      correctAnswer: 1,
    },
  ]

  const goBack = () => {
    window.history.back()
  }

  const handleSignOut = () => {
    localStorage.removeItem("userAuthenticated")
    localStorage.removeItem("beginnerProgress")
    setIsAuthenticated(false)
    setCompletedModules([])
    setProgress(0)
    setActiveModule(null)
    showToast("You have been signed out", "default")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <ParticleField />

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onAuth={handleAuthentication} />

      {/* Toast notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      {/* Header section */}
      <div className="pt-24 pb-16 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-6">
            <a onClick={goBack} className="inline-flex items-center text-purple-400 group cursor-pointer">
              <ArrowRight className="w-4 h-4 mr-2 transform rotate-180 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </a>

            {isAuthenticated ? (
              <button onClick={handleSignOut} className="text-purple-400 hover:text-purple-300 transition-colors">
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
              >
                Sign In
              </button>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Blockchain for Beginners
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-6 max-w-3xl">
            Welcome to your blockchain journey! This track is designed for newcomers who want to understand the basics
            of blockchain technology in simple, clear terms.
          </p>

          {ocid && (
            <div className="mb-8 inline-block bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-3">
              <p className="text-xs text-purple-300">
                Content OCID:{" "}
                <span className="font-mono">
                  {ocid.slice(0, 10)}...{ocid.slice(-6)}
                </span>
              </p>
            </div>
          )}

          {/* Progress bar - only show if authenticated */}
          {isAuthenticated && (
            <>
              <div className="bg-gray-800 rounded-full h-4 overflow-hidden mb-2 max-w-md">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-400 mb-8">{progress}% complete</p>
            </>
          )}

          {/* NFT Badge notification if applicable */}
          {isAuthenticated && completedModules.length > 0 && (
            <div className="mb-8 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-4 max-w-md">
              <div className="flex items-center">
                <div className="mr-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-2">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">NFT Badges Earned: {completedModules.length}</h3>
                  <p className="text-sm text-gray-300">
                    Complete all modules to earn the Blockchain Beginner certificate.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Authentication prompt for non-authenticated users */}
          {!isAuthenticated && (
            <div className="mb-8 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-4 max-w-md">
              <div className="flex items-center">
                <div className="mr-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-2">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Sign In to Track Progress</h3>
                  <p className="text-sm text-gray-300">
                    Connect your wallet or sign in with Google to track your progress and earn NFT badges.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAuthModal(true)}
                className="mt-4 w-full py-2 px-4 rounded-lg bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white hover:opacity-90 transition-opacity"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {activeModule === null ? (
            <>
              <h2 className="text-2xl font-bold mb-6">Learning Modules</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module, index) => (
                  <ModuleCard
                    key={index}
                    title={module.title}
                    description={module.description}
                    icon={module.icon}
                    duration={module.duration}
                    completed={isAuthenticated && completedModules.includes(index)}
                    locked={isAuthenticated ? index > 0 && !completedModules.includes(index - 1) : false}
                    onClick={() => handleModuleClick(index)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="max-w-3xl mx-auto">
              <button
                onClick={() => setActiveModule(null)}
                className="inline-flex items-center text-purple-400 mb-6 group"
              >
                <ArrowRight className="w-4 h-4 mr-2 transform rotate-180 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Modules</span>
              </button>

              <h2 className="text-2xl font-bold mb-6">{modules[activeModule].title}</h2>

              {showQuiz ? (
                <QuizCard
                  question={quizzes[activeModule].question}
                  options={quizzes[activeModule].options}
                  correctAnswer={quizzes[activeModule].correctAnswer}
                  onAnswer={handleQuizAnswer}
                  onBack={() => setShowQuiz(false)}
                />
              ) : (
                <div className="space-y-6">
                  {/* Module Content */}
                  <div className="relative bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-6">
                    <h3 className="text-xl font-medium text-white mb-4">Module Content</h3>
                    <p className="text-gray-300 mb-4">
                      This is where the educational content for the {modules[activeModule].title} module would be
                      displayed. The content would include interactive elements, videos, and text explanations.
                    </p>
                    <p className="text-gray-300 mb-6">
                      After reviewing the content and notes below, you can take a quiz to test your knowledge and earn
                      an NFT badge.
                    </p>
                  </div>

                  {/* Module Notes - Key Concepts to Review */}
                  <div className="relative bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <Lightbulb className="w-6 h-6 text-purple-400 mr-2" />
                      <h3 className="text-xl font-medium text-white">Key Concepts to Review</h3>
                    </div>

                    {activeModule === 0 && (
                      <div className="space-y-4">
                        <div className="border-l-2 border-purple-500 pl-4">
                          <h4 className="text-lg font-medium text-white mb-1">What is Blockchain?</h4>
                          <p className="text-gray-300">
                            A blockchain is a distributed, immutable ledger that records transactions across many
                            computers. This ensures that records cannot be altered retroactively without altering all
                            subsequent blocks.
                          </p>
                        </div>

                        <div className="border-l-2 border-purple-500 pl-4">
                          <h4 className="text-lg font-medium text-white mb-1">Key Properties</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>Decentralization: No single entity has control over the entire network</li>
                            <li>Transparency: All transactions are visible to anyone on the network</li>
                            <li>Immutability: Once recorded, data cannot be altered</li>
                            <li>Security: Cryptographic techniques ensure data integrity</li>
                          </ul>
                        </div>

                        <div className="border-l-2 border-purple-500 pl-4">
                          <h4 className="text-lg font-medium text-white mb-1">Blockchain vs. Traditional Databases</h4>
                          <p className="text-gray-300">
                            Unlike traditional databases controlled by a single entity, blockchains distribute control
                            across the network, eliminating the need for trusted third parties and creating a more
                            resilient system.
                          </p>
                        </div>
                      </div>
                    )}

                    {activeModule === 1 && (
                      <div className="space-y-4">
                        <div className="border-l-2 border-purple-500 pl-4">
                          <h4 className="text-lg font-medium text-white mb-1">Block Structure</h4>
                          <p className="text-gray-300">
                            Each block contains a header with metadata, a reference to the previous block (creating the
                            chain), and a set of valid transactions.
                          </p>
                        </div>

                        <div className="border-l-2 border-purple-500 pl-4">
                          <h4 className="text-lg font-medium text-white mb-1">Hashing</h4>
                          <p className="text-gray-300">
                            Cryptographic hash functions convert data of any size to a fixed-size output. They are
                            one-way functions, making it impossible to reverse-engineer the original data from the hash.
                          </p>
                        </div>

                        <div className="border-l-2 border-purple-500 pl-4">
                          <h4 className="text-lg font-medium text-white mb-1">Chain Integrity</h4>
                          <p className="text-gray-300">
                            Each block references the previous block's hash, creating a chain. Altering any block would
                            change its hash, breaking the chain and making tampering evident would change its hash,
                            breaking the chain and making tampering evident.
                          </p>
                        </div>
                      </div>
                    )}

                    {activeModule === 2 && (
                      <div className="space-y-4">
                        <div className="border-l-2 border-purple-500 pl-4">
                          <h4 className="text-lg font-medium text-white mb-1">Decentralization Defined</h4>
                          <p className="text-gray-300">
                            Decentralization refers to the distribution of power and control away from a central
                            authority to a distributed network of participants.
                          </p>
                        </div>

                        <div className="border-l-2 border-purple-500 pl-4">
                          <h4 className="text-lg font-medium text-white mb-1">Benefits of Decentralization</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>Resilience: No single point of failure</li>
                            <li>Censorship resistance: Difficult to shut down or control</li>
                            <li>Trustless operation: No need to trust a central authority</li>
                            <li>Reduced corruption: Power is distributed among many participants</li>
                          </ul>
                        </div>

                        <div className="border-l-2 border-purple-500 pl-4">
                          <h4 className="text-lg font-medium text-white mb-1">Consensus Mechanisms</h4>
                          <p className="text-gray-300">
                            Decentralized networks use consensus mechanisms like Proof of Work or Proof of Stake to
                            agree on the state of the blockchain without central coordination.
                          </p>
                        </div>
                      </div>
                    )}

                    {activeModule === 3 && (
                      <div className="space-y-4">
                        <div className="border-l-2 border-purple-500 pl-4">
                          <h4 className="text-lg font-medium text-white mb-1">What are Cryptocurrencies?</h4>
                          <p className="text-gray-300">
                            Cryptocurrencies are digital or virtual currencies that use cryptography for security and
                            operate on blockchain technology, making them decentralized and outside the control of
                            governments and central banks.
                          </p>
                        </div>

                        <div className="border-l-2 border-purple-500 pl-4">
                          <h4 className="text-lg font-medium text-white mb-1">Types of Cryptocurrencies</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>Payment tokens: Used primarily as digital money (e.g., Bitcoin)</li>
                            <li>Utility tokens: Provide access to a product or service</li>
                            <li>Security tokens: Represent ownership in an asset</li>
                            <li>Stablecoins: Designed to maintain a stable value</li>
                          </ul>
                        </div>

                        <div className="border-l-2 border-purple-500 pl-4">
                          <h4 className="text-lg font-medium text-white mb-1">Wallets and Keys</h4>
                          <p className="text-gray-300">
                            Cryptocurrency wallets store private keys that prove ownership of digital assets. Public
                            keys create addresses for receiving funds, while private keys authorize transactions.
                          </p>
                        </div>
                      </div>
                    )}

                    {activeModule === 4 && (
                      <div className="space-y-4">
                        <div className="border-l-2 border-purple-500 pl-4">
                          <h4 className="text-lg font-medium text-white mb-1">Real-World Applications</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>Supply chain tracking: Verifying authenticity and origin of products</li>
                            <li>Digital identity: Self-sovereign identity management</li>
                            <li>Voting systems: Secure, transparent election processes</li>
                            <li>Healthcare: Secure sharing of medical records</li>
                            <li>Finance: Decentralized lending, borrowing, and trading</li>
                          </ul>
                        </div>

                        <div className="border-l-2 border-purple-500 pl-4">
                          <h4 className="text-lg font-medium text-white mb-1">Smart Contracts</h4>
                          <p className="text-gray-300">
                            Self-executing contracts with the terms directly written into code. They automatically
                            execute when predefined conditions are met, without intermediaries.
                          </p>
                        </div>

                        <div className="border-l-2 border-purple-500 pl-4">
                          <h4 className="text-lg font-medium text-white mb-1">NFTs (Non-Fungible Tokens)</h4>
                          <p className="text-gray-300">
                            Unique digital assets that represent ownership of specific items like art, collectibles, or
                            virtual real estate. Unlike cryptocurrencies, each NFT has distinct value and cannot be
                            exchanged on a 1:1 basis.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quiz Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => setShowQuiz(true)}
                      className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:opacity-90 transition-opacity"
                    >
                      Take the Quiz
                    </button>
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

export default BeginnersPage

