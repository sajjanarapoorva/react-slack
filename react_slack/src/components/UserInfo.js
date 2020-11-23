import React from 'react';
import { Grid, Header, Icon, Image, Dropdown } from 'semantic-ui-react';
import { connect } from "react-redux";
import firebase from '../base/firebase';
// import uuidv4 from 'uuid/dist/v4'

import { setUser } from '../store/actioncreator'
import "./style.css";

const UserInfo = (props) => {
    // let userCollectionRef = firebase.database().ref('users');
    // const storageRef = firebase.storage().ref();
    // const [a,seta]=useState()
    const signOut = () => {
        firebase.auth()
            .signOut()
            .then(() => console.log("user signed out"));
    }

    // const handleImg=(e)=>{
    //     const filePath=`chat/Profile/${uuidv4()}.jpg`;
    //     const img=e.target.files[0]
        
    //     storageRef.child(filePath).put(img).then(
    //         (data) => {
    //             data.ref.getDownloadURL().then((url) => {
    //                 userCollectionRef.child(props.user?.uid).update({
    //                     photoURL: url
    //                 }).then(() => {
    //                     userCollectionRef.child(props.user?.uid).once('value',(snap)=>{
    //                         seta(snap.val().photoURL)
    //                         console.log(a);
    //                     })
    //                 }).catch((err) => {
    //                     console.log(err);
    //                 })
    //             })
    //         }
    //     ).catch((err) => {
    //         console.log(err);
    //     })
    // }

    // const handlefileImg=()=>{
    //     const fileinput=document.getElementById('file')
    //     fileinput.click()
    // }

    const getDropDownOptions = () => {
        return [
            {
                key: "user",
                text: <span>Signed in as <strong>{props.user.displayName}</strong></span>,
                disabled: true
            },
            // {
            //     key: "avatar",
            //     text: <span><Icon name="edit" onClick={handlefileImg}>Change Avatar
                
            //     <input type="file" name="file" id="file" onChange={handleImg} hidden="hidden"></input>
                
            //     </Icon></span>
            // },
            {
                key: "signout",
                text: <Icon name="sign-out"><span onClick={signOut} >  Sign Out</span></Icon>
            }
        ]
    }

    if (props.user) {
        return (<Grid>
            <Grid.Column>
                <Grid.Row className="userinfo_grid_row">
                    <Header inverted as="h2">
                        <Icon name="slack" />
                        <Header.Content>Slack</Header.Content>
                    </Header>
                    <Header className="userinfo_displayname" inverted as="h4">
                        <Dropdown
                            trigger={
                                <span>
                                    <Image  src={props.user.photoURL} avatar></Image>
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

const mapDispatchToProps = (dispatch) => {
    return {
      setUser: (user) => { dispatch(setUser(user.photoURL)) }
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(UserInfo);