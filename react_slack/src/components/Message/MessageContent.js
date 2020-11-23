import React from 'react';
import { Comment, Image, Icon, Card } from 'semantic-ui-react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import '../style.css'

TimeAgo.locale(en)
const timeAgo = new TimeAgo();

const MessageContent = (props) => {
    return <Comment>
        <Comment.Avatar src={props.message.user.avatar} />
        <Comment.Content style={{ fontSize: "15px" }} className={props.ownMessage ? "ownMessage" : null}>
            <Comment.Author>{props.message.user.name}</Comment.Author>
            <Comment.Metadata>{timeAgo.format(props.message.timestamp)}</Comment.Metadata>
            <br></br>
            {
                props.message.contentType === "image/jpeg"
                    ?
                    <Image onLoad={props.imgLoaded} src={props.message.image} style={{ width: "60%" }}></Image>
                    :
                    props.message.contentType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || props.message.contentType === "application/msword"
                        ?
                        <Card>
                            <Card.Content>
                                <Card.Description >
                                <a href={props.message.image} data-toggle="tooltip" data-placement="right" title="Click here to download"><Icon name='file word'/>{props.message.fileName}</a></Card.Description>
                                <Card.Meta style={{fontSize:"13px"}}>{props.message.fileSize} WORD Document
                                </Card.Meta>
                            </Card.Content>
                        </Card>
                        :
                        props.message.contentType === "application/pdf"
                        ?
                        <Card>
                            <Card.Content>
                                <Card.Description >
                                <a href={props.message.image} target="new" data-toggle="tooltip" data-placement="right" title="Click here to view"><Icon name='file pdf'/>{props.message.fileName}</a></Card.Description>
                                <Card.Meta style={{fontSize:"13px"}}>{props.message.fileSize} PDF Document
                                </Card.Meta>
                               
                            </Card.Content>
                        </Card>
                        :
                        props.message.contentType === "application/xml" || props.message.contentType ==="text/xml"
                        ?
                        <Card>
                            <Card.Content>
                                <Card.Description >
                                <a href={props.message.image} data-toggle="tooltip" data-placement="right" title="Click here to download"><Icon name='file excel'/>{props.message.fileName}</a></Card.Description>
                                <Card.Meta style={{fontSize:"13px"}}>{props.message.fileSize} EXCEL Document
                                </Card.Meta>
                               
                            </Card.Content>
                        </Card>
                        :
                        props.message.contentType === "application/zip"
                        ?
                        <Card>
                            <Card.Content>
                                <Card.Description >
                                <a href={props.message.image} data-toggle="tooltip" data-placement="right" title="Click here to download"><Icon name='file archive'/>{props.message.fileName}</a></Card.Description>
                                <Card.Meta style={{fontSize:"13px"}}>{props.message.fileSize} ZIP Document
                                </Card.Meta>
                               
                            </Card.Content>
                        </Card>
                        :
                        props.message.contentType === "text/plain"
                        ?
                        <Card>
                            <Card.Content>
                                <Card.Description >
                                <a href={props.message.image} target="new" data-toggle="tooltip" data-placement="right" title="Click here to view"><Icon name='file'/>{props.message.fileName}</a></Card.Description>
                                <Card.Meta style={{fontSize:"13px"}}>{props.message.fileSize} TXT Document
                                </Card.Meta>
                               
                            </Card.Content>
                        </Card>
                        :
                        props.message.contentType === "application/ppt" || props.message.contentType ==="application/vnd.openxmlformats-officedocument.presentationml.presentation" || props.message.contentType ==="application/vnd.ms-powerpoint"
                        ?
                        <Card>
                            <Card.Content>
                                <Card.Description >
                                <a href={props.message.image} data-toggle="tooltip" data-placement="right" title="Click here to download"><Icon name='file powerpoint'/>{props.message.fileName}</a></Card.Description>
                                <Card.Meta style={{fontSize:"13px"}}>{props.message.fileSize} PPT Document
                                </Card.Meta>
                               
                            </Card.Content>
                        </Card>
                        :
                        props.message.contentType === "text/csv" 
                        ?
                        <Card>
                            <Card.Content>
                                <Card.Description >
                                <a href={props.message.image} data-toggle="tooltip" data-placement="right" title="Click here to download"><Icon name='file excel'/>{props.message.fileName}</a></Card.Description>
                                <Card.Meta style={{fontSize:"13px"}}>{props.message.fileSize} CSV Document
                                </Card.Meta>
                            </Card.Content>
                        </Card>
                        :
                        <Comment.Text>{props.message.content}</Comment.Text>
            }
        </Comment.Content>
    </Comment>
}

export default MessageContent;