const express = require("express");
const customerHandler = require("../controllers/customer");
const router = express.Router();

router.post("/add", customerHandler.addCustomer);
router.get("/show", customerHandler.showCustomer);
router.put("/update", customerHandler.updateCustomer);
router.delete("/delete", customerHandler.deleteCustomer);

module.exports = router;
