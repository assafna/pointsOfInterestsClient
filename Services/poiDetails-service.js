angular.module('poiApp')
.service('reviews', ['$http', 'localStorageService', function($http, localStorageService) {
    let serverUrl = 'http://localhost:3000/';

    self.setPoi = function(id){
        //$http.get(serverUrl, 'poi/PointOfInterstInfoById/:' + id)
        pois = localStorageService.get('AllPois');
        for(let i = 0; i < pois.length; i++){
            if(pois[i].poiInfo.POI_id == id)
                self.poi = pois[i];
        }
    }
}])