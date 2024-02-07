import './Home.css';
import { SingleList } from '../components/SingleList';

export function Home({ data }) {
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<ul>
				{data.map((list, index) => (
					<SingleList key={index} name={list.name} path={list.path} />
				))}
			</ul>
		</div>
	);
}
