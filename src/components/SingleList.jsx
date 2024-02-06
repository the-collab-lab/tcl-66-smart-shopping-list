import './SingleList.css';
import { useStateWithStorage } from '../utils';

export function SingleList({ name, index, path }) {
	const [listPath, setListPath] = useStateWithStorage(
		'tcl-shopping-list-path',
		null,
	);

	function handleClick() {
		setListPath(path);
	}

	return (
		<li className="SingleList" key={index}>
			<button onClick={handleClick}>{name}</button>
		</li>
	);
}
