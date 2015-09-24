Package.describe({
  name: 'useful:speed-of-me',
  version: '0.0.1',
  summary: 'Loads the Speedof.me API into your Meteor client',
  git: 'https://github.com/usefulio/speed-of-me.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');
  api.use([
    'ecmascript'
    , 'reactive-var'
  ]);
  api.addFiles('client/speed-of-me.js', 'client');
  api.export('SpeedOfMe');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('useful:speed-of-me');
  api.addFiles('tests/speed-of-me-tests.js');
});
