const express = require("express");
const itemHandler = require("../controllers/item");
const router = express.Router();

router.post("/add", itemHandler.addItem);
router.get("/show", itemHandler.showItem);
router.put("/update", itemHandler.updateItem);
router.delete("/delete", itemHandler.deleteItem);
router.get("/showall", itemHandler.showAllItems);

module.exports = router;
