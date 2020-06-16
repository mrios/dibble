export const getUUIDFromURL = (pathname: string): string => {
  const pattern = `^/([a-zA-Z0-9_-]+)/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})`;
  var matched = new RegExp(pattern, 'g').exec(pathname);
  return matched && matched[2] ? matched[2].toString() : '';
};
