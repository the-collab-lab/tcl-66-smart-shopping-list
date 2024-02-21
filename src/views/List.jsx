import { ListItem } from '../components/ListItem';
import { useState } from 'react';

export function List({ data }) {
	const [search, setSearch] = useState('');

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
			<p>
				Hello from the <code>/list</code> page!
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
				<button onClick={handleClear}>x</button>
			</form>
			<ul>
				{filteredData.map((item) => (
					<ListItem key={item.name} name={item.name} />
				))}
			</ul>
		</>
	);
}
