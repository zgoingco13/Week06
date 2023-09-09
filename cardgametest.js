let expect = chai.expect;

 describe('MyFunctions', function() {
  describe ('Player', function() {
    it('should add a point to the player score that wins the round', function() {
      let player1 = new Player("Tester1");
      let player2 = new Player("Tester2");

      player1.winsRound();
      expect(player1.score).to.equal(1);
      expect(player2.score).to.equal(0);

      player1.winsRound();
      expect(player1.score).to.equal(2);
      expect(player2.score).to.equal(0);

      player2.winsRound();
      expect(player1.score).to.equal(2);
      expect(player2.score).to.equal(1);
    })

    it ('should output an error if score does not increase by 1', function() {
      expect(function() {
        player1.winsRound();
      }).to.throw(Error);
    });
  });
}); 