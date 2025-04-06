## ⚠️ Note

Due to rate limits, some backend functionalities are currently disabled, and certain values are hardcoded for demonstration purposes.

# Terra.org 🌍

## E-Waste Management Simplified


Terra.org is an innovative platform built for the Google Solution Challenge 2025 that simplifies the E-waste management system for both sellers and recyclers. Our solution addresses three key Sustainable Development Goals:

- **SDG 11**: Sustainable Cities and Communities
- **SDG 12**: Responsible Consumption and Production
- **SDG 13**: Climate Action

## 🚀 Features

### For Users

- **Intuitive Dashboard**
  - Track upcoming disposals
  - View disposal history
  - Monitor personal recycling achievements

- **AI-Powered Waste Management**
  - Upload images of e-waste
  - Automatic waste type detection
  - Educational information about each waste type
  - Smart connection to nearby disposal facilities

- **Achievement System**
  - Earn achievements based on recycling milestones
  - Track environmental impact

### For Recyclers

- **Management Dashboard**
  - View incoming disposal requests
  - Accept or reject disposal submissions
  - Mark requests as completed
  - Monitor recycling metrics

## 💻 Tech Stack

- **Frontend**: Next.js
- **Backend**: Node.js
- **Database**: MongoDB
- **Authentication**: Clerk
- **AI Services**: Python, Docker


## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/terra-org.git

# Navigate to the project directory
cd terra-org

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🔧 Environment Setup

Create a `.env.local` file in the project root and add:

```
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# AI Service
AI_SERVICE_URL=your_ai_service_url
```

## 📱 Usage

1. Register for an account
2. Navigate to the dashboard
3. Use the "Schedule New Disposal" feature to upload waste images
4. Review AI analysis and suggested disposal sites
5. Track your recycling journey through the achievements section

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🏆 Google Solution Challenge 2025

Terra.org is proudly submitted to the Google Solution Challenge 2025, addressing critical environmental challenges through technology.

## 📧 Contact

For questions or feedback, please reach out to: arkoroy302@gmail.com
