const moment = require('moment');

function formatNewMessage(username, text) {
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
}

function formatOldMessage(message) {
  return {
    username:message.username,
    text:message.text,
    time:message.time
  };
}

module.exports = {
  formatNewMessage,
  formatOldMessage
};