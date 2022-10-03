// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Lottery {
    address public owner;
    uint256 public gameNumber;
    uint256 public maxCapacity = 1;

    address payable[] public players;
    uint256[] public guesses;
    uint256[] public numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    uint256 public winningNumber = 0;
    address payable[] public winners;

    constructor() {
        owner = msg.sender;
        gameNumber = 1;
    }

    // Getters
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getGameNumber() public view returns (uint256) {
        return gameNumber;
    }

    function getPreviousWinners()
        public
        view
        returns (address payable[] memory)
    {
        return winners;
    }

    function getWinningNumber() public view returns (uint256) {
        return winningNumber;
    }

    function getNumberOfPlayers() public view returns (uint256) {
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

    function getRandomNumber() public view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    function enter(uint256 number) public payable {
        require(msg.value > 1 ether);
        require(number > 0 && number <= 10);

        // Push the players address
        players.push(payable(msg.sender));
        // Push the players guess
        guesses.push(number);
    }

    function pickWinner() public onlyOwner {
        require(players.length > 0);
        winningNumber = getRandomNumber() % numbers.length;
        winningNumber = numbers[winningNumber];

        // Re-set the state of winners and winning numbers
        uint256 numberOfWinners = 0;
        winners = new address payable[](0);

        // Loop over guesses and calculate number of winners:
        for (uint256 i = 0; i < guesses.length; i++) {
            if (guesses[i] == winningNumber) {
                winners.push(players[i]);
                numberOfWinners += 1;
            }
        }
        // If there are winners, loop over and send them their proportion of the balance
        if (numberOfWinners > 0) {
            uint256 ammountToSend = (address(this).balance / numberOfWinners);
            for (uint256 i = 0; i < winners.length; i++) {
                winners[i].transfer(ammountToSend);
            }
        }
        gameNumber++;
        // reset the state of the contract
        players = new address payable[](0);
        guesses = new uint256[](0);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}
