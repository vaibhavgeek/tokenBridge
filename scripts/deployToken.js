const { ethers } = require("ethers");
const hre = require("hardhat");
require("dotenv").config();

async function deployToken() {
	const Token = await hre.ethers.getContractFactory('Token');
	console.log('starting deploying token...');
	const token = await Token.deploy('MyToken', 'MTK');
	console.log('MyToken deployed with address: ' + token.address);
	console.log('wait of deploying...');
	await token.deployed();
	console.log('wait of delay...');
    await new Promise((resolve) => setTimeout(resolve, 60000));
	console.log('starting verify token...')
	try {
		await hre.run('verify:verify', {
			address: token.address,
			contract: 'contracts/ERC20.sol:Token',
			constructorArguments: [ 'MyToken', 'MTK' ],
		});
		console.log('verify success')
	} catch (e) {
		console.log(e)
	}

}

deployToken()
.then(() => process.exit(0))
.catch(error => {
	console.error(error)
	process.exit(1)
})

// 0x824efEca7EFAA7570983E557FD94967B819b5BC2 on kovan