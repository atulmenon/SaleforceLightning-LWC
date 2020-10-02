public with sharing class FoodDeliveryData {
        @AuraEnabled(cacheable=true)
        public static List<Food__c> Food() {
            return [SELECT Name,Food_Price__c FROM Food__c];
    }
        @AuraEnabled(cacheable=true)
        public static List<Customer__c> Customer(){
            return [SELECT Name,City__c,Street__c, Pin_Code__c,Email_Address__c,Contact_Number__c,Food__r.Name,
            Restaurant__r.Name,Restaurant__r.Street__c,Restaurant__r.City__c,Restaurant__r.Pin_Code__c FROM Customer__c];
    }


        @AuraEnabled(cacheable=true)
        public static List<Restuarant__c> Restaurant(){
            return [SELECT Name,City__c,Street__c, Pin_Code__c FROM Restuarant__c];
    }
        @AuraEnabled(cacheable=true)
        public static List<Rider__c> Rider(){
            return [SELECT Name,Contact_Number__c,Food__r.Name,Food__r.Food_price__c,Customer__c FROM Rider__c];
    }
}
