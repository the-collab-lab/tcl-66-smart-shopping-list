import { useState } from 'react';
import { shareList } from '../api';
import { useAuth } from '../api/useAuth.jsx';

const InviteForm = ({ listPath, closeModal }) => {
	const [input, setInput] = useState({
		recipientEmail: '',
	});
	const { user } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await shareList(listPath, user.uid, input.recipientEmail);
			setInput({ recipientEmail: '' });
			closeModal();
		} catch (err) {
			console.error(err);
		}
	};
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setInput((prevState) => ({
			...prevState,
			[name]: value,
		}));
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
						value={input.recipientEmail}
						onChange={handleInputChange}
					/>
				</label>
				<button type="submit">Invite to List</button>
			</form>
		</>
	);
};

export default InviteForm;
