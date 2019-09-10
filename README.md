# How to Reproduce the iOS Google Calendar bug

1. Follow [this tutorial to get your google calendar api keys/url](https://fullcalendar.io/docs/google-calendar)
1. make sure some event exists in the calendar you are pulling data from
1. Rename `environment.example.ts` to `environment.prod.ts` and `environment.ts`
1. Insert your google credentials
1. `ionic cordova run android`
1. note that the google calendar syncs your event
1. `ionic cordova run ios`
    - note: your system may require `ionic cordova emulate ios -- --buildFlag="-UseModernBuildSystem=0"`
1. note that the event does not sync on ios
1. note `error-example.png` for console output

## Situations where the bug does not occur:

-   Android
-   Webview
-   Running on iOS in live reload mode (see root cause)

## Root Cause:

The FullCalendar code makes its requests from the ionic built-in browser, not via the Ionic HTTP Client. Since the ionic browser on IOS is hosted at ionic://, the google API blocks the requests for CORS reasons.

## Ways forward:

1. Hack FullCalendar in such a way to allow google calendar data to be pulled outside the library (in this case by ionic's native http package) and handed off as normal
2. re-engineer FullCalendar's parsing of google calendar's event data structure and pass it to FullCalendar as standard events.
