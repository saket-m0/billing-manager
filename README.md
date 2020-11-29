# Billing Manager

## Overview
The Bill Manager shows a bill dashboard. The dashboard shows 
- The user can add, edit and remove bills.
- The user can filter bills according to category,
- The user can also see a Time Series plot of Bills with Amount on Y-Axis and Date on X-Axis.
 
The user can see the minimum bills that should be paid (n), such that their total value does not exceed the monthly budget value while meeting the condition that no more bills can be added from the remaining bills.

## Development
The app was built in React with Redux. Materials UI was used for Front End Components.

## Running
To run the app

Clone the repo in your system and get into the folder using
```sh
git clone https://github.com/saket-m0/billing-manager.git
cd billing-manager
```
Install the dependencies and run the server using
```sh
npm install
npm run
```