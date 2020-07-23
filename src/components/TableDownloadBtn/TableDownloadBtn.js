import React, {useState} from "react";
import Popover from 'react-tiny-popover'

import './TableDownloadBtn.css';

const PopoverContent = ({versions}) => {
  const [currentVesions, setCurrentVersions] = useState(versions);

  return (
    <div className='popover'>
      <a href="#">Download current</a>
      <a href="#">Download latest active</a>
      <h3>Choose version to download</h3>
      {currentVesions.map((version) => (
        <a href="#" key={version.id}>{version.value}</a>
      ))}
    </div>
  )
};

const TableDownloadBtn = ({terminology, versionsList}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Popover
      isOpen={isPopoverOpen}
      onClickOutside={() => setIsPopoverOpen(false)}
      position={'bottom'}
      content={<PopoverContent versions={versionsList}/>}
    >
      <button className='actions__btn' onClick={() => setIsPopoverOpen(!isPopoverOpen)}>Download</button>
    </Popover>
  )
};

export default TableDownloadBtn;