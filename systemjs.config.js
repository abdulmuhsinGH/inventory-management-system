/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      'jquery':                      'npm:jquery/dist/jquery.min.js',
      'moment':'npm:moment',
      'angular2-moment': 'npm:angular2-moment',
      // other libraries
      'rxjs':                      'npm:rxjs',
      'ng2-bootstrap' : 'npm:ng2-bootstrap/bundles/ngx-bootstrap.umd.js',
      'ng2-charts': 'npm:ng2-charts/bundles/ng2-charts.umd.min.js',
      'mydaterangepicker': 'npm:mydaterangepicker/bundles/mydaterangepicker.umd.js',
      'ng2-bootstrap/components/typeahead/typeahead-match.class'     :        'npm:ng2-bootstrap/components/typeahead/typeahead-match.class.js',
      'angular2-notifications': 'npm:angular2-notifications',
     
      'ng2-translate': 'npm:ng2-translate',
      'alfresco-js-api': 'npm:alfresco-js-api/dist',
      'ng2-alfresco-core': 'npm:ng2-alfresco-core',
      'ng2-alfresco-datatable': 'npm:ng2-alfresco-datatable'

      /*'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',*/
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      moment: {
        main: './moment.js',
        defaultExtension: 'js'
      },
      'angular2-moment': {
        main: './index.js',
        defaultExtension: 'js'
      },
      /*mydaterangepicker: {
        main: './dist/index.js',
        defaultExtension: 'js'
      },*/
     /* 'ng2-charts': { 
        main: 'ng2-charts.js', 
        defaultExtension: 'js' 
      },*/
      'angular2-notifications': { main: 'components.js', defaultExtension: 'js' },
      'ng2-translate': { defaultExtension: 'js' },
      'alfresco-js-api': { main: './alfresco-js-api.js', defaultExtension: 'js'},
      'ng2-alfresco-core': { main: './index.js', defaultExtension: 'js'},
      'ng2-alfresco-datatable': { main: './index.js', defaultExtension: 'js'}
      /*'angular-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      }*/
    }
  });
})(this);
