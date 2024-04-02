import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useAuth, useSharedWithData } from './api';
import { useShoppingListData, useShoppingLists } from './api';
import { useStateWithStorage } from './utils';

import { Spinner } from './components';

const PublicRoute = lazy(() => import('./components/PublicRoute'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));
const Login = lazy(() => import('./views/Login'));
const Layout = lazy(() => import('./views/Layout'));
const Home = lazy(() => import('./views/Home'));
const List = lazy(() => import('./views/List'));
const Err = lazy(() => import('./views/Err'));

export function App() {
	/**
	 * This custom hook takes the path of a shopping list
	 * in our database and syncs it with localStorage for later use.
	 * Check ./utils/hooks.js for its implementation.
	 */
	const [listPath, setListPath] = useStateWithStorage(
		'tcl-shopping-list-path',
		null,
	);

	/**
	 * This custom hook holds info about the current signed in user.
	 * Check ./api/useAuth.jsx for its implementation.
	 */
	const { user } = useAuth();
	const userId = user?.uid;
	const userEmail = user?.email;

	/**
	 * This custom hook takes a user ID and email and fetches
	 * the shopping lists that the user has access to.
	 * Check ./api/firestore.js for its implementation.
	 */
	const lists = useShoppingLists(userId, userEmail);
	/**
	 * This custom hook takes our token and fetches the data for our list.
	 * Check ./api/firestore.js for its implementation.
	 */
	const { data, loading, setLoading } = useShoppingListData(listPath);

	const { sharedWith } = useSharedWithData(listPath);

	return (
		<Router>
			<Routes>
				<Route
					element={
						<Suspense fallback={<Spinner />}>
							<PublicRoute />
						</Suspense>
					}
				>
					<Route
						path="/login"
						element={
							<Suspense fallback={<Spinner />}>
								<Login />
							</Suspense>
						}
					/>
				</Route>
				<Route
					element={
						<Suspense fallback={<Spinner />}>
							<PrivateRoute />
						</Suspense>
					}
				>
					<Route
						path="/"
						element={
							<Suspense fallback={<Spinner />}>
								<Layout />
							</Suspense>
						}
					>
						<Route
							index
							element={
								<Suspense fallback={<Spinner />}>
									<Home
										data={lists}
										setListPath={setListPath}
										setLoading={setLoading}
									/>
								</Suspense>
							}
						/>
						<Route
							path="/list"
							element={
								<Suspense fallback={<Spinner />}>
									<List
										data={data}
										listPath={listPath}
										lists={lists}
										sharedWith={sharedWith}
										loading={loading}
										setLoading={setLoading}
									/>
								</Suspense>
							}
						/>
						{/* <Route
							path="/manage-list"
							element={<ManageList listPath={listPath} data={data} />}
						/> */}
					</Route>
				</Route>
				<Route
					path="*"
					element={
						<Suspense fallback={<Spinner />}>
							<Err />
						</Suspense>
					}
				/>
			</Routes>
		</Router>
	);
}
