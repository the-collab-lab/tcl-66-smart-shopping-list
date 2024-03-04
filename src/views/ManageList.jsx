import { useState } from 'react';
import AddItem from '../components/AddItem';
import InviteForm from '../components/InviteForm';
import Modal from '../components/Modal';

export function ManageList({ listPath, data }) {
	const [openInviteModal, setOpenInviteModal] = useState(false);

	const openModal = () => {
		setOpenInviteModal(true);
	};

	const closeModal = () => {
		setOpenInviteModal(false);
	};

	return (
		<>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>
			{/* Button to open modal for inviting user */}
			{!openInviteModal ? <button onClick={openModal}>Invite</button> : null}
			<Modal isOpen={openInviteModal} onClose={closeModal}>
				<InviteForm listPath={listPath} closeModal={closeModal} />
			</Modal>
			<AddItem listPath={listPath} data={data} />
		</>
	);
}
