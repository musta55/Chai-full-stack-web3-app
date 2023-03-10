
const hre = require("hardhat");

async function main() {
  const [owner,from1,from2,from3] = await hre.ethers.getSigners();
  const chai = await hre.ethers.getContractFactory('chai');
  const contract = await chai.deploy();     // Instance of contract

  await contract.deployed();
  console.log("Address of the contract: ", contract.address);

  const addresses = [owner.address, from1.address, from2.address, from3.address];
  console.log("Before buying chai: ");

  await consoleBalances(addresses);


 const amount = {value:hre.ethers.utils.parseEther("2")}
 await contract.connect(from1).buyChai("from1", "Very nice chai", amount);
 await contract.connect(from2).buyChai("from2", "Very beautiful chai", amount);
 await contract.connect(from3).buyChai("from3", "Rong chai", amount);

  console.log("after buying chai: ");
  await consoleBalances(addresses);
  const memos = await  contract.getMemos();
  consoleMemos(memos);


}


async function getBalances(address)
 {
  const balanceDigit = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceDigit);

 }

 async function consoleBalances (addresses)
 {
  let counter =0;
  for(const address of addresses)
  {
    console.log(`Address ${counter} balance: `, await getBalances(address))
  counter++;
  
  }
 }

 async function consoleMemos (memos) {

 
  for(const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;

    console.log(`At ${timestamp} ,name ${name} , address ${from}, message ${message}`);
  }
}

 

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
