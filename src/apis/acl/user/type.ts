export interface PagedUserResponse {
    records: UserRecord[];
    total: number;
    size: number;
    current: number;
    pages: number;
}

export interface UserRecord {
    id: number;
    createTime?: string;
    updateTime?: string;
    username: string;
    password: string;
    name: string;
    phone?: string | null;
    roleName?: string;
}