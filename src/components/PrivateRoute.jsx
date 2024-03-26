import { Outlet } from 'react-router-dom';
import { useAuth } from '../api';
import { Landing } from '../views';

// PrivateRoute component
export function PrivateRoute() {
	const { user } = useAuth();
	console.log(user);
	return user ? <Outlet /> : <Landing />;
}
