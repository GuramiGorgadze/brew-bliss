import { Navigate } from 'react-router-dom'
import { useUserData } from '../context/UserContext'

function ProtectedRoute({ children }) {
  const { loggedIn } = useUserData()

  if (!loggedIn) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute