export class CreateCustomerDto {
        name:string;
        email:string;
        phoneNumber:string;
        address:string;
        dmlStatus:number;
        insertionTimeStamp:string;
        lastUpdateTimeStamp:string;
        closeTimeStamp:string
}


export class FindAllCustomerDto {
        name:string;
        email:string;
        phoneNumber:string;
        address:string
        pagination:{
         pageNo:number,
         itemsPerPage:number
        }
}

export class PaginationDto {
         pageNo:number;
         itemsPerPage:number
}