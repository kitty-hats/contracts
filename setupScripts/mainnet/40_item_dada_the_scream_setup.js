module.exports = async function (callback) {
  var artistAddress = "0x44656735175c1b01643a2fa2eeb7bdae33bb2b36";  // Bea's Splitter Contract
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDadaTheScream = artifacts.require("ItemDadaTheScream.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDadaTheScream = ItemDadaTheScream.at(ItemDadaTheScream.address);

  console.log("Setup Token");
  var err, tx = await itemDadaTheScream.setupToken(50, "KHDS", "DadaTheScream");
  console.log(err, tx);
  await itemDadaTheScream.setKittyCoreAddress(kittyCoreAddress);
  await itemDadaTheScream.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDadaTheScream.transfer(kittyItemMarket.address, 40);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DadaTheScream", itemDadaTheScream.address, oneEtherInWei*0.1, artistAddress, 5000);
  console.log(err, tx);

}
