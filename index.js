const Steam = require('steam');
/**
 * Options demo data for login steam
 * @type {{password: string, account_name: string}}
 */
const logOnOptions = {
    account_name: "uehsgadpnu02s14",
    password: 'IDPFP049P85L780'
};
const steamClient = new Steam.SteamClient();
const steamUser = new Steam.SteamUser(steamClient);
steamClient.connect();
steamClient.on('connected', () => {
    steamUser.logOn(logOnOptions);
});
steamClient.on('logOnResponse', (logonResp) => {
    checkerErrorLogin(logonResp).then((res) => {
        console.log(res)
    }).catch((e) => {
        console.log(e)
    })
});
steamClient.on('error', (err) => {
    console.log(err)
});

function checkerErrorLogin(payload) {
   return new Promise(((resolve, reject) => {
       const code = payload['eresult']
       if (code === 63) {
            reject('Account with 2FA email')
       } else if (code === 85) {
           reject('Account with steam guard')
       } else if (code === 5) {
          reject('ERROR')
       }
      resolve(payload)
   }))
}
