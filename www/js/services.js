/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('Cingo.services', []).factory('DBService', ['$q', DBService]);
function DBService($q) {
    var _db;
    var _globalUser;
    return {
        initDB: initDB,
        addUser: addUser,
        getGlobalSettings: getGlobalSettings,
        setGlobalSettings: setGlobalSettings,
        checkIfPasswordChanged: checkIfPasswordChanged
    };

    function initDB() {
        // Creates the database or opens if it already exists
        _db = new PouchDB('Cingo', {adapter: 'websql'});
    }
    ;
    function checkIfPasswordChanged(password){
        console.log(" "+_globalUser.password + "==" + password)
        if (_globalUser.password === password){
            return true;
        }
        else{
            return false;
        }
    }
    function addUser(user) {
        var userDocument = {
            "_id": "globalSettings",
            "email": user.email,
            "password": user.password
        };
        return $q.when(_db.put(userDocument).then(function (response) {
            // handle response
            console.log("response " + JSON.stringify(response));
        }).catch(function (err) {
            console.log(err);
        }));

    }
    ;

    function onDatabaseChange(change) {
       
    };


    function getGlobalSettings(callback) {
   
        return $q.when(_db.get('globalSettings', function (err, doc) {
                if (err) {
                    return console.log(err);
                }
               
                var address;
                var user = {
                    "email":doc.email,
                    "password":doc.password,
                    "firstName":doc.firstName,
                "lastName":doc.lastName
                }
                if (doc.address === undefined){
                   address  =  {
                "street":"",
                "city":"",
                "state":"",
                "zip":""
            } 
                }
                else{
                     address =  {
                "street":doc.address.street,
                "city":doc.address.city,
                "state":doc.address.state,
                "zip":doc.address.zip
            } 
          
                }
                 user.address = address;
                 _globalUser = user
                  console.log("response " + JSON.stringify(user));
                 callback(user);
            }));
    }
    ;

    function setGlobalSettings(user) {
         var userDocument = {
            "_id": "globalSettings",
            "email": user.email,
            "password": user.password,
            "firstName":user.firstName,
            "lastName":user.lastName,
            "address":{
            "street":stringValue(user.address.street),
            "city":stringValue(user.address.city),
            "state":stringValue(user.address.state),
            "zip":stringValue(user.address.zip)
        }
        };
        _globalUser = userDocument;
        return $q.when(_db.put(userDocument).then(function (response) {
            // handle response
            console.log("response " + JSON.stringify(response));
        }).catch(function (err) {
            console.log(err);
        }));

    }
    ;
    
    function userObject(){
      var user = {
                    "email":"",
                    "password":"",
                    "firstName":"",
                "lastName":"",
                "address":{
                "street":"",
                "city":"",
                "state":"",
                "zip":""
            }
    }
    return user;
};

}