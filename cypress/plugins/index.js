/// <reference types="cypress" />

import axios from "axios";

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

export default (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  // const testDataApiEndpoint = `${config.env.apiUrl}/testData`;
  // on("task", {
  //   async "db:seed"() {
  //     const { data } = await axios.post(`${testDataApiEndpoint}/seed`);
  //     return data;
  //   },
  // });
  // return config;
};
