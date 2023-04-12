import React, { useState } from 'react';
import { dimColor } from '../modules/colors.js';
import { formatNumber } from "../modules/formatNumber.js";
import { Link } from "react-router-dom";

/**
 * A card displaying information about a product.
 * @param {Object} props - The props object.
 * @param {string} props.className - The class name for the component.
 * @param {string} props.product.id - The ID of the product.
 * @param {string} props.product.icon - The URL of the icon for the product.
 * @param {string} props.product.name - The name of the product.
 * @param {string} props.product.strategy - The strategy for the component.
 * @param {string[]} props.product.badges - An array of strings representing badges for the product.
 * @param {Object[]} props.product.info - An array of objects representing additional information about the product.
 * @param {string} props.product.info[].text - The text for the additional information.
 * @param {number} props.product.info[].value - The value for the additional information.
 * @param {string} props.product.info[].color - The color for the additional information.
 * @param {string} props.product.colorRGB - The RGB color for the component. (E.g. #FFFF00)
 * @param {Object} props.product.priceProgress - An object representing the price progress for the product.
 * @param {number} props.product.priceProgress.from - The starting price progress for the product.
 * @param {number} props.product.priceProgress.to - The ending price progress for the product.
 * @param {number} props.product.projectedAPY - The projected APY for the product, yield.
 * @param {number} props.product.currentDeposits - The current deposits for the product.
 * @param {number} props.product.maxCapacity - The maximum capacity for the product.
 * @returns {JSX.Element} - The JSX element for the component.
 */
const ProductCard = ({
  className,
  product
}) => {
  const distanceEffect = 60;
  const [mouse, setMouse] = useState({ x: null, y: null });


  const { id,
    icon, name, badges = [],
    info = [],
    colorRGB = "#ff007a",
    priceProgress = { from: 0.5, to: 0.5 },
    projectedAPY,
    currentDeposits, maxCapacity } = product;

  const handleMouseMove = (event) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    const px = Math.min(Math.max((x - distanceEffect) / (width - distanceEffect * 2), 0), 1);
    const py = Math.min(Math.max((y - distanceEffect) / (height - distanceEffect * 2), 0), 1);
    const distanceFromWalls = Math.floor(Math.min(x, y, width - x, height - y));
    const insideEffect = Math.min(mouse?.distanceFromWalls / distanceEffect ?? 0, 1);
    setMouse({ x, y, px, py, distanceFromWalls, width, height, insideEffect });
  };


  const handleMouseLeave = () => {
    setMouse({ x: null, y: null });
  }

  const colorRGBdim1 = dimColor(colorRGB, 0.3);
  const colorRGBdim2 = dimColor(colorRGB, 0.5);
  const colorRGBdim3 = dimColor(colorRGB, 0.7);

  return (
    <div className={`cols`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{
        // transform: mouse.x===null?"":`perspective(800px) rotateY(${(mouse.insideEffect*(4-mouse.x/mouse.width*8))}deg) rotateX(${(mouse.insideEffect*(mouse.y/mouse.height*8-4))}deg)`
      }}>
      <Link to={`/p/${id ?? "null"}`} className="text-white">
        <div className={`card fancy-card ${className ?? ""} h-100 overflow-hidden`}
          style={{
            borderWidth: "3px",
            borderColor: "transparent",
            background: (mouse.x === null ?
              `radial-gradient(circle, transparent, transparent) padding-box, radial-gradient(circle, #101010, #101010) border-box` :
              `radial-gradient(circle, transparent, transparent) padding-box, radial-gradient(circle at ${mouse.x}px ${mouse.y}px, ${colorRGB}${(Math.floor(mouse.insideEffect * 255)).toString(16).padStart(2, '0')}, ${colorRGB}${(Math.floor(mouse.insideEffect * 64)).toString(16).padStart(2, '0')}) border-box`
            ),
          }}>
          <div className="position-relative bg-dark">
            <div className="ratio" style={{
              "--bs-aspect-ratio": "40%",
              background: (mouse.x === null ?
                `linear-gradient(45deg, ${colorRGBdim2}, ${colorRGBdim3})` :
                `linear-gradient(${45 - mouse.px * 30 * mouse.insideEffect}deg, ${colorRGBdim2}, ${colorRGBdim3})`
              )
            }}>
              <div className="m-2">
                {badges.map((badge, index) => (
                  <span
                    key={index}
                    className="badge rounded m-1"
                    style={{ /*border: `1px solid ${colorRGB}`,*/ backgroundColor: colorRGBdim1 }}
                  >
                    {badge?.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
            {/* Banner 2:1 */}
            <img src={icon} className="rounded-circle border border-dark border-5 position-absolute translate-middle" alt="" style={{ width: "56px", height: "56px", left: "40px", zIndex: "1", backgroundColor: colorRGB }} />
          </div>
          <div className="card-body bg-dark bg-grid">
            <h5 className="card-title h1 mt-3">{name}</h5>
            <div className="card-text">Total projected APY:</div>
            <div className="fs-3">{projectedAPY}%</div>
            <div className="progress bg-dark mt-3 mb-1" style={{ height: "12px" }}>
              <div className="progress-bar" role="progressbar" style={{ width: `calc(${priceProgress.from * 100}% - 2px)`, marginTop: "4px", height: "4px" }} aria-valuenow={priceProgress.from} aria-valuemin="0" aria-valuemax="1"></div>
              <div className="progress-bar" role="progressbar" style={{ background: colorRGB, borderLeft: "2px solid white", marginTop: "3px", zIndex: 1, width: `${(priceProgress.to - priceProgress.from) * 100}%`, height: "6px" }} aria-valuenow={priceProgress.to - priceProgress.from} aria-valuemin="0" aria-valuemax="1"></div>
              <div className="progress-bar" role="progressbar" style={{ background: "#FFFFFF", width: `2px` }} aria-valuenow={priceProgress.to - priceProgress.from} aria-valuemin="0" aria-valuemax="1"></div>
              <div className="progress-bar" role="progressbar" style={{ width: `calc(${(1 - priceProgress.to) * 100}% - 2px)`, marginTop: "4px", height: "4px" }} aria-valuenow={1 - priceProgress.to} aria-valuemin="0" aria-valuemax="1"></div>
            </div>
            <div className="row row-auto mb-3">
              {info.map((item, index) => (
                <div key={index} className="col">
                  <div className="fs-6">{item.text}</div>
                  <div style={{ color: item.color }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div className="card-text">Deposits:</div>
            <p className="card-text">{formatNumber(currentDeposits)} / {formatNumber(maxCapacity)} ({(currentDeposits / maxCapacity * 100).toFixed(2)}%)</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
