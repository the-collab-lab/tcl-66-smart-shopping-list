export function colorPicker(urgency) {
	let colors;
	switch (urgency) {
		case 'overdue':
			colors = { text: 'text-red-800', bg: 'bg-red-100' };
			break;
		case 'soon':
			colors = { text: 'text-orange-800', bg: 'bg-orange-100' };
			break;
		case 'kind of soon':
			colors = { text: 'text-yellow-800', bg: 'bg-yellow-100' };
			break;
		case 'not so soon':
			colors = { text: 'text-green-800', bg: 'bg-green-100' };
			break;
		case 'inactive':
			colors = { text: 'text-gray-800', bg: 'bg-gray-100' };
			break;
		default:
			colors = { text: 'text-pink-800', bg: 'bg-pink-100' };
	}
	return colors;
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
