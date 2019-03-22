const express = require("express");
const router = express.Router();

//Item MOdel

const Item = require("../../models/Item");

router.get("/:cart", (req, res) => {
  Item.find({ cart: req.params.cart }).then(items => {
    //console.log(items);
    if (items) {
      //console.log(items);
      res.json(items);
    } else {
      console.log("items not found");
    }
  });
  //.sort({ name });
});

router.post("/", (req, res) => {
  Item.findOneAndUpdate(
    { cart: req.body.cart, name: req.body.name },
    { $inc: { count: 1 } },
    { new: true }
  )
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        const newItem = new Item({
          cart: req.body.cart,
          name: req.body.name,
          count: req.body.count
        });
        newItem.save().then(item => {
          res.json(item);
        });
      }
    })

    .catch(err => {
      res.json("catch called");
    });
});

router.patch("/", (req, res) => {
  Item.findOneAndUpdate(
    { cart: req.body.cart, name: req.body.name },
    { $set: { count: req.body.count } },
    { new: true }
  ).then(item => res.json(item));
});

router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
