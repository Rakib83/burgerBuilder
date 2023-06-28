// // // aikhane amra 2 ta kaz
// // // 1. Connect MongoDB // mongoDb connect korar jonno amra .env file a cole jabo
// // // 2. Run Server

// const dotenv = require("dotenv").config(); // Load environment variables from .env file // amader module gulo import kori dotenv //arpor  aita  sorasori config ar jonno call korbo dotenv.config // aita surutei call kora valo  tahole  sob environment variable ar axccess pabe

// const app = require("./app"); // aber amader export kora app ta ke import korbo (./app) thake

// const mongoose = require("mongoose"); // mongoose import korbo // mongoose hocche globle package

// const DB = process.env.MONGODB_SERVER.replace(
//   "<PASSWORD>",
//   process.env.DB_PASSWORD
// ); //1.//const DB = mongoDB server ar link ta , and <PASSWORD> ar বদলে amader env ar DB_PASSWORD diya replace korbo aikhane mongoDb Atlas server a connect korbo

// const connectToMongoDB = async () => {
//   try {
//     await mongoose
//       .connect(DB, {
//         // mongoose thake connect ke call korbo and (process.env thake .MONGODB_SERVER)  ke call korbo
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//       .then(() => console.log("Connected to MongoDB! ")); // arpor amra then call korbo and successfully jodi connect hoi tahole
//   } catch (err) {
//     console.error("MongoDB Connection Failed:", err); // jodi kono error hoi tahole seta catch korbo and console korbo ("MongoDB Connection Failed!")
//   }
// };

// connectToMongoDB();

// const port = process.env.PORT || 3001; // || 3001 mane jodi amr port ta env  thake port ta na ase tahole bydefault amra 3001 ta ke  by default se set kore nibe
// app.listen(port, () => {
//   // app liste (port )
//   console.log(`Listening on port ${port}`); // console (`Listening on port ${port}`)
// });

const dotenv = require("dotenv").config(); // Import dotenv package
const mongoose = require("mongoose"); // Import mongoose package

const app = require("./app");

const DB = process.env.MONGODB_SERVER.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD
);

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB Connection Failed:", err);
    process.exit(1); // Exit the Node.js process if MongoDB connection fails
  }
};

connectToMongoDB();

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
