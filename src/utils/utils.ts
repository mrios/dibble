export const getUUIDFromURL = (pathname: string): string => {
  const pattern = `^/([a-zA-Z0-9_-]+)/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})`;
  var matched = new RegExp(pattern, 'g').exec(pathname);
  return matched && matched[2] ? matched[2].toString() : '';
};

type BackgroundProps = {
  type: string;
  color?: string;
  url?: string;
};

export const getBackgroundStylesFromJSON = (props: BackgroundProps) => {
  const style =
    props && props.type === 'pattern'
      ? {
          backgroundColor: props.color ? props.color : undefined,
          backgroundImage: props.url ? `url("${props.url}")` : undefined,
        }
      : props && props.type === 'image'
      ? {
          backgroundImage: props.url ? `url("${props.url}")` : undefined,
        }
      : props && props.type === 'solid'
      ? {
          background: props.color ? props.color : undefined,
        }
      : undefined;
  return {
    ...style,
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };
};

export const asyncFetch = (url: string, callback: Function) => {
  fetch(url)
    .then((response) => response.json())
    .then((json) => callback(json))
    .catch((error) => {
      console.log('fetch data failed', error);
    });
};
