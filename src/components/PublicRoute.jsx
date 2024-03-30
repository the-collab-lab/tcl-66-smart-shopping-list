import { Outlet } from 'react-router-dom';
import { useAuth } from '../api';
import { Login } from '../views';

export function PublicRoute() {
	const { user } = useAuth();
	return !user ? <Login /> : <Outlet />;
}
