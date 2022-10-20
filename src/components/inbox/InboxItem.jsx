import React from 'react'
import './InboxItem.css'

import { userDataV2, arrayToDict } from '../../pages/Inbox/content';

const userData = arrayToDict(userDataV2);

export default function InboxItem({ data, onClick }) {

    const user = userData[data.userId];

    let lastMsg = '';
    if (data.content.length > 0) {
        lastMsg = data.content[data.content.length - 1].content
    }

    return (
        <div className='inbox-item' onClick={onClick}>
            <div className='avatar'>
                <img src={user.avatar} alt='' />
            </div>
            <div className='content-wrapper'>
                <div className='title'>
                    {user.name}
                </div>
                <div className='msg-preview text-overflow'>
                    {lastMsg}
                </div>
                <div className='timestamp'>
                    {data.timestamp}
                </div>
            </div>
            {
                data.unread && (
                    <div className='unread-count'>
                        { data.unread }
                    </div>
                )
            }
        </div>
    )
}