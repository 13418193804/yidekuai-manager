
const fs = require('fs');
const linkList = require('./link.json');
const moment = require('moment')
const fileApi = require('./filesUpload')

new Promise(resolve => {
    fs.readFile(`./src/api/conf.ts`, 'utf-8', (err, data) => {
        if (data.indexOf(`const manager: any = "test"`) != -1) {
            console.warn('选择测试场发布代码中...')
            resolve(linkList.filter(item => {
                return item.host == '203.195.236.254'
            })[0])
        }
        if (data.indexOf(`const manager: any = "manager"`) != -1) {
            console.warn('选择正式场发布代码中...')
            // resolve(linkList.filter(item => {
            //     return item.host == '134.175.4.131'
            // })[0])
        }
    })

}).then(sshObject => {
    let date = moment(new Date).format('YYYYMMDDhhmmss')
    let remotFileUrl = sshObject.remotFileUrl
    let localFileUrl = sshObject.localFileUrl
    fileApi.openSSH(
        sshObject,
        sshObject.password,
        (ssh) => {
            // fileApi.filesqueryNameList('H:/tongyong/zhongyimall-shop-manager-typescript/dist/', remotFileUrl, response => {
            //   console.log('response', response)
            // });

            //连接后执行一段 命令或 put  get
            //备份
            fileApi.execCmdSSH(
                `ls ${remotFileUrl}`,
                result => {
                    if (result.indexOf('index.html') !== -1 && result.indexOf('static') !== -1) {
                        console.log('当前版本未备份，进行备份中')
                        fileApi.execCmdSSH(
                            `mkdir ${remotFileUrl}${date}`,
                            res => {
                                console.log(`已创建文件夹：${remotFileUrl}${date}`)
                                fileApi.execCmdSSH(
                                    `cp -rf ${remotFileUrl}index.html ${remotFileUrl}${date}/index.html | cp -rf ${remotFileUrl}static ${remotFileUrl}${date}/static`,
                                    res1 => {
                                        fileApi.execCmdSSH(
                                            `ls ${remotFileUrl}`,
                                            list => {
                                                if (list.indexOf(date) != -1) {
                                                    console.log('开始上传新文件:')


                                                    fileApi.filesqueryNameList(localFileUrl, remotFileUrl, response => {
                                                        console.log('response', response)
                                                    });


                                                } else {
                                                    console.log('备份失败：', res1)
                                                    process.exit()
                                                }
                                            }
                                        )

                                    }
                                )
                            }
                        )

                    }
                }
            )
        })



})



