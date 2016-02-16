window.app.factory("Item", function ($resource) {
    return $resource('api/:action/:type/:region/:itemId',{},
        {
            get_item_files: {
                method: 'GET',
                isArray: true,
                params: {
                	action: 'items'
                }
            },

            item_query: {
            	method: 'GET',
                isArray: false,
            	params: {
            		action: 'items',
                    type: 'type',
                    region: 'region',
            		itemId: 'itemId'
            	},
            }
        });
});