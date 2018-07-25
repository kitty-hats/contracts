Kitty Hats Contract
===================

Kitty hats contract uses [truffle](http://truffleframework.com/).

### Compiling

    $ truffle compile

### Migrations

    $ truffle migrate

### Running Tests

    $ truffle test

### Deploying to Ropsten Test Network

A lot of this is from [this](https://medium.com/@guccimanepunk/how-to-deploy-a-truffle-contract-to-ropsten-e2fb817870c1) post.

You need to run a full node (or have access to one) to deploy contracts. Using [geth](https://github.com/ethereum/go-ethereum)

    $ geth --testnet account new

This will prompt for a password to encrypt the wallet. `geth` stores data in `~/Library/Ethereum` on Mac and `~/.ethereum` on Linux, as outlined [here](https://github.com/ethereum/go-ethereum/wiki/Backup-&-restore). Backup your files. For example, your encrypted wallet for the testnet would be located in a file similar to: `~/Library/Ethereum/testnet/keystore/UTC--2017-12-19T08-45-01.800939312Z--0ea7c192efb4d38d500faf471cc57928ee4df649`.

You also need to get some Ropsten ETH in the address. [Here's](https://faucet.metamask.io/) a faucet site to seed an account with ETH.

Once you've created a new testnet account, you can run a full node.

    $ geth --testnet --fast --rpc --rpcapi eth,net,web3,personal

This runs the RPC API on `localhost:8545` by defualt. In order to do any transaction that requires ETH, you must unlock the account you wish to transact with:

    $ geth attach http://127.0.0.1:8545
    > personal.unlockAccount(web3.eth.accounts[0])
        Unlock account 0x0ea7c192efb4d38d500faf471cc57928ee4df649
        Passphrase: 
        true

The account remains unlocked for a short period of time. Once it's unlocked, you can do things like migrate your truffle contracts

    $ truffle migrate --network ropsten
