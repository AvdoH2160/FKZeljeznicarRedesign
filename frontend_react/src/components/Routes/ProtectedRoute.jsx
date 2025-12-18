import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../../Context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/prijava" replace />;
    }

    return children;
}

export default ProtectedRoute;