require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-web3");

require("solidity-coverage");
require("hardhat-docgen");
require("@openzeppelin/hardhat-upgrades");
 
require("./tasks")

const KOVAN_URL = "";
const MNEMONIC_WORDS =  "";
const PRIVATE_KEY = "";
const ETHERSCAN_API_KEY = "";


module.exports = {
  solidity: "0.8.6",
  networks: {
	kovan: {
		url: KOVAN_URL,
		accounts: [`0x${PRIVATE_KEY}`]
	}
  }, 
  etherscan: {
	  apiKey: ETHERSCAN_API_KEY
  }
};
