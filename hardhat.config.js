require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
const {task} = require("hardhat/config");
const fs=require('fs');

const INFURA_URL='https://rinkeby.infura.io/v3/45a26c26f73648fc9e21496dd1bb8ad2';
const PRIVATE_KEY='84ed6bceaef1f7f7dc93f4fd530705de954723c9bc6da4f7ed9c576d5d000d29';
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("deploy-token", "deploy the SWASH token", async (taskArgs, hre) => {
  const [deployer]= await ethers.getSigners();
  console.log('deploying contracts with the account: %s',deployer.address);
  const balance= await deployer.getBalance();
  console.log('Account balance: %s',balance);
  const Swash=await ethers.getContractFactory('SWASH');
  const swash=await Swash.deploy();
  console.log("Swash is deployed with address: %s",swash.address);
  const data={
    address:swash.address,
    abi:JSON.parse(swash.interface.format('json'))
  }
  fs.writeFileSync('frontend/src/contracts/swash.json',JSON.stringify(data));
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// module.exports = {
//   solidity: "0.8.6",
// };

module.exports = {
  solidity: "0.8.6",
  // gasReporter: {
  //   enabled: (process.env.REPORT_GAS) ? true : false
  // },
  networks:{
    rinkeby:{
      url:INFURA_URL,
      accounts:[`0x${PRIVATE_KEY}`]
    }
  }
};
