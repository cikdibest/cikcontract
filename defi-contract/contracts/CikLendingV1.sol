// contracts/CikLendingV1.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CikLendingV1 {
    mapping(address => uint256) public balances;
    mapping(address => uint256) public debt;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function borrow(uint256 amount) external {
        require(balances[msg.sender] >= amount / 2, "Insufficient collateral");
        debt[msg.sender] += amount;
        payable(msg.sender).transfer(amount);
    }

    function repay() external payable {
        require(msg.value == debt[msg.sender], "Incorrect repayment");
        debt[msg.sender] = 0;
    }

    function getDebt() external view returns (uint256) {
        return debt[msg.sender];
    }
}
