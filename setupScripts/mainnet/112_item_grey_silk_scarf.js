module.exports = async function (callback) {
  var artistAddress = "0x35e2268306aab43014da143f110431ec0140957a";  // ParanoidLunatic
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemGreySilkScarf = artifacts.require("ItemGreySilkScarf.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemGreySilkScarf = ItemGreySilkScarf.at(ItemGreySilkScarf.address);

  console.log("Setup Token");
  var err, tx = await itemGreySilkScarf.setupToken(60, "KHGSS", "GreySilkScarf");
  console.log(err, tx);
  await itemGreySilkScarf.setKittyCoreAddress(kittyCoreAddress);
  await itemGreySilkScarf.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemGreySilkScarf.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("GreySilkScarf", itemGreySilkScarf.address, oneEtherInWei*0.003, artistAddress, 5000);
  console.log(err, tx);

}
