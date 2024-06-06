const { Router } = require("express");
const dogController = require("../controllers/DogController");
const middleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");
const router = Router();

router.post("/create", middleware.auth, dogController.create);
router.get("/getAll", dogController.getAllDogs);
router.get("/getSingle", dogController.getSingleDog);
router.patch("/update", middleware.auth, dogController.updateDog);
router.delete("/delete", middleware.auth, dogController.deleteDog);

//with multer
router.post("/test", upload.single("myfile"), dogController.newTest);

module.exports = router;
