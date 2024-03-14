export function colorPicker(text) {
	let color;
	switch (text) {
		case 'overdue':
			color = 'red';
			break;
		case 'today':
			color = 'pink';
			break;
		case 'soon':
			color = 'orange';
			break;
		case 'kind of soon':
			color = 'yellow';
			break;
		case 'not so soon':
			color = 'green';
			break;
		case 'inactive':
			color = 'grey';
			break;
		default:
			color = 'black';
	}
	return color;
}

export function calculateUrgency(daysTillNextPurchase, daysSinceLastPurchase) {
	let urgency;

	if (daysTillNextPurchase === 0) {
		urgency = 'today';
	} else if (
		daysTillNextPurchase < 0 &&
		daysSinceLastPurchase > daysTillNextPurchase
	) {
		urgency = 'overdue';
	} else if (daysTillNextPurchase <= 7) {
		urgency = 'soon';
	} else if (daysTillNextPurchase < 30) {
		urgency = 'kind of soon';
	} else if (daysTillNextPurchase >= 30) {
		urgency = 'not so soon';
	}

	if (daysSinceLastPurchase >= 60) {
		urgency = 'inactive';
	}

	return urgency;
}
