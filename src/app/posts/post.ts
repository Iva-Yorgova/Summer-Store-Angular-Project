
export class Post {
    id?: string;
    title!: string;
    author!: string;
    authorId!: string;
    content!: string;
    likes!: number;
    category!: string;
    published!: Date;
    comments?: number;
    usersLikes!: string[]
}
