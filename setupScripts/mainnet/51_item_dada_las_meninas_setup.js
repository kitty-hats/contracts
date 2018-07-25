module.exports = async function (callback) {
  var artistAddress = "0xad425c399d2a6812441f802ffdf18bfc6684c7ab";  // Dada splitter contract for artist cromomaniaco 
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDadaLasMeninas = artifacts.require("ItemDadaLasMeninas.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDadaLasMeninas = ItemDadaLasMeninas.at(ItemDadaLasMeninas.address);

  console.log("Setup Token");
  var err, tx = await itemDadaLasMeninas.setupToken(50, "KHLM", "DadaLasMeninas");
  console.log(err, tx);
  await itemDadaLasMeninas.setKittyCoreAddress(kittyCoreAddress);
  await itemDadaLasMeninas.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDadaLasMeninas.transfer(kittyItemMarket.address, 40);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DadaLasMeninas", itemDadaLasMeninas.address, oneEtherInWei*0.02, artistAddress, 5000);
  console.log(err, tx);
}
