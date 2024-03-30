### Beams World

## `Technologies`

- NextJs
- Chakra UI
- PrismaORM
- MongoDB
- Github
- Cloudinary
- Digital Ocean
- Clerk Authentication
- Excalidraw Editor

## Folders

- `actions` : All the servesActions
- `app` : Pages
- `hooks` : Microinteractions modal hooks
- `libs` : Code to interact with database
- `popUps` : Microinteractions modals.
- `types` : All the types used(need to change and break into different files based on the product)

## Enivronment variables

 <!-- Clerk api keys -->

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
- CLERK_SECRET_KEY
- CLERK_WEBHOOK_SECRET
<!-- Do not change -->
- NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
- NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
- NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/products
- NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/get-started
<!-- Cloudinary -->
- CLOUDINARY_ID=dars7qqwz
- NEXT_PUBLIC_CLOUDINARY_UPLOAD=beamsworld
<!-- database url -->
- DATABASE_URL=
<!-- Brevo api-key -->
- BREVO=

## Installation

- clone the repo from github
- `npm i `
- `npm run start`
- `port forward using ngrok for the 3000 port no`
