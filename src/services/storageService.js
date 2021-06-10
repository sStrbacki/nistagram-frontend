import firebase from 'firebase/app';
import 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
	apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
	authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.VUE_APP_FIREBASE_APP_ID,
	measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
const imageRef = firebase
	.storage()
	.ref()
	.child('images');
const videoRef = firebase
	.storage()
	.ref()
	.child('videos');

export { uploadFiles, getUploadUrls, uploadFile, getUploadUrl };

// How to use?
// document.getElementById('input-multiple-files-id').onchange =
//             function (e) {
//                 getUploadUrls(uploadFiles(e.target.files))
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
function uploadFiles(files) {
	const snapshotPromises = [];

	files.forEach(file => {
		const ext = getExtension(file);

		if (isImage(ext)) {
			snapshotPromises.push(uploadImage(file, ext));
		} else if (isVideo(ext)) {
			snapshotPromises.push(uploadVideo(file, ext));
		} else console.error('Unrecognized file type: [' + file.name + ']');
	});

	return snapshotPromises;
}
function uploadFile(file) {
	let snapshotPromise = null;
	const ext = getExtension(file);

	if (isImage(ext)) {
		snapshotPromise = uploadImage(file, ext);
	} else if (isVideo(ext)) {
		snapshotPromise = uploadVideo(file, ext);
	} else console.error('Unrecognized file type: [' + file.name + ']');

	return snapshotPromise;
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

async function getUploadUrl(snapshotPromise) {
	const snapshot = await snapshotPromise;
	return snapshot.ref.getDownloadURL();
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
	return ['mp4', 'mov', 'flv', 'wmv', 'webm', 'mkv'].includes(
		ext.toLowerCase()
	);
}
