pragma solidity ^0.5.1;

contract ERC721ClaimsInterface {
    event ClaimAdded(address indexed issuer, uint256 indexed tokenId);
    event ClaimRemoved(address indexed issuer, uint256 indexed claimId);

    struct Claim {
        uint256 token_id;
        uint256 subject;
        address issuer;
        uint256 issue_time;
        uint256 expiration_time;
    }

    function addClaim(uint256 subject, uint256 tokenId, uint256 expiration) public;
    function removeClaim(uint256 claimId) public;
    function getClaim(uint256 claimId) public view returns(
        uint256 token_id,
        uint256 subject,
        address issuer,
        uint256 issue_time,
        uint256 expiration_time
    );
}