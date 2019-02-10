
# Scope
- Listen for IoT events, initially with Wink pub/sub, later also AWS IoT, other data sources like internal MQ? (eg Temp sensor in home, published to AWS IoT)
- Utilize Cloud Workers (by CloudFlare) to run serverless? If not possible, use AWS?
- Aggregate and persist event data, inflate or transform as needed for later aggregation, trend analysis, etc

# Application Flow
- Use wink-api wrapper to retrieve devices, pull pubnub subscription
- Utilize pubnub library to subscribe to the topic for given device
- Upon receipt of events, persist for later review/analysis

At this point you could optionally create plug-in-able type logic that would allow you to trigger other events, apply highlights or observations in a UI, that aren't covered by the scope in the Wink App or Alexa.

# Use Cases
- Currently there is no persistence of your personal IoT data that may help you to make decisions on usage, etc.  The Wink App may does offer tracking of activity, but doesn't aggregate or provide insight into trends etc.  Further, you can only see discrete activity related to Wink, what about other devices not in your Wink Hub?  Wouldn't it be nice to be able to see ALL activity across disparate devices and interfaces?
- Currently the tools that do offer some insights into your IoT activity, like Nest, are somewhat hampered as they consider only their properiety scope, and also these insights can vary significantly depending on your use cases, the space these devices operate in, your preferences etc, so I'd like to explore the limits of these variables.

# Additional Scope
- Potentially de-compose this service, making the wink-api/pub/sub part a separate package
- In this service or another, make available facts via API
- Manufacture or produce aggregate or time-series data?
- Consume IoT facts of interest, render via React and React-Native
- Allow scale for other accounts, anonymize if needed, etc?

## To Do
- Add test coverage, publish to coveralls?
- Build pipeline using circle, travis, etc?

## Using Wink-API
If using this repository https://github.com/markdicksonjr/wink-api, there are a couple of caveats:
- You need to have typescript, @types/node, @types/request and @types/jest installed in your project, in order to install this dependency (since it does a post-install step to compile the typescript and will need these, they should be "dependencies" in that project instead of "devDependencies")
- Upon install `npm i wink-api`, you will receive errors if these aren't installed
- After installing AND compiling, you WILL need to add the declared types to your project.  Since "typings" is deprecated, one way to do this is to add a reference in your tsconfig.json (which I've done):

```
  "files": [
    "node_modules/wink-api/@types/wink-api.d.ts"
  ],
```
