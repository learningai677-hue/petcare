# Pet Care 🐾

A comprehensive pet care management application that helps pet owners track, manage, and monitor all aspects of their pets' well-being.

## 🌟 Features

### 📊 Dashboard

- Overview of all pets and their activities
- Quick stats on active pets, upcoming reminders, monthly expenses, and training sessions
- Recent activities timeline
- Beautiful gradient UI with pet-themed background images

### 🐾 Pet Management

- **Pet Profiles**: Create and manage detailed profiles for each pet
- **Medical Records**: Track vaccinations, medications, vet visits, and health history
- **Training Log**: Record training sessions and progress
- **Nutrition**: Monitor feeding schedules, diet plans, and nutrition tracking
- **Exercise**: Log exercise activities and maintain fitness records
- **Grooming**: Schedule and track grooming appointments and care routines

### 📱 Smart Features

- **Reminders**: Set up automated reminders for feeding, medications, vet appointments, and more
- **Photo Journal**: Capture and organize memorable moments with your pets
- **Expense Tracking**: Monitor pet-related expenses and budgets
- **AI Assistant**: Get instant pet care advice through an intelligent chatbot
- **Delegate Care**: Coordinate pet care with family members or pet sitters

## 🛠️ Technologies Used

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for modern, responsive styling
- **Radix UI** components for accessible UI elements
- **React Router** for navigation
- **Framer Motion** for smooth animations
- **Lucide React** for beautiful icons
- **React Hook Form** for form management
- **Recharts** for data visualization

### Backend

- **Node.js** with Express server
- **TypeScript** for type safety
- **CORS** for cross-origin resource sharing
- **Dotenv** for environment variable management

### AI Integration

- **OpenRouter API** with DeepSeek model for intelligent chatbot responses
- Free tier model with no credit limitations

### Development Tools

- **SWC** for fast compilation
- **Vitest** for testing
- **Prettier** for code formatting
- **PostCSS** with Autoprefixer
- **ESLint** for code quality

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd pet-care
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

### Getting OpenRouter API Key

1. Sign up at [OpenRouter.ai](https://openrouter.ai)
2. Get your free API key from the dashboard
3. Add it to your environment variables

The application uses the free DeepSeek model, so there are no credit limitations.

## 📁 Project Structure

```
pet-care/
├── client/                 # Frontend React application
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base UI components (buttons, cards, etc.)
│   │   ├── Layout.tsx     # Main layout wrapper
│   │   └── Sidebar.tsx    # Navigation sidebar
│   ├── pages/             # Application pages/routes
│   │   ├── Index.tsx      # Dashboard home page
│   │   ├── Chatbot.tsx    # AI Assistant page
│   │   ├── Profiles.tsx   # Pet profiles management
│   │   ├── Medical.tsx    # Medical records
│   │   ├── Training.tsx   # Training log
│   │   ├── Nutrition.tsx  # Nutrition tracking
│   │   ├── Exercise.tsx   # Exercise logging
│   │   ├── Grooming.tsx   # Grooming schedules
│   │   ├── PhotoJournal.tsx # Photo memories
│   │   ├── Expenses.tsx   # Expense tracking
│   │   ├── Reminders.tsx  # Reminder management
│   │   └── Delegate.tsx   # Care delegation
│   └── App.tsx            # Main app component with routing
├── server/                # Backend Express server
│   ├── routes/            # API route handlers
│   │   └── chat.ts        # Chatbot API integration
│   └── index.ts           # Server entry point
├── shared/                # Shared types and utilities
└── dist/                  # Build output directory
```

## 🎨 UI/UX Features

- **Modern Design**: Clean, pet-friendly interface with gradient backgrounds
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Floating elements and hover effects for engaging user experience
- **Accessibility**: Built with Radix UI components for screen reader compatibility
- **Visual Feedback**: Loading states, transitions, and interactive elements

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run build:client` - Build only the frontend
- `npm run build:server` - Build only the backend
- `npm start` - Start the production server
- `npm test` - Run tests with Vitest
- `npm run format.fix` - Format code with Prettier
- `npm run typecheck` - Run TypeScript type checking

## 🚀 Deployment

The application can be deployed to various platforms:

### Netlify

1. Connect your repository to Netlify
2. Set the build command: `npm run build`
3. Set the publish directory: `dist/spa`
4. Add environment variables in Netlify dashboard
5. Deploy!

### Vercel

1. Import your repository to Vercel
2. Configure build settings (auto-detected)
3. Add environment variables
4. Deploy!

### Other Platforms

The application builds to static files and can be deployed to any static hosting service.

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Credits

**Created by**: Tanishka Badhai and Jiya Kataria

## 🐛 Support

If you encounter any issues or have questions:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

## 🔮 Future Enhancements

- [ ] Mobile app version (React Native)
- [ ] Push notifications for reminders
- [ ] Integration with veterinary clinics
- [ ] Social features for pet owners
- [ ] Advanced analytics and insights
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Offline functionality
- [ ] Pet health AI diagnostics
- [ ] Integration with pet wearables

---

Made with ❤️ for pet lovers everywhere! 🐾
