window.app.factory("Item", function ($resource) {
    return $resource('api/:action/:itemId',{},
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
            	params: {
            		action: 'items',
            		itemId: 'itemId'
            	}
            }


        });
});