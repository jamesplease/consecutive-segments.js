import _ from 'underscore';
import moment from 'moment';
import 'moment-business';

// Segment an array of events by scale
var consecutiveSegments = function(segments, options = {}) {

  // Set our defaults
  _.defaults({}, options, {
    scale: 'weeks',
    ignoreWeekends: false
  });

  // Pull out our optios
  var { scale, ignoreWeekends } = options;

  // If there aren't any segments, then we can bail out early
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

        var diffSize = 0;
        if (moment.normalizeUnits(scale) === 'day' && ignoreWeekends) {
          diffSize = currentMoment.weekDays(prevMoment);
        } else {
          diffSize = currentMoment.diff(prevMoment, scale);
        }

        if (diffSize > 1) {
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
};

export default consecutiveSegments;
