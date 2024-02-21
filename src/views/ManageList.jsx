import AddItem from '../components/AddItem';
import InviteForm from '../components/InviteForm';

export function ManageList({ listPath }) {
	return (
		<>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>
			<InviteForm listPath={listPath} />
			<AddItem listPath={listPath} />
		</>
	);
}
