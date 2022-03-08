// We get the contract to deploy
const  main = async () =>  {

    //this is our contract factory 
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("GTransactionsdeployed to:", transactions.address);
}

const runMain = async () => {
  try {
      await main();
      process.exit(0); //the means the process went successfully 

  } catch (error) {
    console.error(error);
    process.exit(1); //this means there was an error
  }
}

runMain();

// so now we are ready to test on test networks--ropston and we used alchemy.com to test our dapp on a blockcahin
//alchemy.com is a test blcokchain
// now what do we have to do to deploy it? 
//terminal and run hardhat npx hardhat run script/deploy.js --network ropsten
//this deployed successfully and now witing for network to give us the smart conttract address so then we
//created utils folder and constants.js file and stored the new contract address as an export const 