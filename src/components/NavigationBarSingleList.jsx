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

	const localStorageListName =
		localStorage
			?.getItem('tcl-shopping-list-path')
			?.substring(
				localStorage.getItem('tcl-shopping-list-path').lastIndexOf('/') + 1,
			) || '';

	return (
		<li
			className={`flex-grow justify-between xsm:px-4 sm:px-2 h-12 bg-list rounded-lg shadow-sm mt-4 hover:bg-[#ebf5ff] hover:bg-opacity-85 mx-1 ${windowLocationListPath && localStorageListName === name ? 'bg-[#ebf5ff] bg-opacity-85' : null}`}
		>
			{/*The above hex code (#ebf5ff) only worked in the ternary operator in lowercase format, not uppercase.*/}
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
