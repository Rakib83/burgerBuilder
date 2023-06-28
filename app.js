const express = require("express"); // express app delvoped korar jonno expredd ke import korbo
// Cross Origin Resource Sharing // onno kono fronend server thake request asle seta block hoyar chance ache ai (cors) user korle block korbe na
const cors = require("cors");
const compression = require("compression"); // compression ke import korbo
const userRouter = require("./routers/userRouter"); // userRouter ke import kori
const orderRouter = require("./routers/orderRouter"); // orderRouter ta imprt korbo
const app = express(); // akta app amra create korbo express()

app.use(compression()); // 2. ai middleware ar motoi aikhane উল্লেখ  korbo
app.use(cors()); // ai middleware function  ke call korbo // jeta resorce shaireing ke allow kore
app.use(express.json()); // akta middleware function amra user korbo app.use and middlewares function ar name hocche (express.json) // ar kaz hocche amra jokhon post method kono kishu submit  korbo  express.json sai data ke automaticly json a convert kore nibe // ai middlewares ta jodi use na kori post request kaz korbe na

app.use("/user", userRouter); // jodi kaw ('/user') a request kore tahole ta redirect userRouter a route kore neya hobe // aber  amra userRouter a amra notun user create  korar function ta likhbo
app.use("/order", orderRouter); // app.use('./order) aikhane amra orderRouter ke use korbo

module.exports = app; // module .exports app ke export kore dibo
