var migrator = {

    views: {},

    models: {},

    loadTemplates: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (migrator[view]) {
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                    migrator[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    }

};

migrator.Router = Backbone.Router.extend({

    routes: {
        "":                 "home",
        // "init"              "appInit",
        "list":          "listRPs",
        "RPs/:id":          "RPDetails",
        "getLoadFile/:host/:rp": "getLoadFile",
        "getLoadFileCollection": "getLoadFileCollection"
    },

    initialize: function () {
        migrator.shellView = new migrator.ShellView();
        $('body').html(migrator.shellView.render().el);
        // Close the search dropdown on click anywhere in the UI
        $('body').click(function () {
            $('.dropdown').removeClass("open");
        });
        this.$content = $("#content");
    },

    // appInit: function() {

    // },

    home: function () {
        // Since the home view never changes, we instantiate it and render it only once
        if (!migrator.homelView) {
            migrator.homelView = new migrator.HomeView();
            migrator.homelView.render();
        } else {
            console.log('reusing home view');
            migrator.homelView.delegateEvents(); // delegate events when the view is recycled
        }
        this.$content.html(migrator.homelView.el);
        migrator.shellView.selectMenuItem('home-menu');
    },

    RPDetails: function(id) {
        // console.log('RPDetails with id: ' + id);
        var rp = new migrator.RP({ "id": id });
        var self = this;
        rp.fetch({
            success: function(data) {
                self.$content.html(new migrator.RPView({model: data}).render().el);
            },
            error: function(data) {
                console.log('fetch error: ' + data);
            }
        });
        migrator.shellView.selectMenuItem();
    },

    getLoadFile: function(host, rp) {
        console.log('getLoadFile: ' + host + '/' + rp);
        var loadfile = new migrator.LoadFile({
            "host": host,
            "rp": rp,
            "js": ''
        });
        var self = this;
        loadfile.fetch({
            success: function(data) {
                console.log('fetch success:');
                // return new migrator.LoadFileView({model: data});
                self.$content.html(new migrator.LoadFileView({model: data}).render().el);
            },
            error: function(data) {
                console.log('fetch error: ');
                console.dir(data);
            }
        });
    },

    getLoadFileCollection: function(){
        console.log('get load file collection');
        var loadfiles = new migrator.LoadFileCollection();
        loadfiles.fetch({
            success: function(data) {
                console.dir(data);
                self.$content.html(new migrator.LoadFileCollectionView({ model: data}).render().el);
            }
        });
    },

    listRPs: function() {
        console.log('listRPs');
        var rpList = new migrator.RPCollection();
        var self = this;
        rpList.fetch({
            success: function (data) {
                console.dir('fetch success');
                self.$content.html(new migrator.RPListTableView({model: data}).render().el);
            },
            error: function (data) {
                console.log('fetch error: ');
                console.dir(data);
            }
        });
        this.$content.html(new migrator.RPListTableView(new migrator.RPCollection()).render().el);
        migrator.shellView.selectMenuItem('list-menu');
    }
});

$(document).on("ready", function () {
    migrator.loadTemplates(["HomeView", "ShellView", "LoadFileView", "LoadFileCollectionView", "RPListTableItemView", "RPListItemView", "RPView", "RPSummaryView"],
        function () {
            migrator.router = new migrator.Router();
            Backbone.history.start();
        });
});
