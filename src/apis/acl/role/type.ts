export interface Role {
    id?: number;
    createTime?: string; // 可以使用 Date 类型，但如果需要保持原格式，使用 string 更灵活
    updateTime?: string;
    roleName: string;
}

export interface UserRoleData {
    assignRoles: Role[];
    allRolesList: Role[];
}

//给用户分配职位接口携带参数的ts类型
export interface SetRoleData {
    roleIdList: number[];
    userId: number
}

export class PagedRolesResponse {
    records: Role[]
    total: number
    size: number
    current: number
    pages: number;

    // 构造函数提供默认值
    constructor(
        records: Role[] = [],
        total: number = 0,
        size: number = 0,
        current: number = 0,
        pages: number = 0
    ) {
        this.records = records;
        this.total = total;
        this.size = size;
        this.current = current;
        this.pages = pages;
    }
}