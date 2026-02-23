const { createComapny, loginCompany } = require("../controller/company");

const router = require("express").Router();

router.post("/signup", createComapny);

router.post("/login", loginCompany);

module.exports = router;
