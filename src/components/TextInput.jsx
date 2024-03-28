import { BsSearch } from 'react-icons/bs';
import { IoIosClose } from 'react-icons/io';

const TextInput = ({
	label,
	value,
	name,
	placeholder,
	onChange,
	handleClear,
	isSearch,
}) => {
	return (
		<div className="relative flex flex-col gap-2">
			<label htmlFor={name} className="text-xs font-medium">
				{label}
			</label>
			{isSearch && (
				<BsSearch
					className="absolute top-[20px] left-[16px] text-gray-500"
					size={18}
				/>
			)}
			<input
				id={name}
				type="text"
				name={name}
				placeholder={placeholder}
				className={`${isSearch && 'pl-[46px]'} border border-gray-300 p-2 text-gray-900 text-sm placeholder:text-sm placeholder:text-gray-500 rounded-lg focus:tcl-blue h-[42px] pl-4 w-[300px] bg-gray-50`}
				onChange={onChange}
				value={value}
			/>
			{isSearch && (
				<button
					type="button"
					onClick={handleClear}
					className="absolute right-0 top-[6px] p-4 text-gray-500"
				>
					<IoIosClose />
				</button>
			)}
		</div>
	);
};

export default TextInput;
