/**
 *  @author: Koketso Gift Matlhatsi
 *  @technical-support:
 *      email: Koketso42@gmail.com
 *      phone: 071 530 2436
 *
 *  @page-info:
 *
 *
 */

rootController.controller('PeopleController', function($state, $scope, $timeout, $http, $ionicLoading) {

    var pageNumber = window.globals.pageNumber;

    var ListOfSpeices = [];

    $scope.previousPageURL = null;
    $scope.nextPageURL = null;

    function loadPeople(page) {

        var address = window.globals.baseAddress;
        var method = window.globals.webMethods.people;
        var param = "/?page=" + page;

        var ServiceEndPoint = address + method + param;

        CallGetServive($http, ServiceEndPoint, function(response) {

            showLoading($ionicLoading);

            if (response != null && response.data.results != "") {

                $scope.peopleList = response.data.results;

                //push specie object into the existing objects
                for(var x=0; x<$scope.peopleList.length; x++) {

                    $scope.peopleList[x].specieObj = null; // set defaults to null
                }

                $scope.previousPageURL = response.data.previous;
                $scope.nextPageURL = response.data.next;
            }
        });
    }

    loadPeople(pageNumber);

    $scope.personDetails = function(theObj) {

        $state.go('app.person', { 'context': angular.toJson(theObj) });
    };

    $scope.getSpecies = function(url, index) {

        CallGetServive($http, url, function(response) {

            if (response != null && response.data != "") {

                $scope.peopleList[index].specieObj = response.data;
            }
        });
    };

    $scope.loadPageData = function(url, isNextPage) {

        CallGetServive($http, url, function(response) {

            showLoading($ionicLoading);

            if (response != null && response.data.results != "") {

                $scope.peopleList = response.data.results;
                $scope.previousPageURL = response.data.previous;
                $scope.nextPageURL = response.data.next;

                //keep track of change page
                if(isNextPage) {
                    window.globals.pageNumber += 1;
                } else {
                    window.globals.pageNumber -= 1;
                }
            }
        });
    };
});

rootController.controller('PersonController', function($state, $stateParams, $scope, $timeout, $http, $ionicPopup, $ionicLoading) {

    $scope.personObj = JSON.parse($stateParams.context);

    $scope.homeWorld = function(url) {

        CallGetServive($http, url, function(response) {

            showLoading($ionicLoading);

            if (response != null && response.data != "") {

                $scope.specieObj = response.data;

                $ionicPopup.show({
                    title: 'System Details',
                    scope: $scope,
                    template: `
                        <div class="no-spacing">
                            <p class="bold">Name</p>
                            <p class="normal">{{ specieObj.name }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Rotation Period</p>
                            <p class="normal">{{ specieObj.rotation_period }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Orbital Period</p>
                            <p class="normal">{{ specieObj.orbital_period }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Diameter</p>
                            <p class="normal">{{ specieObj.diameter }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Climate</p>
                            <p class="normal">{{ specieObj.climate }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Gravity</p>
                            <p class="normal">{{ specieObj.gravity }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Terrain</p>
                            <p class="normal">{{ specieObj.terrain }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Surface Water</p>
                            <p class="normal">{{ specieObj.surface_water }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Population</p>
                            <p class="normal">{{ specieObj.population }}</p>
                        </div>
                    `,
                    buttons: [
                        { text: 'OK', type: 'button-dark' }
                    ]
                }).then(function(res) {

                });
            }
        });
    };

    $scope.species = function(url) {

        showLoading($ionicLoading);

        CallGetServive($http, url, function(response) {

            if (response != null && response.data != "") {

                $scope.specieObj = response.data;

                $ionicPopup.show({
                    title: 'System Details',
                    scope: $scope,
                    template: `
                        <div class="no-spacing">
                            <p class="bold">Name</p>
                            <p class="normal">{{ specieObj.name }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Classification</p>
                            <p class="normal">{{ specieObj.classification }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Designation</p>
                            <p class="normal">{{ specieObj.designation }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Average Height</p>
                            <p class="normal">{{ specieObj.average_height }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Skin Colors</p>
                            <p class="normal">{{ specieObj.skin_colors }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Hair Colors</p>
                            <p class="normal">{{ specieObj.hair_colors }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Language</p>
                            <p class="normal">{{ specieObj.language }}</p>
                        </div>
                    `,
                    buttons: [
                        { text: 'OK', type: 'button-dark' }
                    ]
                }).then(function(res) {

                });
            }
        });
    };

    $scope.starships = function(url) {

        showLoading($ionicLoading);

        CallGetServive($http, url, function(response) {

            if (response != null && response.data != "") {

                $scope.specieObj = response.data;

                $ionicPopup.show({
                    title: 'System Details',
                    scope: $scope,
                    template: `
                        <div class="no-spacing">
                            <p class="bold">Name</p>
                            <p class="normal">{{ specieObj.name }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Model</p>
                            <p class="normal">{{ specieObj.model }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Manufacturer</p>
                            <p class="normal">{{ specieObj.manufacturer }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Cost In Credits</p>
                            <p class="normal">{{ specieObj.cost_in_credits }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Length</p>
                            <p class="normal">{{ specieObj.length }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Max Atmosphering Speed</p>
                            <p class="normal">{{ specieObj.max_atmosphering_speed }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Crew</p>
                            <p class="normal">{{ specieObj.crew }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Passengers</p>
                            <p class="normal">{{ specieObj.passengers }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Cargo Capacity</p>
                            <p class="normal">{{ specieObj.cargo_capacity }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Consumables</p>
                            <p class="normal">{{ specieObj.consumables }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Hyperdrive Rating</p>
                            <p class="normal">{{ specieObj.hyperdrive_rating }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">MGLT</p>
                            <p class="normal">{{ specieObj.MGLT }}</p>
                        </div>
                        <div class="no-spacing">
                            <p class="bold">Starship Class</p>
                            <p class="normal">{{ specieObj.starship_class }}</p>
                        </div>
                    `,
                    buttons: [
                        { text: 'OK', type: 'button-dark' }
                    ]
                }).then(function(res) {

                });
            }
        });
    };
});
