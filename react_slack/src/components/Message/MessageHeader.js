import React from 'react';
import { Segment, Header, Input, Icon } from 'semantic-ui-react';

const MessageHeader = (props) => {
    return <Segment clearing>
        <Header floated="left" fluid="true" as="h2">
            <span>
                {(props.isPrivatechat ?"@ ": "# ")+ props.channelName}
                {!props.isPrivatechat &&  <Icon onClick={props.starChange} 
                name={props.starred ? "star" :"star outline"}
                color={props.starred ? "yellow" :"black"}
                ></Icon>}
            </span>
        <Header.Subheader><Icon name="user outline"></Icon>{props.uniqueUser} | {props.channelDesc}
        </Header.Subheader> 
        </Header>
        <Header floated="right">
            <Input
                name="search"
                icon="search"
                placeholder="Search Messages"
                size="mini"
                onChange={props.searchChange}
            />
        </Header>
    </Segment>
}

export default MessageHeader;