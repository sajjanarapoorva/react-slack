import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Menu, Icon, Modal } from 'semantic-ui-react'
import { Form, Segment, Button } from 'semantic-ui-react'
import firebase from '../base/firebase'
import { setChannel } from '../store/actioncreator'
import Notification from './Notification'

import './style.css'

const Channel = (props) => {

    const [ModelOpenState, setModelOpenState] = useState(false)
    const [channelAddState, setchannelAddState] = useState({ Name: '', Desc: '' })
    const [isLoading, setisLoading] = useState(false)
    const [channelState, setchannelState] = useState([])

    const channelsRef = firebase.database().ref("channels")
    const UserRef = firebase.database().ref("users")


    useEffect(() => {
        channelsRef.on('child_added', (snap) => {
            setchannelState((currentState) => {
                let updatedState = [...currentState]
                updatedState.push(snap.val())
                return updatedState
            })
        })
        return()=>channelsRef.off();
    }, [])

    useEffect(()=>{
        if(channelState.length>0){
            props.selectChannel(channelState[0])
        }
    },[!props.channel ? channelState:null])


    const openModel = () => {
        setModelOpenState(true)
    }


    const closeModel = () => {
        setModelOpenState(false)
    }

    const checkFormValid = () => {
        return channelAddState && channelAddState.Name && channelAddState.Desc
    }

    const displayChannels = () => {
        if (channelState.length > 0) {
            return channelState.map((channel) => {
                return <Menu.Item
                    key={channel.id}
                    name={channel.name}
                    onClick={()=>{selectChannel(channel)}}
                    active={props.channel && channel.id===props.channel.id && !props.channel.isFav}
                    
                >
                    
                    <Notification user={props.user} channel={props.channel} notificationChannelId={channel.id}
                    displayName={'# '+ channel.name}
                    />
                   
                </Menu.Item>
            })
        }
    }

    const selectChannel=(channel)=>{
        setLatVisited(props.user,props.channel)
        setLatVisited(props.user,channel)
        props.selectChannel(channel)

    }

    const setLatVisited=(user,channel)=>{
        const LatVisited=UserRef.child(user.uid).child("lastvisited").child(channel.id);
        LatVisited.set(firebase.database.ServerValue.TIMESTAMP)
        LatVisited.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP)
    }


    const onSubmit = () => {
        if (!checkFormValid()) {
            return
        }
        const key = channelsRef.push().key;
        const channel = {
            id: key,
            name: channelAddState.Name,
            desc: channelAddState.Desc,
            created_by: {
                name: props.user.displayName,
                avatar: props.user.photoURL
            }
        }
        setisLoading(true)

        channelsRef.child(key).update(channel).then(() => {
            setchannelAddState({ Name: "", Desc: "" })
            setisLoading(false)
            closeModel()
            console.log("saved");
        }).catch((err) => {
            console.log(err);
        })

    }



    const handleInput = (e) => {
        let target = e.target;
        setchannelAddState((currentState) => {
            let updatedState = { ...currentState };
            updatedState[target.name] = target.value;
            return updatedState;
        })
    }

    return <><Menu.Menu style={{marginTop:"35px"}}>
        <Menu.Item style={{fontSize:"17px"}}>
            <span>
                <Icon name="exchange"></Icon>Channels
            </span>
            ({channelState.length})
            <span style={{marginLeft:"20px"}} onClick={openModel}>
                <Icon name="add circle">
                </Icon>
            </span>
        
        </Menu.Item>
        {displayChannels()}
        {/* <Menu.Item >
            <span onClick={openModel}>
                <Icon name="add">
                </Icon>
                ADD
            </span>
        </Menu.Item> */}

    </Menu.Menu>
        <Modal open={ModelOpenState} onClose={closeModel}>
            <Modal.Header>
                Create Channel
        </Modal.Header>

            <Modal.Content>
                <Form onSubmit={onSubmit}>
                    <Segment stacked>
                        <Form.Input
                            name="Name"
                            
                            value={channelAddState.Name}
                            onChange={handleInput}
                            type="text"
                            placeholder="Enter Channel Name"
                        />
                        <Form.Input
                            name="Desc"
                            value={channelAddState.Desc}
                            onChange={handleInput}
                            type="text"
                            placeholder="Enter Channel Description"
                        />
                    </Segment>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button loading={isLoading} onClick={onSubmit}>
                    <Icon name="checkmark" /> Save
                </Button>
                <Button onClick={closeModel}>
                    <Icon name="remove" /> Cancel
                </Button>
            </Modal.Actions>

        </Modal>
    </>
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

export default connect(mapStateToProps,mapDispatchToProps)(Channel)

