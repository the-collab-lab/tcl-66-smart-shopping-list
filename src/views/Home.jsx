import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Home.css';
import { SingleList } from '../components/SingleList';
import { createList } from '../api';
import { useAuth } from '../api/useAuth.jsx';

export function Home({ data, setListPath }) {
	const [listName, setListName] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate();
	const { user } = useAuth();

	const handleSubmit = (event) => {
		event.preventDefault();
		try {
			const newList = createList(user.uid, user.email, listName);
			const listPath = user.uid + '/' + listName;

			if (newList) {
				setMessage(`Your list, ${listName}, was created.`);
				setListPath(listPath);
				setTimeout(() => {
					navigate('/list');
				}, 2000);
			} else {
				setMessage(
					`Your list, ${listName}, was not created, please try again.`,
				);
				return;
			}
		} catch (err) {
			console.error(err);
			setMessage(`Your list ${listName} was not created, please try again.`);
		}
		return;
	};

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="newList">Create a new shopping list:</label>
				<input
					type="text"
					id="newList"
					placeholder="enter list name"
					onChange={(e) => setListName(e.target.value)}
				></input>
				<button type="submit">Create List</button>
			</form>
			{message && <p>{message}</p>}
			<ul>
				{data.map((list) => (
					<SingleList
						key={list.name}
						name={list.name}
						path={list.path}
						setListPath={setListPath}
					/>
				))}
			</ul>
		</div>
	);
}
