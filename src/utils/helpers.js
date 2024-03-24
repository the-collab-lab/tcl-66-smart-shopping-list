export function colorPicker(text) {
	let color;
	switch (text) {
		case 'overdue':
			color = '#f87171';
			break;
		case 'soon':
			color = '#ffa300';
			break;
		case 'kind of soon':
			color = '#fde68a';
			break;
		case 'not so soon':
			color = '#6ee7b7';
			break;
		case 'inactive':
			color = '#e5e7eb';
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
