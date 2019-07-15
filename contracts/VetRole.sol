pragma solidity ^0.5.1;

import "openzeppelin-solidity/contracts/access/Roles.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract VetRole is Ownable {
    using Roles for Roles.Role;

    event VetAdded(address indexed account);
    event VetRemoved(address indexed account);

    Roles.Role private _vets;

    modifier onlyVet() {
        require(isVet(msg.sender), "Caller not a Vet");
        _;
    }

    function registerAsVet() public {
        addVet(msg.sender);
    }

    function addVet(address account) public {
        _vets.add(account);
        emit VetAdded(account);
    }

    function removeVet(address account) public onlyOwner {
        _vets.remove(account);
        emit VetRemoved(account);
    }

    function isVet(address account) public view returns (bool) {
        return _vets.has(account);
    }
}