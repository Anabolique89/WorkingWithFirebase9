import{ initializeApp } from 'firebase/app'
import{
    getFirestore, collection, onSnapshot, 
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBzkzMUJcBriNbypHRzJdafBAoKLR7sblw",
    authDomain: "fir-9-nina.firebaseapp.com",
    projectId: "fir-9-nina",
    storageBucket: "fir-9-nina.appspot.com",
    messagingSenderId: "26866808601",
    appId: "1:26866808601:web:3b17129b3f311bba40b788"
  };

// init firebase app  
  initializeApp(firebaseConfig);

// init services

const db = getFirestore();

// const db = firebase.firestore();
// db.collection('disney')

// collection ref 
const colRef = collection(db, 'disney')

// queries
const q = query(colRef, orderBy('createdAt'))

//where("category", "==", "Princesses" ), - if you want specific data (CATEGORIES)


// real time collection data

    
  onSnapshot(q, (snapshot) => {
   let disney = []
   snapshot.docs.forEach((doc) => {
    disney.push({...doc.data(), id: doc.id })
   })
   console.log(disney)
  })

   // adding documents

   const addDisneyForm = document.querySelector('.add')
   addDisneyForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    
    addDoc(colRef, {
        name: addDisneyForm.name.value,
        appearance: addDisneyForm.appearance.value,
        category: addDisneyForm.category.value,
        powers: addDisneyForm.powers.value,
        createdAt: serverTimestamp()
    })
    .then(() => {
        addDisneyForm.reset()
    })

   })

   // deleting documents
   const deleteDisneyForm = document.querySelector('.delete')
   deleteDisneyForm.addEventListener('submit', (e) =>{
    e.preventDefault()

   const docRef = doc(db, 'disney', deleteDisneyForm.id.value)
   deleteDoc(docRef)
   .then(() => {
     deleteDisneyForm.reset()
   })

   })

   // get a single document

   const docRef = doc(db, 'disney', '49M1eVTFSPEZHPQqtqoQ');


    onSnapshot(docRef, (doc) =>{
        console.log(doc.data(), doc.id)
    })

    // update a document

    const updateForm = document.querySelector('.update')
    updateForm.addEventListener('submit', (e) =>{
        e.preventDefault()
        const docRef = doc(db, 'disney', updateForm.id.value)

        updateDoc(docRef, {
            powers: 'updated powers'
        })
        .then(() =>{
             updateForm.reset()
        })
    })