var Twig = require("twig"),
    express = require('express'),
    app = express();

// A function that check for options inside optionListArray and fill the no specified fields
Twig.extendFunction("utilExtension_prefillValues", function(options, optionListArray, defaults) {
    
    let res = {};
    if (typeof options === "object" &&  optionListArray instanceof Array && typeof defaults === "object") {
        
        for (let idx in optionListArray) {
            
            let prop = optionListArray[idx];
            if (options.hasOwnProperty(prop) && options[prop]) {
                res[prop] = options[prop];
            } else if(defaults[prop]){
                res[prop] = defaults[prop];
            } else {
                res[prop] = "";
            }
        }

    } else if (typeof options === "object" &&  optionListArray instanceof Array){
        for (let idx in optionListArray) {
            
            let prop = optionListArray[idx];
                
            if (options.hasOwnProperty(prop) && options[prop]) {
                res[prop] = options[prop];
            } else {
                res[prop] = "";
            }
        }
    }
    return res;
});

// This section is optional and used to configure twig. 
app.set("twig options", {
    strict_variables: false
});

app.set('views', __dirname + '/webuilder-lib/');

app.get('/', function(req, res){
  res.render('base.lib.twig', {
    message : "Hello World"
  });
});
 
app.listen(8080);