module.exports = async function (callback) {
  var artistAddress = "0x4eb395c9c5829a6e87fc5facfc00ccd8ab4a91ad";  // Bruno donating to K4C
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemRussianMascot = artifacts.require("ItemRussianMascot.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemRussianMascot = ItemRussianMascot.at(ItemRussianMascot.address);

  console.log("Setup Token");
  var err, tx = await itemRussianMascot.setupToken(60, "KHWRM", "RussianMascot");
  console.log(err, tx);
  await itemRussianMascot.setKittyCoreAddress(kittyCoreAddress);
  await itemRussianMascot.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemRussianMascot.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("RussianMascot", itemRussianMascot.address, oneEtherInWei*0.03, artistAddress, 5000);
  console.log(err, tx);

}
