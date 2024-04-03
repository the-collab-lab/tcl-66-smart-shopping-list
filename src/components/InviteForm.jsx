import { useState } from 'react';
import { shareList } from '../api';
import { useAuth } from '../api/useAuth.jsx';
import Select from 'react-select';
import { useToast } from '../utils/hooks.js';
import Toast from '../components/Toast.jsx';

const InviteForm = ({ lists, closeModal, setUsersSharedWith, sharedWith }) => {
	const { user } = useAuth();
	const { toasts, addToast } = useToast();
	const [input, setInput] = useState({
		recipientName: '',
		recipientEmail: '',
	});
	const [selectedLists, setSelectedLists] = useState({
		listsToShare: [],
	});

	const options = lists
		.filter((list) => list.path === user?.uid + '/' + list.name)
		.map((list) => ({
			value: list.path,
			label: list.name,
		}));

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!input.recipientName || !input.recipientEmail) {
			addToast({
				id: 'toastEmptyShareName',
				message: 'Please complete all the fields to share your list.',
				iconName: 'warning',
				color: 'orange',
			});
			return;
		}

		try {
			const message = await shareList(input, selectedLists);
			if (message) {
				alert(message);
				setInput('');
				// Wait for the sharing operation to complete successfully
				const updatedSharedWith = [...sharedWith, input];
				setUsersSharedWith(updatedSharedWith);
				closeModal();
				window.location.reload();
				return;
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleInputChange = (e) => {
		const { value, name } = e.target;
		setInput((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<>
			{toasts.map((toast) => (
				<Toast key={toast.id} {...toast} />
			))}
			<div className="xsm:p-0 sm:p-[20px] flex flex-col gap-[20px] justify-between">
				<div className="h-[47px] border-b-1 border-gray-200 pb-[20px]">
					<h2 className="font-bold text-[18px] text-gray-900">Share list</h2>
				</div>
				<div>
					<form onSubmit={handleSubmit}>
						<Select
							isMulti
							backspaceRemovesValue
							name="selectedLists"
							options={options}
							onChange={(options) => setSelectedLists(options)}
							className="mb-[20px]"
						/>
						<label
							className="h-[21px] text-gray-500 text-[14px]"
							htmlFor="email"
						>
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
						<label
							className="h-[21px] text-gray-500 text-[14px]"
							htmlFor="email"
						>
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
		</>
	);
};

export default InviteForm;

//{toasts.map((toast) => (
//<Toast key={toast.id} {...toast} />
//))}
