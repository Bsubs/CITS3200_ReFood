import React, { useState, useEffect } from 'react';
import "./Inbox.css";
import Dialog from './Dialog';
import { arrayToDict, dialogDataV2 } from './content.js';

import InboxItem from '../../components/inbox/InboxItem';
import GroupTitle from '../../components/inbox/GroupTitle';
import InboxTitleBar from '../../components/inbox/Titlebar';
import { shouldInsertTimestamp } from './util';

const NO_DIALOG_ID = -1;

export default function Inbox() {

  const [dialogData, setDialogData] = useState({});

  const [dialogId, setDialogId] = useState(NO_DIALOG_ID);

  useEffect(() => {
    setDialogData(arrayToDict(dialogDataV2.map(item => {
      const [hour, min] = item.timestamp.split(':');
      return {
        ...item,
        timestampNum: Number(hour) * 60 + Number(min)
      }
    })))
  }, [])

  const onSendMsg = (msg) => {
    if (dialogId === NO_DIALOG_ID) return;
    const time = new Date();
    const min = time.getMinutes();
    const hour = time.getHours();
    const timestamp = `${hour < 10 ? '0' + hour : hour}:${min < 10 ? '0' + min : min}`

    const current = { ...dialogData[dialogId] };
    current.content.push({
      type: 'sent',
      content: msg,
      timestamp: shouldInsertTimestamp(current) ? timestamp : undefined,
    })

    let newDict = { ...dialogData };
    newDict[dialogId] = current;
    setDialogData(newDict);
  }

  const onBack = () => {
    setDialogId(NO_DIALOG_ID);
  }

  const onClickItem = (e, id) => {
    e.preventDefault();
    // zero unread
    const current = dialogData[id];
    current.unread = 0;
    let newDict = { ...dialogData };
    newDict[id] = current;
    setDialogData(newDict);
    setDialogId(id);
  }

  if (dialogId === NO_DIALOG_ID) {

    const sorter = (a, b) => {
      const x = dialogData[a];
      const y = dialogData[b];
      if (x.unread === 0 && y.unread === 0 || x.unread !== 0 && y.unread !== 0) {
        return y.timestampNum - x.timestampNum;
      }
      if (x.unread !== 0) {
        return -1;
      }
      return 1;
    }

    const systemNotificationIds = Object.keys(dialogData).filter((key) => {
      return dialogData[key].userId.startsWith('system:')
    }).sort(sorter)

    const userMsgIds = Object.keys(dialogData).filter((key) => {
      return dialogData[key].userId.startsWith('user:')
    }).sort(sorter)


    return (
      <div className='inbox-wrapper'>
        <InboxTitleBar title={'Inbox'} />
        <div className='list-wrapper'>
          <div>
            <GroupTitle text={'Notifications'} />
            {systemNotificationIds.map(id => {
              return (
                <InboxItem key={id} data={dialogData[id]} onClick={(e) => onClickItem(e, id)} />
              )
            })}
          </div>
          <div>
            <GroupTitle text={'Messages'} />
            {userMsgIds.map(id => {
              return (
                <InboxItem key={id} data={dialogData[id]} onClick={(e) => onClickItem(e, id)} />
              )
            })}

          </div>

        </div>
      </div>
    )
  }
  else {
    return (
      <Dialog id={dialogId} data={dialogData[dialogId]}
        onSendMsg={onSendMsg} onBack={onBack}/>
    )
  }
}