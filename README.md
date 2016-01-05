switchFeatures module
================
[![Build Status](https://travis-ci.org/Aldorus/switchFeatures.svg)](https://travis-ci.org/Aldorus/switchFeatures)


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

### HTTP interceptor for restfull
If you need a different mock between a GET and a POST call you can add 'WITH {{METHOD}}' in your configuration for use differente mock


```js
    angular.module('my_application').config(switchFeaturesConfigProvider) {
        switchFeaturesConfigProvider.setBasePathMock('/mocks/'); // The default base path where your mocks files are stored
        switchFeaturesConfigProvider.setMocks({
            'oauth/token WITH POST': 'token_post.json',
            'oauth/token': 'token.json'
        });
    }
```

And if you want call to get onto two differents id for restfull application you can write them into your configuration
```js
    angular.module('my_application').config(switchFeaturesConfigProvider) {
        switchFeaturesConfigProvider.setBasePathMock('/mocks/'); // The default base path where your mocks files are stored
        switchFeaturesConfigProvider.setMocks({
            'api/article WITH POST': 'new_article.json',
            'api/article/12': 'article_12.json',
            'api/article/42': 'article_42.json',
            'api/article': 'article_default.json'
        });
    }
```
Be careful the declaration order is important, default is always at the end

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
```
    gulp
``` 
Runs eslint, test and compile project
