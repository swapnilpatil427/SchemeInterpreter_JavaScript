
function onExecutedPegjs(result) {
  var schemeinterpreter_SCRIPT = browser.tabs.executeScript(null, {
            file: "/content_scripts/scheme_interpreter.js"
  });
  schemeinterpreter_SCRIPT.then(onExecutedSchemeInterpreter, onErrorSchemeInterpreter);
}

function onErrorPegjs(error) {
  console.log(`Error adding pegjs: ${error}`);
}

function onExecutedSchemeInterpreter(result) {
  var schemeinterpreter_SCRIPT = browser.tabs.executeScript(null, {
            file: "/content_scripts/scheme_interpreter.js"
  });
  schemeinterpreter_SCRIPT.then(onExecutedPegjs, onErrorPegjs);
}

function onErrorSchemeInterpreter(error) {
  console.log(`Error adding SchemeInterpreter: ${error}`);
}



document.addEventListener("click", (e) => {
    if (e.target.classList.contains("scheme"))
    {   
        var executingpegjs = browser.tabs.executeScript(null, {
            file: "/content_scripts/peg-0.9.0.js"
        });
        executingpegjs.then(onExecutedPegjs, onErrorPegjs);     
}
else if (e.target.classList.contains("clear")) {
    browser.tabs.reload();
    window.close();
    return;
}
});
