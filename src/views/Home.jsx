import './Home.css';
import { SingleList } from '../components/SingleList';

export function Home({ data, setListPath }) {
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<ul>
				{/**
				 * TODO: write some JavaScript that renders the `lists` array
				 * so we can see which lists the user has access to.
				 */}
				{data.map((list, index) => (
					<SingleList
						key={index}
						name={list} //Update when firebase data (currently strings) are made into objects
						path={setListPath}
					/>
				))}
			</ul>
		</div>
	);
}
