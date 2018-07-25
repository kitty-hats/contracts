module.exports = async function (callback) {
  var artistAddress = "0x4eb395c9c5829a6e87fc5facfc00ccd8ab4a91ad";  // K4C
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemBubblesForSadie = artifacts.require("ItemBubblesForSadie.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemBubblesForSadie = ItemBubblesForSadie.at(ItemBubblesForSadie.address);

  console.log("Setup Token");
  var err, tx = await itemBubblesForSadie.setupToken(120, "KHBB", "BubblesForSadie");
  console.log(err, tx);
  await itemBubblesForSadie.setKittyCoreAddress(kittyCoreAddress);
  await itemBubblesForSadie.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemBubblesForSadie.transfer(kittyItemMarket.address, 100);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("BubblesForSadie", itemBubblesForSadie.address, oneEtherInWei*0.025, artistAddress, 10000);
  console.log(err, tx);

}
