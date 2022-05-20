import * as React from 'react';
import '../styles/TierList.scss';
import Dropzone from 'react-dropzone';
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
const fs = require('fs');

export default function ImageSubmitForm(props) {

  const writeFile = (file) => {
    fs.writeFile(`/home/ralphunrau/lighthouse/product-ranker/express-back-end/visionAI/images/${file.path}`, file, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('file written successfully');
    })
  }

  return (
    <div className='css-i4bv87-MuiSvgIcon-root' >
      <Dropzone onDrop={acceptedFiles => writeFile(acceptedFiles[0])}>
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
      {/* <button onClick={props.onClick}> */}
        <DisabledByDefaultIcon onClick={props.onClick}/>
      {/* </button> */}
    </div>
  );
}