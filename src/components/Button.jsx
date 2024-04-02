const Button = ({
	icon,
	type,
	text,
	bgColor,
	textColor,
	borderColor,
	onClick,
}) => {
	return (
		<button
			type={type}
			className={`cursor-pointer flex items-center gap-2 ${bgColor} ${textColor} ${borderColor} text-sm rounded-lg py-2 px-3 h-[42px] `}
			onClick={onClick}
		>
			{icon}
			{text}
		</button>
	);
};

export default Button;
