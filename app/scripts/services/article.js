'use strict';

app.factory('Category', ['$resource', 'CONSTANTS',
        function ($resource, CONSTANTS) {
            return $resource(
                CONSTANTS.PARAMETERS['API_END_POINT'] + '/categories/:id',
                {
                    id: '@id'
                },
                {
                    update: { method: 'PUT' }
                }
            );
        }
    ]);
