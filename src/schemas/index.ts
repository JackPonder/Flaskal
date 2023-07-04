export interface UserSchema {
    id: number;
    username: string;
    dateJoined: string
}

export interface PollSchema {
    id: number;
    title: string,
    creator: string;
    options: PollOptionSchema[]
    tag: string | null,
    totalVotes: number;
    voters: string[];
    numComments: number;
    timestamp: string;
}

interface PollOptionSchema {
    id: number;
    name: string;
    votes: number;
    percentage: number;
    voters: string[];
}