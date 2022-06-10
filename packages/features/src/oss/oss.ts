/* eslint-disable @typescript-eslint/naming-convention */
import Axios from 'axios'
import { ossURL, setOssFilepath } from './config'

export interface OSSParams {
    code: number;
    msg: string;
    data: Data;
}

export interface Data {
    accessid: string;
    host: string;
    policy: string;
    signature: string;
    expire: string;
    dir: string;
    'x-oss-security-token': string;
    success_action_status: string;
}

class OSS {
    static url = ossURL

    static params_url = 'https://api-test-sensen.fosuss.com/dev/sensen/api/v1/app/upload/token'

    static formData = {}

    static async upload(file: File, path = 'test') {
        const params: { data: OSSParams } = await Axios.post(this.params_url)
        const key = Math.random().toString(16).slice(2)
        if (params?.data?.code === 0) {
            const {
                accessid,
                host,
                policy,
                expire,
                signature,
                dir,
                success_action_status,
            } = params.data.data
            const oss_token = params.data.data['x-oss-security-token']
            /** */
            const form = new FormData()
            form.append('key', `${setOssFilepath(path)}${key}.jpg`)
            form.append('OSSAccessKeyId', accessid)
            form.append('accessid', accessid)
            form.append('host', host)
            form.append('policy', policy)
            form.append('signature', signature)
            form.append('expire', expire)
            form.append('dir', dir)
            form.append('x-oss-security-token', oss_token)
            form.append('success_action_status', success_action_status)
            form.append('file', file)
            /** */

            await Axios.post(
                ossURL,
                form,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    },
                },
            )
            return `${host}/${`${setOssFilepath(path)}${key}.jpg`}`
        }
    }
}

export default OSS
