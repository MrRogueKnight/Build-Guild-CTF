//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface IChallenge2 {
    function justCallMe() external;
}

contract Challenge2SolutionV2 {
    function solve(address challenge2Address) public {
        IChallenge2(challenge2Address).justCallMe();
    }
} 