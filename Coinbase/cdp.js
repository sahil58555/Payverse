const {
  Coinbase,
  ExternalAddress,
  StakeOptionsMode,
} = require("@coinbase/coinbase-sdk");

const ethers = require("ethers");

const path = require("path");
const apiKeyFilePath = path.join(__dirname, "cdp_api_key.json");

const walletAddress = "0xc96EFaFD9655356DBB819F77Fc7Dd49e6Ee48e1B";
const walletPrivateKey = process.env.WALLET_PRIVATE_KEY;

const wallet = new ethers.Wallet(walletPrivateKey);
const holeskyNodeURL = "https://ethereum-holesky.blockpi.network/v1/rpc/public";
const provider = new ethers.JsonRpcProvider(holeskyNodeURL);

Coinbase.configureFromJson({ filePath: apiKeyFilePath });
const address = new ExternalAddress(
  Coinbase.networks.EthereumHolesky,
  walletAddress
);

async function getStakeableBalance() {
  const stakeableBalance = await address.stakeableBalance(
    Coinbase.assets.Eth,
    StakeOptionsMode.PARTIAL
  );

  return stakeableBalance;
}

const stake = async (amount) => {
  const stakingOperation = await address.buildStakeOperation(
    amount,
    Coinbase.assets.Eth,
    StakeOptionsMode.PARTIAL
  );

  await stakingOperation.sign(wallet);

  for (const tx of stakingOperation.getTransactions()) {
    const resp = await provider.broadcastTransaction(tx.getSignedPayload());
    return resp.hash;
  }
};

const getUnstakeableBalance = async () => {
  let unstakeableBalance = await address.unstakeableBalance(
    Coinbase.assets.Eth,
    StakeOptionsMode.PARTIAL
  );

  console.log(unstakeableBalance);
  return unstakeableBalance;
};

const unstake = async (amount) => {
  let unstakeOperation = await address.buildUnstakeOperation(
    amount,
    Coinbase.assets.Eth,
    StakeOptionsMode.PARTIAL
  );

  await unstakeOperation.sign(wallet);

  for (const tx of unstakeOperation.getTransactions()) {
    const resp = await provider.broadcastTransaction(tx.getSignedPayload());
    return resp.hash;
  }
};

const getClaimableBalance = async () => {
  let claimableBalance = await address.claimableBalance(
    Coinbase.assets.Eth,
    StakeOptionsMode.PARTIAL
  );

  console.log(claimableBalance);
  return claimableBalance;
};

module.exports = {
  getStakeableBalance,
  stake,
  getUnstakeableBalance,
  unstake,
  getClaimableBalance,
};
