import { useState, useEffect } from 'react';
import AddItem from '../components/AddItem';
import { ListItem } from '../components/ListItem';
import { comparePurchaseUrgency, useSharedWithData } from '../api/firebase';
import { Spinner } from '../components/Spinner';
import TextInput from '../components/TextInput';
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
				<Spinner />
			) : data.length > 0 ? (
				<>
					<h2 className="flex justify-center xsm:text-lg sm:text-xl md:text-3xl xsm:mt-16 xsm:mb-8 sm:mt-10 sm:mb-12">
						{listName ? `Hello from your ${listName} page!` : 'Hello!'}
					</h2>
					{listPath.includes(user?.uid) ? (
						<div className="absolute top-2 right-2 flex justify-center items-center gap-4">
							<div>
								{usersSharedWith.length > 0 ? (
									<button
										onClick={() => openModal('sharedWithList')}
										className="flex items-center xsm:text-[12px] sm:text-[13px] md:text-[16px] gap-1"
									>
										<FaRegCircleUser />
										{` ${usersSharedWith.length}`}
									</button>
								) : null}
							</div>
							<div>
								<button
									onClick={() => openModal('inviteForm')}
									className="flex items-center xsm:text-[12px] sm:text-[13px] md:text-[14px] px-2 py-1 border-1 m-auto rounded-lg hover:bg-hover"
								>
									<IoMailOutline className="mr-2" />
									Share list
								</button>
							</div>
						</div>
					) : null}
					<span className="flex xsm:justify-between sm:justify-normal items-center xsm:gap-4 sm:gap-2 flex-wrap mb-6">
						{/* AddItem component */}
						<div className="justify-center flex sm:flex-col sm:items-start">
							<AddItem listPath={listPath} data={data} />
						</div>

						{/* Search form */}
						<form
							onSubmit={handleSubmit}
							className="flex xsm:text-xs sm:text-sm md:text-md xsm:mx-auto sm:mx-0"
						>
							<TextInput
								name="search"
								onChange={handleChange}
								value={search}
								handleClear={handleClear}
								isSearch={true}
								placeholder="Search list"
							/>
						</form>
					</span>

					<ul className="flex flex-col gap-2">
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
				<Spinner />
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
