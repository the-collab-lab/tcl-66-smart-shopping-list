import { useNavigate } from 'react-router-dom';
import './SingleList.css';

export function SingleList({ name, path, setListPath, setLoading }) {
	const navigate = useNavigate();

	async function handleClick() {
		setLoading(true);
		await setListPath('');
		setListPath(path);
		navigate('/list');
	}

	return (
		<li className="SingleList">
			<button onClick={() => handleClick()}>{name}</button>
		</li>
	);
}
