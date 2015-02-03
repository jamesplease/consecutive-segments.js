(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require("underscore"), require("moment")) : typeof define === "function" && define.amd ? define(["underscore", "moment"], factory) : global.consecutiveSegments = factory(global._, global.moment);
})(this, function (_, moment) {
  "use strict";

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

  var consecutive_segments = consecutiveSegments;

  return consecutive_segments;
});
//# sourceMappingURL=./consecutive-segments.js.map