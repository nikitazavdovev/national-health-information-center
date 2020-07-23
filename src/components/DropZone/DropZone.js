import React, {useCallback} from "react";
import {useDropzone} from 'react-dropzone';
import XLSX from 'xlsx';

import './DropZone.css';
import dropZoneImg from '../../assets/images/dropZone.svg';

const DropZone = ({onFileDrop, onDataParse, name, wrapClassName}) => {
  const onDrop = useCallback(acceptedFiles => {
    onFileDrop(acceptedFiles);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = (e) => {
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws);
        /* Update state */
        onDataParse(data);
      };
      if (rABS) {
        reader.readAsBinaryString(file);
      } else {
        reader.readAsArrayBuffer(file);
      }

    })
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: '.xsl,.xlsx'});

  return (
    <div className={wrapClassName}>
      <div {...getRootProps()} className={`drop-zone ${isDragActive ? 'drag-active' : ''}`}>
        <input {...getInputProps()}/>
          <img src={dropZoneImg} alt=""/>
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag and drop file here</p>
          }
      </div>
    </div>
  )
};

export default DropZone;