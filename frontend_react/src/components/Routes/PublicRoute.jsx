import {Navigate} from 'react-router-dom'
import {useContext} from 'react'
import {AuthContext} from '../../context/AuthContext'

const PublicRoute = ({children}) => {
    const {isAuthenticated} = useContext(AuthContext);

    if(isAuthenticated) {
        return <Navigate to="/profil" replace/>;
    }

    return children;
}

export default PublicRoute;