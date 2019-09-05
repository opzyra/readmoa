const size: any = {
  mobile: 900,
  laptop: 1400,
  desktop: 1700
};

const device = Object.keys(size).reduce((acc: any, cur: any) => {
  acc[cur] = `(max-width: ${size[cur]}px)`;
  return acc;
}, {});

export default device;
