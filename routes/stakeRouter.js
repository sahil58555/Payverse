const express = require("express");
const router = express.Router();
const stakeController = require("../Controllers/stakeController");

router.route("/stake-balance").get(stakeController.stakeableBalance);
router.route("/unstake-balance").get(stakeController.unstakeableBalance);
router.route("/stake-amount").post(stakeController.stakeAmount);
router.route("/unstake-amount").post(stakeController.unstakeAmount);

module.exports = router;
