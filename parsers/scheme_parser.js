var peg = require("pegjs");

var parser = peg.generate(
    ' start = expression;\
  validchar = [a-zA-Z_?!+\\-=@#$%^&*/.];\
  spaces = \" \"*;\
  newline = [\\n]*;\
  digit = [0-9];\
  atom =    spaces newline chars:validchar+ spaces newline   { return chars.join(\"\"); }\
          / spaces newline numbers:digit+ spaces newline     { return parseInt(numbers.join(\"\")); };\
  list =    spaces newline \"(\" spaces newline expressions:expression+ newline spaces\")\" { return expressions; };\
  expression = atom / list');

var Evaluate = function (expr) {
    //console.log(expr[0]);
    if (typeof expr === 'number') {
        console.log("number");
        return expr;
    }
    // Strings are variable references
    if (typeof expr === 'string') {
        console.log("String");
        //return sigma[expr];
        return expr;
    }

    switch (expr[0]) {
        case '+':
            console.log(typeof expr[1])
            return Evaluate(expr[1]) +
                Evaluate(expr[2]);
        case '-':
            return Evaluate(expr[1]) -
                Evaluate(expr[2]);
        case '*':
            return Evaluate(expr[1]) *
                Evaluate(expr[2]);
        case '/':
            return Evaluate(expr[1]) /
                Evaluate(expr[2]);
        case 'alert' :
            return "window.alert(" + Evaluate(expr[1]) + ")";
        case 'addEventListener' : 
            console.log(expr[1]);
            console.log(expr[2]);
            console.log(expr[3]);
            return "document.getElementById(" + expr[1] + ").document.addEventListener(" +expr[2]+ "," + Evaluate(expr[3]) +", false)";
    }
};

//var pattern_for_scheme= /<script type="text\/scheme"\s*>.*?<\/script>/gi;
// variable matches contains list of the source codes
//var matches = generatedSource.match(pattern_for_scheme);

var example = "( addEventListener myBtn click (lambda (s) (alert (+ 4 ( + 2 3))) ))"
//var example = "(alert( + 4 ( + 2 3)))";
//var example = "( addEventListener e 'click' (alert ( + 4 ( + 2 3))))";

var AST = parser.parse(example);
console.log("program : " + example);
console.log("AST");
console.log(parser.parse(example));

res = Evaluate(AST);
console.log("\nEvaluating Scheme Program: " + res);


