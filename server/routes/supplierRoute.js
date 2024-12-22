const express = require("express");
const supplierHandler = require("../controllers/supplier");
const router = express.Router();

router.post("/add", supplierHandler.addSupplier);
router.get("/show", supplierHandler.showSupplier);
router.put("/update", supplierHandler.updateSupplier);
router.delete("/delete", supplierHandler.deleteSupplier);
router.get("/showall", supplierHandler.showAllSuppliers);

module.exports = router;
