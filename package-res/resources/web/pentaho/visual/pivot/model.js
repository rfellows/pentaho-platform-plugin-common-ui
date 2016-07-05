define([
  "pentaho/visual/base/model",
  "pentaho/i18n!model",
  "./theme/model"
], function(visualFactory, bundle) {

  "use strict";

  return function(context) {

    var Visual = context.get(visualFactory);

    /**
     * @name pentaho.visual.pivot.Model
     * @class
     * @extends pentaho.visual.base.Model
     * @amd {pentaho.type.Factory<pentaho.visual.pivot.Model>} pentaho/visual/pivot
     */
    return Visual.extend({
      type: {
        id:   "pentaho/visual/pivot",
        v2Id: "pivot",

        view: "View",

        styleClass: "pentaho-visual-pivot",

        props: [
          {
            name: "levels",
            type: {
              base: "pentaho/visual/role/nominal"
              // props: {attributes: {isRequired: true}}
            }
          },
          {
            name: "measure",
            type: {
              base: "pentaho/visual/role/quantitative"
              // props: {attributes: {countMin: 1}}
            }
          }
        ]
      }
    })
    .implement({type: bundle.structured});
  };
});
