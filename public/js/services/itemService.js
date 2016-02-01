window.app.factory("Item", function ($resource) {
    return $resource('api/:action/:itemId',{},
        {
            get_item_files: {
                method: 'GET',
                params: {
                	action: 'items'
                },
                isArray: true
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