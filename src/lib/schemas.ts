export type UserSchema = {
    username: string;
    dateJoined: string;
}

export type PollSchema = {
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

type PollOptionSchema = {
    id: number;
    name: string;
    votes: number;
    percentage: number;
    voters: string[];
}

export type CommentSchema = {
    id: number;
    creator: string;
    poll: { 
        title: string; 
        id: number; 
    };
    content: string;
    timestamp: string;
}