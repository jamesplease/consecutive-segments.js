// Place your library's code here
//
// If you add additional files, be sure to
// load them in order in ./wrapper.js
//

import _ from 'underscore';
import moment from 'moment';

var ConsecutiveSegments = {

  // Segment an array of events by scale
  group(segments, scale='weeks') {
    var segmentCount = _.keys(segments).length;

    if (!segments || segmentCount === 0) {
      return [];
    }

    // Convert the objects into arrays for comparing
    segments = _.map(segments, (segment, timestamp) => {
      return { timestamp, segment };
    });

    var groups = [], currentMoment, prevMoment;
    var currentGroup = 0;
    _.each(segments, (s, index) => {

      // Check to see if the current group is the same
      // as the previous group by comparing
      if (index !== 0) {
        currentMoment = moment.unix(s.timestamp).utc();
        prevMoment = moment.unix(segments[index - 1].timestamp).utc();
        if (currentMoment.diff(prevMoment, scale) > 1) {
          currentGroup++;
        }
      }

      // Ensure that the group exists, then push to it
      if (!groups[currentGroup]) {
        groups[currentGroup] = [];
      }
      groups[currentGroup].push(s);
    });

    return groups;
  }
};

export default ConsecutiveSegments;
