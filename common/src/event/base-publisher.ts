import { Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Events {
  subject: Subjects;
  data: any;
}
export abstract class Publisher<T extends Events> {
  abstract subject: T["subject"];

  private client: Stan;
  constructor(client: Stan) {
    this.client = client;
  }
  async publish(data: T["data"]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        }
        console.log("Event published to subject", this.subject);
        resolve();
      });
    });
  }
}
