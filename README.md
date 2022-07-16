# About Charityshop.io
Charityshop.io is a eCommerce web application platform supporting numerous charitable causes by providing users with the ability to buy and sell various products and allocation the entire sale amount to the charity of their choice.
# Technologies used in this project
### React

####  Custom Hooks 
- { useFetchGql } -- > used specifically for fetching GraphQl data with queries and varaibles tailored for specific components.
- { useFetch } -- > used for fetching data from firestore collections.
- { useUserStatus } -- > hook used in PrivateRoute allowing for rendering content only to active users.
- { useWindowSize } -- > navigation responsive adjustments 

### Stripe
- Provides payment processing capabilities for products within the app.

### Node / Express
- Stripe restricts client side data to be proccesed as payments therefore Node & Express server side payment was required to securly process user payments.
### Firebase / Firebase cloud functions
- Database, Hosting and cloud function required to run node.js code without the need to host a separate server. 

### GraphQL - Client
- Used to fetch and manage data from CharityBase Api. 
### Scss
- Entire styling of this app was done using custom Scss.
### Tailwind - grid system / login page

# Steps required to recreate this project on your local machine :)
- 1. Once cloned run npm install for Client and Server repository
- 2. npm start in client to host static content 
- 3. npm run dev to host node.js / express app
