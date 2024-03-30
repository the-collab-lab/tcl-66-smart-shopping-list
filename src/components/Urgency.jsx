import { colorPicker } from '../utils/helpers';

const Urgency = ({ isChecked, urgency }) => {
	const { text, bg } = colorPicker(urgency);

	return (
		<div
			className={`${isChecked ? 'bg-gray-200' : bg} flex items-center rounded-md px-2 py-1`}
		>
			<span className={`${isChecked ? 'text-gray-800' : text} text-xs`}>
				{!isChecked ? urgency : 'checked'}
			</span>
		</div>
	);
};

export default Urgency;
