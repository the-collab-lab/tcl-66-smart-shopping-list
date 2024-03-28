import { useState, useEffect } from 'react';
import AddItem from '../components/AddItem';
import { ListItem } from '../components/ListItem';
import { comparePurchaseUrgency } from '../api/firebase';
import { Spinner } from '../components/Spinner';
import TextInput from '../components/TextInput';

export function List({ data, listPath, loading }) {
	const [search, setSearch] = useState('');
	const [listName, setListName] = useState('');

	useEffect(() => {
		setListName(listPath.split('/')[1]);
	}, [listPath]);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	const handleClear = () => {
		setSearch('');
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
					<h2 className="flex justify-center xsm:text-md sm:text-lg md:text-3xl mt-6 mb-10">
						{listName ? `Hello from your ${listName} page!` : 'Hello!'}
					</h2>
					<div className="flex justify-between items-end flex-wrap gap-2 mb-6">
						<div className="md:flex md:flex-col md:items-start">
							<AddItem listPath={listPath} data={data} />
						</div>

						{/* Search form */}
						<form
							onSubmit={handleSubmit}
							className="xsm:text-xs sm:text-sm md:text-md"
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
					</div>

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
