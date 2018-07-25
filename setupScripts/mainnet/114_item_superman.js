module.exports = async function (callback) {
  var artistAddress = "0x35e2268306aab43014da143f110431ec0140957a";  // ParanoidLunatic
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemSuperman = artifacts.require("ItemSuperman.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemSuperman = ItemSuperman.at(ItemSuperman.address);

  // console.log("Setup Token");
  // var err, tx = await itemSuperman.setupToken(60, "KHSMS", "Superman");
  // console.log(err, tx);
  // await itemSuperman.setKittyCoreAddress(kittyCoreAddress);
  // await itemSuperman.setCanApplyAddress(kittyItemMarket.address);
  // console.log("Transfer Tokens");
  // var err, tx = await itemSuperman.transfer(kittyItemMarket.address, 50);
  // console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("Superman", itemSuperman.address, oneEtherInWei*0.03, artistAddress, 5000);
  console.log(err, tx);

}
