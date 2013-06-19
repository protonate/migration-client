
migrator.RP = Backbone.Model.extend({
    urlRoot:"http://localhost:3030/RPs"

    // toggle: function() {
    //     var testVal = !this.get('ready_to_migrate');
    //     console.log('model toggle', testVal);
    //     console.log('model is: ', this);
    //     this.save(
    //         {
    //             id: this.get("id"),   
    //             ready_to_migrate: !this.get("ready_to_migrate")
    //         }, 
    //         {
    //             wait: true,
    //             success: function(){ console.log('yay you!')},
    //             error: function(){ console.log('boo hoo...')}
    //         }
    //     );
    // }
});

migrator.RPCollection = Backbone.Collection.extend({
    model: migrator.RP,
    url:"http://localhost:3030/RPs"

});

migrator.LoadFile = Backbone.Model.extend({
    // urlRoot: "http://localhost:3030/getLoadFileCollection"
    // sync: function () { return originalSync },
    // url: "http://localhost:3030/getLoadFileCollection",

    initialize: function(attributes, options) {
       this.url = "http://localhost:3030/getLoadFile/" + attributes.host + "/" + attributes.rp;
    }

});

migrator.LoadFileCollection = Backbone.Collection.extend({
    model: migrator.LoadFile,
    url: "http://localhost:3030/getLoadFileCollection"
});

var originalSync = Backbone.sync;
Backbone.sync = function (method, model, options) {
    if (method === "read") {
        options.dataType = "jsonp";
        return originalSync.apply(Backbone, arguments);
    }
    else {
        return originalSync.apply(Backbone, arguments);
    }

};