export interface Message {
  id?: string;
  username: string;
  message: string;
  timestamp: Date;
  room?: string;
  }