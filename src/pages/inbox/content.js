import avatar1 from '../../assets/avatars/1.jpg'
import avatar2 from '../../assets/avatars/2.jpg'
import avatar3 from '../../assets/avatars/3.jpg'
import avatar4 from '../../assets/avatars/4.jpg'
// import avatar5 from '../../assets/avatars/5.png'
// import avatar6 from '../../assets/avatars/6.jpg'
// import avatar7 from '../../assets/avatars/7.jpg'
// import avatar8 from '../../assets/avatars/8.jpg'
// import avatar9 from '../../assets/avatars/9.jpg'
// import avatar10 from '../../assets/avatars/10.jpg'
// import avatar11 from '../../assets/avatars/11.jpg'
// import avatar12 from '../../assets/avatars/12.jpg'
// import avatar13 from '../../assets/avatars/13.jpg'

import securityPng from '../../assets/icons/PNG/security.png'
import truckPng from '../../assets/icons/PNG/truck.png'
import tagPng from '../../assets/icons/PNG/tag.png'

export function arrayToDict(arr, key='id') {
  const result = {};
  for(let item of arr) {
    result[item[key]] = item;
  }
  return result;
}

const productData = [
  {
    id: 1,
    Sender: "Various Cans",
    Content: "aaaaaa",
    Date: "24/09/2022",
    isRead: "False",
  },
  {
    id: 2,
    Sender: "Various Cans",
    Content: "aaaaaa",
    Date: "24/09/2022",
    isRead: "True",
  },
]

export const userDataV2 = [ // contacts' information
  {
    id: 'system:order',
    name: 'Order',
    avatar: truckPng,
  },
  {
    id: 'system:security',
    name: 'Security',
    avatar: securityPng,
  },
  {
    id: 'system:service',
    name: 'Reminder',
    avatar: tagPng,
  },
  {
    id: 'user:janedoe',
    name: 'John Cook',
    avatar: avatar1,
  },
  {
    id: 'user:tcook',
    name: 'c3po',
    avatar: avatar2,
  },
  {
    id: 'user:alanw',
    name: 'Alan',
    avatar: avatar3,
  }
]

export const self = {
  id: 'user:linus',
  name: 'Linus',
  avatar: avatar4,
}

export const dialogDataV2 = [
  {
    id: '0',
    userId: 'system:order',
    content: [
      { type: 'recv', content: 'Your order has been shipped', timestamp: '13:01' }
    ],
    unread: 2,
    timestamp: '13:01',
  },
  {
    id: '2',
    userId: 'system:security',
    content: [
      { type: 'recv', content: 'Please confirm your inforamtion', timestamp: '14:03' }
    ],
    unread: 1,
    timestamp: '14:03'
  },
  {
    id: '22',
    userId: 'system:service',
    content: [
      { type: 'recv', content: 'New parts available', timestamp: '02:01' }
    ],
    unread: 0,
    timestamp: '02:01'
  },
  {
    id: '3',                  // dialogId
    userId: 'user:janedoe',   // target user id
    unread: 5,                // unread count,
    content: [
      { type: 'sent', content: 'hello, there', timestamp: '17:25' },
      { type: 'recv', content: 'got it', timestamp: '22:08' },
    ],
    timestamp: '22:08'
  },
  {
    id: '4',                  // dialogId
    userId: 'user:tcook',   // target user id
    unread: 5,                // unread count,
    content: [
      { type: 'sent', content: 'hello, there', timestamp: '11:25' },
      { type: 'recv', content: ' an open source benchmark toolkit for Natural Language Generation', timestamp: '23:08' },
    ],
    timestamp: '23:08'
  },
  {
    id: '5',                  // dialogId
    userId: 'user:alanw',   // target user id
    unread: 0,                // unread count,
    content: [
      { type: 'sent', content: "That does hide the scrollbar, but I can't scroll any more.\nIs there a way I can remove the scrollbar while still being able to scroll the whole page?", timestamp: '14:25' },
      { type: 'sent', content: 'hello, there' },
      { type: 'recv', content: 'got it', timestamp: '21:11' },
      { type: 'recv', content: 'when do we start' },
    ],
    timestamp: '21:11'
  }
]

export default productData;