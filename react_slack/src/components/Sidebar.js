import React from 'react';
import { Menu } from 'semantic-ui-react';
import UserInfo from "./UserInfo";
import Channels from "./Channels";
import PrivateChat from "./Chat";
import FavouriteChannels from "./FavChannel";

import "./style.css";

export const SideBar = () => {
    return (<Menu vertical fixed="left" borderless size="large" className="side_bar">
        <UserInfo />
        <FavouriteChannels />
        <Channels />
        <PrivateChat />
    </Menu>
    )
}