export function colorPicker(text) {
	let color;
	switch (text) {
		case 'overdue':
			color = '#ffadad';
			break;
		case 'today':
			color = '#ffc6ff';
			break;
		case 'soon':
			color = '#ffd6a5';
			break;
		case 'kind of soon':
			color = '#fdffb6';
			break;
		case 'not so soon':
			color = '#caffbf';
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
