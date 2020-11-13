import React from 'react';
import { Segment, Header, Input, Icon } from 'semantic-ui-react';

const MessageHeader = (props) => {
    return <Segment clearing>
        <Header floated="left" fluid="true" as="h2">
            <span>
                {(props.isPrivatechat ?"@ ": "# ")+ props.channelName}
                {!props.isPrivatechat &&  <Icon name="star outline"></Icon>}
               
            </span>
        <Header.Subheader>{props.uniqueUser} User{props.uniqueUser<=1?"":"s"}</Header.Subheader>
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