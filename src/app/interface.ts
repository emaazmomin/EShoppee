
export interface signup{
    name: string,
    email:string,
    password:string
}
export interface login{
    email:string,
    password:string
}
export interface uniqueEmail{
    name:string | undefined,
    email:string,
    password:string | undefined
} 
export interface product{
    pname: string,
    category:string,
    color:undefined|string,
    size:undefined | string,
    price:number,
    desc:string,
    url:string,
    pid:number,
    tname:string|undefined,
    quantity : undefined | number
}
export interface cart{
    pname: string,
    category:string,
    color:undefined|string,
    size:undefined | string,
    price:number,
    desc:string,
    url:string,
    pid:number,
    tname:string|undefined,
    quantity : undefined | string
}
export interface category{
    category_name:string
}

