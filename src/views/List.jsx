import { useState, useEffect } from 'react';
import AddItem from '../components/AddItem';
import { ListItem } from '../components/ListItem';
import { comparePurchaseUrgency, useSharedWithData } from '../api/firebase';
import Modal from '../components/Modal';
import InviteForm from '../components/InviteForm';
import SharedWithList from '../components/SharedWithList';
import { useAuth } from '../api';
import { IoMailOutline } from 'react-icons/io5';
import { FaRegCircleUser } from 'react-icons/fa6';

export function List({ data, listPath, lists, loading }) {
	const [search, setSearch] = useState('');
	const [listName, setListName] = useState('');
	const [toggleModal, setToggleModal] = useState(false);
	const [modalContent, setModalContent] = useState('');
	const { sharedWith } = useSharedWithData(listPath);
	const { user } = useAuth();
	const [usersSharedWith, setUsersSharedWith] = useState(sharedWith);

	useEffect(() => {
		setListName(listPath.split('/')[1]);
	}, [listPath]);

	useEffect(() => {
		setUsersSharedWith(sharedWith);
	}, [sharedWith]);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	const handleClear = () => {
		setSearch('');
	};

	const openModal = (content) => {
		setModalContent(content);
		setToggleModal(true);
	};

	const closeModal = () => {
		setToggleModal(false);
	};

	const filteredData = data.filter((item) =>
		item.name.toLowerCase().includes(search.toLowerCase()),
	);

	const sortedItems = comparePurchaseUrgency(filteredData);

	return (
		<>
			{loading ? (
				<p>loading . . .</p>
			) : data.length > 0 ? (
				<>
					<h2 className="flex justify-center xsm:text-md sm:text-lg md:text-3xl mt-6 mb-4">
						{listName ? `Hello from your ${listName} page!` : 'Hello!'}
					</h2>
					{listPath.includes(user.uid) ? (
						<div className="flex justify-center items-center gap-4 mb-6">
							<div>
								<button
									onClick={() => openModal('inviteForm')}
									className="flex items-center px-4 py-1 border-1 m-auto rounded-md hover:bg-hover"
								>
									<IoMailOutline className="mr-2" />
									Share list
								</button>
							</div>
							<div>
								{usersSharedWith.length > 0 ? (
									<button
										onClick={() => openModal('sharedWithList')}
										className="flex items-center gap-1"
									>
										<FaRegCircleUser />
										{` ${usersSharedWith.length}`}
									</button>
								) : null}
							</div>
						</div>
					) : null}
					<span className="flex justify-between items-center flex-wrap">
						{/* AddItem component */}
						<div className="md:flex md:flex-col md:items-start">
							<AddItem listPath={listPath} data={data} />
						</div>

						{/* Search form */}
						<form
							onSubmit={handleSubmit}
							className="xsm:text-xs sm:text-sm md:text-md"
						>
							<label htmlFor="search">Search:</label>
							<input
								type="text"
								id="search"
								name="search"
								className="border border-inputBorder pl-2 mx-2 rounded-lg xsm:flex-grow xsm:h-6 sm:w-full sm:h-6 md:w-36 md:h-8"
								onChange={handleChange}
								value={search}
							/>
							<button type="button" onClick={handleClear}>
								x
							</button>
						</form>
					</span>

					<ul>
						{sortedItems.map((item) => (
							<ListItem
								key={item.id}
								name={item.name}
								id={item.id}
								previousNextPurchased={item.previousNextPurchased}
								previousLastPurchased={item.previousLastPurchased}
								dateLastPurchased={item.dateLastPurchased}
								dateNextPurchased={item.dateNextPurchased}
								totalPurchases={item.totalPurchases}
								dateCreated={item.dateCreated}
								listPath={listPath}
							/>
						))}
					</ul>
					<div>
						<Modal
							isOpen={toggleModal}
							onClose={closeModal}
							id={
								modalContent === 'inviteForm' ? 'inviteForm' : 'sharedWithList'
							}
						>
							{modalContent === 'inviteForm' ? (
								<InviteForm
									listName={listName}
									listPath={listPath}
									lists={lists}
									closeModal={closeModal}
									sharedWith={usersSharedWith}
									setUsersSharedWith={setUsersSharedWith}
								/>
							) : (
								// Render your shared user list component here
								<SharedWithList
									listPath={listPath}
									sharedWith={usersSharedWith}
									closeModal={closeModal}
									setUsersSharedWith={setUsersSharedWith}
								/>
							)}
						</Modal>
					</div>
				</>
			) : loading ? (
				<p>loading . . .</p>
			) : data.length < 1 ? (
				<>
					<p className="py-2">
						Please add an item to your {listName} list to get started
					</p>
					<AddItem listPath={listPath} data={data} />
				</>
			) : null}
		</>
	);
}
