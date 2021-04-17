# CST8334 Snark Bean Website
This project serves as a new website for Snark Bean and integrates their existing Shopify store and blog. 

## Build the project
This project is built using React.js and TypeScript. Here are the steps to start the project on a development server:
- Install node.js: https://nodejs.org/en/download/
- Open terminal and get a local copy of the project:
```
git clone https://github.com/algonquin-college-sat/cst8334-21w-330-team-3.git
```
- cd into /cst8334-21w-330-team-3/snark-bean and run:
```
npm install
```
- Start development server:
```
npm start
```
- View the site at http://localhost:3000/

## Folder Structure
- Root folder of the project is at snark-bean\src\index.tsx
- Router.tsx is the component that handles the routing for the app.
- Most of the custom components have their own folder in the Components folder.

## Material-UI
- Material-UI is a frontend library that provides various pre-built components
- Some benefits of using Material-UI includes dynamic dynamic components, Material design principles, and cusom animations
- Their documentation is execeptional and can be found here: https://material-ui.com/
- The global theme file is at snark-bean\src\Theme.tsx

## Shopify Admin API
- Offers both a REST and a GraphQL option/reference
- Using this API would provide significantly more access than the Storefront API
- The GraphQL reference/documentation can be found here: https://shopify.dev/docs/admin-api/graphql/reference 
- ***This application does not use this API whatsoever and instead uses the Storefront API below***

## Shopify Storefront API
- ***All requests executed by this application are done using the Storefront API***
- The Storefront API is relatively new
- There is no REST option/reference for this API, only GraphQL
- The documentation can be found here: https://shopify.dev/docs/storefront-api/reference
- This API provides access to a significant amount of data, including Blog, Product, Customer, Address and more
- Pracitcally everything most frontend applications would need to access from a Shopify store is supplied by this API
- If this application is to add features that are not available with this API (this is an unlikely scenario), it might be wiser
to develop a backend from scrath for the extedned features, or to find a library that can handle them. Instead of switching over
to the Admin API
- It is to be noted, that the Admin API offers COMPLETE access to all accessible data from a Shopify store
- ***This application currently stores the access token in plain view in index.tsx, while this is considered ok for this API. Storing it as a secret is a good idea*** 

## Emailjs
- https://www.emailjs.com/
- ***This library is used in ContactForm.tsx to send email's. the functionality has already been tested and works perfectly***
- ***Because the current implementation was using a team member's personal email, the necessary information for sending emails with Email js has been removed***

## Emailjs Deep Dive
- ***The next set of steps detail the requirements for using emailjs:
- Head to the website and create an account (using Kim's (<-- the client) email)
- Set up a service and create a template
- Here is the template that the application was using: 

***Hey Kim,

You got a new message from {{name}}:

{{comment}}

Email Address: {{email}}

Phone Number: {{phone}}



Best wishes,***
- In ***ContactForm.tsx***, the **sendEmail** function is all that's required for sending emails
- Reference found here: https://www.emailjs.com/docs/sdk/send/

## Deploy the site
The site has been deployed using Firebase, which is very simple to use and is free. 
Official docs: https://firebase.google.com/docs/hosting/?authuser=0#implementation_path

**Steps**
- Create a Firebase account: https://firebase.google.com/
- Select 'add project' and create a new project
- cd into /cst8334-21w-330-team-3/snark-bean
- Create production build of app:
```
npm run build
```
- Download firebase CLI: https://firebase.google.com/docs/cli?authuser=0
- run:
```
npm install -g firebase-tools
Firebase login
Firebase init
```
- Select the snark bean project from the options
- **Specify 'build' as your public directory and select 'no' for the rest**
- deploy your app!
```
firebase deploy
```

