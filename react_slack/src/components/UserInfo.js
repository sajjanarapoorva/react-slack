import React from 'react';
import { Grid, Header, Icon, Image, Dropdown } from 'semantic-ui-react';
import { connect } from "react-redux";
import firebase from '../base/firebase';

import "./style.css";

const UserInfo = (props) => {
    // let userCollectionRef = firebase.database().ref('users');
    // const [img, setimg] = useState([]);

    const signOut = () => {
        firebase.auth()
            .signOut()
            .then(() => console.log("user signed out"));
    }

    const getDropDownOptions = () => {
        return [
        {
            key: "user",
            text : <span>Signed in as <strong>{props.user.displayName}</strong></span>,
            disabled: true
        },
        {
            key: "avatar",
            text: <span><Icon name="edit"></Icon>Change Avatar</span>
        },
        {
            key: "signout",
            text: <span onClick={signOut} >Sign Out</span>
        }
    ]
    }


    if (props.user) {
        return (<Grid>
            <Grid.Column>
                <Grid.Row className="userinfo_grid_row">
                    <Header inverted as="h2">
                        {/* <img src="SDDw7CnuoUGax6x9mTo7dd.jpg"></img> */}
                        <Icon name="slack" />
                        <Header.Content>Slack</Header.Content>
                     </Header>
                    <Header className="userinfo_displayname" inverted as="h4">
                        <Dropdown
                            trigger={
                                <span>
                                    <Image src={props.user.photoURL} avatar></Image>
                                    {/* <input type="file" 
                                    id="img"
                                    onChange={handleImgChange}
                                    hidden="hidden"></input> */}
                                    {props.user.displayName}
                                </span>
                            }
                            options={getDropDownOptions()}
                        >
                        </Dropdown>

                    </Header>
                </Grid.Row>
            </Grid.Column>
        </Grid>)
    }
    return null;
}

const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser
    }
}

export default connect(mapStateToProps)(UserInfo);