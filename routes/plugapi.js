const Plugs = require("../models/plug");
const mongoose = require('mongoose')
const Plug = mongoose.model('Plugs')
const router = require("express").Router();
 

//CREATE 

router.post("/plug", async (req, res) => {
  const newOrder = new Plug(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET USER ORDERS
router.get("/plug/:StationId", async (req, res) => {
  try {
    const plugs = await Plug.findOne({ StationId: req.params.StationId });
    res.status(200).json(plugs);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/plug", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME

// router.get("/income", verifyTokenAndAdmin, async (req, res) => {
//   const date = new Date();
//   const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//   const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

//   try {
//     const income = await Order.aggregate([
//       { $match: { createdAt: { $gte: previousMonth } } },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//           sales: "$amount",
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: "$sales" },
//         },
//       },
//     ]);
//     res.status(200).json(income);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;