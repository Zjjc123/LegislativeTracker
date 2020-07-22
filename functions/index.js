const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.update = functions.firestore
    .document('update/{update}')
    .onUpdate((change, context) => {

        console.log("pog");

});
