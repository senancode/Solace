import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import JournalPage from './pages/JournalPage'
import JournalDetailPage from './pages/JournalDetailPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/journal"
        element={
          <ProtectedRoute>
            <JournalPage />
          </ProtectedRoute>
        }
      />
      <Route
  path="/journal/:id"
  element={
    <ProtectedRoute>
      <JournalDetailPage />
    </ProtectedRoute>
  }
/>
    </Routes>
    
  )
}

export default App