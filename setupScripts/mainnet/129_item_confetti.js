module.exports = async function (callback) {
  var artistAddress = "0xbccc57c75b5ad32c9f1655480a08d4fc0fd0f925";  // BxKat
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemConfetti = artifacts.require("ItemConfetti.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemConfetti = ItemConfetti.at(ItemConfetti.address);

  console.log("Setup Token");
  var err, tx = await itemConfetti.setupToken(60, "KHWC", "Confetti");
  console.log(err, tx);
  await itemConfetti.setKittyCoreAddress(kittyCoreAddress);
  await itemConfetti.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemConfetti.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("Confetti", itemConfetti.address, oneEtherInWei*0.01, artistAddress, 5000);
  console.log(err, tx);

}
