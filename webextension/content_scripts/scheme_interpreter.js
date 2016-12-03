//#TODO putting it into webpage

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

var interprete = function (expr) {
    //console.log(expr[0]);
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
            return interprete(expr[1]) +
                interprete(expr[2]);
        case '-':
            return interprete(expr[1]) -
                interprete(expr[2]);
        case '*':
            return interprete(expr[1]) *
                interprete(expr[2]);
        case '/':
            return interprete(expr[1]) /
                interprete(expr[2]);
        case 'alert' :
            return "alert(" + interprete(expr[1]) + ")"

    }
};

var example = "(alert( + 4 ( + 2 3)))";
//var example = "( + 4 ( + 2 3))";


var AST = parser.parse(example);
console.log("program : " + example);
console.log("AST");
console.log(parser.parse(example));

res = interprete(AST);
console.log("\nEvaluating Scheme Program: " + res);
