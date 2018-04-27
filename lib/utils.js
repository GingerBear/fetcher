var moment = require('moment-timezone');

function datetime(dateStr, format) {
  return moment(dateStr, format).tz('America/New_York');
}

module.exports = {
  datetime: datetime
};
