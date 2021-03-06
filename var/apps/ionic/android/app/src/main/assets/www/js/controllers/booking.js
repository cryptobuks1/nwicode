/**
 * Booking controller
 *
 * @author Nwicode SAS <dev@nwicode.com>
 * @version 4.16.11
 *
 */
angular.module("starter").controller("BookingController", function($scope, $rootScope, $stateParams, $translate, Booking, Customer, Dialog, Loader) {
    angular.extend($scope, {
        isLoading: false,
        value_id: $stateParams.value_id,
        formData: {},
        people: [],
        cardDesign: false,
        settings: {
            design: "list",
            datepicker: "single",
            date_format: "MM/DD/YYYY HH:mm",
        },
        dateTime: {
            date: $translate.instant("Date & time", "booking"),
            checkIn: $translate.instant("Checkin", "booking"),
            checkOut: $translate.instant("Checkout", "booking")
        }
    });
	Booking.setValueId($stateParams.value_id);
	$scope.coverSrc = function(cover) {
        return IMAGE_URL + "images/application" + cover;
    };
	$scope.loadContent = function() {
        $scope.isLoading = true; 
		Booking
		.findStores()
		.then(function(data) {
            $scope.populate(data);
        }).then(function() {
            $scope.isLoading = false;
        });
    };
	$scope.populate = function (data) {
        $scope.stores = data.stores;
        $scope.pageTitle = data.pageTitle;
        $scope.settings = data.settings;
        $scope.cardDesign = (data.settings.design === "card");

        if (Customer.isLoggedIn()) {
            $scope.formData.name = Customer.customer.firstname + " " + Customer.customer.lastname;
            $scope.formData.email = Customer.customer.email;
        }

        if ($scope.stores.length === 1) {
            $scope.formData.store = $scope.stores[0].id;
        }
    };
	$scope.clearForm = function () {
        $scope.formData = {};

        if ($scope.stores.length === 1) {
            $scope.formData.store = $scope.stores[0].id;
        }
    };
	$scope.submitForm = function() {
		const controller = document.querySelector('ion-alert-controller');
		var loaderText = $translate.instant("Sending request ...", "booking");
		Loader.show(loaderText);
		Booking
		.submitForm($scope.formData)
		.then(function(data) {
			controller.create({
					header: '',
					message: data.message,
					buttons: ['OK']
				}).then(alert => {
					alert.present();
				}),
				$scope.formData = {};
		}, function(data) {
			controller.create({
				header: '',
				message: data.message,
				buttons: ['OK']
			}).then(alert => {
				alert.present();
			});
		}).then(function() {
			Loader.hide();
		});
	};
	$scope.goCheckPeople = function() {
		const controller = document.querySelector('ion-alert-controller');
		inputp = [];
		for (var i in $scope.people) {
			inputp.push({
				type: 'radio',
				name: 'people',
				label: $scope.people[i],
				value: $scope.people[i]
			});
		}
		controller.create({
			header: $translate.instant('Number of people'),
			inputs: inputp,
			buttons: [{
				text: $translate.instant('Cancel'),
				role: 'cancel',
				cssClass: 'secondary',
				handler: () => {
					$scope.formData.people = "";
				}
			}, {
				text: $translate.instant('Ok'),
				handler: data => {
					$scope.formData.people = data;
				}
			}]
		}).then(alert => {
			alert.present();
		});
	};
	$scope.goCheckStore = function() {
		const controller = document.querySelector('ion-alert-controller');
		inputs = [];
		for (var s in $scope.stores) {
			inputs.push({
				type: 'radio',
				name: 'store',
				label: $scope.stores[s]['name'],
				value: $scope.stores[s]['name']
			});
		}
		controller.create({
			header: $translate.instant('Location'),
			inputs: inputs,
			buttons: [{
				text: $translate.instant('Cancel'),
				role: 'cancel',
				cssClass: 'secondary',
				handler: () => {
					$scope.formData.store = "";
				}
			}, {
				text: $translate.instant('Ok'),
				handler: data => {
					$scope.formData.store = data;
				}
			}]
		}).then(alert => {
			alert.present();
		});
	};
    $scope.loadContent();
}), angular.module("starter").factory("Booking", function($pwaRequest) {
    var factory = {
        value_id: null,
        extendedOptions: {},
        setValueId: function(value_id) {
            factory.value_id = value_id
        },
        setExtendedOptions: function(options) {
            factory.extendedOptions = options
        },
        findStores: function() {
            if (!this.value_id) return $pwaRequest.reject("[Factory::Booking.findStores] missing value_id");
            var payload = $pwaRequest.getPayloadForValueId(factory.value_id);
            return !1 !== payload ? $pwaRequest.resolve(payload) : $pwaRequest.get("booking/mobile_view/find", angular.extend({
                urlParams: {
                    value_id: this.value_id
                }
            }, factory.extendedOptions))
        },
        submitForm: function(form) {
            if (!this.value_id) return $pwaRequest.reject("[Factory::Booking.submitForm] missing value_id");
            var data = {};
            for (var prop in form) data[prop] = form[prop];
            return data.value_id = this.value_id, data.version = "2", $pwaRequest.post("booking/mobile_view/post", {
                urlParams: {
                    value_id: this.value_id
                },
                data: data,
                cache: !1
            })
        }
    };
    return factory
});