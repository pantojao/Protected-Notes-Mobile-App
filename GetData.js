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

export const getData = async (userData, setUserData) => {
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
            notes: folderData.notes
          }
          data.folders.push(currentFolder)
      })

      data["user_reference"] = doc.ref

      setUserData(data);
    } catch (error) {
      console.log("Error getting document:", error);
    }
  };