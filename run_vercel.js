const os = require('os');

// Override hostname to be ASCII only
os.hostname = () => 'my-computer';

// Override userInfo if username is non-ASCII
const originalUserInfo = os.userInfo;
os.userInfo = function(options) {
    try {
        const info = originalUserInfo(options);
        if (info) {
            info.username = 'thero';
        }
        return info;
    } catch (e) {
        return {
            username: 'thero',
            uid: -1,
            gid: -1,
            shell: null,
            homedir: 'C:\\Users\\thero'
        };
    }
};

// Also replace process.env just in case
process.env.COMPUTERNAME = 'my-computer';
process.env.HOSTNAME = 'my-computer';
process.env.USER = 'thero';
process.env.USERNAME = 'thero';

// Execute Vercel CLI
require('C:\\Users\\thero\\AppData\\Roaming\\npm\\node_modules\\vercel\\dist\\index.js');
