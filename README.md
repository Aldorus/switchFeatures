switchFeatures module
================

With this module you can intercept http call and replace the call with a json response (very useful when your webservice isn't ready)
You can also hide some part of your application with the 'sf' directive (useful when your module isn't already ready for the production)

## Installation

```bash
    bower install switch-features
```

## Usage

```js
    // load the switchFeatures module
    angular.module('my_application', ['switchFeatures']);

```

### HTTP interceptor

```js
    angular.module('my_application').config(switchFeaturesConfigProvider) {
        switchFeaturesConfigProvider.setBasePathMock('/mocks/'); // The default base path where your mocks files are stored
        switchFeaturesConfigProvider.setMocks({
            'oauth/token': 'token.json'
        });
    }
```

### SF Directive
```js
    angular.module('my_application').config(switchFeaturesConfigProvider) {
        switchFeaturesConfigProvider.setFeatures({
            'menu': true
        });
    }
```

```html
    <div sf="menu">Content</div>
```


## Contributing

#### Install project dependencies
```bash
    npm install
    bower install
```

### Cmd
```gulp``` Runs eslint, test and compile project
