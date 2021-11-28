/**
 * the plugin name
 * @return {string}
 */
function getPluginName() {
  return 'patternlab-plugin-pattern-wrap';
}

/**
 * get plugin options from patternlab-config
 * @param patternlab
 * @return {*}
 */
function getPluginOptions(patternlab) {
  return patternlab.config.plugins[getPluginName()].options;
}

/**
 * get the classes from pattern markdown or json configured by the plugin options
 * @param patternlab
 * @param pattern
 * @return {string}
 */
function getWrapClasses(patternlab, pattern) {
  const config = getPluginOptions(patternlab);
  const { wrapClassKey } = config;
  if (!wrapClassKey || wrapClassKey.length === 0) {
    return '';
  }

  const classes = [];
  wrapClassKey.forEach((key) => {
    const { allMarkdown, jsonFileData } = pattern;

    if (allMarkdown && allMarkdown[key]) {
      classes.push(allMarkdown[key]);
    }

    if (jsonFileData && jsonFileData[key]) {
      classes.push(jsonFileData[key]);
    }
  });

  return classes.join(' ');
}


module.exports = {
  getPluginName,
  getWrapClasses,
};
