// Parses a Scheme Grammar
var parser = PEG.buildParser(
    ' start = expression;\
  validchar = [a-zA-Z_?!+\\-=@#$%^&*/.];\
  spaces = \" \"*;\
  newline = [\\n]*;\
  digit = [0-9];\
  atom =    spaces newline chars:validchar+ spaces newline   { return chars.join(\"\"); }\
          / spaces newline numbers:digit+ spaces newline     { return parseInt(numbers.join(\"\")); };\
  list =    spaces newline \"(\" spaces newline expressions:expression+ newline spaces\")\" { return expressions; };\
  expression = atom / list');


// Evaluates the Scheme Code
var evaluate = function (expr) {
    console.log(expr[0]);
    if (typeof expr === 'number') {
        console.log("number");
        return expr;
    }
    // Strings are variable references
    if (typeof expr === 'string') {
        console.log(expr);
        //return sigma[expr];
        return expr;
    }

    switch (expr[0]) {
        case '+':
            return evaluate(expr[1]) +
                evaluate(expr[2]);
        case '-':
            return evaluate(expr[1]) -
                evaluate(expr[2]);
        case '*':
            return evaluate(expr[1]) *
                evaluate(expr[2]);
        case '/':
            return evaluate(expr[1]) /
                evaluate(expr[2]);
        case 'alert' :
            return window.alert(evaluate(expr[1]));
        case 'addEventListener' : 
            var e = document.getElementById(expr[1]);
            return e.addEventListener(expr[2], function(event){ evaluate(expr[3])});
        case 'lambda' :
            return evaluate(expr[2]);
    }
};


// Get all the Scheme Script Code.
var scripts = document.querySelectorAll('[type="application/scheme"]');

for(var i = 0; i < scripts.length; i++) {
  //  console.log("Inside scheme scripts");
    var scheme_code = scripts[i].innerText;
    console.log("Scheme Source - ");
    console.log(scheme_code);

    // Builds a AST from the code matching script - type="application/scheme"
    var AST = parser.parse(scheme_code.trim()); 
    console.log("AST - ");
    console.log(AST);

    // Evaluates the Scheme code.
    res = evaluate(AST);
    console.log("\nEvaluating Scheme Program: " + res); // Print if result is returned
}

//var example = "(alert( + 4 ( + 2 3)))";
//var example = "( + 4 ( + 2 3))";

