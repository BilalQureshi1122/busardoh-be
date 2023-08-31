export class CreatePurchaseOrderDto {

    issueDate:string;
    invoiceDescription:string;
    billingAddress:string;
    vat:number;
    discount:number;
    item:string;
    itemDescription:string;
    quantity: number;
    unitPrice:number;
    total:number;
    supplierId:any;
    projectId:any;
    dmlStatus:number;
    insertionTimeStamp:string;
    lastUpdateTimeStamp:string;
    closeTimeStamp:string

}
