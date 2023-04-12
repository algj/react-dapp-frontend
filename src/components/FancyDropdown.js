import React, { useState, useRef, useEffect } from 'react';
import "./FancyDropdown.css";
import FancyDropdownOption from './FancyDropdownOption';
import CLink from './CLink';

/**
 * A fancy dropdown component that allows for single or multiple selection of options.
 * @param {Object} props - The component props.
 * @param {Array<string>} props.defaults - The default selected options.
 * @param {Object[]} props.elements - The options to display in the dropdown.
 * @param {string} props.elements[].name - The name of the option.
 * @param {string} props.elements[].key - The key of the option.
 * @param {boolean} props.elements[].disabled - Whether the option is disabled.
 * @param {string} props.elements[].icon - The image for the option.
 * @param {string} props.elements[].icon_bs - The bootstrap icon for the option.
 * @param {string} props.name - The name of the dropdown.
 * @param {string} props.icon - The bootstrap icon to display next to the dropdown name.
 * @param {boolean} props.deselectButton - Button to remove all selections quickly.
 * @param {boolean} props.multipleChoice - Whether multiple options can be selected.
 * @param {boolean} props.stopPropagation - Whether to stop click events from propagating.
 * @param {boolean} props.nameSelected - Whether to display the name of the dropdown or the selected options.
 * @param {function} props.onSelect - The function to call when an option is selected.
 * @param {function} props.onFinish - The function to call when the dropdown is closed.
 * @param {string} props.className - The class name to apply to the dropdown.
 * @returns {JSX.Element} - The rendered FancyDropdown component.
 */
const FancyDropdown = ({ children, defaults=[], elements, name, icon="", deselectButton, multipleChoice, stopPropagation, nameSelected=false, onSelect = ()=>{}, onFinish = () => { }, className="" }) => {
  const [selectedOptions, setSelectedOptions] = useState(defaults);
  const [hasShown, setHasShown] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  //loop thru all elements[] as options
  for(let i in elements) {
    if (typeof elements[i] === "string") {
      elements[i] = { name: elements[i], key: elements[i], disabled: false };
    }
    elements[i].key ??= elements[i].name;
  }

  const handleSelect = (option) => {
    let updatedOptions = selectedOptions;
    if(!multipleChoice){
      updatedOptions = [option.key];
    }else{
      if (selectedOptions.some(item=>item===option.key)) {
        updatedOptions = updatedOptions.filter((item) => item !== option.key);
      } else {
        updatedOptions = [...selectedOptions, option.key];
      }
    }
    setSelectedOptions(updatedOptions);
    onSelect(updatedOptions);
  };
  const handleDeselectAll = ()=>{
    const els = selectedOptions.length!==0?[]:elements.map(i=>i.key);
    onSelect(els);
    setSelectedOptions(els);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      let show = menuRef.current.classList.contains('show');
      if (!show && hasShown) {
        onFinish(selectedOptions);
      }
      setHasShown(show);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuRef, dropdownRef, onFinish, selectedOptions, hasShown]);

  return (
    <div className={`dropdown fancy-dropdown ${className}`} ref={dropdownRef}>
      <button
        className="btn btn-dark"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {icon && <i className={`bi bi-${icon}`}></i>} {(nameSelected&&elements?.find(i=>i.key===selectedOptions[0])?.name)||name} <span className="flip"><i className="bi bi-chevron-down ms-3"></i></span>
      </button>
      <div className="dropdown-menu bg-dark" ref={menuRef} aria-labelledby="dropdownMenuButton" style={{width:"200px"}} onClick={(e) => stopPropagation && e.stopPropagation()}>
        {deselectButton&&multipleChoice&&<div className="m-2"><CLink className="w-100 btn btn-link py-0" onClick={handleDeselectAll} data={{ icon_bs: "check2-square", name: selectedOptions.length!==0?`Deselect all`:`Select all`}}/></div>}
        {elements.map((options) => {
          let selected = selectedOptions.some(opt=>opt===options.key);
          return (
            <FancyDropdownOption key={options.key} selected={selected} options={options} handleSelect={handleSelect}/>
          )
        })}
        { children ?? "" }
      </div>
    </div>
  );
}

export default FancyDropdown;
