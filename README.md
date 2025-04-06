
# Blockchain-based Voting System

## Overview
This project is a secure, transparent, and decentralized voting system built on blockchain technology. Developed for Codeshastra XI HackNiche, this solution addresses the challenges of traditional voting systems by leveraging blockchain's immutability and transparency to ensure tamper-proof elections.

## Features

- **Secure Authentication**: Multi-factor authentication to verify voter identity
- **Immutable Vote Records**: Once cast, votes cannot be altered or deleted
- **Transparency**: Public verification of election results without compromising voter privacy
- **Decentralized Architecture**: No single point of failure or control
- **Voter Privacy**: Zero-knowledge proofs to maintain ballot secrecy
- **Real-time Results**: Immediate counting and tallying of votes
- **Audit Trail**: Complete history of all voting transactions
- **Accessibility**: User-friendly interface accessible across multiple devices

## Technology Stack

- **Blockchain**: Ethereum/Polygon
- **Smart Contracts**: Solidity
- **Frontend**: React.js
- **Backend**: Node.js/Express
- **Authentication**: OAuth 2.0 + Biometric verification
- **Database**: IPFS for decentralized storage
- **API**: RESTful + GraphQL endpoints

## Getting Started

### Prerequisites
- Node.js (v14.x or higher)
- npm (v6.x or higher)
- Metamask or similar Web3 wallet
- Ganache (for local blockchain development)
- Truffle Suite

### Installation

1. Clone the repository
```bash
git clone https://github.com/manandev18/Codeshastra-XI-HackNiche.git
cd Codeshastra-XI-HackNiche
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Compile smart contracts
```bash
truffle compile
```

5. Deploy smart contracts (local development)
```bash
truffle migrate --network development
```

6. Start the application
```bash
npm run start
```

## System Architecture

The system consists of several key components:

1. **Voter Registration Module**: Verifies identity and issues voting credentials
2. **Ballot Creation Interface**: Allows election administrators to create and configure elections
3. **Voting Interface**: User-friendly portal for casting votes
4. **Blockchain Network**: Stores and validates all voting transactions
5. **Results Tabulation System**: Counts votes and generates reports
6. **Verification Portal**: Allows voters to verify their vote was counted correctly

## Smart Contract Structure

- `VoterRegistry.sol`: Manages voter registration and authentication
- `BallotFactory.sol`: Creates and configures election ballots
- `VotingProcess.sol`: Handles the voting logic and vote recording
- `Results.sol`: Manages vote counting and result publication
- `Verification.sol`: Enables verification of individual votes

## Usage

### For Election Administrators

1. Access the admin dashboard
2. Create a new election with specific parameters (start/end dates, eligible voters, etc.)
3. Add candidates or ballot measures
4. Launch the election
5. Monitor voting progress
6. Close the election and publish results

### For Voters

1. Register with required identification
2. Receive voting credentials
3. Access the voting portal during the election period
4. Cast vote securely
5. Receive confirmation of vote submission
6. Verify vote was counted correctly

## Security Features

- **Sybil Attack Prevention**: Identity verification prevents multiple accounts
- **DDoS Protection**: Distributed architecture mitigates denial of service attacks
- **51% Attack Mitigation**: Consensus mechanism resistant to majority attacks
- **Smart Contract Audits**: Rigorous testing to prevent vulnerabilities
- **Encryption**: End-to-end encryption for all sensitive data

## Roadmap

- [x] Core voting functionality
- [x] Smart contract development
- [x] User authentication system
- [ ] Mobile application support
- [ ] Integration with government ID systems
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Support for complex voting methods (ranked choice, etc.)

## Contributing

We welcome contributions to improve the system! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

