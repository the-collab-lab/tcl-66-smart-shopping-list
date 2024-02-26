import { useEffect, useState } from 'react';
import { ListItem } from '../components/ListItem';
import { Link } from 'react-router-dom';

export function List({ data, listPath }) {
	const [search, setSearch] = useState('');
	const [listName, setListName] = useState('');

	const extractAfterSlash = (listPath) => {
		const regex = /\/([^/]+)$/; // Matches the last / and captures everything after it
		const match = listPath.match(regex);

		if (match && match[1]) {
			return match[1];
		} else {
			// If no match is found or the captured group is undefined, return an empty string or handle it as needed.
			return '';
		}
	};

	useEffect(() => {
		if (!listPath) return;
		setListName(extractAfterSlash(listPath));
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
		item.name.includes(search.toLowerCase()),
	);

	return (
		<>
			{!data.length < 1 ? (
				<>
					<p>
						Hello from the <code>{listName}</code> page!
					</p>
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
				</>
			) : (
				<>
					<p>
						Please add to the <code>{listName}</code> to get started.
					</p>
					<button>
						<Link to="/manage-list">Add your first item</Link>
					</button>
				</>
			)}
			<ul>
				{filteredData.map((item) => (
					<ListItem key={item.name} name={item.name} />
				))}
			</ul>
		</>
	);
}
