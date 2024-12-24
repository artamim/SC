const express = require("express");
const collectionHandler = require("../controllers/collection");
const router = express.Router();

router.post("/add", collectionHandler.addCollection);
router.get("/show", collectionHandler.showCollection);
router.put("/update", collectionHandler.updateCollection);
router.delete("/delete", collectionHandler.deleteCollection);
router.get("/showall", collectionHandler.showAllCollections);
router.patch("/cancel", collectionHandler.cancelCollection);
router.patch("/complete", collectionHandler.completeCollection);

module.exports = router;
