import { LightningElement, track } from 'lwc';

 // imports
 export default class BoatSearch extends NavigationMixin(LightningElement) {
    @track isLoading = false;
    
    handleLoading() {
        this.isLoading=true;
     }
    
    // Handles done loading event
    handleDoneLoading() {
        this.isLoading=false;
     }
    
     createNewBoat() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Boat__c',
                actionName: 'new'
            }
        });
    }
    searchBoats(event) { 
      const boatTypeId = event.detail.boatTypeId;
      this.template.querySelector("c-boat-search-results").searchBoats(boatTypeId);
    }
}