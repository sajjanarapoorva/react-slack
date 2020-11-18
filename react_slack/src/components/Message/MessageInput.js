import React, {  useState } from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';
import firebase from '../../base/firebase'
import { connect } from 'react-redux'
import ImageUpload from '../ImageUpload'
import uuidv4 from 'uuid/dist/v4'
// import Picker from 'emoji-picker-react';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import '../style.css'


const MessageInput = (props) => {
    const messageRef = firebase.database().ref('messages');
    const storageRef = firebase.storage().ref();
    const [messageState, setmessageState] = useState('');
    const [fileDialogState, setfileDialogState] = useState(false);
    const [emojiState, setemojiState] = useState(false);


    const createMessageInfo = (downloadUrl) => {
        return {
            user: {
                avatar: props.user.photoURL,
                name: props.user.displayName,
                id: props.user.uid
            },
            content: messageState,
            image: downloadUrl || "",
            timestamp: firebase.database.ServerValue.TIMESTAMP
        }
    }

    const onSubmit = (downloadUrl) => {
        if (messageState || downloadUrl) {
            messageRef.child(props.channel.id).push().set(createMessageInfo(downloadUrl)).then(() => {
                setmessageState("")
                console.log("sent");
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const onMessageChange = (e) => {
        const target = e.target;
        setmessageState(target.value)
    }
    const handleKeypress = e => {
        //it triggers by pressing the enter key
        console.log(e.key);
        if (e.key === "Enter") {
            return onSubmit();
        }
    };

    const handleEmojiPicker = () => {
        if (!emojiState) {
            setemojiState(true)
        }
        else {
            setemojiState(false)
        }
    }

    const addEmoji = (emoji) => {
        setmessageState(messageState + emoji.native)
    }



    // const createActionButtons = () => {
    //     return <>
    //         <Button icon="send" onClick={() => { onSubmit() }} />
    //         <Button icon="upload" onClick={() => setfileDialogState(true)} />
    //         {/* <Button icon="smile outline" onClick={handleEmojiPicker} />
    //         {emojiState ? (
    //             <Picker style={{ position: 'absolute', bottom: '40px', right: '20px' }} onKeyPress={handleKeypress} onSelect={(emoji) => { addEmoji(emoji) }} emojiSize={20} />) : null} */}
    //     </>
    // }

    const uploadImage = (file, contentType) => {
        const filePath = `chat/images/${uuidv4()}.jpg`;
        storageRef.child(filePath).put(file, { contentType: contentType }).then(
            (data) => {
                data.ref.getDownloadURL().then((url) => {
                    onSubmit(url)
                })
            }
        ).catch((err) => {
            console.log(err);
        })
    }

    return <Segment >
        <Input 
            onChange={onMessageChange}
            onKeyPress={handleKeypress}
            name="message"
            style={{width:"95%",paddingRight:"5px",paddingBottom:"10px"}}
            value={messageState}
            placeholder="Write Your Message"
            // label={createActionButtons()}
            labelPosition="right"
        ></Input>
        <Button icon="smile outline" onClick={handleEmojiPicker} size="medium"/>
        {emojiState ? (
            <Picker style={{ position: 'absolute', bottom: '100px', right: '20px' }} onKeyPress={handleKeypress} onSelect={(emoji) => { addEmoji(emoji) }} emojiSize={20} />) : null}
        <ImageUpload uploadImage={uploadImage} open={fileDialogState} onClose={() => setfileDialogState(false)} />

        <div class="ui icon two buttons" >
        <Button icon="send" content="Add Reply" color="orange" onClick={() => { onSubmit() }} />
        <Button icon="upload" content="Upload Media"color="blue" onClick={() => setfileDialogState(true)} />

            {/* <button class="ui orange icon left labeled button"><i aria-hidden="true" class="edit icon"></i>Add Reply</button> */}
            {/* <button class="ui teal icon right labeled button"><i aria-hidden="true" class="cloud upload icon"></i>Upload Media</button> */}
            </div>
    </Segment>
}

const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser,
        channel: state.channel.currentChannel
    }
}

export default connect(mapStateToProps)(MessageInput);
