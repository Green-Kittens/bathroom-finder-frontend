# Bathroom Finder

## Workflows

[![Compile](https://github.com/Green-Kittens/bathroom-finder-frontend/actions/workflows/compile.yml/badge.svg?branch=main&event=push)](https://github.com/Green-Kittens/bathroom-finder-frontend/actions/workflows/compile.yml)
[![Format](https://github.com/Green-Kittens/bathroom-finder-frontend/actions/workflows/format.yml/badge.svg?branch=main&event=push)](https://github.com/Green-Kittens/bathroom-finder-frontend/actions/workflows/format.yml)
[![Lint](https://github.com/Green-Kittens/bathroom-finder-frontend/actions/workflows/lint.yml/badge.svg?branch=main&event=push)](https://github.com/Green-Kittens/bathroom-finder-frontend/actions/workflows/lint.yml)

## Dev Setup

1. Install [Yarn] on your development machine
1. Install the [Expo Go] app on your mobile device
1. Clone the repository
1. Run `yarn install` to install dependencies
1. Run `yarn start` to start the expo development server
1. See [this wiki page] on how to connect your mobile device to the server running on your development machine

If you want the frontend to use the backend hosted on your development machine, start the backend server and then edit `env.ts`
in this repository according to the proper URL of the backend. Notes on typical configuration are commented in `env.ts`.

[Yarn]: https://yarnpkg.com/
[Expo Go]: https://expo.dev/go
[this wiki page]: https://github.com/Green-Kittens/green-kittens.github.io/blob/main/connect-mobile.md
