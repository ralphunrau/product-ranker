import * as React from 'react';
import '../styles/TierList.scss';
import Dropzone from 'react-dropzone';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import ClickAwayListener from '@mui/material/ClickAwayListener';


export default function ImageSubmitForm(props) {

  const handleFileChange = async (file) => {
    let formData = new FormData();
    formData.append('file', file);
    const response = await fetch('http://localhost:8081/vision/upload', {
      method: 'POST',
      body: formData
    })
    if (response) {
      const visionAIResponse = await response.json();
      props.getProductsByImageLabel(visionAIResponse.object);
      props.setSearch(visionAIResponse.object);
    }
  };

  return (
  <ClickAwayListener onClickAway={props.handleClickAway}>
    <div className='image-submit-form' >
      <Dropzone onDrop={acceptedFiles => handleFileChange(acceptedFiles[0])}>
        {({getRootProps, getInputProps}) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drop or click to submit image</p>
          </div>
        </section>
        )}
      </Dropzone>
    </div>
  </ClickAwayListener>
  );
}