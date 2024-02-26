import './Home.css';
import { SingleList } from '../components/SingleList';
import AddList from '../components/AddList.jsx';

export function Home({ data, setListPath }) {
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<AddList setListPath={setListPath} />
			<ul>
				{data.map((list) => (
					<SingleList
						key={list.name}
						name={list.name}
						path={list.path}
						setListPath={setListPath}
					/>
				))}
			</ul>
		</div>
	);
}
