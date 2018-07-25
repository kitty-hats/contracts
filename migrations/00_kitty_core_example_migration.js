var KittyCoreExample = artifacts.require("KittyCoreExample");

module.exports = function(deployer, network) {
  if (network != "mainnet") {
    deployer.deploy(KittyCoreExample);
  }
};
