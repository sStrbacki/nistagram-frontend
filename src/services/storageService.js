import firebase from 'firebase/app';
import 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// TODO Env
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

export {
    upload, getUploadUrls
}

// How to use?
// document.getElementById('input-multiple-files-id').onchange =
//             function (e) {
//                 getUploadUrls(upload(e.target.files))
//                     .then(urlPromises => {
//                         urlPromises.forEach(urlPromise => {
//                             urlPromise.then(url => console.log(url));
//                         })
//                     })
//
//             }
//
// 'upload' will return a list of Snapshot Promises. We can use those promises to wait for snapshots from the Storage.
// Once we get the snapshot promises as an array, we should wrap them up in 'getUploadUrls' which takes as parameter
// the output of the 'upload' function.
// This will then return a Promise containing a list of promises, each one holding a single media URL.

/**
 *  Uploads the given FileList to the Cloud Storage.
 *  @see FileList Only supported argument is FileList.
 *  @return A list of promises which can be used to fetch snapshots of uploaded data.
 */
function upload(files) {
    const snapshotPromises = [];

    files.forEach(file => {
        console.log('Uploading: [' + file.name + ']')
        const ext = getExtension(file);

        if (isImage(ext)) {
            snapshotPromises.push(uploadImage(file, ext));
        }
        else if (isVideo(ext)) {
            snapshotPromises.push(uploadVideo(file, ext));
        }
        else console.error('Unrecognized file type: [' + file.name + ']');
    })

    return snapshotPromises;
}

/** Returns a promise for a list of promises, each child promise awaiting a String response */
async function getUploadUrls(snapshotPromises) {
    const promises = [];

    for (const snapshotPromise of snapshotPromises) {
        const snapshot = await snapshotPromise;
        promises.push(snapshot.ref.getDownloadURL());
    }

    return promises;
}

/** Uploads an image to the Cloud Storage. Returns a snapshot promise. */
function uploadImage(file, ext) {
    return randomStorageRef(imageRef, ext).put(file);
}

/** Uploads a video to the Cloud Storage. Returns a snapshot promise. */
function uploadVideo(file, ext) {
    return randomStorageRef(videoRef, ext).put(file);
}

/** Generates a random UUID Cloud Storage reference. */
function randomStorageRef(storageRef, extension) {
    return storageRef.child(uuidv4() + '.' + extension);
}

/** Returns the extension for the given File object argument */
function getExtension(file) {
    let tokens = file.name.split('.');
    return tokens[tokens.length - 1];
}

/** Checks whether the given file extension represents an image. */
function isImage(ext) {
    return ['png', 'jpg', 'jpeg'].includes(ext.toLowerCase());
}

/** Checks whether the given file extension represents a video */
function isVideo(ext) {
    return ['mp4'].includes(ext.toLowerCase());
}
