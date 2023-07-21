import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyA_b8wjaSbVTQdbd4L-l1EdtbFi5LULr9w",
	authDomain: "portfolio-files-81248.firebaseapp.com",
	projectId: "portfolio-files-81248",
	storageBucket: "portfolio-files-81248.appspot.com",
	messagingSenderId: "71953406892",
	appId: "1:71953406892:web:27ec832fa3412b1bb2b809",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
