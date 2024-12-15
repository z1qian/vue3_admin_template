export interface MenuItem {
    id: number;
    createTime: string;
    updateTime: string;
    pid: number;
    name: string;
    code: string | null;
    toCode: string | null;
    type: number;
    status: string | null;
    level: number;
    children: MenuItem[];
    select?: boolean;
}

// 用于定义整个树形菜单数据结构
export type MenuData = MenuItem[];

export class MenuFormData {
    id: number
    code: string | null;
    level: number;
    name: string;
    pid: number;

    constructor(
        id: number = 0,
        code: string | null = '',
        level: number = 0,
        name: string = '',
        pid: number = 0
    ) {
        this.code = code;
        this.level = level;
        this.name = name;
        this.pid = pid;
        this.id = id;
    }
}