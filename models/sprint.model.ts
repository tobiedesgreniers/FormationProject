export interface Sprint {
    name: String;
    duration: Number;
    status: String;
    progress: Number;
    description: String;
    notify: Boolean;
    user: String;
    createdAt: Date;
    startedAt: Date;
    finishedAt: Date;
}