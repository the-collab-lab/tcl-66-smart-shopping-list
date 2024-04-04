const SelectInput = ({ id, label, name, value, onChange }) => {
	return (
		<div className="relative flex flex-col gap-2">
			<label htmlFor={id} className="text-xs font-medium">
				{label}
			</label>
			<select
				id={id}
				name={name}
				onChange={onChange}
				value={value}
				className="cursor-pointer appearance-none bg-white shadow hover:shadow-md text-gray-900 xsm:text-xs sm:text-sm rounded-lg focus:tcl-blue focus:tcl-blue block xsm:pl-2 sm:p-2.5 h-[42px] xsm:w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px]"
			>
				<option value="" disabled>
					Select an option
				</option>
				<option value="7">Soon</option>
				<option value="14">Kind of Soon</option>
				<option value="31">Not so Soon</option>
			</select>
		</div>
	);
};

export default SelectInput;
