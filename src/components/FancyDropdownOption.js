import React from 'react';
import "./FancyDropdown.css";

/**
 * A component representing an option in a fancy dropdown menu.
 * @param {Object} options - The options for the dropdown menu.
 * @param {string} options.name - The name of the option.
 * @param {string} options.key - The key of the option.
 * @param {boolean} options.disabled - Whether the option is disabled.
 * @param {string} options.icon - The href of the icon.
 * @param {string} options.icon_bs - The bootstrap icon class.
 * @param {boolean} selected - Whether the option is selected.
 * @param {function} handleSelect - The function to handle selecting the option.
 * @returns {JSX.Element} - The rendered component.
 */
const FancyDropdownOption = ({ options, selected, handleSelect = () => { } }) => {
  if (typeof options === "string") {
    options = { name: options, key: options, disabled: false, icon: undefined };
  }
  return (
    <div className="d-flex w-100" key={options.key}>
      <button className={`d-block w-100 my-1 mx-2 px-3 btn ${selected ? "btn-outline-success" : "border border-2 border-dark btn-dark"}`} disabled={options.disabled} onClick={() => handleSelect(options)}>
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="me-auto">
            {options.icon && <img src={options.icon} className="rounded-circle me-2" alt="" style={{ width: "32px", height: "32px" }} />}
            {options.icon_bs && <i className={`me-1 bi bi-`+options.icon_bs}/>}
            {options.name}</div>
          <div>{selected && (
            <i className="bi bi-check"></i>
          )}</div>
        </div>

      </button>
    </div>
  )
}

export default FancyDropdownOption;
