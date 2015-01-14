var ConsecutiveSegments = {

  // Segment an array of events by scale
  group: function(segments, scale) {
    scale = scale || 'weeks';
    var groups = [];

    var segmentCount = _.keys(segments).length;

    if (segmentCount < 2) {
      return [segments];
    }

    // Convert the objects into arrays for comparing
    segments = _.map(segments, function(s, timestamp) {
      return {
        timestamp: timestamp,
        segment: segment
      };
    });

    var groupsArray = [], currentMoment, nextMoment;
    var currentGroup = 0;
    _.each(segments, function(s, index) {
      if (index === 0) {
        groupsArray[currentGroup] = [];
        groupsArray[currentGroup].push(s);
      } else {
        currentMoment = moment.unix(s.timestamp).utc();
        endMoment = moment.unix(segments[index - 1].timestamp).utc();
        if (endMoment.diff(currentMoment, scale) > 1) {
          currentGroup++;
        }
        groupsArray[currentGroup].push(s);
      }
    });

    return groupsArray;
  }
};
