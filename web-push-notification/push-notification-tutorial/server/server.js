const webPush = require("web-push")
const vapidKeys =  {
  publicKey: 'BM4USgeTIDxavs0JYtAfkUSP4-nB_jX4DZBJscOzx1gk0nWnC4xSvfB56tdSxeZX4UB0Bh2mrpWMRlZEy2ZMlKc',
  privateKey: 'D4HyC4HMKplBPg-y8PgALYMD5WQIu5srTZjYv8lyOas'
}

webPush.setVapidDetails("mailto:info@test.com", vapidKeys.publicKey, vapidKeys.privateKey)

const subscriberChrome = {"endpoint":"https://fcm.googleapis.com/fcm/send/ckHjxYOfNAA:APA91bGYLYPGlL6zB4IieNBaCkO4bKHp-XxPhTxHMcZhLGXJIgZXf_hl3Qzvb1QK5S8pfJdYP-GuPnxkkSadlr5ok2f_rLDyZSkhkMdgz-_hgLGfOy6fvvYlJkSYsP2PdbsdQ9IqucEa","expirationTime":null,"keys":{"p256dh":"BEJ37C5hnUC04jMsZZExdLgzBs-ndkiP8o-c8OuhGLUrc20QUKe0lEawfCZZMttRZ6Xhljw7ad_MmQO3c_Nk2Ho","auth":"ma4yjx5vMF3sXIey6xg-Ig"}}

const subscribeMicrosoftEdge = {"endpoint":"https://wns2-par02p.notify.windows.com/w/?token=BQYAAABt8PKdDKqJGm3EZzATHEWoJ1Grk5gqr053b5THIzTSZBLCzxoSkYf0%2bkwSvs7PN1nhb%2fMjndz2g4UWyW56mT46HtjtwAXCyk2zxX7yiioXRd2jLpi8KD0PclQM9bymeMDjdSUmsY6AszjWmMs6KJ%2ba2Wpfq34b16cAR%2f1yNE8RnjIsPE57R0Z2ldLjCvr7VsrR1nO94ss%2fDi7ZNyGDEGQ4YSuBddDtr3mLxH2cOwAB09qeZOeaGpAL8VQlyGNg7ECAgzvphsq7YVS7TIyejvxfB5BdW7XnZG1xv2WCjL8NEHOtKIOFysWG6epRcZWfva0%3d","expirationTime":null,"keys":{"p256dh":"BLDaX2a5qPEw1B3mw1nWhcaPyixVZyrxgjJtnYnOjp8hmItwzdLrn1cfnKBgcQ-cJZ9MRamCa3vbKh4JQvZU680","auth":"z0Q7nYNw9qEQAyNftoY7nw"}}
console.log(vapidKeys);

webPush.sendNotification(subscriberChrome, "This is a title..")
webPush.sendNotification(subscribeMicrosoftEdge)