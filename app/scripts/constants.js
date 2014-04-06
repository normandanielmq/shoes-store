'use strict';

app.factory('CONSTANTS', function () {
  return {
      MESSAGE: {
          SAVE_SUCCESS: 'Successfully saved.',
          ERROR_REQUEST: 'Unable to process the request in this moment.',
          DELETE_CONFIRMATION: 'Are you sure you want to process this record?',
          DELETE_RESTRICTION: 'There are data associated to this record. Unable to delete.'
      },
      STORAGE_KEY : {
          STORES: 'db.stores',
          ARTICLES: 'db.articles',
          ARTICLE_IMAGES: 'db.articleImages'
      }
  };
});
