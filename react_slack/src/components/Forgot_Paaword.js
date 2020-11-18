import React, { useCallback, useState } from 'react';
import { Grid, Form, Segment, Button, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import firebase from '../base/firebase';

const ForgotPassword = ({ history }) => {

    let user = {
        email: '',
        password: ''
    }

    let errors = [];
    let succ = [];


    const [userState, setuserState] = useState(user);
    const [isLoading, setIsLoading] = useState(false);
    const [errorState, seterrorState] = useState(errors);
    const [succState, setsuccState] = useState(succ);


    const handleInput = (event) => {
        let target = event.target;
        setuserState((currentState) => {
            let currentuser = { ...currentState };
            currentuser[target.name] = target.value;
            return currentuser;
        })
    }

    const formaterrors = () => {
        return errorState.map((error, index) => <p key={index}>{error.message}</p>)
    }

    const formatsuccess = () => {
        return succState.map((succ, index) => <p key={index}>{succ}</p>)
    }
    const handleForgotPassword = useCallback(
        async event => {
            event.preventDefault();
            const { email } = event.target.elements;
            try {
                await firebase
                    .auth()
                    .sendPasswordResetEmail(email.value);
                setIsLoading(false);
                setsuccState((message) => message.concat("We have just sent you an email to change your password!"));
                // history.push("/");
            } catch (serverError) {
                setIsLoading(false);
                seterrorState((error) => error.concat(serverError));
            }
        },
        // [history]
    );


    return <Grid verticalAlign="top" textAlign="center" className="grid-form" >
        <Grid.Column style={{ maxWidth: '500px' }}>
            <img src="Screen-Shot-2019-01-17-at-2.29.34-PM.png" alt="logo"style={{ marginTop: "50px", width: "40%" }}></img>
            <p className="p-refreshed_page__heading">Forgot Passowrd</p>
            <p className="p-refreshed_page__sub_heading">What email address are you using on Slack ?</p>
            <Form onSubmit={handleForgotPassword}>
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
                </Segment>
                <Button disabled={isLoading} loading={isLoading} fluid={true} style={{ backgroundColor: "#4a154b", color: "white", fontSize: "120%" }}>Reset My Password</Button>
            </Form>
            {errorState.length > 0 && <Message error>
                <h3>Errors</h3>
                {formaterrors()}
            </Message>
            }

            {succState.length > 0 && <Message success>
                <h3>Success</h3>
                {formatsuccess()}
            </Message>
            }

            <Message>
                Not an User? <Link to="/register" >Register </Link>
            </Message>
            <Message>
                Already an User?  <Link to="/login">Login </Link>
            </Message>
        </Grid.Column>
    </Grid>
}

export default ForgotPassword;