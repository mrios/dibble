import React from 'react';

interface HeaderContentProps {
  title: string;
  extraClass?: string;
  background?: {
    type: string;
    color?: string;
    url?: string;
  };
}

const HeaderContent: React.FC<HeaderContentProps> = (props) => {
  const classes = `header-content ${props.extraClass}`;
  const style =
    props.background && props.background.type === 'pattern'
      ? {
          backgroundColor: props.background.color
            ? props.background.color
            : undefined,
          backgroundImage: props.background.url
            ? `url("${props.background.url}")`
            : undefined,
        }
      : props.background && props.background.type === 'image'
      ? {
          backgroundImage: props.background.url
            ? `url("${props.background.url}")`
            : undefined,
        }
      : props.background && props.background.type === 'solid'
      ? {
          background: props.background.color
            ? props.background.color
            : undefined,
        }
      : undefined;
  return (
    <div className={classes} style={style}>
      <h1>{props.title}</h1>
      {props.children}
    </div>
  );
};

HeaderContent.propTypes = {};
export default HeaderContent;
