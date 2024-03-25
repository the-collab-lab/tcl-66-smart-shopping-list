import { MdLightMode } from 'react-icons/md';
import { MdDarkMode } from 'react-icons/md';
import { useTheme } from '../context/ThemeProvider';

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	return (
		<div className="fixed top-4 right-4">
			<button
				onClick={toggleTheme}
				className={`p-2 bg-${theme === 'light' ? 'navBg' : 'navBgDark'} rounded-full shadow-lg`}
			>
				{theme === 'dark' ? <MdLightMode /> : <MdDarkMode />}
			</button>
		</div>
	);
}
