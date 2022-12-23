# Expert Session Web App

This is the web app of the Expert Session project.

## Local Development Setup

In order to run the app locally, follow these steps:

1. Install [Docker](https://www.docker.com/).
2. Install Node.js version 16 [Node](https://nodejs.org/) with nvm.
3. Install the latest version [Yarn](https://yarnpkg.com/).
4. Make a copy of the file `.env.example` and rename it to `.env`. Make sure you don't delete `.env.example`.
5. Run `yarn install`
6. Start the app by running `yarn dev`
7. App will now be available at http://localhost:3000/

---

# GitHub Actions Pipeline

The pipeline for this project is built upon [GitHub Actions](https://docs.github.com/en/actions). The build files can be found in the `.github/workflows` directory.

## Deployment Flow

Pushing changes to `develop`, `main` or any branch with the following prefix `ft-*` will trigger a Docker build / push to ECR on AWS. If there is a pre-existing cluster that matches the branch name, GHA will deploy the new image to the cluster.

You may read up fully on the deployment steps [here](https://thinkbean.atlassian.net/wiki/spaces/ES/pages/2227273729/Pipeline+Flow+for+Web+and+API+Applications).

## Environment Variables

All environment variables for remote deployments can be found in the `.github/variables` directory. The `main` branch will pull from the `production.json` file. All other branches will pull from the `develop.json` file.

You may read up fully on this concept [here](https://thinkbean.atlassian.net/wiki/spaces/ES/pages/2227142660/How+Environment+Variables+are+Handled+CI+CD).

---

# Google Tag Manager Integration

To enable Google Tag Manager, add your GTM id to the `GTM_ID` environment variable. The `_document.tsx` file will now load GTM in the head of your application.

Further documentation can be found here: https://developers.google.com/tag-platform/tag-manager/web

### To debug you application:

- Log into tagmanager.google.com.
- Find your container and click into it.
- Click on the 'Preview' button on the top right.
- Enter the website URL you wish to debug.
- Press `Continue`.
- The window will now show all the tags that are firing in the background.

---

# New Relic Integration

## Enabling the Runtime agent

If you wish to enable the New Relic agent at runtime, you must first provide the two environment variables listed below. New Relic configurations can be found in the newrelic.js file at the root of this project. Upon providing these variables, the New Relic module will be triggered and look for the configuration file at the root of this project.

- NEW_RELIC_LICENSE_KEY={your-key}
- NEW_RELIC_APP_NAME=expert-session-api-{local|dev|prod}

## Client Side Monitoring

If you wish to enable client side monitoring, you must set the following environment variable to true

- NEW_RELIC_BROWSER_ENABLED=true

---

## Tagging Deployments

In addition, if you wish to tag your deployments upon build time, you will need two additional variables. Note that the app does not use these variables at runtime like the two above. Your CI tool will need them.

- NEW_RELIC_APP_ID {dev and prod should have different app ids}
- NEW_RELIC_API_KEY {can be shared across projects}

Example CI

```
 post_build:
    commands:
      - |
        curl --location --request POST "https://api.newrelic.com/v2/applications/$NEW_RELIC_APP_ID/deployments.json" \
        -i \
        --header "Api-Key: $NEW_RELIC_API_KEY" \
        --header "Content-Type: application/json" \
        --data-raw \
        "{
          \"deployment\": {
            \"revision\": $CODEBUILD_RESOLVED_SOURCE_VERSION
          }
        }"
```

---

# Testing

## Snyk

In order to test with Synk, run the following command:

```
yarn snyk
```

---

# Service Worker / Static Caching

We are using service worker to help with caching assets. You can see the `runtimeCaching.js` file located at the root of this project for more details. The Next.js PWA plugin drives this functionality and is powered by WorkBox. It is only enabled in production.

- https://github.com/shadowwalker/next-pwa
- https://developer.chrome.com/docs/workbox/what-is-workbox/
