module.exports = async function (callback) {
  var artistAddress = "";  // Joey
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemCKBeanie = artifacts.require("ItemCKBeanie.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemCKBeanie = ItemCKBeanie.at(ItemCKBeanie.address);

  console.log("Setup Token");
  var err, tx = await itemCKBeanie.setupToken(40, "KHKB", "CKBeanie");
  console.log(err, tx);
  await itemCKBeanie.setKittyCoreAddress(kittyCoreAddress);
  await itemCKBeanie.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemCKBeanie.transfer(kittyItemMarket.address, 30);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("CKBeanie", itemCKBeanie.address, oneEtherInWei*0.01, artistAddress, 5000);
  console.log(err, tx);

}
