import Guacamole from 'guacamole-common-js';

// No need this to work, but may use this later to enhance implementation
export interface IHostEntity {
  name: string;
  id?: string;
  protocol: string;
  hostname: string;
  port: number;
  username?: string;
  password: string;
  thumbnail?: string;
  ignoreCert: boolean;
  category?: number;
}

/**
 * Initiate a HTTP tunnel with backend implementation of Apache Guacamole
 * 
 * @param host: IHsotEntity
 * @returns guacd: Guacamole.Client
 */
export function connect(host: IHostEntity) {
  const display = document.getElementById('display');
  const params = { ...host } as unknown as Record<string, string>;

  var guac = new Guacamole.Client(
    // True to enable CORS
    new Guacamole.HTTPTunnel('http://localhost:8080/api/tunnel', true, params)
  );

  // Add client to display div
  display?.childNodes.forEach(node => display?.removeChild(node));
  display!.appendChild(guac.getDisplay().getElement());


  // Connect
  guac.connect();

  // Disconnect on close
  window.onunload = function () {
    guac.disconnect();
  };

  // Keyboard was originally here
  var keyboard = new Guacamole.Keyboard(document)

  keyboard.onkeydown = function (keysym: any) {
    guac.sendKeyEvent(1, keysym);
  };

  keyboard.onkeyup = function (keysym: any) {
    guac.sendKeyEvent(0, keysym);
  };

  // Mouse
  var mouse = new Guacamole.Mouse(guac.getDisplay().getElement());

  mouse.onmousedown = mouse.onmouseup = mouse.onmousemove = (mouseState: any) => {
    guac.sendMouseState(mouseState)
  }

  // TODO: Clipboard
  guac.onclipboard = function (stream: any, mimetype: string) {
    console.log("onclipboard ...",stream, mimetype);
    stream.onblob = function (data: any) {
      const stringdata = atob(data);
      console.log("data blob ...",stringdata);
      navigator.clipboard.writeText(stringdata).catch(() => {
        console.error("clipboard write error ...");
      })
    }
  }

  return guac;
}