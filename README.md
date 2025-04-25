# DeFi Lending Platform

This repository contains a complete example of a decentralized finance (DeFi) lending platform integrating Ethereum smart contracts, a Node.js backend, and a PostgreSQL database. The system supports multiple smart contract versions and detailed transaction logging, offering a robust and scalable template for production-grade decentralized applications (dApps).

---

## 📚 Overview

This project consists of three main components:

- **Smart Contracts** (`defi-contract`): Written in Solidity, deployed on the Sepolia test network via Hardhat.
- **Backend** (`defi-backend`): Built with Node.js, Express, Prisma ORM, and PostgreSQL for storing transaction logs and monitoring activities.
- **Frontend** (`defi-frontend`): A React-based frontend (planned) for interacting with smart contracts.

---

## 🚀 Quick Start

### Prerequisites

- Node.js (>=18.x)
- Docker (for PostgreSQL)
- Metamask wallet (for managing test accounts)
- Sepolia Testnet ETH (get from [Sepolia Faucet](https://sepoliafaucet.com/))

### Clone and Install

```bash
git clone https://github.com/cikdibest/defi-project.git
cd defi-project

# Install backend dependencies
cd defi-backend
npm install

# Install smart contract dependencies
cd ../defi-contract
npm install
```

### Environment Setup

Create `.env` files for both backend and contract deployment:

#### Backend `.env` (`defi-backend/.env`)

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/defi_db?schema=public"
PRIVATE_KEY="YOUR_PRIVATE_KEY"
SEPOLIA_RPC="https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY"
CONTRACT_ADDRESS_V1="SMART_CONTRACT_ADDRESS_V1"
PORT=3000
```

#### Contracts `.env` (`defi-contract/.env`)

```env
PRIVATE_KEY="YOUR_PRIVATE_KEY"
SEPOLIA_RPC="https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY"
```

### Database Setup

Use Docker to start PostgreSQL:

```bash
cd defi-backend
docker compose up -d
```

Generate and migrate Prisma schema:

```bash
npx prisma migrate dev --name init
```

### Deploy Smart Contracts

Deploy the smart contract to Sepolia:

```bash
cd defi-contract
npx hardhat run scripts/deployV1.ts --network sepolia
```

Note down the deployed contract address and update your backend `.env` file.

### Start Backend Server

```bash
cd defi-backend
npm run dev
```

Your backend API server runs at:

```
http://localhost:3000
```

---

## 📖 API Endpoints

API follows semantic versioning (`v1`, `v2`, `v3`). Example:

- Deposit: `POST /api/v1/lending/deposit`
- Borrow: `POST /api/v1/lending/borrow`
- Repay: `POST /api/v1/lending/repay`
- Get Debt: `GET /api/v1/lending/debt`

Request payload example:

```json
{
  "amount": "0.01"
}
```

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express, Prisma, PostgreSQL
- **Smart Contract**: Solidity, Hardhat, Ethers.js
- **Frontend** (planned): React, TypeScript, Wagmi
- **DevOps**: Docker, Prisma Migrations

---

## 📦 Project Structure

```
/defi-project
├── defi-backend
│   ├── prisma
│   ├── src
│   │   ├── controllers
│   │   ├── contracts
│   │   ├── middleware
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   ├── app.ts
│   │   └── server.ts
│   ├── docker-compose.yml
│   ├── package.json
│   └── tsconfig.json
├── defi-contract
│   ├── contracts
│   ├── scripts
│   ├── deployments
│   ├── hardhat.config.ts
│   └── package.json
└── defi-frontend (planned)
```

---

## ✅ Best Practices Included

- Comprehensive logging with correlation IDs
- Robust centralized error handling
- Versioned APIs and smart contracts
- Database schema migrations with Prisma
- Clean architecture and SOLID principles

---

## 📝 License

[MIT](LICENSE)

---

## 🤝 Contributing

Feel free to open issues or submit pull requests. Contributions are welcome!
