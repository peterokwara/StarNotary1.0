// Importing the StarNotary Smart Contract ABI (JSON representation of the smart contract)
const StarNotary = artifacts.require("./StarNotary.sol");

var accounts; // List of development accounts provided by Truffle
var owner; // Global variable use it in test cases

// This called the StarNotary Smart contract and initialize it
contract("StarNotary", (accs) => {
  accounts = accs;
  owner = accounts[0];
});

describe("The StarNotary v1 contract", () => {
  // Example test case, it will test if the contract is able to return the StarName property
  // initialized in the contract constructor
  it("should have the correct name", async () => {
    let instance = await StarNotary.deployed(); // Making sure the Smart Contract is deployed and getting the instance
    let starName = await instance.starName.call(); // Calling the starName property
    assert.equal(starName, "Awesome Udacity Star"); // Assert if the starName property was initialized correctly
  });

  // Example test case, it will test if the Smart Contract function claimStar assigned the Star to the owner 
  it('should be able to claim', async () => {

    let instance = await StarNotary.deployed(); // Making sure the Smart Contract is deployed and getting the instance
    await instance.claimStar({from: owner}) // Calling the Smart Contract function claimStar
    let starOwner = await instance.starOwner.call(); // Getting the owner address
    assert.equal(starOwner, owner); // Verifying if the owner address match with the owner of the address
    
  });

  // Example test case, it will test if the Smart Contract function claimStar assigned the Star to the owner address and that it can be changed
  it("should change owners", async () => {
    let instance = await StarNotary.deployed();
    let secondUser = accounts[1];

    await instance.claimStar({ from: owner });

    // Claim star using the first owner
    let starOwner = await instance.starOwner.call();

    assert.equal(starOwner, owner);

    // Claim star using the second owner
    await instance.claimStar({ from: secondUser });

    let secondOwner = await instance.starOwner.call();

    assert.equal(secondOwner, secondUser);
  });
});
