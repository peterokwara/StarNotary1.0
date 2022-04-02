import Web3 from "web3";
import "./style.css";
import starNotaryArtifact from "../../build/contracts/StarNotary.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function () {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = starNotaryArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        starNotaryArtifact.abi,
        deployedNetwork.address
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  // Function to update status message in the page
  setStatus: function (message) {
    const status = document.getElementById("claim-star-results");
    status.innerHTML = message;
  },

  // Function called to show the star name
  starNameFunc: async function () {
    const { starName } = this.meta.methods; // To be able to use the functions in your Smart Contract use destructuring to get the function to be called
    const response = await starName().call(); // calling the starName property from your Smart Contract
    const owner = document.getElementById("star-name-results"); // Updating HTML
    owner.innerHTML = response;
  },

  // Function called to show the star owner
  starOwnerFunc: async function () {
    const { starOwner } = this.meta.methods; // To be able to use the functions in your Smart Contract use destructuring to get the function to be called
    const response = await starOwner().call(); // calling the starOwner property from your Smart Contract
    const owner = document.getElementById("star-owner-results"); // Updating HTML
    owner.innerHTML = response;
  },

  // Function called to claim a star
  claimStarFunc: async function () {
    const { claimStar, starOwner } = this.meta.methods; // To be able to use the functions in your Smart Contract use destructuring to get the function to be called
    await claimStar().send({ from: this.account }); // Use `send` instead of `call` when you call a function in your Smart Contract
    const response = await starOwner().call();
    App.setStatus("New Star Owner is " + response + " .");
  },
};

window.App = App;

window.addEventListener("load", async function () {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live"
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545")
    );
  }
  App.start();
});
