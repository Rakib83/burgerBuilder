const express = require("express"); // notun router create korar jonno express dorker
const bcrypt = require("bcrypt");
const _ = require("lodash"); // (_) aiter bitor amra import korbo jate aita tahke sob gulo function call korte pari
const { User, validate } = require("../models/user"); // models thake user model ta import korbo // amra user.js a User and validate ke export koreche aikhane amra object destructuring method use kore {User, validate} function import korte parbo

const router = express.Router(); // amra router define korbo const router = express.Router()function call korlai router define hoye jabe
//Registered
const newUser = async (req, res) => {
  // const newUser async function hobe (req and res nibe )
  const { error } = validate(req.body); //const amra {error} ta destucturing method use kore error ta stor korbo and validate korbo request thake  body ke pathabo karon req.body tei user ar post kora data gulo ase  // first a amra user je email r password pathiyace seta amra validate korbo
  if (error) return res.status(400).send(error.details[0].message); // jodi error thake thake jodi ra tahke tahole ai if condition a r dukhbe na so return response jabe 400 jeta bed resuest and single message ta  send korbo

  let user = await User.findOne({ email: req.body.email }); // user = await User.findOne email diye chack korbo je ai email a kawke pawya jacche kina  // jodi error na thake tahole aiber ami user object crate korbo
  if (user) return res.status(400).send("User already registered"); // jodi same email thake tahke tahole response hishabe send korbo ('User already registerd ')
  // nicher line a pick function ar bitor jai objecta ta tahke pick korte cachi sai object ta pass korbo and second parameter a akta arrey pass korbo and jai proparty gulo pick korte cacchi sai propartyr name pass korbo tokhon ai pick function ta akta object return korbe  sai object ta  ai (User) model/class ar bitor pass korche // so easyly amra kono akta object thake arekta object ai pick function diye create korte pari
  user = new User(_.pick(req.body, ["email", "password"])); //aikhane(_.pick())lodash thake pick function ta use korbo ai function ar 2 ta parameter 1. holo jai (req.body)/object ta  pick korbo seta and 2. holo akta arrey       //amra lodash package use korbo aita holo arrey [' ']  and aikhaner moddhe ami উল্লেখ korte parbo  ai object ar bitor kon kon proparty /key gulo ke ami pick korbo  ai jonno aiter name pick function  //so ami bolche jai req.body ta asbe  sekhan tahke ami email ke pick korbo and password ke pick korbo  //  objcet related ar akta package  so first a amra aita import kore nei    // ami user = amra notun User diye replace kore dibo  // jodi aitao false hoi tahole ami notun user create korte parbo

  const salt = await bcrypt.genSalt(10); // const salt = await bcrypt.genSalt(10) length ar akta salt create korbo
  user.password = await bcrypt.hash(user.password, salt); // arpor user.password ar bitor ami stor korbo await bcrypt .hash korte hobe(user.password,  salt )

  const token = user.generateJWT(); //JWT token generate kore token a rakhbe   // lastly amra token dorker jahatu send korbo notun create kora user ke

  const result = await user.save(); // cosnt result = await user.save // and lastly ami save korbo amr result ar moddhe  // je reusult ta aita hocche amra save kora object ta ache setai setai ami user ke reurn korbo

  return res.status(201).send({
    // amr save kora obect ta setai result setai user ke  return  korbo  // return res.status 201 mane created send so jai object ta res hishabe send korbo sekhane  sekhane ami akta token  pathabo
    token: token, // amr token ta jabe
    user: _.pick(result, ["_id", "email"]), // and ami user ar data ta pass korbo aikhanao pick function ta use korbo  so _.pick(ami result thake sob na pathliya, ['_id ta pathabo 'and 'email ta pathabo '] ) // so noturn user funciont ta crate kora ready aber ami post ar  moddhe pass korbo
  });
};

//Authenticate
const authUser = async (req, res) => {
  // aita akta async function hobe jahatu promise hundle korbe (req,res nibe)
  let user = await User.findOne({ email: req.body.email }); // search korbo user ache kina
  if (!user) return res.status(400).send("Invalid emali or password!"); // jodi user exist na korle "Invalid emali or password!" ai error ta pabo karon se login korte jacche

  const validUser = await bcrypt.compare(req.body.password, user.password); // password ta compaire kore dakhbo  , const validUser = await bcrypt.compare() function ta call korbo and req.body thake jai password ta ache seta thake user ar password ta mach korbo  // uporer line ai user object ar jai password ta ache seta
  if (!validUser) return res.status(400).send("Invalid email or password!"); // jodi validUser na hoi tahole // false asbe ai (!not) ar karone true hoya jabe mane ai condition ta ture hobe so response status.send('Invalid email or password!')

  const token = user.generateJWT(); // token genarate korbo tar jonno
  res.send({
    token: token, // lastly response hisabe send korbo token ta
    user: _.pick(user, ["_id", "email"]), // and user object ar bitor _(lodahsh).pick function ta call korbo and user thake ami pick korbo ('_id' and '_email ke ' )  and lastly ai function ta  router.route('/auth').post(aikhane pass korbo )
  });
};

router
  .route("/") // notun router ar jonno akta route define korbo jodi  kaw ai (/) ai link a request kore tahole post  se notun user crate korte parbe
  .post(newUser);

router
  .route("/auth") // kaw jodi ('/auth') a request kore tahole post request a authenticate hote parbe
  .post(authUser);

module.exports = router; // amra module ta ke exprots kori  // and app.js a import korbo
