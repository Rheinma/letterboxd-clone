const router = require("express").Router();
const userController = require("../controllers/userController");
const { AuthorizationAdmin, Authentication } = require("../middlewares/Authz");

router.post("/login", userController.login);
router.use(Authentication);
router.post("/register", AuthorizationAdmin, userController.register);


module.exports = router;
