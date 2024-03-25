import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Layout, List, ManageList } from './views';
import { useAuth } from './api';
import { useShoppingListData, useShoppingLists } from './api';
import { useStateWithStorage } from './utils';
import { ThemeProvider } from './context/ThemeProvider';

export function App() {
	/**
	 * This custom hook holds the path to the current list.
	 * Check ./utils/index.js for its implementation.
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

	return (
		<ThemeProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route
							index
							element={
								<Home
									data={lists}
									setListPath={setListPath}
									setLoading={setLoading}
								/>
							}
						/>
						<Route
							path="/list"
							element={
								<List
									data={data}
									listPath={listPath}
									loading={loading}
									setLoading={setLoading}
								/>
							}
						/>
						<Route
							path="/manage-list"
							element={<ManageList listPath={listPath} data={data} />}
						/>
					</Route>
				</Routes>
			</Router>
		</ThemeProvider>
	);
}
