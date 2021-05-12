import * as firebase from "firebase";
import React, { useMemo } from "react";

const firebaseConfig = {
	apiKey: "AIzaSyD8ZvWx_uMqFy7RV1cPiGyucWcHG2uAIVw",
	authDomain: "passwordnotes-8c7df.firebaseapp.com",
	projectId: "passwordnotes-8c7df",
	storageBucket: "passwordnotes-8c7df.appspot.com",
	messagingSenderId: "475930463775",
	appId: "1:475930463775:web:092bbff5ba87def9fa8f2a",
};

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const getData = async (userData, setUserData) => {
	let data = {};

	const getUserRef = async () => {
		const userID = firebase.auth().currentUser.uid;
		const docRef = db.collection("users").doc(userID);
		const doc = await docRef.get();
		return doc.ref;
	};

	data["user_reference"] = userData["user_reference"] !== null ? userData["user_reference"] : await getUserRef();
	data["folders"] = [];
	try {
		const folders = await data["user_reference"].collection("Folders").get();
		folders.forEach((folder) => {
			const folderData = folder.data();
			const currentFolder = {
				folder_id: folder.id,
				folder_name: folderData.name,
				notes: folderData.notes,
			};
			data.folders.push(currentFolder);
		});
		setUserData(data);
	} catch (error) {
		console.log("Error getting document:", error);
	}
};

export const deleteNote = async (noteId, folderId, userData, setUserData) => {
	console.log("delete");
	const path = "notes." + noteId;
	await userData["user_reference"]
		.collection("Folders")
		.doc(folderId)
		.update({
			[path]: firebase.firestore.FieldValue.delete(),
		});
	await getData(userData, setUserData);
};

export const addNote = async (noteName, folderId, userData, setUserData) => {
	const newNoteId = Math.floor(Math.random() * 1000000 + 1);
	const noteHolder = { [newNoteId]: { note_name: noteName, note_content: "" } };
	await userData["user_reference"].collection("Folders").doc(folderId).set(
		{
			notes: noteHolder,
		},
		{ merge: true }
	);
	await getData(userData, setUserData);
};

export const addFolder = async (folderName, userData, setUserData) => {
	await userData["user_reference"].collection("Folders").add({
		name: folderName,
		notes: {},
	});
	await getData(userData, setUserData);
};

export const deleteFolder = async (folderId, userData, setUserData) => {
	console.log("delete");
	await userData["user_reference"].collection("Folders").doc(folderId).delete();
	await getData(userData, setUserData);
};

export const changeNoteName = async (newName, noteId, folderId, userData, setUserData) => {
	const path = "notes." + noteId + ".note_name";
	await userData["user_reference"]
		.collection("Folders")
		.doc(folderId)
		.update({
			[path]: newName,
		});
	getData(userData, setUserData);
};

export const moveNote = async (note, noteId, currentFolderId, destinationFolderId, userData, setUserData) => {
	if (currentFolderId === destinationFolderId) return;
	const noteHolder = { [noteId]: note };
	await userData["user_reference"].collection("Folders").doc(destinationFolderId).set(
		{
			notes: noteHolder,
		},
		{ merge: true }
	);

	await deleteNote(noteId, currentFolderId, userData, setUserData);
	await getData(userData, setUserData);
};

export const changeFolderName = async (folderId, newName, userData, setUserData) => {
	await userData["user_reference"].collection("Folders").doc(folderId).update({
		name: newName,
	});
	await getData(userData, setUserData);
};

export const saveNoteContent = async (noteContent, noteId, folderId, userData, setUserData) => {
	if (noteContent == null) return;
	const path = "notes." + noteId + ".note_content";
	const result = await userData["user_reference"]
		.collection("Folders")
		.doc(folderId)
		.update({
			[path]: noteContent,
		});
	await getData(userData, setUserData);
};
