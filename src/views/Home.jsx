import { SingleList } from '../components/SingleList';
import AddList from '../components/AddList.jsx';
import { useAuth } from '../api/useAuth.jsx';

export default function Home({ data, setListPath, setLoading }) {
	const { user } = useAuth();
	return (
		<div>
			<h2 className="flex justify-center xsm:text-lg sm:text-xl md:text-3xl xsm:mt-8 xsm:mb-8 sm:mt-10 sm:mb-12">
				{user ? `Welcome ${user.displayName}!` : 'Welcome!'}
			</h2>
			<AddList setListPath={setListPath} />
			<ul className="mt-6">
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
