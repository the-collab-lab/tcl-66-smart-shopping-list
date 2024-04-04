import { Outlet } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar.jsx';

export default function Layout({ data, setListPath, setLoading }) {
	const mainContentMargin = 'xsm:mx-2 sm:ml-44 md:ml-48 lg:ml-56';

	return (
		<>
			<div className={`flex xsm:text-sm sm:text-md md:text-lg`}>
				<NavigationBar
					data={data}
					setListPath={setListPath}
					setLoading={setLoading}
				/>
				{/* Main content */}
				<main
					className={`min-h-screen flex-grow bg-appBg p-2 xsm:pt-4 ${mainContentMargin} md:p-6 pb-12`}
				>
					<Outlet />
				</main>
			</div>
		</>
	);
}
