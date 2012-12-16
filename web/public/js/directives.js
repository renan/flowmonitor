/**
 * Created with JetBrains WebStorm.
 * User: daniel
 * Date: 15-12-12
 * Time: 1:57
 * To change this template use File | Settings | File Templates.
 */
'use strict';

/* Directives */

var directives = angular.module('myApp.directives', []);

directives.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
        elm.text(version);
    };
}]);

directives.directive('highchart', function() {
	return function (scope, element, attrs, controller) {

        console.log(scope.server.id);
 		window.$[ 'chart-' + scope.server.id] = new Highcharts.Chart({
			chart : {
				renderTo : element[0],
                type: 'areaspline'
			},
 			title : {
				text : 'CPU Tracker'
			},
            yAxis : [{
                min: 0,
                max: 100,
                title: {
                    text: 'CPU Load',
                    margin: 10
                }
            }],
            xAxis: {
                 type: 'datetime'
             },
			series : [{
				name : 'CPU',
				data : [
					[(new Date()).getTime(), 2]
				],
				tooltip: {
					valueDecimals: 2
				}
			}]
		});
	};
});