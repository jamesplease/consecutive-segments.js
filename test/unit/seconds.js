describe('milliseconds', function() {
  describe('disconnected', function() {
    beforeEach(function() {
      this.result = consecutiveSegments(fixtures.disconnected, 'seconds');
    });

    it('should return two groups', function() {
      expect(this.result).to.have.length(2);
    });

    it('should return 1 segment in each group', function() {
      expect(Object.keys(this.result[0])).to.have.length(1);
      expect(Object.keys(this.result[1])).to.have.length(1);
    });

    it('return a segment of "one" for the first group', function() {
      expect(this.result[0][0]).to.deep.equal({
        timestamp: '1',
        events: 'one'
      });
    });

    it('return a segment of "three" for the second group', function() {
      expect(this.result[1][0]).to.deep.equal({
        timestamp: '3',
        events: 'three'
      });
    });
  });

  describe('connected', function() {
    beforeEach(function() {
      this.result = consecutiveSegments(fixtures.connected, 'seconds');
    });

    it('should return one group', function() {
      expect(this.result).to.have.length(1);
    });

    it('should return 2 segments in that group', function() {
      expect(Object.keys(this.result[0])).to.have.length(2);
    });

    it('return segment "one" for the first segment', function() {
      expect(this.result[0][0]).to.deep.equal({
        timestamp: '1',
        events: 'one'
      });
    });

    it('return segment "two" for the second segment', function() {
      expect(this.result[0][1]).to.deep.equal({
        timestamp: '2',
        events: 'two'
      });
    });
  });

  describe('mixed', function() {
    beforeEach(function() {
      this.result = consecutiveSegments(fixtures.mixed, 'seconds');
    });

    it('should return two groups', function() {
      expect(this.result).to.have.length(2);
    });

    it('should return 2 segments in the first group', function() {
      expect(Object.keys(this.result[0])).to.have.length(2);
    });

    it('should return 1 segment in the second group', function() {
      expect(Object.keys(this.result[1])).to.have.length(1);
    });

    it('return segment "one" for the first segment in group 1', function() {
      expect(this.result[0][0]).to.deep.equal({
        timestamp: '1',
        events: 'one'
      });
    });

    it('return segment "two" for the second segment in group 1', function() {
      expect(this.result[0][1]).to.deep.equal({
        timestamp: '2',
        events: 'two'
      });
    });

    it('return segment "four" for the segment in group 2', function() {
      expect(this.result[1][0]).to.deep.equal({
        timestamp: '4',
        events: 'four'
      });
    });
  });
});
