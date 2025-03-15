import { ethers } from "ethers"

// Contract address will be set after deployment
const CONTRACT_ADDRESS = "0xc998f0Baa2bD94d96dc23E46c887f151e62a82D8"

// ABI definition - replace this with your actual ABI after compilation
const LearningAppABI = [
  "function registerUser(string memory _name) public",
  "function completeLesson() public",
  "function issueCertificate() public",
  "function getUser(address _user) public view returns (string memory, uint, bool)",
]

export async function getContract() {
  if (typeof window.ethereum === "undefined") {
    throw new Error("Please install MetaMask to use this application")
  }

  await window.ethereum.request({ method: "eth_requestAccounts" })

  // Updated for ethers v6
  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()

  const contract = new ethers.Contract(CONTRACT_ADDRESS, LearningAppABI, signer)

  return contract
}

export async function registerUser(name: string) {
  try {
    const contract = await getContract()
    const tx = await contract.registerUser(name)
    await tx.wait()
    return true
  } catch (error) {
    console.error("Error registering user:", error)
    return false
  }
}

export async function completeLesson() {
  try {
    const contract = await getContract()
    const tx = await contract.completeLesson()
    await tx.wait()
    return true
  } catch (error) {
    console.error("Error completing lesson:", error)
    return false
  }
}

export async function issueCertificate() {
  try {
    const contract = await getContract()
    const tx = await contract.issueCertificate()
    await tx.wait()
    return true
  } catch (error) {
    console.error("Error issuing certificate:", error)
    return false
  }
}

export async function getUserData(address: string) {
  try {
    const contract = await getContract()
    const userData = await contract.getUser(address)
    return {
      name: userData[0],
      lessonsCompleted: Number(userData[1]), // Convert BigInt to Number
      certified: userData[2],
    }
  } catch (error) {
    console.error("Error getting user data:", error)
    return null
  }
}

// Add TypeScript declarations for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean
      request: (request: {
        method: string
        params?: any[]
      }) => Promise<any>
      on: (eventName: string, callback: (...args: any[]) => void) => void
      removeListener: (eventName: string, callback: (...args: any[]) => void) => void
    }
  }
}

