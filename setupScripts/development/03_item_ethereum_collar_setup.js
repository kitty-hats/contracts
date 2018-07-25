module.exports = async function (callback) {
  var artistAddress = web3.eth.accounts[0];
  const oneEtherInWei = 1000000000000000000;

  var KittyCoreExample = artifacts.require("KittyCoreExample.sol");
  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemEthereumCollar = artifacts.require("ItemEthereumCollar.sol");

  var kittyCoreExample = KittyCoreExample.at(KittyCoreExample.address);
  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemEthereumCollar = ItemEthereumCollar.at(ItemEthereumCollar.address);

  console.log("Setup Token");
  var err, tx = await itemEthereumCollar.setupToken(500, "KHCL", "EthereumCollar");
  console.log(err, tx);
  await itemEthereumCollar.setKittyCoreAddress(kittyCoreExample.address);
  await itemEthereumCollar.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemEthereumCollar.transfer(kittyItemMarket.address, 450);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("EthereumCollar", itemEthereumCollar.address, oneEtherInWei*0.75, artistAddress, 2500);
  console.log(err, tx);

}
