import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyD8ZvWx_uMqFy7RV1cPiGyucWcHG2uAIVw",
  authDomain: "passwordnotes-8c7df.firebaseapp.com",
  projectId: "passwordnotes-8c7df",
  storageBucket: "passwordnotes-8c7df.appspot.com",
  messagingSenderId: "475930463775",
  appId: "1:475930463775:web:092bbff5ba87def9fa8f2a",
};

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const getData = async (setUserData) => {
  const data = { folders: [] };
  try {
    const docRef = db.collection("users").doc("FAsiWsTTogRLES4FfNfUYCDKOTA3");
    const doc = await docRef.get();
    const folders = await doc.ref.collection("Folders").get();

    folders.forEach((folder) => {
      const folderData = folder.data();
      const currentFolder = {
        folder_id: folder.id,
        folder_name: folderData.name,
        notes: folderData.notes,
      };
      data.folders.push(currentFolder);
    });

    data["user_reference"] = doc.ref;

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
  getData(setUserData);
};

export const deleteFolder = async (folderId, userData, setUserData) => {
  console.log("delete");
  console.log(folderId);
  await userData["user_reference"].collection("Folders").doc(folderId).delete();
  await getData(setUserData);
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
  await getData(setUserData);
};

export const addFolder = async (folderName, userData, setUserData) => {
  await userData["user_reference"].collection("Folders").add({
    name: folderName,
    notes: {},
  });
  await getData(setUserData);
};

export const changeNoteName = async (
  newName,
  noteId,
  folderId,
  userData,
  setUserData
) => {
  console.log("delete");
  const path = "notes." + noteId + ".note_name";
  await userData["user_reference"]
    .collection("Folders")
    .doc(folderId)
    .update({
      [path]: newName,
    });
  getData(setUserData);
};

export const moveNote = async (
  note,
  noteId,
  currentFolderId,
  destinationFolderId,
  userData,
  setUserData
) => {
  if (currentFolderId === destinationFolderId) return;
  const noteHolder = {[noteId]: note}
  await userData["user_reference"]
    .collection("Folders")
    .doc(destinationFolderId)
    .set(
      {
        notes: noteHolder,
      },
      { merge: true }
    );

  await deleteNote(noteId, currentFolderId, userData, setUserData);
  await getData(setUserData);
};


export const changeFolderName = async (folderId, newName, userData,setUserData) => {
  await userData["user_reference"]
    .collection("Folders")
    .doc(folderId)
    .update({
      name: newName
    });
  await getData(setUserData);
}