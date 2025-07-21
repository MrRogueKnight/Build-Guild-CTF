//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./INFTFlags.sol";

contract Challenge2Solution {
    address public challenge2Address;

    constructor(address _challenge2Address) {
        challenge2Address = _challenge2Address;
    }

    function solve() public {
        // Call the justCallMe function on Challenge2
        // This will make msg.sender = this contract address
        // and tx.origin = the EOA that called this contract
        // So msg.sender != tx.origin, which satisfies the requirement
        (bool success, ) = challenge2Address.call(abi.encodeWithSignature("justCallMe()"));
        require(success, "Call to justCallMe failed");
    }
}
