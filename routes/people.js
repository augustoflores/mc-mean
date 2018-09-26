var router = require("express").Router();
peopleController = require("../controllers/people")

router.get('/', peopleController.getPeoples);
router.post('/', peopleController.insertPerson);

module.exports = router