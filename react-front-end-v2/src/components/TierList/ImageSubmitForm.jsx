import * as React from 'react';
import '../styles/TierList.scss';
import Dropzone from 'react-dropzone';
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
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
    }
  };

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
      <DisabledByDefaultIcon onClick={props.onClick}/>
    </div>
  );
}