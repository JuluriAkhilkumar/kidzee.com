App.controller('EnquiryCtrl', function($scope, $http, $filter, API) {
    $scope.Enq = {
        LastName: ' '
    };
    $scope.Enq.utm_medium = getQueryStringValue('utm_medium');
    $scope.Enq.utm_source = getQueryStringValue('utm_source');
    $scope.Enq.utm_compaign = getQueryStringValue('utm_campaign');
    $scope.Enq.gclid = getQueryStringValue('gclid');

    $scope.Enq.WillingToInvest = '';
    $scope.Enq.HaveSpace = '';
    $scope.Enq.SoonStartsIn = '';

    $scope.VarCode = '';
    $scope.EnterOtp = '';
    $scope.IsSubmit = false;

    $scope.CheckVerification = function() {
        var otp = $scope.Enq.EnterOtp
        if (otp) {
            if ($scope.Enq.EnterOtp == $scope.VarCode) {
                alert('Verified');
            } else {
                alert('NonVerified');
            }
        }
    };

    function randomNo(digit) {
        var chars = "123456789";
        var string_length = parseInt(digit);
        var randomstring = '';
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    };
    $scope.MobileVerification = function() { // Send OTP message for appointment mobile verification
        var mobile = $scope.Enq.Mobile;
        if (mobile) {
            if (mobile == '' || mobile.length < 10 || mobile == undefined) {
                alert('Please Enter Mobile Number.');
                return false;
            }
            $scope.ShowOtp = true;
            $scope.EnterOtp = '';
            $scope.VarCode = randomNo(4);
            $scope.OtpMobile = mobile;

            var obj = {
                MobileNo: mobile,
                smstext: 'Your Kidzee Verification code is : ' + $scope.VarCode + '',
                sResponse: ''
            };
            var GetAll = new Object();
            GetAll.FilterParameter = angular.toJson(obj, false);
            //API.Post("/WebRoute/SendSms_Client", GetAll).then(function (response) {
            //  alert("An OTP has been sent on your mobile number.");
            //});
            API.Post('https://globalapi.zeelearn.com/Kidzeewebapi/V1/SendSms_Clientbcbc', obj).then(function(response) {
                alert("An OTP has been sent on your mobile number.");
            });
        }

    };


    $scope.GetCountry = function() {
        $scope.CountryData = [];
        var objdata = {};
        API.Post("/WebRoute/GetFranchiseeDetails", objdata).then(function(response) {
            if (!response.data.root.subroot.error) {
                $scope.CountryData = $scope.checkundefined(response.data.root.subroot);
                console.log($scope.CountryData)

            }
        }, function myError(response) {});
    };
    $scope.GetCountryFranchisee = function() {
        //$scope.CountryData = [];
        //var objdata = {};
        //API.Post("/WebRoute/GetFranchiseeDetailsCity", objdata).then(function (response) {
        //    if (!response.data.root.subroot.error) {
        //        $scope.CountryData = $scope.checkundefined(response.data.root.subroot);
        //        console.log($scope.CountryData)
        //    }
        //}, function myError(response) {
        //  //$scope.CountryData = [];
        //var objdata = {};
        //API.Post("/WebRoute/GetFranchiseeDetailsCity", objdata).then(function (response) {
        //    if (!response.data.root.subroot.error) {
        //        $scope.CountryData = $scope.checkundefined(response.data.root.subroot);
        //        console.log($scope.CountryData)
        //    }
        //}, function myError(response) {
        //});
    };

    if ($scope.Enq.Type == 'P') {
        $scope.GetCountry();
    } else {
        if ($scope.Enq.utm_source == null || $scope.Enq.utm_source == '') {
            $scope.FieldsHideShow = false;
        }

        $scope.GetCountryFranchisee();
    }


    $scope.StateData = [];
    $scope.GetStateData = function() {
        $scope.StateData = [];
        $scope.StateData = $scope.checkundefined($scope.Enq.Country.State);
    }
    $scope.CityData = [];
    $scope.GetCityData = function() {
        $scope.CityData = [];
        $scope.CityData = $scope.checkundefined($scope.Enq.State.City);
    }
    $scope.FranchiseeData = [];
    $scope.GetFranchiseeData = function() {
        $scope.FranchiseeData = [];
        $scope.FranchiseeData = $scope.checkundefined($scope.Enq.City.Franchisee);
    }

    $scope.Submit = function() {


        if ($scope.EnquiryForm.$invalid == true) {
            angular.forEach($scope.EnquiryForm.$error.required, function(field) {
                field.$setDirty();
            });
            $scope.IsSubmit = true;
        }

        $scope.Enq.City = "",
            $scope.Enq.Country = "India",
            $scope.Enq.Email = $scope.Enq.Email,
            $scope.Enq.FirstName = "",
            $scope.Enq.HaveSpace = "",
            $scope.Enq.LastName = $scope.Enq.Name,
            $scope.Enq.Location = $scope.projectName[0].Franchisee_code, //id
            $scope.Enq.Location_name = $scope.projectName[0].Name,
            $scope.Enq.Mobile = $scope.Enq.Mobile,
            $scope.Enq.PinCode = $scope.Enq.PinCode,
            $scope.Enq.class = "",
            $scope.Enq.Product = "259262000004729208",
            $scope.Enq.ProjectId = "1",
            $scope.Enq.SoonStartsIn = "",
            $scope.Enq.Source = "gclid",
            $scope.Enq.gclid = "gclid",
            $scope.Enq.State = "Maharashtra",
            $scope.Enq.Type = "P",
            $scope.Enq.WillingToInvest = "",
            $scope.Enq.utm_compaign = "Website",
            $scope.Enq.utm_medium = "Website",
            $scope.Enq.utm_source = "Partner_Microsite",
            $scope.Enq.utm_ad = "Website",
            $scope.Enq.utm_Content = "Website",
            $scope.Enq.utm_Term = "Website",
            $scope.Enq.Stream = "",
            $scope.Enq.Franchise_Mobile = $scope.centermobile

        var objdata = $scope.Enq;
        console.log('objdata', objdata);

        if ($scope.EnquiryForm.$invalid == true) {
            angular.forEach($scope.EnquiryForm.$error.required, function(field) {
                field.$setDirty();
            });
        } else {
            $scope.CaptchaStr = '123'
            $scope.EnteredCaptcha = '123';

            if ($scope.CaptchaStr == $scope.EnteredCaptcha) {

                //$scope.enq.location = $("#location :selected").text();
                //$scope.enq.projectid = projectid;
                //$scope.enq.country = $scope.enq.country.country_name;
                //$scope.enq.state = $scope.enq.state.state_name;
                //$scope.enq.city = $scope.enq.city.city_name;
                console.log(objdata);

                API.Post('https://globalapi.zeelearn.com/Kidzeewebapi/V1/ZeeparentEnquiry', objdata).then(function(result) {
                    if (result.data) {
                        if (result.data.length > 0) {
                            //alert('saved successfully...');
                            $scope.captchamsg = false;
                            $scope.enteredcaptcha = '';
                            $scope.enq = {};
                            window.location.href = "/home/kidzeethankyou";
                        }
                    }

                }, function myerror(response) {});
            } else {
                $scope.EnteredCaptcha = '';
                $scope.CaptchaMsg = true;
            }
        }
    }

    $scope.GetStateCity = function() {
        var StateCityData = [];
        var objdata = {
            PinCode: $scope.Enq.PinCode
        };
        API.Post("/WebRoute/GetStateCity", objdata).then(function(result) {
            StateCityData = $scope.checkundefined(result.data);
            console.log(result.data);
            if (StateCityData.length > 0) {
                $scope.Enq.State = StateCityData[0].statename;
                $scope.Enq.City = StateCityData[0].districtname;
                $scope.Enq.Location = StateCityData[0].taluk;
            } else {
                $scope.Enq.State = '';
                $scope.Enq.City = '';
            }
        }, function myError(response) {});
    }
    $scope.checkundefined = function(obj) {
        return API.Setnullarray(obj);
    }
    $scope.SetCaptcha = function(CaptchaStr) {
        $scope.CaptchaStr = CaptchaStr;
    }

    function getQueryStringValue(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }


});



App.controller('IndexCtrl', function($scope, $http, $filter, API, $sce) {
    $scope.PageNo = 1;
    $scope.NoofRecords = 10;
    $scope.WebPath = WebPath;
    $scope.showAllImg = false;
    $scope.view = true;
    $scope.less = false;
    $scope.GetTestimonial = function() {
        $scope.TestimonialData = [];
        var objdata = {
            "Type": 'Testimonial',
            "ProjectId": ProjectId,
            "PageNo": $scope.PageNo,
            "NoofRecords": $scope.NoofRecords
        };
        API.Post("/WebRoute/GetMediaMaster", objdata).then(function(response) {
            if (!response.data.root.subroot.error) {
                $scope.TestimonialData = $scope.checkundefined(response.data.root.subroot);
                setTimeout(function() {
                    testimonialCarousel();
                }, 200)
            }
        }, function myError(response) {});
    };
    $scope.GetTestimonial();

    $scope.geturl = function(url) {
        console.log(url);
    }

    $scope.getmcrositedata = function(url) {
        $scope.micrositedata = [];
        $scope.programmelist = [];
        var objdata = {
            "Projectid": 1,
            "kidzeeid": url
        };
        API.Post('https://cmsapi.zeelearn.com/api/CMS/Getmicrositedata', objdata).then(function(response) {

            if (response.data.data[0]) {
                $scope.micrositedata = response.data;
                if (response.data.data[0].Projectname) {
                    $scope.projectName = response.data.data[0].Projectname;
                    $scope.correctTitle($scope.projectName[0].Name);
                }
                if (response.data.data[0].centerdata) {
                    $scope.centerdata = response.data.data[0].centerdata;
                    if ($scope.centerdata[0].Programmes) {
                        $scope.programmelist = $scope.centerdata[0].Programmes.split(',');
                        //console.log('$scope.programmelist', $scope.programmelist);
                    }
                    if ($scope.centerdata[0].MobileNo) {
                        $scope.centermobile = $scope.centerdata[0].MobileNo;
                    }
                    var street = $scope.centerdata[0].franchiseName + ' ' + $scope.centerdata[0].Address
                    $scope.mapurl = 'https://maps.google.com/maps?q=' + street + '%20&t=&z=20&ie=UTF8&iwloc=&output=embed';
                }
                var dt = response.data.data[0].contentdata;
                if (dt) {
                    //meta.contanct = "+91 93200 63100";
                    //if (data.data[0].centerdata) {
                    //  meta.contanct = data.data[0]?.centerdata[0]?.MobileNo;
                    //}
                    if (dt[0].Banner) {
                        $scope.bannerdata = dt[0].Banner;
                    }
                    if (dt[0].blog) {
                        $scope.blogdata = dt[0].blog;
                    }
                    if (dt[0].AboutUs) {
                        $scope.AboutUs = dt[0].AboutUs;
                    }
                    if (dt[0].Announcement) {
                        $scope.Announcement = dt[0].Announcement;
                    }
                    if (dt[0].PhotoGallery) {
                        $scope.PhotoGallery = dt[0].PhotoGallery;
                    }
                    if (dt[0].VideoGallery) {

                        $scope.VideoGallery = dt[0].VideoGallery;
                    }
                    if (dt[0].Facility) {
                        $scope.Facility = dt[0].Facility;

                    }
                    if (dt[0].Testimonial) {
                        $scope.Testimonial = dt[0].Testimonial;
                    }
                    if (dt[0].FAQs) {
                        $scope.FAQs = dt[0].FAQs;
                    }
                    if (dt[0].SocialLinks) {
                        $scope.SocialLinks = dt[0].SocialLinks;
                    }
                    if (dt[0].SocialWall) {
                        $scope.allSocialWall = dt[0].SocialWall;
                        $scope.filterdata('Facebook');
                    }
                }

            }

            function myError(response) {}
        });
    }


    $scope.getblogdetails = function(slug) {
        /*var objdata = { "Name": slug, "ProjectId": $scope.projectName[0].ProjectId }*/
        /*var objdata = { "Name": slug, "ProjectId": $scope.projectName[0].ProjectId }*/ /*var objdata = { "Name": slug, "ProjectId": $scope.projectName[0].ProjectId }*/ /*var objdata = { "Name": slug, "ProjectId": $scope.projectName[0].ProjectId }*/ /*var objdata = { "Name": slug, "ProjectId": $scope.projectName[0].ProjectId }*/
        //API.Post("/Blog/Index?Name=" + slug + "&ProjectId" + $scope.projectName[0].ProjectId, '').then(function (response) {
        //  if (!response.data.root.subroot.error) {
        //    $scope.TestimonialData = $scope.checkundefined(response.data.root.subroot);
        //    setTimeout(function () {
        //      testimonialCarousel();
        //    }, 200)
        //  }
        //});
        $.ajax({
            url: '/Blog/Index',
            type: 'GET',
            data: {
                "Name": slug,
                "ProjectId": $scope.projectName[0].ProjectId
            },
            dataType: 'json',
            success: function(response) {
                console.log(response);
            }
        });
    }


    $scope.viewAllImg = function(dt) {
        if (dt == 1) {
            $scope.showAllImg = true;
            $scope.view = false;
            $scope.less = true;
        }
        if (dt == 2) {
            $scope.showAllImg = false
            $scope.view = true
            $scope.less = false
        }
    }

    $scope.filterdata = function(type) {
        $scope.SocialWall = $scope.allSocialWall.filter(character => character.LookupName == type);
    }

    $scope.trustedHtml = function(data) {
        return $sce.trustAsHtml(data);
    }

    $scope.trustedURL = function(data) {
        return $sce.trustAsResourceUrl(data);
    }

    $scope.correctTitle = function(str) {
        var title = str;
        $scope.Title = title.replace(/-/g, " ");
    };

    $scope.GetPartnerTestimonial = function() {
        $scope.PTestimonialData = [];
        var objdata = {
            "Type": 'Partner Testimonial',
            "ProjectId": ProjectId,
            "PageNo": $scope.PageNo,
            "NoofRecords": $scope.NoofRecords
        };
        API.Post("/WebRoute/GetMediaMaster", objdata).then(function(response) {
            if (!response.data.root.subroot.error) {
                $scope.PTestimonialData = $scope.checkundefined(response.data.root.subroot);
                setTimeout(function() {
                    ptestimonialCarousel();
                }, 200)
            }
        }, function myError(response) {});
    };
    $scope.GetPartnerTestimonial();
    $scope.GetNewsAndEvents = function() {
        $scope.NewsAndEventsData = [];
        var objdata = {
            "Type": 'Blog',
            "ProjectId": ProjectId,
            "PageNo": $scope.PageNo,
            "NoofRecords": $scope.NoofRecords
        };
        API.Post("/WebRoute/GetMediaMaster", objdata).then(function(response) {
            if (!response.data.root.subroot.error) {
                $scope.NewsAndEventsData = $scope.checkundefined(response.data.root.subroot);

            }
        }, function myError(response) {});
    };
    $scope.GetNewsAndEvents();

    $scope.checkundefined = function(obj) {
        return API.Setnullarray(obj);
    }

    function testimonialCarousel() {
        $('#testimonials-carousel').owlCarousel({
            loop: true,
            margin: 40,
            navSpeed: 1000,
            items: 2,
            smartSpeed: 1400,
            autoplay: true,
            autoplayTimeout: 8000,
            autoplayHoverPause: true,
            lazyLoad: true,
            responsiveClass: false,
            responsive: {
                0: {
                    dots: false,
                    nav: false
                },
                480: {
                    items: 1
                },
                640: {
                    items: 1
                },
                768: {
                    items: 1
                },
                1000: {}
            },
            dots: false,
            nav: true,
            navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"]
        });
    }

    function ptestimonialCarousel() {
        $('#ptestimonials-carousel').owlCarousel({
            loop: true,
            margin: 40,
            navSpeed: 1000,
            items: 2,
            smartSpeed: 1400,
            autoplay: true,
            autoplayTimeout: 8000,
            autoplayHoverPause: true,
            lazyLoad: true,
            responsiveClass: false,
            responsive: {
                0: {
                    dots: false,
                    nav: false
                },
                480: {
                    items: 1
                },
                640: {
                    items: 1
                },
                768: {
                    items: 1
                },
                1000: {}
            },
            dots: false,
            nav: true,
            navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"]
        });
    }
});


App.controller('NewsAndEventsCtrl', function($scope, $http, $filter, API, $sce) {
    $scope.WebPath = WebPath;
    $scope.TagName = '';
    $scope.PubDate = '';
    $scope.FullContent = true;
    $scope.GetNewsAndEventsDetails = function(id) {
        $scope.NewsAndEventsData = [];
        var objdata = {
            "Id": id
        };
        API.Post("/WebRoute/GetMediaMasterId", objdata).then(function(response) {
            if (!response.data.root.subroot.error) {
                $scope.NewsAndEventsData = $scope.checkundefined(response.data.root.subroot);
                $scope.NewsTitle = $scope.NewsAndEventsData[0].Title;
                $scope.NewsShortDesc = $scope.NewsAndEventsData[0].Short;
                $scope.NewsLongDesc = $scope.NewsAndEventsData[0].Long;
                $scope.MainImagePath = $scope.NewsAndEventsData[0].MainImagePath;
                $scope.PublishedDate = $scope.NewsAndEventsData[0].FromDate;
                $scope.Tag = $scope.NewsAndEventsData[0].TagString.split('$$')[0];
                $scope.NewsId = $scope.NewsAndEventsData[0].Id;

            }
        }, function myError(response) {});
    };
    $scope.trustedHtml = function(data) {
        return $sce.trustAsHtml(data);
    }
    $scope.ShowFullcontent = function() {
        $scope.FullContent = false;;
    }
    $scope.checkundefined = function(obj) {
        return API.Setnullarray(obj);
    }

    $scope.GetNewsAndEvents = function() {
        $scope.NewsAndEventsData = [];
        var objdata = {
            "Type": 'Blog',
            "ProjectId": ProjectId,
            "TagName": $scope.TagName,
            "Date": $scope.PubDate
        };
        API.Post("/WebRoute/Get_MediaMaster_Web", objdata).then(function(response) {
            if (response.data.length > 0) {
                $scope.NewsAndEventsData = $scope.checkundefined(response.data);

            }
        }, function myError(response) {});
    };

    $scope.GetTagCount = function() {
        $scope.TagCountData = [];
        var objdata = {
            "ProjectId": ProjectId
        };
        API.Post("/WebRoute/GetTagCount", objdata).then(function(response) {
            if (response.data.length > 0) {
                $scope.TagCountData = $scope.checkundefined(response.data);

            }
        }, function myError(response) {});
    };
    $scope.GetTagCount();

    $scope.GetMediaDate = function() {
        $scope,
        MediaDateData = [];
        var objdata = {
            "Type": "News",
            "ProjectId": ProjectId
        };
        API.Post("/WebRoute/GetMediaDate", objdata).then(function(response) {
            if (response.data.length > 0) {
                $scope.MediaDateData = $scope.checkundefined(response.data);

            }
        }, function myError(response) {});
    };
    $scope.GetMediaDate();

    $scope.GetFilteredNewsAndEvents = function(tagname, publishdate) {
        $scope.TagName = tagname;
        $scope.PubDate = publishdate;
        $scope.GetNewsAndEvents();
    }

    $scope.Comment = {};
    $scope.SaveComments = function(NewsId) {
        $scope.Comment.NewsId = NewsId;
        $scope.Comment.ProjectId = ProjectId;
        var objdata = $scope.Comment;
        API.Post("/WebRoute/SaveComments", objdata).then(function(result) {
            if (!angular.isUndefined(result.data)) {
                if (result.data.length > 0) {
                    alert('Saved Successfully...');
                    $scope.Comment = {};
                }
            }
        }, function myError(response) {});
    }


});

App.controller('ContactUsCtrl', function($scope, $http, $filter, API, $sce) {

    $(".maplistview .listview").hide();
    $scope.maplistview = function() {
        $(".maplistview .listview").toggle();
        $(".maplistview .mapview").toggle();
    };

    $scope.GetFranchiseedetailsStateCitywise = function(name) {
        $scope.FranchiseeDetailsData = [];
        var objdata = {
            'Search': name
        };
        API.Post("/WebRoute/GetFranchiseedetailsStateCitywise", objdata).then(function(response) {
            if (!response.data.error) {
                $scope.FranchiseeDetailsData = $scope.checkundefined(response.data);
                //setTimeout(function () {
                //    $('.CenterOwlCarousel').owlCarousel({
                //        loop: true,
                //        margin: 0,
                //        navSpeed: 1000,
                //        items: 1,
                //        smartSpeed: 1400,
                //        autoplay: true,
                //        autoplayTimeout: 8000,
                //        autoplayHoverPause: true,
                //        lazyLoad: true,
                //        responsiveClass: false,
                //        dots: true,
                //        responsive: {
                //            0: {
                //                //nav: false
                //            },
                //            480: {},
                //            640: {},
                //            768: {},
                //            1000: {
                //                //dots: false,
                //                nav: false,
                //                navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"]
                //            }
                //        }
                //    });
                //}, 500)

            }
        }, function myError(response) {});
    };
    $scope.GetFranchiseedetailsStateCitywise('India');

    $scope.GetCountry = function() {
        $scope.CountryData = [];
        var objdata = {};
        API.Post("/WebRoute/GetFranchiseeDetails", objdata).then(function(response) {
            if (!response.data.root.subroot.error) {
                $scope.CountryData = $scope.checkundefined(response.data.root.subroot);
                console.log(CountryData);

            }
        }, function myError(response) {});
    };
    $scope.GetCountry();

    $scope.checkundefined = function(obj) {
        return API.Setnullarray(obj);
    };

    $scope.StateData = [];
    $scope.GetStateData = function() {
        $scope.StateData = [];
        $scope.StateData = $scope.checkundefined($scope.Country.State);
        $scope.GetFranchiseedetailsStateCitywise($scope.Country.Country_Name);
    }
    $scope.CityData = [];
    $scope.GetCityData = function() {
        $scope.CityData = [];
        $scope.CityData = $scope.checkundefined($scope.State.City);
        $scope.GetFranchiseedetailsStateCitywise($scope.State.State_Name);
    }
    $scope.FranchiseeData = [];
    $scope.GetFranchiseeData = function() {
        $scope.FranchiseeData = [];
        $scope.FranchiseeData = $scope.checkundefined($scope.City.Franchisee);
        $scope.GetFranchiseedetailsStateCitywise($scope.City.City_Name);
    }
    $scope.GetCentre = function() {
        $scope.FranchiseeDetailsData = [];
        $scope.FranchiseeDetailsData = $scope.checkundefined($scope.Franchisee);
    }
});