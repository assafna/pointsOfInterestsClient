angular.module("poiApp")
    .service('localStorageModel', ['localStorageService', function(localStorageService) {

        var self=this;

        self.addToLocalStorage = function (key, value) {
            var dataVal = localStorageService.get(key);
            console.log(dataVal)
            if (!dataVal)
            if (localStorageService.set(key, value)) {
                console.log("data added")
            }
            else
                console.log('failed to add the data');
        }



        self.getFromLocalStorage= function (key)
        {
           return  localStorageService.get(key)
        }

        self.updateLocalStorage = function (key,value)
        {
            localStorageService.remove(key);
            localStorageService.set(key,value);
        }



    }]);