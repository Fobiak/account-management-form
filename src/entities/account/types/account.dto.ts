export interface Account {
    id: string
    tags: Tag[]
    entry_type: string
    login: string
    password: string | null
}

export interface Tag {
    text: string;
}