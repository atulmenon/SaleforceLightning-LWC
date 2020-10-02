import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
export default class AccountCreator extends LightningElement {
    objectApiName = CONTACT_OBJECT;
    fields = [FIRSTNAME_FIELD, LASTNAME_FIELD, EMAIL_FIELD];
    handleSuccess(event){
        const toastEvent = new ShowToastEvent({
            title:"Contact Created",
            message:"Record Id: " + event.detail.id,
            variant:"Success"
        });
        this.dispatchEvent(toastEvent);
    }
    handleButtonClick(){
        const field ={};
        field[LASTNAME_FIELD.fielfieldApiName,LASTNAME_FIELD.fieldApiName,
            EMAIL_FIELD.fieldApiName]=["Lisa","Jones","ljones@developer.com"];
        const recordInput = {
            apiName:CONTACT_OBJECT.objectApiName,field};
        createRecord(recordInput)
            .then(contact => {
               
            })
            .catch(error => {
                
            });
    }
}