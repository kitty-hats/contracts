module.exports = async function (callback) {
  var artistAddress = "0x5c2e98f4d0e345482cd06647ce768b98679cf4bd";  // Dada splitter contract for artist
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDadaBedroomArles = artifacts.require("ItemDadaBedroomArles.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDadaBedroomArles = ItemDadaBedroomArles.at(ItemDadaBedroomArles.address);

  console.log("Setup Token");
  var err, tx = await itemDadaBedroomArles.setupToken(10, "KHBA", "DadaBedroomArles");
  console.log(err, tx);
  await itemDadaBedroomArles.setKittyCoreAddress(kittyCoreAddress);
  await itemDadaBedroomArles.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDadaBedroomArles.transfer(kittyItemMarket.address, 5);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DadaBedroomArles", itemDadaBedroomArles.address, oneEtherInWei*0.1, artistAddress, 5000);
  console.log(err, tx);
}
