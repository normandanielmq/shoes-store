'use strict';

app.factory('CONSTANTS', function () {
  return {
      PARAMETERS: null, // array populated with the parameters.json content in main_controller.js
      MESSAGE: {
          SAVE_SUCCESS: 'Successfully saved.',
          ERROR_REQUEST: 'Unable to process the request in this moment.'
      },
      ENTITY_STATUS : {
          ACTIVE: 'active',
          PENDING: 'pending',
          INACTIVE: 'inactive',
          toArray: function(){
              return [
                  {status: this.ACTIVE, description:'Active'},
                  {status: this.PENDING, description:'Pending'},
                  {status: this.INACTIVE, description:'Inactive'}
              ];
          }
      }
  };
});
