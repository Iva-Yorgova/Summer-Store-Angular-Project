export class Comment {
    id?: string;
    postId!: any;
    text!: string;
    author!: string;
    authorId!: string;
    likes!: number;
    published!: Date;
}