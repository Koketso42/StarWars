/**
 *  @author: Koketso Gift Matlhatsi
 *  @technical-support:
 *      email: Koketso42@gmail.com
 *      phone: 071 530 2436
 *
 *  @page-info:
 *
 *      Reusable helper methods
 */

function CallGetServive($http, ServiceEndPoint, callBack) {

	$http({
		method: 'GET',
		url: ServiceEndPoint
	}).then(function successCallBack(response) {

		callBack(response);
	}, function errorCallBack(response) {

		callBack(null);
	});
}

function CallPostServive($http, ServiceEndPoint, callBack) {

	$http({
		method: 'POST',
		url: ServiceEndPoint
	}).then(function successCallBack(response) {

		callBack(response);
	}, function errorCallBack(response) {

		callBack(null);
	});
}

function showLoading($ionicLoading) {

    $ionicLoading.show({
        template: '<ion-spinner></ion-spinner><p>Please Wait...</p>',
        duration: 1000
    }).then(function () {

    });
}

function hideLoading($ionicLoading) {
    $ionicLoading.hide().then(function () {

    });
}
