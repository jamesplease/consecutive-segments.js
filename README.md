# consecutive-segments.js [![Travis build status](http://img.shields.io/travis/jmeas/consecutive-segments.js.svg?style=flat)](https://travis-ci.org/jmeas/consecutive-segments.js)

[time-segments.js](https://github.com/jmeas/time-segments.js) outputs segments. This
library will group consecutive segments.

### Motivation

Not all visualizations show a single block for each segment. Sometimes you will
want to aggregate consecutive blocks into a single block. This library prepares
segments into a state suitable to be aggregated.

### API

This library exposes a single method.

##### `group( segments, scale )`

Takes in an array of `segments` and a `scale`, returns an array. Each item in the array
is an array of consecutive segments.

`scale` can be any of the resolutions supported by [moment.js](http://momentjs.com/).
A short list of examples include `days`, `years`, `weeks`. Moment's abbrevations
are also supported, as in `w` for `weeks.`

This library transforms segments from this form:

```js
{
  1000: [eventOne, eventTwo]
}`

to be of this form:

```js
{
  timestamp: 1000,
  segments: [eventOne, eventTwo]
}
```
