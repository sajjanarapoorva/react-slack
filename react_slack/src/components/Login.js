import React, { useState } from 'react';
import { Grid, Form, Segment, Header, Icon, Button, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import firebase from '../base/firebase';

const Login = () => {

    let user = {
        email: '',
        password: ''
    }

    let errors = [];

    const [userState, setuserState] = useState(user);
    const [isLoading, setIsLoading] = useState(false);
    const [errorState, seterrorState] = useState(errors);
    var provider = new firebase.auth.GoogleAuthProvider();

    const handleInput = (event) => {
        let target = event.target;
        setuserState((currentState) => {
            let currentuser = { ...currentState };
            currentuser[target.name] = target.value;
            return currentuser;
        })
    }

    const checkForm = () => {
        if (isFormEmpty()) {
            seterrorState((error) => error.concat({ message: "Please fill in all fields" }));
            return false;
        }
        return true;
    }

    const isFormEmpty = () => {
        return !userState.password.length ||
            !userState.email.length;
    }

    const formaterrors = () => {
        return errorState.map((error, index) => <p key={index}>{error.message}</p>)
    }

    const onSubmit = (event) => {
        seterrorState(() => []);
        if (checkForm()) {
            setIsLoading(true);
            firebase.auth()
                .signInWithEmailAndPassword(userState.email, userState.password)
                .then(user => {
                    setIsLoading(false);
                    console.log(user);
                })
                .catch(serverError => {
                    setIsLoading(false);
                    seterrorState((error) => error.concat(serverError));
                })

        }
    }

    const abc = () => {
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    return <Grid verticalAlign="top" textAlign="center" className="grid-form" >
        <Grid.Column style={{ maxWidth: '500px' }}>
            <img src="Screen-Shot-2019-01-17-at-2.29.34-PM.png" style={{ marginTop: "50px", width: "40%" }}></img>
            <p className="p-refreshed_page__heading">Sign in to Slack</p>
            <p className="p-refreshed_page__sub_heading">Continue with the Google account or email address you use to sign in.</p>
            <Button color="primary" basic fluid={true} style={{marginBottom:"30px",fontSize:"80%"}} onClick={abc}>
            <img src="Capture.PNG" style={{width:"80%"}}></img>
            </Button>
            <div class="c-horizontal_content_rule margin_bottom_150"><hr class="c-horizontal_content_rule__leftrule"/>
            <div class="c-horizontal_content_rule__content"><strong class="sk_light_gray_always">OR</strong></div>
            <hr class="c-horizontal_content_rule__rightrule"/></div>
            <Form onSubmit={onSubmit}>
                <Segment stacked>
                    <Form.Input
                        name="email"
                        value={userState.email}
                        icon="mail"
                        iconPosition="left"
                        onChange={handleInput}
                        type="email"
                        placeholder="User Email"
                    />
                    <Form.Input
                        name="password"
                        value={userState.password}
                        icon="lock"
                        iconPosition="left"
                        onChange={handleInput}
                        type="password"
                        placeholder="User Password"
                    />
                </Segment>
                <Button disabled={isLoading} loading={isLoading} fluid={true} style={{backgroundColor:"#4a154b", color:"white" ,fontSize:"120%"}}>Sign In with Email</Button>
            </Form>
            {errorState.length > 0 && <Message error>
                <h3>Errors</h3>
                {formaterrors()}
            </Message>
            }
            <Message>
                Not an User? <Link to="/register" >Register </Link>
            </Message>
        </Grid.Column>
    </Grid>
}

export default Login;