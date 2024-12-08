const {
  getUnstakeableBalance,
  getStakeableBalance,
  stake,
  unstake,
} = require("../Coinbase/cdp");

const stakeableBalance = async (req, res) => {
  try {
    const balance = await getStakeableBalance();
    res.status(200).json({
      status: "success",
      balance,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const unstakeableBalance = async (req, res) => {
  try {
    const balance = await getUnstakeableBalance();
    res.status(200).json({
      status: "success",
      balance,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const stakeAmount = async (req, res) => {
  try {
    const blockHash = await stake(req.body.amount);
    res.status(200).json({
      status: "success",
      blockHash,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const unstakeAmount = async (req, res) => {
  try {
    const blockHash = await unstake(req.body.amount);
    res.status(200).json({
      status: "success",
      blockHash,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = {
  stakeableBalance,
  unstakeableBalance,
  stakeAmount,
  unstakeAmount,
};
