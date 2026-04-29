const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'golf-shell',


  shared: {
    ...shareAll({ singleton: true, strictVersion: false, requiredVersion: 'auto' }),
    'shared-data': { singleton: true, strictVersion: false },
    '@angular/fire/app': { singleton: true, strictVersion: false },
    '@angular/fire/auth': { singleton: true, strictVersion: false },
    '@angular/fire/firestore': { singleton: true, strictVersion: false }
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Add further packages you don't need at runtime
  ],

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0

  features: {
    // New feature for more performance and avoiding
    // issues with node libs. Comment this out to
    // get the traditional behavior:
    ignoreUnusedDeps: true
  }
});
