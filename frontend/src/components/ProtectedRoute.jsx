import { Navigate } from 'react-router-dom'
import { useUserData } from '../context/UserContext'

function ProtectedRoute({ children }) {
  const { loggedIn, isAuthLoading } = useUserData()

  if (isAuthLoading) return null

  if (!loggedIn) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute