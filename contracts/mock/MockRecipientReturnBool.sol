// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

/**
 * ERC677 recipient that returns false for error instead of reverting
 * The return value gets ignored, and transfer proceeds succesfully. This is by design.
 */
contract MockRecipientReturnBool {
    uint public txCount;

    function onTokenTransfer(
        address _sender,
        uint256 _value,
        bytes calldata _data
    ) external returns (bool) {
        txCount += 1;
        bool retval = keccak256(_data) != keccak256("err");
        // for testing: return false if passed "err"
        return retval;
    }
}
