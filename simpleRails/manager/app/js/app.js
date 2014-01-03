angular.module('phonecatApp')

.run(["$templateCache", function($templateCache) {

  $templateCache.put("views/partials/phone_list_item.html",
    "<input type=\"button\" value=\"show / hide\" class=\"toggle\" />\n" +
    "<div ng-show=\"displayData\">\n" +
    "  <p>{{phone.name}}</p>\n" +
    "  <p>{{phone.snippet}}</p>\n" +
    "\t<input type=\"button\" value=\"delete\" class=\"delete\" />\n" +
    "</div>"
  );

}]);

