import { useState } from 'react';
import { shareList } from '../api';
import { useAuth } from '../api/useAuth.jsx';
import Select from 'react-select';

const InviteForm = ({ listPath, lists, closeModal }) => {
	const { user } = useAuth();
	const [input, setInput] = useState({
		recipientName: '',
		recipientEmail: '',
	});
	const [selectedList, setSelectedList] = useState({
		listsToShare: [],
	});

	const options = lists
		.filter((list) => user?.uid === list.value.split('/')[1])
		.map((list) => ({ listPath: list.value, label: list.name }));

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(
			input.recipientName,
			input.recipientEmail,
			selectedList.map((option) => option.value),
		);
		// try {
		// 	const message = await shareList(listPath, user.uid, input);
		// 	if (message) {
		// 		alert(message);
		// 		setInput('');
		// 		closeModal();
		// 		return;
		// 	}
		// } catch (err) {
		// 	console.error(err);
		// }
	};

	const handleInputChange = (e) => {
		const { value, name } = e.target;
		setInput((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<div className="xsm:p-0 sm:p-[20px] flex flex-col gap-[20px] justify-between">
			<div className="h-[47px] border-b-1 border-gray-200 pb-[20px]">
				<h2 className="font-bold text-[18px] text-gray-900">Share list</h2>
			</div>
			<div>
				<form onSubmit={handleSubmit}>
					<Select
						isMulti
						backspaceRemovesValue
						name="listsToShare"
						options={options}
						onChange={(options) => setSelectedList(options)}
					/>
					<label className="h-[21px] text-gray-500 text-[14px]" htmlFor="email">
						Name
						<input
							className="w-[100%] h-[40px] border-1 py-[12px] mb-4 px-4 border-gray-200 rounded-md mt-[10px]"
							type="text"
							name="recipientName"
							placeholder="e.g. John Doe"
							id="name"
							value={input.recipientName}
							onChange={handleInputChange}
						/>
					</label>
					<label className="h-[21px] text-gray-500 text-[14px]" htmlFor="email">
						Email
						<input
							className="w-[100%] h-[40px] border-1 py-[12px] px-4 border-gray-200 rounded-md mt-[10px]"
							type="email"
							name="recipientEmail"
							placeholder="example@email.com"
							id="email"
							value={input.recipientEmail}
							onChange={handleInputChange}
						/>
					</label>
					<div className="mt-[20px] flex w-full">
						<button
							type="button"
							onClick={closeModal}
							className="mr-[10px] w-full border-1 border-gray-200 rounded-md px-4 py-[12px]"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="rounded-md w-full px-4 py-[12px] text-white bg-blue-700"
						>
							Share
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default InviteForm;
