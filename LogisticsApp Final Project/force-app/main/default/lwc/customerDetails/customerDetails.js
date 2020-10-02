import { LightningElement, wire } from 'lwc';
import CUSTOMER from "@salesforce/apex/FoodDeliveryData.Customer";
export default class CustomerDetails extends LightningElement {
    allCustomer;
    errorDetail;
    @wire(CUSTOMER)
    processReccord({data,error}){
        if(data){
            this.allCustomer=data;
        }
        else if(error){
            this.errorDetail=error;
        }
    }

}