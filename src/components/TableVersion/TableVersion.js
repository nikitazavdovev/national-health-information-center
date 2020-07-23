import React, {useState} from "react";
import Popover from 'react-tiny-popover'

import './TableVersion.css';

const TableVersion = ({version, isLatest}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div className='version'>
      <p className='version__value'>{version}</p>
      <Popover
        isOpen={isPopoverOpen}
        onClickOutside={() => setIsPopoverOpen(false)}
        position={'bottom'}
        content={() => {
          const message = isLatest ? 'This is the latest version of code.' : 'There is a version awaiting approval.';

          return <div className='version__popover'>{message}</div>
        }}
      >
        <span
          className={`version__icon color--${isLatest ? 'success' : 'warning'} icon icon-${isLatest ? 'checkmark' : 'exclamation'}-outline`}
          onMouseEnter={() => setIsPopoverOpen(true)}
          onMouseLeave={() => setIsPopoverOpen(false)}
        />
      </Popover>
    </div>
  )
};

export default TableVersion;