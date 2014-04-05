'use strict';

app.filter('checkmark', function () {
  return function (input) {
    return input ? '\u2713' : '\u2718';
  };
});

app.filter('path', function () {
  return function (route, variables) {
    var newRoute = '#' + route;
    return RouteManager.path(newRoute, variables);
  };
});

/*
 Padding zeros
 22 > 0022
 1  > 0001
 */
app.filter('pad', function () {
    return function (n, len) {
      var num = parseInt(n, 10);
      len = parseInt(len, 10);
      if (isNaN(num) || isNaN(len)) {
        return n;
      }
      num = ''+num;
      while (num.length < len) {
        num = '0'+num;
      }
      return num;
    };
  });

app.filter('capitalize', function() {
    return function(input, scope) {
        if (input!=null){
            input = input.toLowerCase();
        } else {
            input = '';
        }
        return input.substring(0,1).toUpperCase()+input.substring(1);
    }
});