import React from 'react';
import styles from "./Inbox.css";
import contents from './content.js';

function TabItem(props) {
    return <div {...props} />;
  }
  
function Tabs(props) {
    const [bindIndex, setBindIndex] = React.useState(props.defaultIndex);
    const changeTab = newIndex => {
      if (typeof props.onTabClick === "function") props.onTabClick(newIndex);
      setBindIndex(newIndex);
    };
    const items = props.children.filter(item => item.type.name === TabItem.name);
  
    return (
      <div className={styles["wrapper"]}>
        <div className={"tab-menu"}>
          {items.map(({ props: { index, label } }) => (
            <button
              onClick={() => changeTab(index)}
              key={index}
              className={bindIndex === index ? styles["focus"] : "buttonTab"}
            >
              {label}
            </button>
          ))}
        </div>
        <div className={styles["tab-view"]}>
          {items.map(({ props }) => (
            <div
              {...props}
              className={styles["tab-view_item"]}
              key={props.index}
              style={{ display: bindIndex === props.index ? "block" : "none" }}
            />
          ))}
        </div>
      </div>
    );
}

function Inbox(props) {
    var Unread_Messages=contents.filter(content => content.isRead!="True");
    var Read_Messages=contents.filter(content => content.isRead=="True");

    return (
      <div>
        <h1>Inbox</h1>
      <div>
        <Tabs defaultIndex="1" onTabClick={console.log}>
            <TabItem label="Messages" index="1">
                <div id="Unread_Messages_header" className="Unread_type">Unread Messages</div>
                
                <p class="thick">You have no unread Messages</p>
                <p>When you contact the business to collect food or send a reservation request, you'll find you messages here.</p>
                
                <div id="Read_Messages_header" className="read_type">Read Messages</div>
            
            </TabItem>
            <TabItem label="Notifications" index="2">
                <div id="Unread_Notifications_header" className="Unread_type">Unread Notifications</div>
                
                <p class="thick">You have no unread Notifications</p>
                <p>When you contact the business to collect food or send a reservation request, you'll find you Notifications here.</p>
                
                <div id="Read_Notifications_header" className="read_type">Read Notifications</div>
            
            </TabItem>
        </Tabs>
      </div>
      </div>
    );
}

export default Inbox;