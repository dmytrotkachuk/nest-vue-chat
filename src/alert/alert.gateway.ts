import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/alert' })
export class AlertGateway implements OnGatewayConnection {
  @WebSocketServer() wss: Server;

  handleConnection(client: Socket, ...args: any[]): void {
    client.emit('msgToClient', 'Connected to ALert Gateway');
  }

  sendToAll(msg: string): void {
    this.wss.emit('alertToClient', { type: 'Alert', message: msg });
  }
}
