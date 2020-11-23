import React, { useState, useEffect } from 'react';
import { Label } from 'semantic-ui-react';
import firebase from "../base/firebase";

const Notification = (props) => {

    const messagesRef = firebase.database().ref("messages");
    const usersRef = firebase.database().ref("users");
    const [channelsVisitedState, setChannelsVisitedState] = useState({});
    const [messagesTimeStampState, setMessagesTimeStampState] = useState({});

    useEffect(() => {
        if (props.user) {
            usersRef.child(props.user?.uid).child('lastvisited').on('value', snap => {
                setChannelsVisitedState(snap.val());
            })
            messagesRef.on('value', snap => {
                let messages = snap.val();
                console.log(messages[-1]);
                let channelsId = Object?.keys(messages);
                let messagesTimeStamp = {};
                channelsId.forEach((channelId) => {
                    let channelMessageKeys = Object.keys(messages[channelId]);
                    channelMessageKeys.reduce((item) => {
                        messagesTimeStamp[channelId] = [...messagesTimeStamp[channelId] || []];
                        messagesTimeStamp[channelId].push(messages[channelId][item]?.timestamp);
                    })
                })
                setMessagesTimeStampState(messagesTimeStamp);
            })
        }
    }, [props.user]);

    const calculateNotificationCount = (channelId) => {
        
        if (channelsVisitedState && messagesTimeStampState && props.channel && props.channel.id !== channelId) {
            let lastVisited = channelsVisitedState[channelId];
            let channelMessagesTimeStamp = messagesTimeStampState[channelId];
            if (channelMessagesTimeStamp) {
                let notificationCount = channelMessagesTimeStamp.filter(timestamp => !lastVisited || lastVisited < timestamp).length;
                return notificationCount === 0 ? null : <Label color="red">{notificationCount}</Label>
            }
        }
        return null;
    }

    return <div> {props.displayName} {calculateNotificationCount(props.notificationChannelId)}  </div>;
}

export default Notification