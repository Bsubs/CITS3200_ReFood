import React, { useEffect, useState, useRef } from 'react'
import './Dialog.css'

import { userDataV2, arrayToDict } from '../../pages/Inbox/content';
import InboxTitleBar from '../../components/inbox/Titlebar';
import MessageItemView from '../../components/inbox/MessageItemView';
const userData = arrayToDict(userDataV2);




const getHeight = () => window.innerHeight;

export default function Dialog({ id, data, onSendMsg, onBack }) {
    const [text, setText] = useState('');
    const [height, setHeight] = useState(getHeight());
    const inputRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        // fix safari
        const resizeListener = () => {
            console.log('height', getHeight());
            setHeight(getHeight())
        }

        window.addEventListener('resize', resizeListener);

        return () => {
            window.removeEventListener('resize', resizeListener)
        }
    }, [])

    useEffect(() => {
        contentRef.current.scrollTop = 99999999999999;
    }, [data])


    const user = userData[data.userId];

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSendMsg(text);
            setText('');
        }
    }
    const handleSend = () => {
        if (text === '') return;
        onSendMsg(text);
        setText('');
    }

    return (
        <div className={`dialog-view`} style={{
            height: height
        }}>
            <InboxTitleBar title={user.name}
                showBackIcon={true} onBack={onBack} />
            <div ref={contentRef} className='content'>
                {
                    data.content.map((msg, index) => (
                        <MessageItemView data={msg} key={index} userId={data.userId} />
                    ))
                }
            </div>
            <div className='input-box'>
                <div className='input-wrapper'>
                    <input enterKeyHint='send' value={text} onChange={e => setText(e.target.value)} onKeyDown={handleKeyDown} ref={inputRef} />
                </div>
                <div className='actions'>
                    <div className='send-button' onClick={handleSend}>
                        Send
                    </div>
                </div>

            </div>
        </div>
    )
}