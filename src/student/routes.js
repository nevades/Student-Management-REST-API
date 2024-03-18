const { Router } = require("express");
const controller = require("./controller");

const router = new Router();

router.get("/", controller.getStudents);
router.post("/", controller.addStudent);
router.get("/:id", controller.getStudentById);
router.delete("/:id", controller.removeStudent);

module.exports = router;
