import React,{useEffect, useState} from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';
import firebase from '../../base/firebase'
import {connect} from 'react-redux'
import ImageUpload from '../ImageUpload'
import uuidv4 from 'uuid/dist/v4'


const MessageInput = (props) => {
    const messageRef=firebase.database().ref('messages');
    const storageRef=firebase.storage().ref();


    const [messageState,setmessageState]=useState('');
    const [fileDialogState,setfileDialogState]=useState(false);


    const createMessageInfo=(downloadUrl)=>{
        return{
            user:{
                avatar:props.user.photoURL,
                name:props.user.displayName,
                id:props.user.uid

            },
            content:messageState,
            image:downloadUrl || "",
            timestamp:firebase.database.ServerValue.TIMESTAMP
        }
    }

    const onSubmit=(downloadUrl)=>{

        if(messageState || downloadUrl){
            messageRef.child(props.channel.id).push().set(createMessageInfo(downloadUrl)).then(()=>{
                setmessageState("")
                console.log("sent");
            }).catch((err)=>{
                console.log(err);
            })
        }
    }

    const onMessageChange=(e)=>{
        const target=e.target;
        setmessageState(target.value)
    }

    const createActionButtons = () => {
        return <>
            <Button icon="send" onClick={()=>{onSubmit()}} />
            <Button icon="upload" onClick={()=>setfileDialogState(true)}/>
        </>
    }

    const uploadImage=(file,contentType)=>{
        const filePath=`chat/images/${uuidv4()}.jpg`;
        storageRef.child(filePath).put(file,{contentType:contentType}).then(
            (data)=>{
                data.ref.getDownloadURL().then((url)=>{
                    onSubmit(url)

                })
            }
        ).catch((err)=>{
            console.log(err);
        })

    }

    return <Segment>
        <Input fluid={true}
        onChange={onMessageChange}
            name="message"
            value={messageState}
            label={createActionButtons()}
            labelPosition="right"
        >
        </Input>
        <ImageUpload uploadImage={uploadImage} open={fileDialogState} onClose={()=>setfileDialogState(false)} />
    </Segment>
}

const mapStateToProps=(state)=>{
    return{
        user:state.user.currentUser,
        channel:state.channel.currentChannel
    }
}

export default connect(mapStateToProps)(MessageInput);
