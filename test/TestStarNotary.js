// Importing the StarNotary Smart Contract ABI (JSON representation of the smart contract)
const StarNotary = artifacts.require("./StarNotary.sol");

var accounts; // List of development accounts provided by Truffle
var owner; // Global variable use it in test cases

// This called the StarNotary Smart contract and initialize it
contract("StarNotary", (accs) => {
  accounts = accs;
  owner = accounts[0];
});

// Example test case, it will test if the contract is able to return the StarName property
// initialized in the contract constructor
it("should have the correct name", async () => {
  let instance = await StarNotary.deployed(); // Making sure the Smart Contract is deployed and getting the instance
  let starName = await instance.starName.call(); // Calling the starName property
  assert.equal(starName, "Awesome Udacity Star"); // Assert if the starName property was initialized correctly
});
