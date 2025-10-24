import SockJS from 'sockjs-client/dist/sockjs.min.js';
import { RxStompConfig } from '@stomp/rx-stomp';

export const myRxStompConfig: RxStompConfig = {
  webSocketFactory: () => new SockJS('http://localhost:8080/ws'),

  connectHeaders: {
    login: 'guest',
    passcode: 'guest',
  },

  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,

  reconnectDelay: 200,
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  }
};

