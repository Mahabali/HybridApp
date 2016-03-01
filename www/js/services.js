/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('Cingo.services',[]).factory('DBService', ['$q', DBService]);
function DBService($q) {  
    var _db;    

    // We'll need this later.
    var _users;

    return {
        initDB: initDB,

        // We'll add these later.
        getAllUsers: getAllUsers,
        addUser: addUser,
        getGlobalSettings: getGlobalSettings,
        setGlobalSettings:setGlobalSettings
    };

    function initDB() {
        // Creates the database or opens if it already exists
        _db = new PouchDB('Cingo', {adapter: 'websql'});
    };
    
    function addUser(user) { 
        var userDocument ={
          "_id":"loginId",
          "email":user.email,
          "password":user.password
        };
      return $q.when(_db.put(userDocument).then(function (response) {
  // handle response
  console.log("response "+JSON.stringify(response));
}).catch(function (err) {
  console.log(err);
}));
};

function getAllUsers() {  
//    if (!_users) {
//       return $q.when(_db.allDocs({ include_docs: true}))
//            .then(function(docs) {
//
//                // Each row has a .doc object and we just want to send an 
//                // array of birthday objects back to the calling controller,
//                // so let's map the array to contain just the .doc objects.
//                _users = docs.rows.map(function(row) {
//                    // Dates are not automatically converted from a string.
//                    row.doc.Date = new Date(row.doc.Date);
//                    return row.doc;
//                });
//
//                // Listen for changes on the database.
//                _db.changes({ live: true, since: 'now', include_docs: true})
//                   .on('change', onDatabaseChange);
//                   
//                return _users;
//            });
//    } else {
//        // Return cached data as a promise
//        return $q.when(_users);
//    }
console.log("getallusers");
     if (!_users) {
    return $q.when(_db.get('loginId', function(err, doc) {
  if (err) { return console.log(err); }
  _users = doc;
  console.log(JSON.stringify(_users));
  return _users;
  
}));


    }
    else{
        return _users;
    }
};

function onDatabaseChange(change) {  
    var index = findIndex(_users, change.id);
    var user = _users[index];

    if (change.deleted) {
        if (user) {
            _users.splice(index, 1); // delete
        }
    } else {
        if (user && user._id === change.id) {
            _users[index] = change.doc; // update
        } else {
            _users.splice(index, 0, change.doc) // insert
        }
    }
};

// Binary search, the array is by default sorted by _id.
function findIndex(array, id) {  
    var low = 0, high = array.length, mid;
    while (low < high) {
    mid = (low + high) >>> 1;
    array[mid]._id < id ? low = mid + 1 : high = mid
    }
    return low;
};

function getGlobalSettings(){
    
};

function setGlobalSettings(globalSettings){
    
};
}