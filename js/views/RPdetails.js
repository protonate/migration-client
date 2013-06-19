migrator.RPView = Backbone.View.extend({

    events : {
        'click #ready-to-migrate' : 'toggleTrueFalse',
        'click #to_be_migrated' : 'toggleTrueFalse',
        'click #migrate' : 'doMigration',
        'click #rollback' : 'doRollback'
    },

    toggleTrueFalse: function() {
        console.log('toggleTrueFalse');
        console.log(this.model);
        // this.model.toggle();
        var self = this;
        // this.model.set({
        //     _id: this.model.get("id"),
        //     ready_to_migrate: !this.model.get("ready_to_migrate")
        // });
        this.model.save({ready_to_migrate: !this.model.ready_to_migrate}, {
            success: function (model) {
                console.log('RP saved!');
                // self.render();
                // utils.showAlert('Success!', 'Wine saved successfully', 'alert-success');
            },
            error: function () {
                alert('error saving RP');
                // utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
            }
        });
    },

    doMigration: function(){},
    doRollback: function(){},

    render: function () {

        console.log('RPView.render()');

        var attrs = this.model.attributes;
        this.$el.html(this.template(attrs));

        $('#details', this.el).html(new migrator.RPSummaryView({model:this.model}).render().el);


        // model.on('change:ready_to_migrate', function () {
        //     // update the model
        // });

        // this.model.loadfiles.fetch({
        //     success:function (data) {
        //         if (data.length == 0)
        //             $('.no-loadfiles').show();
        //     }
        // });
        // $('#loadfiles', this.el).append(new migrator.EmployeeListView({model:this.model.reports}).render().el);
        // $('#loadfiles', this.el).html(new migrator.LoadFileView({model: LoadFile}).render().el);
        return this;
    }
});

migrator.RPSummaryView = Backbone.View.extend({

    initialize:function () {
        // this.model.on("change", this.render, this);
    },

    render:function () {

        console.log('RPSummaryView.render()');

        var rp = this.model.attributes.rp;

       // migrator.getLoadFile('rpx', rp, (function(_rp){
       //          return function() { migrator.getLoadFile('s3', _rp, function(){
       //              // diff callback goes here
       //              var rpx_file_text = $('#rpx-load-file').html();
       //              var s3_file_text = $('#s3-load-file').html();
       //              var differ = new diff_match_patch();
       //              var diff = differ.diff_main(s3_file_text, rpx_file_text);
       //              differ.diff_cleanupSemantic(diff);
       //              var diff_html = differ.diff_prettyHtml(diff);
       //              $('#diff').html(_.unescape(diff_html));

       //          })};
       // }(rp)));

       
       this.$el.html(this.template(this.model.attributes));
       return this;
    }

});