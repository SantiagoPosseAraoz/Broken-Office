const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:test@faztweb.com",
  process.env.PUBLIC_KEY,
  process.env.PRIVATE_KEY
);

module.exports = webpush;