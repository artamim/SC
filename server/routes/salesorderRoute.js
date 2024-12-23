const express = require("express");
const salesorderHandler = require("../controllers/salesorder");
const salesdetailHandler = require("../controllers/salesdetail");
const router = express.Router();

router.post("/add", salesorderHandler.addSalesOrder);
router.get("/show", salesorderHandler.showSalesOrder);
router.put("/update", salesorderHandler.updateSalesOrder);
router.delete("/delete", salesorderHandler.deleteSalesOrder);
router.get("/showall", salesorderHandler.showAllSalesOrders);
router.patch("/cancel", salesorderHandler.cancelSalesOrder);
router.patch("/complete", salesorderHandler.completeSalesOrder);

router.post("/detail/add", salesdetailHandler.addSalesDetail);
router.get("/detail/show", salesdetailHandler.showSalesDetail);
router.put("/detail/update", salesdetailHandler.updateSalesDetail);
router.delete("/detail/delete", salesdetailHandler.deleteSalesDetail);
router.get("/detail/showall", salesdetailHandler.showAllSalesDetails);

module.exports = router;
