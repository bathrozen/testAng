angular.module("phonecatApp").run(["$templateCache", function($templateCache) {

  $templateCache.put("phones/index.html",
    "<div ng-controller=\"PhoneIndexCtrl\">\n" +
    "  <div>\n" +
    "    <ul class=\"phone-list\">\n" +
    "      <li ng-repeat=\"phoneData in phones | search:query | orderBy:orderProp\" class=\"each-phone\" >\n" +
    "        <div toggle-phone\n" +
    "          edit-content phone=\"phone\" remove-phone=\"removePhone\"\n" +
    "          get-detail=\"getDetail\" edit-phone=\"editPhone\" edit-state=\"editState\">\n" +
    "          <input type=\"button\" value=\"Hide\" class=\"toggle-btn btn btn-success\"/>\n" +
    "          <input type=\"button\" value=\"edit\" class=\"edit-btn btn btn-success\"/>\n" +
    "          <input type=\"button\" value=\"delete\" class=\"remove-btn btn btn-success\"/>\n" +
    "          <div class=\"toggle-area phone-edit\" edit-state=\"editState\">\n" +
    "            <span class=\"content-field\" ng-hide=\"editState\">{{phoneData.phone.name}}</span>\n" +
    "            <input class=\"input-field\" ng-show=\"editState\" ng-model=\"phoneData.phone.name\">\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n"
  );

  $templateCache.put("phones/new.html",
    "<div newPhone class=\"rounded-frame\"\n" +
    "\tnew-phone-behavior create-new-phone=\"submitNewPhone\" is-valid=\"isValid\">\n" +
    "  Name <input ng-model=\"name\" class=\"name-input\" auto-focus/>\n" +
    "  Snippet <input ng-model=\"snippet\" class=\"snippet-input\"/>\n" +
    "  <a class=\"submitBtn\">Click me</a>\n" +
    "\n" +
    "  <div class=\"error-message\"></div>\n" +
    "\n" +
    "</div>"
  );

  $templateCache.put("phones/show.html",
    "<ul class=\"detail-list\" ng-repeat=\"detail in details\">\n" +
    "\t<li>{{detail.snippet}}</li>\n" +
    "</ul>\n" +
    "\n" +
    "<input type=\"button\" value=\"Add more detail\"\n" +
    "\tng-click=\"toggleAddingState()\" ng-hide=\"shouldDisplayAddBtn()\">\n" +
    "\n" +
    "<div ng-show=\"addingState\" >\n" +
    "\t<input type=text ng-model=\"detailField\" />\n" +
    "\t<input type=\"button\" ng-click=\"submitNewDetail()\" value=\"submit new detail\">\n" +
    "</div>\n"
  );

}]);
