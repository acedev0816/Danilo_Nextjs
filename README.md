This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Environment

if envrionment variable NEXT_PUBLIC_DATA_SOURCE=db, the nextjs api works based on sqlite db(./sqlite.db) and the data is
fetched from db and updated on the db.

In other cases, nextjs api works on fake data.
The initial data is generated using faker.js and the job data is only updated on the frontend, not updated on backend.

## Technologies
+NEXT.js
+Redux Toolkit
+Formik
+Yup
+Custom Hooks
+TypeScript

