import { Link } from "react-router-dom";
import React from 'react';

/**
 * The data to be used in the link.
 * @typedef {Object} CLinkData
 * @property {string} [name=""] - The name of the link.
 * @property {string} [to] - The destination of the link.
 * @property {string} [className=""] - Additional classes to add to the link.
 * @property {boolean} [external=false] - Specifies if the link is an external link.
 * @property {string} [color=""] - The color of the link.
 * @property {string} [icon=""] - The icon to display alongside the link text.
 */

/**
 * Renders a custom link component.
 * @param {Object} props - The props object.
 * @param {string} [props.name=""] - The name of the link.
 * @param {CLinkData} props.data - The data to be used in the link.
 * @param {string} [props.className=""] - Additional classes to add to the link.
 * @param {boolean} [props.external=false] - Specifies if the link is an external link. Used if props.data.external is not provided.
 * @param {string} [props.color=""] - The color of the link. Used if props.data.color is not provided.
 * @param {boolean} [props.noBtn=false] - Specifies if the link should be styled as a button.
 * @param {boolean} [props.noUpper=false] - Specifies if the link text should be displayed in uppercase.
 * @param {Function} [props.onClick=()=>{}] - The function to be called when the link is clicked.
 * @returns {JSX.Element} - The link component.
 **/
const CLink = ({ name="", data, className="", external=false, color="", noBtn=false, noUpper= false, onClick=()=>{} }) => {
    data = typeof data === 'string' ? { name: name, to: data, className: "" } : data;
    if(!name)name = data.name;
    data.external ??= external;
    data.color ||= color;
    data.name ||= name;
    className ||= data.className ?? "";
    if(!noBtn&&!className.match(/(\bbtn-)|(\bnav-link\b)/g)){
      className='btn btn-link';
    }
    if(data.external&&!data.icon){
      data.icon="box-arrow-up-right";
    }
    if(data.color){
      className += " text-"+data.color+" dim-link";
    }

    return (
      <Link className={`${className}`} to={data.to} onClick={onClick}>
        <i className={`bi bi-${data.icon || name.toLowerCase()}`}></i> {noUpper?data.name:data.name.toUpperCase()}
      </Link>
    )
    ;
};

export default CLink;
