import * as React from 'react';
import '../styles/TierList.scss';
import Dropzone from 'react-dropzone';
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import axios from 'axios';
import {useState} from 'react';

export default function ImageSubmitForm(props) {

  const handleFileChange = async (file) => {
    let formData = new FormData()
    formData.append('file', file)
    const response = await fetch('http://localhost:8081/vision/upload', {
      method: 'POST',
      body: formData
    })
    if (response) {
      const visionAIResponse = await response.json()
      props.searchProducts(visionAIResponse.label)
    }
  }

  return (
    <div className='css-i4bv87-MuiSvgIcon-root' >
      <Dropzone onDrop={acceptedFiles => handleFileChange(acceptedFiles[0])}>
        {({getRootProps, getInputProps}) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            <BackupRoundedIcon />
          </div>
        </section>
        )}
      </Dropzone>
      {/* <input type="file" name="file" onChange={(event) => handleFileChange(event)}/>
      <button type="button" onClick={(event) => handleSubmit(event)}>Upload</button>  */}
      <DisabledByDefaultIcon onClick={props.onClick}/>
    </div>
  );
}