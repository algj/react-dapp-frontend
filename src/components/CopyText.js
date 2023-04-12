import React, { useState } from 'react';

const CopyText = ({ children, value }) => {
  const [confirmation, setConfirmation] = useState(false);

  const handleCopy = () => {
    let textToCopy = value;
    if (!value) {
      if (Array.isArray(children)) {
        textToCopy = children.join('');
      } else if (typeof children === 'string') {
        textToCopy = children;
      } else if (React.isValidElement(children) && children.type === 'input') {
        textToCopy = children.props.value;
      } else {
        console.error('Invalid children element');
        return;
      }
    }

    navigator.clipboard.writeText(textToCopy);
    setConfirmation(true);
    setTimeout(() => setConfirmation(false), 2000);
  };

  return (
    <>
      {children}
      <button className={`btn py-1 px-2 ms-2 btn-${confirmation?"success":"dark"}`} onClick={handleCopy}><i className={`bi bi-${confirmation?'clipboard-check':'files'}`} /></button>
    </>
  );
};

export default CopyText;
