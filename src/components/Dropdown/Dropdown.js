// TODO: finish multiselect
import React, {useEffect, useRef, useState} from "react";
import {isObjectEmpty} from '../../utils/helpers';

import './Dropdown.css';

const Dropdown = (
  {
    placeholder = '',
    list = [],
    dropDownClassName,
    wrapClassName,
    titleClassName,
    title,
    required,
    onSelect,
    selected = {},
    name
  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();


  useOnClickOutside(ref, () => setIsOpen(false));

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  };

  const handleOnClick = (item) => {
    if(selected.id !== item.id) {
      onSelect({name, value: item});
      toggleDropdown();
    }
  };

  const isItemSelected = (item) => {
    return selected.id === item.id
  };
  return (
    <div className={wrapClassName}>
      {title &&
        <div className={titleClassName}>
          {title}
          {required && <span>*</span>}
        </div>
      }
      <div className='dd-wrapper' ref={ref}>
        <div
          className={`dd-header ${isOpen ? 'opened' : ''} ${dropDownClassName}`}
          onClick={() => toggleDropdown()}
          onKeyPress={() => toggleDropdown()}
          role='button'
          tabIndex='0'
        >
          {placeholder && isObjectEmpty(selected) &&
          <div className="dd-header__placeholder">{placeholder}</div>
          }
          {!isObjectEmpty(selected) &&
          <div className="dd-header__title">
              <span key={selected.id}>{selected.value}</span>
          </div>
          }
          <div className='dd-header__action'>
            <span className='icon-arrow' />
          </div>
        </div>
        {isOpen && (
          <ul className='dd-list'>
            {list.map(item => (
              <li
                className={`dd-list-item ${isItemSelected(item) ? 'selected' : ''}`}
                key={item.id || item.value}
                onClick={() => handleOnClick(item)}
              >
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
};

export default Dropdown;


//Hook for handling outside click for dropdown
function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}