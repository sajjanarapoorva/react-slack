import React, {  useState } from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';
import firebase from '../../base/firebase'
import { connect } from 'react-redux'
import ImageUpload from '../ImageUpload'
import uuidv4 from 'uuid/dist/v4'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import '../style.css'

const MessageInput = (props) => {
    const messageRef = firebase.database().ref('messages');
    const storageRef = firebase.storage().ref();
    const [messageState, setmessageState] = useState('');
    const [fileDialogState, setfileDialogState] = useState(false);
    const [emojiState, setemojiState] = useState(false);

    const createMessageInfo = (downloadUrl,contentType,fileSize,fileName) => {
        return {
            user: {
                avatar: props.user.photoURL,
                name: props.user.displayName,
                id: props.user.uid
            },
            content: messageState,
            contentType:contentType || "",
            fileName:fileName || "",
            fileSize:fileSize || "",
            image: downloadUrl || "",
            timestamp: firebase.database.ServerValue.TIMESTAMP
        }
    }

    const onSubmit = (downloadUrl,contentType,fileSize,fileName) => {
        if (messageState || downloadUrl) {
            messageRef.child(props.channel.id).push().set(createMessageInfo(downloadUrl,contentType,fileSize,fileName)).then(() => {
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

    const uploadImage = (file, contentType) => {
        var a=file.name.split('.')[1]
        var fileSize=(file.size/1000)+" kB"
        var fileName=file.name
        console.log(file);

        const filePath = `chat/images/${uuidv4()}.jpg`;
        const filePath2 = `chat/Doc/${uuidv4()}.docx`;
        const filePath3 = `chat/Doc/${uuidv4()}.pdf`;
        const filePath4 = `chat/Doc/${uuidv4()}.xml`;
        const filePath5 = `chat/Doc/${uuidv4()}.zip`;
        const filePath6 = `chat/Doc/${uuidv4()}.txt`;
        const filePath7 = `chat/Doc/${uuidv4()}.ppt`;
        const filePath8 = `chat/Doc/${uuidv4()}.csv`;

        if(a==="docx"){
            storageRef.child(filePath2).put(file, { contentType: contentType }).then(
                (data) => {
                    data.ref.getDownloadURL().then((url) => {
                        onSubmit(url,contentType,fileSize,fileName)
                    })
                }
            ).catch((err) => {
                console.log(err);
            })
        }
        else if(a==="jpg" || a==="png" || a==="jpeg"){
            storageRef.child(filePath).put(file, { contentType: contentType }).then(
                (data) => {
                    data.ref.getDownloadURL().then((url) => {
                        onSubmit(url,contentType,fileSize,fileName)
                    })
                }
            ).catch((err) => {
                console.log(err);
            })
        }
        else if(a==="pdf"){
            storageRef.child(filePath3).put(file, { contentType: contentType }).then(
                (data) => {
                    data.ref.getDownloadURL().then((url) => {
                        onSubmit(url,contentType,fileSize,fileName)
                    })
                }
            ).catch((err) => {
                console.log(err);
            })
        }
        else if(a==="xml"){
            storageRef.child(filePath4).put(file, { contentType: contentType }).then(
                (data) => {
                    data.ref.getDownloadURL().then((url) => {
                        onSubmit(url,contentType,fileSize,fileName)
                    })
                }
            ).catch((err) => {
                console.log(err);
            })
        }

        else if(a==="zip"){
            storageRef.child(filePath5).put(file, { contentType: contentType }).then(
                (data) => {
                    data.ref.getDownloadURL().then((url) => {
                        onSubmit(url,contentType,fileSize,fileName)
                    })
                }
            ).catch((err) => {
                console.log(err);
            })
        }
        else if(a==="txt"){
            storageRef.child(filePath6).put(file, { contentType: contentType }).then(
                (data) => {
                    data.ref.getDownloadURL().then((url) => {
                        onSubmit(url,contentType,fileSize,fileName)
                    })
                }
            ).catch((err) => {
                console.log(err);
            })
        }
        else if(a==="ppt" || a==="pptx"){
        console.log(a);
            storageRef.child(filePath7).put(file, { contentType: contentType }).then(
                (data) => {
                    data.ref.getDownloadURL().then((url) => {
                        onSubmit(url,contentType,fileSize,fileName)
                    })
                }
            ).catch((err) => {
                console.log(err);
            })
        }

        else if(a==="csv"){
            console.log(a);
                storageRef.child(filePath8).put(file, { contentType: contentType }).then(
                    (data) => {
                        data.ref.getDownloadURL().then((url) => {
                            onSubmit(url,contentType,fileSize,fileName)
                        })
                    }
                ).catch((err) => {
                    console.log(err);
                })
            }
    }

    return <Segment >
        <Input 
            onChange={onMessageChange}
            onKeyPress={handleKeypress}
            name="message"
            style={{width:"94%",paddingRight:"5px",paddingBottom:"10px"}}
            value={messageState}
            placeholder="Write Your Message"
            labelPosition="right"
        ></Input>
        <Button icon="smile outline" onClick={handleEmojiPicker} size="medium"/>
        {emojiState ? (
            <Picker style={{ position: 'absolute', bottom: '100px', right: '20px' }} onKeyPress={handleKeypress} onSelect={(emoji) => { addEmoji(emoji) }} emojiSize={20} />) : null}
        <ImageUpload uploadImage={uploadImage} open={fileDialogState} onClose={() => setfileDialogState(false)} />
        <div class="ui icon two buttons" >
        <Button icon="send" content="Add Reply" color="orange" onClick={() => { onSubmit() }} />
        <Button icon="upload" content="Upload Media" color="blue" onClick={() => setfileDialogState(true)} />
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
