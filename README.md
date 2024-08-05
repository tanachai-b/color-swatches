# tanachai-b/color-swatches

A color swatches generator. Provides equal distance color swatches. Can view details for each color.

| Location         | Link                                        |
| ---------------- | ------------------------------------------- |
| GitHub Page      | https://tanachai-b.github.io/color-swatches |
| Firebase Hosting | https://color-swatches.tbun.dev/            |

## Stack

1. Vite.js
2. React
3. Typescript
4. Tailwind CSS
5. Github Page
6. Firebase Hosting

### This project...

- uses `Vite.js` to setup and build. This is to make use of React Fast Refresh.
- uses `React` + `Typescript` for user interface
- uses `Tailwind CSS` to have both `HTML` and `CSS` in one page for easy refactoring
- deploys to both `Github Page` and `Firebase Hosting`

## Build

To build the project in your local machine, run these commands:

```
npm i
npm run dev
```

## Deploy

To deploy the app, follow these steps :

1.  Update version in `package.json`
2.  Run these commands:

    ```
    npm i
    npm run build
    ```

3.  Merge changes to `main` branch
4.  The app will be deployed to both `github` and `firebase`

## Maintain

### Clean-up Code

1. Install `prettier` extension on `VSCode`. Use `prettier` to format code.
2. Ensure clean code by running these commands:

   ```
   knip
   npm run lint
   ```

### Update Dependencies

#### npm-check-updates

| Commands                 | Description                                   |
| ------------------------ | --------------------------------------------- |
| `ncu`                    | Check dependencies for latest versions        |
| `ncu -t semver`          | Same as above but without breaking change     |
| `ncu -t semver --update` | Same as above but also updates `package.json` |

### Clean-up Dependencies

#### knip

| Commands | Description                            |
| -------- | -------------------------------------- |
| `knip`   | Find all unused exports / dependencies |

#### depcheck

| Commands   | Description                  |
| ---------- | ---------------------------- |
| `depcheck` | Find all unused dependencies |
