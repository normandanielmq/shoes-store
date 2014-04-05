'use strict';

app.factory('Entity', ['$resource', 'CONSTANTS',
        function ($resource, CONSTANTS) {
            return $resource(
                CONSTANTS.PARAMETERS['API_END_POINT'] + '/entities/:id',
                {
                    id: '@id'
                }, {
                    update: {
                        method: 'PUT'
                    }
                });
        }
    ]);