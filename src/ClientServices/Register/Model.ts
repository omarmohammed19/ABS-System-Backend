export interface GuestModel {
    //cust_Info
    firstName: string,
    lastName: string,

    //cust_MainAccounts
    mainAccountName: string,
    MainAccountNumber: string,
    salesmanID: number,
    cmpInfoID: number,
    clientTypeID: number,
    creationDate: Date,

    //cust_SubAccounts
    mainAccountID: number,
    subAccountName: string,
    subAccountNumber: string,
    pricePlanID: number,
    paymentMethodID: number,
    productTypeID: number,
    customerServiceID: number,
    prefix: string,

    //cust_ContactPersons
    subAccountID: number,

    //cust_Emails
    custInfoID: number,
    email: string,
    emailTypeID: number,
    
    //cust_ContactNumbers
    contactNumber: string,
    contactTypeID: number,
    numberTypeID: number,
    contactPersonID: number,

    //sys_Users
    username: string,
    password: string,
    displayName: string,
    roleID: number,
    avatar: string
}