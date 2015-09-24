var callbackNames = [
  'onTestCompleted'
  , 'onError'
  , 'onProgress'
];

SpeedOfMe = {
	config: {
		sustainTime: 1
		, testServerEnabled: true
		, userInfoEnabled: true
		, latencyTestEnabled: true
		, uploadTestEnabled: true
		, progress: {
			enabled: true
			, verbose: true
		}
	}
	, _initialized: false
	, _ready: new ReactiveVar(false)
};

SpeedOfMe.init = function(callbacks){
	var self = this;
	if (! this._initialized) {
	    Tracker.autorun(function(){
			if (SpeedOfMe.ready()) {
		        _.each(callbackNames, function(name){
		          if (_.has(callbacks, name)) {
		            SomApi[name] = callbacks[name];
		          }
		        });
				self._initialized = true;
			}
		});
	}
};

SpeedOfMe.startTest = function(){
	if (! this._initialized) {
		throw new Error('You must call `SpeedOfMe.init()` before performing a speed test!');
	}
  SomApi.startTest();
}

SpeedOfMe.ready = function(){
	return SpeedOfMe._ready.get();
}

Meteor.startup(function(){
	// Functions to run after the script tag has loaded
	var onLoad = function(){
		SpeedOfMe._ready.set(true);
		if(Meteor.settings.public.speedofme){
			var speedofme 			= Meteor.settings.public.speedofme;
			SomApi.account 			= speedofme.account;
			SomApi.domainName 	= speedofme.domainName;

			_.extend(SomApi.config, SpeedOfMe.config, speedofme.config);
		}
	};

	// If the script doesn't load
	var onError = function(error){
		if (typeof window.console !== 'undefined') {
			console.error(error);
		}
	}

	// Generate script tag
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = '//speedof.me/api/api.js';
	script.onload = onLoad;
	script.onerror = onError;
	script.async = true;

	// Load the script tag
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(script);
});