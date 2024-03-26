import { useState, useEffect } from 'react';
import AddItem from '../components/AddItem';
import { ListItem } from '../components/ListItem';
import { comparePurchaseUrgency } from '../api/firebase';

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
				<p>loading . . .</p>
			) : data.length > 0 ? (
				<>
					<h2 className="flex justify-center xsm:text-md sm:text-lg md:text-3xl mt-6 mb-10">
						{listName ? `Hello from your ${listName} page!` : 'Hello!'}
					</h2>
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
