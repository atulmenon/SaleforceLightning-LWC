import { LightningElement,wire,api } from 'lwc';
import { subscribe, unsubscribe, MessageContext,APPLICATION_SCOPE } from 'lightning/messageService';
import BOATMC from '@salesforce/messageChannel/BoatMessageChannel__c';
 import { getRecord,getFieldValue } from 'lightning/uiRecordApi';
const LONGITUDE_FIELD = 'Boat__c.Geolocation__Longitude__s';
const LATITUDE_FIELD ='Boat__c.Geolocation__Latitude__s'; 
const BOAT_FIELDS = [LONGITUDE_FIELD, LATITUDE_FIELD] ;
export default class BoatMap extends LightningElement {
  subscription = null;
  @api boatId; 
  @api get recordId() {
    return this.boatId;
  }
   set recordId(value) {
    this.setAttribute('boatId', value);
    this.boatId = value;
  }
  error = undefined;
  mapMarkers = [];
  @wire(getRecord,{recordId:this.boatId,fields:BOAT_FIELDS})
  wiredRecord({ error, data }) {
    if (data) {
      this.error = undefined;
      const longitude = data.fields.Geolocation__Longitude__s.value;
      const latitude = data.fields.Geolocation__Latitude__s.value;
      this.updateMap(longitude, latitude);
    } else if (error) {
      this.error = error;
      this.boatId = undefined;
      this.mapMarkers = [];
    }
  }
  @wire(MessageContext)
    messageContext;
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                BOATMC,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }
    unsubscribeToMessageChannel() {
      unsubscribe(this.subscription);
      this.subscription = null;
  }

  connectedCallback() {
    if (this.subscription || this.recordId) {
      return;
    }
     this.subscribeMC;
     }
   
  
  
  subscribeMC() {
    let subscription = subscribe(this.messageContext, BOATMC, (message) => { this.boatId = message.recordId }, { scope: APPLICATION_SCOPE });
        }
  disconnectedCallback() {
    this.unsubscribeToMessageChannel();
  }
  handleMessage(message) {
    this.boatId = message.recordId;
}
  updateMap(Longitude, Latitude) {
    this.mapMarkers = [Longitude,Latitude];
  }
  get showMap() {
    return this.mapMarkers.length > 0;
  }
}
