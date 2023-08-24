import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const {
  PUBLIC_API_KEY,
  PUBLIC_AUTH_DOMAIN,
  PUBLIC_PROJECT_ID,
  PUBLIC_STORAGE_BUCKET,
  PUBLIC_MESSAGING_SENDER_ID,
  PUBLIC_APP_ID,
  PUBLIC_MEASUREMENT_ID,
} = import.meta.env;

const firebaseConfig = {
  apiKey: PUBLIC_API_KEY,
  authDomain: PUBLIC_AUTH_DOMAIN,
  projectId: PUBLIC_PROJECT_ID,
  storageBucket: PUBLIC_STORAGE_BUCKET,
  messagingSenderId: PUBLIC_MESSAGING_SENDER_ID,
  appId: PUBLIC_APP_ID,
  measurementId: PUBLIC_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
const dbPath = '/urls';

const db = firebase.firestore();
const collectionRef = db.collection(dbPath);

const createUrl = async (data) => {
  await collectionRef.add(data);
};

const getUrls = async () => {
  const snapshot = await collectionRef.get();
  const documents = snapshot.docs.map((doc) => doc.data());
  return documents;
};

const updateUrl = async (documentId, newData) => {
  await collectionRef.doc(documentId).update(newData);
};

const deleteUrl = (documentId) => {
  collectionRef.doc(documentId).delete();
};

const getCount = async () => {
  const sizaCollection = (await collectionRef.get()).size;
  return sizaCollection;
};

const deleteAll = async () => {
  collectionRef.get().then((snapshot) => {
    const batch = collectionRef.firestore.batch();
    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    return batch.commit();
  });
};

const buscarUrlsByFilter = async (atributoBD, value) => {
  const snapshot = await collectionRef.where(atributoBD, '==', value).get();
  const documents = snapshot.docs.map((doc) => doc.data());
  for (let i = 0; i < documents.length; i++) {
    documents[i].id = snapshot.docs[i].id;
  }
  return documents;
};

export { createUrl, getUrls, deleteUrl, getCount, deleteAll, buscarUrlsByFilter };
