type Message = { pollOptionId: string; votes: number };
type Subscriber = (data: any) => void;

class VotingPubSub {
  private channels: Record<string, Subscriber[]> = {};

  subscribe(pollId: string, subscriber: Subscriber) {
    if (!this.channels[pollId]) {
      this.channels[pollId] = [];
    }

    console.log("Subscribing to ", pollId);
    this.channels[pollId].push(subscriber);
  }

  publish(pollId: string, message: Message) {
    if (!this.channels[pollId]) {
      return;
    }

    console.log("Publishing message to ", pollId, " subscribers", message);
    this.channels[pollId].forEach((subscriber) => subscriber(message));
  }
}

export const voting = new VotingPubSub();
