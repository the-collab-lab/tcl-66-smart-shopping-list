import { useState } from 'react';
import { shareList } from '../api';
import { useAuth } from '../api/useAuth.jsx';

const InviteForm = ({ listPath, closeModal }) => {
	const [input, setInput] = useState('');
	const { user } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const message = await shareList(listPath, user.uid, input);
			if (message) {
				alert(message);
				setInput('');
				closeModal();
				return;
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleInputChange = (e) => {
		setInput(e.target.value);
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">
					Please enter the email of the person you want to invite:
					<input
						type="email"
						name="recipientEmail"
						placeholder="friend@email.com"
						id="email"
						value={input}
						onChange={handleInputChange}
					/>
				</label>
				<button type="submit">Invite to List</button>
			</form>
		</>
	);
};

export default InviteForm;
