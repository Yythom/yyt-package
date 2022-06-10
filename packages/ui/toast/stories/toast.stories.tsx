import React, { useState } from 'react'
import Portals from 'yyt-portal'
import { ToastPosition } from '../src/interface/types'
import { Toaster } from '../src/toaster'
import { toast } from '../src/core/toast'

export const Demo = () => {
    const [pos, setPos] = useState<ToastPosition>('top-center')

    return (
        <div>
            <div>
                <button onClick={() => {
                    toast('这是一个通知', { position: pos })
                }}
                >
                    success
                </button>

                <button onClick={() => {
                    toast.warning('这是一个通知', { position: pos })
                }}
                >
                    warning
                </button>

                <button onClick={() => {
                    toast.error('这是一个通知', { position: pos })
                }}
                >
                    error
                </button>
                <button onClick={() => {
                    toast('这是一个通知', {
                        icon: 'ci',
                        position: pos,
                    })
                }}
                >
                    自定义icon
                </button>
                <button onClick={() => {
                    toast('这是一个通知这是一个通知 这是一个通知 这是一个通知 这是一个通知 ', {
                        duration: Infinity,
                        position: pos,
                    })
                }}
                >
                    infinity
                </button>

                <button onClick={() => {
                    toast('这是一个通知', {
                        // position: 'bottom-center'
                        duration: Infinity,
                        position: pos,
                        style: {
                            color: 'red',
                        },
                    })
                }}
                >
                    自定义文字样式
                </button>

                <button onClick={() => {
                    const pm = new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(true)
                        }, 1000)
                    })
                    toast.promise(
                        pm,
                        {
                            success: 'success',
                            error: 'err',
                            loading: '...',
                        },
                        {
                            // position: 'bottom-center'
                            position: pos,
                            style: {
                                color: 'red',
                            },
                        },
                    )
                }}
                >
                    promise
                </button>

                <div>
                    <select onChange={(e: any) => setPos(e.target.value as any)}>
                        <option label="top-left" value="top-left" />
                        <option label="top-center" value="top-center" />
                        <option label="top-right" value="top-right" />
                        <option label="bottom-left" value="bottom-left" />
                        <option label="bottom-center" value="bottom-center" />
                        <option label="bottom-right" value="bottom-right" />
                    </select>
                </div>
            </div>

            {/* 注册全局组件 */}
            <Portals>
                <Toaster limit={3} containerStyle={{ top: '30vh' }} gutter={20} />
            </Portals>
        </div>
    )
}
export default {
    title: 'ui / toast',
}
