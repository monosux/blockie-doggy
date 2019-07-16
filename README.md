# Blockie Doggy: blockchain based animal registry

## Demo
Demo running on Rinkeby Testnet: [QmcyVnRJ64wLjvPiqMwQWQuBTAebMHxPXRumKVjv6xgSnw](https://ipfs.infura.io/ipfs/QmcyVnRJ64wLjvPiqMwQWQuBTAebMHxPXRumKVjv6xgSnw/)

## About 
The Blockie Doggy is a demo project created during Truffle Univerity. The project shows how ERC721 token can be used to create a simple decentralized animal registry.

ERC721 token used as a base for animal identity. I created additional extension 'ERC721Claims' that makes it possible to add 'claims' to the animal identity. 'Claims' are proved by veterinary information about a dog. For example dog's special ability. Take a look at 'ERC721ClaimsInterface' contract to see the basic structure of this extension.

## Use Cases
* The animal owner can register the dog and get ERC721 token as a dog ID.

* Veterinary can add 'claims' to a dog ID. Such as information about vaccination or special dog's abilities.

* Anyone can check information about a dog. See the ID and issued 'claims'.

## Setup

0. Be sure you have **truffle** and **ganache-cli** installed globally. If not:
```
yarn global add ganache-cli truffle
```

1. Install packages.
```
yarn install
```

2. Create *deploy-config.json* file:
```json
{
    "mnemonic": "",
    "infura": ""
}
```

3. Run the development blockchain.
```
ganache-cli
```

4. Compile and migrate contracts.
```
truffle compile
truffle migrate
```

5. Run dApp.
```
yarn start
```

6. Have fun 😎