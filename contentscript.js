var PAT1 = /^(\d\d)-(\d\d) (\d\d):(\d\d)(AM|PM) (\d\d)\.(\d\d\d)$/;
var PAT2 = /^\s*(\d\d\d\d)\/(\d\d)\/(\d\d) (\d\d):(\d\d):(\d\d)\s*$/;
var PAT3 = /^(\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d)$/;

function replaceDate(elem, text){
  chrome.extension.sendRequest({text: text}, function(response) {
    $(elem).text(response.text);
  });
}

function replaceForLogs(){
  $("li.ae-logs-reqlog span, li.ae-logs-applog span")
      .filter(function(){return $(this).text().match(PAT1) != null;})
      .each(function(){replaceDate(this, $(this).text());});
}

if(location.pathname.match(/^\/logs/)){
  chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
      if(request.type == 'replaceDate'){
        replaceForLogs();
      }
    }
  );
}else if(location.pathname.match(/^\/cron/)){
  $("table.ae-table td span")
      .filter(function(){return $(this).text().match(PAT2) != null;})
      .each(function(){replaceDate(this, $(this).text());});
}else if(location.pathname.match(/^\/adminlogs/)){
  $("table.ae-table td")
      .filter(function(){return $(this).text().match(PAT3) != null;})
      .each(function(){replaceDate(this, $(this).text());});
}
