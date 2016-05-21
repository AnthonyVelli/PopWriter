

app.directive("scroll", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
             if (this.pageYOffset >= 100) {
                 element.addClass('fixed');
             } else {
                 element.removeClass('fixed');
             }
        });
    };
});
