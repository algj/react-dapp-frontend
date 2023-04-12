import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import CLink from './CLink';

const Markdown = ({children, className=undefined, style={}}) => {
  return (
    <div className={className} style={style}>
      { /* eslint-disable-next-line jsx-a11y/anchor-has-content */ }
      <ReactMarkdown className={className} remarkPlugins={[remarkGfm]} linkTarget="_blank" components={{a: ({node, ...props}) => <CLink noUpper color="info" noBtn data={{to: props.href, name: props.children+""}}/>}}>{children}</ReactMarkdown>
    </div>
  );
}

export default Markdown;
