import { CookieStorage } from 'cookie-storage';
import { decompressFromEncodedURIComponent } from 'lz-string';

const cookieStorage = new CookieStorage();

class Contants {
  static DEV = 'http://developer.jagoanpremi.com';

  static API = 'https://cors-anywhere.herokuapp.com/https://ancient-oasis-78813.herokuapp.com';

  static WEB = 'http://localhost:3000';

  static TOKEN = decompressFromEncodedURIComponent(
    cookieStorage.getItem('jpToken')
  );

  static EMAIL = decompressFromEncodedURIComponent(
    cookieStorage.getItem('jpEmail')
  );
}

export { Contants as default };
