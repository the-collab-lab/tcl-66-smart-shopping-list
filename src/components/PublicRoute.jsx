import { useAuth } from '../api';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
	const user = useAuth(); //This custom hook holds info about the current signed in user. Check ./api/useAuth.jsx for its implementation.
	return !user ? children : <Navigate to="/Home" replace />;
};

export default PublicRoute;
