const Joi = require("joi"); // joi ke import kori
// npm joi
//joi ar Schema define korar jonno , schema akta  const defiine kori = amke Joi call korte hobe and object name akta functino ache JOi te seta call korte hobe // ai object namer function ar bitore amara schema ta desgine kore parameter hishabe pathabo
const schema = Joi.object({
  // aikhane object define korbo so object gulor moddhe amra amader field gulo define korte parbo
  email: Joi.string().min(5).max(255).required().email(), // aikhane ami bole dicchi je aikhaner emil ta akta string hobe // arpor jodi aro validation add korte chai tahole aiter sathe concatenate kore add korte parbo so (.) aiter minimun length hobe 5 , aroakta validation add korte parbo maximum length hobe 255 , aroakta validation add korte parbo required so aite akta required field mane obossoi dite hobe  , arpor bole chai aita akta eamil hobe
  password: Joi.string().min(5).max(255).required(), // ai schema ta validate korte parbe amon akta object jeta  te email thakbe and password thakbe
});

const user = {
  // aiber ami akta user object define kori  jeta ami validate korte চাচ্ছি
  email: "s@gmai.com", // so ai object tar email ache
  password: "12345",
};

// akhon ami dakhbo ai schemar bitor ai user object pass kore validate korte pari seta korar jonno
const { error } = schema.validate(user); // error ta sundormoto dekhanor jonno object distacturing method ta use kori, tate ki hobe ai {error} ar moddhe amr error property ta sorasory cole asbe  and ami sudu error ta print korle hobe// schema object ar bitor thake validate function ke call korte hobe aita hocche schemar built in akta function  // jokhone ami kono uporer object function thake akta  schema object create korbo tokhone automaically  tar bitor ai (validate) method ta chole asbe // so ami user ke validate korte cahhi, ami validate ar bitor (user) object ta pass korbo    // aiter result ta akta const ar moddhe save kori error name diye
console.log(error.details[0].message); //error object ar details arry thake  indexing korbo [0] diye  first member ar jonno and single like a dakhanor jonno message likhbo // and aita console a print kore dakhbo //terminal (node test.js ) likhe run kori
