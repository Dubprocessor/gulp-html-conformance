const PluginError = require('plugin-error');

function setHtmlhintOptions(opts, options) {
  const assigned = options;
  const allHtmlhintKeys = [
    'tagname-lowercase',
    'attr-lowercase',
    'attr-value-double-quotes',
    'attr-value-not-empty',
    'attr-no-duplication',
    'doctype-first',
    'tag-pair',
    'tag-self-close',
    'spec-char-escape',
    'id-unique',
    'src-not-empty',
    'title-require',
    'alt-require',
    'doctype-html5',
    'id-class-value',
    'style-disabled',
    'inline-style-disabled',
    'inline-script-disabled',
    'space-tab-mixed-disabled',
    'id-class-ad-disabled',
    'href-abs-or-rel',
    'attr-unsafe-chars',
    'head-script-disabled'
  ];
  const nonBooleanKeys = ['id-class-value', 'space-tab-mixed-disabled'];
  const spaceValues = ['space', 'space4', 'tab'];
  const idClassValues = ['underline', 'dash', 'hump'];

  Object.keys(opts.htmlhint).forEach(key => {
    if (allHtmlhintKeys.indexOf(key) === -1) {
      throw new PluginError('gulp-html-conformance', `Unknown key - '${key}' in htmlhint options`);
    }
    if (typeof opts.htmlhint[key] !== 'boolean' && nonBooleanKeys.indexOf(key) === -1) {
      throw new PluginError(
        'gulp-html-conformance',
        `Bad value in htmlhint options. Usage - '${key}': boolean`
      );
    }
    if (typeof opts.htmlhint[key] === 'boolean' && nonBooleanKeys.indexOf(key) === -1) {
      assigned.htmlhint[key] = opts.htmlhint[key];
      return;
    }

    if (key === 'id-class-value') {
      if (
        idClassValues.indexOf(opts.htmlhint['id-class-value']) !== -1 ||
        opts.htmlhint['id-class-value'] === false
      ) {
        assigned.htmlhint[key] = opts.htmlhint[key];
      } else {
        throw new PluginError(
          'gulp-html-conformance',
          `Bad value '${opts.htmlhint['id-class-value']}' in htmlhint options.
          Usage - 'id-class-value': 'underline' || 'dash' || 'hump' || false`
        );
      }
    }

    if (key === 'space-tab-mixed-disabled') {
      if (
        spaceValues.indexOf(opts.htmlhint['space-tab-mixed-disabled']) !== -1 ||
        opts.htmlhint['space-tab-mixed-disabled'] === false
      ) {
        assigned.htmlhint[key] = opts.htmlhint[key];
      } else {
        throw new PluginError(
          'gulp-html-conformance',
          `Bad value '${opts.htmlhint['space-tab-mixed-disabled']}' in htmlhint options.
           Usage - "space-tab-mixed-disabled": 'space' || 'space4' || 'tab' || false`
        );
      }
    }
  });
  return assigned;
}

module.exports = setHtmlhintOptions;
