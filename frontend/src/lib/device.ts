const size: any = {
  mobile: 425,
  tablet: 768,
  laptop: 1440
};

const device = Object.keys(size).reduce((acc: any, cur: any) => {
  acc[cur] = `(min-width: ${size[cur]}px)`;
  return acc;
}, {});

export default device;
