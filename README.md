### BlockEd: A Blockchain Education Platform

#### 🚀 Introduction

**BlockEd** is an interactive and decentralized learning platform designed to introduce users of all levels to blockchain technology. The platform offers structured courses and hands-on experiences to help:

- Laymen understand blockchain fundamentals.

- Kids learn through simplified, gamified lessons.

- Aspiring developers master Solidity and build decentralized applications (DApps).

The app is built on EduChain (Solidity), ensuring decentralized, transparent, and immutable learning records.

#### 🌟 Features

**✅ Blockchain Basics** – Interactive lessons for beginners.

**✅ Gamified Learning** – Fun and engaging content for kids.

**✅ Smart Contract Development** – Hands-on Solidity training for developers.

**✅ On-Chain Certificates** – NFT-based certificates for course completion.

**✅ Decentralized Storage** – Learning content and progress stored securely using IPFS.

**✅ Web3 Wallet Integration** – Users connect with MetaMask or EduChain wallet.

## 🛠️ Tech Stack

Frontend: TypeScript, Tailwind CSS
Backend: Solidity (EduChain smart contracts)
Storage: IPFS (off-chain data)
Blockchain Interaction: ethers.js, web3.js
Deployment: REMIX IDE

#### 📂 Project Structure

web3learn/
│── frontend/ # React-based user interface
│ ├── src/
│ │ ├── components/ # UI components
│ │ ├── pages/ # App pages (Dashboard, Courses, etc.)
│ │ ├── utils/ # Blockchain interaction (ethers.js)
│ ├── public/ # Static assets
│ ├── package.json # Frontend dependencies
│
│── contracts/ # Solidity smart contracts
│ ├── LearnBlockchain.sol # User progress & rewards contract
│ ├── NFTCertificate.sol # NFT-based learning certificates
│ ├── deploy.js # Deployment script
│
│── backend/ # Off-chain API (if needed)
│ ├── server.js # Express.js backend (optional)
│
│── scripts/ # Smart contract interaction scripts
│── hardhat.config.js # Hardhat setup
│── README.md # Project documentation

#### 🚀 Deployment

Deploy Smart Contracts to EduChain

npx hardhat run scripts/deploy.js --network educhain

Deploy Frontend to Vercel

npm run build
vercel --prod

#### 📌 Future Enhancements

🎮 Interactive Quizzes – Engage learners through challenges.

🏆 NFT Rewards – Mint NFTs upon course completion.

📖 Community Hub – Blockchain discussion forums.

💰 EduChain Token Rewards – Incentivize learning.

🤝 Contributing

Want to improve BlockEd? Contributions are welcome! Fork the repo, create a branch, and submit a PR.

📞 Contact & Support

💡 Website: [Coming Soon]
📧 Email: info@blocked.com
📢 Twitter: @BlockEd

🌐Web3 Education, one block at time🚀
