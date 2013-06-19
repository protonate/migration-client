migrator.RPListView = Backbone.View.extend({

    tagName:'ul',

    className:'nav nav-list',

    initialize:function () {
        var self = this;
        this.model.on("reset", this.render, this);
        this.model.on("add", function (RP) {
            self.$el.append(new migrator.RPListItemView({model:RP}).render().el);
        });
    },

    render:function () {
        this.$el.empty();
        _.each(this.model.models, function (RP) {
            this.$el.append(new migrator.RPListItemView({model:RP}).render().el);
        }, this);
        return this;
    }
});

migrator.RPListItemView = Backbone.View.extend({

    tagName:"li",

    initialize:function () {
        this.model.on("change", this.render, this);
        this.model.on("destroy", this.close, this);
    },

    render:function () {
        // The clone hack here is to support parse.com which doesn't add the id to model.attributes. For all other persistence
        // layers, you can directly pass model.attributes to the template function
        // var data = _.clone(this.model.attributes);
        // data.id = this.model.id;
        // this.$el.html(this.template(data));
        this.$el.html(this.template(this.model.attributes));
        return this;
    }

});

migrator.RPListTableView = Backbone.View.extend({
    tagName: "table",
    className: "table table-condensed table-bordered table-hover",
    initialize: function () {
        this.$el.append("<thead><tr><td>rp </td><td>ready to migrate </td><td>migrated </td></tr><thead>");
        // console.dir(model);
        // this.model.on("change", this.render, this);
    },

    render: function () {
        _.each(this.model.models, function (RP) {
            this.$el.append(new migrator.RPListTableItemView({model:RP}).render().el);
        }, this);
        return this;
    }
});

migrator.RPListTableItemView = Backbone.View.extend({
    tagName: "tr",
    render: function() {
        this.$el.append(this.template(this.model.attributes));
        return this;
    }

});

















