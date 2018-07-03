pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        // require minimum contribution of 0.01 ether, if so, add player to the game
        require(msg.value > .01 ether);

        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        //
        return uint(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public restricted {
        // pick winner and send money to address
        uint index = random() % players.length;
        players[index].transfer(this.balance);

        // empty players array
        players = new address[](0);
    }

    modifier restricted() {
        // if used, restricts the function to be used only by contract owner / manager
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }
}
