const config: ApiConfig[] = [
  {
    name: 'detail',
    path: process.env.BFF_HOST + '/shipping/detail',
    type: 'post'
  }
];

export default config;
