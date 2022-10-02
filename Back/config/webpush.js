const webpush = require("web-push");

webpush.setVapidDetails(
  "brokenofficep5@gmail.com",
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);


module.exports = webpush;