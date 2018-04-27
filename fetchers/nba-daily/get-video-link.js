var request = require('request');
var cheerio = require('cheerio');

module.exports = function getVideoLink(videoUrl) {
  var url = `http://www.nba.com${videoUrl}.xml`;

  return new Promise((resolve, reject) => {
    return request(url, (err, response, body) => {
      if (err) return reject(err);

      var $ = cheerio.load(body);
      var videoLink = $('file[bitrate*="1920x1080"]')
        .first()
        .text();

      return resolve(videoLink);
    });
  });
};
