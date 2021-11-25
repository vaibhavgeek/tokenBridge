require("@nomiclabs/hardhat-web3");

// task("balance", "Prints an account's balance")
//   .addParam("account", "The account's address")
//   .setAction(async (taskArgs) => {
//     const account = web3.utils.toChecksumAddress(taskArgs.account);
//     const balance = await web3.eth.getBalance(account);

//     console.log(web3.utils.fromWei(balance, "ether"), "ETH");
//   });
// dummy task copy pasted from tutorial, used for checking balance can be used later on.

const TOKEN_ADDRESS = "0x824efEca7EFAA7570983E557FD94967B819b5BC2";
const BRIDGE_ADDRESS = "0x824efEca7EFAA7570983E557FD94967B819b5BC2";

const chainIds = {
  ganache: 1337,
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  bsc_testnet: 97,
  rinkeby: 4,
  ropsten: 3,
};

task("swap", "init swap")
  .addParam("chainfrom", "Chain name from which tokens are transferred")
  .addParam("chainto", "Chain name to which tokens are transferred")
  .addParam("recipient", "The address of user receiving the tokens")
  .addParam("amount", "The amount of tokens to be swaped")
  .addParam("nonce", "The transaction identifier")
  .addParam("signature", "The signature of validator")
  .setAction(
    async (
      { chainfrom, chainto, recipient, amount, nonce, signature },
      { ethers }
    ) => {
      const bridge = BRIDGE_ADDRESS;
      const contract = await ethers.getContractAt("Bridge", bridge);
      await contract.initSwap(
        chainIds[chainfrom],
        chainIds[chainto],
        recipient,
        amount,
        nonce,
        signature
      );
    }
  );

task("redeem", "redeem tokens")
  .addParam("chainfrom", "Chain name from which tokens are transferred")
  .addParam("chainto", "Chain name to which tokens are transferred")
  .addParam("sender", "The user address executing the swap")
  .addParam("recipient", "The user address executing the swap")
  .addParam("amount", "The amount of tokens to be swaped")
  .addParam("nonce", "The transaction identifier")
  .addParam("signature", "The signature of validator")
  .setAction(
    async (
      { chainfrom, chainto, sender, recipient, amount, nonce, signature },
      { ethers }
    ) => {
      const bridge = BRIDGE_ADDRESS ;
      const contract = await ethers.getContractAt("Bridge", bridge);
      await contract.redeem(
        chainIds[chainfrom],
        chainIds[chainto],
        sender,
        recipient,
        amount,
        nonce,
        signature
      );
    }
  );

task("getBalance", "get balance of user")
  .addParam("chain", "Chain name")
  .addParam("user", "User address")
  .setAction(async ({ chain, user }, { ethers }) => {
    const token = TOKEN_ADDRESS;
    const contract = await ethers.getContractAt("Token", token);
    const balance = await contract.balanceOf(user);
    console.log(`Balance: ${balance.toString()}`);
  });

task("setChainId", "Set Chain ID to which bridge can connect")
  .addParam("chain", "Chain name")
  .addParam("chainallowed", "Chain name to which tokens are transferred")
  .addParam("bool", "allows or denies the connection to the Chain ID")
  .setAction(async ({ chain, chainallowed, bool }, { ethers }) => {
    const bridge = BRIDGE_ADDRESS;
    const contract = await ethers.getContractAt("Bridge", bridge);
    await contract.setChainId(chainIds[chainallowed], bool);
  });

task("setRole", "Set role for bridge contract")
  .addParam("chain", "Chain name")
  .addParam("role", "keccak256 of the role")
  .setAction(async ({ chain, role }, { ethers }) => {
    const bridge = BRIDGE_ADDRESS;
    const token = TOKEN_ADDRESS;
    const contract = await ethers.getContractAt("Token", token);
    await contract.grantRole(role, bridge);
  });

module.exports = {};
