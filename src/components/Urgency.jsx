import { colorPicker } from '../utils/helpers';

const Urgency = ({ isChecked, urgency }) => {
	const { text, bg } = colorPicker(urgency);

	return (
		<div className={`${bg} flex items-center rounded-md px-2 py-1`}>
			<span className={`${text} text-xs`}>
				{!isChecked ? urgency : 'checked'}
			</span>
		</div>
	);
};

export default Urgency;
