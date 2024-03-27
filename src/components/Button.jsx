const Button = ({ icon, type, text, bgColor, textColor }) => {
	return (
		<button
			type={type}
			className={`cursor-pointer flex items-center gap-2 ${bgColor} ${textColor} text-sm rounded-lg py-2 px-3 h-[42px]`}
		>
			{icon}
			{text}
		</button>
	);
};

export default Button;
