import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeProvider';

export function SingleList({ name, path, setListPath, setLoading }) {
	const navigate = useNavigate();
	const { theme } = useTheme();

	async function handleClick() {
		setLoading(true);
		await setListPath('');
		setListPath(path);
		navigate('/list');
	}

	return (
		<li
			className={`flex-grow justify-between px-6 h-12 ${theme === 'light' ? 'bg-list hover:bg-hover' : 'bg-listDark hover:bg-hoverDark'} rounded-lg shadow-md mt-4 hover:bg-opacity-85`}
		>
			{/* Using Link instead of button */}
			<Link
				to="/list"
				onClick={() => handleClick()}
				className="flex items-center w-full h-full"
			>
				{name}
			</Link>
		</li>
	);
}
