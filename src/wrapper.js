(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'moment'], factory);
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore');
    var moment = require('moment');
    module.exports = factory(_, moment);
  } else {
    root.<%= exportVarName %> = factory(root._, root.moment);
  }
})(this, function(_, moment) {
  'use strict';

  // @include ./consecutive-segments.js
  
  return <%= exportVarName %>;
});
