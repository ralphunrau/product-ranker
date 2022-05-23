import * as React from 'react';
import '../styles/TierList.scss';
import Dropzone from 'react-dropzone';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

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
    <div className='image-submission' >
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
      <DisabledByDefaultIcon onClick={props.onClick}/>
    </div>
  );
}