define([
  "pentaho/visual/base/View",
  "pentaho/i18n!view",
  "dojo/ready",
  "dojo/io-query",
  "common-ui/util/analyzer-module"
], function(Visual, bundle, ready, ioQuery, AnalyzerModule) {

  "use strict";

  /*global document:false*/

  var containerId = "pivot-container";

  var getDatasourceName = function() {
    return ioQuery.queryToObject(document.location.search)['transGraphId'];
  }

  var onAnalyzerReady = function(api, frameId) {
    // TODO: get the real fields into the analyzer pivot table
    api.report.addLayoutField( "measures", "[Measures].[Sales]", -1);
    api.report.addLayoutField( "rows", "[Markets].[Country]", -1);
  }

  var options = {
    "catalog" : "models/Model 1.xmi",
    "cube" : "Model 1",
    "url" : "http://localhost:10000/pentaho",
    "mode" : "editor",
    "parentElement" : containerId,
    "onAnalyzerReady" : onAnalyzerReady,
    "disableFilterPanel" : "true",
    "removeFieldLayout" : "true",
    "removeFieldList" : "true",
    "removeHeaderBar" : "true",
    "removeMainToolbar" : "true",
    "removeRedoButton" : "true",
    "removeReportActions" : "true",
    "removeUndoButton" : "true",
    "setFieldListView" : "true",
    "showFieldLayout" : "false",
    "showFieldList" : "false",
    "showFilterPanel" : "false",
    "showRepositoryButtons" : "false"
  };

  /**
   * @name View
   * @memberOf pentaho.visual.pivot
   * @class
   * @classDesc The `View` of the pivot table visualization.
   *
   * @description Creates a pivot table `View`.
   * @constructor
   * @param {HTMLDOMElement} element - The DOM element where the visualization should render.
   * @param {pentaho.visual.pivot.Model} model - The pivot table's visualization `Model`.
   */
  return Visual.extend(/** @lends pentaho.visual.pivot.View */{

    /** @override */
    _init: function() {
      this.base();
      var me = this;
      ready(function() {
        me._setupContainerDiv();
        me.pivot = new AnalyzerModule(options);
        me._resize();
      });
    },

    /** @override */
    _render: function() {
      this._resize();
    },

    /** @override */
    _resize: function() {
      // Center the div
      // var width  = this.model.width;
      // var height = this.model.height;
      // this._pivotContainer.style.left = ((width  - this._pivotContainer.offsetWidth ) / 2) + "px";
      // this._pivotContainer.style.top  = ((height - this._pivotContainer.offsetHeight) / 2) + "px";
    },

    /** @override */
    dispose: function() {
      this.base();

      this._pivotContainer = null;
    },

    // ---------

    _setupContainerDiv: function() {
      this._pivotContainer = document.createElement("div");

      // forcibly reset the domain to clean out the port for cross-origin scripting limitations
      // see https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#Changing_origin
      document.domain=document.domain;

      this._pivotContainer.id = containerId;
      this._element.appendChild(this._pivotContainer);
    },

  });
});
