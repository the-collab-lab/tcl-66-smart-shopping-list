import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(() => {
		// Get the theme preference from localStorage if it exists
		const storedTheme = localStorage.getItem('theme');
		return storedTheme ? storedTheme : 'light'; // Default to 'light' if no preference is found
	});

	useEffect(() => {
		// Save the theme preference to localStorage
		localStorage.setItem('theme', theme);
	}, [theme]); // Run this effect whenever the theme changes

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}
