window.app.factory("Item", function ($resource) {
    return $resource('api/items/',{},
        {
            get_item_files: {
                method: 'GET',
                isArray: true,
                params: {}
            },


        });
});