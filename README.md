SpeedOf.Me
===============================
Loads the SpeedOf.Me API into your Meteor client. From the [speedof.me](http://speedof.me) website:
> We are happy to announce that SpeedOf.Me API, the first and only speed test API, is now ready to use. 
> - Create your own speed test service!
> - Benchmark the bandwidth of your website visitors
> - Decide what audio/video streaming quality is suitable for the client
> - Tell the user how long it exactly takes to download/upload a specific file
> - Integrate it in your Internet connected hardware/equipment
> - And more...

## How to use
**Step 1.** Go to http://speedof.me/api.html and sign up for a free key

**Step 2.** Add the `SpeedOf.Me` package to your meteor app

```
meteor add useful:speed-of-me
```

**Step 3.** Add these settings to your `settings.json` file:

```
{
    "public": {
        "speedofme": {
            "account": "[yourspeedofmekey]"
            , "domainName": "localhost:3000"
            , "config": {
                "sustainTime": 4
            }
        }
    }
}
```
**Step 4.** Call `SpeedOfMe.init()` inside your template's `onRendered`:

```js
Template.SpeedTest.onRendered(function () {
    SpeedOfMe.init({
        onTestCompleted: function (testResult) {
            console.log(testResult);
        }
    });
});
```

**Step 5.** Start the test!

```js
Template.SpeedTest.events({
    'click button': function () {
        SpeedOfMe.startTest();
    }
});
```

## API

### `SpeedOfMe.init(callbacks)`
Initialize the `SpeedOf.Me` API and set the callbacks

- `callbacks` an object containing the callbacks that will be passed to the `SpeedOf.Me` API
  - `onTestCompleted` called when the speed test is complete; takes the test result object as an argument.
  - `onProgress` called multiple times during the speedtest; takes the partial result object as an argument; useful for creating a visual progress indicator.
  - `onError` an error handler
  
Example:
```js
SpeedOfMe.init({
    onTestCompleted: function (testResult) {
        console.info(testResult);
    }
    , onProgress: function (progress) {
        console.info(progress);
    }
    , onError = function(error){
        console.error(error);
    }
});
```
-----------------------------------
### `SpeedOfMe.startTest()`
Starts the speed test. `SpeedOfMe.init()` needs to be called beforehand. Example:

```js
'click button': function () {
    try {
        SpeedOfMe.startTest();
    }
    catch (e) {
        console.error(e);
    }
}
```
-----------------------------------
### `SpeedOfMe.ready()`
Reactively returns if the `SpeedOf.Me` script has loaded.
```js
if (SpeedOfMe.ready()) {
    console.info('The SpeedOf.Me script has loaded!');
}

```
-----------------------------------