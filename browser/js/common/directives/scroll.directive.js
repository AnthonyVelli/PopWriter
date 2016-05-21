

app.directive("scroll", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
             if (this.pageYOffset >= 100) {
                 element.addClass('fixed');
                 console.log('Scrolled below header.');
             } else {
                 element.removeClass('fixed');
                 console.log('Header is in view.');
             }
        });
    };
});
