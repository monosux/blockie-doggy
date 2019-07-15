pragma solidity ^0.5.1;

import "openzeppelin-solidity/contracts/drafts/Counters.sol";
import "./ERC721ClaimsInterface.sol";
import "./VetRole.sol";

contract ERC721Claims is ERC721ClaimsInterface, VetRole {
    using Counters for Counters.Counter;
    Counters.Counter private _claimIds;

    // Mapping from claim ID to claim
    mapping (uint256 => Claim) private _claims;

    // Mapping from token ID to list of claims.
	mapping (uint256 => uint256[]) private _ownedClaims;

    // Mapping from issuer to list of issued claims.
	mapping (address => uint256[]) private _claimIssuer;

    function addClaim(
        uint256 subject,
        uint256 tokenId,
        uint256 expiration
    ) public onlyVet {
        Claim memory claim = Claim({
            token_id: tokenId,
			subject: subject,
			issuer: msg.sender,
            issue_time: block.timestamp,
            expiration_time: expiration
		});
        _claimIds.increment();
        uint256 cliamId = _claimIds.current();
        _mintClaim(claim, cliamId, tokenId);
    }

    function removeClaim(uint256 claimId) public onlyVet {
        Claim memory claim = _claims[claimId];
        require((msg.sender == claim.issuer), "Caller not an issuer");
        delete _claims[claimId];
        emit ClaimAdded(msg.sender, claimId);
    }

    function getClaim(uint256 claimId) public view returns(
        uint256 token_id,
        uint256 subject,
        address issuer,
        uint256 issue_time,
        uint256 expiration_time
    ) {
        Claim memory claim = _claims[claimId];
        return(claim.token_id, claim.subject, claim.issuer, claim.issue_time, claim.expiration_time);
    }

    function getTokenClaims(uint256 tokenId) public view returns(uint256[] memory) {
        return _ownedClaims[tokenId];
    }

    function getIssuerClaims(address issuer) public view returns(uint256[] memory) {
        return _claimIssuer[issuer];
    }

    function _mintClaim(Claim memory claim, uint256 cliamId, uint256 tokenId) internal {
        _claims[cliamId] = claim;
        _ownedClaims[tokenId].push(cliamId);
        _claimIssuer[msg.sender].push(cliamId);
        emit ClaimAdded(msg.sender, tokenId);
    }
}