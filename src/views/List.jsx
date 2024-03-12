import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getDifferenceBetweenDates } from '../utils';
import { ListItem } from '../components/ListItem';

export function List({ data, listPath, loading }) {
	const [search, setSearch] = useState('');
	const [listName] = useState(listPath.split('/')[1]);

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

	const todaysDate = new Date();

	const sorted = filteredData.sort((a, b) => {
		const date1 = Math.floor(
			getDifferenceBetweenDates(a.dateNextPurchased.toDate(), todaysDate),
		);
		const date2 = Math.floor(
			getDifferenceBetweenDates(b.dateNextPurchased.toDate(), todaysDate),
		);

		const item1 = a.name.toLowerCase();

		const item2 = b.name.toLowerCase();

		const daysSinceLastTransaction1 = Math.floor(
			getDifferenceBetweenDates(
				todaysDate,
				a.dateLastPurchased
					? a.dateLastPurchased.toDate()
					: a.dateCreated.toDate(),
			),
		);

		const daysSinceLastTransaction2 = Math.floor(
			getDifferenceBetweenDates(
				todaysDate,
				b.dateLastPurchased
					? b.dateLastPurchased.toDate()
					: b.dateCreated.toDate(),
			),
		);

		// sort by value of days since last purchased
		if (daysSinceLastTransaction1 >= 60 && daysSinceLastTransaction2 < 60) {
			return 1;
		} else if (
			daysSinceLastTransaction1 < 60 &&
			daysSinceLastTransaction2 >= 60
		) {
			return -1;
		}

		// if dates are not equal sort by difference of dates
		if (date1 !== date2) {
			return date1 - date2;
		}

		// if dates are equal sort by character value
		if (item1 < item2) {
			return -1;
		} else if (item1 > item2) {
			return 1;
		}

		return 0;
	});

	return (
		<>
			<p>
				Hello from the <code>{listName}</code> page!
			</p>
			{loading ? (
				<p>loading . . .</p>
			) : data.length > 0 ? (
				<>
					<form onSubmit={handleSubmit}>
						<label htmlFor="search">Search:</label>
						<input
							type="text"
							id="search"
							name="search"
							onChange={handleChange}
							value={search}
						/>
						<button type="button" onClick={handleClear}>
							x
						</button>
					</form>
					<ul>
						{sorted.map((item) => (
							<ListItem
								key={item.id}
								name={item.name}
								id={item.id}
								dateLastPurchased={item.dateLastPurchased}
								dateNextPurchased={item.dateNextPurchased}
								totalPurchases={item.totalPurchases}
								dateCreated={item.dateCreated}
								listPath={listPath}
							/>
						))}
					</ul>
				</>
			) : (
				<>
					<p>
						Please add to the <code>{listName}</code> list to get started.
					</p>
					<button>
						<Link to="/manage-list">Add your first item</Link>
					</button>
				</>
			)}
		</>
	);
}
