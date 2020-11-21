var webPush = require('web-push');

const vapidKeys = {
  "publicKey": "BNg0BbO5pWsD3J98ed5VyxI6HcAhhzVUfz5iuL-85hmt-CvNuZuE9UwHcTGIl7I01vUiCHcS6PR7DtR8g-okZSY",
  "privateKey": "pYUGZ3Mw_UiJhfXrPaQXv4ke4mMB9XFPlk1JsSAhmFo"
};


webPush.setVapidDetails(
  'mailto:fariidn10s@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)
var pushSubscription = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/e2Lt6G6Oh68:APA91bF-VfXZNaWuOqG_2H3e2p8TN5I0flA345fqqjqAFGcSb68vGsCrcF4IbJCA6ONYrn4jMZS3-QccZ3YpRZfOZceMW0gW_zc38XeJPkRvzj7mFXUQ94CIYjnorwprFSUDz9C_8z4Z",
  "keys": {
    "p256dh": "BI17JUplmNe1NTWVwaFmOc846+8VcFC5p1WcbrnACsfLzV1NTtGMhF4j7CSRAqlqjkWSn/eyF4u/OElxkF7l74I=",
    "auth": "MwSk38KNnYobZKbIMRwCYA=="
  }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
  gcmAPIKey: '414636457397',
  TTL: 60
};
webPush.sendNotification(
  pushSubscription,
  payload,
  options
);