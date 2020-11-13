import React, { useEffect, useState } from 'react';
import { Segment, Input, Comment } from 'semantic-ui-react';
import MessageHeader from '../Message/MessageHeader'
import MessageContent from '../Message/MessageContent'
import MessageInput from '../Message/MessageInput'
import firebase from '../../base/firebase'
import {connect} from 'react-redux'
import '../style.css'


const Message = (props) => {
    const  messageRef=firebase.database().ref('messages')
    const [messageState,setmessageState]=useState([]);
    const [searchState,setsearchState]=useState("");


    useEffect(()=>{
        if(props.channel){
            setmessageState([]);
        messageRef.child(props.channel.id).on('child_added',(snap)=>{
            setmessageState((currentState)=>{
                let updatesState=[...currentState];
                updatesState.push(snap.val())
                return updatesState
            })
        })

        return()=>messageRef.child(props.channel.id).off()
    }
    },[props.channel])

    const displayMessage=()=>{
        let messageToDisplay=searchState ? filterBySearch() : messageState;
        
        if(messageToDisplay.length>0){
            return messageToDisplay.map((message)=>{
                return <MessageContent key={message.timestamp} message={message} ownMessage={message.user.id===props.user.uid}></MessageContent>

            })
        }
    }
    const uniqueUserCount=()=>{
        const uniqueUsers=messageState.reduce((acc,message)=>{
            if(!acc.includes(message.user.name)){
                acc.push(message.user.name);
            }
            return acc
        },[])

        return uniqueUsers.length
    }

    const searchChange=(e)=>{
        const target=e.target
        setsearchState(target.value)
        
    }

    const filterBySearch=()=>{
        const regex=new RegExp(searchState, "gi" )
        const messages=messageState.reduce((acc,message)=>{
            console.log();
            if((message.content && message.content.match(regex)) || (message.user.name.match(regex))){
                acc.push(message);
                
            }
            
            return acc
        },[])
        
        return messages

    }
    return <div className="messages">
        <MessageHeader channelName={props.channel?.name} uniqueUser={uniqueUserCount()} searchChange={searchChange} isPrivatechat={props.channel?.isPrivatechat}/>
        <Segment className="messagecontent">
            <Comment.Group>
                {displayMessage()}
            </Comment.Group>
        </Segment>
        <MessageInput/>
    </div>
}

const mapStateToProps=(state)=>{
    return{
        channel:state.channel.currentChannel,
        user:state.user.currentUser
    }
}

export default connect(mapStateToProps)(Message);