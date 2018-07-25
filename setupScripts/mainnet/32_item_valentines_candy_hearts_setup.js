module.exports = async function (callback) {
  var artistAddress = "0xbccc57c75b5ad32c9f1655480a08d4fc0fd0f925";  // uxbecks
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemValentinesCandyHearts = artifacts.require("ItemValentinesCandyHearts.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemValentinesCandyHearts = ItemValentinesCandyHearts.at(ItemValentinesCandyHearts.address);

  console.log("Setup Token");
  var err, tx = await itemValentinesCandyHearts.setupToken(20, "KHCH", "ValentinesCandyHearts");
  console.log(err, tx);
  await itemValentinesCandyHearts.setKittyCoreAddress(kittyCoreAddress);
  await itemValentinesCandyHearts.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemValentinesCandyHearts.transfer(kittyItemMarket.address, 15);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("ValentinesCandyHearts", itemValentinesCandyHearts.address, oneEtherInWei*0.005, artistAddress, 4000);
  console.log(err, tx);

}
