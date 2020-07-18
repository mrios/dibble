import React, { CSSProperties } from 'react';

interface HeaderContentProps {
  title: string;
  extraClass?: string;
  background?: CSSProperties;
}

const HeaderContent: React.FC<HeaderContentProps> = (props) => {
  const classes = `header-content ${props.extraClass}`;
  return (
    <div className={classes} style={props.background}>
      <h1>{props.title}</h1>
      {props.children}
    </div>
  );
};

HeaderContent.propTypes = {};
export default HeaderContent;
