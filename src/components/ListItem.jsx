import './ListItem.css';

export function ListItem({ name, index }) {
	return (
		<li className="ListItem" key={index}>
			{name}
		</li>
	);
}
