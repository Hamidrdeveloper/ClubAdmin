import isWindows from 'is-windows';

const defaultPort = 3000;
const devServerHost = isWindows() ? '127.0.0.1' : '0.0.0.0';

export const devServerConfig = {
  hot: false,
  port: defaultPort,
  host: devServerHost,
  historyApiFallback: true,
};
