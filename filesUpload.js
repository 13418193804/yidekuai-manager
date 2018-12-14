



const fs = require('fs');
var path, node_ssh, ssh
path = require('path')
node_ssh = require('node-ssh')
ssh = new node_ssh()


const filesqueryNameList = (url, uploadUrl, callback) => {
    fs.readdir(url, function (err, files) {
        if (err) {
            return console.error(err);
        }
        files.forEach((file, index) => {
            fs.stat(`${url}${file}`, function (err, stats) {
                console.log()
                if (stats && !stats.isFile()) {

                    doUploadDirectory(`${url}${file}/`, `${uploadUrl}${file}/`, response => {
                        callback(response)
                        if (index === files.length - 1) {
                            process.exit()
                        }
                    })
                } else {
                    doUploadFile(`${url}${file}`, `${uploadUrl}${file}`, response => {
                        callback(response)
                        if (index === files.length - 1) {
                            process.exit()
                        }
                    })
                }
            })
        })
    });
}



// const password = '5164659'


const openSSH = (sshObject, password, callback) => {
    //connect sftp
    ssh.connect({
        host: sshObject.host,
        username: sshObject.username,
        port: sshObject.port,
        password,
        tryKeyboard: true,
        onKeyboardInteractive: (name, instructions, instructionsLang, prompts, finish) => {
            if (prompts.length > 0 && prompts[0].prompt.toLowerCase().includes('password')) {
                finish([password])
            }
        }
    }).then(function () {
        callback(ssh)
    })
}


const doUploadFile = (localFileUrl, remotFileUrl, callback) => {
    ssh.putFile(localFileUrl, remotFileUrl).then(function (a) {
        callback({
            status: 200,
            message: '文件上传成功',
            localFileUrl: localFileUrl,
            remotFileUrl: remotFileUrl
        })
    }, function (error) {
        callback({
            status: 500,
            message: '文件上传失败',
            error: error,
            localFileUrl: localFileUrl,
            remotFileUrl: remotFileUrl
        })
    })
}

const doUploadDirectory = (localFileUrl, remotFileUrl, callback) => {
    ssh.putDirectory(localFileUrl, remotFileUrl).then(function (a) {
        callback({
            status: 200,
            message: '文件夹上传成功',
            localFileUrl: localFileUrl,
            remotFileUrl: remotFileUrl
        })
    }, function (error) {
        callback({
            status: 500,
            message: '文件夹上传失败',
            error: error,
            localFileUrl: localFileUrl,
            remotFileUrl: remotFileUrl
        })
    })
}
const execCmdSSH = (command, callback) => {

    // Command with escaped params
    ssh.exec(command, [''], { cwd: '', stream: 'stdout', options: { pty: true } }).then(function (result) {
        callback(result)
    })

}





module.exports = {
    filesqueryNameList: filesqueryNameList,
    openSSH: openSSH,
    execCmdSSH: execCmdSSH,
};
