import React, { useState } from 'react';
import { Grid, Form, Segment, Header, Icon, Button, Message, Checkbox } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import './style.css'
import firebase from '../base/firebase';

const Register = () => {
    let user = {
        userName: '',
        email: '',
        password: '',
        confirmpassword: ''
    }

    let errors = [];

    let userCollectionRef = firebase.database().ref('users');

    const [userState, setuserState] = useState(user);
    const [errorState, seterrorState] = useState(errors);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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
        else if (!checkPassword()) {
            return false;
        }
        return true;
    }

    const isFormEmpty = () => {
        return !userState.userName.length ||
            !userState.password.length ||
            !userState.confirmpassword.length ||
            !userState.email.length;
    }

    const checkPassword = () => {
        if (userState.password.length < 8) {
            seterrorState((error) => error.concat({ message: "Password length should be greater than 8" }));
            return false;
        }
        else if (userState.password !== userState.confirmpassword) {
            seterrorState((error) => error.concat({ message: "Password and Confirm Password does not match" }));
            return false;
        }
        return true;
    }

    const onSubmit = (event) => {
        seterrorState(() => []);
        setIsSuccess(false);
        if (checkForm()) {
            setIsLoading(true);
            firebase.auth()
                .createUserWithEmailAndPassword(userState.email, userState.password)
                .then(createdUser => {
                    setIsLoading(false);
                    updateuserDetails(createdUser);
                    console.log(createdUser);
                })

                .catch(serverError => {
                    setIsLoading(false);
                    seterrorState((error) => error.concat(serverError));
                    console.log(serverError);
                })
        }
    }

    const updateuserDetails = (createdUser) => {
        if (createdUser) {
            setIsLoading(true);
            createdUser.user
                .updateProfile({
                    displayName: userState.userName,
                    photoURL: `http://gravatar.com/avatar/${createdUser.user.uid}?d=identicon`
                })
                .then(() => {
                    setIsLoading(false);
                    saveUserInDB(createdUser);
                })
                .catch((serverError) => {
                    setIsLoading(false);
                    seterrorState((error) => error.concat(serverError));
                })
        }
    }

    const saveUserInDB = (createdUser) => {
        setIsLoading(true);
        userCollectionRef.child(createdUser.user.uid).set({
            displayName: createdUser.user.displayName,
            photoURL: createdUser.user.photoURL
        })
            .then(() => {
                setIsLoading(false);
                setIsSuccess(true);
            })
            .catch(serverError => {
                setIsLoading(false);
                seterrorState((error) => error.concat(serverError));
            })
    }

    const formaterrors = () => {
        return errorState.map((error, index) => <p key={index}>{error.message}</p>)
    }

    return (<Grid verticalAlign="top" textAlign="center" className="grid-form" >
        <Grid.Column style={{ maxWidth: '500px' }}>
            <img src="Screen-Shot-2019-01-17-at-2.29.34-PM.png" style={{ marginTop: "50px", width: "40%" }}></img>
            <p className="p-refreshed_page__heading">Create Account</p>
            <p className="p-refreshed_page__sub_heading">We suggest using the email address you use at work.</p>
            <Form onSubmit={onSubmit}>
                <Segment stacked>
                    <Form.Input
                        name="userName"
                        value={userState.userName}
                        icon="user"
                        iconPosition="left"
                        onChange={handleInput}
                        type="text"
                        placeholder="User Name"
                    />
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
                    <Form.Input
                        name="confirmpassword"
                        value={userState.confirmpassword}
                        icon="lock"
                        iconPosition="left"
                        onChange={handleInput}
                        type="password"
                        placeholder="Confirm Password"
                    />
                </Segment>
                {/* <Button disabled={isLoading} loading={isLoading} >Sign In with Email</Button> */}
                <Button disabled={isLoading} loading={isLoading} fluid={true} style={{ backgroundColor: "#4a154b", color: "white", fontSize: "120%" }}>Continue</Button>
            </Form>
            {errorState.length > 0 && <Message error>
                <h3>Errors</h3>
                {formaterrors()}
            </Message>
            }
            {isSuccess && <Message success>
                <h3>Successfully Registered</h3>
            </Message>
            }
            <Message>
                Already an User? <Link to="/login" >Login </Link>
            </Message>
        </Grid.Column>
    </Grid>)
}

export default Register

