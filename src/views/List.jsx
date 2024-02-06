import { ListItem } from '../components/ListItem';

export function List({ data }) {
	console.log(data);
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<ul>
				{data.map((item, index) => (
					<ListItem key={index} name={item.name} />
				))}
			</ul>
		</>
	);
}
