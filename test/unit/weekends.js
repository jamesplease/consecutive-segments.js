describe('days', function() {
  describe('ignoring weekends', function() {
    beforeEach(function() {
      this.result = consecutiveSegments(fixtures.weekends, {
        scale: 'days',
        ignoreWeekends: true
      });
    });

    it('should return one group', function() {
      expect(this.result).to.have.length(1);
    });

    it('should return 3 segments in the first group', function() {
      expect(Object.keys(this.result[0])).to.have.length(3);
    });

    it('return segment "one" for the first segment', function() {
      expect(this.result[0][0]).to.deep.equal({
        timestamp: '1432785600',
        events: 'one'
      });
    });

    it('return segment "two" for the second segment', function() {
      expect(this.result[0][1]).to.deep.equal({
        timestamp: '1432872000',
        events: 'two'
      });
    });

    it('return segment "four" for the last segment', function() {
      expect(this.result[0][2]).to.deep.equal({
        timestamp: '1433131200',
        events: 'four'
      });
    });
  });

  describe('including weekends', function() {
    beforeEach(function() {
      this.result = consecutiveSegments(fixtures.weekends, {
        scale: 'days'
      });
    });

    it('should return two group', function() {
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
        timestamp: '1432785600',
        events: 'one'
      });
    });

    it('return segment "two" for the second segment in group 1', function() {
      expect(this.result[0][1]).to.deep.equal({
        timestamp: '1432872000',
        events: 'two'
      });
    });

    it('return segment "four" for the segment in group 2', function() {
      expect(this.result[1][0]).to.deep.equal({
        timestamp: '1433131200',
        events: 'four'
      });
    });
  });
});