import React, { useEffect, useRef, useState } from 'react';
import { Segment, Input, Comment } from 'semantic-ui-react';
import MessageHeader from '../Message/MessageHeader'
import MessageContent from '../Message/MessageContent'
import MessageInput from '../Message/MessageInput'
import firebase from '../../base/firebase'
import { connect } from 'react-redux'
import { setfavouriteChannel, removefavouriteChannel } from '../../store/actioncreator'
import '../style.css'


const Message = (props) => {
    const messageRef = firebase.database().ref('messages')

    const usersRef = firebase.database().ref('users')

    const [messageState, setmessageState] = useState([]);
    const [searchState, setsearchState] = useState("");

    let divRef = useRef()


    useEffect(() => {
        if (props.channel) {
            setmessageState([]);
            messageRef.child(props.channel.id).on('child_added', (snap) => {
                setmessageState((currentState) => {
                    let updatesState = [...currentState];
                    updatesState.push(snap.val())
                    return updatesState
                })
            })

            return () => messageRef.child(props.channel.id).off()
        }
    }, [props.channel])


    useEffect(() => {
        if (props.user) {

            usersRef.child(props.user.uid).child('favourite').on('child_added', (snap) => {

                props.setfavouriteChannel(snap.val())

            })

            usersRef.child(props.user.uid).child('favourite').on("child_removed", (snap) => {
                props.removefavouriteChannel(snap.val())

            })

            return () => usersRef.child(props.user.uid).child('favourite').off()
        }
    }, [props.channel])


    useEffect(()=> {
        divRef.scrollIntoView({behavior : 'smooth'});
    },[messageState])


    const imgLoaded=()=>{
        divRef.scrollIntoView({behavior : 'smooth'});

    }



    const displayMessage = () => {
        let messageToDisplay = searchState ? filterBySearch() : messageState;

        if (messageToDisplay.length > 0) {
            return messageToDisplay.map((message) => {
                return <MessageContent key={message.timestamp} message={message} ownMessage={message.user?.id === props.user?.uid} imgLoaded={imgLoaded}></MessageContent>

            })
        }
    }
    const uniqueUserCount = () => {
        const uniqueUsers = messageState.reduce((acc, message) => {
            if (!acc.includes(message.user.name)) {
                acc.push(message.user.name);
            }
            return acc
        }, [])

        return uniqueUsers.length
    }

    const searchChange = (e) => {
        const target = e.target
        setsearchState(target.value)

    }

    const filterBySearch = () => {
        const regex = new RegExp(searchState, "gi")
        const messages = messageState.reduce((acc, message) => {
            console.log();
            if ((message.content && message.content.match(regex)) || (message.user.name.match(regex))) {
                acc.push(message);

            }

            return acc
        }, [])

        return messages

    }

    const starChange = () => {
        let FavRef = usersRef.child(props.user.uid).child("favourite").child(props.channel.id);
        if (isStared()) {
            FavRef.remove();

        }
        else {
            FavRef.set({ channelId: props.channel.id, channelName: props.channel.name })
        }


    }

    const isStared = () => {
        return Object.keys(props.favouriteChannels).includes(props.channel?.id)

    }

    return <div className="messages">
        <MessageHeader channelName={props.channel?.name} uniqueUser={uniqueUserCount()} searchChange={searchChange} isPrivatechat={props.channel?.isPrivatechat}
            starChange={starChange} starred={isStared()}
        />
        <Segment className="messagecontent">
            <Comment.Group>
                {displayMessage()}
                <div ref={currentEle => divRef = currentEle}></div>
            </Comment.Group>
        </Segment>
        <MessageInput />
    </div>
}

const mapStateToProps = (state) => {
    return {
        channel: state.channel.currentChannel,
        user: state.user.currentUser,
        favouriteChannels: state.favouriteChannel.favouriteChannel
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setfavouriteChannel: (channel) => dispatch(setfavouriteChannel(channel)),
        removefavouriteChannel: (channel) => dispatch(removefavouriteChannel(channel))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Message);