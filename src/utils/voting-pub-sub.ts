type Message = { pollOptionId: string; votes: number };
type Subscriber = (data: any) => void;

class VotingPubSub {
  private chanel: Record<string, Subscriber[]> = {};

  subscribe(pollId: string, subscriber: Subscriber) {
    if (!this.chanel[pollId]) {
      this.chanel[pollId] = [];
    }

    console.log("Subscribing to ", pollId);
    this.chanel[pollId].push(subscriber);
  }

  publish(pollId: string, message: Message) {
    if (!this.chanel[pollId]) {
      return;
    }

    console.log("Publishing message to ", pollId, " subscribers", message);
    this.chanel[pollId].forEach((subscriber) => subscriber(message));
  }
}

export const voting = new VotingPubSub();
