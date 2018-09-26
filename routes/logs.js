var router = require("express").Router();
logController = require("../controllers/logs")

router.get('/', logController.getLogs);
router.post('/', logController.insertLog);

module.exports = router