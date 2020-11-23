import React, { useState } from 'react'
import {Button, Icon, Input, Modal} from 'semantic-ui-react'
import mime from 'mime-types'

const ImageUpload=(props)=>{
    const [fileState,setfileState]=useState(null)
    const acceptedTypes = ["image/png", "image/jpeg","application/msword","application/xml","text/xml","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/pdf","application/zip","text/plain","application/vnd.ms-powerpoint","application/vnd.openxmlformats-officedocument.presentationml.presentation","text/csv"]

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
        <Modal.Header style={{color:"grey"}}>Select File of Type ( png , jpeg, jpg, txt, docx, pdf, ppt, xml, zip )</Modal.Header>
        <Modal.Content>
            <Input
            fluid
            type="file"
            name="file"
            onChange={onFileAdded}
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