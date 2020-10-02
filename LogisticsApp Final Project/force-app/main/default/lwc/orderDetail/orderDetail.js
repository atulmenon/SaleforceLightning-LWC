import { LightningElement ,wire} from 'lwc';
import RIDER from "@salesforce/apex/FoodDeliveryData.Rider";
export default class OrderDetail extends LightningElement {
    orderDetail;
    errorDetail;
    @wire(RIDER)
    orderProcess({data,error}){
        if(data){
            this.orderDetail=data;
        }
        else if(error){
            this.errorDetail=error;
        }

    }
}