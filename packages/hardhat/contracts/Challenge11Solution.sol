//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Challenge11Solution {
    function solve(address challenge) public {
        // Call mintFlag on Challenge11
        // This makes msg.sender = this contract address
        // and tx.origin = the EOA that called this contract
        // The bit manipulation check should pass if addresses are compatible
        (bool success,) = challenge.call(abi.encodeWithSignature("mintFlag()"));
        require(success, "Call to mintFlag failed");
    }
} 