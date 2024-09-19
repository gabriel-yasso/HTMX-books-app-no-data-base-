# handlebars information

const exphbs = require("express-handlebars");
app.set("view engine", "handlebars");
app.engine("handlebars", exphbs.engine());

// a layouts folder and a main.handlebars file inside it are required by default but you can override it by useing:
// exphbs.engine({ defaultLayout: false }) we can also change the default layout file using:
// exphbs.engine({ defaultLayout: something other than main }) we can also change the name of the layouts folder by using:
// exphbs.engine({ defaultLayout: main, layoutsDir: path.join(\_\_dirname, 'views/test' })

// by default a folder must be created in views with the name 'partials' to be able to use partials. for a different name:
// exphbs.engine({ partialsDir: path.join(\_\_dirname, 'views/pieces' })

// to change the name of the extention:
app.set("view engine", "hbs");
app.engine("hbs", exphbs.engine({extname: 'hbs'}));

#custom helpers# -> video number 10. to be studied if needed

{{}} -> displays the text as it is even if it includes html tags
{{{}}} -> used when we want the text to be treated as html. meaning the html tags wont be displayed and will serve their function.

#with --> a helper which allows us to access the values in an object without using dot notation

lookup --> a helper which allows us to access values in objects without using dot notation but most importantly it helps us access a value in an array at a specific index.

log --> logs things in the terminal
