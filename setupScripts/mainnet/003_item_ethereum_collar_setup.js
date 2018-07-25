module.exports = async function (callback) {
  var artistAddress = web3.eth.accounts[0];
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemEthereumCollar = artifacts.require("ItemEthereumCollar.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemEthereumCollar = ItemEthereumCollar.at(ItemEthereumCollar.address);

  console.log("Setup Token");
  var err, tx = await itemEthereumCollar.setupToken(500, "KHCL", "EthereumCollar");
  console.log(err, tx);
  await itemEthereumCollar.setKittyCoreAddress(kittyCoreAddress);
  await itemEthereumCollar.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemEthereumCollar.transfer(kittyItemMarket.address, 450);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("EthereumCollar", itemEthereumCollar.address, oneEtherInWei*0.75, artistAddress, 2500);
  console.log(err, tx);

}
