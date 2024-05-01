import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:9000';

export const socket = io(SERVER_URL);