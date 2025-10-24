import { RxStompService } from '@stomp/ng2-stompjs';
import { RxStompConfig } from '@stomp/rx-stomp';

export function rxStompServiceFactory(config: RxStompConfig): RxStompService {
  const service = new RxStompService();
  service.configure(config);
  service.activate();
  return service;
}