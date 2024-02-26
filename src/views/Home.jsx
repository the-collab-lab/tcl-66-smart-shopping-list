import './Home.css';
import { SingleList } from '../components/SingleList';
import AddList from '../components/AddList.jsx';
import { Link } from 'react-router-dom';

export function Home({ data, setListPath }) {
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<AddList setListPath={setListPath} />
			<ul>
				{data.map((list) => (
					<Link key={list.id} to="/list">
						<SingleList
							key={list.name}
							name={list.name}
							path={list.path}
							setListPath={setListPath}
						/>
					</Link>
				))}
			</ul>
		</div>
	);
}
