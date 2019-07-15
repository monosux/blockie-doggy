pragma solidity ^0.5.1;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "openzeppelin-solidity/contracts/drafts/Counters.sol";
import "./ERC721Claims.sol";

contract DoggyDoc is ERC721Full("DoggyDoc", "🐶"), ERC721Claims {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

	function registerDog(string memory tokenURI) public {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
	}

	function tokensOf(address _owner) public view returns(uint256[] memory) {
		return _tokensOfOwner(_owner);
	}
}