export type UserSchema = {
    username: string;
    createdAt: string;
};

export type PollSchema = {
    id: number;
    title: string;
    creator: string;
    options: PollOptionSchema[];
    tag: string | null;
    totalVotes: number;
    voters: string[];
    numComments: number;
    createdAt: string;
};

type PollOptionSchema = {
    name: string;
    votes: number;
    percentage: number;
    voters: string[];
};

export type CommentSchema = {
    id: number;
    creator: string;
    pollId: number;
    pollTitle: string;
    content: string;
    createdAt: string;
};