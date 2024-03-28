import { Outlet } from 'react-router-dom';
import { useAuth } from '../api';
import { Login } from '../views';

export function PrivateRoute() {
	const { user } = useAuth();
	return user ? <Outlet /> : <Login />;
}
