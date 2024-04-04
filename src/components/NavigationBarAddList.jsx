import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createList } from '../api';
import { useAuth } from '../api/useAuth.jsx';

export default function AddList({ setListPath }) {
	const [listName, setListName] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate();
	const { user } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const newList = await createList(user.uid, user.email, listName);
			const listPath = user.uid + '/' + listName;
			// if list is created newList will be true else newList will be false

			if (newList) {
				setListName('');
				setMessage(`Your list, ${listName}, was successfully created.`);
				setListPath(listPath);
				setTimeout(() => {
					navigate('/list');
				}, 3000);
			} else {
				setMessage(`Your list, ${listName} was not created. Please try again.`);
			}
		} catch (err) {
			console.error(err);
			setMessage(
				`An error occurred while creating your list, ${listName}: ${err.message}.`,
			);
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<label
					htmlFor="newList"
					className="leading-[14px] text-sm font-medium font-family: 'Inter' text-[#6B7280]"
				>
					Create a new shopping list:
				</label>
				<input
					type="text"
					id="newList"
					placeholder={`e.g. Groceries, Clothes`}
					onChange={(e) => setListName(e.target.value)}
					className="border border-inputBorder px-1 rounded-lg xsm:max-w-full xsm:ml-0 md:ml-px lg:w-56 h-8 ml-px"
				></input>
				<Button
					type="submit"
					className="max-w-fit w-[90px] h-[34px] rounded-lg pt-2 pr-3 pb-2 pl-3 border my-2"
					color="light"
				>
					<div className="max-w-fit flex gap-x-2 items-center">
						<p className="w-[64px] h-[18px] font-medium font-family: 'Inter' text-xs leading-[20px] text-[#111928] text-center">
							Create List
						</p>
					</div>
				</Button>
			</form>
			{message ? <p>{message}</p> : null}
		</>
	);
}
