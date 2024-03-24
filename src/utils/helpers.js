export function colorPicker(text) {
	let color;
	switch (text) {
		case 'overdue':
			color = 'red-400';
			break;
		case 'soon':
			color = 'orange-300';
			break;
		case 'kind of soon':
			color = 'yellow-200';
			break;
		case 'not so soon':
			color = 'green-300';
			break;
		case 'inactive':
			color = 'gray-200';
			break;
		default:
			color = 'black';
	}
	return color;
}

export function calculateUrgency(daysTillNextPurchase, daysSinceLastPurchase) {
	let urgency;

	if (
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
