import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductByID } from "../modules/crypto";
import NoPage from "./NoPage";
import { dimColor } from '../modules/colors.js';
import { formatNumber } from "../modules/formatNumber.js";
import WalletDepositWithdraw from "../components/WalletDepositWithdraw";
import Markdown from "../components/Markdown";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mouse, setMouse] = useState({ x: null, y: null });

  useEffect(() => {
    async function fetchProduct() {
      const product = await getProductByID(id);
      setProduct(product);
    }
    fetchProduct();
  }, [id]);

  if (!product) {
    return (<NoPage />);
  }

  const distanceEffect = 250;
  const tokenEffectStrong = 10;

  const handleMouseMove = (event) => {
    let { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    let x = event.clientX - left;
    let y = event.clientY - top;
    height = Math.min(900, height);
    y = Math.min(900, y);
    let px = Math.min(Math.max((x - distanceEffect) / (width - distanceEffect * 2), 0), 1);
    let py = Math.min(Math.max((y - distanceEffect) / (height - distanceEffect * 2), 0), 1);
    let distanceFromWalls = Math.floor(Math.min(x, y, width - x, height - y));
    let insideEffect = Math.min(mouse?.distanceFromWalls / distanceEffect ?? 0, 1);
    setMouse({ x, y, px, py, distanceFromWalls, width, height, insideEffect });
  };


  const handleMouseLeave = () => {
    setMouse({ x: null, y: null });
  }

  const colorRGBdim1 = dimColor(product.colorRGB, 0.3);
  const colorRGBdim2 = dimColor(product.colorRGB, 0.5);
  const colorRGBdim3 = dimColor(product.colorRGB, 0.7);

  return (
    <div className="w-100"
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="w-100 overflow-hidden"
        style={{
          "--bs-aspect-ratio": "40%",
          background: (mouse.x === null ?
            `linear-gradient(0deg, ${colorRGBdim2}, ${colorRGBdim3})` :
            `linear-gradient(${(10/2 - mouse.px * 10) * mouse.insideEffect}deg, ${colorRGBdim2}, ${colorRGBdim3})`
          ),
        }}>
        <div className="container">
          <div className="row">
            <div className="col col-12 col-lg-6 py-4">

              <div className="my-2 mx-4">
                {product.badges.map((badge, index) => (
                  <span
                    key={index}
                    className="badge rounded m-1 p-3"
                    style={{ /*border: `1px solid ${colorRGB}`,*/ backgroundColor: colorRGBdim1 }}
                  >
                    {badge?.toUpperCase()}
                  </span>
                ))}
              </div>
              <div className="justify-content-between d-flex d-lg-none mx-4">
                <div className="text-white h1 mt-3">{product.name}</div>
                <img src={product.icon} className="rounded-circle" alt="" style={{ width: "56px", height: "56px", backgroundColor: product.colorRGB }} />
                <div className="text-white h1 mt-3" style={{ opacity: 0 }}>{product.name}</div>
              </div>
              <div className="d-none d-lg-flex align-items-center mx-4">
                <img src={product.icon} className="rounded-circle me-3" alt="" style={{ width: "56px", height: "56px", backgroundColor: product.colorRGB }} />
                <div className="text-white h1 mt-3">{product.name}</div>
              </div>
              <div className="d-flex justify-content-between mx-4">
                <div className="text-white mt-3">Current Vault Deposits:</div>
                <div className="text-white h5 mt-3">{formatNumber(product.currentDeposits)}</div>
              </div>
              <div className="progress rounded bg-black mt-1 mx-4">
                <div className="progress-bar rounded" role="progressbar" style={{ width: (product.currentDeposits / product.maxCapacity * 100) + "%", background: product.colorRGB }} aria-valuenow={product.currentDeposits / product.maxCapacity} aria-valuemin="0" aria-valuemax="1"></div>
              </div>
              <div className="d-flex justify-content-between mx-4">
                <div className="text-white mt-3">Max Vault Capacity:</div>
                <div className="text-white h5 mt-3">{formatNumber(product.maxCapacity)}</div>
              </div>
            </div>
            <div className="col col-12 col-lg-6 d-none d-lg-block">
              <div className="text-center d-block overflow-hidden" style={{ height: "100%" }}>
                <div className="rounded-circle" style={{
                  transform: mouse.x === null ? "" : `perspective(300px) rotateY(${(mouse.insideEffect * (tokenEffectStrong - mouse.x / mouse.width * tokenEffectStrong * 2))}deg) rotateX(${(mouse.insideEffect * (mouse.y / mouse.height * tokenEffectStrong * 2 - tokenEffectStrong))}deg)`,
                  background: `url(${product.icon}) no-repeat center center/contain`,
                  height: "100%",
                  filter: `brightness(0.8) drop-shadow(0px 0px 20px ${product.colorRGB})`,
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row g-4 my-4">
          <div className="col col-12 col-lg-6 order-2 order-lg-1">
            <Markdown className="markdown headers-white" children={product.description} />
          </div>
          <div className="col col-12 col-lg-6 order-1 order-lg-2">
            <WalletDepositWithdraw product={product} />
          </div>
        </div>
      </div>
    </div>
  );

}

export default Product;
