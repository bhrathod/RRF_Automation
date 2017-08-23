var collListItems = null;

$(document).ready(function () {
    ExecuteOrDelayUntilScriptLoaded(retrieveListItems, "sp.js");
});
function retrieveListItems() {
    var hostweburl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
    var appweburl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));
    var clientContext;
    var factory;
    var appContextSite;
    var collList;
    clientContext = new SP.ClientContext(appweburl);
    appContextSite = new SP.AppContextSite(clientContext, hostweburl);
    var hostweb = appContextSite.get_web();
    var oList = hostweb.get_lists().getByTitle('Currency');

    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query><Where></Where></Query></View>');
    this.collListItem = oList.getItems(camlQuery);

    clientContext.load(collListItem);

    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));

}

function onQuerySucceeded(sender, args) {

    var listItemEnumerator = collListItem.getEnumerator();
        var financialYear = null;
        var currencyName = null;
        var inr = null;
        //var currency = {
        //    "Financial Year": financialYear,
        //    "Currency Name": currencyName,
        //    "INR" : inr
        //}
        //var currencyList = [];
        

        while (listItemEnumerator.moveNext()) {
            var oListItem = listItemEnumerator.get_current();
            financialYear = oListItem.get_item("FinancialYear");
            currencyName = oListItem.get_item("CurrencyName");
            inr = oListItem.get_item("INR");
            var curName = document.getElementById('ddl_currencyName');
            var option = document.createElement('option');
            option.text = currencyName;
            option.value = currencyName;
            curName.add(option);
        }
}

function onQueryFailed(sender, args) {

    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}

//function retrieveListItems1() {
//    var siteUrl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));    
//    var clientContext = new SP.ClientContext(siteUrl);
//    var oList = clientContext.get_web().get_lists().getByTitle('Currency');
        
//    var camlQuery = new SP.CamlQuery();
//    camlQuery.set_viewXml('<View><Query><Where></Where></Query></View>');
//    collListItems = oList.getItems(camlQuery);
        
//    clientContext.load(collListItems);
        
//    clientContext.executeQueryAsync(retrieveSuccess, retrieveFail);        
//    return false;
//}

//function retrieveSuccess(sender, args) {
//    var listItemEnumerator = collListItems.getEnumerator();
//    var financialYear = null;
//    var currencyName = null;
//    var inr = null;
//    var currency = {
//        "Financial Year": financialYear,
//        "Currency Name": currencyName,
//        "INR" : inr
//    }
//    var currencyList = [];
        
//    while (listItemEnumerator.moveNext()) {
//        var oListItem = listItemEnumerator.get_current();
//        financialYear = oListItem["FinancialYear"];
//        currencyName = oListItem["CurrencyName"];
//        inr = oListItem["INR"];
//        var curName = document.getElementById('ddl_currencyName');
//        var option = document.createElement('option');
//        option.text = currencyName;
//        option.value = currencyName;
//        curName.add(option);
//    }

//}

//function retrieveFail(sender, args) {

//    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
//}

function getQueryStringParameter(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
