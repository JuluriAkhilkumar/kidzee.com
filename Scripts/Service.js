var serapp = angular.module('cmsServices', []);

var ProjectId = '1';
var WebPath = 'https://localhost:44397/';

serapp.service('API', ['$http', function($http, $scope) {

    this.Get = function(url, obj) {
        return $http({
            url: url,
            dataType: 'json',
            method: 'Get',
            params: {
                param1: angular.toJson(obj, false)
            },
            headers: {
                "Content-Type": "application/json"
            }
        });
    };
    this.Post = function(url, obj) {
        return $http({
            url: url,
            dataType: 'json',
            method: 'POST',
            data: angular.toJson(obj, false),
            headers: {
                "Content-Type": "application/json"
            }
        });
    };
    this.Setnullarray = function(obj) {
        var result;
        if (!angular.isUndefined(obj) && obj != null) {
            if (angular.isUndefined(obj.length)) {
                var temp = [];
                temp[0] = obj;
                //data = "";
                result = temp;
                temp = null;
            } else {
                result = obj;
            }
        }
        return result;
    };
    this.ExcelReporting1 = function(val, Id, table) {
        var dt = new Date();
        var time = dt; //dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
        $("#rpt").html('');
        $("#rpt").append($("#" + Id).html());
        $("#rpt").find('.hidenoExl').remove();
        $("#rpt").table2excel({
            exclude: ".noExl",
            name: "Excel Document Name",
            filename: val + '_' + time,
            fileext: ".xls",
            sheetname: table,
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true
        });
    }
    this.readServerProperty = function(key) {
        return $http.get('/WebRoute/settings/' + key);
    }
    this.GetClientIPAddress = function() {
        return $http.get('/WebRoute/GetClientIPAddress');
    }

}]);

function setCookie(cname, cvalue) {
    var d = new Date();
    var exdays = 30;
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + exdays + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteAllCookies() {
    var cookies = document.cookie.split("; ");
    for (var c = 0; c < cookies.length; c++) {
        var d = window.location.hostname.split(".");
        while (d.length > 0) {
            var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
            var p = location.pathname.split('/');
            document.cookie = cookieBase + '/';
            while (p.length > 0) {
                document.cookie = cookieBase + p.join('/');
                p.pop();
            };
            d.shift();
        }
    }
}

serapp.directive('bindHtmlUnsafe', function($compile) {
    return function($scope, $element, $attrs) {

        var compile = function(newHTML) { // Create re-useable compile function
            newHTML = $compile(newHTML)($scope); // Compile html
            $element.html('').append(newHTML); // Clear and append it
        };

        var htmlName = $attrs.bindHtmlUnsafe; // Get the name of the variable 
        // Where the HTML is stored

        $scope.$watch(htmlName, function(newHTML) { // Watch for changes to 
            // the HTML
            if (!newHTML) return;
            compile(newHTML); // Compile it
        });

    };
});
serapp.service('ngCopy', ['$window', function($window) {
    var body = angular.element($window.document.body);
    var textarea = angular.element('<textarea/>');
    textarea.css({
        position: 'fixed',
        opacity: '0'
    });

    return function(toCopy) {
        textarea.val(toCopy);
        body.append(textarea);
        textarea[0].select();

        try {
            var successful = document.execCommand('copy');
            if (!successful) throw successful;
        } catch (err) {
            window.prompt("Copy to clipboard: Ctrl+C, Enter", toCopy);
        }

        textarea.remove();
    }
}]);
serapp.directive('ngClickCopy', ['ngCopy', function(ngCopy) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function(e) {
                ngCopy(attrs.ngClickCopy);
            });
        }
    }
}]);
serapp.directive("compareTo", function() {
    return {
        require: "ngModel",
        scope: {
            confirmPassword: "=compareTo"
        },
        link: function(scope, element, attributes, modelVal) {
            modelVal.$validators.compareTo = function(val) {
                return val == scope.confirmPassword;
            };
            scope.$watch("confirmPassword", function() {
                modelVal.$validate();
            });
        }
    };
});
serapp.filter('trusted', ['$sce', function($sce) {
    return function(url) {
        //var video_id = url.split('v=')[1].split('&')[0];
        //return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + video_id);
        return $sce.trustAsResourceUrl(url);
    };
}]);
serapp.directive('numbersOnly', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
serapp.directive('allowDecimalNumbers', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs, ctrl) {
            elm.on('keyup', function(event) {
                if (event.which != 9 && event.which != 16) {
                    var $input = $(this);
                    var value = $input.val();
                    value = value.replace(/[^0-9\.]/g, '')
                    var findsDot = new RegExp(/\./g)
                    var containsDot = value.match(findsDot)
                    if (containsDot != null && ([46, 110, 190].indexOf(event.which) > -1)) {
                        event.preventDefault();
                        return false;
                    }
                    $input.val(value);
                    if (event.which == 64 || event.which == 16) {
                        // numbers  
                        return false;
                    }
                    if ([8, 13, 27, 37, 38, 39, 40, 110].indexOf(event.which) > -1) {
                        // backspace, enter, escape, arrows  
                        return true;
                    } else if (event.which >= 48 && event.which <= 57) {
                        // numbers  
                        return true;
                    } else if (event.which >= 96 && event.which <= 105) {
                        // numpad number  
                        return true;
                    } else if ([46, 110, 190].indexOf(event.which) > -1) {
                        // dot and numpad dot  
                        return true;
                    } else {
                        event.preventDefault();
                        return false;
                    }
                }
            });
        }
    }
});
serapp.directive('bsTooltip', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(element).hover(function() {
                element.tooltip('destroy');
                // on mouseenter
                //$(element).tooltip('show');
                $(element)
                    .tooltip({
                        html: true,
                        animation: true,
                        container: 'body'
                    })
                    .each(function() {
                        $(this).tooltip('show');
                    });

            }, function() {
                // on mouseleave

                $(element).tooltip('hide');
            });

            $(element).on('click', function() {
                $(element).tooltip('hide');
            });
            element.on('$destroy', function() {
                element.tooltip('destroy');
                //delete attrs.$$observers['title'];
            });
        }

    };
});
serapp.directive('bootstrapSelect2', function() {
    return {
        restrict: 'A',
        scope: {
            'selectWidth': '@',
            'ngModel': '='
        },
        link: function(scope, element, attrs) {
            //Setting default values for attribute params
            scope.selectWidth = scope.selectWidth || 200;
            element.select2({
                width: scope.selectWidth,
            });

            scope.$watch('ngModel', function(newVal, oldVal) {
                window.setTimeout(function() {
                    element.select2("val", newVal);
                });
            });
        }
    };
});
serapp.directive('uploadFiles', function() {
    return {
        scope: true, //create a new scope
        link: function(scope, el, attrs) {
            el.bind('change', function(event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0; i < files.length; i++) {
                    //emit event upward
                    scope.$emit("seletedFile", {
                        file: files[i]
                    });
                }
            });
        }
    };
});
serapp.directive('chars', ['$timeout', function($timeout) {
    'use strict';
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, $elem, attrs, $ctrl) {

            var regReplace,
                preset = {
                    'only-numbers': '0-9',
                    'numbers': '0-9\\s',
                    'only-letters': 'A-Za-z',
                    'letters': 'A-Za-z\\s',
                    'email': '\\wÑñ@._\\-',
                    'alpha-numeric': '\\w\\s',
                    'latin-alpha-numeric': '\\w\\sÑñáéíóúüÁÉÍÓÚÜ´¨'
                },
                filter = preset[attrs.chars] || attrs.chars;

            $elem.on('input keyup change', function() {

                var val = $elem.val().toString();

                regReplace = new RegExp('[^' + filter + ']', 'ig');
                $ctrl.$setViewValue(val.replace(regReplace, ''));
                $timeout(function() {

                    $ctrl.$render();

                });

            });

        }
    };

}]);
serapp.directive('compile', ['$compile', function($compile) {
    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                // watch the 'compile' expression for changes
                return scope.$eval(attrs.compile);
            },
            function(value) {
                // when the 'compile' expression changes
                // assign it into the current DOM
                element.html(value);

                // compile the new DOM and link it to the current
                // scope.
                // NOTE: we only compile .childNodes so that
                // we don't get into infinite loop compiling ourselves
                $compile(element.contents())(scope);
            }
        );
    };
}])
serapp.directive('scrollToItem', function() {
    return {
        restrict: 'A',
        scope: {
            scrollTo: "@"
        },
        link: function(scope, $elm, attr) {

            $elm.on('click', function() {
                $('html,body').animate({
                    scrollTop: $(scope.scrollTo).offset().top
                }, "slow");
            });
        }
    }
})
var nowDate = new Date();
var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
serapp.directive('datepicker', function() {
    return {

        restrict: 'A',
        // Always use along with an ng-model
        require: '?ngModel',

        link: function(scope, element, attrs, ngModel) {
            if (!ngModel) return;

            ngModel.$render = function() {
                element.datepicker('update', ngModel.$viewValue || '');
            };

            element.datepicker().on("changeDate", function(event) {

                scope.$apply(function() {
                    ngModel.$setViewValue(event.date);

                });
            });
        }
    };
});
serapp.filter('dateFormat', function($filter) {
    return function(input) {
        if (input == null) {
            return "";
        }

        var _date = $filter('date')(new Date(input), 'dd MMM yyyy');

        return _date.toUpperCase();

    };
});
serapp.directive('errSrc', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('error', function() {
                if (attrs.src !== attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });

            attrs.$observe('ngSrc', function(value) {
                if (!value && attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    };
});
serapp.filter('unique', function() {
    return function(arr, field) {
        if (typeof(arr) != "undefined") {
            var o = {},
                i, l = arr.length,
                r = [];
            for (i = 0; i < l; i += 1) {
                o[arr[i][field]] = arr[i];
            }
            for (i in o) {
                r.push(o[i]);
            }
        }
        return r;
    };
});
serapp.directive('onFinishRender', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                scope.$evalAsync(attr.onFinishRender);
            }
        }
    }
});
serapp.service('Multiselect', function($http) {
    this.Outputstring = function(OutputArray, columnfield, seperator) {
        var str = seperator;
        if (OutputArray.length != 0) {
            for (var i = 0; i < OutputArray.length; i++) {
                if (columnfield != "")
                    str = str + OutputArray[i][columnfield] + seperator;
                else
                    str = str + OutputArray[i] + seperator;
            }
        } else {
            str = "";
        }
        return str
    };
    this.TickedArray = function(ScopeValue, OutputArray, seperator, columnfield) {
        if (ScopeValue != "") {
            var strr = ScopeValue.split(seperator);
            for (var i = 0; i < strr.length; i++) {
                if (strr[i] != "") {
                    for (var j = 0; j < OutputArray.length; j++) {
                        if (OutputArray[j][columnfield] == strr[i]) {
                            OutputArray[j].ticked = true;
                        }
                    }
                }
            }

        }
        return OutputArray;
    };
    this.SelectedTrueArray = function(ScopeValue, OutputArray, seperator, columnfield) {
        var data = [];
        if (ScopeValue != "") {
            var strr = ScopeValue.split(seperator);
            for (var i = 0; i < strr.length; i++) {
                if (strr[i] != "") {
                    for (var j = 0; j < OutputArray.length; j++) {
                        if (OutputArray[j][columnfield] == strr[i]) {
                            OutputArray[j].ticked = true;
                            data.push(OutputArray[j]);
                        }
                    }
                }
            }

        }
        return data;
    };
    this.SetTickedFalse = function(OutputArray) {
        for (var j = 0; j < OutputArray.length; j++) {
            OutputArray[j].ticked = false;
        }
        return OutputArray;
    };
});
serapp.filter('htmlToPlaintext', function() {
    return function(text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
});
serapp.filter('to_trusted', ['$sce', function($sce) {
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}])
serapp.directive('googlePlaces', function() {
    return {
        restrict: 'E',
        replace: true,
        // transclude:true,
        scope: {
            location: '='
        },
        template: '<input id="google_places_ac" style="width: 92%;" name="google_places_ac" type="text" class="input-block-level"/>',
        link: function($scope, elm, attrs) {

            var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], {});

            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();

                $scope.location = place.geometry.location.lat() + ',' + place.geometry.location.lng();
                $scope.Currloc = autocomplete;
                $scope.$apply();

            });
        }
    }
});
serapp.directive('googlePlaces1', function() {
    return {
        restrict: 'E',
        replace: true,
        // transclude:true,
        scope: {
            location: '='
        },
        template: '<input id="google_places_ac1" style="width: 92%;" name="google_places_ac" type="text" class="input-block-level"/>',
        link: function($scope, elm, attrs) {

            var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac1")[0], {});

            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();
                $scope.loc = place.geometry.location.lat() + ',' + place.geometry.location.lng();
                $scope.location = place.geometry.location.lat() + ',' + place.geometry.location.lng();
                $scope.Currloc = autocomplete;
                $scope.$apply();

            });
        }
    }
});
serapp.filter('to_trusted', ['$sce', function($sce) {
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}])
serapp.factory('indexedDBDataSvc', ['$window', '$q', function($window, $q) {

    var indexedDB = $window.indexedDB;
    var db = null;
    var lastIndex = 0;

    var open = function(tablename) {
        var deferred = $q.defer();
        var version = 1;
        var request = indexedDB.open("todoData", version);

        request.onupgradeneeded = function(e) {
            db = e.target.result;

            e.target.transaction.onerror = indexedDB.onerror;

            if (db.objectStoreNames.contains(tablename)) {
                db.deleteObjectStore(tablename);
            }

            var store = db.createObjectStore(tablename);


        };

        request.onsuccess = function(e) {
            db = e.target.result;
            deferred.resolve();
        };

        request.onerror = function() {
            deferred.reject();
        };

        return deferred.promise;
    };

    var getTodos = function(tablename) {
        var deferred = $q.defer();

        if (db === null) {
            deferred.reject("IndexDB is not opened yet!");
        } else {
            var trans = db.transaction([tablename], "readwrite");
            var store = trans.objectStore(tablename);
            var todos = [];

            // Get everything in the store;
            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange);

            cursorRequest.onsuccess = function(e) {
                var result = e.target.result;
                if (result === null || result === undefined) {
                    deferred.resolve(todos);
                } else {
                    todos.push(result.value);
                    if (result.value.id > lastIndex) {
                        lastIndex = result.value.id;
                    }
                    result.continue();
                }
            };

            cursorRequest.onerror = function(e) {
                console.log(e.value);
                deferred.reject("Something went wrong!!!");
            };
        }

        return deferred.promise;
    };

    var deleteTodo = function(id, tablename) {
        var deferred = $q.defer();

        if (db === null) {
            deferred.reject("IndexDB is not opened yet!");
        } else {
            var trans = db.transaction([tablename], "readwrite");
            var store = trans.objectStore(tablename);

            var request = store.delete(id);

            request.onsuccess = function(e) {
                deferred.resolve();
            };

            request.onerror = function(e) {
                console.log(e.value);
                deferred.reject("Todo item couldn't be deleted");
            };
        }

        return deferred.promise;
    };

    var addTodo = function(todojson, tablename) {
        var deferred = $q.defer();

        if (db === null) {
            deferred.reject("IndexDB is not opened yet!");
        } else {
            var trans = db.transaction([tablename], "readwrite");
            var store = trans.objectStore(tablename);


            var todos = [];

            // Get everything in the store;
            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange);

            cursorRequest.onsuccess = function(e) {
                var result = e.target.result;
                if (result === null || result === undefined) {
                    deferred.resolve(todos);
                } else {
                    todos.push(result.value);
                    if (result.value.id > lastIndex) {
                        if (result.value.questionid == todojson.questionid) {
                            lastIndex = result.value.id;
                            deleteTodo(lastIndex);
                        } else {
                            result.continue();
                        }
                    } else {
                        result.continue();
                    }
                }
            };

            lastIndex++;

            todojson.id = lastIndex;

            var request = store.add(todojson); // "" for online, remove "" for localhost

            request.onsuccess = function(e) {
                deferred.resolve();
            };

            request.onerror = function(e) {
                console.log(e.value);
                deferred.reject("Todo item couldn't be added!");
            };
        }
        return deferred.promise;
    };
    var updatedata = function(tablename, todojson) {
        var deferred = $q.defer();

        if (db === null) {
            deferred.reject("IndexDB is not opened yet!");
        } else {

            var transaction = db.transaction([tablename], 'readwrite');
            var objectStore = transaction.objectStore(tablename);

            objectStore.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    var arrdata = cursor.value.questions;

                    for (var i = 0; i <= arrdata.length; i++) {
                        if (arrdata[i].Id == todojson.questionid) {
                            cursor.value.questions[i] = todojson;
                            break;
                        }
                    }

                    cursor.update(cursor.value);

                } else {
                    console.log('Entries displayed.');
                }
            };

        }
        return deferred.promise;
    }
    var clearData = function(tablename) {
        var deferred = $q.defer();

        if (db === null) {
            deferred.reject("IndexDB is not opened yet!");
        } else {
            // create an object store on the transaction
            var trans = db.transaction([tablename], "readwrite");
            var objectStore = trans.objectStore(tablename);

            // Make a request to clear all the data out of the object store
            var objectStoreRequest = objectStore.clear();

            objectStoreRequest.onsuccess = function(event) {
                // report the success of our request

            };
        }
        return deferred.promise;
    };
    return {
        open: open,
        getTodos: getTodos,
        addTodo: addTodo,
        deleteTodo: deleteTodo,
        clearData: clearData,
        updatedata: updatedata
    };

}]);
serapp.directive('capitalizeFirst', function(uppercaseFilter, $parse) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            var capitalize = function(inputValue) {
                if (inputValue) {
                    var capitalized = inputValue.charAt(0).toUpperCase() +
                        inputValue.substring(1);
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                }
            }
            var model = $parse(attrs.ngModel);
            modelCtrl.$parsers.push(capitalize);
            capitalize(model(scope));
        }
    };
});

//Created by Prashant dont delete
serapp.directive('popCalender', ["$http", "$timeout", "$sce", function($http, $timeout, $sce) {
    var directive = {};
    directive.restrict = 'E';
    directive.templateUrl = "/Partial/CustomCalender.html";
    directive.scope = {
        onClick: '&'
    }
    directive.compile = function(element, attributes) {
        var linkFunction = function(scope, element, attributes) {
            var date = new Date();
            scope.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            scope.CurrentMonth = date.getMonth();
            scope.Month = date.getMonth();
            scope.CurrentYear = date.getFullYear();
            scope.Year = scope.CurrentYear;
            scope.nextMonth = function() {
                scope.Month += 1;
                GetCalenderData();
            }
            scope.previousMonth = function() {
                scope.Month -= 1;
                GetCalenderData();
            }

            function GetCalenderData() {
                if (scope.Month == 12) {
                    scope.Year += 1;
                    scope.Month = 0;
                }
                if (scope.Month == -1) {
                    scope.Year -= 1;
                    scope.Month = 11;
                }
                var objdata = {
                    month: scope.Month + 1,
                    year: scope.Year
                };
                $http.post("/WebRoute/GetCalenderData", objdata).then(function(response) {
                    if (response.data != undefined && response.data.root.subroot != "") {
                        scope.Montharr = response.data.root.subroot;
                    }
                }, function myError(response) {});
            };
            GetCalenderData();
            scope.setSession = function(SelectedDate) {

                if (SelectedDate.Isdisabled == 0) {
                    $("body").addClass("OpenCalendar");
                    $(".TimeSlot").addClass("ShowTimeSlot");
                    scope.SelectedDate = SelectedDate.DateLabel;
                    if (SelectedDate.Session) {
                        scope.timeslots = (SelectedDate.Session.slot);
                    } else {
                        scope.timeslots = [];
                    }
                } else {
                    scope.timeslots = [];
                    scope.SelectedDate = "";
                }
            }

            scope.CloseTimeSlot = function() {
                $("body").removeClass("OpenCalendar");
                $(".TimeSlot").removeClass("ShowTimeSlot");
            }
            scope.BookSlot = function(Session) {
                $("body").removeClass("OpenCalendar");
                if (Session.TaskId > 0) {
                    return false;
                }
                Session.SelectedDate = scope.SelectedDate;
                return $timeout(function() {
                    return scope.onClick({
                        Session: Session
                    });
                });
            }
        }
        return linkFunction;
    }
    return directive;
}]);


serapp.directive('memberSearch', ["$http", "$timeout", "$sce", function($http, $timeout, $sce) {
    var directive = {};
    directive.restrict = 'E';
    directive.templateUrl = "/Partial/MemberSearch.html";
    directive.scope = {
        onClick: '&'
    }
    directive.compile = function(element, attributes) {
        var linkFunction = function(scope, element, attributes) {
            scope.GetMemberData = function() {
                var objdata = {
                    RegNo: scope.RegNo,
                    searchtext: scope.searchtext,
                    PageNo: scope.PageNo,
                    NoofRecords: scope.NoofRecords
                };
                $http.post("/AdminRoute/GetMemberData", objdata).then(function(response) {
                    scope.MemberData = response.data;
                    if (scope.MemberData.length == 0) {
                        scope.total_count = 0;
                    } else {
                        scope.total_count = scope.MemberData[0].TotalRecords;
                    }
                }, function myError(response) {});
            };

            scope.ItemPaging = function(PageNo) {
                scope.PageNo = PageNo;
                scope.GetMemberData();
            }

            scope.ResetData = function() {
                scope.RegNo = "";
                scope.searchtext = "";
                scope.MemberData = [];
                scope.total_count = 0;
                scope.PageNo = 1;
                scope.NoofRecords = 50;
                scope.GetMemberData();
            }
            scope.ResetData();

            scope.SelectedMember = function(Member) {
                if (Member.MemberId > 0) {
                    return $timeout(function() {
                        return scope.onClick({
                            Member: Member
                        });
                    });
                } else {
                    return false;
                }
            }
        }
        return linkFunction;
    }
    return directive;
}]);

serapp.directive('arrowSelector', ['$document', '$rootScope', '$timeout', function($document, $rootScope, $timeout) {
    return {
        restrict: 'A',
        scope: {
            treeData: '=',
            treeData1: '=',
            commonName: '=',
            keyName: '=',
            pageFlag: '='
        },
        link: function(scope, elem, attrs, ctrl) {
            var elemFocus = false;
            elem.on('mouseenter', function() {
                elemFocus = true;
            });
            elem.on('keydown', function() {
                elemFocus = true;
            });
            elem.on('mouseleave', function() {
                elemFocus = false;
            });
            elem.bind('keydown', function(e) {
                var listOfDropDownItems = document.getElementById(scope.keyName);
                if (scope.treeData && listOfDropDownItems != null) {
                    if (scope.treeData.length <= scope.treeData1)
                        scope.treeData1 = -1;

                    if (elemFocus) {
                        if (e.keyCode == 38) {
                            if (scope.treeData.length == 0 || scope.treeData1 == -1) {
                                return;
                            }
                            if (scope.treeData[0].error == "error") {
                                return;
                            }
                            scope.treeData1--;
                            scope.$apply();
                            $timeout(function() {
                                if (scope.treeData[scope.treeData1] != undefined && scope.treeData[scope.treeData1] != null) {
                                    if (scope.pageFlag == 'Include')
                                        $rootScope.$broadcast('FillIncludeTextBox', scope.treeData[scope.treeData1], scope.treeData1, scope.commonName);
                                    else
                                        $rootScope.$broadcast('FillTextBox', scope.treeData[scope.treeData1], scope.treeData1, scope.commonName);
                                }
                            });
                            listOfDropDownItems.scrollTop = listOfDropDownItems.scrollTop - 25;
                        }
                        if (e.keyCode == 40) {
                            if (scope.treeData.length == 0 || scope.treeData.length == scope.treeData1) {
                                return;
                            }
                            if (scope.treeData[0].error == "error" && scope.treeData[0].error != undefined) {
                                return;
                            }
                            if (scope.treeData.length >= 1)
                                scope.treeData1++;
                            scope.$apply();
                            $timeout(function() {
                                if (scope.treeData[scope.treeData1] != undefined && scope.treeData[scope.treeData1] != null) {
                                    if (scope.pageFlag == 'Include')
                                        $rootScope.$broadcast('FillIncludeTextBox', scope.treeData[scope.treeData1], scope.treeData1, scope.commonName);
                                    else
                                        $rootScope.$broadcast('FillTextBox', scope.treeData[scope.treeData1], scope.treeData1, scope.commonName);

                                }
                            });
                            listOfDropDownItems.scrollTop = listOfDropDownItems.scrollTop + 25;
                        }
                        if (e.keyCode == 39) {
                            if (scope.commonName == "Drug" || scope.commonName == "Test" || scope.commonName == "Diagnosis" || scope.commonName == "TreatmentPlan") {
                                $timeout(function() {
                                    $('.keydownTo').css('display', 'none');
                                    $rootScope.$broadcast('FocusNext', scope.commonName);
                                });
                            }
                        }
                        if (e.keyCode == 37) {
                            // if (scope.commonName == "Drug" || scope.commonName == "Test" || scope.commonName == "Diagnosis" || scope.commonName == "TreatmentPlan") {
                            $timeout(function() {
                                $('.keydownTo').css('display', 'none');
                                $rootScope.$broadcast('FocusPrev', scope.commonName);
                            });
                            // }
                        }
                        if (e.keyCode == 13) {
                            $timeout(function() {
                                $rootScope.$broadcast('AddData', scope.commonName);
                            });
                        }

                        if (e.keyCode == 9) {
                            $('.keydownTo').css('display', 'none');
                            $('.list_absolute').removeClass('OpenList');
                            if (scope.commonName == "TemplateSearch")
                                $timeout(function() {
                                    $rootScope.$broadcast('FocusNext', scope.commonName);
                                });
                        }
                    }
                }
            });
        }
    };
}]);

//bootstrapGrowl for notification 
(function() {
    var $;

    $ = jQuery;

    $.bootstrapGrowl = function(message, options) {
        var $alert, css, offsetAmount;
        options = $.extend({}, $.bootstrapGrowl.default_options, options);
        $alert = $("<div>");
        $alert.attr("class", "bootstrap-growl alert");
        if (options.type) {
            $alert.addClass("alert-" + options.type);
        }
        if (options.allow_dismiss) {
            $alert.addClass("alert-dismissible");
            $alert.append("<button  class=\"close\" data-dismiss=\"alert\" type=\"button\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>");
        }
        $alert.append(message);
        if (options.top_offset) {
            options.offset = {
                from: "top",
                amount: options.top_offset
            };
        }
        offsetAmount = options.offset.amount;
        $(".bootstrap-growl").each(function() {
            return offsetAmount = Math.max(offsetAmount, parseInt($(this).css(options.offset.from)) + $(this).outerHeight() + options.stackup_spacing);
        });
        css = {
            "position": (options.ele === "body" ? "fixed" : "absolute"),
            "margin": 0,
            "margin-left": "40%",
            "z-index": "9999",
            "display": "none"
        };
        css[options.offset.from] = offsetAmount + "%";
        $alert.css(css);
        //if (options.width !== "auto") {
        //    $alert.css("width", options.width + "px");
        //}
        $(options.ele).append($alert);
        switch (options.align) {
            case "center":
                $alert.css({
                    "left": "100%",
                    "margin-left": "-" + ($alert.outerWidth() / 2) + "px"
                });
                break;
            case "left":
                $alert.css("left", "20px");
                break;
            case "right":
                $alert.css("left", "20px");
                break;
            default:
                $alert.css("right", "20px");
        }
        $alert.fadeIn();
        if (options.delay > 0) {
            $alert.delay(options.delay).fadeOut(function() {
                return $(this).alert("close");
            });
        }
        return $alert;
    };

    $.bootstrapGrowl.default_options = {
        ele: "body",
        type: "center",
        offset: {
            from: "top",
            amount: 50
        },
        align: "right",
        width: 250,
        delay: 4000,
        allow_dismiss: true,
        stackup_spacing: 10
    };

}).call(this);
//end bootstrapGrowl