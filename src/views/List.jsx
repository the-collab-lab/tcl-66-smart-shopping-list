import { Link } from 'react-router-dom';
import { useState } from 'react';
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
						{filteredData.map((item) => (
							<ListItem
								key={item.id}
								name={item.name}
								id={item.id}
								dateLastPurchased={item.dateLastPurchased}
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
