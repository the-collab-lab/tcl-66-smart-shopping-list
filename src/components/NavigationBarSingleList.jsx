import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BulletPointListName from '../assets/BulletPointListName';
import capitalizeFirstLetterOfEachWord from '../utils/capitalize';

export function NavigationBarSingleList({
	name,
	path,
	setListPath,
	setLoading,
}) {
	const navigate = useNavigate();

	async function handleClick() {
		setLoading(true);
		await setListPath('');
		setListPath(path);
		navigate('/list');
	}

	const windowLocationListPath =
		window.location.pathname.substring(
			window.location.pathname.lastIndexOf('/') + 1,
		) === 'list';
	const localStorageListName = localStorage
		.getItem('tcl-shopping-list-path')
		.substring(
			localStorage.getItem('tcl-shopping-list-path').lastIndexOf('/') + 1,
		);

	return (
		<li
			className={`flex-grow justify-between xsm:px-2 sm:pl-4 mx-1 h-12 xsm:bg-appBg sm:bg-list rounded-lg shadow-sm mt-4 hover:bg-[#EBF5FF] hover:bg-opacity-85 ${windowLocationListPath && localStorageListName === name ? 'bg-[#EBF5FF] bg-opacity-85' : null}`}
		>
			{/* Using Link instead of button */}
			<Link
				to="/list"
				onClick={() => handleClick()}
				className="flex items-center w-full h-full gap-2.5 group"
			>
				<BulletPointListName
					windowLocationListPath={windowLocationListPath}
					localStorageListName={localStorageListName}
					name={name}
				/>
				<p>{capitalizeFirstLetterOfEachWord(name)}</p>
			</Link>
		</li>
	);
}

// <... className={`flex items-center space-x-2 px-4 py-5 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 border-l-4 border-white ${window.location.pathname === '/' ? 'border-red-200' : ''}`}>
