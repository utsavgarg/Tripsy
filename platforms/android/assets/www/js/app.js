// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var modState="origin";
angular.module('starter', ['ionic','ionic-datepicker'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('admin', {
      url: '/admin',
      templateUrl: 'templates/admin.html',
      controller:'ListController'
    })

    .state('newEmp', {
      url: '/newEmp',
      templateUrl:'templates/newEmp.html'
    })

    .state('hotel', {
      url: '/hotel',
      templateUrl: 'templates/hotel.html',
      controller:'hotelCtrl'
    })

    .state('loyalties', {
      url: '/admin/loyalties',
      templateUrl: 'templates/admin_loyalties.html',
      controller:'ListController'
    })

    .state('login', {
    url: '/login',
    templateUrl:'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('adminLogin',{
    url:'/adminLogin',
    templateUrl:'templates/admin-login.html',
    controller:'adminLoginCtrl'
  })
  .state('forgotPassword',{
    url:'/forgotPassword',
    templateUrl:'templates/forgotPassword.html',
    controller:'forgotPasswordCtrl'
  })

   .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
   .state('app.See', {
    url: '/See',
    views: {
      'menuContent': {
        templateUrl: 'templates/See.html'
      },
   }})

   .state('app.Eat', {
    url: '/Eat',
    views: {
      'menuContent': {
        templateUrl: 'templates/Eat.html'
      }
   }})

   .state('app.Do', {
    url: '/See',
    views: {
      'menuContent': {
        templateUrl: 'templates/Do.html'
      }
   }})

  .state('app.flight', {
    url: '/flight',
    views: {
      'menuContent': {
        templateUrl: 'templates/flight.html',
        controller: 'flightCtrl'
      }
    }
  })

  .state('app.flight_search',{
    url:'/flight/search',
    views:{
      'menuContent':{ 
        templateUrl:'templates/flight_search.html'
      }
    }
  })
    .state('app.cabs',{
      url: '/cabs',
      views:{
        'menuContent':{
          templateUrl: 'templates/cabs.html',
          controller: 'cabCtrl'
        }
      }
    })

    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

   $urlRouterProvider.otherwise('/login');
  })


.controller('ListController', ['$scope', '$http', '$state','$ionicModal',
    function($scope, $http, $state, $ionicModal) {
    $http.get('js/data.json').success(function(data) {
      $scope.Emp = data.employee;
      console.log($scope.Emp);
      $scope.whichEmp=$state.params.aId;
      $scope.data = { showDelete: false, showReorder: false };

      $ionicModal.fromTemplateUrl('contact-modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.modal = modal;
        })  

        $scope.openModal = function() {
          $scope.modal.show();
        }

        $scope.closeModal = function() {
          $scope.modal.hide();
        //   $("here").append(' <ion-item class="item-avatar-left item-text-wrap item-avatar-right" id="here">
        //     <img ng-src="http://placehold.it/100x100" alt="{{item.Emp}} Photo">
        // <h2 class="title" id="Emp_name"></h2>
        // <h3 class="title" id="Emp_code"></h3>
        // <span class="badge badge-{{Emp_color}}">{{Emp_class}}</span>
        //  </ion-item> ');
        };

        $scope.$on('$destroy', function() {
          $scope.modal.remove();
        });

      $scope.onItemDelete = function(dayIndex, item) {
        $scope.Emp[dayIndex].schedule.splice($scope.Emp[dayIndex].schedule.indexOf(item), 1);
      }

      $scope.doRefresh =function() {
      $http.get('js/data.json').success(function(data) {
          $scope.Emp = data.Emp;
          $scope.$broadcast('scroll.refreshComplete');
        });
      }


    $scope.adminLogout=function(){
    $state.go("adminLogin");    
  }

      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }

      $scope.loyal = function(){
        $state.go('loyalties');
      }
      
      $scope.moveItem = function(item, fromIndex, toIndex) {
        $scope.Emp.splice(fromIndex, 1);
        $scope.Emp.splice(toIndex, 0, item);
      };

      $scope.newEmp = function(){
        $state.go('newEmp');
      };

      $scope.submit= function(){
        $http.get('js/data.json').success(function(data){
          $scope.releases = data.employee;
        })
        $scope.save = function() {
          if($scope.EmpClassS){
            $scope.EmpClass = 'Silver';
            $scope.EmpColor = 'stable';
          }
          else if ($scope.EmpClassG){
            $scope.EmpClass = 'Gold';
            $scope.EmpColor = 'energized';
          }
          else if ($scope.EmpClassP){
            $scope.EmpClass = 'Platinum';
            $scope.EmpColor = 'dark';
          };
          $scope.array = '"EmpName": "'+$EmpName + ' ", ' +
                          '"EmpCode": '+ $EmpCode +','+
                          '"EmpEmail": "'+ $EmpEmail +' ", '+
                           '"class": "' + $EmpClass + '",' +
                            '"color": "' + $EmpColor + '"';
          $http.post('js/data.json', $scope.array).then(function(data) {
          $scope.msg = 'Data saved';
          console.log($scope.msg);
        });
      };
    };


    });
}])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $ionicSideMenuDelegate) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  

  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.originModal = function() {
    modState="origin";
    $scope.modal.show();
  };
  $scope.closeOriginModal = function() {
    $scope.modal.hide();
  }

  $scope.destinationModal=function(){
    modState="destination";
    $scope.modal.show();
  }

  $scope.onFlight=function(){
    $state.go("app.flight");
    $ionicSideMenuDelegate.toggleLeft();
  }

  $scope.onHotel=function (){
        console.log("check");
        $state.go("hotel");
        $ionicSideMenuDelegate.toggleLeft();
      }

  $scope.onSee=function(){
    $state.go("app.See");    
    $ionicSideMenuDelegate.toggleLeft();
  }

  $scope.logout=function(){
    $state.go("login");    
    document.getElementById('emailUser').value=null;
    document.getElementById('passwordUser').value=null;
  }



  $scope.onEat=function(){
    $state.go("app.Eat");    
    $ionicSideMenuDelegate.toggleLeft();
  }

  $scope.onDo=function(){
    $state.go("app.Do");    
    $ionicSideMenuDelegate.toggleLeft();
  }

  $scope.onDash=function(){
    $state.go("app.playlists");
    $ionicSideMenuDelegate.toggleLeft();
  }

  $scope.onCab = function(){
    $state.go('app.cabs');
    $ionicSideMenuDelegate.toggleLeft();
  }

  $scope.noIn=function(){
    document.getElementById('inDate').disabled=true;
  }

  $scope.In=function(){
    document.getElementById('inDate').disabled=false;
  }


  $scope.datepickerObject = { 
      titleLabel: 'Select Date',  //Optional
      closeLabel: 'Close',  //Optional
      closeButtonType : 'button-calm',  //Optional
      //templateType: 'popup', //Optional
      from: new Date(2012, 8, 2),   //Optional
      to: new Date(2018, 8, 25),
      callback: function (val) {    //Mandatory
        datePickerCallback(val);
      }
    }

  var datePickerCallback = function (val) {
  if (typeof(val) === 'undefined') {
    console.log('No date selected');
  } else {
    document.getElementById('outDate').innerHTML=val.toString().substring(0,15);
  }
}

$scope.DatepickerObject = { 
      titleLabel: 'Select Date',  //Optional
      closeLabel: 'Close',  //Optional
      closeButtonType : 'button-calm',  //Optional
      //templateType: 'popup', //Optional
      from: new Date(2012, 8, 2),   //Optional
      to: new Date(2018, 8, 25),
      callback: function (val) {    //Mandatory
        DatePickerCallback(val);
      }
    }

  var DatePickerCallback = function (val) {
  if (typeof(val) === 'undefined') {
    console.log('No date selected');
  } else {
    document.getElementById('inDate').innerHTML=val.toString().substring(0,15);
  }
};



})

.controller('flightCtrl', function($scope, $state){
  $scope.onSubmit = function(){
    $state.go('app.flight_search');
  };
})

.controller('cabCtrl', function(myservice ,$rootScope,$scope, $state){
  $scope.myservice = myservice;
  $scope.onBook = function(){
    console.log("onBook");
    myservice.cardVisible=true;
    $state.go('app.playlists');
    
  };
  
})

.controller('hotelCtrl', ['$scope', '$http', '$state', '$ionicSideMenuDelegate', 
    function($scope, $http, $state,filterFilter) {
      $scope.onHotel=function (){
        console.log("check");
        $state.go("hotel");
        $ionicSideMenuDelegate.toggleLeft();
        
      }
      $http.get('js/data.json').success(function(data) {
      $scope.home = data.hotel;
      $scope.hey = data.hotel.hotels;
      console.log($scope.home);
      $scope.whichEmp=$state.params.aId;
      $scope.data = { showDelete: false, showReorder: false };

      $scope.log = function(){
        console.log($scope.Hcountry);
      };

      $scope.filterCountries=function(){
        $scope.filteredArray = filterFilter($scope.hotels.country,$scope.Hcountry);
      }
  })


}])

.controller('HomeTabCtrl', function($scope,filterFilter) {
  
    $scope.countries = [
            {name: 'Afghanistan', code: 'AF'},
            {name: 'Aland Islands', code: 'AX'},
            {name: 'Albania', code: 'AL'},
            {name: 'Algeria', code: 'DZ'},
            {name: 'American Samoa', code: 'AS'},
            {name: 'AndorrA', code: 'AD'},
            {name: 'Angola', code: 'AO'},
            {name: 'Anguilla', code: 'AI'},
            {name: 'Antarctica', code: 'AQ'},
            {name: 'Barbados', code: 'BB'},
            {name: 'Belarus', code: 'BY'},
            {name: 'Belgium', code: 'BE'},
            {name: 'Belize', code: 'BZ'},
            {name: 'Benin', code: 'BJ'},
            {name: 'Bermuda', code: 'BM'},
            {name: 'Bhutan', code: 'BT'},
            {name: 'Bolivia', code: 'BO'}
    ];
  
  
  $scope.filterCountries=function(){
   var temp=document.getElementById('search').value;
   $scope.filteredArray = filterFilter($scope.countries, {name:temp});   
    document.getElementById(modState).innerHTML=$scope.filteredArray[0].name;
  };
  })

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('PlaylistsCtrl', function(myservice ,$rootScope,$scope, $http, $state) {
    $scope.myservice = myservice;

    $http.get('http://api.openweathermap.org/data/2.5/weather?q=Singapore&mode=json&units=metric&cnt=7').success(function(data) {

      document.getElementById('city').innerHTML=data.name;
      document.getElementById('minTemp').innerHTML="Min. Temp.: "+data.main.temp_min+"&#176  C";
      document.getElementById('maxTemp').innerHTML="Max. Temp.: "+data.main.temp_max+"&#176  C";
      document.getElementById('sky').innerHTML=data.weather[0].main;
      document.getElementById('curTemp').innerHTML=data.main.temp+"&#176  C";      
      document.getElementById('icon').src="http://openweathermap.org/img/w/"+data.weather[0].icon+".png";

      

    });

    $scope.onFlight=function(){
    $state.go("app.flight");
  }
  

  $scope.onCab = function(){
    $state.go('app.cabs');
  }

  }
)

.service('myservice', function(){
  this.cardVisible=false;
})

.controller('LoginCtrl', function($scope, $state) {
  $scope.isInValid = false;
  $scope.user={};
  $scope.adminLogin = function(){
    $state.go('adminLogin');
  };
  $scope.forgotPassword = function(){
    $state.go('forgotPassword');
  };
  $scope.login = function(){
    if($scope.user.email== null || $scope.user.password == null){
      $scope.isInValid = true;
    }else if($scope.user.email === "user1@abc.com" && $scope.user.password === "user1"){
        $scope.isInValid=false;
        $state.go('app.playlists');
    }else{
      $scope.isInValid = true;
    }
  }
})
.controller('adminLoginCtrl', function($scope, $state) {
  $scope.isAdminInvalid = false;
  $scope.admin = {};
  $scope.adminLogin = function(){
    if($scope.admin.username== null || $scope.admin.password == null){
      $scope.isAdminInvalid = true;
    }else if($scope.admin.username === "admin1" && $scope.admin.password === "admin1"){
        $scope.isAdminInvalid=false;
        $state.go('admin');
    }else{
      $scope.isAdminInvalid = true;
    }
    if($scope.isAdminInvalid == false){
      $state.go('admin');
    }
    console.log($scope.admin.username);
  }

})


.controller('forgotPasswordCtrl', function($scope){})
.run(function($ionicPlatform, $httpBackend) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  })
})

