# handlebars information

import { engine } from "express-handlebars";

app.use(express.urlencoded({ extended: false }));

app.engine("handlebars", engine({ defaultLayout: false })); 
Note: we add { defaultLayout: false } if we want to use handlebars files inside views but outside layouts. otherwise it wont render and only handlebars files inside layouts will render. 
app.set("view engine", "handlebars");
app.set("views", "./src/views");
-------------------------------------------------------------------------------------------------------------------------------
a layouts folder and a main.handlebars file inside it are required by default but you can override it by useing:
app.engine("handlebars", engine({ defaultLayout: false })); 

examples of how to render the templates:
res.render("main"); --> to render main.handlebars
res.render("layouts/main"); to render main.handlebars inside layouts folder.
res.render("home",{layout: 'main'}); to render main.handlebars after home.handlebars has been injected into it via {{{body}}}.

Note: if we had not added { defaultLayout: false } to enging() we would have not needed {layout: 'main'}. and res.render("home"); would have been enough.
Note: even if we don't add it the default would be { defaultLayout: main}, so as long as we have a main.handlebars file in our layout folder and in it {{{body}}} it will work as a layout by default. but we can change the default by adding {defaultLayout:not-main}.
Note:{layout: 'something'} in the render() overrides { defaultLayout: 'something-else'} in engine()

we can also change the name of the layouts folder by using:
app.engine("handlebars", engine({ defaultLayout: main, layoutsDir: path.join(__dirname, 'views/test' }));
-------------------------------------------------------------------------------------------------------------------------------
by default a folder must be created in views with the name 'partials' to be able to use partials. for a different name:
app.engine("handlebars", engine({ partialsDir: path.join(__dirname, 'views/pieces' }));
-------------------------------------------------------------------------------------------------------------------------------
to change the name of the extention:
app.set("view engine", "hbs");
app.engine("hbs", engine({extname: 'hbs'}));
-------------------------------------------------------------------------------------------------------------------------------
#custom helpers# -> video number 10. to be studied if needed

{{> partial }} --> to indluce a partial

{{data}} --> displays the text as it is even if it includes html tags
{{{html}}} --> used when we want the text to be treated as html. meaning the html tags wont be displayed and will serve their function.


#with --> a helper which allows us to access the values in an object without using dot notation

lookup --> a helper which allows us to access values in objects without using dot notation but most importantly it helps us access a value in an array at a specific index.

log --> logs things in the terminal


medium toturial:
https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65

______________________________________________________________________________________________________________________________
to serve static files from the public directory to the html templates in views we need to add:

import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

//Note: when we invoke the path for the static file in the html, the path starts from after public. for example if we have a css folder in public the path invoked in the html will start with 'css' ex:
 <link rel="stylesheet" href="styles/master.css">
example for an image folder inside the public folder:
<img class="logo" src="images/logo.png" alt="logo">
______________________________________________________________________________________________________________________________
Handlebars: Access has been denied to resolve the property "title" because it is not an "own property" of its parent.
https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is

easiest solution is to add runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowedProtoMethodsByDefault: true,
    },

like this:
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowedProtoMethodsByDefault: true,
    },
  })
);

Note: this solution might not be secure.
-------------------------------------------------------------------------------------------------------------------------------
