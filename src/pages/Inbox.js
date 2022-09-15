import React from 'react';
import styles from "./Inbox.css";

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
        <div className={styles["tab-menu"]}>
          {items.map(({ props: { index, label } }) => (
            <button
              onClick={() => changeTab(index)}
              key={index}
              className={bindIndex === index ? styles["focus"] : ""}
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
    return (
      <div>
        <Tabs defaultIndex="1" onTabClick={console.log}>
            <TabItem label="Messages" index="1">
                <p></p>
                <p class="thick">You have no unread Messages</p>
                <p>When you contact the business to collect food or send a reservation request, you'll find you messages here.</p>
            </TabItem>
            <TabItem label="Notifications" index="2">
                <p></p>
                <p class="thick">You have no unread Notifications</p>
                <p>When you contact the business to collect food or send a reservation request, you'll find you Notifications here.</p>
            </TabItem>
        </Tabs>
      </div>
    );
}

export default Inbox;