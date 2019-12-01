import { CookieStorage } from 'cookie-storage';
import { decompressFromEncodedURIComponent } from 'lz-string';

const cookieStorage = new CookieStorage();

class Contants {
  static DEV = 'http://developer.jagoanpremi.com';

  static API = 'http://167.71.194.236';

  static WEB = 'http://localhost:3000';

  static TOKEN = decompressFromEncodedURIComponent(
    cookieStorage.getItem('jpToken')
  );

  static EMAIL = decompressFromEncodedURIComponent(
    cookieStorage.getItem('jpEmail')
  );
}

export { Contants as default };
