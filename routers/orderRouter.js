const express = require("express"); // first a  cosnt express = require('express') express ke import korbo
const { Order } = require("../models/order"); // ('../models.order' ) thake Order ke import korbo
const authorize = require("../middlewares/authorize"); // authorize ke import korbo
const router = express.Router(); // const router = express.Router ();  // express ar Router ke import korbo

// first a amra  notun order place korar jonno akta function likhi
const newOrder = async (req, res) => {
  //cons newOrder = async function (req and res nibe )
  const order = new Order(req.body); //  and  req.body te jeta asbe new Order(req.body) seta niya  sorasori order object create kore falbo  // caile leyar hishabe validate kora jabe na korleo colbe
  try {
    await order.save(); // await order.save
    return res.status(201).send("Order placed successfully!"); // return korbo status(201) and send korbo "Order placed successfully"
  } catch (err) {
    // jodi error hoi
    return res.status(400).send("Sorry ! Something went wrong! "); // tahole return korbo 400 status and send korbo "Sorry! Something went wrong!" // aiber akta fuction likhbo middlewares ar moddhe authorize.js file ar moddhe
  }
};

//get ar jonno functino likhbo // ai function  je user akhon Login kora ache sei orderList dibe
const orderList = async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }); // const orders = awit Order.find khujbo amr ai user Id ar upor depeand kore // user id kothay save kora thakebe req.user ar bitor sekhane _id name  a excess pabo // arpor ami sort korbo sort({orderTime ar upor depeand kore and ami desending order a sort korbo karon  letest jeta seta ami sober upore chai  })  // and ai req.user object ta ami tokhone pabo jodi ar age ami authorize ke ami call kori karon authorize function ar bitorai ami  req.user ar bitor  ai decoded data save hocche so ami jodi ar age call kori tahole ami pabo na অব্যশই amake authorize age call korte hobe
  res.send(orders); // apror res.send korbo (orders) // and err hundling aikhaneo korte pari aber forn end ao korte pari and try and catch diye kora dite paro
};

router
  .route("/") // first a route ta define kori
  .get(authorize, orderList) //age authorize function call hobe uporer req.user ar bitor amr decoded duke jabe jekhane id o email thakbe  tokhon amra id at excess korte parbo orderList a      // get request nibe
  .post(authorize, newOrder); //authorize ke pass korbo and second parameter ar moddhe  newOrder function ta pass korbo // atuhorize ke age call korte hobe // newOrder aita holo amader route hundler function and  authorize aita holo amr athorizetion function  jeta akta middleware  // and post request nibe

module.exports = router; // router export korbo and app.js a import korbo
//gwt.io te giye token ta chack korte pari
