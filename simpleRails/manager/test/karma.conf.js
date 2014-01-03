module.exports = function(config) {
	config.set({

		basePath: '../',

		frameworks: ['jasmine'],

		files: [
			'app/js/lib/angular.min.js',
      'app/js/lib/angular-ui.js',
      'app/js/declare.js',
      'app/js/controllers/*',
      'app/js/directives/*',
      'app/js/utility/*',
      'test/mock/*.js',

			'test/phones/*.js'
		],

		// exclude: [
		// 	'app/js/lib/angular.min.js'
		// ],

		preprocessors: {
			// 'app/js/**/*.js': 'coverage',
			// 'test/mock/**/*.coffee': 'coffee',
			// 'test/helper/**/*.coffee': 'coffee',
			// 'test/spec/**/*.coffee': 'coffee',
			// 'app/views/**/*.html': 'ng-html2js'
		},


		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['progress'],
		// reporters: ['progress', 'coverage'],

		coverageReporter: {
			type : 'html',
			dir : 'test/coverage/'
		},

		port: 9876,

		colors: true,

		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		autoWatch: true,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['PhantomJS'],

		captureTimeout: 60000,

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: false
	});
};
