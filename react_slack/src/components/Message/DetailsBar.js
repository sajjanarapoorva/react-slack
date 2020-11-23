import React, { useState } from 'react';
import { connect } from 'react-redux'
import { Segment, Accordion, Icon, Card, Header, Image } from "semantic-ui-react"

const DetailsBar = (props) => {
    const [activeIndex, setactiveIndex] = useState(0)

    const handleClick = (e, titleProps) => {
        const { index } = titleProps
        const newIndex = activeIndex === index ? -1 : index
        setactiveIndex(newIndex)
    }

    return <Segment clearing>
        <Card>
            <Card.Content header='Details' />
            <Card.Content extra>
                # {props.channel?.name}
            </Card.Content>
            <Accordion>
                <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    onClick={handleClick}>
                    <Icon name='dropdown' />
                    <Icon name="info"></Icon>About
                    </Accordion.Title>
                <Accordion.Content active={activeIndex === 0} style={{ paddingLeft: "25px" }}>
                    <p>
                        {props.channel?.desc}
                    </p>
                </Accordion.Content>
                <Accordion.Title
                    active={activeIndex === 1}
                    index={1}
                    onClick={handleClick}
                >
                    <Icon name='dropdown' />
                    <Icon name="users"></Icon> Members <span style={{ paddingLeft: "70px" }}>{props.Message.message.length}</span>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 1} style={{ paddingLeft: "25px" }}>
                    <Header as="h4">
                        {props.Message ? (
                            props.Message.message.map((userName) => {
                                return <div key={userName} style={{color:""}}><li key={userName}>{userName}</li>
                                </div>
                            })
                        ) : null}
                    </Header>
                </Accordion.Content>
                <Accordion.Title
                    active={activeIndex === 3}
                    index={3}
                    onClick={handleClick}
                >
                    <Icon name='dropdown' />
                    <Icon name="file"></Icon>Files
                    </Accordion.Title>
                <Accordion.Content active={activeIndex === 3} style={{ paddingLeft: "25px" }}>
                {props.message.map((message) => {
                return <div key={message.timestamp} style={{color:""}}>
                    { message.contentType === "image/jpeg"
                    ?
                    <Card>
                    <Card.Content>
                        <Card.Description >
                         <Image src={message.image} style={{ width: "100%" }}></Image>
                         </Card.Description>
                         <Card.Meta style={{fontSize:"13px"}}> Sent By  {message.user.name} {message.fileSize}
                         </Card.Meta>
                         
                    </Card.Content>
                </Card>
                    :
                    message.contentType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || message.contentType === "application/msword"
                        ?
                        <Card>
                            <Card.Content>
                                <Card.Description >
                                <a href={message.image} data-toggle="tooltip" data-placement="right" title="Click here to download"><Icon name='file word'/>{message.fileName}</a></Card.Description>
                                <Card.Meta style={{fontSize:"13px"}}> Sent By  {message.user.name} {message.fileSize}
                                </Card.Meta>
                            </Card.Content>
                        </Card>
                        :
                        message.contentType === "application/pdf"
                        ?
                        <Card>
                            <Card.Content>
                                <Card.Description >
                                <a href={message.image} target="new" data-toggle="tooltip" data-placement="right" title="Click here to view"><Icon name='file pdf'/>{message.fileName}</a></Card.Description>
                                <Card.Meta style={{fontSize:"13px"}}> Sent By  {message.user.name} {message.fileSize}
                                </Card.Meta>
                               
                            </Card.Content>
                        </Card>
                        :
                        message.contentType === "application/xml" || message.contentType ==="text/xml"
                        ?
                        <Card>
                            <Card.Content>
                                <Card.Description >
                                <a href={message.image} data-toggle="tooltip" data-placement="right" title="Click here to download"><Icon name='file excel'/>{message.fileName}</a></Card.Description>
                                <Card.Meta style={{fontSize:"13px"}}> Sent By  {message.user.name} {message.fileSize}
                                </Card.Meta>
                               
                            </Card.Content>
                        </Card>
                        :
                        message.contentType === "application/zip"
                        ?
                        <Card>
                            <Card.Content>
                                <Card.Description >
                                <a href={message.image} data-toggle="tooltip" data-placement="right" title="Click here to download"><Icon name='file archive'/>{message.fileName}</a></Card.Description>
                                <Card.Meta style={{fontSize:"13px"}}> Sent By  {message.user.name} {message.fileSize}
                                </Card.Meta>
                               
                            </Card.Content>
                        </Card>
                        :
                        message.contentType === "text/plain"
                        ?
                        <Card>
                            <Card.Content>
                                <Card.Description >
                                <a href={message.image} target="new" data-toggle="tooltip" data-placement="right" title="Click here to view"><Icon name='file'/>{message.fileName}</a></Card.Description>
                                <Card.Meta style={{fontSize:"13px"}}> Sent By  {message.user.name} {message.fileSize}
                                </Card.Meta>
                               
                            </Card.Content>
                        </Card>
                        :
                        message.contentType === "application/ppt" || message.contentType ==="application/vnd.openxmlformats-officedocument.presentationml.presentation"
                        ?
                        <Card>
                            <Card.Content>
                                <Card.Description >
                                <a href={message.image} data-toggle="tooltip" data-placement="right" title="Click here to download"><Icon name='file powerpoint'/>{message.fileName}</a></Card.Description>
                                <Card.Meta style={{fontSize:"13px"}}> Sent By  {message.user.name} {message.fileSize}
                                </Card.Meta>
                               
                            </Card.Content>
                        </Card>
                        :
                        message.contentType === "text/csv" 
                        ?
                        <Card>
                            <Card.Content>
                                <Card.Description >
                                <a href={message.image} data-toggle="tooltip" data-placement="right" title="Click here to download"><Icon name='file excel'/>{message.fileName}</a></Card.Description>
                         <Card.Meta style={{fontSize:"13px"}}> Sent By  {message.user.name} {message.fileSize}
                                </Card.Meta>
                            </Card.Content>
                        </Card>
                        :null 
            }
                    </div>
         }) 
        }
                </Accordion.Content>
                <Accordion.Title
                    active={activeIndex === 2}
                    index={2}
                    onClick={handleClick}
                >
                    <Icon name='dropdown' />
                    <Icon name="edit"></Icon>Created By
                    </Accordion.Title>
                <Accordion.Content active={activeIndex === 2} style={{ paddingLeft: "25px" }}>
                    <Header as="h3">
                        <Image size="mini" circular src={props.channel?.created_by?.avatar} />
                        {props.channel?.created_by?.name}
                    </Header>
                </Accordion.Content>
            </Accordion>
        </Card>
    </Segment>
}

const mapStateToProps = (state) => {
    return {
        channel: state.channel.currentChannel,
        user: state.user.currentUser,
        Message: state.Message,
        message:state.messageFile.messagefile
    }
}

export default connect(mapStateToProps)(DetailsBar)