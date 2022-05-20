# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm init svelte

# create a new project in my-app
npm init svelte my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Deploy

Using the node js sveltekit adaptor, build the app. Then run `eb deploy`. Note, the .ebignore file pushes the necessary files to S3 for deployment.

## [Prisma Docs](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases)

* Start local mysql: mysql.server start 
* Create DB tables locally and migration changes: npx prisma migrate dev --name NAME
* Create client code: npx prisma generate
* View DB: npx prisma studio
* Deploy migrations (in ebextensions or CICD): npx prisma migrate deploy
* Connect to local mysql: mysql -u root -p, USE mydb, DESCRIBE User
* Connect to [prod mysql](https://stackoverflow.com/questions/8344057/connect-to-mysql-on-aws-from-local-machine): mysql -h aamue2ydcjzfpz.cvjxt4diopmm.us-west-2.rds.amazonaws.com -P 3306 -u admin -p

## TODO

* Hard code functionality with users.
* Amplify UI (with components https://github.com/aws-amplify/amplify-ui/issues/756 https://github.com/aws-amplify/amplify-ui/discussions/469 https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/#option-1-use-pre-built-ui-components)
* Stop hard-coding .env file