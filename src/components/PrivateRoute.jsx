import { useAuth } from '../api';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
	const user = useAuth();

	return user ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
