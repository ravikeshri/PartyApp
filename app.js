var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    Session         = require("express-session");

var app = express();

//=================
//PASSPORT CONFIG
//=================
//passport setup is now present in : config->passport.js
require("./config/passport")(passport);

//=================
//MONGOOSE CONFIG
//=================
//mongoose setup is now present in : config->keys.js
//DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose.connect(
    db,
    {useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false,useCreateIndex: true }
    )
    .then(function(){console.log("MongoDB Connected")})
    .catch(function(err){console.log(err)});

//EJS
app.set("view engine","ejs");

//setup public folder where css is present
app.use(express.static(__dirname+"/public"));

//Express Body Parser
app.use(bodyParser.urlencoded({extended: true}));

//Express Session
app.use(
    Session({
    secret: "This is a party app",
    resave: false,
    saveUninitialized: false
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


//=================
//ROUTES
//=================
//Landing And Party User's Dashboard Route is now present in: routes->index.js
app.use('/', require('./routes/index.js'));

//User Authentication : login, register, logout routes are now presnt in: routes->users.js
//routes are : login ->"/users/login", register -> "/users/register" and logout -> "/users/logout"
app.use('/users', require('./routes/users.js'));

//WildCard Route
app.get("*",function(req,res){
    res.send("Error! 404 Page Not Found");
});

//To start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT,function(){
    console.log("Party App Is Started!");
});

