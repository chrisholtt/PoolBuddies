// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Lottery {
    uint256 maxCapacity = 5;
    address public owner;
    address payable[] public players;
    uint256 public lotteryId;
    mapping(uint256 => address payable) public lotteryHistory;

    constructor() {
        owner = msg.sender;
        lotteryId = 1;
    }

    function getWinnerByLottery(uint256 lottery)
        public
        view
        returns (address payable)
    {
        return lotteryHistory[lottery];
    }

    function getLotteryId() public view returns (uint256) {
        return lotteryId;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function getPlayersLength() public view returns (uint256) {
        return players.length;
    }

    function getUsersTickets(address usersAdd) public view returns (uint256) {
        uint256 tickets = 0;
        for (uint256 i = 0; i < players.length; i++) {
            if (usersAdd == players[i]) {
                tickets += 1;
            }
        }
        return tickets;
    }

    function enter() public payable {
        require(msg.value > 1 ether);
        require(players.length < maxCapacity);
        // address of player entering lottery
        players.push(payable(msg.sender));
    }

    function getRandomNumber() public view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    function pickWinner() public onlyOwner {
        require(players.length == maxCapacity);
        uint256 index = getRandomNumber() % players.length;
        players[index].transfer(address(this).balance);
        lotteryHistory[lotteryId] = players[index];
        lotteryId++;
        // reset the state of the contract
        players = new address payable[](0);
    }

    function getOwnersAddress() public view returns (address) {
        return owner;
    }

    function isPoolFull() public view returns (bool) {
        return players.length >= maxCapacity;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}
