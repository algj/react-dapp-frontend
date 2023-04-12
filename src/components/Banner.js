import React, { useState } from 'react';
import CLink from './CLink';
import './Banner.css';

/**
 * A banner component that displays a message and an optional button, and can be hidden by the user.
 * @param {Object} props - The props object.
 * @param {string|React.ReactNode} props.children - The message to display in the banner.
 * @param {number} [props.expireSecs=604800] - The number of seconds after which the banner should expire and not be shown again. Default is 7 days.
 * @param {string} [props.className] - The class name to apply to the message container.
 * @param {CLinkData} [props.button] - The data object to pass to the CLink component for the optional button.
 * @param {boolean} [props.pulsating=false] - Whether to show a pulsating dot next to the message.
 * @returns {JSX.Element} - The Banner component.
 */
const Banner = ({ children, expireSecs=60*60*24*7, className, button, pulsating=false }) => {
  let bannerID = 'showBanner_'+children.toString().slice(0,48);
  let sessionTime = sessionStorage.getItem(bannerID);
  const [showBanner, setShowBanner] = useState(sessionTime?Math.abs(Date.now()-sessionTime)/1000>+expireSecs:true);

  const hideBanner = () => {
    setShowBanner(false);
    sessionStorage.setItem(bannerID, Date.now());
  }

  return (
    <>
      {showBanner && (
        <div className="p-4 bg-banner-animated">
          <div className="container d-flex justify-content-between align-items-center flex-wrap">
            <div className={"my-3 "+className}>{pulsating && (<div className="banner-pulsating-dot"></div>)} {children}</div>
            <div className="ms-auto">
              {button && (<CLink className="btn btn-outline-light me-3 ms-3" data={button}/>)}
              <button className="btn btn-outline-light" onClick={hideBanner}>X</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
