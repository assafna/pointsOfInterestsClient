angular.module('poiApp')
.service('favouriteList', ['$http', 'localStorageService', function($http, localStorageService) {
    
    this.add = function(id){
        let favList = localStorageService.get('favouritePOIS');
        let allPois = localStorageService.get('allPOI');
        for(let i = 0; i < allPois.length; i++){
            if(allPois[i].poiInfo.POI_id == id){
                favList.push(allPois[i]);
                favList[favList.length - 1].poiInfo.AddDate = new Date().setHours(0, 0, 0, 0);;
                favList[favList.length - 1].checked = true;
                if(favList.length > 1)
                    favList[favList.length - 1].poiInfo.POI_order = favList[favList.length - 2].poiInfo.POI_order + 1;
                else
                    favList[favList.length - 1].poiInfo.POI_order = 0;


                break;
            }
        }
        localStorageService.remove('favouritePOIS');
        localStorageService.set('favouritePOIS', favList);
    }
    
    this.remove = function(id){
        let favList = localStorageService.get('favouritePOIS');
        for(let i = 0; i < favList.length; i++){
            if(favList[i].poiInfo.POI_id == id){
                favList.splice(i,1);
                break;
            }
        }
        localStorageService.remove('favouritePOIS');
        localStorageService.set('favouritePOIS', favList);
    }

    this.contains = function(id){
        let favList = localStorageService.get('favouritePOIS');
        if(favList == null)
            return false;
        for(let i = 0; i < favList.length; i++){
            if(favList[i].poiInfo.POI_id == id)
                return true;
        }
        return false;
    }
   


}])