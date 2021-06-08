import firebase from 'firebase/app';
import 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
    apiKey: "AIzaSyDWXIozK88JHLMTdDFI3bJ2GlJmxLkMPnk",
    authDomain: "xws-nistagram.firebaseapp.com",
    projectId: "xws-nistagram",
    storageBucket: "xws-nistagram.appspot.com",
    messagingSenderId: "220996662096",
    appId: "1:220996662096:web:82a38a8dad99815327b255",
    measurementId: "G-1F67HK3DRQ"
};

firebase.initializeApp(firebaseConfig);
const imageRef = firebase.storage().ref().child('images');
const videoRef = firebase.storage().ref().child('videos');

function getImage(name) {
    return imageRef.child(name);
}

function getVideo(name) {
    return videoRef.child(name);
}

function postImage(file, name) {
    return randomStorageRef(imageRef, getExtension(name)).put(file);
}

function postVideo(file) {
    return randomStorageRef(videoRef).put(file);
}

function randomStorageRef(storageRef, extension) {
    return storageRef.child(uuidv4() + '.' + extension);
}

function getExtension(name) {
    let tokens = name.split('.');
    return tokens[tokens.length - 1];
}

export {
    getImage, getVideo, postImage, postVideo
}
