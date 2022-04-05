import { Timestamp } from "rxjs/internal/operators/timestamp";

export class Post {
    id?: string;
    title!: string;
    author!: string;
    authorId!: string;
    content!: string;
    //image!: string;
    //published!: Timestamp<any>;
    published!: Date;
}
