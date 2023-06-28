const jwt = require("jsonwebtoken"); // jwt import korbo // at the same time user jokhon loging korbe /sing Up korbe tokhone json webtoken take provied korbo sai karone jwt ke import kore nai
const Joi = require("joi"); // joi ke import kori
const { Schema, model } = require("mongoose"); // object destacturing follw kore Schema, model ke import korche

const userSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024, // jokhon aita hash kora hobe password ta onek boro hoye jabe tai 1024 kore hoyace
  },
});

// aibee user.Schema funtion ta akta methods ar moddhe likhbo jata amake ber ber likhte na hoi  ai schemar jakono object thakei function ta excess korte pari
userSchema.methods.generateJWT = function () {
  //userSchemar bitor method object ke call korbo // aiSchemar joto function ache so ai methods object a ache , and aikhane notun akta function pass korbo generatJWT =
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "3h" } // amr sign function ar 3rd parameter hishabe akta object pass korbo jekhane expiresIn name akta key/proparty pass korte parbo jekhane bole dite parbo jekhane bole dite parbo je kotokhon por aita expire hobe // (3600) second a bole dite pari and hour a bolte hole string a pass korte hobe ("3h") 3 gonta por invalite token dakhabe
  ); // const token generat korbe jwt.sign({ jekhane amra id =current object ar id ke pathabo , and email = current email ke pathabo  }) // .env te ami JWT_SECRET_KEY define korbo and atai amra process.env.JWT_SECRET_KEY  niya asbo
  return token;
};

const validateUser = (user) => {
  // const validateUser = aita parameter hishabe akta user object nibe  jeta ke ami validate korte cahchi
  //joi ar Schema define korar jonno , schema akta  const defiine kori = amke Joi call korte hobe and object name akta functino ache JOi te seta call korte hobe // ai object namer function ar bitore amara schema ta desgine kore parameter hishabe pathabo
  const schema = Joi.object({
    // aikhane object define korbo so object gulor moddhe amra amader field gulo define korte parbo
    email: Joi.string().min(5).max(255).required().email(), // aikhane ami bole dicchi je aikhaner emil ta akta string hobe // arpor jodi aro validation add korte chai tahole aiter sathe concatenate kore add korte parbo so (.) aiter minimun length hobe 5 , aroakta validation add korte parbo maximum length hobe 255 , aroakta validation add korte parbo required so aite akta required field mane obossoi dite hobe  , arpor bole chai aita akta eamil hobe
    password: Joi.string().min(5).max(255).required(), // ai schema ta validate korte parbe amon akta object jeta  te email thakbe and password thakbe
  });
  return schema.validate(user); // schema validate function ta call korbo  and sekhaner bitor ami amr user object ke pass korbo jate se validate korte pare and aita ami ai function thake return korbo  // schema.validate function ta jai return korbe tai ai validateUser function thake return hobe  and amake joi import korte hobe
};

module.exports.User = model("User", userSchema); // arpor amra module ta ke expors korbo so module.exports.User = model('User') aita akta User name collection create korbe form , userSchema
module.exports.validate = validateUser; // and Lastly joi function ta export korbo so moudule.exports.validate = validateUser ke ami export korbo jate onno file a use korte pari
