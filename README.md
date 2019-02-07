
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
- Currently there is no persistence of your personal IoT data that may help you to make decisions on usage, etc.  The new Wink App may offer some limited insight, but as with Nest, it can vary significantly depending on your use cases, the space these devices operate in, your preferences etc, so I'd like to explore the limits of these variables.

# Additional Scope
- In this service or another, make available facts via API
- Manufacture or produce aggregate or time-series data?
- Consume IoT facts of interest, render via React and React-Native
- Allow scale for other accounts, anonymize if needed, etc?

## To Do
- Add test coverage, publish to coveralls?
- Build pipeline using circle, travis, etc?
