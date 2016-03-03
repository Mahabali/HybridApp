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
        console.log(" "+_globalUser.password + "==" + JSON.stringify(password))
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
               console.log("response doc " + JSON.stringify(doc));
                var address;
                var user = {
                    "email":doc.email,
                    "password":doc.password,
                    "firstName":doc.firstName,
                "lastName":doc.lastName,
                "mobile":doc.mobile,
                _rev:doc._rev
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
                  console.log("response user " + JSON.stringify(user));
                 callback(user);
            }));
    }
    ;

    function setGlobalSettings(user) {
        console.log("Global rev "+_globalUser._rev);
         var userDocument = {
            "_id": "globalSettings",
            "_rev":_globalUser._rev,
            "email": user.email,
            "password": user.password,
            "firstName":user.firstName,
            "lastName":user.lastName,
             "mobile":user.mobile,
            "address":{
            "street":user.address.street,
            "city":user.address.city,
            "state":user.address.state,
            "zip":user.address.zip
        }
        };
        _globalUser = userDocument;
   console.log("save response " + JSON.stringify(_globalUser));        
        return $q.when(_db.put(userDocument).then(function (response) {
            // handle response
            console.log("save response " + JSON.stringify(response));
        }).catch(function (err) {
            console.log(JSON.stringify(err));
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