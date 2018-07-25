module.exports = async function (callback) {
  var artistAddress = "0x35e2268306aab43014da143f110431ec0140957a";  // ParanoidLunatic
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemMemeDealWithItShades = artifacts.require("ItemMemeDealWithItShades.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemMemeDealWithItShades = ItemMemeDealWithItShades.at(ItemMemeDealWithItShades.address);

  console.log("Setup Token");
  var err, tx = await itemMemeDealWithItShades.setupToken(1000, "KHMD", "MemeDealWithItShades");
  console.log(err, tx);
  await itemMemeDealWithItShades.setKittyCoreAddress(kittyCoreAddress);
  await itemMemeDealWithItShades.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemMemeDealWithItShades.transfer(kittyItemMarket.address, 600);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("MemeDealWithItShades", itemMemeDealWithItShades.address, oneEtherInWei*0.0001, artistAddress, 5000);
  console.log(err, tx);

}
