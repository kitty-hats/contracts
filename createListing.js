const fs = require('fs');
const path = require('path');

module.exports = async function (callback) {
    var KittyItemMarket = artifacts.require("KittyItemMarket.sol");

    var KittyCoreExample = artifacts.require("KittyCoreExample.sol");

    var ItemChucks = artifacts.require("ItemChucks.sol");
    var ItemEthereumCollar = artifacts.require("ItemEthereumCollar.sol");
    var ItemFlatBrim = artifacts.require("ItemFlatBrim.sol");
    var ItemiWatch = artifacts.require("ItemiWatch.sol");
    var ItemLei = artifacts.require("ItemLei.sol");
    var ItemMittens = artifacts.require("ItemMittens.sol");
    var ItemMomTattoo = artifacts.require("ItemMomTattoo.sol");
    var ItemNerdGlasses = artifacts.require("ItemNerdGlasses.sol");
    var ItemShutterShades = artifacts.require("ItemShutterShades.sol");
    var ItemTiara = artifacts.require("ItemTiara.sol");
    var ItemTinFoil = artifacts.require("ItemTinFoil.sol");
    var ItemTopHat = artifacts.require("ItemTopHat.sol");
    var ItemTrapper = artifacts.require("ItemTrapper.sol");
    var ItemWayfarers = artifacts.require("ItemWayfarers.sol");
    var ItemYeezy = artifacts.require("ItemYeezy.sol");

    const listingVersion = '1.0.0';
    const kittyCoreAddress = KittyItemMarket.network_id != '1' ? KittyCoreExample.address : '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d';
    const listing = {
        "version": listingVersion,
        "networkId": KittyItemMarket.network_id,
        "marketplaceAddress": KittyItemMarket.address,
        "kittyCoreAddress": kittyCoreAddress,
        "categories": [
            {
                "displayName": "Hats",
                "items": [
    
                    {
                        "name": "Top Hat",
                        "tokenAddress": ItemTopHat.address,
                        "previewImage": "img/preview/tophat.svg",
                        "assetUrl": "img/asset/tophat.svg"
                    },
                    {
                        "name": "Trapper",
                        "tokenAddress": ItemTrapper.address,
                        "previewImage": "img/preview/trapper.svg",
                        "assetUrl": "img/asset/trapper.svg"
                    },
                    {
                        "name": "Flat Brim",
                        "tokenAddress": ItemFlatBrim.address,
                        "previewImage": "img/preview/flatbrim.svg",
                        "assetUrl": "img/asset/flatbrim.svg"
                    },
                    {
                        "name": "Tiara",
                        "tokenAddress": ItemTiara.address,
                        "previewImage": "img/preview/tiara.svg",
                        "assetUrl": "img/asset/tiara.svg"
                    },
                    {
                        "name": "Tin Foil",
                        "tokenAddress": ItemTinFoil.address,
                        "previewImage": "img/preview/tinfoil.svg",
                        "assetUrl": "img/asset/tinfoil.svg"
                    }
                ]
            },
            {
                "displayName": "Accessories",
                "items": [
                    {
                        "name": "Ethereum Collar",
                        "tokenAddress": ItemEthereumCollar.address,
                        "previewImage": "img/preview/collar.svg",
                        "assetUrl": "img/asset/collar.svg"
                    },
                    {
                        "name": "iWatch",
                        "tokenAddress": ItemiWatch.address,
                        "previewImage": "img/preview/iwatch.svg",
                        "assetUrl": "img/asset/iwatch.svg"
                    },
                    {
                        "name": "Lei",
                        "tokenAddress": ItemLei.address,
                        "previewImage": "img/preview/lei.svg",
                        "assetUrl": "img/asset/lei.svg"
                    },
                    {
                        "name": "Mom Tattoo",
                        "tokenAddress": ItemMomTattoo.address,
                        "previewImage": "img/preview/momtat.svg",
                        "assetUrl": "img/asset/momtat.svg"
                    }
                ]
            },
            {
                "displayName": "Glasses",
                "items": [
                    {
                        "name": "Nerd Glasses",
                        "tokenAddress": ItemNerdGlasses.address,
                        "previewImage": "img/preview/nerd.svg",
                        "assetUrl": "img/asset/nerd.svg"
                    },
                    {
                        "name": "Wayfarers",
                        "tokenAddress": ItemWayfarers.address,
                        "previewImage": "img/preview/wayfarers.svg",
                        "assetUrl": "img/asset/wayfarers.svg"
                    },
                    {
                        "name": "Shutter Shades",
                        "tokenAddress": ItemShutterShades.address,
                        "previewImage": "img/preview/shutter.svg",
                        "assetUrl": "img/asset/shutter.svg"
                    }
                ]
            },
            {
                "displayName": "Shoes",
                "items": [
                    {
                        "name": "Mittens",
                        "tokenAddress": ItemMittens.address,
                        "previewImage": "img/preview/mittens.svg",
                        "assetUrl": "img/asset/mittens.svg"
                    },
                    {
                        "name": "Chucks",
                        "tokenAddress": ItemChucks.address,
                        "previewImage": "img/preview/chucks.svg",
                        "assetUrl": "img/asset/chucks.svg"
                    },
                    {
                        "name": "Yeezy",
                        "tokenAddress": ItemYeezy.address,
                        "previewImage": "img/preview/shutter.svg",
                        "assetUrl": "img/asset/shutter.svg"
                    }
                ]
            }
        ]
    }

    try {
        fs.writeFileSync(path.join(__dirname, `listing_${KittyItemMarket.network_id}.json`), JSON.stringify(listing, null, '\t'))
    } catch (err) {
        console.error(err);
    }
    
    callback();
    return;
}