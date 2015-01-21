(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["underscore", "moment"], factory);
  } else if (typeof exports !== "undefined") {
    var _ = require("underscore");
    var moment = require("moment");
    module.exports = factory(_, moment);
  } else {
    root.consecutiveSegments = factory(root._, root.moment);
  }
})(this, function (_, moment) {
  "use strict";

  // Segment an array of events by scale
  var consecutiveSegments = function (segments) {
    var scale = arguments[1] === undefined ? "weeks" : arguments[1];
    if (_.isEmpty(segments)) {
      return [];
    }

    var currentGroup = 0,
        currentMoment = undefined,
        prevMoment = undefined;
    return _.chain(segments).map(function (events, timestamp) {
      return { timestamp: timestamp, events: events };
    }).reduce(function (memo, s, index, segments) {
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
    }, []).value();
  };




  return consecutiveSegments;
});
//# sourceMappingURL=consecutive-segments.js.map