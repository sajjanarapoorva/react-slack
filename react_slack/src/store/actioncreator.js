import { SET_USER, SET_CHANNEL ,SET_FAVOURITECHANNEL,REMOVE_FAVOURITECHANNEL,MESSAGE,MESSAGE_FILE} from './actiontypes';

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: {
            currentUser: user
        }
    }
}

export const setChannel = (channel) => {
    return {
        type: SET_CHANNEL,
        payload: {
            currentChannel: channel
        }
    }
}

export const setfavouriteChannel = (channel) => {
    return {
        type: SET_FAVOURITECHANNEL,
        payload: {
            favouriteChannel: channel
        }
    }
}

export const removefavouriteChannel = (channel) => {
    return {
        type: REMOVE_FAVOURITECHANNEL,
        payload: {
            favouriteChannel: channel
        }
    }
}

export const SetMessage = (message) => {
    return {
        type: MESSAGE,
        payload: {
            message: message
        }
    }
}

export const SetMessageFile = (messagefile) => {
    return {
        type: MESSAGE_FILE,
        payload: {
            messagefile: messagefile
        }
    }
}


