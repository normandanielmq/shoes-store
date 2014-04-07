'use strict';

app.factory('CONSTANTS', function () {
  return {
      DATABASE_FILE: 'database.json',
      MESSAGE: {
          SAVE_SUCCESS: 'Successfully saved.',
          ERROR_REQUEST: 'Unable to process the request in this moment.',
          DELETE_CONFIRMATION: 'Are you sure you want to process this record?',
          DELETE_RESTRICTION: 'There are data associated to this record. Unable to delete.'
      },
      STORAGE_KEY : {
          STORES: 'db.stores',
          ARTICLES: 'db.articles',
          ARTICLE_IMAGES: 'db.articleImages',
          PURCHASED_ARTICLE: 'db.purchasedArticle'
      },
      ARTICLE_FLAG: {
          NONE: 'none',
          SALE: 'sale',
          HOT: 'hot',
          toArray: function () {
              return [
                  {id: this.NONE, description: ''},
                  {id: this.SALE, description: 'Sale'},
                  {id: this.HOT, description: 'Hot'}
              ];
          }
      },
      MAX_QUANTITY_ON_PURCHASE: 4,
      COLORS: [
          {color: 'Red'},
          {color: 'Blue'},
          {color: 'Yellow'},
          {color: 'Black'},
          {color: 'White'}
      ],
      SIZES: [
          {size: 'S'},
          {size: 'M'},
          {size: 'L'},
          {size: 'XL'}
      ],
      TAX_PERCENTAGE: 10
  };
});
