require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/pvVMbKeH0mPMTBUypg7i3jA9FZ6lE9Bq",
      accounts: ['0f5d6120123405735549417748a7d9e6a5698b61d005fe629f7c6f8e594d50a2'], //i do not understand why private key info is listed here
      //it should not be exposed like this on open net for peope to steal
    }
  }
}
// so now we are ready to test on test networks--ropston and we used alchemy.com to test our dapp on a blockcahin
//alchemy.com is a test blcokchain
// now what do we have to do to deploy it? 
//terminal and run hardhat npx hardhat run script/deploy.js --network ropsten
//this deployed successfully and now witing for network to give us the smart conttract address so then we
//created utils folder and constants.js file and stored the new contract address as an export const 
//this process of contract creatioon created several things in our folder
//1. artifacts folder, transctions.json is the ABI and other files needed 
