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

directives.directive('highchart', function($parse) {
	return function (scope, element, attrs, controller) {
		window.chart = new Highcharts.StockChart({
			chart : {
				renderTo : element[0]
			},
			title : {
				text : 'CPU Tracker'
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