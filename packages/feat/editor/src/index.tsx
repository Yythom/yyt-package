/* eslint-disable no-void */
/* eslint-disable react-hooks/exhaustive-deps */
import JoditEditor from 'jodit-react'
import React, {
    createContext, memo, ReactNode, useMemo, useRef, useState,
} from 'react'

export const EditorContext = createContext<{ editorApi: React.MutableRefObject<null> } | undefined>(undefined)

export const Editor = memo(({
    placeholder, children, initContent, option,
}:
    { placeholder: string, children?: ReactNode, initContent?: string, option?: any }) => {
    const editor = useRef<any>(null)
    const [content, setContent] = useState(initContent || '')

    const config = useMemo(() => {
        return {
            showTooltipDelay: 200, // 工具栏提示延迟
            readonly: false, // all options from https://xdsoft.net/jodit/doc/,
            placeholder: placeholder || 'Start typings...',
            language: 'zh_cn',
            style: {
                // font: '99px Arial',
            },
            minHeight: option?.minHeight || 400,
            disablePlugins: ['table'],
            events: {
                getIcon: (name: any, control: any, clearName: any) => {
                    // var code = name;
                    // console.log(name);
                    switch (clearName) {
                        case 'brush': // 颜色
                            return '<svg t="1629537310527" class="icon" viewBox="0 0 1105 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6309" width="64" height="64"><path d="M924.34508 257.969231c-238.276923-112.246154-439.138462 114.215385-533.661538 0-37.415385-47.261538 45.292308-131.938462 0-191.015385-33.476923-41.353846-112.246154-33.476923-163.446154 0C91.360465 163.446154 0.775849 320.984615 0.775849 498.215385 0.775849 789.661538 239.052773 1024 534.437388 1024c246.153846 0 452.923077-163.446154 515.938461-382.030769 19.692308-78.769231 43.323077-299.323077-126.030769-384zM138.622003 488.369231c0-43.323077 35.446154-78.769231 78.769231-78.769231s78.769231 35.446154 78.769231 78.769231-35.446154 78.769231-78.769231 78.769231-78.769231-35.446154-78.769231-78.769231z m191.015385 303.261538c-43.323077 0-78.769231-35.446154-78.769231-78.769231s35.446154-78.769231 78.769231-78.76923 78.769231 35.446154 78.769231 78.76923-35.446154 78.769231-78.769231 78.769231z m248.123077 90.584616c-43.323077 0-78.769231-35.446154-78.769231-78.769231s35.446154-78.769231 78.769231-78.769231 78.769231 35.446154 78.769231 78.769231-35.446154 78.769231-78.769231 78.769231z m179.2-275.692308c-64.984615 0-118.153846-53.169231-118.153846-118.153846s53.169231-118.153846 118.153846-118.153846 118.153846 53.169231 118.153846 118.153846-51.2 118.153846-118.153846 118.153846z"  p-id="6310"></path></svg>'
                        case 'paragraph':
                            return '<svg t="1629537537051" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9335" width="64" height="64"><path d="M308.623635 461.155909h406.75273v-355.90864a50.844091 50.844091 0 1 1 101.688183 0v813.505462a50.844091 50.844091 0 0 1-101.688183 0v-355.90864h-406.75273v355.90864a50.844091 50.844091 0 0 1-101.688183 0v-813.505462a50.844091 50.844091 0 0 1 101.688183 0z" fill="#666666" p-id="9336"></path></svg>'
                        default:
                            break
                    }
                },
            },
            uploader: {
                url: 'http://49.234.41.182:8701/upload',
                isSuccess: (res: any) => {
                    return res
                },
                getMessage(e: { data: { messages: any[] | undefined; }; }) {
                    return void 0 !== e.data.messages && Array.isArray(e.data.messages) ? e.data.messages.join('') : ''
                },
                process(resp: {}) {
                    return {
                        baseurl: 'http://49.234.41.182:8701/file?url=',
                        messages: [],
                        files: [
                            Object.keys(resp)[0], // 返回isSuccess的数据为url
                        ],
                        isImages: [
                            true,
                        ],
                        code: 220,
                    }
                },
            },
            buttons: [
                'source', '|',
                'bold',
                'strikethrough',
                'underline',
                'italic', '|',
                'ul',
                'ol', '|',
                'outdent', 'indent', '|',
                'font',
                'fontsize',
                'brush',
                'paragraph', '|',
                'image',
                'video',
                'table',
                'link', '|',
                'align', 'undo', 'redo', '|',
                'hr',
                'eraser',
                'copyformat', '|',
                'symbol',
                'fullsize',
                'print',
                'about',
            ],
        }
    }, [placeholder])

    return (
        <div className="demo">
            <EditorContext.Provider value={{ editorApi: editor.current }}>
                <div style={{ background: '#fff' }}>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        config={{ ...config }}
                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={newContent => { }}
                    />
                </div>
                {children}
            </EditorContext.Provider>
        </div>
    )
})
