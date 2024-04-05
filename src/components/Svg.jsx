const SpriteUrl = '/sprite.svg?url';

const Svg = ({ symbolId, className }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className={className}>
			<use href={`${SpriteUrl}#${symbolId}`} />
		</svg>
	);
};

export default Svg;
//width={width || '100%'} height={height || '100%'}
