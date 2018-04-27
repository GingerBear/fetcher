require('../../lib/prepare');

var utils = require('../../lib/utils');
var upload = require('../../lib/upload');
var fetchGameWithVideoByDate = require('./get-games-with-recap-by-date.js');
var getTop10ByDates = require('./get-top10-by-dates.js');
var getRandings = require('./get-rankings.js');

var today = utils.datetime(new Date());
var yesterday = utils.datetime(new Date()).subtract(1, 'days');
var tomorrow = utils.datetime(new Date()).add(1, 'days');

var datesToFetch = [today, yesterday, tomorrow];

var datesGamesToFetch = Promise.all(
  datesToFetch.map(d => fetchGameWithVideoByDate(d.format('YYYYMMDD')))
);
var datesTop10ToFetch = getTop10ByDates(datesToFetch.map(d => d.format('YYYYMMDD')));
var rankings = getRandings();

Promise.all([datesGamesToFetch, datesTop10ToFetch, rankings])
  .then(result => {
    console.log(result);
    var gameDates = result[0];
    var top10Dates = result[1];

    gameDates.forEach((d, i) => {
      d.top10Video = top10Dates[i];
      d.timestamp = datesToFetch[i].format('x');
    });

    return upload(
      `/nba-daily.json`,
      JSON.stringify({
        lastUpdate: Date.now(),
        gameDates: gameDates,
        rankings: result[2]
      })
    );
  })
  .then(response => {
    console.log(response);
    process.exit(0);
  });
