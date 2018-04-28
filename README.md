# Recover from Activity Log

This application will allow you to process information from the activity log in StarRez to recover lost data. Fair warning: this can just as easily duplicate information that was not actually deleted. Use at your own risk.

## Setup

1. Download source to your computer, then use `npm install` to build the dependencies. Requires [Node.js/npm](https://nodejs.org/).
2. Copy `.env.default` to `.env` and fill in your values. This is technically optional, but is easier than typing them out every time. Note: you must use a web services token, and not a password, for the token field.
3. Run the script using `node recover deletions.json`. I strongly suggest choosing the simulation mode and reviewing the requests it will make before committing to the real thing.

You may replace `deletions.json` with any JSON file, as output by a StarRez query on the LogActivity table. `LogActivityID`, `TableName`, and `Description` fields are required for every record.