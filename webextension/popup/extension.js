
function onExecutedPegjs(result) {
  var querying = browser.tabs.query({ currentWindow: true, active: true });
  var schemeinterpreter_SCRIPT = querying.executeScript(null, {
    file: "/content_scripts/scheme_interpreter.js"
  });
  schemeinterpreter_SCRIPT.then(onExecutedSchemeInterpreter, onErrorSchemeInterpreter);
}

function onErrorPegjs(error) {
  console.log(`Error adding pegjs: ${error}`);
}



function onErrorSchemeInterpreter(error) {
  console.log(`Error adding SchemeInterpreter: ${error}`);
}

console.log(document);

function getCurrentWindowTabs() {
  return browser.tabs.query({ currentWindow: true, active: true });
}


var addClickListner = function (e) {
  console.log(browser.tabs);
  if (e.target.classList.contains("scheme")) {

    getCurrentWindowTabs().then((tabs) => {
    //  for (var tab of tabs) {
    //    if (tab.active) {
          console.log(tabs);
          var executingpegjs = browser.tabs.executeScript(null, {
            file: "/content_scripts/peg-0.9.0.js"
          });
          executingpegjs.then(() => {
            var schemeinterpreter_SCRIPT = browser.tabs.executeScript(null, {
              file: "/content_scripts/scheme_interpreter.js"
            });
            schemeinterpreter_SCRIPT.then(onExecutedPegjs, onErrorPegjs);
          }).error(onErrorPegjs);
       // }
   //   }
    });
  }
  else if (e.target.classList.contains("clear")) {
    browser.tabs.reload();
    window.close();
    return;
  }
}

document.getElementById("schemebutton").addEventListener("click", addClickListner, true);
