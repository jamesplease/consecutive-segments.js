describe('when a single segment is passed in', function() {
  beforeEach(function() {
    this.result = consecutiveSegments({
      1000: 'james'
    });
  });

  it('should return a single group, with that one segment inside of it', function() {
    expect(this.result[0]).to.deep.equal([{timestamp: '1000', events: 'james'}]);
  });
});
