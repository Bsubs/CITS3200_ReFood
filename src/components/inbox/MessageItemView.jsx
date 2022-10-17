import React from 'react'
import './MessageItemView.css'

import { userDataV2, arrayToDict, self } from '../../pages/Inbox/content';
const userData = arrayToDict(userDataV2);

export default function ({ data, userId }) {
    const user = userData[userId];
    return (
        <div className={`message-item-view ${data.type === 'recv' ? 'left' : 'right'}`}>
            {
                data.timestamp && (
                    <div className='timestamp'>
                        {data.timestamp}
                    </div>
                )
            }
            <div className='msg-box'>
                <div className='text'>
                    {data.content}
                </div>
                <div className='clearfix'/>
            </div>
            {
                data.type === 'recv' && (
                    <>
                        <div className='left-avatar'>
                            <img src={user.avatar} alt='' />
                        </div>
                        <div className='left-angle'/>
                    </>
                )
            }
            {
                data.type === 'sent' && (
                    <>
                        <div className='right-avatar'>
                            <img src={self.avatar} alt='' />
                        </div>
                        <div className='right-angle'/>
                    </>

                )
            }
        </div>
    )
}