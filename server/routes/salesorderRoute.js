const express = require("express");
const salesorderHandler = require("../controllers/salesorder");
const router = express.Router();

router.post("/add", salesorderHandler.addSalesOrder);
router.get("/show", salesorderHandler.showSalesOrder);
router.put("/update", salesorderHandler.updateSalesOrder);
router.delete("/delete", salesorderHandler.deleteSalesOrder);
router.get("/showall", salesorderHandler.showAllSalesOrders);

module.exports = router;
