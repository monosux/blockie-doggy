const HDWalletProvider = require('truffle-hdwallet-provider');
const config = require('./deploy-config');

module.exports = {
	networks: {
		development: {
			host: 'localhost',
			port: 8545,
			network_id: '*'
		},
		rinkeby: {
			provider: () => new HDWalletProvider(config.mnemonic, 'https://rinkeby.infura.io/v3/' + config.infura),
			network_id: 4,
			gas: 7000000
		},
		goerli: {
			provider: () => new HDWalletProvider(config.mnemonic, 'https://goerli.infura.io/v3/' + config.infura),
			network_id: 5,
			gas: 8000000
		}
	},
	compilers: {
		solc: {
			settings: {
				optimizer: {
					enabled: true,
					runs: 200
				}
			}
		}
	}
}
