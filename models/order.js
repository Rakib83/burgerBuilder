const { Schema, model } = require("mongoose"); // Schema and model ke import kore nibo

const orderSchema = Schema({
  // Schema ta build korte hobe so sonst OrderSchema = Schema
  userId: Schema.Types.ObjectId, // so userId name akta proparty use krobo aita hobe objectId jeta ante hobe  Schema tahke skhanthake type name akta object ache sekhanthake ObjectId ke amra উল্লেখ korbo so aibert userId ar moddhe kono akta id save korte parbo  // jekhono object id akta stacture ache stacture jodi follow na kore tahole aikhan thake akta validation error pabo     // kono user jodi kono order place kore tahole user Id at order document a  include kore dibo jano amra filter korte pari
  ingredients: [{ type: { type: String }, amount: Number }], // ingredients aita hobe akta arrey kisher arreay object ar arrey type String // ai type proparty ar type hobe String  // mane amr ai bitore object ta type name ar akta proparty hold kore jar  type hobe String // ar por aroakta proparty jeta holo amount and aita hobe Number

  customer: {
    deliveryAddress: String, // deliveryAddress hobe String
    phone: String, // phone hobe String
    paymentType: String, // paymentType hobe String
  },
  price: Number, //price Number
  orderTime: { type: Date, default: Date.now }, //  orderTime jetar type hobe Date and default hobe Date now
});

// model create korbo // aita hobe 'Order' model and aita orderSchema thake create hobe
module.exports.Order = model("Order", orderSchema); /// module .exprots .Order = sorasori amader model ta create kori ait hobe ('Order' model, aita amder orderSchema thake create hobe an aita import korbo router.js a so new file open kori     )
