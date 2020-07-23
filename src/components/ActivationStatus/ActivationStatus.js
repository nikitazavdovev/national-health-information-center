import React, {useState} from "react";

import './ActivationStatus.css';
import Popover from "react-tiny-popover";

const ActivationStatus = ({value}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  let message, contentData;

  switch (value) {
    case 1:
      message = 'Active';
      contentData = {
        color: 'success',
        icon: 'checkmark'
      };
      break;
    case 2:
      message = 'Status is waiting for approval';
      contentData = {
        color: 'warning',
        icon: 'exclamation'
      };
      break;
    default:
      message = 'Inactive';
      contentData = {
        color: 'danger',
        icon: 'close'
      };
      break;
  }

  return (
    <div className='status'>
      <Popover
        isOpen={isPopoverOpen}
        onClickOutside={() => setIsPopoverOpen(false)}
        position={'right'}
        content={() => {
          return <div className='status__popover'>{message}</div>
        }}
      >
        <span
          className={`color--${contentData.color} icon icon-${contentData.icon}-outline`}
          onMouseEnter={() => setIsPopoverOpen(true)}
          onMouseLeave={() => setIsPopoverOpen(false)}
        />
      </Popover>
    </div>
  )
};

export default ActivationStatus;