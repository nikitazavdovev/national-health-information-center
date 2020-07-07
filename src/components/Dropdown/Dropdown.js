// TODO: finish multiselect
import React, {useEffect, useRef, useState} from "react";

import './Dropdown.css';

const Dropdown = (
  {
    placeholder = '',
    list = [],
    multiSelect = false,
    dropDownClassName,
    wrapClassName,
    titleClassName,
    title,
    required,
    name,
    onSelect
  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const ref = useRef();

  useOnClickOutside(ref, () => setIsOpen(false));

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  };

  const handleOnClick = (item) => {
    if(!selection.some(current => current.id === item.id)) {
      if(!multiSelect) {
        onSelect(name, item.value);
        setSelection([item]);
        toggleDropdown();
      } else {
        setSelection([...selection, item])
      }
    }
//If you want to unsellect items in list
    // else {
    //   setSelection(selection.filter(selectedItem => selectedItem.id !== item.id))
    // }
  };

  const isItemSelected = (item) => {
    return selection.find(current => current.id === item.id)
  };

  return (
    <div className={wrapClassName}>
      <div className={titleClassName}>
        {title}
        {required && <span>*</span>}
      </div>
      <div className='dd-wrapper' ref={ref}>
        <div
          className={`dd-header ${isOpen ? 'opened' : ''} ${dropDownClassName}`}
          onClick={() => toggleDropdown()}
          onKeyPress={() => toggleDropdown()}
          role='button'
          tabIndex='0'
        >
          {placeholder && !selection.length > 0 &&
          <div className="dd-header__placeholder">{placeholder}</div>
          }
          {selection.length > 0 &&
          <div className="dd-header__title">
            {selection.map(item => (
              <span key={item.id}>{item.value}</span>
            ))}
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
                key={item.id}
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