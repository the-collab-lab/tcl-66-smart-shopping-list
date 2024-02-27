import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ListItem } from '../components/ListItem';

export function List({ data, listPath }) {
	const [search, setSearch] = useState('');
	const [listName] = useState(listPath.split('/')[1]);
	const [loadingStatus, setLoadingStatus] = useState(true);

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

	useEffect(() => {
		setTimeout(() => {
			setLoadingStatus(false);
		}, 2000);
	}, []);

	return (
		<>
			{data.length > 1 ? (
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
					{loadingStatus ? (
						'loading . . .'
					) : (
						<ul>
							{filteredData.map((item) => (
								<ListItem key={item.name} name={item.name} />
							))}
						</ul>
					)}
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
		</>
	);
}
