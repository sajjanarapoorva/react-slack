import React, { useState } from 'react'
import {Button, Icon, Input, Modal} from 'semantic-ui-react'
import mime from 'mime-types'

const ImageUpload=(props)=>{

    const [fileState,setfileState]=useState(null)
    const acceptedTypes = ["image/png", "image/jpeg"]

    const onFileAdded=(e)=>{
        const file=e.target.files[0]
        if(file){
            setfileState(file)
        }
    }

    const onSubmit=()=>{

        if (fileState && acceptedTypes.includes(mime.lookup(fileState.name))) {
            props.uploadImage(fileState, mime.lookup(fileState.name));
            props.onClose();
            setfileState(null);
        }

    }
    return(
        <Modal basic open={props.open} onClose={props.onClose}>
        <Modal.Header>Select a Image</Modal.Header>
        <Modal.Content>
            <Input
            fluid
            type="file"
            name="file"
            onChange={onFileAdded}
            label="File Type (png , jpeg)"
            >
            </Input>
            
        </Modal.Content>

        <Modal.Actions>
            <Button color="green" onClick={onSubmit}>
                <Icon name="checkmark"></Icon>ADD
            </Button>
            <Button color="red" onClick={props.onClose}>
                <Icon name="remove"></Icon>Cancel
            </Button>
        </Modal.Actions>
        </Modal>

    )
}

export default ImageUpload