// <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


//contract name events and structs 
contract Transactions  {
    uint256 transactionCounter; 

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword); 

        // like objects in OOP but we are not decalring it but only its values 
    struct TransferStruct {
        address sender; 
        address receiver; 
        uint amount;
        string message;
        uint256 timestamp;
        string keyword; 
    }
    // we can also have an array of structs to keep records of our transctions
    TransferStruct[] transactions; 

// now we need functions for different tasks needed done..
// 1.to add transaction to blockchain 2. get an array of all transactions 3.get total transaction count
    function addToBlockchain(address payable reciever, uint amount, string memory message, string memory keyword) public {
        transactionCounter += 1; 
        // we can use .push like JavaScript to push and pop transctions (structs) into our array
        transactions.push(TransferStruct(msg.sender, reciever, amount, message, block.timestamp, keyword ));
        // now in order to make the actual transfer we need to emit the event Transfer like above event Transfer(address, ...)
        emit Transfer(msg.sender, reciever, amount, message, block.timestamp, keyword);
    }

      // get all trnsactions from our TransferStruct and return the values 
    function getAllTransactions() public view returns (TransferStruct[] memory) {
         return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
         return transactionCounter; 
    }

}