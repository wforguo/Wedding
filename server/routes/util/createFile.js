const os = require('os');
const fs = require('fs');
const platform = os.platform();

const createFile = function (filepath, size, callback) {
    const cb = function (err) {
        callback && callback();
    };
    if (fs.existsSync(filepath)) {
        cb('file existed.');
    } else {
        let cmd;
        switch (platform) {
            case 'win32':
                cmd = 'fsutil file createnew ' + filepath + ' ' + size;
                break;
            case 'darwin':
            case 'linux':
                cmd = 'dd if=/dev/zero of=' + filepath + ' count=1 bs=' + size;
                break;
        }
        const exec = require('child_process').exec;
        exec(cmd, function (err, stdout, stderr) {
            cb(err);
        });
    }
};

exports.createFile = createFile;
