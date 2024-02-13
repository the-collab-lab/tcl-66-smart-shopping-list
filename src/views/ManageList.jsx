import AddItem from '../components/AddItem';

export function ManageList({ listPath }) {
	return (
		<>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>
			<AddItem listPath={listPath} />
		</>
	);
}
