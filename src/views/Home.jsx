import { SingleList } from '../components/SingleList';
import AddList from '../components/AddList.jsx';
import { useAuth } from '../api/useAuth.jsx';

export function Home({ data, setListPath, setLoading }) {
	const { user } = useAuth();
	console.log(user);
	return (
		<div>
			<h2 className="flex justify-center xsm:text-md sm:text-lg md:text-xl lg:text-3xl mt-6 mb-10">
				{user ? `Welcome ${user.displayName}!` : 'Welcome!'}
			</h2>
			<AddList setListPath={setListPath} />
			<ul>
				{data.map((list) => (
					<SingleList
						key={list.name}
						name={list.name}
						path={list.path}
						setListPath={setListPath}
						setLoading={setLoading}
					/>
				))}
			</ul>
		</div>
	);
}
