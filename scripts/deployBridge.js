const hre = require("hardhat");
require("dotenv").config();

async function deployBridge() {
  const Bridge = await hre.ethers.getContractFactory("Bridge");
  const token = '0x38544fB4F4Aa3658F5d3b504Dc83786773d4057a';
  const chainId = 42;

  console.log("starting deploying bridge...");
  const bridge = await Bridge.deploy(token, chainId);
  console.log("Bridge deployed with address: " + bridge.address);
  console.log("wait of deploying...");
  await bridge.deployed();
  console.log("wait of delay...");
  await new Promise((resolve) => setTimeout(resolve, 60000));
  console.log("starting verify bridge...");
  try {
    await hre.run("verify:verify", {
      address: bridge.address,
      contract: "contracts/Bridge.sol:Bridge",
      constructorArguments: [token, chainId],
    });
    console.log("verify success");
  } catch (e) {
    console.log(e);
  }
}

deployBridge()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  // 0x824efEca7EFAA7570983E557FD94967B819b5BC2 on kovan