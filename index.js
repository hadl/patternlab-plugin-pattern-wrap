const { getPluginName, getWrapClasses } = require('./helpers');

const pluginName = getPluginName();

/**
 * PL event handler
 * @param patternlab
 * @param pattern
 */
function onPatternIterate([patternlab, pattern]) {
  const classes = getWrapClasses(patternlab, pattern);
  if (classes.length !== 0) {
    pattern.patternPartialCode = `<div class="pl-pattern-wrapper-element ${classes}">${pattern.patternPartialCode}</div>`;
  }
}

/**
 * Define what hooks you wish to invoke to here
 * For a full list of hooks - check out https://github.com/pattern-lab/patternlab-node/blob/master/packages/core/docs/events.md
 * @param patternlab - global data store which has the handle to hooks
 */
function registerEvents(patternlab) {
  patternlab.events.on('patternlab-pattern-write-begin', onPatternIterate);
}

/**
 * A single place to define the frontend configuration
 * This configuration is outputted to the frontend explicitly as well as included in the plugins object.
 */
function getPluginFrontendConfig() {
  return {
    name: pluginName,
    templates: [],
    stylesheets: [],
    javascripts: [],
    onready: '',
    callback: '',
  };
}

/**
 * The entry point for the plugin. You should not have to alter this code much under many circumstances.
 * Instead, alter getPluginFrontendConfig() and registerEvents() methods
 */
function pluginInit(patternlab) {

  if (!patternlab) {
    console.error('patternlab object not provided to plugin-init');
    process.exit(1);
  }

  //setup listeners if not already active. we also enable and set the plugin as initialized
  if (!patternlab.config.plugins) {
    patternlab.config.plugins = {};
  }

  //attempt to only register events once
  if (patternlab.config.plugins[pluginName] !== undefined &&
    patternlab.config.plugins[pluginName].enabled &&
    !patternlab.config.plugins[pluginName].initialized) {

    //register hooks
    registerEvents(patternlab);

    //set the plugin initialized flag to true to indicate it is installed and ready
    patternlab.config.plugins[pluginName].initialized = true;
  }

}

module.exports = pluginInit;
