import React, { memo, useState } from 'react'
import OSS from './oss'

const OssUpload = memo(({
    max = 4,
}: {
    max?: number,

}) => {
    const [list, updateList] = useState<String[]>([])

    const onChange = () => {
        document.getElementById('pro_upload')?.click()
    }

    return (
        <div>
            {
                max === list.length ?
                    null :
                    <button
                        onClick={onChange}
                    >
                        点击上传
                    </button>
            }
            <input
                id="pro_upload"
                style={{ display: 'none' }}
                accept="image/gif, image/png, image/jpeg, image/bmp, image/webp"
                type="file"
                placeholder=""
                autoComplete="off"
                onChange={e => {
                    if (e.currentTarget.files) {
                        const file = e.currentTarget.files[0]
                        console.log(file)
                        OSS.upload(file).then(res => {
                            if (res) {
                                console.log(res)
                                updateList([...list, res])
                            }
                        })
                    }
                }}
            />
        </div>
    )
})
export default OssUpload
