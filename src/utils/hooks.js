import { useEffect, useState } from 'react';

/**
 * Set some state in React, and also persist that value in localStorage.
 * @param {string} storageKey The key of the value in localStorage.
 * @param {string | null} initialValue The initial value to store in localStorage and React state.
 * @returns {[string | null, React.Dispatch<string | null>]}
 */
export function useStateWithStorage(storageKey, initialValue) {
	const [value, setValue] = useState(
		() => localStorage.getItem(storageKey) ?? initialValue,
	);
	useEffect(() => {
		if (value === null || value === undefined) {
			return localStorage.removeItem(storageKey);
		}
		return localStorage.setItem(storageKey, value);
	}, [storageKey, value]);

	return [value, setValue];
}

export function useToast() {
	/**
	 * Adds a new toast notification to the list.
	 * @param {Object} toast The toast object to add.
	 * @param {string} toast.id The unique identifier for the toast.
	 * @param {string} toast.message The message to display in the toast.
	 * @param {string} toast.iconName The name of the icon to display in the toast.
	 * @param {string} toast.color The color theme of the toast.
	 * @param {boolean} toast.dismissible Whether the toast is dismissible or not.
	 */

	const [toasts, setToasts] = useState([]);
	const displayDuration = 3000; // 3 seconds

	const addToast = (toast) => {
		setToasts((prevToasts) => [...prevToasts, toast]);
		setTimeout(() => {
			removeToast(toast.id);
		}, displayDuration);
	};

	/**
	 * Removes a toast notification from the list by its ID.
	 * @param {string} id The ID of the toast to remove.
	 */
	const removeToast = (id) => {
		setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
	};

	return { toasts, addToast };
}
