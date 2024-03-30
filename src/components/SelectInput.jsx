import { IoChevronDownOutline } from 'react-icons/io5';

const SelectInput = ({ id, label, name, value, onChange }) => {
	return (
		<div className="relative">
			<label htmlFor={id} className="text-xs font-medium">
				{label}
			</label>
			<select
				id={id}
				name={name}
				onChange={onChange}
				value={value}
				className="cursor-pointer appearance-none bg-white shadow hover:shadow-md text-gray-900 text-sm rounded-lg focus:tcl-blue focus:tcl-blue block p-2.5 h-[42px] w-[300px]"
			>
				<option value="" disabled>
					Select an option
				</option>
				<option value="7">Soon</option>
				<option value="14">Kind of Soon</option>
				<option value="31">Not so Soon</option>
			</select>
			<IoChevronDownOutline
				size={14}
				className="absolute right-[8px] top-[43px] text-gray-900"
			/>
		</div>
	);
};

export default SelectInput;
