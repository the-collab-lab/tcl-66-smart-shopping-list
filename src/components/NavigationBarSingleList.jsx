import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BulletPointListName from '../assets/BulletPointListName';

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

	return (
		<li className="flex-grow justify-between px-6 h-12 bg-list rounded-lg shadow-sm mt-4 hover:bg-[#EBF5FF] hover:bg-opacity-85">
			{/* Using Link instead of button */}
			<Link
				to="/list"
				onClick={() => handleClick()}
				className="flex items-center w-full h-full gap-2.5 group"
			>
				<BulletPointListName />
				<p>{name}</p>
			</Link>
		</li>
	);
}
