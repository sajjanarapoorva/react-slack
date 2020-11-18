import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Menu, Icon } from 'semantic-ui-react'
import firebase from '../base/firebase'
import { setChannel } from '../store/actioncreator'
import Notification from './Notification'


const Chat = (props) => {
    const [UserState, setUserState] = useState([])
    const [ConnectedUserState, setConnectedUserState] = useState([])
    const UserRef = firebase.database().ref("users")
    const connectedRef =firebase.database().ref(".info/connected")
    const statusRef=firebase.database().ref("status")

    useEffect(() => {
        UserRef.on('child_added', (snap) => {
            setUserState((currentState) => {
                let updatedState = [...currentState]
                let user=snap.val();
                user.name=user.displayName
                user.id=snap.key
                user.isPrivatechat=true
                updatedState.push(user)
                return updatedState
            })
        })
        connectedRef.on("value",snap=>{
            if(props.user && snap.val()){
                const userStatusRef=statusRef.child(props.user.uid)
                userStatusRef.set(true)
                userStatusRef.onDisconnect().remove()
            }
        })

        return()=>{UserRef.off(); connectedRef.off()}
    }, [props.user])

    useEffect(()=>{
        statusRef.on("child_added",snap=>{
            setConnectedUserState((currentState)=>{
                let updatedState=[...currentState]
                updatedState.push(snap.key)
                return updatedState
            })
        })

        statusRef.on("child_removed",snap=>{
            setConnectedUserState((currentState)=>{
                let updatedState=[...currentState]
                let index=updatedState.indexOf(snap.key)
                updatedState.splice(index,1)
                return updatedState
            })
        })
        return()=>statusRef.off()

    },[UserState])



    const displayUsers = () => {
        if (UserState.length > 0) {
            return UserState.filter((user) => user.id!=props.user?.uid).map((user)=>{
                return <Menu.Item
                    key={user.id}
                    name={user.name}
                    onClick={()=>{selectUser(user)}}
                    active={props.channel && generateId(user.id)===props.channel.id}
                >
                    <Icon name="circle" color={`${ConnectedUserState.indexOf(user.id)!==-1 ? "green":"red"}`}></Icon>
                    
                    <Notification user={props.user} channel={props.channel} notificationChannelId={generateId(user.id)}
                    displayName={'@ '+user.name}
                    />
                   
                </Menu.Item>
            })
        }
    }

    const selectUser=(user)=>{
        let userTemp={
            ...user
        }
        userTemp.id=generateId(user.id)
        setLatVisited(props.user,props.channel)
        setLatVisited(props.user,userTemp)
        props.selectChannel(userTemp)

    }

    const setLatVisited=(user,channel)=>{
        const LatVisited=UserRef.child(user?.uid).child("lastvisited").child(channel.id);
        LatVisited.set(firebase.database.ServerValue.TIMESTAMP)
        LatVisited.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP)
    }

    const generateId=(userId)=>{
        if(props.user?.uid < userId){
            return props.user?.uid + userId
        }
            else{
                return userId+props.user?.uid
            }
        
    }

    return <Menu.Menu style={{marginTop:"35px"}}>
        <Menu.Item style={{fontSize:"17px"}}>
            <span>
                <Icon name="mail"></Icon>Direct Messages
            </span>
        ({UserState.length -1})
        </Menu.Item>
        {displayUsers()}
    </Menu.Menu>
    
}

const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser,
        channel:state.channel.currentChannel
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectChannel:(channel)=>dispatch(setChannel(channel))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Chat)

