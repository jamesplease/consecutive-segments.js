describe('when undefined is passed in', function() {
  beforeEach(function() {
    this.result = ConsecutiveSegments.group();
  });

  it('should return an array', function() {
    expect(this.result).to.deep.equal([]);
  });
});

describe('when an empty object is passed in', function() {
  beforeEach(function() {
    this.result = ConsecutiveSegments.group({});
  });

  it('should return an array', function() {
    expect(this.result).to.deep.equal([]);
  });
});
