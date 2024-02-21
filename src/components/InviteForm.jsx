import { useState } from 'react';
import { shareList } from '../api';
import { useAuth } from '../api/useAuth.jsx';

const InviteForm = ({ listPath }) => {
	const [input, setInput] = useState({
		recipientEmail: '',
	});
	const { user } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await shareList(listPath, user.uid, input.recipientEmail);
			setInput({ recipientEmail: '' });
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
					invite user with email
					<input
						type="email"
						name="recipientEmail"
						id="email"
						value={input.recipientEmail}
						onChange={handleInputChange}
					/>
				</label>
				<button type="submit">invite</button>
			</form>
		</>
	);
};

export default InviteForm;
