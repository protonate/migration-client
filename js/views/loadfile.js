migrator.LoadFileView = Backbone.View.extend({

    render: function () {

        this.$el.text(this.template(this.model.attributes));
        return this;
    }
});

migrator.LoadFileCollectionView = Backbone.View.extend({

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		$(this.$el).click = function() { alert(this)};
		return this;
	}
});

migrator.getLoadFile = function(host, rp, callback) {
	console.log('getLoadFile')
	console.log(host);
	console.log(rp);

	var loadfile = new migrator.LoadFile({
	    "host": host,
	    "rp": rp,
	    "js": ''
	});
	loadfile.fetch({
	    success: function(data) {
	    	console.log('data');
	    	console.dir(data);
	    	if(data.attributes.host === "rpxnow.com") {
	    		$('#rpx-load-file').html(new migrator.LoadFileView({model:data}).render().el);
	    	} else if(data.attributes.host === 'd16s8pqtk4uodx.cloudfront.net') {
	    		$('#s3-load-file').html(new migrator.LoadFileView({model:data}).render().el);
	    	}
	    	if(typeof(callback) === 'function') {
	    		callback();
	    	}
	    },
	    error: function(data) {
	        console.log('fetch error: ');
	        console.dir(data);
	    }
	});
}