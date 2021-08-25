import { FeedbackKey } from "./FeedbackKey";
import { User } from "./User";
import { Venue } from "./Venue";

export interface Feedback{
    description: String;
    user: User;
    venue: Venue;
    rate: number;
    feedbackKey: FeedbackKey;
}