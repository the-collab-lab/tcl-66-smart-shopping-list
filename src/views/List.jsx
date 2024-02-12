import { ListItem } from '../components/ListItem';

export function List({ data }) {
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<ul>
				{data.map((item) => (
					<ListItem key={item.name} name={item.name} />
				))}
			</ul>
		</>
	);
}
