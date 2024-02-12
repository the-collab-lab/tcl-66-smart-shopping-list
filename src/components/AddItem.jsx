export default function AddItem() {
	const handleSubmit = (e) => {
		e.preventDefault();
		alert('Item added!');
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Item name:
				<input type="text" name="name" />
			</label>
			<label>
				Timeframe:
				<select name="timeframe">
					<option value="7">Soon</option>
					<option value="14">Kind of Soon</option>
					<option value="30">Not so Soon</option>
				</select>
			</label>
			<button type="submit">Add item</button>
		</form>
	);
}
