import IPFS from 'ipfs-http-client';

class IPFSWrapper {
	constructor() {
		this.ipfs = new IPFS({
			host: 'ipfs.infura.io',
			port: 5001,
			protocol: 'https'
		});
	}

	async upload(file) {
		try {
			let hash = await this.ipfs.add(file, {
				pin: (process.env.NODE_ENV === 'production')
			});
			return 'ipfs://' + hash[0].hash;
		} catch(e) {
			throw new Error('IPFS error');
		}		
	}

	async download(url) {
		try {
			return await this.ipfs.get(url.replace('ipfs://', ''));
		} catch(e) {
			throw new Error('IPFS error');
		}		
	}
}

export default IPFSWrapper;