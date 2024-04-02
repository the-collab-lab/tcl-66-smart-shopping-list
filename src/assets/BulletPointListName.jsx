import React from 'react';

const BulletPointListName = ({
	name,
	windowLocationListPath,
	localStorageListName,
}) => {
	return (
		<svg
			width="8"
			height="9"
			viewBox="0 0 8 9"
			xmlns="http://www.w3.org/2000/svg"
			className={`${windowLocationListPath && localStorageListName === name ? 'fill-[#1A56DB]' : null} group-hover:fill-[#1A56DB]`}
		>
			<rect y="0.978516" width="8" height="8" rx="4" />
		</svg>
	);
};

export default BulletPointListName;
