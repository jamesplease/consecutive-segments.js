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
    if (_.isEmpty(segments)) { return []; }

    let currentGroup = 0, currentMoment, prevMoment;
    return _.chain(segments)
      .map((events, timestamp) => {
        return { timestamp, events };
      })
      .reduce((memo, s, index, segments) => {

        // Check to see if the current group is the same
        // as the previous group by computing the difference
        // in their timestamps. They aren't consecutive when
        // the difference is > 1
        if (index) {
          currentMoment = moment.unix(s.timestamp).utc();
          prevMoment = moment.unix(segments[index - 1].timestamp).utc();
          if (currentMoment.diff(prevMoment, scale) > 1) {
            currentGroup++;
          }
        }

        // Ensure that the group exists, then push to it
        if (!memo[currentGroup]) {
          memo[currentGroup] = [];
        }
        memo[currentGroup].push(_.clone(s));
        return memo;
      }, [])
      .value();
  }
};

export default ConsecutiveSegments;
