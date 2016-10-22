# pending-review

Simple CLI tool for checking pending reviews.

## Installation

1. `yarn i`
2. Copy `.env.example` to `.env` and set access token and organization.

## Usage

`node pending-review [--org=<organization>] [--token=<personal-access-token>]`

## Sample output

```
versionpress/versionpress:
#1143 (https://github.com/versionpress/versionpress/pull/1143): Fix zip compression
#1117 (https://github.com/versionpress/versionpress/pull/1117): Fix for DB password with regex characters on initial clone.
#1116 (https://github.com/versionpress/versionpress/pull/1116): Custom ini serializer
#1056 (https://github.com/versionpress/versionpress/pull/1056): Adds "dirpath" to "wp vp clone"

versionpress/some-repo:
#31 (https://github.com/versionpress/some-repo/pull/31): Add gulp task to make ZIP
```

## Licence

MIT