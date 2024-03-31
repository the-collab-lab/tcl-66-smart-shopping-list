import {
	arrayUnion,
	arrayRemove,
	getDoc,
	setDoc,
	deleteDoc,
	collection,
	doc,
	onSnapshot,
	updateDoc,
	increment,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from './config';
import { getFutureDate, getDifferenceBetweenDates, todaysDate } from '../utils';

/**
 * A custom hook that subscribes to the user's shopping lists in our Firestore
 * database and returns new data whenever the lists change.
 * @param {string | null} userId
 * @param {string | null} userEmail
 * @returns
 */
export function useShoppingLists(userId, userEmail) {
	// Start with an empty array for our data.
	const initialState = [];
	const [data, setData] = useState(initialState);

	useEffect(() => {
		// If we don't have a userId or userEmail (the user isn't signed in),
		// we can't get the user's lists.
		if (!userId || !userEmail) return;

		// When we get a userEmail, we use it to subscribe to real-time updates
		const userDocRef = doc(db, 'users', userEmail);

		onSnapshot(userDocRef, (docSnap) => {
			if (docSnap.exists()) {
				const listRefs = docSnap.data().sharedLists;
				const newData = listRefs.map((listRef) => {
					// We keep the list's id and path so we can use them later.
					return { name: listRef.id, path: listRef.path };
				});
				setData(newData);
			}
		});
	}, [userId, userEmail]);

	return data;
}

/**
 * A custom hook that subscribes to a shopping list in our Firestore database
 * and returns new data whenever the list changes.
 * @param {string | null} listPath
 * @see https://firebase.google.com/docs/firestore/query-data/listen
 */
export function useShoppingListData(listPath) {
	// Start with an empty array for our data.
	/** @type {import('firebase/firestore').DocumentData[]} */
	const initialState = [];
	const [data, setData] = useState(initialState);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!listPath) return;

		// When we get a listPath, we use it to subscribe to real-time updates
		// from Firestore.
		return onSnapshot(collection(db, listPath, 'items'), (snapshot) => {
			// The snapshot is a real-time update. We iterate over the documents in it
			// to get the data.
			const nextData = snapshot.docs.map((docSnapshot) => {
				// Extract the document's data from the snapshot.
				const item = docSnapshot.data();

				// The document's id is not in the data,
				// but it is very useful, so we add it to the data ourselves.
				item.id = docSnapshot.id;

				return item;
			});

			// Update our React state with the new data.
			setData(nextData);
			setLoading(false);
		});
	}, [listPath]);

	// Return the data so it can be used by our React components.
	return { data, loading, setLoading };
}

/**
 * Add a new user to the users collection in Firestore.
 * @param {Object} user The user object from Firebase Auth.
 */
export async function addUserToDatabase(user) {
	// Check if the user already exists in the database.
	const userDoc = await getDoc(doc(db, 'users', user.email));
	// If the user already exists, we don't need to do anything.
	if (userDoc.exists()) {
		return;
	} else {
		// If the user doesn't exist, add them to the database.
		// We'll use the user's email as the document id
		// because it's more likely that the user will know their email
		// than their uid.
		await setDoc(doc(db, 'users', user.email), {
			email: user.email,
			name: user.displayName,
			uid: user.uid,
		});
	}
}

/**
 * Create a new list and add it to a user's lists in Firestore.
 * @param {string} userId The id of the user who owns the list.
 * @param {string} userEmail The email of the user who owns the list.
 * @param {string} listName The name of the new list.
 */
export async function createList(userId, userEmail, listName) {
	const listDocRef = doc(db, userId, listName);
	// check to see if listDocRef was created if yes, send the front end true, if no send false
	if (listDocRef) {
		await setDoc(listDocRef, {
			owner: userId,
		});

		const userDocumentRef = doc(db, 'users', userEmail);

		updateDoc(userDocumentRef, {
			sharedLists: arrayUnion(listDocRef),
		});
		return true;
	}
	return false;
}

export function useSharedWithData(listPath) {
	const [sharedWith, setSharedWith] = useState([]);

	useEffect(() => {
		if (!listPath) return;

		const fetchSharedWithData = async () => {
			try {
				const listDocRef = doc(db, listPath);
				const listDocSnap = await getDoc(listDocRef);

				if (listDocSnap.exists()) {
					const listData = listDocSnap.data();
					const sharedWithData = listData.sharedWith || [];
					setSharedWith(sharedWithData);
				} else {
					console.log('No such document!');
				}
			} catch (error) {
				console.error('Error fetching sharedWith data:', error);
			}
		};

		fetchSharedWithData();
	}, [listPath]);

	return { sharedWith };
}

/**
 * Shares a list with another user.
 * @param {string} listPath The path to the list to share.
 * @param {string} recipientEmail The email of the user to share the list with.
 */
export async function shareList(input, selectedLists) {
	// Get the document for the recipient user.
	const recipientEmail = input.recipientEmail;
	const recipientName = input.recipientName;
	const usersCollectionRef = collection(db, 'users');
	const recipientDoc = await getDoc(doc(usersCollectionRef, recipientEmail));

	// If the recipient user doesn't exist, we can't share the list.
	if (!recipientDoc.exists()) {
		return 'User not found, please try again.';
	}

	// Construct the shared data object
	const sharedData = {
		name: input.recipientName,
		email: input.recipientEmail,
	};

	// Share each selected list with the recipient user
	const sharePromises = selectedLists.map(async (list) => {
		const listDocumentRef = doc(db, list.value);
		const userDocumentRef = doc(db, 'users', recipientEmail);

		// Check if the list is already shared with the recipient user
		const listDoc = await getDoc(listDocumentRef);
		const sharedWithArray = listDoc.data()?.sharedWith || [];
		const alreadyShared = sharedWithArray.some(
			(shared) => shared.email === input.recipientEmail,
		);

		if (!alreadyShared) {
			await updateDoc(listDocumentRef, {
				sharedWith: arrayUnion(sharedData),
			});

			// Add the list to the recipient user's sharedLists array
			await updateDoc(userDocumentRef, {
				sharedLists: arrayUnion(listDocumentRef),
			});
		}
	});

	await Promise.all(sharePromises);

	return `Yay, ${recipientName} was invited to ${selectedLists.length === 1 ? 'your list' : 'your lists'}!`;
}

/**
 * Unshares a list with a user.
 * @param {string} listPath The path to the list to unshare.
 * @param {string} recipientEmail The email of the user to unshare the list with.
 */
export async function unshareList(listPath, recipientEmail, recipientName) {
	const sharedData = {
		name: recipientName,
		email: recipientEmail,
	};

	try {
		// Remove the user from the sharedWith array of the list document
		const listDocRef = doc(db, listPath);
		await updateDoc(listDocRef, {
			sharedWith: arrayRemove(sharedData),
		});

		// Remove the list from the sharedLists array of the user document
		const userDocRef = doc(db, 'users', recipientEmail);
		await updateDoc(userDocRef, {
			sharedLists: arrayRemove(listDocRef),
		});

		return `List unshared with ${recipientEmail}.`;
	} catch (error) {
		console.error('Error unsharing list:', error);
		return 'An error occurred while unsharing the list. Please try again.';
	}
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listPath The path of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.itemName The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */

export async function addItem(listPath, { itemName, daysUntilNextPurchase }) {
	const listCollectionRef = collection(db, listPath, 'items');
	const newDocRef = doc(listCollectionRef);

	return setDoc(newDocRef, {
		dateCreated: new Date(),
		dateLastPurchased: null,
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),
		name: itemName,
		totalPurchases: 0,
	});
}

/**
 * Updates the specified item in the shopping list with the new purchase information.
 * @param {string} listPath - Path of the shopping list in Firestore.
 * @param {string} itemId - ID of the item to be updated.
 * @param {Timestamp} dateLastPurchased - Timestamp of the last purchase date.
 * @param {number} nextPurchaseEstimate - Estimated number of days until the next purchase.
 * @returns {Promise} A promise that resolves when the item is successfully updated.
 */
export async function updateItem(
	listPath,
	itemId,
	todaysDate,
	dateLastPurchased,
	dateNextPurchased,
	nextPurchaseEstimate,
) {
	const listCollectionRef = collection(db, listPath, 'items');

	const itemDocRef = doc(listCollectionRef, itemId);

	return updateDoc(itemDocRef, {
		previousNextPurchased: dateNextPurchased,
		previousLastPurchased: dateLastPurchased,
		dateLastPurchased: todaysDate,
		dateNextPurchased: getFutureDate(nextPurchaseEstimate),
		totalPurchases: increment(1),
	});
}

/**
 * Removes the last purchase information from the specified item in the shopping list.
 * If the item has no previous purchases, the function resolves without making any changes.
 * @param {string} listPath - Path of the shopping list in Firestore.
 * @param {string} itemId - ID of the item to be unchecked.
 * @returns {Promise} A promise that resolves when the item is successfully unchecked or if there are no changes needed.
 */

export async function uncheckItem(
	listPath,
	itemId,
	previousLastPurchased,
	previousNextPurchased,
	totalPurchases,
) {
	// Create a reference to the item document in the specified shopping list
	const listCollectionRef = collection(db, listPath, 'items');
	const itemDocRef = doc(listCollectionRef, itemId);

	// Retrieve the item document data
	const itemDoc = await getDoc(itemDocRef);
	const itemData = itemDoc.data();

	// Check if the item has a previous purchase
	if (itemData.dateLastPurchased) {
		// Update the item document with the new information
		updateDoc(itemDocRef, {
			dateLastPurchased: previousLastPurchased,
			dateNextPurchased: previousNextPurchased,
			totalPurchases: totalPurchases > 0 ? increment(-1) : 0,
		});
	}
}

export async function deleteItem(listPath, itemId) {
	const listCollectionRef = collection(db, listPath, 'items');
	const itemDocRef = doc(listCollectionRef, itemId);
	return deleteDoc(itemDocRef);
}

/**
 * Compare and sort list items by time urgency and alphabetical order
 * @param {array} array The list of items to sort
 */
export function comparePurchaseUrgency(array) {
	return array.sort((a, b) => {
		// getDifferenceBetweenDates gets the average number of days between the next purchase date and today's date for each shopping item
		const dateA = Math.floor(
			getDifferenceBetweenDates(a.dateNextPurchased.toDate(), todaysDate),
		);
		const dateB = Math.floor(
			getDifferenceBetweenDates(b.dateNextPurchased.toDate(), todaysDate),
		);

		const itemA = a.name.toLowerCase();

		const itemB = b.name.toLowerCase();

		// get the average number of days between today's date and the date last purchased or the date created if
		// dateLastPurchased does not exist yet
		const daysSinceLastPurchaseA = Math.floor(
			getDifferenceBetweenDates(
				todaysDate,
				a.dateLastPurchased
					? a.dateLastPurchased.toDate()
					: a.dateCreated.toDate(),
			),
		);

		const daysSinceLastPurchaseB = Math.floor(
			getDifferenceBetweenDates(
				todaysDate,
				b.dateLastPurchased
					? b.dateLastPurchased.toDate()
					: b.dateCreated.toDate(),
			),
		);

		// sort by value of days since last purchased
		if (daysSinceLastPurchaseA >= 60 && daysSinceLastPurchaseB < 60) {
			return 1;
		} else if (daysSinceLastPurchaseA < 60 && daysSinceLastPurchaseB >= 60) {
			return -1;
		}

		// if dates are not equal sort by difference of dates
		if (dateA !== dateB) {
			return dateA - dateB;
		}
		// if dates are equal sort by character value
		return itemA.localeCompare(itemB);
	});
}
