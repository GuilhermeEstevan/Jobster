import { Navigate } from "react-router-dom"
import { useUserContext } from "../Features/User/UserContext"

const ProtectedRoute = ({ children }) => {

    const { user } = useUserContext()

    if (!user) {
        return <Navigate to='/landing' />
    }

    return children
}
export default ProtectedRoute