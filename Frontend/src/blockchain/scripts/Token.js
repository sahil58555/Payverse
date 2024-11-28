import { Contract, ethers } from "ethers";
import tokenJson from "../artifacts/contracts/Token.sol/Token.json";

async function deployContract(signer, tokenName, tokenSymbol, initialSupply) {
  const contractFactory = new ethers.ContractFactory(
    tokenJson.abi,
    tokenJson.bytecode,
    signer
  );
  const contract = await contractFactory.deploy(
    tokenName,
    tokenSymbol,
    initialSupply
  );
  const contractDeployed = await contract.waitForDeployment();

  return contractDeployed.target;
}

async function getBalance(provider, contractAddress, accountAddress) {
  const contract = new Contract(contractAddress, tokenJson.abi, provider);
  const balance = await contract.balanceOf(accountAddress);

  return Number(balance);
}

async function getOwner(provider, contractAddress) {
  const contract = new Contract(contractAddress, tokenJson.abi, provider);
  const owner = await contract.getOwner();

  return owner;
}

async function getName(provider, contractAddress) {
  const contract = new Contract(contractAddress, tokenJson.abi, provider);
  const name = await contract.name();

  return name;
}

async function getSymbol(provider, contractAddress) {
  const contract = new Contract(contractAddress, tokenJson.abi, provider);
  const symbol = await contract.symbol();

  return symbol;
}

async function getTotalCoins(provider, contractAddress) {
  const contract = new Contract(contractAddress, tokenJson.abi, provider);
  const totalCoins = await contract.totalSupply();

  return Number(totalCoins);
}

async function transfer(signer, contractAddress, accountAddress, value) {
  const contract = new Contract(contractAddress, tokenJson.abi, signer);
  const transaction = await contract.transfer(accountAddress, value);

  await transaction.wait();
}

async function executeBulkTransfer(
  signer,
  contractAddress,
  recipients,
  values,
  totalAmount
) {
  const contract = new Contract(contractAddress, tokenJson.abi, signer);

  try {
    // Call the bulkTransfer function
    const tx = await contract.bulkTransfer(recipients, values, {
      value: totalAmount, // Include the Ether value
    });
    console.log("Transaction sent:", tx.hash);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction mined:", receipt);

    return receipt;
  } catch (error) {
    console.error("Error during bulk transfer:", error);
  }
}

export {
  deployContract,
  getBalance,
  getOwner,
  getName,
  getSymbol,
  getTotalCoins,
  transfer,
  executeBulkTransfer,
};
