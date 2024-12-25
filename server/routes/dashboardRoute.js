const express = require("express");
const dashboardHandler = require("../controllers/dashboard");
const router = express.Router();

router.get("/salesstatdistchart", dashboardHandler.showsalesstatdistchart);
router.get("/collectionduechart", dashboardHandler.collectionduechart);
router.get("/topfivesupchart", dashboardHandler.topfivesupchart);
router.get("/topfivefastmovingitemschart", dashboardHandler.topfivefastmovingitemschart);

module.exports = router;
