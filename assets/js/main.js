(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var __exportStar = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    if (module && module.__esModule)
      return module;
    return __exportStar(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", {value: module, enumerable: true})), module);
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (result) => {
        return result.done ? resolve(result.value) : Promise.resolve(result.value).then(fulfilled, rejected);
      };
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/alpinejs/dist/alpine.js
  var require_alpine = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = global || self, global.Alpine = factory());
    })(exports, function() {
      "use strict";
      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          if (enumerableOnly)
            symbols = symbols.filter(function(sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
          keys.push.apply(keys, symbols);
        }
        return keys;
      }
      function _objectSpread2(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? arguments[i] : {};
          if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
              _defineProperty(target, key, source[key]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
          } else {
            ownKeys(Object(source)).forEach(function(key) {
              Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
          }
        }
        return target;
      }
      function domReady() {
        return new Promise((resolve) => {
          if (document.readyState == "loading") {
            document.addEventListener("DOMContentLoaded", resolve);
          } else {
            resolve();
          }
        });
      }
      function arrayUnique(array) {
        return Array.from(new Set(array));
      }
      function isTesting() {
        return navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom");
      }
      function checkedAttrLooseCompare(valueA, valueB) {
        return valueA == valueB;
      }
      function warnIfMalformedTemplate(el, directive) {
        if (el.tagName.toLowerCase() !== "template") {
          console.warn(`Alpine: [${directive}] directive should only be added to <template> tags. See https://github.com/alpinejs/alpine#${directive}`);
        } else if (el.content.childElementCount !== 1) {
          console.warn(`Alpine: <template> tag with [${directive}] encountered with multiple element roots. Make sure <template> only has a single child element.`);
        }
      }
      function kebabCase(subject) {
        return subject.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
      }
      function camelCase(subject) {
        return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
      }
      function walk(el, callback) {
        if (callback(el) === false)
          return;
        let node = el.firstElementChild;
        while (node) {
          walk(node, callback);
          node = node.nextElementSibling;
        }
      }
      function debounce(func, wait) {
        var timeout;
        return function() {
          var context = this, args = arguments;
          var later = function later2() {
            timeout = null;
            func.apply(context, args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
      }
      const handleError = (el, expression, error) => {
        console.warn(`Alpine Error: "${error}"

Expression: "${expression}"
Element:`, el);
        if (!isTesting()) {
          throw error;
        }
      };
      function tryCatch(cb, {
        el,
        expression
      }) {
        try {
          const value = cb();
          return value instanceof Promise ? value.catch((e) => handleError(el, expression, e)) : value;
        } catch (e) {
          handleError(el, expression, e);
        }
      }
      function saferEval(el, expression, dataContext, additionalHelperVariables = {}) {
        return tryCatch(() => {
          if (typeof expression === "function") {
            return expression.call(dataContext);
          }
          return new Function(["$data", ...Object.keys(additionalHelperVariables)], `var __alpine_result; with($data) { __alpine_result = ${expression} }; return __alpine_result`)(dataContext, ...Object.values(additionalHelperVariables));
        }, {
          el,
          expression
        });
      }
      function saferEvalNoReturn(el, expression, dataContext, additionalHelperVariables = {}) {
        return tryCatch(() => {
          if (typeof expression === "function") {
            return Promise.resolve(expression.call(dataContext, additionalHelperVariables["$event"]));
          }
          let AsyncFunction = Function;
          AsyncFunction = Object.getPrototypeOf(function() {
            return __async(this, null, function* () {
            });
          }).constructor;
          if (Object.keys(dataContext).includes(expression)) {
            let methodReference = new Function(["dataContext", ...Object.keys(additionalHelperVariables)], `with(dataContext) { return ${expression} }`)(dataContext, ...Object.values(additionalHelperVariables));
            if (typeof methodReference === "function") {
              return Promise.resolve(methodReference.call(dataContext, additionalHelperVariables["$event"]));
            } else {
              return Promise.resolve();
            }
          }
          return Promise.resolve(new AsyncFunction(["dataContext", ...Object.keys(additionalHelperVariables)], `with(dataContext) { ${expression} }`)(dataContext, ...Object.values(additionalHelperVariables)));
        }, {
          el,
          expression
        });
      }
      const xAttrRE = /^x-(on|bind|data|text|html|model|if|for|show|cloak|transition|ref|spread)\b/;
      function isXAttr(attr) {
        const name = replaceAtAndColonWithStandardSyntax(attr.name);
        return xAttrRE.test(name);
      }
      function getXAttrs(el, component, type) {
        let directives = Array.from(el.attributes).filter(isXAttr).map(parseHtmlAttribute);
        let spreadDirective = directives.filter((directive) => directive.type === "spread")[0];
        if (spreadDirective) {
          let spreadObject = saferEval(el, spreadDirective.expression, component.$data);
          directives = directives.concat(Object.entries(spreadObject).map(([name, value]) => parseHtmlAttribute({
            name,
            value
          })));
        }
        if (type)
          return directives.filter((i) => i.type === type);
        return sortDirectives(directives);
      }
      function sortDirectives(directives) {
        let directiveOrder = ["bind", "model", "show", "catch-all"];
        return directives.sort((a, b) => {
          let typeA = directiveOrder.indexOf(a.type) === -1 ? "catch-all" : a.type;
          let typeB = directiveOrder.indexOf(b.type) === -1 ? "catch-all" : b.type;
          return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
        });
      }
      function parseHtmlAttribute({
        name,
        value
      }) {
        const normalizedName = replaceAtAndColonWithStandardSyntax(name);
        const typeMatch = normalizedName.match(xAttrRE);
        const valueMatch = normalizedName.match(/:([a-zA-Z0-9\-:]+)/);
        const modifiers = normalizedName.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
        return {
          type: typeMatch ? typeMatch[1] : null,
          value: valueMatch ? valueMatch[1] : null,
          modifiers: modifiers.map((i) => i.replace(".", "")),
          expression: value
        };
      }
      function isBooleanAttr(attrName) {
        const booleanAttributes = ["disabled", "checked", "required", "readonly", "hidden", "open", "selected", "autofocus", "itemscope", "multiple", "novalidate", "allowfullscreen", "allowpaymentrequest", "formnovalidate", "autoplay", "controls", "loop", "muted", "playsinline", "default", "ismap", "reversed", "async", "defer", "nomodule"];
        return booleanAttributes.includes(attrName);
      }
      function replaceAtAndColonWithStandardSyntax(name) {
        if (name.startsWith("@")) {
          return name.replace("@", "x-on:");
        } else if (name.startsWith(":")) {
          return name.replace(":", "x-bind:");
        }
        return name;
      }
      function convertClassStringToArray(classList, filterFn = Boolean) {
        return classList.split(" ").filter(filterFn);
      }
      const TRANSITION_TYPE_IN = "in";
      const TRANSITION_TYPE_OUT = "out";
      const TRANSITION_CANCELLED = "cancelled";
      function transitionIn(el, show, reject, component, forceSkip = false) {
        if (forceSkip)
          return show();
        if (el.__x_transition && el.__x_transition.type === TRANSITION_TYPE_IN) {
          return;
        }
        const attrs = getXAttrs(el, component, "transition");
        const showAttr = getXAttrs(el, component, "show")[0];
        if (showAttr && showAttr.modifiers.includes("transition")) {
          let modifiers = showAttr.modifiers;
          if (modifiers.includes("out") && !modifiers.includes("in"))
            return show();
          const settingBothSidesOfTransition = modifiers.includes("in") && modifiers.includes("out");
          modifiers = settingBothSidesOfTransition ? modifiers.filter((i, index) => index < modifiers.indexOf("out")) : modifiers;
          transitionHelperIn(el, modifiers, show, reject);
        } else if (attrs.some((attr) => ["enter", "enter-start", "enter-end"].includes(attr.value))) {
          transitionClassesIn(el, component, attrs, show, reject);
        } else {
          show();
        }
      }
      function transitionOut(el, hide, reject, component, forceSkip = false) {
        if (forceSkip)
          return hide();
        if (el.__x_transition && el.__x_transition.type === TRANSITION_TYPE_OUT) {
          return;
        }
        const attrs = getXAttrs(el, component, "transition");
        const showAttr = getXAttrs(el, component, "show")[0];
        if (showAttr && showAttr.modifiers.includes("transition")) {
          let modifiers = showAttr.modifiers;
          if (modifiers.includes("in") && !modifiers.includes("out"))
            return hide();
          const settingBothSidesOfTransition = modifiers.includes("in") && modifiers.includes("out");
          modifiers = settingBothSidesOfTransition ? modifiers.filter((i, index) => index > modifiers.indexOf("out")) : modifiers;
          transitionHelperOut(el, modifiers, settingBothSidesOfTransition, hide, reject);
        } else if (attrs.some((attr) => ["leave", "leave-start", "leave-end"].includes(attr.value))) {
          transitionClassesOut(el, component, attrs, hide, reject);
        } else {
          hide();
        }
      }
      function transitionHelperIn(el, modifiers, showCallback, reject) {
        const styleValues = {
          duration: modifierValue(modifiers, "duration", 150),
          origin: modifierValue(modifiers, "origin", "center"),
          first: {
            opacity: 0,
            scale: modifierValue(modifiers, "scale", 95)
          },
          second: {
            opacity: 1,
            scale: 100
          }
        };
        transitionHelper(el, modifiers, showCallback, () => {
        }, reject, styleValues, TRANSITION_TYPE_IN);
      }
      function transitionHelperOut(el, modifiers, settingBothSidesOfTransition, hideCallback, reject) {
        const duration = settingBothSidesOfTransition ? modifierValue(modifiers, "duration", 150) : modifierValue(modifiers, "duration", 150) / 2;
        const styleValues = {
          duration,
          origin: modifierValue(modifiers, "origin", "center"),
          first: {
            opacity: 1,
            scale: 100
          },
          second: {
            opacity: 0,
            scale: modifierValue(modifiers, "scale", 95)
          }
        };
        transitionHelper(el, modifiers, () => {
        }, hideCallback, reject, styleValues, TRANSITION_TYPE_OUT);
      }
      function modifierValue(modifiers, key, fallback) {
        if (modifiers.indexOf(key) === -1)
          return fallback;
        const rawValue = modifiers[modifiers.indexOf(key) + 1];
        if (!rawValue)
          return fallback;
        if (key === "scale") {
          if (!isNumeric(rawValue))
            return fallback;
        }
        if (key === "duration") {
          let match = rawValue.match(/([0-9]+)ms/);
          if (match)
            return match[1];
        }
        if (key === "origin") {
          if (["top", "right", "left", "center", "bottom"].includes(modifiers[modifiers.indexOf(key) + 2])) {
            return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(" ");
          }
        }
        return rawValue;
      }
      function transitionHelper(el, modifiers, hook1, hook2, reject, styleValues, type) {
        if (el.__x_transition) {
          el.__x_transition.cancel && el.__x_transition.cancel();
        }
        const opacityCache = el.style.opacity;
        const transformCache = el.style.transform;
        const transformOriginCache = el.style.transformOrigin;
        const noModifiers = !modifiers.includes("opacity") && !modifiers.includes("scale");
        const transitionOpacity = noModifiers || modifiers.includes("opacity");
        const transitionScale = noModifiers || modifiers.includes("scale");
        const stages = {
          start() {
            if (transitionOpacity)
              el.style.opacity = styleValues.first.opacity;
            if (transitionScale)
              el.style.transform = `scale(${styleValues.first.scale / 100})`;
          },
          during() {
            if (transitionScale)
              el.style.transformOrigin = styleValues.origin;
            el.style.transitionProperty = [transitionOpacity ? `opacity` : ``, transitionScale ? `transform` : ``].join(" ").trim();
            el.style.transitionDuration = `${styleValues.duration / 1e3}s`;
            el.style.transitionTimingFunction = `cubic-bezier(0.4, 0.0, 0.2, 1)`;
          },
          show() {
            hook1();
          },
          end() {
            if (transitionOpacity)
              el.style.opacity = styleValues.second.opacity;
            if (transitionScale)
              el.style.transform = `scale(${styleValues.second.scale / 100})`;
          },
          hide() {
            hook2();
          },
          cleanup() {
            if (transitionOpacity)
              el.style.opacity = opacityCache;
            if (transitionScale)
              el.style.transform = transformCache;
            if (transitionScale)
              el.style.transformOrigin = transformOriginCache;
            el.style.transitionProperty = null;
            el.style.transitionDuration = null;
            el.style.transitionTimingFunction = null;
          }
        };
        transition(el, stages, type, reject);
      }
      const ensureStringExpression = (expression, el, component) => {
        return typeof expression === "function" ? component.evaluateReturnExpression(el, expression) : expression;
      };
      function transitionClassesIn(el, component, directives, showCallback, reject) {
        const enter = convertClassStringToArray(ensureStringExpression((directives.find((i) => i.value === "enter") || {
          expression: ""
        }).expression, el, component));
        const enterStart = convertClassStringToArray(ensureStringExpression((directives.find((i) => i.value === "enter-start") || {
          expression: ""
        }).expression, el, component));
        const enterEnd = convertClassStringToArray(ensureStringExpression((directives.find((i) => i.value === "enter-end") || {
          expression: ""
        }).expression, el, component));
        transitionClasses(el, enter, enterStart, enterEnd, showCallback, () => {
        }, TRANSITION_TYPE_IN, reject);
      }
      function transitionClassesOut(el, component, directives, hideCallback, reject) {
        const leave = convertClassStringToArray(ensureStringExpression((directives.find((i) => i.value === "leave") || {
          expression: ""
        }).expression, el, component));
        const leaveStart = convertClassStringToArray(ensureStringExpression((directives.find((i) => i.value === "leave-start") || {
          expression: ""
        }).expression, el, component));
        const leaveEnd = convertClassStringToArray(ensureStringExpression((directives.find((i) => i.value === "leave-end") || {
          expression: ""
        }).expression, el, component));
        transitionClasses(el, leave, leaveStart, leaveEnd, () => {
        }, hideCallback, TRANSITION_TYPE_OUT, reject);
      }
      function transitionClasses(el, classesDuring, classesStart, classesEnd, hook1, hook2, type, reject) {
        if (el.__x_transition) {
          el.__x_transition.cancel && el.__x_transition.cancel();
        }
        const originalClasses = el.__x_original_classes || [];
        const stages = {
          start() {
            el.classList.add(...classesStart);
          },
          during() {
            el.classList.add(...classesDuring);
          },
          show() {
            hook1();
          },
          end() {
            el.classList.remove(...classesStart.filter((i) => !originalClasses.includes(i)));
            el.classList.add(...classesEnd);
          },
          hide() {
            hook2();
          },
          cleanup() {
            el.classList.remove(...classesDuring.filter((i) => !originalClasses.includes(i)));
            el.classList.remove(...classesEnd.filter((i) => !originalClasses.includes(i)));
          }
        };
        transition(el, stages, type, reject);
      }
      function transition(el, stages, type, reject) {
        const finish = once(() => {
          stages.hide();
          if (el.isConnected) {
            stages.cleanup();
          }
          delete el.__x_transition;
        });
        el.__x_transition = {
          type,
          cancel: once(() => {
            reject(TRANSITION_CANCELLED);
            finish();
          }),
          finish,
          nextFrame: null
        };
        stages.start();
        stages.during();
        el.__x_transition.nextFrame = requestAnimationFrame(() => {
          let duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3;
          if (duration === 0) {
            duration = Number(getComputedStyle(el).animationDuration.replace("s", "")) * 1e3;
          }
          stages.show();
          el.__x_transition.nextFrame = requestAnimationFrame(() => {
            stages.end();
            setTimeout(el.__x_transition.finish, duration);
          });
        });
      }
      function isNumeric(subject) {
        return !Array.isArray(subject) && !isNaN(subject);
      }
      function once(callback) {
        let called = false;
        return function() {
          if (!called) {
            called = true;
            callback.apply(this, arguments);
          }
        };
      }
      function handleForDirective(component, templateEl, expression, initialUpdate, extraVars) {
        warnIfMalformedTemplate(templateEl, "x-for");
        let iteratorNames = typeof expression === "function" ? parseForExpression(component.evaluateReturnExpression(templateEl, expression)) : parseForExpression(expression);
        let items = evaluateItemsAndReturnEmptyIfXIfIsPresentAndFalseOnElement(component, templateEl, iteratorNames, extraVars);
        let currentEl = templateEl;
        items.forEach((item, index) => {
          let iterationScopeVariables = getIterationScopeVariables(iteratorNames, item, index, items, extraVars());
          let currentKey = generateKeyForIteration(component, templateEl, index, iterationScopeVariables);
          let nextEl = lookAheadForMatchingKeyedElementAndMoveItIfFound(currentEl.nextElementSibling, currentKey);
          if (!nextEl) {
            nextEl = addElementInLoopAfterCurrentEl(templateEl, currentEl);
            transitionIn(nextEl, () => {
            }, () => {
            }, component, initialUpdate);
            nextEl.__x_for = iterationScopeVariables;
            component.initializeElements(nextEl, () => nextEl.__x_for);
          } else {
            delete nextEl.__x_for_key;
            nextEl.__x_for = iterationScopeVariables;
            component.updateElements(nextEl, () => nextEl.__x_for);
          }
          currentEl = nextEl;
          currentEl.__x_for_key = currentKey;
        });
        removeAnyLeftOverElementsFromPreviousUpdate(currentEl, component);
      }
      function parseForExpression(expression) {
        let forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
        let stripParensRE = /^\(|\)$/g;
        let forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
        let inMatch = expression.match(forAliasRE);
        if (!inMatch)
          return;
        let res = {};
        res.items = inMatch[2].trim();
        let item = inMatch[1].trim().replace(stripParensRE, "");
        let iteratorMatch = item.match(forIteratorRE);
        if (iteratorMatch) {
          res.item = item.replace(forIteratorRE, "").trim();
          res.index = iteratorMatch[1].trim();
          if (iteratorMatch[2]) {
            res.collection = iteratorMatch[2].trim();
          }
        } else {
          res.item = item;
        }
        return res;
      }
      function getIterationScopeVariables(iteratorNames, item, index, items, extraVars) {
        let scopeVariables = extraVars ? _objectSpread2({}, extraVars) : {};
        scopeVariables[iteratorNames.item] = item;
        if (iteratorNames.index)
          scopeVariables[iteratorNames.index] = index;
        if (iteratorNames.collection)
          scopeVariables[iteratorNames.collection] = items;
        return scopeVariables;
      }
      function generateKeyForIteration(component, el, index, iterationScopeVariables) {
        let bindKeyAttribute = getXAttrs(el, component, "bind").filter((attr) => attr.value === "key")[0];
        if (!bindKeyAttribute)
          return index;
        return component.evaluateReturnExpression(el, bindKeyAttribute.expression, () => iterationScopeVariables);
      }
      function evaluateItemsAndReturnEmptyIfXIfIsPresentAndFalseOnElement(component, el, iteratorNames, extraVars) {
        let ifAttribute = getXAttrs(el, component, "if")[0];
        if (ifAttribute && !component.evaluateReturnExpression(el, ifAttribute.expression)) {
          return [];
        }
        let items = component.evaluateReturnExpression(el, iteratorNames.items, extraVars);
        if (isNumeric(items) && items > 0) {
          items = Array.from(Array(items).keys(), (i) => i + 1);
        }
        return items;
      }
      function addElementInLoopAfterCurrentEl(templateEl, currentEl) {
        let clone = document.importNode(templateEl.content, true);
        currentEl.parentElement.insertBefore(clone, currentEl.nextElementSibling);
        return currentEl.nextElementSibling;
      }
      function lookAheadForMatchingKeyedElementAndMoveItIfFound(nextEl, currentKey) {
        if (!nextEl)
          return;
        if (nextEl.__x_for_key === void 0)
          return;
        if (nextEl.__x_for_key === currentKey)
          return nextEl;
        let tmpNextEl = nextEl;
        while (tmpNextEl) {
          if (tmpNextEl.__x_for_key === currentKey) {
            return tmpNextEl.parentElement.insertBefore(tmpNextEl, nextEl);
          }
          tmpNextEl = tmpNextEl.nextElementSibling && tmpNextEl.nextElementSibling.__x_for_key !== void 0 ? tmpNextEl.nextElementSibling : false;
        }
      }
      function removeAnyLeftOverElementsFromPreviousUpdate(currentEl, component) {
        var nextElementFromOldLoop = currentEl.nextElementSibling && currentEl.nextElementSibling.__x_for_key !== void 0 ? currentEl.nextElementSibling : false;
        while (nextElementFromOldLoop) {
          let nextElementFromOldLoopImmutable = nextElementFromOldLoop;
          let nextSibling = nextElementFromOldLoop.nextElementSibling;
          transitionOut(nextElementFromOldLoop, () => {
            nextElementFromOldLoopImmutable.remove();
          }, () => {
          }, component);
          nextElementFromOldLoop = nextSibling && nextSibling.__x_for_key !== void 0 ? nextSibling : false;
        }
      }
      function handleAttributeBindingDirective(component, el, attrName, expression, extraVars, attrType, modifiers) {
        var value = component.evaluateReturnExpression(el, expression, extraVars);
        if (attrName === "value") {
          if (Alpine.ignoreFocusedForValueBinding && document.activeElement.isSameNode(el))
            return;
          if (value === void 0 && expression.match(/\./)) {
            value = "";
          }
          if (el.type === "radio") {
            if (el.attributes.value === void 0 && attrType === "bind") {
              el.value = value;
            } else if (attrType !== "bind") {
              el.checked = checkedAttrLooseCompare(el.value, value);
            }
          } else if (el.type === "checkbox") {
            if (typeof value !== "boolean" && ![null, void 0].includes(value) && attrType === "bind") {
              el.value = String(value);
            } else if (attrType !== "bind") {
              if (Array.isArray(value)) {
                el.checked = value.some((val) => checkedAttrLooseCompare(val, el.value));
              } else {
                el.checked = !!value;
              }
            }
          } else if (el.tagName === "SELECT") {
            updateSelect(el, value);
          } else {
            if (el.value === value)
              return;
            el.value = value;
          }
        } else if (attrName === "class") {
          if (Array.isArray(value)) {
            const originalClasses = el.__x_original_classes || [];
            el.setAttribute("class", arrayUnique(originalClasses.concat(value)).join(" "));
          } else if (typeof value === "object") {
            const keysSortedByBooleanValue = Object.keys(value).sort((a, b) => value[a] - value[b]);
            keysSortedByBooleanValue.forEach((classNames) => {
              if (value[classNames]) {
                convertClassStringToArray(classNames).forEach((className) => el.classList.add(className));
              } else {
                convertClassStringToArray(classNames).forEach((className) => el.classList.remove(className));
              }
            });
          } else {
            const originalClasses = el.__x_original_classes || [];
            const newClasses = value ? convertClassStringToArray(value) : [];
            el.setAttribute("class", arrayUnique(originalClasses.concat(newClasses)).join(" "));
          }
        } else {
          attrName = modifiers.includes("camel") ? camelCase(attrName) : attrName;
          if ([null, void 0, false].includes(value)) {
            el.removeAttribute(attrName);
          } else {
            isBooleanAttr(attrName) ? setIfChanged(el, attrName, attrName) : setIfChanged(el, attrName, value);
          }
        }
      }
      function setIfChanged(el, attrName, value) {
        if (el.getAttribute(attrName) != value) {
          el.setAttribute(attrName, value);
        }
      }
      function updateSelect(el, value) {
        const arrayWrappedValue = [].concat(value).map((value2) => {
          return value2 + "";
        });
        Array.from(el.options).forEach((option) => {
          option.selected = arrayWrappedValue.includes(option.value || option.text);
        });
      }
      function handleTextDirective(el, output, expression) {
        if (output === void 0 && expression.match(/\./)) {
          output = "";
        }
        el.textContent = output;
      }
      function handleHtmlDirective(component, el, expression, extraVars) {
        el.innerHTML = component.evaluateReturnExpression(el, expression, extraVars);
      }
      function handleShowDirective(component, el, value, modifiers, initialUpdate = false) {
        const hide = () => {
          el.style.display = "none";
          el.__x_is_shown = false;
        };
        const show = () => {
          if (el.style.length === 1 && el.style.display === "none") {
            el.removeAttribute("style");
          } else {
            el.style.removeProperty("display");
          }
          el.__x_is_shown = true;
        };
        if (initialUpdate === true) {
          if (value) {
            show();
          } else {
            hide();
          }
          return;
        }
        const handle = (resolve, reject) => {
          if (value) {
            if (el.style.display === "none" || el.__x_transition) {
              transitionIn(el, () => {
                show();
              }, reject, component);
            }
            resolve(() => {
            });
          } else {
            if (el.style.display !== "none") {
              transitionOut(el, () => {
                resolve(() => {
                  hide();
                });
              }, reject, component);
            } else {
              resolve(() => {
              });
            }
          }
        };
        if (modifiers.includes("immediate")) {
          handle((finish) => finish(), () => {
          });
          return;
        }
        if (component.showDirectiveLastElement && !component.showDirectiveLastElement.contains(el)) {
          component.executeAndClearRemainingShowDirectiveStack();
        }
        component.showDirectiveStack.push(handle);
        component.showDirectiveLastElement = el;
      }
      function handleIfDirective(component, el, expressionResult, initialUpdate, extraVars) {
        warnIfMalformedTemplate(el, "x-if");
        const elementHasAlreadyBeenAdded = el.nextElementSibling && el.nextElementSibling.__x_inserted_me === true;
        if (expressionResult && (!elementHasAlreadyBeenAdded || el.__x_transition)) {
          const clone = document.importNode(el.content, true);
          el.parentElement.insertBefore(clone, el.nextElementSibling);
          transitionIn(el.nextElementSibling, () => {
          }, () => {
          }, component, initialUpdate);
          component.initializeElements(el.nextElementSibling, extraVars);
          el.nextElementSibling.__x_inserted_me = true;
        } else if (!expressionResult && elementHasAlreadyBeenAdded) {
          transitionOut(el.nextElementSibling, () => {
            el.nextElementSibling.remove();
          }, () => {
          }, component, initialUpdate);
        }
      }
      function registerListener(component, el, event, modifiers, expression, extraVars = {}) {
        const options = {
          passive: modifiers.includes("passive")
        };
        if (modifiers.includes("camel")) {
          event = camelCase(event);
        }
        if (modifiers.includes("away")) {
          let handler = (e) => {
            if (el.contains(e.target))
              return;
            if (el.offsetWidth < 1 && el.offsetHeight < 1)
              return;
            runListenerHandler(component, expression, e, extraVars);
            if (modifiers.includes("once")) {
              document.removeEventListener(event, handler, options);
            }
          };
          document.addEventListener(event, handler, options);
        } else {
          let listenerTarget = modifiers.includes("window") ? window : modifiers.includes("document") ? document : el;
          let handler = (e) => {
            if (listenerTarget === window || listenerTarget === document) {
              if (!document.body.contains(el)) {
                listenerTarget.removeEventListener(event, handler, options);
                return;
              }
            }
            if (isKeyEvent(event)) {
              if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) {
                return;
              }
            }
            if (modifiers.includes("prevent"))
              e.preventDefault();
            if (modifiers.includes("stop"))
              e.stopPropagation();
            if (!modifiers.includes("self") || e.target === el) {
              const returnValue = runListenerHandler(component, expression, e, extraVars);
              returnValue.then((value) => {
                if (value === false) {
                  e.preventDefault();
                } else {
                  if (modifiers.includes("once")) {
                    listenerTarget.removeEventListener(event, handler, options);
                  }
                }
              });
            }
          };
          if (modifiers.includes("debounce")) {
            let nextModifier = modifiers[modifiers.indexOf("debounce") + 1] || "invalid-wait";
            let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
            handler = debounce(handler, wait);
          }
          listenerTarget.addEventListener(event, handler, options);
        }
      }
      function runListenerHandler(component, expression, e, extraVars) {
        return component.evaluateCommandExpression(e.target, expression, () => {
          return _objectSpread2(_objectSpread2({}, extraVars()), {}, {
            $event: e
          });
        });
      }
      function isKeyEvent(event) {
        return ["keydown", "keyup"].includes(event);
      }
      function isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers) {
        let keyModifiers = modifiers.filter((i) => {
          return !["window", "document", "prevent", "stop"].includes(i);
        });
        if (keyModifiers.includes("debounce")) {
          let debounceIndex = keyModifiers.indexOf("debounce");
          keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
        }
        if (keyModifiers.length === 0)
          return false;
        if (keyModifiers.length === 1 && keyModifiers[0] === keyToModifier(e.key))
          return false;
        const systemKeyModifiers = ["ctrl", "shift", "alt", "meta", "cmd", "super"];
        const selectedSystemKeyModifiers = systemKeyModifiers.filter((modifier) => keyModifiers.includes(modifier));
        keyModifiers = keyModifiers.filter((i) => !selectedSystemKeyModifiers.includes(i));
        if (selectedSystemKeyModifiers.length > 0) {
          const activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter((modifier) => {
            if (modifier === "cmd" || modifier === "super")
              modifier = "meta";
            return e[`${modifier}Key`];
          });
          if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
            if (keyModifiers[0] === keyToModifier(e.key))
              return false;
          }
        }
        return true;
      }
      function keyToModifier(key) {
        switch (key) {
          case "/":
            return "slash";
          case " ":
          case "Spacebar":
            return "space";
          default:
            return key && kebabCase(key);
        }
      }
      function registerModelListener(component, el, modifiers, expression, extraVars) {
        var event = el.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(el.type) || modifiers.includes("lazy") ? "change" : "input";
        const listenerExpression = `${expression} = rightSideOfExpression($event, ${expression})`;
        registerListener(component, el, event, modifiers, listenerExpression, () => {
          return _objectSpread2(_objectSpread2({}, extraVars()), {}, {
            rightSideOfExpression: generateModelAssignmentFunction(el, modifiers, expression)
          });
        });
      }
      function generateModelAssignmentFunction(el, modifiers, expression) {
        if (el.type === "radio") {
          if (!el.hasAttribute("name"))
            el.setAttribute("name", expression);
        }
        return (event, currentValue) => {
          if (event instanceof CustomEvent && event.detail) {
            return event.detail;
          } else if (el.type === "checkbox") {
            if (Array.isArray(currentValue)) {
              const newValue = modifiers.includes("number") ? safeParseNumber(event.target.value) : event.target.value;
              return event.target.checked ? currentValue.concat([newValue]) : currentValue.filter((el2) => !checkedAttrLooseCompare(el2, newValue));
            } else {
              return event.target.checked;
            }
          } else if (el.tagName.toLowerCase() === "select" && el.multiple) {
            return modifiers.includes("number") ? Array.from(event.target.selectedOptions).map((option) => {
              const rawValue = option.value || option.text;
              return safeParseNumber(rawValue);
            }) : Array.from(event.target.selectedOptions).map((option) => {
              return option.value || option.text;
            });
          } else {
            const rawValue = event.target.value;
            return modifiers.includes("number") ? safeParseNumber(rawValue) : modifiers.includes("trim") ? rawValue.trim() : rawValue;
          }
        };
      }
      function safeParseNumber(rawValue) {
        const number = rawValue ? parseFloat(rawValue) : null;
        return isNumeric(number) ? number : rawValue;
      }
      const {isArray} = Array;
      const {getPrototypeOf, create: ObjectCreate, defineProperty: ObjectDefineProperty, defineProperties: ObjectDefineProperties, isExtensible, getOwnPropertyDescriptor, getOwnPropertyNames, getOwnPropertySymbols, preventExtensions, hasOwnProperty} = Object;
      const {push: ArrayPush, concat: ArrayConcat, map: ArrayMap} = Array.prototype;
      function isUndefined(obj) {
        return obj === void 0;
      }
      function isFunction(obj) {
        return typeof obj === "function";
      }
      function isObject(obj) {
        return typeof obj === "object";
      }
      const proxyToValueMap = new WeakMap();
      function registerProxy(proxy, value) {
        proxyToValueMap.set(proxy, value);
      }
      const unwrap = (replicaOrAny) => proxyToValueMap.get(replicaOrAny) || replicaOrAny;
      function wrapValue(membrane, value) {
        return membrane.valueIsObservable(value) ? membrane.getProxy(value) : value;
      }
      function unwrapDescriptor(descriptor) {
        if (hasOwnProperty.call(descriptor, "value")) {
          descriptor.value = unwrap(descriptor.value);
        }
        return descriptor;
      }
      function lockShadowTarget(membrane, shadowTarget, originalTarget) {
        const targetKeys = ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
        targetKeys.forEach((key) => {
          let descriptor = getOwnPropertyDescriptor(originalTarget, key);
          if (!descriptor.configurable) {
            descriptor = wrapDescriptor(membrane, descriptor, wrapValue);
          }
          ObjectDefineProperty(shadowTarget, key, descriptor);
        });
        preventExtensions(shadowTarget);
      }
      class ReactiveProxyHandler {
        constructor(membrane, value) {
          this.originalTarget = value;
          this.membrane = membrane;
        }
        get(shadowTarget, key) {
          const {originalTarget, membrane} = this;
          const value = originalTarget[key];
          const {valueObserved} = membrane;
          valueObserved(originalTarget, key);
          return membrane.getProxy(value);
        }
        set(shadowTarget, key, value) {
          const {originalTarget, membrane: {valueMutated}} = this;
          const oldValue = originalTarget[key];
          if (oldValue !== value) {
            originalTarget[key] = value;
            valueMutated(originalTarget, key);
          } else if (key === "length" && isArray(originalTarget)) {
            valueMutated(originalTarget, key);
          }
          return true;
        }
        deleteProperty(shadowTarget, key) {
          const {originalTarget, membrane: {valueMutated}} = this;
          delete originalTarget[key];
          valueMutated(originalTarget, key);
          return true;
        }
        apply(shadowTarget, thisArg, argArray) {
        }
        construct(target, argArray, newTarget) {
        }
        has(shadowTarget, key) {
          const {originalTarget, membrane: {valueObserved}} = this;
          valueObserved(originalTarget, key);
          return key in originalTarget;
        }
        ownKeys(shadowTarget) {
          const {originalTarget} = this;
          return ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
        }
        isExtensible(shadowTarget) {
          const shadowIsExtensible = isExtensible(shadowTarget);
          if (!shadowIsExtensible) {
            return shadowIsExtensible;
          }
          const {originalTarget, membrane} = this;
          const targetIsExtensible = isExtensible(originalTarget);
          if (!targetIsExtensible) {
            lockShadowTarget(membrane, shadowTarget, originalTarget);
          }
          return targetIsExtensible;
        }
        setPrototypeOf(shadowTarget, prototype) {
        }
        getPrototypeOf(shadowTarget) {
          const {originalTarget} = this;
          return getPrototypeOf(originalTarget);
        }
        getOwnPropertyDescriptor(shadowTarget, key) {
          const {originalTarget, membrane} = this;
          const {valueObserved} = this.membrane;
          valueObserved(originalTarget, key);
          let desc = getOwnPropertyDescriptor(originalTarget, key);
          if (isUndefined(desc)) {
            return desc;
          }
          const shadowDescriptor = getOwnPropertyDescriptor(shadowTarget, key);
          if (!isUndefined(shadowDescriptor)) {
            return shadowDescriptor;
          }
          desc = wrapDescriptor(membrane, desc, wrapValue);
          if (!desc.configurable) {
            ObjectDefineProperty(shadowTarget, key, desc);
          }
          return desc;
        }
        preventExtensions(shadowTarget) {
          const {originalTarget, membrane} = this;
          lockShadowTarget(membrane, shadowTarget, originalTarget);
          preventExtensions(originalTarget);
          return true;
        }
        defineProperty(shadowTarget, key, descriptor) {
          const {originalTarget, membrane} = this;
          const {valueMutated} = membrane;
          const {configurable} = descriptor;
          if (hasOwnProperty.call(descriptor, "writable") && !hasOwnProperty.call(descriptor, "value")) {
            const originalDescriptor = getOwnPropertyDescriptor(originalTarget, key);
            descriptor.value = originalDescriptor.value;
          }
          ObjectDefineProperty(originalTarget, key, unwrapDescriptor(descriptor));
          if (configurable === false) {
            ObjectDefineProperty(shadowTarget, key, wrapDescriptor(membrane, descriptor, wrapValue));
          }
          valueMutated(originalTarget, key);
          return true;
        }
      }
      function wrapReadOnlyValue(membrane, value) {
        return membrane.valueIsObservable(value) ? membrane.getReadOnlyProxy(value) : value;
      }
      class ReadOnlyHandler {
        constructor(membrane, value) {
          this.originalTarget = value;
          this.membrane = membrane;
        }
        get(shadowTarget, key) {
          const {membrane, originalTarget} = this;
          const value = originalTarget[key];
          const {valueObserved} = membrane;
          valueObserved(originalTarget, key);
          return membrane.getReadOnlyProxy(value);
        }
        set(shadowTarget, key, value) {
          return false;
        }
        deleteProperty(shadowTarget, key) {
          return false;
        }
        apply(shadowTarget, thisArg, argArray) {
        }
        construct(target, argArray, newTarget) {
        }
        has(shadowTarget, key) {
          const {originalTarget, membrane: {valueObserved}} = this;
          valueObserved(originalTarget, key);
          return key in originalTarget;
        }
        ownKeys(shadowTarget) {
          const {originalTarget} = this;
          return ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
        }
        setPrototypeOf(shadowTarget, prototype) {
        }
        getOwnPropertyDescriptor(shadowTarget, key) {
          const {originalTarget, membrane} = this;
          const {valueObserved} = membrane;
          valueObserved(originalTarget, key);
          let desc = getOwnPropertyDescriptor(originalTarget, key);
          if (isUndefined(desc)) {
            return desc;
          }
          const shadowDescriptor = getOwnPropertyDescriptor(shadowTarget, key);
          if (!isUndefined(shadowDescriptor)) {
            return shadowDescriptor;
          }
          desc = wrapDescriptor(membrane, desc, wrapReadOnlyValue);
          if (hasOwnProperty.call(desc, "set")) {
            desc.set = void 0;
          }
          if (!desc.configurable) {
            ObjectDefineProperty(shadowTarget, key, desc);
          }
          return desc;
        }
        preventExtensions(shadowTarget) {
          return false;
        }
        defineProperty(shadowTarget, key, descriptor) {
          return false;
        }
      }
      function createShadowTarget(value) {
        let shadowTarget = void 0;
        if (isArray(value)) {
          shadowTarget = [];
        } else if (isObject(value)) {
          shadowTarget = {};
        }
        return shadowTarget;
      }
      const ObjectDotPrototype = Object.prototype;
      function defaultValueIsObservable(value) {
        if (value === null) {
          return false;
        }
        if (typeof value !== "object") {
          return false;
        }
        if (isArray(value)) {
          return true;
        }
        const proto = getPrototypeOf(value);
        return proto === ObjectDotPrototype || proto === null || getPrototypeOf(proto) === null;
      }
      const defaultValueObserved = (obj, key) => {
      };
      const defaultValueMutated = (obj, key) => {
      };
      const defaultValueDistortion = (value) => value;
      function wrapDescriptor(membrane, descriptor, getValue) {
        const {set, get} = descriptor;
        if (hasOwnProperty.call(descriptor, "value")) {
          descriptor.value = getValue(membrane, descriptor.value);
        } else {
          if (!isUndefined(get)) {
            descriptor.get = function() {
              return getValue(membrane, get.call(unwrap(this)));
            };
          }
          if (!isUndefined(set)) {
            descriptor.set = function(value) {
              set.call(unwrap(this), membrane.unwrapProxy(value));
            };
          }
        }
        return descriptor;
      }
      class ReactiveMembrane {
        constructor(options) {
          this.valueDistortion = defaultValueDistortion;
          this.valueMutated = defaultValueMutated;
          this.valueObserved = defaultValueObserved;
          this.valueIsObservable = defaultValueIsObservable;
          this.objectGraph = new WeakMap();
          if (!isUndefined(options)) {
            const {valueDistortion, valueMutated, valueObserved, valueIsObservable} = options;
            this.valueDistortion = isFunction(valueDistortion) ? valueDistortion : defaultValueDistortion;
            this.valueMutated = isFunction(valueMutated) ? valueMutated : defaultValueMutated;
            this.valueObserved = isFunction(valueObserved) ? valueObserved : defaultValueObserved;
            this.valueIsObservable = isFunction(valueIsObservable) ? valueIsObservable : defaultValueIsObservable;
          }
        }
        getProxy(value) {
          const unwrappedValue = unwrap(value);
          const distorted = this.valueDistortion(unwrappedValue);
          if (this.valueIsObservable(distorted)) {
            const o = this.getReactiveState(unwrappedValue, distorted);
            return o.readOnly === value ? value : o.reactive;
          }
          return distorted;
        }
        getReadOnlyProxy(value) {
          value = unwrap(value);
          const distorted = this.valueDistortion(value);
          if (this.valueIsObservable(distorted)) {
            return this.getReactiveState(value, distorted).readOnly;
          }
          return distorted;
        }
        unwrapProxy(p) {
          return unwrap(p);
        }
        getReactiveState(value, distortedValue) {
          const {objectGraph} = this;
          let reactiveState = objectGraph.get(distortedValue);
          if (reactiveState) {
            return reactiveState;
          }
          const membrane = this;
          reactiveState = {
            get reactive() {
              const reactiveHandler = new ReactiveProxyHandler(membrane, distortedValue);
              const proxy = new Proxy(createShadowTarget(distortedValue), reactiveHandler);
              registerProxy(proxy, value);
              ObjectDefineProperty(this, "reactive", {value: proxy});
              return proxy;
            },
            get readOnly() {
              const readOnlyHandler = new ReadOnlyHandler(membrane, distortedValue);
              const proxy = new Proxy(createShadowTarget(distortedValue), readOnlyHandler);
              registerProxy(proxy, value);
              ObjectDefineProperty(this, "readOnly", {value: proxy});
              return proxy;
            }
          };
          objectGraph.set(distortedValue, reactiveState);
          return reactiveState;
        }
      }
      function wrap(data, mutationCallback) {
        let membrane = new ReactiveMembrane({
          valueMutated(target, key) {
            mutationCallback(target, key);
          }
        });
        return {
          data: membrane.getProxy(data),
          membrane
        };
      }
      function unwrap$1(membrane, observable) {
        let unwrappedData = membrane.unwrapProxy(observable);
        let copy = {};
        Object.keys(unwrappedData).forEach((key) => {
          if (["$el", "$refs", "$nextTick", "$watch"].includes(key))
            return;
          copy[key] = unwrappedData[key];
        });
        return copy;
      }
      class Component {
        constructor(el, componentForClone = null) {
          this.$el = el;
          const dataAttr = this.$el.getAttribute("x-data");
          const dataExpression = dataAttr === "" ? "{}" : dataAttr;
          const initExpression = this.$el.getAttribute("x-init");
          let dataExtras = {
            $el: this.$el
          };
          let canonicalComponentElementReference = componentForClone ? componentForClone.$el : this.$el;
          Object.entries(Alpine.magicProperties).forEach(([name, callback]) => {
            Object.defineProperty(dataExtras, `$${name}`, {
              get: function get() {
                return callback(canonicalComponentElementReference);
              }
            });
          });
          this.unobservedData = componentForClone ? componentForClone.getUnobservedData() : saferEval(el, dataExpression, dataExtras);
          let {
            membrane,
            data
          } = this.wrapDataInObservable(this.unobservedData);
          this.$data = data;
          this.membrane = membrane;
          this.unobservedData.$el = this.$el;
          this.unobservedData.$refs = this.getRefsProxy();
          this.nextTickStack = [];
          this.unobservedData.$nextTick = (callback) => {
            this.nextTickStack.push(callback);
          };
          this.watchers = {};
          this.unobservedData.$watch = (property, callback) => {
            if (!this.watchers[property])
              this.watchers[property] = [];
            this.watchers[property].push(callback);
          };
          Object.entries(Alpine.magicProperties).forEach(([name, callback]) => {
            Object.defineProperty(this.unobservedData, `$${name}`, {
              get: function get() {
                return callback(canonicalComponentElementReference, this.$el);
              }
            });
          });
          this.showDirectiveStack = [];
          this.showDirectiveLastElement;
          componentForClone || Alpine.onBeforeComponentInitializeds.forEach((callback) => callback(this));
          var initReturnedCallback;
          if (initExpression && !componentForClone) {
            this.pauseReactivity = true;
            initReturnedCallback = this.evaluateReturnExpression(this.$el, initExpression);
            this.pauseReactivity = false;
          }
          this.initializeElements(this.$el);
          this.listenForNewElementsToInitialize();
          if (typeof initReturnedCallback === "function") {
            initReturnedCallback.call(this.$data);
          }
          componentForClone || setTimeout(() => {
            Alpine.onComponentInitializeds.forEach((callback) => callback(this));
          }, 0);
        }
        getUnobservedData() {
          return unwrap$1(this.membrane, this.$data);
        }
        wrapDataInObservable(data) {
          var self2 = this;
          let updateDom = debounce(function() {
            self2.updateElements(self2.$el);
          }, 0);
          return wrap(data, (target, key) => {
            if (self2.watchers[key]) {
              self2.watchers[key].forEach((callback) => callback(target[key]));
            } else if (Array.isArray(target)) {
              Object.keys(self2.watchers).forEach((fullDotNotationKey) => {
                let dotNotationParts = fullDotNotationKey.split(".");
                if (key === "length")
                  return;
                dotNotationParts.reduce((comparisonData, part) => {
                  if (Object.is(target, comparisonData[part])) {
                    self2.watchers[fullDotNotationKey].forEach((callback) => callback(target));
                  }
                  return comparisonData[part];
                }, self2.unobservedData);
              });
            } else {
              Object.keys(self2.watchers).filter((i) => i.includes(".")).forEach((fullDotNotationKey) => {
                let dotNotationParts = fullDotNotationKey.split(".");
                if (key !== dotNotationParts[dotNotationParts.length - 1])
                  return;
                dotNotationParts.reduce((comparisonData, part) => {
                  if (Object.is(target, comparisonData)) {
                    self2.watchers[fullDotNotationKey].forEach((callback) => callback(target[key]));
                  }
                  return comparisonData[part];
                }, self2.unobservedData);
              });
            }
            if (self2.pauseReactivity)
              return;
            updateDom();
          });
        }
        walkAndSkipNestedComponents(el, callback, initializeComponentCallback = () => {
        }) {
          walk(el, (el2) => {
            if (el2.hasAttribute("x-data")) {
              if (!el2.isSameNode(this.$el)) {
                if (!el2.__x)
                  initializeComponentCallback(el2);
                return false;
              }
            }
            return callback(el2);
          });
        }
        initializeElements(rootEl, extraVars = () => {
        }) {
          this.walkAndSkipNestedComponents(rootEl, (el) => {
            if (el.__x_for_key !== void 0)
              return false;
            if (el.__x_inserted_me !== void 0)
              return false;
            this.initializeElement(el, extraVars);
          }, (el) => {
            el.__x = new Component(el);
          });
          this.executeAndClearRemainingShowDirectiveStack();
          this.executeAndClearNextTickStack(rootEl);
        }
        initializeElement(el, extraVars) {
          if (el.hasAttribute("class") && getXAttrs(el, this).length > 0) {
            el.__x_original_classes = convertClassStringToArray(el.getAttribute("class"));
          }
          this.registerListeners(el, extraVars);
          this.resolveBoundAttributes(el, true, extraVars);
        }
        updateElements(rootEl, extraVars = () => {
        }) {
          this.walkAndSkipNestedComponents(rootEl, (el) => {
            if (el.__x_for_key !== void 0 && !el.isSameNode(this.$el))
              return false;
            this.updateElement(el, extraVars);
          }, (el) => {
            el.__x = new Component(el);
          });
          this.executeAndClearRemainingShowDirectiveStack();
          this.executeAndClearNextTickStack(rootEl);
        }
        executeAndClearNextTickStack(el) {
          if (el === this.$el && this.nextTickStack.length > 0) {
            requestAnimationFrame(() => {
              while (this.nextTickStack.length > 0) {
                this.nextTickStack.shift()();
              }
            });
          }
        }
        executeAndClearRemainingShowDirectiveStack() {
          this.showDirectiveStack.reverse().map((handler) => {
            return new Promise((resolve, reject) => {
              handler(resolve, reject);
            });
          }).reduce((promiseChain, promise) => {
            return promiseChain.then(() => {
              return promise.then((finishElement) => {
                finishElement();
              });
            });
          }, Promise.resolve(() => {
          })).catch((e) => {
            if (e !== TRANSITION_CANCELLED)
              throw e;
          });
          this.showDirectiveStack = [];
          this.showDirectiveLastElement = void 0;
        }
        updateElement(el, extraVars) {
          this.resolveBoundAttributes(el, false, extraVars);
        }
        registerListeners(el, extraVars) {
          getXAttrs(el, this).forEach(({
            type,
            value,
            modifiers,
            expression
          }) => {
            switch (type) {
              case "on":
                registerListener(this, el, value, modifiers, expression, extraVars);
                break;
              case "model":
                registerModelListener(this, el, modifiers, expression, extraVars);
                break;
            }
          });
        }
        resolveBoundAttributes(el, initialUpdate = false, extraVars) {
          let attrs = getXAttrs(el, this);
          attrs.forEach(({
            type,
            value,
            modifiers,
            expression
          }) => {
            switch (type) {
              case "model":
                handleAttributeBindingDirective(this, el, "value", expression, extraVars, type, modifiers);
                break;
              case "bind":
                if (el.tagName.toLowerCase() === "template" && value === "key")
                  return;
                handleAttributeBindingDirective(this, el, value, expression, extraVars, type, modifiers);
                break;
              case "text":
                var output = this.evaluateReturnExpression(el, expression, extraVars);
                handleTextDirective(el, output, expression);
                break;
              case "html":
                handleHtmlDirective(this, el, expression, extraVars);
                break;
              case "show":
                var output = this.evaluateReturnExpression(el, expression, extraVars);
                handleShowDirective(this, el, output, modifiers, initialUpdate);
                break;
              case "if":
                if (attrs.some((i) => i.type === "for"))
                  return;
                var output = this.evaluateReturnExpression(el, expression, extraVars);
                handleIfDirective(this, el, output, initialUpdate, extraVars);
                break;
              case "for":
                handleForDirective(this, el, expression, initialUpdate, extraVars);
                break;
              case "cloak":
                el.removeAttribute("x-cloak");
                break;
            }
          });
        }
        evaluateReturnExpression(el, expression, extraVars = () => {
        }) {
          return saferEval(el, expression, this.$data, _objectSpread2(_objectSpread2({}, extraVars()), {}, {
            $dispatch: this.getDispatchFunction(el)
          }));
        }
        evaluateCommandExpression(el, expression, extraVars = () => {
        }) {
          return saferEvalNoReturn(el, expression, this.$data, _objectSpread2(_objectSpread2({}, extraVars()), {}, {
            $dispatch: this.getDispatchFunction(el)
          }));
        }
        getDispatchFunction(el) {
          return (event, detail = {}) => {
            el.dispatchEvent(new CustomEvent(event, {
              detail,
              bubbles: true
            }));
          };
        }
        listenForNewElementsToInitialize() {
          const targetNode = this.$el;
          const observerOptions = {
            childList: true,
            attributes: true,
            subtree: true
          };
          const observer = new MutationObserver((mutations) => {
            for (let i = 0; i < mutations.length; i++) {
              const closestParentComponent = mutations[i].target.closest("[x-data]");
              if (!(closestParentComponent && closestParentComponent.isSameNode(this.$el)))
                continue;
              if (mutations[i].type === "attributes" && mutations[i].attributeName === "x-data") {
                const xAttr = mutations[i].target.getAttribute("x-data") || "{}";
                const rawData = saferEval(this.$el, xAttr, {
                  $el: this.$el
                });
                Object.keys(rawData).forEach((key) => {
                  if (this.$data[key] !== rawData[key]) {
                    this.$data[key] = rawData[key];
                  }
                });
              }
              if (mutations[i].addedNodes.length > 0) {
                mutations[i].addedNodes.forEach((node) => {
                  if (node.nodeType !== 1 || node.__x_inserted_me)
                    return;
                  if (node.matches("[x-data]") && !node.__x) {
                    node.__x = new Component(node);
                    return;
                  }
                  this.initializeElements(node);
                });
              }
            }
          });
          observer.observe(targetNode, observerOptions);
        }
        getRefsProxy() {
          var self2 = this;
          var refObj = {};
          return new Proxy(refObj, {
            get(object, property) {
              if (property === "$isAlpineProxy")
                return true;
              var ref;
              self2.walkAndSkipNestedComponents(self2.$el, (el) => {
                if (el.hasAttribute("x-ref") && el.getAttribute("x-ref") === property) {
                  ref = el;
                }
              });
              return ref;
            }
          });
        }
      }
      const Alpine = {
        version: "2.8.0",
        pauseMutationObserver: false,
        magicProperties: {},
        onComponentInitializeds: [],
        onBeforeComponentInitializeds: [],
        ignoreFocusedForValueBinding: false,
        start: function start() {
          return __async(this, null, function* () {
            if (!isTesting()) {
              yield domReady();
            }
            this.discoverComponents((el) => {
              this.initializeComponent(el);
            });
            document.addEventListener("turbolinks:load", () => {
              this.discoverUninitializedComponents((el) => {
                this.initializeComponent(el);
              });
            });
            this.listenForNewUninitializedComponentsAtRunTime();
          });
        },
        discoverComponents: function discoverComponents(callback) {
          const rootEls = document.querySelectorAll("[x-data]");
          rootEls.forEach((rootEl) => {
            callback(rootEl);
          });
        },
        discoverUninitializedComponents: function discoverUninitializedComponents(callback, el = null) {
          const rootEls = (el || document).querySelectorAll("[x-data]");
          Array.from(rootEls).filter((el2) => el2.__x === void 0).forEach((rootEl) => {
            callback(rootEl);
          });
        },
        listenForNewUninitializedComponentsAtRunTime: function listenForNewUninitializedComponentsAtRunTime() {
          const targetNode = document.querySelector("body");
          const observerOptions = {
            childList: true,
            attributes: true,
            subtree: true
          };
          const observer = new MutationObserver((mutations) => {
            if (this.pauseMutationObserver)
              return;
            for (let i = 0; i < mutations.length; i++) {
              if (mutations[i].addedNodes.length > 0) {
                mutations[i].addedNodes.forEach((node) => {
                  if (node.nodeType !== 1)
                    return;
                  if (node.parentElement && node.parentElement.closest("[x-data]"))
                    return;
                  this.discoverUninitializedComponents((el) => {
                    this.initializeComponent(el);
                  }, node.parentElement);
                });
              }
            }
          });
          observer.observe(targetNode, observerOptions);
        },
        initializeComponent: function initializeComponent(el) {
          if (!el.__x) {
            try {
              el.__x = new Component(el);
            } catch (error) {
              setTimeout(() => {
                throw error;
              }, 0);
            }
          }
        },
        clone: function clone(component, newEl) {
          if (!newEl.__x) {
            newEl.__x = new Component(newEl, component);
          }
        },
        addMagicProperty: function addMagicProperty(name, callback) {
          this.magicProperties[name] = callback;
        },
        onComponentInitialized: function onComponentInitialized(callback) {
          this.onComponentInitializeds.push(callback);
        },
        onBeforeComponentInitialized: function onBeforeComponentInitialized(callback) {
          this.onBeforeComponentInitializeds.push(callback);
        }
      };
      if (!isTesting()) {
        window.Alpine = Alpine;
        if (window.deferLoadingAlpine) {
          window.deferLoadingAlpine(function() {
            window.Alpine.start();
          });
        } else {
          window.Alpine.start();
        }
      }
      return Alpine;
    });
  });

  // src/ts/main.ts
  var import_alpinejs = __toModule(require_alpine());
  function toggleNavbar(collapseID) {
    var _a, _b;
    (_a = document.getElementById(collapseID)) == null ? void 0 : _a.classList.toggle("hidden");
    (_b = document.getElementById(collapseID)) == null ? void 0 : _b.classList.toggle("block");
  }
  window.toggleNavbar = toggleNavbar;
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL2FscGluZWpzL2Rpc3QvYWxwaW5lLmpzIiwgIi4uLy4uL3NyYy90cy9tYWluLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gIChnbG9iYWwgPSBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLkFscGluZSA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBmdW5jdGlvbiBvd25LZXlzKG9iamVjdCwgZW51bWVyYWJsZU9ubHkpIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XG5cbiAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgICAgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7XG4gICAgICBpZiAoZW51bWVyYWJsZU9ubHkpIHN5bWJvbHMgPSBzeW1ib2xzLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgfSk7XG4gICAgICBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGtleXM7XG4gIH1cblxuICBmdW5jdGlvbiBfb2JqZWN0U3ByZWFkMih0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307XG5cbiAgICAgIGlmIChpICUgMikge1xuICAgICAgICBvd25LZXlzKE9iamVjdChzb3VyY2UpLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvd25LZXlzKE9iamVjdChzb3VyY2UpKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIC8vIFRoYW5rcyBAc3RpbXVsdXM6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zdGltdWx1c2pzL3N0aW11bHVzL2Jsb2IvbWFzdGVyL3BhY2thZ2VzLyU0MHN0aW11bHVzL2NvcmUvc3JjL2FwcGxpY2F0aW9uLnRzXG4gIGZ1bmN0aW9uIGRvbVJlYWR5KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09IFwibG9hZGluZ1wiKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIHJlc29sdmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIGFycmF5VW5pcXVlKGFycmF5KSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChhcnJheSkpO1xuICB9XG4gIGZ1bmN0aW9uIGlzVGVzdGluZygpIHtcbiAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcyhcIk5vZGUuanNcIikgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcyhcImpzZG9tXCIpO1xuICB9XG4gIGZ1bmN0aW9uIGNoZWNrZWRBdHRyTG9vc2VDb21wYXJlKHZhbHVlQSwgdmFsdWVCKSB7XG4gICAgcmV0dXJuIHZhbHVlQSA9PSB2YWx1ZUI7XG4gIH1cbiAgZnVuY3Rpb24gd2FybklmTWFsZm9ybWVkVGVtcGxhdGUoZWwsIGRpcmVjdGl2ZSkge1xuICAgIGlmIChlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICd0ZW1wbGF0ZScpIHtcbiAgICAgIGNvbnNvbGUud2FybihgQWxwaW5lOiBbJHtkaXJlY3RpdmV9XSBkaXJlY3RpdmUgc2hvdWxkIG9ubHkgYmUgYWRkZWQgdG8gPHRlbXBsYXRlPiB0YWdzLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2FscGluZWpzL2FscGluZSMke2RpcmVjdGl2ZX1gKTtcbiAgICB9IGVsc2UgaWYgKGVsLmNvbnRlbnQuY2hpbGRFbGVtZW50Q291bnQgIT09IDEpIHtcbiAgICAgIGNvbnNvbGUud2FybihgQWxwaW5lOiA8dGVtcGxhdGU+IHRhZyB3aXRoIFske2RpcmVjdGl2ZX1dIGVuY291bnRlcmVkIHdpdGggbXVsdGlwbGUgZWxlbWVudCByb290cy4gTWFrZSBzdXJlIDx0ZW1wbGF0ZT4gb25seSBoYXMgYSBzaW5nbGUgY2hpbGQgZWxlbWVudC5gKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24ga2ViYWJDYXNlKHN1YmplY3QpIHtcbiAgICByZXR1cm4gc3ViamVjdC5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS5yZXBsYWNlKC9bX1xcc10vLCAnLScpLnRvTG93ZXJDYXNlKCk7XG4gIH1cbiAgZnVuY3Rpb24gY2FtZWxDYXNlKHN1YmplY3QpIHtcbiAgICByZXR1cm4gc3ViamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLy0oXFx3KS9nLCAobWF0Y2gsIGNoYXIpID0+IGNoYXIudG9VcHBlckNhc2UoKSk7XG4gIH1cbiAgZnVuY3Rpb24gd2FsayhlbCwgY2FsbGJhY2spIHtcbiAgICBpZiAoY2FsbGJhY2soZWwpID09PSBmYWxzZSkgcmV0dXJuO1xuICAgIGxldCBub2RlID0gZWwuZmlyc3RFbGVtZW50Q2hpbGQ7XG5cbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgd2Fsayhub2RlLCBjYWxsYmFjayk7XG4gICAgICBub2RlID0gbm9kZS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQpIHtcbiAgICB2YXIgdGltZW91dDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLFxuICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uIGxhdGVyKCkge1xuICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIH07XG5cbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgaGFuZGxlRXJyb3IgPSAoZWwsIGV4cHJlc3Npb24sIGVycm9yKSA9PiB7XG4gICAgY29uc29sZS53YXJuKGBBbHBpbmUgRXJyb3I6IFwiJHtlcnJvcn1cIlxcblxcbkV4cHJlc3Npb246IFwiJHtleHByZXNzaW9ufVwiXFxuRWxlbWVudDpgLCBlbCk7XG5cbiAgICBpZiAoIWlzVGVzdGluZygpKSB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goY2IsIHtcbiAgICBlbCxcbiAgICBleHByZXNzaW9uXG4gIH0pIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdmFsdWUgPSBjYigpO1xuICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSA/IHZhbHVlLmNhdGNoKGUgPT4gaGFuZGxlRXJyb3IoZWwsIGV4cHJlc3Npb24sIGUpKSA6IHZhbHVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGhhbmRsZUVycm9yKGVsLCBleHByZXNzaW9uLCBlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzYWZlckV2YWwoZWwsIGV4cHJlc3Npb24sIGRhdGFDb250ZXh0LCBhZGRpdGlvbmFsSGVscGVyVmFyaWFibGVzID0ge30pIHtcbiAgICByZXR1cm4gdHJ5Q2F0Y2goKCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBleHByZXNzaW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBleHByZXNzaW9uLmNhbGwoZGF0YUNvbnRleHQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKFsnJGRhdGEnLCAuLi5PYmplY3Qua2V5cyhhZGRpdGlvbmFsSGVscGVyVmFyaWFibGVzKV0sIGB2YXIgX19hbHBpbmVfcmVzdWx0OyB3aXRoKCRkYXRhKSB7IF9fYWxwaW5lX3Jlc3VsdCA9ICR7ZXhwcmVzc2lvbn0gfTsgcmV0dXJuIF9fYWxwaW5lX3Jlc3VsdGApKGRhdGFDb250ZXh0LCAuLi5PYmplY3QudmFsdWVzKGFkZGl0aW9uYWxIZWxwZXJWYXJpYWJsZXMpKTtcbiAgICB9LCB7XG4gICAgICBlbCxcbiAgICAgIGV4cHJlc3Npb25cbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBzYWZlckV2YWxOb1JldHVybihlbCwgZXhwcmVzc2lvbiwgZGF0YUNvbnRleHQsIGFkZGl0aW9uYWxIZWxwZXJWYXJpYWJsZXMgPSB7fSkge1xuICAgIHJldHVybiB0cnlDYXRjaCgoKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGV4cHJlc3Npb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShleHByZXNzaW9uLmNhbGwoZGF0YUNvbnRleHQsIGFkZGl0aW9uYWxIZWxwZXJWYXJpYWJsZXNbJyRldmVudCddKSk7XG4gICAgICB9XG5cbiAgICAgIGxldCBBc3luY0Z1bmN0aW9uID0gRnVuY3Rpb247XG4gICAgICAvKiBNT0RFUk4tT05MWTpTVEFSVCAqL1xuXG4gICAgICBBc3luY0Z1bmN0aW9uID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGFzeW5jIGZ1bmN0aW9uICgpIHt9KS5jb25zdHJ1Y3RvcjtcbiAgICAgIC8qIE1PREVSTi1PTkxZOkVORCAqL1xuICAgICAgLy8gRm9yIHRoZSBjYXNlcyB3aGVuIHVzZXJzIHBhc3Mgb25seSBhIGZ1bmN0aW9uIHJlZmVyZW5jZSB0byB0aGUgY2FsbGVyOiBgeC1vbjpjbGljaz1cImZvb1wiYFxuICAgICAgLy8gV2hlcmUgXCJmb29cIiBpcyBhIGZ1bmN0aW9uLiBBbHNvLCB3ZSdsbCBwYXNzIHRoZSBmdW5jdGlvbiB0aGUgZXZlbnQgaW5zdGFuY2Ugd2hlbiB3ZSBjYWxsIGl0LlxuXG4gICAgICBpZiAoT2JqZWN0LmtleXMoZGF0YUNvbnRleHQpLmluY2x1ZGVzKGV4cHJlc3Npb24pKSB7XG4gICAgICAgIGxldCBtZXRob2RSZWZlcmVuY2UgPSBuZXcgRnVuY3Rpb24oWydkYXRhQ29udGV4dCcsIC4uLk9iamVjdC5rZXlzKGFkZGl0aW9uYWxIZWxwZXJWYXJpYWJsZXMpXSwgYHdpdGgoZGF0YUNvbnRleHQpIHsgcmV0dXJuICR7ZXhwcmVzc2lvbn0gfWApKGRhdGFDb250ZXh0LCAuLi5PYmplY3QudmFsdWVzKGFkZGl0aW9uYWxIZWxwZXJWYXJpYWJsZXMpKTtcblxuICAgICAgICBpZiAodHlwZW9mIG1ldGhvZFJlZmVyZW5jZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobWV0aG9kUmVmZXJlbmNlLmNhbGwoZGF0YUNvbnRleHQsIGFkZGl0aW9uYWxIZWxwZXJWYXJpYWJsZXNbJyRldmVudCddKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEFzeW5jRnVuY3Rpb24oWydkYXRhQ29udGV4dCcsIC4uLk9iamVjdC5rZXlzKGFkZGl0aW9uYWxIZWxwZXJWYXJpYWJsZXMpXSwgYHdpdGgoZGF0YUNvbnRleHQpIHsgJHtleHByZXNzaW9ufSB9YCkoZGF0YUNvbnRleHQsIC4uLk9iamVjdC52YWx1ZXMoYWRkaXRpb25hbEhlbHBlclZhcmlhYmxlcykpKTtcbiAgICB9LCB7XG4gICAgICBlbCxcbiAgICAgIGV4cHJlc3Npb25cbiAgICB9KTtcbiAgfVxuICBjb25zdCB4QXR0clJFID0gL154LShvbnxiaW5kfGRhdGF8dGV4dHxodG1sfG1vZGVsfGlmfGZvcnxzaG93fGNsb2FrfHRyYW5zaXRpb258cmVmfHNwcmVhZClcXGIvO1xuICBmdW5jdGlvbiBpc1hBdHRyKGF0dHIpIHtcbiAgICBjb25zdCBuYW1lID0gcmVwbGFjZUF0QW5kQ29sb25XaXRoU3RhbmRhcmRTeW50YXgoYXR0ci5uYW1lKTtcbiAgICByZXR1cm4geEF0dHJSRS50ZXN0KG5hbWUpO1xuICB9XG4gIGZ1bmN0aW9uIGdldFhBdHRycyhlbCwgY29tcG9uZW50LCB0eXBlKSB7XG4gICAgbGV0IGRpcmVjdGl2ZXMgPSBBcnJheS5mcm9tKGVsLmF0dHJpYnV0ZXMpLmZpbHRlcihpc1hBdHRyKS5tYXAocGFyc2VIdG1sQXR0cmlidXRlKTsgLy8gR2V0IGFuIG9iamVjdCBvZiBkaXJlY3RpdmVzIGZyb20geC1zcHJlYWQuXG5cbiAgICBsZXQgc3ByZWFkRGlyZWN0aXZlID0gZGlyZWN0aXZlcy5maWx0ZXIoZGlyZWN0aXZlID0+IGRpcmVjdGl2ZS50eXBlID09PSAnc3ByZWFkJylbMF07XG5cbiAgICBpZiAoc3ByZWFkRGlyZWN0aXZlKSB7XG4gICAgICBsZXQgc3ByZWFkT2JqZWN0ID0gc2FmZXJFdmFsKGVsLCBzcHJlYWREaXJlY3RpdmUuZXhwcmVzc2lvbiwgY29tcG9uZW50LiRkYXRhKTsgLy8gQWRkIHgtc3ByZWFkIGRpcmVjdGl2ZXMgdG8gdGhlIHBpbGUgb2YgZXhpc3RpbmcgZGlyZWN0aXZlcy5cblxuICAgICAgZGlyZWN0aXZlcyA9IGRpcmVjdGl2ZXMuY29uY2F0KE9iamVjdC5lbnRyaWVzKHNwcmVhZE9iamVjdCkubWFwKChbbmFtZSwgdmFsdWVdKSA9PiBwYXJzZUh0bWxBdHRyaWJ1dGUoe1xuICAgICAgICBuYW1lLFxuICAgICAgICB2YWx1ZVxuICAgICAgfSkpKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZSkgcmV0dXJuIGRpcmVjdGl2ZXMuZmlsdGVyKGkgPT4gaS50eXBlID09PSB0eXBlKTtcbiAgICByZXR1cm4gc29ydERpcmVjdGl2ZXMoZGlyZWN0aXZlcyk7XG4gIH1cblxuICBmdW5jdGlvbiBzb3J0RGlyZWN0aXZlcyhkaXJlY3RpdmVzKSB7XG4gICAgbGV0IGRpcmVjdGl2ZU9yZGVyID0gWydiaW5kJywgJ21vZGVsJywgJ3Nob3cnLCAnY2F0Y2gtYWxsJ107XG4gICAgcmV0dXJuIGRpcmVjdGl2ZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgbGV0IHR5cGVBID0gZGlyZWN0aXZlT3JkZXIuaW5kZXhPZihhLnR5cGUpID09PSAtMSA/ICdjYXRjaC1hbGwnIDogYS50eXBlO1xuICAgICAgbGV0IHR5cGVCID0gZGlyZWN0aXZlT3JkZXIuaW5kZXhPZihiLnR5cGUpID09PSAtMSA/ICdjYXRjaC1hbGwnIDogYi50eXBlO1xuICAgICAgcmV0dXJuIGRpcmVjdGl2ZU9yZGVyLmluZGV4T2YodHlwZUEpIC0gZGlyZWN0aXZlT3JkZXIuaW5kZXhPZih0eXBlQik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUh0bWxBdHRyaWJ1dGUoe1xuICAgIG5hbWUsXG4gICAgdmFsdWVcbiAgfSkge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWROYW1lID0gcmVwbGFjZUF0QW5kQ29sb25XaXRoU3RhbmRhcmRTeW50YXgobmFtZSk7XG4gICAgY29uc3QgdHlwZU1hdGNoID0gbm9ybWFsaXplZE5hbWUubWF0Y2goeEF0dHJSRSk7XG4gICAgY29uc3QgdmFsdWVNYXRjaCA9IG5vcm1hbGl6ZWROYW1lLm1hdGNoKC86KFthLXpBLVowLTlcXC06XSspLyk7XG4gICAgY29uc3QgbW9kaWZpZXJzID0gbm9ybWFsaXplZE5hbWUubWF0Y2goL1xcLlteLlxcXV0rKD89W15cXF1dKiQpL2cpIHx8IFtdO1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiB0eXBlTWF0Y2ggPyB0eXBlTWF0Y2hbMV0gOiBudWxsLFxuICAgICAgdmFsdWU6IHZhbHVlTWF0Y2ggPyB2YWx1ZU1hdGNoWzFdIDogbnVsbCxcbiAgICAgIG1vZGlmaWVyczogbW9kaWZpZXJzLm1hcChpID0+IGkucmVwbGFjZSgnLicsICcnKSksXG4gICAgICBleHByZXNzaW9uOiB2YWx1ZVxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gaXNCb29sZWFuQXR0cihhdHRyTmFtZSkge1xuICAgIC8vIEFzIHBlciBIVE1MIHNwZWMgdGFibGUgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvaW5kaWNlcy5odG1sI2F0dHJpYnV0ZXMtMzpib29sZWFuLWF0dHJpYnV0ZVxuICAgIC8vIEFycmF5IHJvdWdobHkgb3JkZXJlZCBieSBlc3RpbWF0ZWQgdXNhZ2VcbiAgICBjb25zdCBib29sZWFuQXR0cmlidXRlcyA9IFsnZGlzYWJsZWQnLCAnY2hlY2tlZCcsICdyZXF1aXJlZCcsICdyZWFkb25seScsICdoaWRkZW4nLCAnb3BlbicsICdzZWxlY3RlZCcsICdhdXRvZm9jdXMnLCAnaXRlbXNjb3BlJywgJ211bHRpcGxlJywgJ25vdmFsaWRhdGUnLCAnYWxsb3dmdWxsc2NyZWVuJywgJ2FsbG93cGF5bWVudHJlcXVlc3QnLCAnZm9ybW5vdmFsaWRhdGUnLCAnYXV0b3BsYXknLCAnY29udHJvbHMnLCAnbG9vcCcsICdtdXRlZCcsICdwbGF5c2lubGluZScsICdkZWZhdWx0JywgJ2lzbWFwJywgJ3JldmVyc2VkJywgJ2FzeW5jJywgJ2RlZmVyJywgJ25vbW9kdWxlJ107XG4gICAgcmV0dXJuIGJvb2xlYW5BdHRyaWJ1dGVzLmluY2x1ZGVzKGF0dHJOYW1lKTtcbiAgfVxuICBmdW5jdGlvbiByZXBsYWNlQXRBbmRDb2xvbldpdGhTdGFuZGFyZFN5bnRheChuYW1lKSB7XG4gICAgaWYgKG5hbWUuc3RhcnRzV2l0aCgnQCcpKSB7XG4gICAgICByZXR1cm4gbmFtZS5yZXBsYWNlKCdAJywgJ3gtb246Jyk7XG4gICAgfSBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJzonKSkge1xuICAgICAgcmV0dXJuIG5hbWUucmVwbGFjZSgnOicsICd4LWJpbmQ6Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cbiAgZnVuY3Rpb24gY29udmVydENsYXNzU3RyaW5nVG9BcnJheShjbGFzc0xpc3QsIGZpbHRlckZuID0gQm9vbGVhbikge1xuICAgIHJldHVybiBjbGFzc0xpc3Quc3BsaXQoJyAnKS5maWx0ZXIoZmlsdGVyRm4pO1xuICB9XG4gIGNvbnN0IFRSQU5TSVRJT05fVFlQRV9JTiA9ICdpbic7XG4gIGNvbnN0IFRSQU5TSVRJT05fVFlQRV9PVVQgPSAnb3V0JztcbiAgY29uc3QgVFJBTlNJVElPTl9DQU5DRUxMRUQgPSAnY2FuY2VsbGVkJztcbiAgZnVuY3Rpb24gdHJhbnNpdGlvbkluKGVsLCBzaG93LCByZWplY3QsIGNvbXBvbmVudCwgZm9yY2VTa2lwID0gZmFsc2UpIHtcbiAgICAvLyBXZSBkb24ndCB3YW50IHRvIHRyYW5zaXRpb24gb24gdGhlIGluaXRpYWwgcGFnZSBsb2FkLlxuICAgIGlmIChmb3JjZVNraXApIHJldHVybiBzaG93KCk7XG5cbiAgICBpZiAoZWwuX194X3RyYW5zaXRpb24gJiYgZWwuX194X3RyYW5zaXRpb24udHlwZSA9PT0gVFJBTlNJVElPTl9UWVBFX0lOKSB7XG4gICAgICAvLyB0aGVyZSBpcyBhbHJlYWR5IGEgc2ltaWxhciB0cmFuc2l0aW9uIGdvaW5nIG9uLCB0aGlzIHdhcyBwcm9iYWJseSB0cmlnZ2VyZWQgYnlcbiAgICAgIC8vIGEgY2hhbmdlIGluIGEgZGlmZmVyZW50IHByb3BlcnR5LCBsZXQncyBqdXN0IGxlYXZlIHRoZSBwcmV2aW91cyBvbmUgZG9pbmcgaXRzIGpvYlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGF0dHJzID0gZ2V0WEF0dHJzKGVsLCBjb21wb25lbnQsICd0cmFuc2l0aW9uJyk7XG4gICAgY29uc3Qgc2hvd0F0dHIgPSBnZXRYQXR0cnMoZWwsIGNvbXBvbmVudCwgJ3Nob3cnKVswXTsgLy8gSWYgdGhpcyBpcyB0cmlnZ2VyZWQgYnkgYSB4LXNob3cudHJhbnNpdGlvbi5cblxuICAgIGlmIChzaG93QXR0ciAmJiBzaG93QXR0ci5tb2RpZmllcnMuaW5jbHVkZXMoJ3RyYW5zaXRpb24nKSkge1xuICAgICAgbGV0IG1vZGlmaWVycyA9IHNob3dBdHRyLm1vZGlmaWVyczsgLy8gSWYgeC1zaG93LnRyYW5zaXRpb24ub3V0LCB3ZSdsbCBza2lwIHRoZSBcImluXCIgdHJhbnNpdGlvbi5cblxuICAgICAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcygnb3V0JykgJiYgIW1vZGlmaWVycy5pbmNsdWRlcygnaW4nKSkgcmV0dXJuIHNob3coKTtcbiAgICAgIGNvbnN0IHNldHRpbmdCb3RoU2lkZXNPZlRyYW5zaXRpb24gPSBtb2RpZmllcnMuaW5jbHVkZXMoJ2luJykgJiYgbW9kaWZpZXJzLmluY2x1ZGVzKCdvdXQnKTsgLy8gSWYgeC1zaG93LnRyYW5zaXRpb24uaW4uLi5vdXQuLi4gb25seSB1c2UgXCJpblwiIHJlbGF0ZWQgbW9kaWZpZXJzIGZvciB0aGlzIHRyYW5zaXRpb24uXG5cbiAgICAgIG1vZGlmaWVycyA9IHNldHRpbmdCb3RoU2lkZXNPZlRyYW5zaXRpb24gPyBtb2RpZmllcnMuZmlsdGVyKChpLCBpbmRleCkgPT4gaW5kZXggPCBtb2RpZmllcnMuaW5kZXhPZignb3V0JykpIDogbW9kaWZpZXJzO1xuICAgICAgdHJhbnNpdGlvbkhlbHBlckluKGVsLCBtb2RpZmllcnMsIHNob3csIHJlamVjdCk7IC8vIE90aGVyd2lzZSwgd2UgY2FuIGFzc3VtZSB4LXRyYW5zaXRpb246ZW50ZXIuXG4gICAgfSBlbHNlIGlmIChhdHRycy5zb21lKGF0dHIgPT4gWydlbnRlcicsICdlbnRlci1zdGFydCcsICdlbnRlci1lbmQnXS5pbmNsdWRlcyhhdHRyLnZhbHVlKSkpIHtcbiAgICAgIHRyYW5zaXRpb25DbGFzc2VzSW4oZWwsIGNvbXBvbmVudCwgYXR0cnMsIHNob3csIHJlamVjdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIG5laXRoZXIsIGp1c3Qgc2hvdyB0aGF0IGRhbW4gdGhpbmcuXG4gICAgICBzaG93KCk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHRyYW5zaXRpb25PdXQoZWwsIGhpZGUsIHJlamVjdCwgY29tcG9uZW50LCBmb3JjZVNraXAgPSBmYWxzZSkge1xuICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gdHJhbnNpdGlvbiBvbiB0aGUgaW5pdGlhbCBwYWdlIGxvYWQuXG4gICAgaWYgKGZvcmNlU2tpcCkgcmV0dXJuIGhpZGUoKTtcblxuICAgIGlmIChlbC5fX3hfdHJhbnNpdGlvbiAmJiBlbC5fX3hfdHJhbnNpdGlvbi50eXBlID09PSBUUkFOU0lUSU9OX1RZUEVfT1VUKSB7XG4gICAgICAvLyB0aGVyZSBpcyBhbHJlYWR5IGEgc2ltaWxhciB0cmFuc2l0aW9uIGdvaW5nIG9uLCB0aGlzIHdhcyBwcm9iYWJseSB0cmlnZ2VyZWQgYnlcbiAgICAgIC8vIGEgY2hhbmdlIGluIGEgZGlmZmVyZW50IHByb3BlcnR5LCBsZXQncyBqdXN0IGxlYXZlIHRoZSBwcmV2aW91cyBvbmUgZG9pbmcgaXRzIGpvYlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGF0dHJzID0gZ2V0WEF0dHJzKGVsLCBjb21wb25lbnQsICd0cmFuc2l0aW9uJyk7XG4gICAgY29uc3Qgc2hvd0F0dHIgPSBnZXRYQXR0cnMoZWwsIGNvbXBvbmVudCwgJ3Nob3cnKVswXTtcblxuICAgIGlmIChzaG93QXR0ciAmJiBzaG93QXR0ci5tb2RpZmllcnMuaW5jbHVkZXMoJ3RyYW5zaXRpb24nKSkge1xuICAgICAgbGV0IG1vZGlmaWVycyA9IHNob3dBdHRyLm1vZGlmaWVycztcbiAgICAgIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoJ2luJykgJiYgIW1vZGlmaWVycy5pbmNsdWRlcygnb3V0JykpIHJldHVybiBoaWRlKCk7XG4gICAgICBjb25zdCBzZXR0aW5nQm90aFNpZGVzT2ZUcmFuc2l0aW9uID0gbW9kaWZpZXJzLmluY2x1ZGVzKCdpbicpICYmIG1vZGlmaWVycy5pbmNsdWRlcygnb3V0Jyk7XG4gICAgICBtb2RpZmllcnMgPSBzZXR0aW5nQm90aFNpZGVzT2ZUcmFuc2l0aW9uID8gbW9kaWZpZXJzLmZpbHRlcigoaSwgaW5kZXgpID0+IGluZGV4ID4gbW9kaWZpZXJzLmluZGV4T2YoJ291dCcpKSA6IG1vZGlmaWVycztcbiAgICAgIHRyYW5zaXRpb25IZWxwZXJPdXQoZWwsIG1vZGlmaWVycywgc2V0dGluZ0JvdGhTaWRlc09mVHJhbnNpdGlvbiwgaGlkZSwgcmVqZWN0KTtcbiAgICB9IGVsc2UgaWYgKGF0dHJzLnNvbWUoYXR0ciA9PiBbJ2xlYXZlJywgJ2xlYXZlLXN0YXJ0JywgJ2xlYXZlLWVuZCddLmluY2x1ZGVzKGF0dHIudmFsdWUpKSkge1xuICAgICAgdHJhbnNpdGlvbkNsYXNzZXNPdXQoZWwsIGNvbXBvbmVudCwgYXR0cnMsIGhpZGUsIHJlamVjdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhpZGUoKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbkhlbHBlckluKGVsLCBtb2RpZmllcnMsIHNob3dDYWxsYmFjaywgcmVqZWN0KSB7XG4gICAgLy8gRGVmYXVsdCB2YWx1ZXMgaW5zcGlyZWQgYnk6IGh0dHBzOi8vbWF0ZXJpYWwuaW8vZGVzaWduL21vdGlvbi9zcGVlZC5odG1sI2R1cmF0aW9uXG4gICAgY29uc3Qgc3R5bGVWYWx1ZXMgPSB7XG4gICAgICBkdXJhdGlvbjogbW9kaWZpZXJWYWx1ZShtb2RpZmllcnMsICdkdXJhdGlvbicsIDE1MCksXG4gICAgICBvcmlnaW46IG1vZGlmaWVyVmFsdWUobW9kaWZpZXJzLCAnb3JpZ2luJywgJ2NlbnRlcicpLFxuICAgICAgZmlyc3Q6IHtcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgc2NhbGU6IG1vZGlmaWVyVmFsdWUobW9kaWZpZXJzLCAnc2NhbGUnLCA5NSlcbiAgICAgIH0sXG4gICAgICBzZWNvbmQ6IHtcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgc2NhbGU6IDEwMFxuICAgICAgfVxuICAgIH07XG4gICAgdHJhbnNpdGlvbkhlbHBlcihlbCwgbW9kaWZpZXJzLCBzaG93Q2FsbGJhY2ssICgpID0+IHt9LCByZWplY3QsIHN0eWxlVmFsdWVzLCBUUkFOU0lUSU9OX1RZUEVfSU4pO1xuICB9XG4gIGZ1bmN0aW9uIHRyYW5zaXRpb25IZWxwZXJPdXQoZWwsIG1vZGlmaWVycywgc2V0dGluZ0JvdGhTaWRlc09mVHJhbnNpdGlvbiwgaGlkZUNhbGxiYWNrLCByZWplY3QpIHtcbiAgICAvLyBNYWtlIHRoZSBcIm91dFwiIHRyYW5zaXRpb24gLjV4IHNsb3dlciB0aGFuIHRoZSBcImluXCIuIChWaXN1YWxseSBiZXR0ZXIpXG4gICAgLy8gSE9XRVZFUiwgaWYgdGhleSBleHBsaWNpdGx5IHNldCBhIGR1cmF0aW9uIGZvciB0aGUgXCJvdXRcIiB0cmFuc2l0aW9uLFxuICAgIC8vIHVzZSB0aGF0LlxuICAgIGNvbnN0IGR1cmF0aW9uID0gc2V0dGluZ0JvdGhTaWRlc09mVHJhbnNpdGlvbiA/IG1vZGlmaWVyVmFsdWUobW9kaWZpZXJzLCAnZHVyYXRpb24nLCAxNTApIDogbW9kaWZpZXJWYWx1ZShtb2RpZmllcnMsICdkdXJhdGlvbicsIDE1MCkgLyAyO1xuICAgIGNvbnN0IHN0eWxlVmFsdWVzID0ge1xuICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgb3JpZ2luOiBtb2RpZmllclZhbHVlKG1vZGlmaWVycywgJ29yaWdpbicsICdjZW50ZXInKSxcbiAgICAgIGZpcnN0OiB7XG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIHNjYWxlOiAxMDBcbiAgICAgIH0sXG4gICAgICBzZWNvbmQ6IHtcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgc2NhbGU6IG1vZGlmaWVyVmFsdWUobW9kaWZpZXJzLCAnc2NhbGUnLCA5NSlcbiAgICAgIH1cbiAgICB9O1xuICAgIHRyYW5zaXRpb25IZWxwZXIoZWwsIG1vZGlmaWVycywgKCkgPT4ge30sIGhpZGVDYWxsYmFjaywgcmVqZWN0LCBzdHlsZVZhbHVlcywgVFJBTlNJVElPTl9UWVBFX09VVCk7XG4gIH1cblxuICBmdW5jdGlvbiBtb2RpZmllclZhbHVlKG1vZGlmaWVycywga2V5LCBmYWxsYmFjaykge1xuICAgIC8vIElmIHRoZSBtb2RpZmllciBpc24ndCBwcmVzZW50LCB1c2UgdGhlIGRlZmF1bHQuXG4gICAgaWYgKG1vZGlmaWVycy5pbmRleE9mKGtleSkgPT09IC0xKSByZXR1cm4gZmFsbGJhY2s7IC8vIElmIGl0IElTIHByZXNlbnQsIGdyYWIgdGhlIHZhbHVlIGFmdGVyIGl0OiB4LXNob3cudHJhbnNpdGlvbi5kdXJhdGlvbi41MDBtc1xuXG4gICAgY29uc3QgcmF3VmFsdWUgPSBtb2RpZmllcnNbbW9kaWZpZXJzLmluZGV4T2Yoa2V5KSArIDFdO1xuICAgIGlmICghcmF3VmFsdWUpIHJldHVybiBmYWxsYmFjaztcblxuICAgIGlmIChrZXkgPT09ICdzY2FsZScpIHtcbiAgICAgIC8vIENoZWNrIGlmIHRoZSB2ZXJ5IG5leHQgdmFsdWUgaXMgTk9UIGEgbnVtYmVyIGFuZCByZXR1cm4gdGhlIGZhbGxiYWNrLlxuICAgICAgLy8gSWYgeC1zaG93LnRyYW5zaXRpb24uc2NhbGUsIHdlJ2xsIHVzZSB0aGUgZGVmYXVsdCBzY2FsZSB2YWx1ZS5cbiAgICAgIC8vIFRoYXQgaXMgaG93IGEgdXNlciBvcHRzIG91dCBvZiB0aGUgb3BhY2l0eSB0cmFuc2l0aW9uLlxuICAgICAgaWYgKCFpc051bWVyaWMocmF3VmFsdWUpKSByZXR1cm4gZmFsbGJhY2s7XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gJ2R1cmF0aW9uJykge1xuICAgICAgLy8gU3VwcG9ydCB4LXNob3cudHJhbnNpdGlvbi5kdXJhdGlvbi41MDBtcyAmJiBkdXJhdGlvbi41MDBcbiAgICAgIGxldCBtYXRjaCA9IHJhd1ZhbHVlLm1hdGNoKC8oWzAtOV0rKW1zLyk7XG4gICAgICBpZiAobWF0Y2gpIHJldHVybiBtYXRjaFsxXTtcbiAgICB9XG5cbiAgICBpZiAoa2V5ID09PSAnb3JpZ2luJykge1xuICAgICAgLy8gU3VwcG9ydCBjaGFpbmluZyBvcmlnaW4gZGlyZWN0aW9uczogeC1zaG93LnRyYW5zaXRpb24udG9wLnJpZ2h0XG4gICAgICBpZiAoWyd0b3AnLCAncmlnaHQnLCAnbGVmdCcsICdjZW50ZXInLCAnYm90dG9tJ10uaW5jbHVkZXMobW9kaWZpZXJzW21vZGlmaWVycy5pbmRleE9mKGtleSkgKyAyXSkpIHtcbiAgICAgICAgcmV0dXJuIFtyYXdWYWx1ZSwgbW9kaWZpZXJzW21vZGlmaWVycy5pbmRleE9mKGtleSkgKyAyXV0uam9pbignICcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByYXdWYWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYW5zaXRpb25IZWxwZXIoZWwsIG1vZGlmaWVycywgaG9vazEsIGhvb2syLCByZWplY3QsIHN0eWxlVmFsdWVzLCB0eXBlKSB7XG4gICAgLy8gY2xlYXIgdGhlIHByZXZpb3VzIHRyYW5zaXRpb24gaWYgZXhpc3RzIHRvIGF2b2lkIGNhY2hpbmcgdGhlIHdyb25nIHN0eWxlc1xuICAgIGlmIChlbC5fX3hfdHJhbnNpdGlvbikge1xuICAgICAgZWwuX194X3RyYW5zaXRpb24uY2FuY2VsICYmIGVsLl9feF90cmFuc2l0aW9uLmNhbmNlbCgpO1xuICAgIH0gLy8gSWYgdGhlIHVzZXIgc2V0IHRoZXNlIHN0eWxlIHZhbHVlcywgd2UnbGwgcHV0IHRoZW0gYmFjayB3aGVuIHdlJ3JlIGRvbmUgd2l0aCB0aGVtLlxuXG5cbiAgICBjb25zdCBvcGFjaXR5Q2FjaGUgPSBlbC5zdHlsZS5vcGFjaXR5O1xuICAgIGNvbnN0IHRyYW5zZm9ybUNhY2hlID0gZWwuc3R5bGUudHJhbnNmb3JtO1xuICAgIGNvbnN0IHRyYW5zZm9ybU9yaWdpbkNhY2hlID0gZWwuc3R5bGUudHJhbnNmb3JtT3JpZ2luOyAvLyBJZiBubyBtb2RpZmllcnMgYXJlIHByZXNlbnQ6IHgtc2hvdy50cmFuc2l0aW9uLCB3ZSdsbCBkZWZhdWx0IHRvIGJvdGggb3BhY2l0eSBhbmQgc2NhbGUuXG5cbiAgICBjb25zdCBub01vZGlmaWVycyA9ICFtb2RpZmllcnMuaW5jbHVkZXMoJ29wYWNpdHknKSAmJiAhbW9kaWZpZXJzLmluY2x1ZGVzKCdzY2FsZScpO1xuICAgIGNvbnN0IHRyYW5zaXRpb25PcGFjaXR5ID0gbm9Nb2RpZmllcnMgfHwgbW9kaWZpZXJzLmluY2x1ZGVzKCdvcGFjaXR5Jyk7XG4gICAgY29uc3QgdHJhbnNpdGlvblNjYWxlID0gbm9Nb2RpZmllcnMgfHwgbW9kaWZpZXJzLmluY2x1ZGVzKCdzY2FsZScpOyAvLyBUaGVzZSBhcmUgdGhlIGV4cGxpY2l0IHN0YWdlcyBvZiBhIHRyYW5zaXRpb24gKHNhbWUgc3RhZ2VzIGZvciBpbiBhbmQgZm9yIG91dCkuXG4gICAgLy8gVGhpcyB3YXkgeW91IGNhbiBnZXQgYSBiaXJkcyBleWUgdmlldyBvZiB0aGUgaG9va3MsIGFuZCB0aGUgZGlmZmVyZW5jZXNcbiAgICAvLyBiZXR3ZWVuIHRoZW0uXG5cbiAgICBjb25zdCBzdGFnZXMgPSB7XG4gICAgICBzdGFydCgpIHtcbiAgICAgICAgaWYgKHRyYW5zaXRpb25PcGFjaXR5KSBlbC5zdHlsZS5vcGFjaXR5ID0gc3R5bGVWYWx1ZXMuZmlyc3Qub3BhY2l0eTtcbiAgICAgICAgaWYgKHRyYW5zaXRpb25TY2FsZSkgZWwuc3R5bGUudHJhbnNmb3JtID0gYHNjYWxlKCR7c3R5bGVWYWx1ZXMuZmlyc3Quc2NhbGUgLyAxMDB9KWA7XG4gICAgICB9LFxuXG4gICAgICBkdXJpbmcoKSB7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uU2NhbGUpIGVsLnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9IHN0eWxlVmFsdWVzLm9yaWdpbjtcbiAgICAgICAgZWwuc3R5bGUudHJhbnNpdGlvblByb3BlcnR5ID0gW3RyYW5zaXRpb25PcGFjaXR5ID8gYG9wYWNpdHlgIDogYGAsIHRyYW5zaXRpb25TY2FsZSA/IGB0cmFuc2Zvcm1gIDogYGBdLmpvaW4oJyAnKS50cmltKCk7XG4gICAgICAgIGVsLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGAke3N0eWxlVmFsdWVzLmR1cmF0aW9uIC8gMTAwMH1zYDtcbiAgICAgICAgZWwuc3R5bGUudHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uID0gYGN1YmljLWJlemllcigwLjQsIDAuMCwgMC4yLCAxKWA7XG4gICAgICB9LFxuXG4gICAgICBzaG93KCkge1xuICAgICAgICBob29rMSgpO1xuICAgICAgfSxcblxuICAgICAgZW5kKCkge1xuICAgICAgICBpZiAodHJhbnNpdGlvbk9wYWNpdHkpIGVsLnN0eWxlLm9wYWNpdHkgPSBzdHlsZVZhbHVlcy5zZWNvbmQub3BhY2l0eTtcbiAgICAgICAgaWYgKHRyYW5zaXRpb25TY2FsZSkgZWwuc3R5bGUudHJhbnNmb3JtID0gYHNjYWxlKCR7c3R5bGVWYWx1ZXMuc2Vjb25kLnNjYWxlIC8gMTAwfSlgO1xuICAgICAgfSxcblxuICAgICAgaGlkZSgpIHtcbiAgICAgICAgaG9vazIoKTtcbiAgICAgIH0sXG5cbiAgICAgIGNsZWFudXAoKSB7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uT3BhY2l0eSkgZWwuc3R5bGUub3BhY2l0eSA9IG9wYWNpdHlDYWNoZTtcbiAgICAgICAgaWYgKHRyYW5zaXRpb25TY2FsZSkgZWwuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtQ2FjaGU7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uU2NhbGUpIGVsLnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9IHRyYW5zZm9ybU9yaWdpbkNhY2hlO1xuICAgICAgICBlbC5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSBudWxsO1xuICAgICAgICBlbC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBudWxsO1xuICAgICAgICBlbC5zdHlsZS50cmFuc2l0aW9uVGltaW5nRnVuY3Rpb24gPSBudWxsO1xuICAgICAgfVxuXG4gICAgfTtcbiAgICB0cmFuc2l0aW9uKGVsLCBzdGFnZXMsIHR5cGUsIHJlamVjdCk7XG4gIH1cblxuICBjb25zdCBlbnN1cmVTdHJpbmdFeHByZXNzaW9uID0gKGV4cHJlc3Npb24sIGVsLCBjb21wb25lbnQpID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIGV4cHJlc3Npb24gPT09ICdmdW5jdGlvbicgPyBjb21wb25lbnQuZXZhbHVhdGVSZXR1cm5FeHByZXNzaW9uKGVsLCBleHByZXNzaW9uKSA6IGV4cHJlc3Npb247XG4gIH07XG5cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbkNsYXNzZXNJbihlbCwgY29tcG9uZW50LCBkaXJlY3RpdmVzLCBzaG93Q2FsbGJhY2ssIHJlamVjdCkge1xuICAgIGNvbnN0IGVudGVyID0gY29udmVydENsYXNzU3RyaW5nVG9BcnJheShlbnN1cmVTdHJpbmdFeHByZXNzaW9uKChkaXJlY3RpdmVzLmZpbmQoaSA9PiBpLnZhbHVlID09PSAnZW50ZXInKSB8fCB7XG4gICAgICBleHByZXNzaW9uOiAnJ1xuICAgIH0pLmV4cHJlc3Npb24sIGVsLCBjb21wb25lbnQpKTtcbiAgICBjb25zdCBlbnRlclN0YXJ0ID0gY29udmVydENsYXNzU3RyaW5nVG9BcnJheShlbnN1cmVTdHJpbmdFeHByZXNzaW9uKChkaXJlY3RpdmVzLmZpbmQoaSA9PiBpLnZhbHVlID09PSAnZW50ZXItc3RhcnQnKSB8fCB7XG4gICAgICBleHByZXNzaW9uOiAnJ1xuICAgIH0pLmV4cHJlc3Npb24sIGVsLCBjb21wb25lbnQpKTtcbiAgICBjb25zdCBlbnRlckVuZCA9IGNvbnZlcnRDbGFzc1N0cmluZ1RvQXJyYXkoZW5zdXJlU3RyaW5nRXhwcmVzc2lvbigoZGlyZWN0aXZlcy5maW5kKGkgPT4gaS52YWx1ZSA9PT0gJ2VudGVyLWVuZCcpIHx8IHtcbiAgICAgIGV4cHJlc3Npb246ICcnXG4gICAgfSkuZXhwcmVzc2lvbiwgZWwsIGNvbXBvbmVudCkpO1xuICAgIHRyYW5zaXRpb25DbGFzc2VzKGVsLCBlbnRlciwgZW50ZXJTdGFydCwgZW50ZXJFbmQsIHNob3dDYWxsYmFjaywgKCkgPT4ge30sIFRSQU5TSVRJT05fVFlQRV9JTiwgcmVqZWN0KTtcbiAgfVxuICBmdW5jdGlvbiB0cmFuc2l0aW9uQ2xhc3Nlc091dChlbCwgY29tcG9uZW50LCBkaXJlY3RpdmVzLCBoaWRlQ2FsbGJhY2ssIHJlamVjdCkge1xuICAgIGNvbnN0IGxlYXZlID0gY29udmVydENsYXNzU3RyaW5nVG9BcnJheShlbnN1cmVTdHJpbmdFeHByZXNzaW9uKChkaXJlY3RpdmVzLmZpbmQoaSA9PiBpLnZhbHVlID09PSAnbGVhdmUnKSB8fCB7XG4gICAgICBleHByZXNzaW9uOiAnJ1xuICAgIH0pLmV4cHJlc3Npb24sIGVsLCBjb21wb25lbnQpKTtcbiAgICBjb25zdCBsZWF2ZVN0YXJ0ID0gY29udmVydENsYXNzU3RyaW5nVG9BcnJheShlbnN1cmVTdHJpbmdFeHByZXNzaW9uKChkaXJlY3RpdmVzLmZpbmQoaSA9PiBpLnZhbHVlID09PSAnbGVhdmUtc3RhcnQnKSB8fCB7XG4gICAgICBleHByZXNzaW9uOiAnJ1xuICAgIH0pLmV4cHJlc3Npb24sIGVsLCBjb21wb25lbnQpKTtcbiAgICBjb25zdCBsZWF2ZUVuZCA9IGNvbnZlcnRDbGFzc1N0cmluZ1RvQXJyYXkoZW5zdXJlU3RyaW5nRXhwcmVzc2lvbigoZGlyZWN0aXZlcy5maW5kKGkgPT4gaS52YWx1ZSA9PT0gJ2xlYXZlLWVuZCcpIHx8IHtcbiAgICAgIGV4cHJlc3Npb246ICcnXG4gICAgfSkuZXhwcmVzc2lvbiwgZWwsIGNvbXBvbmVudCkpO1xuICAgIHRyYW5zaXRpb25DbGFzc2VzKGVsLCBsZWF2ZSwgbGVhdmVTdGFydCwgbGVhdmVFbmQsICgpID0+IHt9LCBoaWRlQ2FsbGJhY2ssIFRSQU5TSVRJT05fVFlQRV9PVVQsIHJlamVjdCk7XG4gIH1cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbkNsYXNzZXMoZWwsIGNsYXNzZXNEdXJpbmcsIGNsYXNzZXNTdGFydCwgY2xhc3Nlc0VuZCwgaG9vazEsIGhvb2syLCB0eXBlLCByZWplY3QpIHtcbiAgICAvLyBjbGVhciB0aGUgcHJldmlvdXMgdHJhbnNpdGlvbiBpZiBleGlzdHMgdG8gYXZvaWQgY2FjaGluZyB0aGUgd3JvbmcgY2xhc3Nlc1xuICAgIGlmIChlbC5fX3hfdHJhbnNpdGlvbikge1xuICAgICAgZWwuX194X3RyYW5zaXRpb24uY2FuY2VsICYmIGVsLl9feF90cmFuc2l0aW9uLmNhbmNlbCgpO1xuICAgIH1cblxuICAgIGNvbnN0IG9yaWdpbmFsQ2xhc3NlcyA9IGVsLl9feF9vcmlnaW5hbF9jbGFzc2VzIHx8IFtdO1xuICAgIGNvbnN0IHN0YWdlcyA9IHtcbiAgICAgIHN0YXJ0KCkge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXNTdGFydCk7XG4gICAgICB9LFxuXG4gICAgICBkdXJpbmcoKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlc0R1cmluZyk7XG4gICAgICB9LFxuXG4gICAgICBzaG93KCkge1xuICAgICAgICBob29rMSgpO1xuICAgICAgfSxcblxuICAgICAgZW5kKCkge1xuICAgICAgICAvLyBEb24ndCByZW1vdmUgY2xhc3NlcyB0aGF0IHdlcmUgaW4gdGhlIG9yaWdpbmFsIGNsYXNzIGF0dHJpYnV0ZS5cbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSguLi5jbGFzc2VzU3RhcnQuZmlsdGVyKGkgPT4gIW9yaWdpbmFsQ2xhc3Nlcy5pbmNsdWRlcyhpKSkpO1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXNFbmQpO1xuICAgICAgfSxcblxuICAgICAgaGlkZSgpIHtcbiAgICAgICAgaG9vazIoKTtcbiAgICAgIH0sXG5cbiAgICAgIGNsZWFudXAoKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoLi4uY2xhc3Nlc0R1cmluZy5maWx0ZXIoaSA9PiAhb3JpZ2luYWxDbGFzc2VzLmluY2x1ZGVzKGkpKSk7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoLi4uY2xhc3Nlc0VuZC5maWx0ZXIoaSA9PiAhb3JpZ2luYWxDbGFzc2VzLmluY2x1ZGVzKGkpKSk7XG4gICAgICB9XG5cbiAgICB9O1xuICAgIHRyYW5zaXRpb24oZWwsIHN0YWdlcywgdHlwZSwgcmVqZWN0KTtcbiAgfVxuICBmdW5jdGlvbiB0cmFuc2l0aW9uKGVsLCBzdGFnZXMsIHR5cGUsIHJlamVjdCkge1xuICAgIGNvbnN0IGZpbmlzaCA9IG9uY2UoKCkgPT4ge1xuICAgICAgc3RhZ2VzLmhpZGUoKTsgLy8gQWRkaW5nIGFuIFwiaXNDb25uZWN0ZWRcIiBjaGVjaywgaW4gY2FzZSB0aGUgY2FsbGJhY2tcbiAgICAgIC8vIHJlbW92ZWQgdGhlIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxuXG4gICAgICBpZiAoZWwuaXNDb25uZWN0ZWQpIHtcbiAgICAgICAgc3RhZ2VzLmNsZWFudXAoKTtcbiAgICAgIH1cblxuICAgICAgZGVsZXRlIGVsLl9feF90cmFuc2l0aW9uO1xuICAgIH0pO1xuICAgIGVsLl9feF90cmFuc2l0aW9uID0ge1xuICAgICAgLy8gU2V0IHRyYW5zaXRpb24gdHlwZSBzbyB3ZSBjYW4gYXZvaWQgY2xlYXJpbmcgdHJhbnNpdGlvbiBpZiB0aGUgZGlyZWN0aW9uIGlzIHRoZSBzYW1lXG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAgLy8gY3JlYXRlIGEgY2FsbGJhY2sgZm9yIHRoZSBsYXN0IHN0YWdlcyBvZiB0aGUgdHJhbnNpdGlvbiBzbyB3ZSBjYW4gY2FsbCBpdFxuICAgICAgLy8gZnJvbSBkaWZmZXJlbnQgcG9pbnQgYW5kIGVhcmx5IHRlcm1pbmF0ZSBpdC4gT25jZSB3aWxsIGVuc3VyZSB0aGF0IGZ1bmN0aW9uXG4gICAgICAvLyBpcyBvbmx5IGNhbGxlZCBvbmUgdGltZS5cbiAgICAgIGNhbmNlbDogb25jZSgoKSA9PiB7XG4gICAgICAgIHJlamVjdChUUkFOU0lUSU9OX0NBTkNFTExFRCk7XG4gICAgICAgIGZpbmlzaCgpO1xuICAgICAgfSksXG4gICAgICBmaW5pc2gsXG4gICAgICAvLyBUaGlzIHN0b3JlIHRoZSBuZXh0IGFuaW1hdGlvbiBmcmFtZSBzbyB3ZSBjYW4gY2FuY2VsIGl0XG4gICAgICBuZXh0RnJhbWU6IG51bGxcbiAgICB9O1xuICAgIHN0YWdlcy5zdGFydCgpO1xuICAgIHN0YWdlcy5kdXJpbmcoKTtcbiAgICBlbC5fX3hfdHJhbnNpdGlvbi5uZXh0RnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgLy8gTm90ZTogU2FmYXJpJ3MgdHJhbnNpdGlvbkR1cmF0aW9uIHByb3BlcnR5IHdpbGwgbGlzdCBvdXQgY29tbWEgc2VwYXJhdGVkIHRyYW5zaXRpb24gZHVyYXRpb25zXG4gICAgICAvLyBmb3IgZXZlcnkgc2luZ2xlIHRyYW5zaXRpb24gcHJvcGVydHkuIExldCdzIGdyYWIgdGhlIGZpcnN0IG9uZSBhbmQgY2FsbCBpdCBhIGRheS5cbiAgICAgIGxldCBkdXJhdGlvbiA9IE51bWJlcihnZXRDb21wdXRlZFN0eWxlKGVsKS50cmFuc2l0aW9uRHVyYXRpb24ucmVwbGFjZSgvLC4qLywgJycpLnJlcGxhY2UoJ3MnLCAnJykpICogMTAwMDtcblxuICAgICAgaWYgKGR1cmF0aW9uID09PSAwKSB7XG4gICAgICAgIGR1cmF0aW9uID0gTnVtYmVyKGdldENvbXB1dGVkU3R5bGUoZWwpLmFuaW1hdGlvbkR1cmF0aW9uLnJlcGxhY2UoJ3MnLCAnJykpICogMTAwMDtcbiAgICAgIH1cblxuICAgICAgc3RhZ2VzLnNob3coKTtcbiAgICAgIGVsLl9feF90cmFuc2l0aW9uLm5leHRGcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHN0YWdlcy5lbmQoKTtcbiAgICAgICAgc2V0VGltZW91dChlbC5fX3hfdHJhbnNpdGlvbi5maW5pc2gsIGR1cmF0aW9uKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIGlzTnVtZXJpYyhzdWJqZWN0KSB7XG4gICAgcmV0dXJuICFBcnJheS5pc0FycmF5KHN1YmplY3QpICYmICFpc05hTihzdWJqZWN0KTtcbiAgfSAvLyBUaGFua3MgQHZ1ZWpzXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92dWVqcy92dWUvYmxvYi80ZGU0NjQ5ZDk2MzcyNjJhOWIwMDc3MjBiNTlmODBhYzcyYTU2MjBjL3NyYy9zaGFyZWQvdXRpbC5qc1xuXG4gIGZ1bmN0aW9uIG9uY2UoY2FsbGJhY2spIHtcbiAgICBsZXQgY2FsbGVkID0gZmFsc2U7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghY2FsbGVkKSB7XG4gICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUZvckRpcmVjdGl2ZShjb21wb25lbnQsIHRlbXBsYXRlRWwsIGV4cHJlc3Npb24sIGluaXRpYWxVcGRhdGUsIGV4dHJhVmFycykge1xuICAgIHdhcm5JZk1hbGZvcm1lZFRlbXBsYXRlKHRlbXBsYXRlRWwsICd4LWZvcicpO1xuICAgIGxldCBpdGVyYXRvck5hbWVzID0gdHlwZW9mIGV4cHJlc3Npb24gPT09ICdmdW5jdGlvbicgPyBwYXJzZUZvckV4cHJlc3Npb24oY29tcG9uZW50LmV2YWx1YXRlUmV0dXJuRXhwcmVzc2lvbih0ZW1wbGF0ZUVsLCBleHByZXNzaW9uKSkgOiBwYXJzZUZvckV4cHJlc3Npb24oZXhwcmVzc2lvbik7XG4gICAgbGV0IGl0ZW1zID0gZXZhbHVhdGVJdGVtc0FuZFJldHVybkVtcHR5SWZYSWZJc1ByZXNlbnRBbmRGYWxzZU9uRWxlbWVudChjb21wb25lbnQsIHRlbXBsYXRlRWwsIGl0ZXJhdG9yTmFtZXMsIGV4dHJhVmFycyk7IC8vIEFzIHdlIHdhbGsgdGhlIGFycmF5LCB3ZSdsbCBhbHNvIHdhbGsgdGhlIERPTSAodXBkYXRpbmcvY3JlYXRpbmcgYXMgd2UgZ28pLlxuXG4gICAgbGV0IGN1cnJlbnRFbCA9IHRlbXBsYXRlRWw7XG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgIGxldCBpdGVyYXRpb25TY29wZVZhcmlhYmxlcyA9IGdldEl0ZXJhdGlvblNjb3BlVmFyaWFibGVzKGl0ZXJhdG9yTmFtZXMsIGl0ZW0sIGluZGV4LCBpdGVtcywgZXh0cmFWYXJzKCkpO1xuICAgICAgbGV0IGN1cnJlbnRLZXkgPSBnZW5lcmF0ZUtleUZvckl0ZXJhdGlvbihjb21wb25lbnQsIHRlbXBsYXRlRWwsIGluZGV4LCBpdGVyYXRpb25TY29wZVZhcmlhYmxlcyk7XG4gICAgICBsZXQgbmV4dEVsID0gbG9va0FoZWFkRm9yTWF0Y2hpbmdLZXllZEVsZW1lbnRBbmRNb3ZlSXRJZkZvdW5kKGN1cnJlbnRFbC5uZXh0RWxlbWVudFNpYmxpbmcsIGN1cnJlbnRLZXkpOyAvLyBJZiB3ZSBoYXZlbid0IGZvdW5kIGEgbWF0Y2hpbmcga2V5LCBpbnNlcnQgdGhlIGVsZW1lbnQgYXQgdGhlIGN1cnJlbnQgcG9zaXRpb24uXG5cbiAgICAgIGlmICghbmV4dEVsKSB7XG4gICAgICAgIG5leHRFbCA9IGFkZEVsZW1lbnRJbkxvb3BBZnRlckN1cnJlbnRFbCh0ZW1wbGF0ZUVsLCBjdXJyZW50RWwpOyAvLyBBbmQgdHJhbnNpdGlvbiBpdCBpbiBpZiBpdCdzIG5vdCB0aGUgZmlyc3QgcGFnZSBsb2FkLlxuXG4gICAgICAgIHRyYW5zaXRpb25JbihuZXh0RWwsICgpID0+IHt9LCAoKSA9PiB7fSwgY29tcG9uZW50LCBpbml0aWFsVXBkYXRlKTtcbiAgICAgICAgbmV4dEVsLl9feF9mb3IgPSBpdGVyYXRpb25TY29wZVZhcmlhYmxlcztcbiAgICAgICAgY29tcG9uZW50LmluaXRpYWxpemVFbGVtZW50cyhuZXh0RWwsICgpID0+IG5leHRFbC5fX3hfZm9yKTsgLy8gT3RoZXJ3aXNlIHVwZGF0ZSB0aGUgZWxlbWVudCB3ZSBmb3VuZC5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRlbXBvcmFyaWx5IHJlbW92ZSB0aGUga2V5IGluZGljYXRvciB0byBhbGxvdyB0aGUgbm9ybWFsIFwidXBkYXRlRWxlbWVudHNcIiB0byB3b3JrLlxuICAgICAgICBkZWxldGUgbmV4dEVsLl9feF9mb3Jfa2V5O1xuICAgICAgICBuZXh0RWwuX194X2ZvciA9IGl0ZXJhdGlvblNjb3BlVmFyaWFibGVzO1xuICAgICAgICBjb21wb25lbnQudXBkYXRlRWxlbWVudHMobmV4dEVsLCAoKSA9PiBuZXh0RWwuX194X2Zvcik7XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnRFbCA9IG5leHRFbDtcbiAgICAgIGN1cnJlbnRFbC5fX3hfZm9yX2tleSA9IGN1cnJlbnRLZXk7XG4gICAgfSk7XG4gICAgcmVtb3ZlQW55TGVmdE92ZXJFbGVtZW50c0Zyb21QcmV2aW91c1VwZGF0ZShjdXJyZW50RWwsIGNvbXBvbmVudCk7XG4gIH0gLy8gVGhpcyB3YXMgdGFrZW4gZnJvbSBWdWVKUyAyLiogY29yZS4gVGhhbmtzIFZ1ZSFcblxuICBmdW5jdGlvbiBwYXJzZUZvckV4cHJlc3Npb24oZXhwcmVzc2lvbikge1xuICAgIGxldCBmb3JJdGVyYXRvclJFID0gLywoW14sXFx9XFxdXSopKD86LChbXixcXH1cXF1dKikpPyQvO1xuICAgIGxldCBzdHJpcFBhcmVuc1JFID0gL15cXCh8XFwpJC9nO1xuICAgIGxldCBmb3JBbGlhc1JFID0gLyhbXFxzXFxTXSo/KVxccysoPzppbnxvZilcXHMrKFtcXHNcXFNdKikvO1xuICAgIGxldCBpbk1hdGNoID0gZXhwcmVzc2lvbi5tYXRjaChmb3JBbGlhc1JFKTtcbiAgICBpZiAoIWluTWF0Y2gpIHJldHVybjtcbiAgICBsZXQgcmVzID0ge307XG4gICAgcmVzLml0ZW1zID0gaW5NYXRjaFsyXS50cmltKCk7XG4gICAgbGV0IGl0ZW0gPSBpbk1hdGNoWzFdLnRyaW0oKS5yZXBsYWNlKHN0cmlwUGFyZW5zUkUsICcnKTtcbiAgICBsZXQgaXRlcmF0b3JNYXRjaCA9IGl0ZW0ubWF0Y2goZm9ySXRlcmF0b3JSRSk7XG5cbiAgICBpZiAoaXRlcmF0b3JNYXRjaCkge1xuICAgICAgcmVzLml0ZW0gPSBpdGVtLnJlcGxhY2UoZm9ySXRlcmF0b3JSRSwgJycpLnRyaW0oKTtcbiAgICAgIHJlcy5pbmRleCA9IGl0ZXJhdG9yTWF0Y2hbMV0udHJpbSgpO1xuXG4gICAgICBpZiAoaXRlcmF0b3JNYXRjaFsyXSkge1xuICAgICAgICByZXMuY29sbGVjdGlvbiA9IGl0ZXJhdG9yTWF0Y2hbMl0udHJpbSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXMuaXRlbSA9IGl0ZW07XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEl0ZXJhdGlvblNjb3BlVmFyaWFibGVzKGl0ZXJhdG9yTmFtZXMsIGl0ZW0sIGluZGV4LCBpdGVtcywgZXh0cmFWYXJzKSB7XG4gICAgLy8gV2UgbXVzdCBjcmVhdGUgYSBuZXcgb2JqZWN0LCBzbyBlYWNoIGl0ZXJhdGlvbiBoYXMgYSBuZXcgc2NvcGVcbiAgICBsZXQgc2NvcGVWYXJpYWJsZXMgPSBleHRyYVZhcnMgPyBfb2JqZWN0U3ByZWFkMih7fSwgZXh0cmFWYXJzKSA6IHt9O1xuICAgIHNjb3BlVmFyaWFibGVzW2l0ZXJhdG9yTmFtZXMuaXRlbV0gPSBpdGVtO1xuICAgIGlmIChpdGVyYXRvck5hbWVzLmluZGV4KSBzY29wZVZhcmlhYmxlc1tpdGVyYXRvck5hbWVzLmluZGV4XSA9IGluZGV4O1xuICAgIGlmIChpdGVyYXRvck5hbWVzLmNvbGxlY3Rpb24pIHNjb3BlVmFyaWFibGVzW2l0ZXJhdG9yTmFtZXMuY29sbGVjdGlvbl0gPSBpdGVtcztcbiAgICByZXR1cm4gc2NvcGVWYXJpYWJsZXM7XG4gIH1cblxuICBmdW5jdGlvbiBnZW5lcmF0ZUtleUZvckl0ZXJhdGlvbihjb21wb25lbnQsIGVsLCBpbmRleCwgaXRlcmF0aW9uU2NvcGVWYXJpYWJsZXMpIHtcbiAgICBsZXQgYmluZEtleUF0dHJpYnV0ZSA9IGdldFhBdHRycyhlbCwgY29tcG9uZW50LCAnYmluZCcpLmZpbHRlcihhdHRyID0+IGF0dHIudmFsdWUgPT09ICdrZXknKVswXTsgLy8gSWYgdGhlIGRldiBoYXNuJ3Qgc3BlY2lmaWVkIGEga2V5LCBqdXN0IHJldHVybiB0aGUgaW5kZXggb2YgdGhlIGl0ZXJhdGlvbi5cblxuICAgIGlmICghYmluZEtleUF0dHJpYnV0ZSkgcmV0dXJuIGluZGV4O1xuICAgIHJldHVybiBjb21wb25lbnQuZXZhbHVhdGVSZXR1cm5FeHByZXNzaW9uKGVsLCBiaW5kS2V5QXR0cmlidXRlLmV4cHJlc3Npb24sICgpID0+IGl0ZXJhdGlvblNjb3BlVmFyaWFibGVzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV2YWx1YXRlSXRlbXNBbmRSZXR1cm5FbXB0eUlmWElmSXNQcmVzZW50QW5kRmFsc2VPbkVsZW1lbnQoY29tcG9uZW50LCBlbCwgaXRlcmF0b3JOYW1lcywgZXh0cmFWYXJzKSB7XG4gICAgbGV0IGlmQXR0cmlidXRlID0gZ2V0WEF0dHJzKGVsLCBjb21wb25lbnQsICdpZicpWzBdO1xuXG4gICAgaWYgKGlmQXR0cmlidXRlICYmICFjb21wb25lbnQuZXZhbHVhdGVSZXR1cm5FeHByZXNzaW9uKGVsLCBpZkF0dHJpYnV0ZS5leHByZXNzaW9uKSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGxldCBpdGVtcyA9IGNvbXBvbmVudC5ldmFsdWF0ZVJldHVybkV4cHJlc3Npb24oZWwsIGl0ZXJhdG9yTmFtZXMuaXRlbXMsIGV4dHJhVmFycyk7IC8vIFRoaXMgYWRkcyBzdXBwb3J0IGZvciB0aGUgYGkgaW4gbmAgc3ludGF4LlxuXG4gICAgaWYgKGlzTnVtZXJpYyhpdGVtcykgJiYgaXRlbXMgPiAwKSB7XG4gICAgICBpdGVtcyA9IEFycmF5LmZyb20oQXJyYXkoaXRlbXMpLmtleXMoKSwgaSA9PiBpICsgMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZW1zO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkRWxlbWVudEluTG9vcEFmdGVyQ3VycmVudEVsKHRlbXBsYXRlRWwsIGN1cnJlbnRFbCkge1xuICAgIGxldCBjbG9uZSA9IGRvY3VtZW50LmltcG9ydE5vZGUodGVtcGxhdGVFbC5jb250ZW50LCB0cnVlKTtcbiAgICBjdXJyZW50RWwucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoY2xvbmUsIGN1cnJlbnRFbC5uZXh0RWxlbWVudFNpYmxpbmcpO1xuICAgIHJldHVybiBjdXJyZW50RWwubmV4dEVsZW1lbnRTaWJsaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9va0FoZWFkRm9yTWF0Y2hpbmdLZXllZEVsZW1lbnRBbmRNb3ZlSXRJZkZvdW5kKG5leHRFbCwgY3VycmVudEtleSkge1xuICAgIGlmICghbmV4dEVsKSByZXR1cm47IC8vIElmIHdlIGFyZSBhbHJlYWR5IHBhc3QgdGhlIHgtZm9yIGdlbmVyYXRlZCBlbGVtZW50cywgd2UgZG9uJ3QgbmVlZCB0byBsb29rIGFoZWFkLlxuXG4gICAgaWYgKG5leHRFbC5fX3hfZm9yX2tleSA9PT0gdW5kZWZpbmVkKSByZXR1cm47IC8vIElmIHRoZSB0aGUga2V5J3MgRE8gbWF0Y2gsIG5vIG5lZWQgdG8gbG9vayBhaGVhZC5cblxuICAgIGlmIChuZXh0RWwuX194X2Zvcl9rZXkgPT09IGN1cnJlbnRLZXkpIHJldHVybiBuZXh0RWw7IC8vIElmIHRoZXkgZG9uJ3QsIHdlJ2xsIGxvb2sgYWhlYWQgZm9yIGEgbWF0Y2guXG4gICAgLy8gSWYgd2UgZmluZCBpdCwgd2UnbGwgbW92ZSBpdCB0byB0aGUgY3VycmVudCBwb3NpdGlvbiBpbiB0aGUgbG9vcC5cblxuICAgIGxldCB0bXBOZXh0RWwgPSBuZXh0RWw7XG5cbiAgICB3aGlsZSAodG1wTmV4dEVsKSB7XG4gICAgICBpZiAodG1wTmV4dEVsLl9feF9mb3Jfa2V5ID09PSBjdXJyZW50S2V5KSB7XG4gICAgICAgIHJldHVybiB0bXBOZXh0RWwucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUodG1wTmV4dEVsLCBuZXh0RWwpO1xuICAgICAgfVxuXG4gICAgICB0bXBOZXh0RWwgPSB0bXBOZXh0RWwubmV4dEVsZW1lbnRTaWJsaW5nICYmIHRtcE5leHRFbC5uZXh0RWxlbWVudFNpYmxpbmcuX194X2Zvcl9rZXkgIT09IHVuZGVmaW5lZCA/IHRtcE5leHRFbC5uZXh0RWxlbWVudFNpYmxpbmcgOiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVBbnlMZWZ0T3ZlckVsZW1lbnRzRnJvbVByZXZpb3VzVXBkYXRlKGN1cnJlbnRFbCwgY29tcG9uZW50KSB7XG4gICAgdmFyIG5leHRFbGVtZW50RnJvbU9sZExvb3AgPSBjdXJyZW50RWwubmV4dEVsZW1lbnRTaWJsaW5nICYmIGN1cnJlbnRFbC5uZXh0RWxlbWVudFNpYmxpbmcuX194X2Zvcl9rZXkgIT09IHVuZGVmaW5lZCA/IGN1cnJlbnRFbC5uZXh0RWxlbWVudFNpYmxpbmcgOiBmYWxzZTtcblxuICAgIHdoaWxlIChuZXh0RWxlbWVudEZyb21PbGRMb29wKSB7XG4gICAgICBsZXQgbmV4dEVsZW1lbnRGcm9tT2xkTG9vcEltbXV0YWJsZSA9IG5leHRFbGVtZW50RnJvbU9sZExvb3A7XG4gICAgICBsZXQgbmV4dFNpYmxpbmcgPSBuZXh0RWxlbWVudEZyb21PbGRMb29wLm5leHRFbGVtZW50U2libGluZztcbiAgICAgIHRyYW5zaXRpb25PdXQobmV4dEVsZW1lbnRGcm9tT2xkTG9vcCwgKCkgPT4ge1xuICAgICAgICBuZXh0RWxlbWVudEZyb21PbGRMb29wSW1tdXRhYmxlLnJlbW92ZSgpO1xuICAgICAgfSwgKCkgPT4ge30sIGNvbXBvbmVudCk7XG4gICAgICBuZXh0RWxlbWVudEZyb21PbGRMb29wID0gbmV4dFNpYmxpbmcgJiYgbmV4dFNpYmxpbmcuX194X2Zvcl9rZXkgIT09IHVuZGVmaW5lZCA/IG5leHRTaWJsaW5nIDogZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlQXR0cmlidXRlQmluZGluZ0RpcmVjdGl2ZShjb21wb25lbnQsIGVsLCBhdHRyTmFtZSwgZXhwcmVzc2lvbiwgZXh0cmFWYXJzLCBhdHRyVHlwZSwgbW9kaWZpZXJzKSB7XG4gICAgdmFyIHZhbHVlID0gY29tcG9uZW50LmV2YWx1YXRlUmV0dXJuRXhwcmVzc2lvbihlbCwgZXhwcmVzc2lvbiwgZXh0cmFWYXJzKTtcblxuICAgIGlmIChhdHRyTmFtZSA9PT0gJ3ZhbHVlJykge1xuICAgICAgaWYgKEFscGluZS5pZ25vcmVGb2N1c2VkRm9yVmFsdWVCaW5kaW5nICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuaXNTYW1lTm9kZShlbCkpIHJldHVybjsgLy8gSWYgbmVzdGVkIG1vZGVsIGtleSBpcyB1bmRlZmluZWQsIHNldCB0aGUgZGVmYXVsdCB2YWx1ZSB0byBlbXB0eSBzdHJpbmcuXG5cbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmIGV4cHJlc3Npb24ubWF0Y2goL1xcLi8pKSB7XG4gICAgICAgIHZhbHVlID0gJyc7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbC50eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAgIC8vIFNldCByYWRpbyB2YWx1ZSBmcm9tIHgtYmluZDp2YWx1ZSwgaWYgbm8gXCJ2YWx1ZVwiIGF0dHJpYnV0ZSBleGlzdHMuXG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBhbnkgaW5pdGlhbCBzdGF0ZSB2YWx1ZXMsIHJhZGlvIHdpbGwgaGF2ZSBhIGNvcnJlY3RcbiAgICAgICAgLy8gXCJjaGVja2VkXCIgdmFsdWUgc2luY2UgeC1iaW5kOnZhbHVlIGlzIHByb2Nlc3NlZCBiZWZvcmUgeC1tb2RlbC5cbiAgICAgICAgaWYgKGVsLmF0dHJpYnV0ZXMudmFsdWUgPT09IHVuZGVmaW5lZCAmJiBhdHRyVHlwZSA9PT0gJ2JpbmQnKSB7XG4gICAgICAgICAgZWwudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChhdHRyVHlwZSAhPT0gJ2JpbmQnKSB7XG4gICAgICAgICAgZWwuY2hlY2tlZCA9IGNoZWNrZWRBdHRyTG9vc2VDb21wYXJlKGVsLnZhbHVlLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZWwudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAvLyBJZiB3ZSBhcmUgZXhwbGljaXRseSBiaW5kaW5nIGEgc3RyaW5nIHRvIHRoZSA6dmFsdWUsIHNldCB0aGUgc3RyaW5nLFxuICAgICAgICAvLyBJZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLCBsZWF2ZSBpdCBhbG9uZSwgaXQgd2lsbCBiZSBzZXQgdG8gXCJvblwiXG4gICAgICAgIC8vIGF1dG9tYXRpY2FsbHkuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdib29sZWFuJyAmJiAhW251bGwsIHVuZGVmaW5lZF0uaW5jbHVkZXModmFsdWUpICYmIGF0dHJUeXBlID09PSAnYmluZCcpIHtcbiAgICAgICAgICBlbC52YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoYXR0clR5cGUgIT09ICdiaW5kJykge1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgLy8gSSdtIHB1cnBvc2VseSBub3QgdXNpbmcgQXJyYXkuaW5jbHVkZXMgaGVyZSBiZWNhdXNlIGl0J3NcbiAgICAgICAgICAgIC8vIHN0cmljdCwgYW5kIGJlY2F1c2Ugb2YgTnVtZXJpYy9TdHJpbmcgbWlzLWNhc3RpbmcsIElcbiAgICAgICAgICAgIC8vIHdhbnQgdGhlIFwiaW5jbHVkZXNcIiB0byBiZSBcImZ1enp5XCIuXG4gICAgICAgICAgICBlbC5jaGVja2VkID0gdmFsdWUuc29tZSh2YWwgPT4gY2hlY2tlZEF0dHJMb29zZUNvbXBhcmUodmFsLCBlbC52YWx1ZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbC5jaGVja2VkID0gISF2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZWwudGFnTmFtZSA9PT0gJ1NFTEVDVCcpIHtcbiAgICAgICAgdXBkYXRlU2VsZWN0KGVsLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZWwudmFsdWUgPT09IHZhbHVlKSByZXR1cm47XG4gICAgICAgIGVsLnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhdHRyTmFtZSA9PT0gJ2NsYXNzJykge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsQ2xhc3NlcyA9IGVsLl9feF9vcmlnaW5hbF9jbGFzc2VzIHx8IFtdO1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgYXJyYXlVbmlxdWUob3JpZ2luYWxDbGFzc2VzLmNvbmNhdCh2YWx1ZSkpLmpvaW4oJyAnKSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gU29ydGluZyB0aGUga2V5cyAvIGNsYXNzIG5hbWVzIGJ5IHRoZWlyIGJvb2xlYW4gdmFsdWUgd2lsbCBlbnN1cmUgdGhhdFxuICAgICAgICAvLyBhbnl0aGluZyB0aGF0IGV2YWx1YXRlcyB0byBgZmFsc2VgIGFuZCBuZWVkcyB0byByZW1vdmUgY2xhc3NlcyBpcyBydW4gZmlyc3QuXG4gICAgICAgIGNvbnN0IGtleXNTb3J0ZWRCeUJvb2xlYW5WYWx1ZSA9IE9iamVjdC5rZXlzKHZhbHVlKS5zb3J0KChhLCBiKSA9PiB2YWx1ZVthXSAtIHZhbHVlW2JdKTtcbiAgICAgICAga2V5c1NvcnRlZEJ5Qm9vbGVhblZhbHVlLmZvckVhY2goY2xhc3NOYW1lcyA9PiB7XG4gICAgICAgICAgaWYgKHZhbHVlW2NsYXNzTmFtZXNdKSB7XG4gICAgICAgICAgICBjb252ZXJ0Q2xhc3NTdHJpbmdUb0FycmF5KGNsYXNzTmFtZXMpLmZvckVhY2goY2xhc3NOYW1lID0+IGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnZlcnRDbGFzc1N0cmluZ1RvQXJyYXkoY2xhc3NOYW1lcykuZm9yRWFjaChjbGFzc05hbWUgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxDbGFzc2VzID0gZWwuX194X29yaWdpbmFsX2NsYXNzZXMgfHwgW107XG4gICAgICAgIGNvbnN0IG5ld0NsYXNzZXMgPSB2YWx1ZSA/IGNvbnZlcnRDbGFzc1N0cmluZ1RvQXJyYXkodmFsdWUpIDogW107XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBhcnJheVVuaXF1ZShvcmlnaW5hbENsYXNzZXMuY29uY2F0KG5ld0NsYXNzZXMpKS5qb2luKCcgJykpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhdHRyTmFtZSA9IG1vZGlmaWVycy5pbmNsdWRlcygnY2FtZWwnKSA/IGNhbWVsQ2FzZShhdHRyTmFtZSkgOiBhdHRyTmFtZTsgLy8gSWYgYW4gYXR0cmlidXRlJ3MgYm91bmQgdmFsdWUgaXMgbnVsbCwgdW5kZWZpbmVkIG9yIGZhbHNlLCByZW1vdmUgdGhlIGF0dHJpYnV0ZVxuXG4gICAgICBpZiAoW251bGwsIHVuZGVmaW5lZCwgZmFsc2VdLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNCb29sZWFuQXR0cihhdHRyTmFtZSkgPyBzZXRJZkNoYW5nZWQoZWwsIGF0dHJOYW1lLCBhdHRyTmFtZSkgOiBzZXRJZkNoYW5nZWQoZWwsIGF0dHJOYW1lLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0SWZDaGFuZ2VkKGVsLCBhdHRyTmFtZSwgdmFsdWUpIHtcbiAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKGF0dHJOYW1lKSAhPSB2YWx1ZSkge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlU2VsZWN0KGVsLCB2YWx1ZSkge1xuICAgIGNvbnN0IGFycmF5V3JhcHBlZFZhbHVlID0gW10uY29uY2F0KHZhbHVlKS5tYXAodmFsdWUgPT4ge1xuICAgICAgcmV0dXJuIHZhbHVlICsgJyc7XG4gICAgfSk7XG4gICAgQXJyYXkuZnJvbShlbC5vcHRpb25zKS5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICBvcHRpb24uc2VsZWN0ZWQgPSBhcnJheVdyYXBwZWRWYWx1ZS5pbmNsdWRlcyhvcHRpb24udmFsdWUgfHwgb3B0aW9uLnRleHQpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlVGV4dERpcmVjdGl2ZShlbCwgb3V0cHV0LCBleHByZXNzaW9uKSB7XG4gICAgLy8gSWYgbmVzdGVkIG1vZGVsIGtleSBpcyB1bmRlZmluZWQsIHNldCB0aGUgZGVmYXVsdCB2YWx1ZSB0byBlbXB0eSBzdHJpbmcuXG4gICAgaWYgKG91dHB1dCA9PT0gdW5kZWZpbmVkICYmIGV4cHJlc3Npb24ubWF0Y2goL1xcLi8pKSB7XG4gICAgICBvdXRwdXQgPSAnJztcbiAgICB9XG5cbiAgICBlbC50ZXh0Q29udGVudCA9IG91dHB1dDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUh0bWxEaXJlY3RpdmUoY29tcG9uZW50LCBlbCwgZXhwcmVzc2lvbiwgZXh0cmFWYXJzKSB7XG4gICAgZWwuaW5uZXJIVE1MID0gY29tcG9uZW50LmV2YWx1YXRlUmV0dXJuRXhwcmVzc2lvbihlbCwgZXhwcmVzc2lvbiwgZXh0cmFWYXJzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVNob3dEaXJlY3RpdmUoY29tcG9uZW50LCBlbCwgdmFsdWUsIG1vZGlmaWVycywgaW5pdGlhbFVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgaGlkZSA9ICgpID0+IHtcbiAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBlbC5fX3hfaXNfc2hvd24gPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2hvdyA9ICgpID0+IHtcbiAgICAgIGlmIChlbC5zdHlsZS5sZW5ndGggPT09IDEgJiYgZWwuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKSB7XG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLnN0eWxlLnJlbW92ZVByb3BlcnR5KCdkaXNwbGF5Jyk7XG4gICAgICB9XG5cbiAgICAgIGVsLl9feF9pc19zaG93biA9IHRydWU7XG4gICAgfTtcblxuICAgIGlmIChpbml0aWFsVXBkYXRlID09PSB0cnVlKSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgc2hvdygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGlkZSgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlID0gKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGlmIChlbC5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgfHwgZWwuX194X3RyYW5zaXRpb24pIHtcbiAgICAgICAgICB0cmFuc2l0aW9uSW4oZWwsICgpID0+IHtcbiAgICAgICAgICAgIHNob3coKTtcbiAgICAgICAgICB9LCByZWplY3QsIGNvbXBvbmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXNvbHZlKCgpID0+IHt9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChlbC5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScpIHtcbiAgICAgICAgICB0cmFuc2l0aW9uT3V0KGVsLCAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCgpID0+IHtcbiAgICAgICAgICAgICAgaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSwgcmVqZWN0LCBjb21wb25lbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoKCkgPT4ge30pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTsgLy8gVGhlIHdvcmtpbmcgb2YgeC1zaG93IGlzIGEgYml0IGNvbXBsZXggYmVjYXVzZSB3ZSBuZWVkIHRvXG4gICAgLy8gd2FpdCBmb3IgYW55IGNoaWxkIHRyYW5zaXRpb25zIHRvIGZpbmlzaCBiZWZvcmUgaGlkaW5nXG4gICAgLy8gc29tZSBlbGVtZW50LiBBbHNvLCB0aGlzIGhhcyB0byBiZSBkb25lIHJlY3Vyc2l2ZWx5LlxuICAgIC8vIElmIHgtc2hvdy5pbW1lZGlhdGUsIGZvcmVnb2UgdGhlIHdhaXRpbmcuXG5cblxuICAgIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoJ2ltbWVkaWF0ZScpKSB7XG4gICAgICBoYW5kbGUoZmluaXNoID0+IGZpbmlzaCgpLCAoKSA9PiB7fSk7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyB4LXNob3cgaXMgZW5jb3VudGVyZWQgZHVyaW5nIGEgRE9NIHRyZWUgd2Fsay4gSWYgYW4gZWxlbWVudFxuICAgIC8vIHdlIGVuY291bnRlciBpcyBOT1QgYSBjaGlsZCBvZiBhbm90aGVyIHgtc2hvdyBlbGVtZW50IHdlXG4gICAgLy8gY2FuIGV4ZWN1dGUgdGhlIHByZXZpb3VzIHgtc2hvdyBzdGFjayAoaWYgb25lIGV4aXN0cykuXG5cblxuICAgIGlmIChjb21wb25lbnQuc2hvd0RpcmVjdGl2ZUxhc3RFbGVtZW50ICYmICFjb21wb25lbnQuc2hvd0RpcmVjdGl2ZUxhc3RFbGVtZW50LmNvbnRhaW5zKGVsKSkge1xuICAgICAgY29tcG9uZW50LmV4ZWN1dGVBbmRDbGVhclJlbWFpbmluZ1Nob3dEaXJlY3RpdmVTdGFjaygpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudC5zaG93RGlyZWN0aXZlU3RhY2sucHVzaChoYW5kbGUpO1xuICAgIGNvbXBvbmVudC5zaG93RGlyZWN0aXZlTGFzdEVsZW1lbnQgPSBlbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUlmRGlyZWN0aXZlKGNvbXBvbmVudCwgZWwsIGV4cHJlc3Npb25SZXN1bHQsIGluaXRpYWxVcGRhdGUsIGV4dHJhVmFycykge1xuICAgIHdhcm5JZk1hbGZvcm1lZFRlbXBsYXRlKGVsLCAneC1pZicpO1xuICAgIGNvbnN0IGVsZW1lbnRIYXNBbHJlYWR5QmVlbkFkZGVkID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nICYmIGVsLm5leHRFbGVtZW50U2libGluZy5fX3hfaW5zZXJ0ZWRfbWUgPT09IHRydWU7XG5cbiAgICBpZiAoZXhwcmVzc2lvblJlc3VsdCAmJiAoIWVsZW1lbnRIYXNBbHJlYWR5QmVlbkFkZGVkIHx8IGVsLl9feF90cmFuc2l0aW9uKSkge1xuICAgICAgY29uc3QgY2xvbmUgPSBkb2N1bWVudC5pbXBvcnROb2RlKGVsLmNvbnRlbnQsIHRydWUpO1xuICAgICAgZWwucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoY2xvbmUsIGVsLm5leHRFbGVtZW50U2libGluZyk7XG4gICAgICB0cmFuc2l0aW9uSW4oZWwubmV4dEVsZW1lbnRTaWJsaW5nLCAoKSA9PiB7fSwgKCkgPT4ge30sIGNvbXBvbmVudCwgaW5pdGlhbFVwZGF0ZSk7XG4gICAgICBjb21wb25lbnQuaW5pdGlhbGl6ZUVsZW1lbnRzKGVsLm5leHRFbGVtZW50U2libGluZywgZXh0cmFWYXJzKTtcbiAgICAgIGVsLm5leHRFbGVtZW50U2libGluZy5fX3hfaW5zZXJ0ZWRfbWUgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoIWV4cHJlc3Npb25SZXN1bHQgJiYgZWxlbWVudEhhc0FscmVhZHlCZWVuQWRkZWQpIHtcbiAgICAgIHRyYW5zaXRpb25PdXQoZWwubmV4dEVsZW1lbnRTaWJsaW5nLCAoKSA9PiB7XG4gICAgICAgIGVsLm5leHRFbGVtZW50U2libGluZy5yZW1vdmUoKTtcbiAgICAgIH0sICgpID0+IHt9LCBjb21wb25lbnQsIGluaXRpYWxVcGRhdGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyTGlzdGVuZXIoY29tcG9uZW50LCBlbCwgZXZlbnQsIG1vZGlmaWVycywgZXhwcmVzc2lvbiwgZXh0cmFWYXJzID0ge30pIHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgcGFzc2l2ZTogbW9kaWZpZXJzLmluY2x1ZGVzKCdwYXNzaXZlJylcbiAgICB9O1xuXG4gICAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcygnY2FtZWwnKSkge1xuICAgICAgZXZlbnQgPSBjYW1lbENhc2UoZXZlbnQpO1xuICAgIH1cblxuICAgIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoJ2F3YXknKSkge1xuICAgICAgbGV0IGhhbmRsZXIgPSBlID0+IHtcbiAgICAgICAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgdGhlIGNsaWNrIGNhbWUgZnJvbSB0aGUgZWxlbWVudCBvciB3aXRoaW4gaXQuXG4gICAgICAgIGlmIChlbC5jb250YWlucyhlLnRhcmdldCkpIHJldHVybjsgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgdGhpcyBlbGVtZW50IGlzbid0IGN1cnJlbnRseSB2aXNpYmxlLlxuXG4gICAgICAgIGlmIChlbC5vZmZzZXRXaWR0aCA8IDEgJiYgZWwub2Zmc2V0SGVpZ2h0IDwgMSkgcmV0dXJuOyAvLyBOb3cgdGhhdCB3ZSBhcmUgc3VyZSB0aGUgZWxlbWVudCBpcyB2aXNpYmxlLCBBTkQgdGhlIGNsaWNrXG4gICAgICAgIC8vIGlzIGZyb20gb3V0c2lkZSBpdCwgbGV0J3MgcnVuIHRoZSBleHByZXNzaW9uLlxuXG4gICAgICAgIHJ1bkxpc3RlbmVySGFuZGxlcihjb21wb25lbnQsIGV4cHJlc3Npb24sIGUsIGV4dHJhVmFycyk7XG5cbiAgICAgICAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcygnb25jZScpKSB7XG4gICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH07IC8vIExpc3RlbiBmb3IgdGhpcyBldmVudCBhdCB0aGUgcm9vdCBsZXZlbC5cblxuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGxpc3RlbmVyVGFyZ2V0ID0gbW9kaWZpZXJzLmluY2x1ZGVzKCd3aW5kb3cnKSA/IHdpbmRvdyA6IG1vZGlmaWVycy5pbmNsdWRlcygnZG9jdW1lbnQnKSA/IGRvY3VtZW50IDogZWw7XG5cbiAgICAgIGxldCBoYW5kbGVyID0gZSA9PiB7XG4gICAgICAgIC8vIFJlbW92ZSB0aGlzIGdsb2JhbCBldmVudCBoYW5kbGVyIGlmIHRoZSBlbGVtZW50IHRoYXQgZGVjbGFyZWQgaXRcbiAgICAgICAgLy8gaGFzIGJlZW4gcmVtb3ZlZC4gSXQncyBub3cgc3RhbGUuXG4gICAgICAgIGlmIChsaXN0ZW5lclRhcmdldCA9PT0gd2luZG93IHx8IGxpc3RlbmVyVGFyZ2V0ID09PSBkb2N1bWVudCkge1xuICAgICAgICAgIGlmICghZG9jdW1lbnQuYm9keS5jb250YWlucyhlbCkpIHtcbiAgICAgICAgICAgIGxpc3RlbmVyVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0tleUV2ZW50KGV2ZW50KSkge1xuICAgICAgICAgIGlmIChpc0xpc3RlbmluZ0ZvckFTcGVjaWZpY0tleVRoYXRIYXNudEJlZW5QcmVzc2VkKGUsIG1vZGlmaWVycykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKCdwcmV2ZW50JykpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcygnc3RvcCcpKSBlLnN0b3BQcm9wYWdhdGlvbigpOyAvLyBJZiB0aGUgLnNlbGYgbW9kaWZpZXIgaXNuJ3QgcHJlc2VudCwgb3IgaWYgaXQgaXMgcHJlc2VudCBhbmRcbiAgICAgICAgLy8gdGhlIHRhcmdldCBlbGVtZW50IG1hdGNoZXMgdGhlIGVsZW1lbnQgd2UgYXJlIHJlZ2lzdGVyaW5nIHRoZVxuICAgICAgICAvLyBldmVudCBvbiwgcnVuIHRoZSBoYW5kbGVyXG5cbiAgICAgICAgaWYgKCFtb2RpZmllcnMuaW5jbHVkZXMoJ3NlbGYnKSB8fCBlLnRhcmdldCA9PT0gZWwpIHtcbiAgICAgICAgICBjb25zdCByZXR1cm5WYWx1ZSA9IHJ1bkxpc3RlbmVySGFuZGxlcihjb21wb25lbnQsIGV4cHJlc3Npb24sIGUsIGV4dHJhVmFycyk7XG4gICAgICAgICAgcmV0dXJuVmFsdWUudGhlbih2YWx1ZSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoJ29uY2UnKSkge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoJ2RlYm91bmNlJykpIHtcbiAgICAgICAgbGV0IG5leHRNb2RpZmllciA9IG1vZGlmaWVyc1ttb2RpZmllcnMuaW5kZXhPZignZGVib3VuY2UnKSArIDFdIHx8ICdpbnZhbGlkLXdhaXQnO1xuICAgICAgICBsZXQgd2FpdCA9IGlzTnVtZXJpYyhuZXh0TW9kaWZpZXIuc3BsaXQoJ21zJylbMF0pID8gTnVtYmVyKG5leHRNb2RpZmllci5zcGxpdCgnbXMnKVswXSkgOiAyNTA7XG4gICAgICAgIGhhbmRsZXIgPSBkZWJvdW5jZShoYW5kbGVyLCB3YWl0KTtcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcnVuTGlzdGVuZXJIYW5kbGVyKGNvbXBvbmVudCwgZXhwcmVzc2lvbiwgZSwgZXh0cmFWYXJzKSB7XG4gICAgcmV0dXJuIGNvbXBvbmVudC5ldmFsdWF0ZUNvbW1hbmRFeHByZXNzaW9uKGUudGFyZ2V0LCBleHByZXNzaW9uLCAoKSA9PiB7XG4gICAgICByZXR1cm4gX29iamVjdFNwcmVhZDIoX29iamVjdFNwcmVhZDIoe30sIGV4dHJhVmFycygpKSwge30sIHtcbiAgICAgICAgJyRldmVudCc6IGVcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNLZXlFdmVudChldmVudCkge1xuICAgIHJldHVybiBbJ2tleWRvd24nLCAna2V5dXAnXS5pbmNsdWRlcyhldmVudCk7XG4gIH1cblxuICBmdW5jdGlvbiBpc0xpc3RlbmluZ0ZvckFTcGVjaWZpY0tleVRoYXRIYXNudEJlZW5QcmVzc2VkKGUsIG1vZGlmaWVycykge1xuICAgIGxldCBrZXlNb2RpZmllcnMgPSBtb2RpZmllcnMuZmlsdGVyKGkgPT4ge1xuICAgICAgcmV0dXJuICFbJ3dpbmRvdycsICdkb2N1bWVudCcsICdwcmV2ZW50JywgJ3N0b3AnXS5pbmNsdWRlcyhpKTtcbiAgICB9KTtcblxuICAgIGlmIChrZXlNb2RpZmllcnMuaW5jbHVkZXMoJ2RlYm91bmNlJykpIHtcbiAgICAgIGxldCBkZWJvdW5jZUluZGV4ID0ga2V5TW9kaWZpZXJzLmluZGV4T2YoJ2RlYm91bmNlJyk7XG4gICAgICBrZXlNb2RpZmllcnMuc3BsaWNlKGRlYm91bmNlSW5kZXgsIGlzTnVtZXJpYygoa2V5TW9kaWZpZXJzW2RlYm91bmNlSW5kZXggKyAxXSB8fCAnaW52YWxpZC13YWl0Jykuc3BsaXQoJ21zJylbMF0pID8gMiA6IDEpO1xuICAgIH0gLy8gSWYgbm8gbW9kaWZpZXIgaXMgc3BlY2lmaWVkLCB3ZSdsbCBjYWxsIGl0IGEgcHJlc3MuXG5cblxuICAgIGlmIChrZXlNb2RpZmllcnMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7IC8vIElmIG9uZSBpcyBwYXNzZWQsIEFORCBpdCBtYXRjaGVzIHRoZSBrZXkgcHJlc3NlZCwgd2UnbGwgY2FsbCBpdCBhIHByZXNzLlxuXG4gICAgaWYgKGtleU1vZGlmaWVycy5sZW5ndGggPT09IDEgJiYga2V5TW9kaWZpZXJzWzBdID09PSBrZXlUb01vZGlmaWVyKGUua2V5KSkgcmV0dXJuIGZhbHNlOyAvLyBUaGUgdXNlciBpcyBsaXN0ZW5pbmcgZm9yIGtleSBjb21iaW5hdGlvbnMuXG5cbiAgICBjb25zdCBzeXN0ZW1LZXlNb2RpZmllcnMgPSBbJ2N0cmwnLCAnc2hpZnQnLCAnYWx0JywgJ21ldGEnLCAnY21kJywgJ3N1cGVyJ107XG4gICAgY29uc3Qgc2VsZWN0ZWRTeXN0ZW1LZXlNb2RpZmllcnMgPSBzeXN0ZW1LZXlNb2RpZmllcnMuZmlsdGVyKG1vZGlmaWVyID0+IGtleU1vZGlmaWVycy5pbmNsdWRlcyhtb2RpZmllcikpO1xuICAgIGtleU1vZGlmaWVycyA9IGtleU1vZGlmaWVycy5maWx0ZXIoaSA9PiAhc2VsZWN0ZWRTeXN0ZW1LZXlNb2RpZmllcnMuaW5jbHVkZXMoaSkpO1xuXG4gICAgaWYgKHNlbGVjdGVkU3lzdGVtS2V5TW9kaWZpZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGFjdGl2ZWx5UHJlc3NlZEtleU1vZGlmaWVycyA9IHNlbGVjdGVkU3lzdGVtS2V5TW9kaWZpZXJzLmZpbHRlcihtb2RpZmllciA9PiB7XG4gICAgICAgIC8vIEFsaWFzIFwiY21kXCIgYW5kIFwic3VwZXJcIiB0byBcIm1ldGFcIlxuICAgICAgICBpZiAobW9kaWZpZXIgPT09ICdjbWQnIHx8IG1vZGlmaWVyID09PSAnc3VwZXInKSBtb2RpZmllciA9ICdtZXRhJztcbiAgICAgICAgcmV0dXJuIGVbYCR7bW9kaWZpZXJ9S2V5YF07XG4gICAgICB9KTsgLy8gSWYgYWxsIHRoZSBtb2RpZmllcnMgc2VsZWN0ZWQgYXJlIHByZXNzZWQsIC4uLlxuXG4gICAgICBpZiAoYWN0aXZlbHlQcmVzc2VkS2V5TW9kaWZpZXJzLmxlbmd0aCA9PT0gc2VsZWN0ZWRTeXN0ZW1LZXlNb2RpZmllcnMubGVuZ3RoKSB7XG4gICAgICAgIC8vIEFORCB0aGUgcmVtYWluaW5nIGtleSBpcyBwcmVzc2VkIGFzIHdlbGwuIEl0J3MgYSBwcmVzcy5cbiAgICAgICAgaWYgKGtleU1vZGlmaWVyc1swXSA9PT0ga2V5VG9Nb2RpZmllcihlLmtleSkpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IC8vIFdlJ2xsIGNhbGwgaXQgTk9UIGEgdmFsaWQga2V5cHJlc3MuXG5cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24ga2V5VG9Nb2RpZmllcihrZXkpIHtcbiAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgY2FzZSAnLyc6XG4gICAgICAgIHJldHVybiAnc2xhc2gnO1xuXG4gICAgICBjYXNlICcgJzpcbiAgICAgIGNhc2UgJ1NwYWNlYmFyJzpcbiAgICAgICAgcmV0dXJuICdzcGFjZSc7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBrZXkgJiYga2ViYWJDYXNlKGtleSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVnaXN0ZXJNb2RlbExpc3RlbmVyKGNvbXBvbmVudCwgZWwsIG1vZGlmaWVycywgZXhwcmVzc2lvbiwgZXh0cmFWYXJzKSB7XG4gICAgLy8gSWYgdGhlIGVsZW1lbnQgd2UgYXJlIGJpbmRpbmcgdG8gaXMgYSBzZWxlY3QsIGEgcmFkaW8sIG9yIGNoZWNrYm94XG4gICAgLy8gd2UnbGwgbGlzdGVuIGZvciB0aGUgY2hhbmdlIGV2ZW50IGluc3RlYWQgb2YgdGhlIFwiaW5wdXRcIiBldmVudC5cbiAgICB2YXIgZXZlbnQgPSBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzZWxlY3QnIHx8IFsnY2hlY2tib3gnLCAncmFkaW8nXS5pbmNsdWRlcyhlbC50eXBlKSB8fCBtb2RpZmllcnMuaW5jbHVkZXMoJ2xhenknKSA/ICdjaGFuZ2UnIDogJ2lucHV0JztcbiAgICBjb25zdCBsaXN0ZW5lckV4cHJlc3Npb24gPSBgJHtleHByZXNzaW9ufSA9IHJpZ2h0U2lkZU9mRXhwcmVzc2lvbigkZXZlbnQsICR7ZXhwcmVzc2lvbn0pYDtcbiAgICByZWdpc3Rlckxpc3RlbmVyKGNvbXBvbmVudCwgZWwsIGV2ZW50LCBtb2RpZmllcnMsIGxpc3RlbmVyRXhwcmVzc2lvbiwgKCkgPT4ge1xuICAgICAgcmV0dXJuIF9vYmplY3RTcHJlYWQyKF9vYmplY3RTcHJlYWQyKHt9LCBleHRyYVZhcnMoKSksIHt9LCB7XG4gICAgICAgIHJpZ2h0U2lkZU9mRXhwcmVzc2lvbjogZ2VuZXJhdGVNb2RlbEFzc2lnbm1lbnRGdW5jdGlvbihlbCwgbW9kaWZpZXJzLCBleHByZXNzaW9uKVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZW5lcmF0ZU1vZGVsQXNzaWdubWVudEZ1bmN0aW9uKGVsLCBtb2RpZmllcnMsIGV4cHJlc3Npb24pIHtcbiAgICBpZiAoZWwudHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgLy8gUmFkaW8gYnV0dG9ucyBvbmx5IHdvcmsgcHJvcGVybHkgd2hlbiB0aGV5IHNoYXJlIGEgbmFtZSBhdHRyaWJ1dGUuXG4gICAgICAvLyBQZW9wbGUgbWlnaHQgYXNzdW1lIHdlIHRha2UgY2FyZSBvZiB0aGF0IGZvciB0aGVtLCBiZWNhdXNlXG4gICAgICAvLyB0aGV5IGFscmVhZHkgc2V0IGEgc2hhcmVkIFwieC1tb2RlbFwiIGF0dHJpYnV0ZS5cbiAgICAgIGlmICghZWwuaGFzQXR0cmlidXRlKCduYW1lJykpIGVsLnNldEF0dHJpYnV0ZSgnbmFtZScsIGV4cHJlc3Npb24pO1xuICAgIH1cblxuICAgIHJldHVybiAoZXZlbnQsIGN1cnJlbnRWYWx1ZSkgPT4ge1xuICAgICAgLy8gQ2hlY2sgZm9yIGV2ZW50LmRldGFpbCBkdWUgdG8gYW4gaXNzdWUgd2hlcmUgSUUxMSBoYW5kbGVzIG90aGVyIGV2ZW50cyBhcyBhIEN1c3RvbUV2ZW50LlxuICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgQ3VzdG9tRXZlbnQgJiYgZXZlbnQuZGV0YWlsKSB7XG4gICAgICAgIHJldHVybiBldmVudC5kZXRhaWw7XG4gICAgICB9IGVsc2UgaWYgKGVsLnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgLy8gSWYgdGhlIGRhdGEgd2UgYXJlIGJpbmRpbmcgdG8gaXMgYW4gYXJyYXksIHRvZ2dsZSBpdHMgdmFsdWUgaW5zaWRlIHRoZSBhcnJheS5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY3VycmVudFZhbHVlKSkge1xuICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gbW9kaWZpZXJzLmluY2x1ZGVzKCdudW1iZXInKSA/IHNhZmVQYXJzZU51bWJlcihldmVudC50YXJnZXQudmFsdWUpIDogZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgIHJldHVybiBldmVudC50YXJnZXQuY2hlY2tlZCA/IGN1cnJlbnRWYWx1ZS5jb25jYXQoW25ld1ZhbHVlXSkgOiBjdXJyZW50VmFsdWUuZmlsdGVyKGVsID0+ICFjaGVja2VkQXR0ckxvb3NlQ29tcGFyZShlbCwgbmV3VmFsdWUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc2VsZWN0JyAmJiBlbC5tdWx0aXBsZSkge1xuICAgICAgICByZXR1cm4gbW9kaWZpZXJzLmluY2x1ZGVzKCdudW1iZXInKSA/IEFycmF5LmZyb20oZXZlbnQudGFyZ2V0LnNlbGVjdGVkT3B0aW9ucykubWFwKG9wdGlvbiA9PiB7XG4gICAgICAgICAgY29uc3QgcmF3VmFsdWUgPSBvcHRpb24udmFsdWUgfHwgb3B0aW9uLnRleHQ7XG4gICAgICAgICAgcmV0dXJuIHNhZmVQYXJzZU51bWJlcihyYXdWYWx1ZSk7XG4gICAgICAgIH0pIDogQXJyYXkuZnJvbShldmVudC50YXJnZXQuc2VsZWN0ZWRPcHRpb25zKS5tYXAob3B0aW9uID0+IHtcbiAgICAgICAgICByZXR1cm4gb3B0aW9uLnZhbHVlIHx8IG9wdGlvbi50ZXh0O1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHJhd1ZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICByZXR1cm4gbW9kaWZpZXJzLmluY2x1ZGVzKCdudW1iZXInKSA/IHNhZmVQYXJzZU51bWJlcihyYXdWYWx1ZSkgOiBtb2RpZmllcnMuaW5jbHVkZXMoJ3RyaW0nKSA/IHJhd1ZhbHVlLnRyaW0oKSA6IHJhd1ZhbHVlO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBzYWZlUGFyc2VOdW1iZXIocmF3VmFsdWUpIHtcbiAgICBjb25zdCBudW1iZXIgPSByYXdWYWx1ZSA/IHBhcnNlRmxvYXQocmF3VmFsdWUpIDogbnVsbDtcbiAgICByZXR1cm4gaXNOdW1lcmljKG51bWJlcikgPyBudW1iZXIgOiByYXdWYWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3B5cmlnaHQgKEMpIDIwMTcgc2FsZXNmb3JjZS5jb20sIGluYy5cbiAgICovXG4gIGNvbnN0IHsgaXNBcnJheSB9ID0gQXJyYXk7XG4gIGNvbnN0IHsgZ2V0UHJvdG90eXBlT2YsIGNyZWF0ZTogT2JqZWN0Q3JlYXRlLCBkZWZpbmVQcm9wZXJ0eTogT2JqZWN0RGVmaW5lUHJvcGVydHksIGRlZmluZVByb3BlcnRpZXM6IE9iamVjdERlZmluZVByb3BlcnRpZXMsIGlzRXh0ZW5zaWJsZSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLCBnZXRPd25Qcm9wZXJ0eU5hbWVzLCBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMsIHByZXZlbnRFeHRlbnNpb25zLCBoYXNPd25Qcm9wZXJ0eSwgfSA9IE9iamVjdDtcbiAgY29uc3QgeyBwdXNoOiBBcnJheVB1c2gsIGNvbmNhdDogQXJyYXlDb25jYXQsIG1hcDogQXJyYXlNYXAsIH0gPSBBcnJheS5wcm90b3R5cGU7XG4gIGZ1bmN0aW9uIGlzVW5kZWZpbmVkKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkO1xuICB9XG4gIGZ1bmN0aW9uIGlzRnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuICBmdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JztcbiAgfVxuICBjb25zdCBwcm94eVRvVmFsdWVNYXAgPSBuZXcgV2Vha01hcCgpO1xuICBmdW5jdGlvbiByZWdpc3RlclByb3h5KHByb3h5LCB2YWx1ZSkge1xuICAgICAgcHJveHlUb1ZhbHVlTWFwLnNldChwcm94eSwgdmFsdWUpO1xuICB9XG4gIGNvbnN0IHVud3JhcCA9IChyZXBsaWNhT3JBbnkpID0+IHByb3h5VG9WYWx1ZU1hcC5nZXQocmVwbGljYU9yQW55KSB8fCByZXBsaWNhT3JBbnk7XG5cbiAgZnVuY3Rpb24gd3JhcFZhbHVlKG1lbWJyYW5lLCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG1lbWJyYW5lLnZhbHVlSXNPYnNlcnZhYmxlKHZhbHVlKSA/IG1lbWJyYW5lLmdldFByb3h5KHZhbHVlKSA6IHZhbHVlO1xuICB9XG4gIC8qKlxuICAgKiBVbndyYXAgcHJvcGVydHkgZGVzY3JpcHRvcnMgd2lsbCBzZXQgdmFsdWUgb24gb3JpZ2luYWwgZGVzY3JpcHRvclxuICAgKiBXZSBvbmx5IG5lZWQgdG8gdW53cmFwIGlmIHZhbHVlIGlzIHNwZWNpZmllZFxuICAgKiBAcGFyYW0gZGVzY3JpcHRvciBleHRlcm5hbCBkZXNjcnBpdG9yIHByb3ZpZGVkIHRvIGRlZmluZSBuZXcgcHJvcGVydHkgb24gb3JpZ2luYWwgdmFsdWVcbiAgICovXG4gIGZ1bmN0aW9uIHVud3JhcERlc2NyaXB0b3IoZGVzY3JpcHRvcikge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoZGVzY3JpcHRvciwgJ3ZhbHVlJykpIHtcbiAgICAgICAgICBkZXNjcmlwdG9yLnZhbHVlID0gdW53cmFwKGRlc2NyaXB0b3IudmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRlc2NyaXB0b3I7XG4gIH1cbiAgZnVuY3Rpb24gbG9ja1NoYWRvd1RhcmdldChtZW1icmFuZSwgc2hhZG93VGFyZ2V0LCBvcmlnaW5hbFRhcmdldCkge1xuICAgICAgY29uc3QgdGFyZ2V0S2V5cyA9IEFycmF5Q29uY2F0LmNhbGwoZ2V0T3duUHJvcGVydHlOYW1lcyhvcmlnaW5hbFRhcmdldCksIGdldE93blByb3BlcnR5U3ltYm9scyhvcmlnaW5hbFRhcmdldCkpO1xuICAgICAgdGFyZ2V0S2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICBsZXQgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvcmlnaW5hbFRhcmdldCwga2V5KTtcbiAgICAgICAgICAvLyBXZSBkbyBub3QgbmVlZCB0byB3cmFwIHRoZSBkZXNjcmlwdG9yIGlmIGNvbmZpZ3VyYWJsZVxuICAgICAgICAgIC8vIEJlY2F1c2Ugd2UgY2FuIGRlYWwgd2l0aCB3cmFwcGluZyBpdCB3aGVuIHVzZXIgZ29lcyB0aHJvdWdoXG4gICAgICAgICAgLy8gR2V0IG93biBwcm9wZXJ0eSBkZXNjcmlwdG9yLiBUaGVyZSBpcyBhbHNvIGEgY2hhbmNlIHRoYXQgdGhpcyBkZXNjcmlwdG9yXG4gICAgICAgICAgLy8gY291bGQgY2hhbmdlIHNvbWV0aW1lIGluIHRoZSBmdXR1cmUsIHNvIHdlIGNhbiBkZWZlciB3cmFwcGluZ1xuICAgICAgICAgIC8vIHVudGlsIHdlIG5lZWQgdG9cbiAgICAgICAgICBpZiAoIWRlc2NyaXB0b3IuY29uZmlndXJhYmxlKSB7XG4gICAgICAgICAgICAgIGRlc2NyaXB0b3IgPSB3cmFwRGVzY3JpcHRvcihtZW1icmFuZSwgZGVzY3JpcHRvciwgd3JhcFZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgT2JqZWN0RGVmaW5lUHJvcGVydHkoc2hhZG93VGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgfSk7XG4gICAgICBwcmV2ZW50RXh0ZW5zaW9ucyhzaGFkb3dUYXJnZXQpO1xuICB9XG4gIGNsYXNzIFJlYWN0aXZlUHJveHlIYW5kbGVyIHtcbiAgICAgIGNvbnN0cnVjdG9yKG1lbWJyYW5lLCB2YWx1ZSkge1xuICAgICAgICAgIHRoaXMub3JpZ2luYWxUYXJnZXQgPSB2YWx1ZTtcbiAgICAgICAgICB0aGlzLm1lbWJyYW5lID0gbWVtYnJhbmU7XG4gICAgICB9XG4gICAgICBnZXQoc2hhZG93VGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0LCBtZW1icmFuZSB9ID0gdGhpcztcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IG9yaWdpbmFsVGFyZ2V0W2tleV07XG4gICAgICAgICAgY29uc3QgeyB2YWx1ZU9ic2VydmVkIH0gPSBtZW1icmFuZTtcbiAgICAgICAgICB2YWx1ZU9ic2VydmVkKG9yaWdpbmFsVGFyZ2V0LCBrZXkpO1xuICAgICAgICAgIHJldHVybiBtZW1icmFuZS5nZXRQcm94eSh2YWx1ZSk7XG4gICAgICB9XG4gICAgICBzZXQoc2hhZG93VGFyZ2V0LCBrZXksIHZhbHVlKSB7XG4gICAgICAgICAgY29uc3QgeyBvcmlnaW5hbFRhcmdldCwgbWVtYnJhbmU6IHsgdmFsdWVNdXRhdGVkIH0gfSA9IHRoaXM7XG4gICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBvcmlnaW5hbFRhcmdldFtrZXldO1xuICAgICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgb3JpZ2luYWxUYXJnZXRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICB2YWx1ZU11dGF0ZWQob3JpZ2luYWxUYXJnZXQsIGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGtleSA9PT0gJ2xlbmd0aCcgJiYgaXNBcnJheShvcmlnaW5hbFRhcmdldCkpIHtcbiAgICAgICAgICAgICAgLy8gZml4IGZvciBpc3N1ZSAjMjM2OiBwdXNoIHdpbGwgYWRkIHRoZSBuZXcgaW5kZXgsIGFuZCBieSB0aGUgdGltZSBsZW5ndGhcbiAgICAgICAgICAgICAgLy8gaXMgdXBkYXRlZCwgdGhlIGludGVybmFsIGxlbmd0aCBpcyBhbHJlYWR5IGVxdWFsIHRvIHRoZSBuZXcgbGVuZ3RoIHZhbHVlXG4gICAgICAgICAgICAgIC8vIHRoZXJlZm9yZSwgdGhlIG9sZFZhbHVlIGlzIGVxdWFsIHRvIHRoZSB2YWx1ZS4gVGhpcyBpcyB0aGUgZm9ya2luZyBsb2dpY1xuICAgICAgICAgICAgICAvLyB0byBzdXBwb3J0IHRoaXMgdXNlIGNhc2UuXG4gICAgICAgICAgICAgIHZhbHVlTXV0YXRlZChvcmlnaW5hbFRhcmdldCwga2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBkZWxldGVQcm9wZXJ0eShzaGFkb3dUYXJnZXQsIGtleSkge1xuICAgICAgICAgIGNvbnN0IHsgb3JpZ2luYWxUYXJnZXQsIG1lbWJyYW5lOiB7IHZhbHVlTXV0YXRlZCB9IH0gPSB0aGlzO1xuICAgICAgICAgIGRlbGV0ZSBvcmlnaW5hbFRhcmdldFtrZXldO1xuICAgICAgICAgIHZhbHVlTXV0YXRlZChvcmlnaW5hbFRhcmdldCwga2V5KTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGFwcGx5KHNoYWRvd1RhcmdldCwgdGhpc0FyZywgYXJnQXJyYXkpIHtcbiAgICAgICAgICAvKiBObyBvcCAqL1xuICAgICAgfVxuICAgICAgY29uc3RydWN0KHRhcmdldCwgYXJnQXJyYXksIG5ld1RhcmdldCkge1xuICAgICAgICAgIC8qIE5vIG9wICovXG4gICAgICB9XG4gICAgICBoYXMoc2hhZG93VGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0LCBtZW1icmFuZTogeyB2YWx1ZU9ic2VydmVkIH0gfSA9IHRoaXM7XG4gICAgICAgICAgdmFsdWVPYnNlcnZlZChvcmlnaW5hbFRhcmdldCwga2V5KTtcbiAgICAgICAgICByZXR1cm4ga2V5IGluIG9yaWdpbmFsVGFyZ2V0O1xuICAgICAgfVxuICAgICAgb3duS2V5cyhzaGFkb3dUYXJnZXQpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0IH0gPSB0aGlzO1xuICAgICAgICAgIHJldHVybiBBcnJheUNvbmNhdC5jYWxsKGdldE93blByb3BlcnR5TmFtZXMob3JpZ2luYWxUYXJnZXQpLCBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMob3JpZ2luYWxUYXJnZXQpKTtcbiAgICAgIH1cbiAgICAgIGlzRXh0ZW5zaWJsZShzaGFkb3dUYXJnZXQpIHtcbiAgICAgICAgICBjb25zdCBzaGFkb3dJc0V4dGVuc2libGUgPSBpc0V4dGVuc2libGUoc2hhZG93VGFyZ2V0KTtcbiAgICAgICAgICBpZiAoIXNoYWRvd0lzRXh0ZW5zaWJsZSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2hhZG93SXNFeHRlbnNpYmxlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0LCBtZW1icmFuZSB9ID0gdGhpcztcbiAgICAgICAgICBjb25zdCB0YXJnZXRJc0V4dGVuc2libGUgPSBpc0V4dGVuc2libGUob3JpZ2luYWxUYXJnZXQpO1xuICAgICAgICAgIGlmICghdGFyZ2V0SXNFeHRlbnNpYmxlKSB7XG4gICAgICAgICAgICAgIGxvY2tTaGFkb3dUYXJnZXQobWVtYnJhbmUsIHNoYWRvd1RhcmdldCwgb3JpZ2luYWxUYXJnZXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGFyZ2V0SXNFeHRlbnNpYmxlO1xuICAgICAgfVxuICAgICAgc2V0UHJvdG90eXBlT2Yoc2hhZG93VGFyZ2V0LCBwcm90b3R5cGUpIHtcbiAgICAgIH1cbiAgICAgIGdldFByb3RvdHlwZU9mKHNoYWRvd1RhcmdldCkge1xuICAgICAgICAgIGNvbnN0IHsgb3JpZ2luYWxUYXJnZXQgfSA9IHRoaXM7XG4gICAgICAgICAgcmV0dXJuIGdldFByb3RvdHlwZU9mKG9yaWdpbmFsVGFyZ2V0KTtcbiAgICAgIH1cbiAgICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzaGFkb3dUYXJnZXQsIGtleSkge1xuICAgICAgICAgIGNvbnN0IHsgb3JpZ2luYWxUYXJnZXQsIG1lbWJyYW5lIH0gPSB0aGlzO1xuICAgICAgICAgIGNvbnN0IHsgdmFsdWVPYnNlcnZlZCB9ID0gdGhpcy5tZW1icmFuZTtcbiAgICAgICAgICAvLyBrZXlzIGxvb2tlZCB1cCB2aWEgaGFzT3duUHJvcGVydHkgbmVlZCB0byBiZSByZWFjdGl2ZVxuICAgICAgICAgIHZhbHVlT2JzZXJ2ZWQob3JpZ2luYWxUYXJnZXQsIGtleSk7XG4gICAgICAgICAgbGV0IGRlc2MgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob3JpZ2luYWxUYXJnZXQsIGtleSk7XG4gICAgICAgICAgaWYgKGlzVW5kZWZpbmVkKGRlc2MpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBkZXNjO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBzaGFkb3dEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNoYWRvd1RhcmdldCwga2V5KTtcbiAgICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHNoYWRvd0Rlc2NyaXB0b3IpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzaGFkb3dEZXNjcmlwdG9yO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBOb3RlOiBieSBhY2Nlc3NpbmcgdGhlIGRlc2NyaXB0b3IsIHRoZSBrZXkgaXMgbWFya2VkIGFzIG9ic2VydmVkXG4gICAgICAgICAgLy8gYnV0IGFjY2VzcyB0byB0aGUgdmFsdWUsIHNldHRlciBvciBnZXR0ZXIgKGlmIGF2YWlsYWJsZSkgY2Fubm90IG9ic2VydmVcbiAgICAgICAgICAvLyBtdXRhdGlvbnMsIGp1c3QgbGlrZSByZWd1bGFyIG1ldGhvZHMsIGluIHdoaWNoIGNhc2Ugd2UganVzdCBkbyBub3RoaW5nLlxuICAgICAgICAgIGRlc2MgPSB3cmFwRGVzY3JpcHRvcihtZW1icmFuZSwgZGVzYywgd3JhcFZhbHVlKTtcbiAgICAgICAgICBpZiAoIWRlc2MuY29uZmlndXJhYmxlKSB7XG4gICAgICAgICAgICAgIC8vIElmIGRlc2NyaXB0b3IgZnJvbSBvcmlnaW5hbCB0YXJnZXQgaXMgbm90IGNvbmZpZ3VyYWJsZSxcbiAgICAgICAgICAgICAgLy8gV2UgbXVzdCBjb3B5IHRoZSB3cmFwcGVkIGRlc2NyaXB0b3Igb3ZlciB0byB0aGUgc2hhZG93IHRhcmdldC5cbiAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBwcm94eSB3aWxsIHRocm93IGFuIGludmFyaWFudCBlcnJvci5cbiAgICAgICAgICAgICAgLy8gVGhpcyBpcyBvdXIgbGFzdCBjaGFuY2UgdG8gbG9jayB0aGUgdmFsdWUuXG4gICAgICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1Byb3h5L2hhbmRsZXIvZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yI0ludmFyaWFudHNcbiAgICAgICAgICAgICAgT2JqZWN0RGVmaW5lUHJvcGVydHkoc2hhZG93VGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGVzYztcbiAgICAgIH1cbiAgICAgIHByZXZlbnRFeHRlbnNpb25zKHNoYWRvd1RhcmdldCkge1xuICAgICAgICAgIGNvbnN0IHsgb3JpZ2luYWxUYXJnZXQsIG1lbWJyYW5lIH0gPSB0aGlzO1xuICAgICAgICAgIGxvY2tTaGFkb3dUYXJnZXQobWVtYnJhbmUsIHNoYWRvd1RhcmdldCwgb3JpZ2luYWxUYXJnZXQpO1xuICAgICAgICAgIHByZXZlbnRFeHRlbnNpb25zKG9yaWdpbmFsVGFyZ2V0KTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGRlZmluZVByb3BlcnR5KHNoYWRvd1RhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gICAgICAgICAgY29uc3QgeyBvcmlnaW5hbFRhcmdldCwgbWVtYnJhbmUgfSA9IHRoaXM7XG4gICAgICAgICAgY29uc3QgeyB2YWx1ZU11dGF0ZWQgfSA9IG1lbWJyYW5lO1xuICAgICAgICAgIGNvbnN0IHsgY29uZmlndXJhYmxlIH0gPSBkZXNjcmlwdG9yO1xuICAgICAgICAgIC8vIFdlIGhhdmUgdG8gY2hlY2sgZm9yIHZhbHVlIGluIGRlc2NyaXB0b3JcbiAgICAgICAgICAvLyBiZWNhdXNlIE9iamVjdC5mcmVlemUocHJveHkpIGNhbGxzIHRoaXMgbWV0aG9kXG4gICAgICAgICAgLy8gd2l0aCBvbmx5IHsgY29uZmlndXJhYmxlOiBmYWxzZSwgd3JpdGVhYmxlOiBmYWxzZSB9XG4gICAgICAgICAgLy8gQWRkaXRpb25hbGx5LCBtZXRob2Qgd2lsbCBvbmx5IGJlIGNhbGxlZCB3aXRoIHdyaXRlYWJsZTpmYWxzZVxuICAgICAgICAgIC8vIGlmIHRoZSBkZXNjcmlwdG9yIGhhcyBhIHZhbHVlLCBhcyBvcHBvc2VkIHRvIGdldHRlci9zZXR0ZXJcbiAgICAgICAgICAvLyBTbyB3ZSBjYW4ganVzdCBjaGVjayBpZiB3cml0YWJsZSBpcyBwcmVzZW50IGFuZCB0aGVuIHNlZSBpZlxuICAgICAgICAgIC8vIHZhbHVlIGlzIHByZXNlbnQuIFRoaXMgZWxpbWluYXRlcyBnZXR0ZXIgYW5kIHNldHRlciBkZXNjcmlwdG9yc1xuICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGRlc2NyaXB0b3IsICd3cml0YWJsZScpICYmICFoYXNPd25Qcm9wZXJ0eS5jYWxsKGRlc2NyaXB0b3IsICd2YWx1ZScpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsRGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvcmlnaW5hbFRhcmdldCwga2V5KTtcbiAgICAgICAgICAgICAgZGVzY3JpcHRvci52YWx1ZSA9IG9yaWdpbmFsRGVzY3JpcHRvci52YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgT2JqZWN0RGVmaW5lUHJvcGVydHkob3JpZ2luYWxUYXJnZXQsIGtleSwgdW53cmFwRGVzY3JpcHRvcihkZXNjcmlwdG9yKSk7XG4gICAgICAgICAgaWYgKGNvbmZpZ3VyYWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgT2JqZWN0RGVmaW5lUHJvcGVydHkoc2hhZG93VGFyZ2V0LCBrZXksIHdyYXBEZXNjcmlwdG9yKG1lbWJyYW5lLCBkZXNjcmlwdG9yLCB3cmFwVmFsdWUpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsdWVNdXRhdGVkKG9yaWdpbmFsVGFyZ2V0LCBrZXkpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gd3JhcFJlYWRPbmx5VmFsdWUobWVtYnJhbmUsIHZhbHVlKSB7XG4gICAgICByZXR1cm4gbWVtYnJhbmUudmFsdWVJc09ic2VydmFibGUodmFsdWUpID8gbWVtYnJhbmUuZ2V0UmVhZE9ubHlQcm94eSh2YWx1ZSkgOiB2YWx1ZTtcbiAgfVxuICBjbGFzcyBSZWFkT25seUhhbmRsZXIge1xuICAgICAgY29uc3RydWN0b3IobWVtYnJhbmUsIHZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5vcmlnaW5hbFRhcmdldCA9IHZhbHVlO1xuICAgICAgICAgIHRoaXMubWVtYnJhbmUgPSBtZW1icmFuZTtcbiAgICAgIH1cbiAgICAgIGdldChzaGFkb3dUYXJnZXQsIGtleSkge1xuICAgICAgICAgIGNvbnN0IHsgbWVtYnJhbmUsIG9yaWdpbmFsVGFyZ2V0IH0gPSB0aGlzO1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gb3JpZ2luYWxUYXJnZXRba2V5XTtcbiAgICAgICAgICBjb25zdCB7IHZhbHVlT2JzZXJ2ZWQgfSA9IG1lbWJyYW5lO1xuICAgICAgICAgIHZhbHVlT2JzZXJ2ZWQob3JpZ2luYWxUYXJnZXQsIGtleSk7XG4gICAgICAgICAgcmV0dXJuIG1lbWJyYW5lLmdldFJlYWRPbmx5UHJveHkodmFsdWUpO1xuICAgICAgfVxuICAgICAgc2V0KHNoYWRvd1RhcmdldCwga2V5LCB2YWx1ZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGRlbGV0ZVByb3BlcnR5KHNoYWRvd1RhcmdldCwga2V5KSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgYXBwbHkoc2hhZG93VGFyZ2V0LCB0aGlzQXJnLCBhcmdBcnJheSkge1xuICAgICAgICAgIC8qIE5vIG9wICovXG4gICAgICB9XG4gICAgICBjb25zdHJ1Y3QodGFyZ2V0LCBhcmdBcnJheSwgbmV3VGFyZ2V0KSB7XG4gICAgICAgICAgLyogTm8gb3AgKi9cbiAgICAgIH1cbiAgICAgIGhhcyhzaGFkb3dUYXJnZXQsIGtleSkge1xuICAgICAgICAgIGNvbnN0IHsgb3JpZ2luYWxUYXJnZXQsIG1lbWJyYW5lOiB7IHZhbHVlT2JzZXJ2ZWQgfSB9ID0gdGhpcztcbiAgICAgICAgICB2YWx1ZU9ic2VydmVkKG9yaWdpbmFsVGFyZ2V0LCBrZXkpO1xuICAgICAgICAgIHJldHVybiBrZXkgaW4gb3JpZ2luYWxUYXJnZXQ7XG4gICAgICB9XG4gICAgICBvd25LZXlzKHNoYWRvd1RhcmdldCkge1xuICAgICAgICAgIGNvbnN0IHsgb3JpZ2luYWxUYXJnZXQgfSA9IHRoaXM7XG4gICAgICAgICAgcmV0dXJuIEFycmF5Q29uY2F0LmNhbGwoZ2V0T3duUHJvcGVydHlOYW1lcyhvcmlnaW5hbFRhcmdldCksIGdldE93blByb3BlcnR5U3ltYm9scyhvcmlnaW5hbFRhcmdldCkpO1xuICAgICAgfVxuICAgICAgc2V0UHJvdG90eXBlT2Yoc2hhZG93VGFyZ2V0LCBwcm90b3R5cGUpIHtcbiAgICAgIH1cbiAgICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzaGFkb3dUYXJnZXQsIGtleSkge1xuICAgICAgICAgIGNvbnN0IHsgb3JpZ2luYWxUYXJnZXQsIG1lbWJyYW5lIH0gPSB0aGlzO1xuICAgICAgICAgIGNvbnN0IHsgdmFsdWVPYnNlcnZlZCB9ID0gbWVtYnJhbmU7XG4gICAgICAgICAgLy8ga2V5cyBsb29rZWQgdXAgdmlhIGhhc093blByb3BlcnR5IG5lZWQgdG8gYmUgcmVhY3RpdmVcbiAgICAgICAgICB2YWx1ZU9ic2VydmVkKG9yaWdpbmFsVGFyZ2V0LCBrZXkpO1xuICAgICAgICAgIGxldCBkZXNjID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9yaWdpbmFsVGFyZ2V0LCBrZXkpO1xuICAgICAgICAgIGlmIChpc1VuZGVmaW5lZChkZXNjKSkge1xuICAgICAgICAgICAgICByZXR1cm4gZGVzYztcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3Qgc2hhZG93RGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzaGFkb3dUYXJnZXQsIGtleSk7XG4gICAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChzaGFkb3dEZXNjcmlwdG9yKSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2hhZG93RGVzY3JpcHRvcjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gTm90ZTogYnkgYWNjZXNzaW5nIHRoZSBkZXNjcmlwdG9yLCB0aGUga2V5IGlzIG1hcmtlZCBhcyBvYnNlcnZlZFxuICAgICAgICAgIC8vIGJ1dCBhY2Nlc3MgdG8gdGhlIHZhbHVlIG9yIGdldHRlciAoaWYgYXZhaWxhYmxlKSBjYW5ub3QgYmUgb2JzZXJ2ZWQsXG4gICAgICAgICAgLy8ganVzdCBsaWtlIHJlZ3VsYXIgbWV0aG9kcywgaW4gd2hpY2ggY2FzZSB3ZSBqdXN0IGRvIG5vdGhpbmcuXG4gICAgICAgICAgZGVzYyA9IHdyYXBEZXNjcmlwdG9yKG1lbWJyYW5lLCBkZXNjLCB3cmFwUmVhZE9ubHlWYWx1ZSk7XG4gICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoZGVzYywgJ3NldCcpKSB7XG4gICAgICAgICAgICAgIGRlc2Muc2V0ID0gdW5kZWZpbmVkOyAvLyByZWFkT25seSBtZW1icmFuZSBkb2VzIG5vdCBhbGxvdyBzZXR0ZXJzXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghZGVzYy5jb25maWd1cmFibGUpIHtcbiAgICAgICAgICAgICAgLy8gSWYgZGVzY3JpcHRvciBmcm9tIG9yaWdpbmFsIHRhcmdldCBpcyBub3QgY29uZmlndXJhYmxlLFxuICAgICAgICAgICAgICAvLyBXZSBtdXN0IGNvcHkgdGhlIHdyYXBwZWQgZGVzY3JpcHRvciBvdmVyIHRvIHRoZSBzaGFkb3cgdGFyZ2V0LlxuICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIHByb3h5IHdpbGwgdGhyb3cgYW4gaW52YXJpYW50IGVycm9yLlxuICAgICAgICAgICAgICAvLyBUaGlzIGlzIG91ciBsYXN0IGNoYW5jZSB0byBsb2NrIHRoZSB2YWx1ZS5cbiAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvUHJveHkvaGFuZGxlci9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IjSW52YXJpYW50c1xuICAgICAgICAgICAgICBPYmplY3REZWZpbmVQcm9wZXJ0eShzaGFkb3dUYXJnZXQsIGtleSwgZGVzYyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBkZXNjO1xuICAgICAgfVxuICAgICAgcHJldmVudEV4dGVuc2lvbnMoc2hhZG93VGFyZ2V0KSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgZGVmaW5lUHJvcGVydHkoc2hhZG93VGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gIH1cbiAgZnVuY3Rpb24gY3JlYXRlU2hhZG93VGFyZ2V0KHZhbHVlKSB7XG4gICAgICBsZXQgc2hhZG93VGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgc2hhZG93VGFyZ2V0ID0gW107XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgICBzaGFkb3dUYXJnZXQgPSB7fTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzaGFkb3dUYXJnZXQ7XG4gIH1cbiAgY29uc3QgT2JqZWN0RG90UHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgZnVuY3Rpb24gZGVmYXVsdFZhbHVlSXNPYnNlcnZhYmxlKHZhbHVlKSB7XG4gICAgICAvLyBpbnRlbnRpb25hbGx5IGNoZWNraW5nIGZvciBudWxsXG4gICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyB0cmVhdCBhbGwgbm9uLW9iamVjdCB0eXBlcywgaW5jbHVkaW5nIHVuZGVmaW5lZCwgYXMgbm9uLW9ic2VydmFibGUgdmFsdWVzXG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgY29uc3QgcHJvdG8gPSBnZXRQcm90b3R5cGVPZih2YWx1ZSk7XG4gICAgICByZXR1cm4gKHByb3RvID09PSBPYmplY3REb3RQcm90b3R5cGUgfHwgcHJvdG8gPT09IG51bGwgfHwgZ2V0UHJvdG90eXBlT2YocHJvdG8pID09PSBudWxsKTtcbiAgfVxuICBjb25zdCBkZWZhdWx0VmFsdWVPYnNlcnZlZCA9IChvYmosIGtleSkgPT4ge1xuICAgICAgLyogZG8gbm90aGluZyAqL1xuICB9O1xuICBjb25zdCBkZWZhdWx0VmFsdWVNdXRhdGVkID0gKG9iaiwga2V5KSA9PiB7XG4gICAgICAvKiBkbyBub3RoaW5nICovXG4gIH07XG4gIGNvbnN0IGRlZmF1bHRWYWx1ZURpc3RvcnRpb24gPSAodmFsdWUpID0+IHZhbHVlO1xuICBmdW5jdGlvbiB3cmFwRGVzY3JpcHRvcihtZW1icmFuZSwgZGVzY3JpcHRvciwgZ2V0VmFsdWUpIHtcbiAgICAgIGNvbnN0IHsgc2V0LCBnZXQgfSA9IGRlc2NyaXB0b3I7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChkZXNjcmlwdG9yLCAndmFsdWUnKSkge1xuICAgICAgICAgIGRlc2NyaXB0b3IudmFsdWUgPSBnZXRWYWx1ZShtZW1icmFuZSwgZGVzY3JpcHRvci52YWx1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGdldCkpIHtcbiAgICAgICAgICAgICAgZGVzY3JpcHRvci5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAvLyBpbnZva2luZyB0aGUgb3JpZ2luYWwgZ2V0dGVyIHdpdGggdGhlIG9yaWdpbmFsIHRhcmdldFxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldFZhbHVlKG1lbWJyYW5lLCBnZXQuY2FsbCh1bndyYXAodGhpcykpKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChzZXQpKSB7XG4gICAgICAgICAgICAgIGRlc2NyaXB0b3Iuc2V0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAvLyBBdCB0aGlzIHBvaW50IHdlIGRvbid0IGhhdmUgYSBjbGVhciBpbmRpY2F0aW9uIG9mIHdoZXRoZXJcbiAgICAgICAgICAgICAgICAgIC8vIG9yIG5vdCBhIHZhbGlkIG11dGF0aW9uIHdpbGwgb2NjdXIsIHdlIGRvbid0IGhhdmUgdGhlIGtleSxcbiAgICAgICAgICAgICAgICAgIC8vIGFuZCB3ZSBhcmUgbm90IHN1cmUgd2h5IGFuZCBob3cgdGhleSBhcmUgaW52b2tpbmcgdGhpcyBzZXR0ZXIuXG4gICAgICAgICAgICAgICAgICAvLyBOZXZlcnRoZWxlc3Mgd2UgcHJlc2VydmUgdGhlIG9yaWdpbmFsIHNlbWFudGljcyBieSBpbnZva2luZyB0aGVcbiAgICAgICAgICAgICAgICAgIC8vIG9yaWdpbmFsIHNldHRlciB3aXRoIHRoZSBvcmlnaW5hbCB0YXJnZXQgYW5kIHRoZSB1bndyYXBwZWQgdmFsdWVcbiAgICAgICAgICAgICAgICAgIHNldC5jYWxsKHVud3JhcCh0aGlzKSwgbWVtYnJhbmUudW53cmFwUHJveHkodmFsdWUpKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZGVzY3JpcHRvcjtcbiAgfVxuICBjbGFzcyBSZWFjdGl2ZU1lbWJyYW5lIHtcbiAgICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgICB0aGlzLnZhbHVlRGlzdG9ydGlvbiA9IGRlZmF1bHRWYWx1ZURpc3RvcnRpb247XG4gICAgICAgICAgdGhpcy52YWx1ZU11dGF0ZWQgPSBkZWZhdWx0VmFsdWVNdXRhdGVkO1xuICAgICAgICAgIHRoaXMudmFsdWVPYnNlcnZlZCA9IGRlZmF1bHRWYWx1ZU9ic2VydmVkO1xuICAgICAgICAgIHRoaXMudmFsdWVJc09ic2VydmFibGUgPSBkZWZhdWx0VmFsdWVJc09ic2VydmFibGU7XG4gICAgICAgICAgdGhpcy5vYmplY3RHcmFwaCA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChvcHRpb25zKSkge1xuICAgICAgICAgICAgICBjb25zdCB7IHZhbHVlRGlzdG9ydGlvbiwgdmFsdWVNdXRhdGVkLCB2YWx1ZU9ic2VydmVkLCB2YWx1ZUlzT2JzZXJ2YWJsZSB9ID0gb3B0aW9ucztcbiAgICAgICAgICAgICAgdGhpcy52YWx1ZURpc3RvcnRpb24gPSBpc0Z1bmN0aW9uKHZhbHVlRGlzdG9ydGlvbikgPyB2YWx1ZURpc3RvcnRpb24gOiBkZWZhdWx0VmFsdWVEaXN0b3J0aW9uO1xuICAgICAgICAgICAgICB0aGlzLnZhbHVlTXV0YXRlZCA9IGlzRnVuY3Rpb24odmFsdWVNdXRhdGVkKSA/IHZhbHVlTXV0YXRlZCA6IGRlZmF1bHRWYWx1ZU11dGF0ZWQ7XG4gICAgICAgICAgICAgIHRoaXMudmFsdWVPYnNlcnZlZCA9IGlzRnVuY3Rpb24odmFsdWVPYnNlcnZlZCkgPyB2YWx1ZU9ic2VydmVkIDogZGVmYXVsdFZhbHVlT2JzZXJ2ZWQ7XG4gICAgICAgICAgICAgIHRoaXMudmFsdWVJc09ic2VydmFibGUgPSBpc0Z1bmN0aW9uKHZhbHVlSXNPYnNlcnZhYmxlKSA/IHZhbHVlSXNPYnNlcnZhYmxlIDogZGVmYXVsdFZhbHVlSXNPYnNlcnZhYmxlO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGdldFByb3h5KHZhbHVlKSB7XG4gICAgICAgICAgY29uc3QgdW53cmFwcGVkVmFsdWUgPSB1bndyYXAodmFsdWUpO1xuICAgICAgICAgIGNvbnN0IGRpc3RvcnRlZCA9IHRoaXMudmFsdWVEaXN0b3J0aW9uKHVud3JhcHBlZFZhbHVlKTtcbiAgICAgICAgICBpZiAodGhpcy52YWx1ZUlzT2JzZXJ2YWJsZShkaXN0b3J0ZWQpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG8gPSB0aGlzLmdldFJlYWN0aXZlU3RhdGUodW53cmFwcGVkVmFsdWUsIGRpc3RvcnRlZCk7XG4gICAgICAgICAgICAgIC8vIHdoZW4gdHJ5aW5nIHRvIGV4dHJhY3QgdGhlIHdyaXRhYmxlIHZlcnNpb24gb2YgYSByZWFkb25seVxuICAgICAgICAgICAgICAvLyB3ZSByZXR1cm4gdGhlIHJlYWRvbmx5LlxuICAgICAgICAgICAgICByZXR1cm4gby5yZWFkT25seSA9PT0gdmFsdWUgPyB2YWx1ZSA6IG8ucmVhY3RpdmU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBkaXN0b3J0ZWQ7XG4gICAgICB9XG4gICAgICBnZXRSZWFkT25seVByb3h5KHZhbHVlKSB7XG4gICAgICAgICAgdmFsdWUgPSB1bndyYXAodmFsdWUpO1xuICAgICAgICAgIGNvbnN0IGRpc3RvcnRlZCA9IHRoaXMudmFsdWVEaXN0b3J0aW9uKHZhbHVlKTtcbiAgICAgICAgICBpZiAodGhpcy52YWx1ZUlzT2JzZXJ2YWJsZShkaXN0b3J0ZWQpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFJlYWN0aXZlU3RhdGUodmFsdWUsIGRpc3RvcnRlZCkucmVhZE9ubHk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBkaXN0b3J0ZWQ7XG4gICAgICB9XG4gICAgICB1bndyYXBQcm94eShwKSB7XG4gICAgICAgICAgcmV0dXJuIHVud3JhcChwKTtcbiAgICAgIH1cbiAgICAgIGdldFJlYWN0aXZlU3RhdGUodmFsdWUsIGRpc3RvcnRlZFZhbHVlKSB7XG4gICAgICAgICAgY29uc3QgeyBvYmplY3RHcmFwaCwgfSA9IHRoaXM7XG4gICAgICAgICAgbGV0IHJlYWN0aXZlU3RhdGUgPSBvYmplY3RHcmFwaC5nZXQoZGlzdG9ydGVkVmFsdWUpO1xuICAgICAgICAgIGlmIChyZWFjdGl2ZVN0YXRlKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZWFjdGl2ZVN0YXRlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBtZW1icmFuZSA9IHRoaXM7XG4gICAgICAgICAgcmVhY3RpdmVTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgZ2V0IHJlYWN0aXZlKCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVhY3RpdmVIYW5kbGVyID0gbmV3IFJlYWN0aXZlUHJveHlIYW5kbGVyKG1lbWJyYW5lLCBkaXN0b3J0ZWRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAvLyBjYWNoaW5nIHRoZSByZWFjdGl2ZSBwcm94eSBhZnRlciB0aGUgZmlyc3QgdGltZSBpdCBpcyBhY2Nlc3NlZFxuICAgICAgICAgICAgICAgICAgY29uc3QgcHJveHkgPSBuZXcgUHJveHkoY3JlYXRlU2hhZG93VGFyZ2V0KGRpc3RvcnRlZFZhbHVlKSwgcmVhY3RpdmVIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyUHJveHkocHJveHksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIE9iamVjdERlZmluZVByb3BlcnR5KHRoaXMsICdyZWFjdGl2ZScsIHsgdmFsdWU6IHByb3h5IH0pO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3h5O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBnZXQgcmVhZE9ubHkoKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCByZWFkT25seUhhbmRsZXIgPSBuZXcgUmVhZE9ubHlIYW5kbGVyKG1lbWJyYW5lLCBkaXN0b3J0ZWRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAvLyBjYWNoaW5nIHRoZSByZWFkT25seSBwcm94eSBhZnRlciB0aGUgZmlyc3QgdGltZSBpdCBpcyBhY2Nlc3NlZFxuICAgICAgICAgICAgICAgICAgY29uc3QgcHJveHkgPSBuZXcgUHJveHkoY3JlYXRlU2hhZG93VGFyZ2V0KGRpc3RvcnRlZFZhbHVlKSwgcmVhZE9ubHlIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyUHJveHkocHJveHksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIE9iamVjdERlZmluZVByb3BlcnR5KHRoaXMsICdyZWFkT25seScsIHsgdmFsdWU6IHByb3h5IH0pO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3h5O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICBvYmplY3RHcmFwaC5zZXQoZGlzdG9ydGVkVmFsdWUsIHJlYWN0aXZlU3RhdGUpO1xuICAgICAgICAgIHJldHVybiByZWFjdGl2ZVN0YXRlO1xuICAgICAgfVxuICB9XG4gIC8qKiB2ZXJzaW9uOiAwLjI2LjAgKi9cblxuICBmdW5jdGlvbiB3cmFwKGRhdGEsIG11dGF0aW9uQ2FsbGJhY2spIHtcblxuICAgIGxldCBtZW1icmFuZSA9IG5ldyBSZWFjdGl2ZU1lbWJyYW5lKHtcbiAgICAgIHZhbHVlTXV0YXRlZCh0YXJnZXQsIGtleSkge1xuICAgICAgICBtdXRhdGlvbkNhbGxiYWNrKHRhcmdldCwga2V5KTtcbiAgICAgIH1cblxuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBtZW1icmFuZS5nZXRQcm94eShkYXRhKSxcbiAgICAgIG1lbWJyYW5lOiBtZW1icmFuZVxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gdW53cmFwJDEobWVtYnJhbmUsIG9ic2VydmFibGUpIHtcbiAgICBsZXQgdW53cmFwcGVkRGF0YSA9IG1lbWJyYW5lLnVud3JhcFByb3h5KG9ic2VydmFibGUpO1xuICAgIGxldCBjb3B5ID0ge307XG4gICAgT2JqZWN0LmtleXModW53cmFwcGVkRGF0YSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKFsnJGVsJywgJyRyZWZzJywgJyRuZXh0VGljaycsICckd2F0Y2gnXS5pbmNsdWRlcyhrZXkpKSByZXR1cm47XG4gICAgICBjb3B5W2tleV0gPSB1bndyYXBwZWREYXRhW2tleV07XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvcHk7XG4gIH1cblxuICBjbGFzcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKGVsLCBjb21wb25lbnRGb3JDbG9uZSA9IG51bGwpIHtcbiAgICAgIHRoaXMuJGVsID0gZWw7XG4gICAgICBjb25zdCBkYXRhQXR0ciA9IHRoaXMuJGVsLmdldEF0dHJpYnV0ZSgneC1kYXRhJyk7XG4gICAgICBjb25zdCBkYXRhRXhwcmVzc2lvbiA9IGRhdGFBdHRyID09PSAnJyA/ICd7fScgOiBkYXRhQXR0cjtcbiAgICAgIGNvbnN0IGluaXRFeHByZXNzaW9uID0gdGhpcy4kZWwuZ2V0QXR0cmlidXRlKCd4LWluaXQnKTtcbiAgICAgIGxldCBkYXRhRXh0cmFzID0ge1xuICAgICAgICAkZWw6IHRoaXMuJGVsXG4gICAgICB9O1xuICAgICAgbGV0IGNhbm9uaWNhbENvbXBvbmVudEVsZW1lbnRSZWZlcmVuY2UgPSBjb21wb25lbnRGb3JDbG9uZSA/IGNvbXBvbmVudEZvckNsb25lLiRlbCA6IHRoaXMuJGVsO1xuICAgICAgT2JqZWN0LmVudHJpZXMoQWxwaW5lLm1hZ2ljUHJvcGVydGllcykuZm9yRWFjaCgoW25hbWUsIGNhbGxiYWNrXSkgPT4ge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGF0YUV4dHJhcywgYCQke25hbWV9YCwge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNhbm9uaWNhbENvbXBvbmVudEVsZW1lbnRSZWZlcmVuY2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMudW5vYnNlcnZlZERhdGEgPSBjb21wb25lbnRGb3JDbG9uZSA/IGNvbXBvbmVudEZvckNsb25lLmdldFVub2JzZXJ2ZWREYXRhKCkgOiBzYWZlckV2YWwoZWwsIGRhdGFFeHByZXNzaW9uLCBkYXRhRXh0cmFzKTtcbiAgICAgIC8vIENvbnN0cnVjdCBhIFByb3h5LWJhc2VkIG9ic2VydmFibGUuIFRoaXMgd2lsbCBiZSB1c2VkIHRvIGhhbmRsZSByZWFjdGl2aXR5LlxuXG4gICAgICBsZXQge1xuICAgICAgICBtZW1icmFuZSxcbiAgICAgICAgZGF0YVxuICAgICAgfSA9IHRoaXMud3JhcERhdGFJbk9ic2VydmFibGUodGhpcy51bm9ic2VydmVkRGF0YSk7XG4gICAgICB0aGlzLiRkYXRhID0gZGF0YTtcbiAgICAgIHRoaXMubWVtYnJhbmUgPSBtZW1icmFuZTsgLy8gQWZ0ZXIgbWFraW5nIHVzZXItc3VwcGxpZWQgZGF0YSBtZXRob2RzIHJlYWN0aXZlLCB3ZSBjYW4gbm93IGFkZFxuICAgICAgLy8gb3VyIG1hZ2ljIHByb3BlcnRpZXMgdG8gdGhlIG9yaWdpbmFsIGRhdGEgZm9yIGFjY2Vzcy5cblxuICAgICAgdGhpcy51bm9ic2VydmVkRGF0YS4kZWwgPSB0aGlzLiRlbDtcbiAgICAgIHRoaXMudW5vYnNlcnZlZERhdGEuJHJlZnMgPSB0aGlzLmdldFJlZnNQcm94eSgpO1xuICAgICAgdGhpcy5uZXh0VGlja1N0YWNrID0gW107XG5cbiAgICAgIHRoaXMudW5vYnNlcnZlZERhdGEuJG5leHRUaWNrID0gY2FsbGJhY2sgPT4ge1xuICAgICAgICB0aGlzLm5leHRUaWNrU3RhY2sucHVzaChjYWxsYmFjayk7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLndhdGNoZXJzID0ge307XG5cbiAgICAgIHRoaXMudW5vYnNlcnZlZERhdGEuJHdhdGNoID0gKHByb3BlcnR5LCBjYWxsYmFjaykgPT4ge1xuICAgICAgICBpZiAoIXRoaXMud2F0Y2hlcnNbcHJvcGVydHldKSB0aGlzLndhdGNoZXJzW3Byb3BlcnR5XSA9IFtdO1xuICAgICAgICB0aGlzLndhdGNoZXJzW3Byb3BlcnR5XS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgIH07XG4gICAgICAvKiBNT0RFUk4tT05MWTpTVEFSVCAqL1xuICAgICAgLy8gV2UgcmVtb3ZlIHRoaXMgcGllY2Ugb2YgY29kZSBmcm9tIHRoZSBsZWdhY3kgYnVpbGQuXG4gICAgICAvLyBJbiBJRTExLCB3ZSBoYXZlIGFscmVhZHkgZGVmaW5lZCBvdXIgaGVscGVycyBhdCB0aGlzIHBvaW50LlxuICAgICAgLy8gUmVnaXN0ZXIgY3VzdG9tIG1hZ2ljIHByb3BlcnRpZXMuXG5cblxuICAgICAgT2JqZWN0LmVudHJpZXMoQWxwaW5lLm1hZ2ljUHJvcGVydGllcykuZm9yRWFjaCgoW25hbWUsIGNhbGxiYWNrXSkgPT4ge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy51bm9ic2VydmVkRGF0YSwgYCQke25hbWV9YCwge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNhbm9uaWNhbENvbXBvbmVudEVsZW1lbnRSZWZlcmVuY2UsIHRoaXMuJGVsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICAvKiBNT0RFUk4tT05MWTpFTkQgKi9cblxuICAgICAgdGhpcy5zaG93RGlyZWN0aXZlU3RhY2sgPSBbXTtcbiAgICAgIHRoaXMuc2hvd0RpcmVjdGl2ZUxhc3RFbGVtZW50O1xuICAgICAgY29tcG9uZW50Rm9yQ2xvbmUgfHwgQWxwaW5lLm9uQmVmb3JlQ29tcG9uZW50SW5pdGlhbGl6ZWRzLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2sodGhpcykpO1xuICAgICAgdmFyIGluaXRSZXR1cm5lZENhbGxiYWNrOyAvLyBJZiB4LWluaXQgaXMgcHJlc2VudCBBTkQgd2UgYXJlbid0IGNsb25pbmcgKHNraXAgeC1pbml0IG9uIGNsb25lKVxuXG4gICAgICBpZiAoaW5pdEV4cHJlc3Npb24gJiYgIWNvbXBvbmVudEZvckNsb25lKSB7XG4gICAgICAgIC8vIFdlIHdhbnQgdG8gYWxsb3cgZGF0YSBtYW5pcHVsYXRpb24sIGJ1dCBub3QgdHJpZ2dlciBET00gdXBkYXRlcyBqdXN0IHlldC5cbiAgICAgICAgLy8gV2UgaGF2ZW4ndCBldmVuIGluaXRpYWxpemVkIHRoZSBlbGVtZW50cyB3aXRoIHRoZWlyIEFscGluZSBiaW5kaW5ncy4gSSBtZWFuIGMnbW9uLlxuICAgICAgICB0aGlzLnBhdXNlUmVhY3Rpdml0eSA9IHRydWU7XG4gICAgICAgIGluaXRSZXR1cm5lZENhbGxiYWNrID0gdGhpcy5ldmFsdWF0ZVJldHVybkV4cHJlc3Npb24odGhpcy4kZWwsIGluaXRFeHByZXNzaW9uKTtcbiAgICAgICAgdGhpcy5wYXVzZVJlYWN0aXZpdHkgPSBmYWxzZTtcbiAgICAgIH0gLy8gUmVnaXN0ZXIgYWxsIG91ciBsaXN0ZW5lcnMgYW5kIHNldCBhbGwgb3VyIGF0dHJpYnV0ZSBiaW5kaW5ncy5cblxuXG4gICAgICB0aGlzLmluaXRpYWxpemVFbGVtZW50cyh0aGlzLiRlbCk7IC8vIFVzZSBtdXRhdGlvbiBvYnNlcnZlciB0byBkZXRlY3QgbmV3IGVsZW1lbnRzIGJlaW5nIGFkZGVkIHdpdGhpbiB0aGlzIGNvbXBvbmVudCBhdCBydW4tdGltZS5cbiAgICAgIC8vIEFscGluZSdzIGp1c3Qgc28gZGFybiBmbGV4aWJsZSBhbWlyaXRlP1xuXG4gICAgICB0aGlzLmxpc3RlbkZvck5ld0VsZW1lbnRzVG9Jbml0aWFsaXplKCk7XG5cbiAgICAgIGlmICh0eXBlb2YgaW5pdFJldHVybmVkQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gUnVuIHRoZSBjYWxsYmFjayByZXR1cm5lZCBmcm9tIHRoZSBcIngtaW5pdFwiIGhvb2sgdG8gYWxsb3cgdGhlIHVzZXIgdG8gZG8gc3R1ZmYgYWZ0ZXJcbiAgICAgICAgLy8gQWxwaW5lJ3MgZ290IGl0J3MgZ3J1YmJ5IGxpdHRsZSBwYXdzIGFsbCBvdmVyIGV2ZXJ5dGhpbmcuXG4gICAgICAgIGluaXRSZXR1cm5lZENhbGxiYWNrLmNhbGwodGhpcy4kZGF0YSk7XG4gICAgICB9XG5cbiAgICAgIGNvbXBvbmVudEZvckNsb25lIHx8IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBBbHBpbmUub25Db21wb25lbnRJbml0aWFsaXplZHMuZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjayh0aGlzKSk7XG4gICAgICB9LCAwKTtcbiAgICB9XG5cbiAgICBnZXRVbm9ic2VydmVkRGF0YSgpIHtcbiAgICAgIHJldHVybiB1bndyYXAkMSh0aGlzLm1lbWJyYW5lLCB0aGlzLiRkYXRhKTtcbiAgICB9XG5cbiAgICB3cmFwRGF0YUluT2JzZXJ2YWJsZShkYXRhKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICBsZXQgdXBkYXRlRG9tID0gZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLnVwZGF0ZUVsZW1lbnRzKHNlbGYuJGVsKTtcbiAgICAgIH0sIDApO1xuICAgICAgcmV0dXJuIHdyYXAoZGF0YSwgKHRhcmdldCwga2V5KSA9PiB7XG4gICAgICAgIGlmIChzZWxmLndhdGNoZXJzW2tleV0pIHtcbiAgICAgICAgICAvLyBJZiB0aGVyZSdzIGEgd2F0Y2hlciBmb3IgdGhpcyBzcGVjaWZpYyBrZXksIHJ1biBpdC5cbiAgICAgICAgICBzZWxmLndhdGNoZXJzW2tleV0uZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjayh0YXJnZXRba2V5XSkpO1xuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgICAgIC8vIEFycmF5cyBhcmUgc3BlY2lhbCBjYXNlcywgaWYgYW55IG9mIHRoZSBpdGVtcyBjaGFuZ2UsIHdlIGNvbnNpZGVyIHRoZSBhcnJheSBhcyBtdXRhdGVkLlxuICAgICAgICAgIE9iamVjdC5rZXlzKHNlbGYud2F0Y2hlcnMpLmZvckVhY2goZnVsbERvdE5vdGF0aW9uS2V5ID0+IHtcbiAgICAgICAgICAgIGxldCBkb3ROb3RhdGlvblBhcnRzID0gZnVsbERvdE5vdGF0aW9uS2V5LnNwbGl0KCcuJyk7IC8vIElnbm9yZSBsZW5ndGggbXV0YXRpb25zIHNpbmNlIHRoZXkgd291bGQgcmVzdWx0IGluIGR1cGxpY2F0ZSBjYWxscy5cbiAgICAgICAgICAgIC8vIEZvciBleGFtcGxlLCB3aGVuIGNhbGxpbmcgcHVzaCwgd2Ugd291bGQgZ2V0IGEgbXV0YXRpb24gZm9yIHRoZSBpdGVtJ3Mga2V5XG4gICAgICAgICAgICAvLyBhbmQgYSBzZWNvbmQgbXV0YXRpb24gZm9yIHRoZSBsZW5ndGggcHJvcGVydHkuXG5cbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdsZW5ndGgnKSByZXR1cm47XG4gICAgICAgICAgICBkb3ROb3RhdGlvblBhcnRzLnJlZHVjZSgoY29tcGFyaXNvbkRhdGEsIHBhcnQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKE9iamVjdC5pcyh0YXJnZXQsIGNvbXBhcmlzb25EYXRhW3BhcnRdKSkge1xuICAgICAgICAgICAgICAgIHNlbGYud2F0Y2hlcnNbZnVsbERvdE5vdGF0aW9uS2V5XS5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKHRhcmdldCkpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGNvbXBhcmlzb25EYXRhW3BhcnRdO1xuICAgICAgICAgICAgfSwgc2VsZi51bm9ic2VydmVkRGF0YSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gTGV0J3Mgd2FsayB0aHJvdWdoIHRoZSB3YXRjaGVycyB3aXRoIFwiZG90LW5vdGF0aW9uXCIgKGZvby5iYXIpIGFuZCBzZWVcbiAgICAgICAgICAvLyBpZiB0aGlzIG11dGF0aW9uIGZpdHMgYW55IG9mIHRoZW0uXG4gICAgICAgICAgT2JqZWN0LmtleXMoc2VsZi53YXRjaGVycykuZmlsdGVyKGkgPT4gaS5pbmNsdWRlcygnLicpKS5mb3JFYWNoKGZ1bGxEb3ROb3RhdGlvbktleSA9PiB7XG4gICAgICAgICAgICBsZXQgZG90Tm90YXRpb25QYXJ0cyA9IGZ1bGxEb3ROb3RhdGlvbktleS5zcGxpdCgnLicpOyAvLyBJZiB0aGlzIGRvdC1ub3RhdGlvbiB3YXRjaGVyJ3MgbGFzdCBcInBhcnRcIiBkb2Vzbid0IG1hdGNoIHRoZSBjdXJyZW50XG4gICAgICAgICAgICAvLyBrZXksIHRoZW4gc2tpcCBpdCBlYXJseSBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucy5cblxuICAgICAgICAgICAgaWYgKGtleSAhPT0gZG90Tm90YXRpb25QYXJ0c1tkb3ROb3RhdGlvblBhcnRzLmxlbmd0aCAtIDFdKSByZXR1cm47IC8vIE5vdywgd2FsayB0aHJvdWdoIHRoZSBkb3Qtbm90YXRpb24gXCJwYXJ0c1wiIHJlY3Vyc2l2ZWx5IHRvIGZpbmRcbiAgICAgICAgICAgIC8vIGEgbWF0Y2gsIGFuZCBjYWxsIHRoZSB3YXRjaGVyIGlmIG9uZSdzIGZvdW5kLlxuXG4gICAgICAgICAgICBkb3ROb3RhdGlvblBhcnRzLnJlZHVjZSgoY29tcGFyaXNvbkRhdGEsIHBhcnQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKE9iamVjdC5pcyh0YXJnZXQsIGNvbXBhcmlzb25EYXRhKSkge1xuICAgICAgICAgICAgICAgIC8vIFJ1biB0aGUgd2F0Y2hlcnMuXG4gICAgICAgICAgICAgICAgc2VsZi53YXRjaGVyc1tmdWxsRG90Tm90YXRpb25LZXldLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2sodGFyZ2V0W2tleV0pKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiBjb21wYXJpc29uRGF0YVtwYXJ0XTtcbiAgICAgICAgICAgIH0sIHNlbGYudW5vYnNlcnZlZERhdGEpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IC8vIERvbid0IHJlYWN0IHRvIGRhdGEgY2hhbmdlcyBmb3IgY2FzZXMgbGlrZSB0aGUgYHgtY3JlYXRlZGAgaG9vay5cblxuXG4gICAgICAgIGlmIChzZWxmLnBhdXNlUmVhY3Rpdml0eSkgcmV0dXJuO1xuICAgICAgICB1cGRhdGVEb20oKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHdhbGtBbmRTa2lwTmVzdGVkQ29tcG9uZW50cyhlbCwgY2FsbGJhY2ssIGluaXRpYWxpemVDb21wb25lbnRDYWxsYmFjayA9ICgpID0+IHt9KSB7XG4gICAgICB3YWxrKGVsLCBlbCA9PiB7XG4gICAgICAgIC8vIFdlJ3ZlIGhpdCBhIGNvbXBvbmVudC5cbiAgICAgICAgaWYgKGVsLmhhc0F0dHJpYnV0ZSgneC1kYXRhJykpIHtcbiAgICAgICAgICAvLyBJZiBpdCdzIG5vdCB0aGUgY3VycmVudCBvbmUuXG4gICAgICAgICAgaWYgKCFlbC5pc1NhbWVOb2RlKHRoaXMuJGVsKSkge1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBpdCBpZiBpdCdzIG5vdC5cbiAgICAgICAgICAgIGlmICghZWwuX194KSBpbml0aWFsaXplQ29tcG9uZW50Q2FsbGJhY2soZWwpOyAvLyBOb3cgd2UnbGwgbGV0IHRoYXQgc3ViLWNvbXBvbmVudCBkZWFsIHdpdGggaXRzZWxmLlxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVsKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXRpYWxpemVFbGVtZW50cyhyb290RWwsIGV4dHJhVmFycyA9ICgpID0+IHt9KSB7XG4gICAgICB0aGlzLndhbGtBbmRTa2lwTmVzdGVkQ29tcG9uZW50cyhyb290RWwsIGVsID0+IHtcbiAgICAgICAgLy8gRG9uJ3QgdG91Y2ggc3Bhd25zIGZyb20gZm9yIGxvb3BcbiAgICAgICAgaWYgKGVsLl9feF9mb3Jfa2V5ICE9PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTsgLy8gRG9uJ3QgdG91Y2ggc3Bhd25zIGZyb20gaWYgZGlyZWN0aXZlc1xuXG4gICAgICAgIGlmIChlbC5fX3hfaW5zZXJ0ZWRfbWUgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVFbGVtZW50KGVsLCBleHRyYVZhcnMpO1xuICAgICAgfSwgZWwgPT4ge1xuICAgICAgICBlbC5fX3ggPSBuZXcgQ29tcG9uZW50KGVsKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5leGVjdXRlQW5kQ2xlYXJSZW1haW5pbmdTaG93RGlyZWN0aXZlU3RhY2soKTtcbiAgICAgIHRoaXMuZXhlY3V0ZUFuZENsZWFyTmV4dFRpY2tTdGFjayhyb290RWwpO1xuICAgIH1cblxuICAgIGluaXRpYWxpemVFbGVtZW50KGVsLCBleHRyYVZhcnMpIHtcbiAgICAgIC8vIFRvIHN1cHBvcnQgY2xhc3MgYXR0cmlidXRlIG1lcmdpbmcsIHdlIGhhdmUgdG8ga25vdyB3aGF0IHRoZSBlbGVtZW50J3NcbiAgICAgIC8vIG9yaWdpbmFsIGNsYXNzIGF0dHJpYnV0ZSBsb29rZWQgbGlrZSBmb3IgcmVmZXJlbmNlLlxuICAgICAgaWYgKGVsLmhhc0F0dHJpYnV0ZSgnY2xhc3MnKSAmJiBnZXRYQXR0cnMoZWwsIHRoaXMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZWwuX194X29yaWdpbmFsX2NsYXNzZXMgPSBjb252ZXJ0Q2xhc3NTdHJpbmdUb0FycmF5KGVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcnMoZWwsIGV4dHJhVmFycyk7XG4gICAgICB0aGlzLnJlc29sdmVCb3VuZEF0dHJpYnV0ZXMoZWwsIHRydWUsIGV4dHJhVmFycyk7XG4gICAgfVxuXG4gICAgdXBkYXRlRWxlbWVudHMocm9vdEVsLCBleHRyYVZhcnMgPSAoKSA9PiB7fSkge1xuICAgICAgdGhpcy53YWxrQW5kU2tpcE5lc3RlZENvbXBvbmVudHMocm9vdEVsLCBlbCA9PiB7XG4gICAgICAgIC8vIERvbid0IHRvdWNoIHNwYXducyBmcm9tIGZvciBsb29wIChhbmQgY2hlY2sgaWYgdGhlIHJvb3QgaXMgYWN0dWFsbHkgYSBmb3IgbG9vcCBpbiBhIHBhcmVudCwgZG9uJ3Qgc2tpcCBpdC4pXG4gICAgICAgIGlmIChlbC5fX3hfZm9yX2tleSAhPT0gdW5kZWZpbmVkICYmICFlbC5pc1NhbWVOb2RlKHRoaXMuJGVsKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB0aGlzLnVwZGF0ZUVsZW1lbnQoZWwsIGV4dHJhVmFycyk7XG4gICAgICB9LCBlbCA9PiB7XG4gICAgICAgIGVsLl9feCA9IG5ldyBDb21wb25lbnQoZWwpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmV4ZWN1dGVBbmRDbGVhclJlbWFpbmluZ1Nob3dEaXJlY3RpdmVTdGFjaygpO1xuICAgICAgdGhpcy5leGVjdXRlQW5kQ2xlYXJOZXh0VGlja1N0YWNrKHJvb3RFbCk7XG4gICAgfVxuXG4gICAgZXhlY3V0ZUFuZENsZWFyTmV4dFRpY2tTdGFjayhlbCkge1xuICAgICAgLy8gU2tpcCBzcGF3bnMgZnJvbSBhbHBpbmUgZGlyZWN0aXZlc1xuICAgICAgaWYgKGVsID09PSB0aGlzLiRlbCAmJiB0aGlzLm5leHRUaWNrU3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBXZSBydW4gdGhlIHRpY2sgc3RhY2sgYWZ0ZXIgdGhlIG5leHQgZnJhbWUgdG8gYWxsb3cgYW55XG4gICAgICAgIC8vIHJ1bm5pbmcgdHJhbnNpdGlvbnMgdG8gcGFzcyB0aGUgaW5pdGlhbCBzaG93IHN0YWdlLlxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIHdoaWxlICh0aGlzLm5leHRUaWNrU3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0VGlja1N0YWNrLnNoaWZ0KCkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGV4ZWN1dGVBbmRDbGVhclJlbWFpbmluZ1Nob3dEaXJlY3RpdmVTdGFjaygpIHtcbiAgICAgIC8vIFRoZSBnb2FsIGhlcmUgaXMgdG8gc3RhcnQgYWxsIHRoZSB4LXNob3cgdHJhbnNpdGlvbnNcbiAgICAgIC8vIGFuZCBidWlsZCBhIG5lc3RlZCBwcm9taXNlIGNoYWluIHNvIHRoYXQgZWxlbWVudHNcbiAgICAgIC8vIG9ubHkgaGlkZSB3aGVuIHRoZSBjaGlsZHJlbiBhcmUgZmluaXNoZWQgaGlkaW5nLlxuICAgICAgdGhpcy5zaG93RGlyZWN0aXZlU3RhY2sucmV2ZXJzZSgpLm1hcChoYW5kbGVyID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBoYW5kbGVyKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfSkucmVkdWNlKChwcm9taXNlQ2hhaW4sIHByb21pc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIHByb21pc2VDaGFpbi50aGVuKCgpID0+IHtcbiAgICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZpbmlzaEVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgZmluaXNoRWxlbWVudCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sIFByb21pc2UucmVzb2x2ZSgoKSA9PiB7fSkpLmNhdGNoKGUgPT4ge1xuICAgICAgICBpZiAoZSAhPT0gVFJBTlNJVElPTl9DQU5DRUxMRUQpIHRocm93IGU7XG4gICAgICB9KTsgLy8gV2UndmUgcHJvY2Vzc2VkIHRoZSBoYW5kbGVyIHN0YWNrLiBsZXQncyBjbGVhciBpdC5cblxuICAgICAgdGhpcy5zaG93RGlyZWN0aXZlU3RhY2sgPSBbXTtcbiAgICAgIHRoaXMuc2hvd0RpcmVjdGl2ZUxhc3RFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHVwZGF0ZUVsZW1lbnQoZWwsIGV4dHJhVmFycykge1xuICAgICAgdGhpcy5yZXNvbHZlQm91bmRBdHRyaWJ1dGVzKGVsLCBmYWxzZSwgZXh0cmFWYXJzKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlckxpc3RlbmVycyhlbCwgZXh0cmFWYXJzKSB7XG4gICAgICBnZXRYQXR0cnMoZWwsIHRoaXMpLmZvckVhY2goKHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIG1vZGlmaWVycyxcbiAgICAgICAgZXhwcmVzc2lvblxuICAgICAgfSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICBjYXNlICdvbic6XG4gICAgICAgICAgICByZWdpc3Rlckxpc3RlbmVyKHRoaXMsIGVsLCB2YWx1ZSwgbW9kaWZpZXJzLCBleHByZXNzaW9uLCBleHRyYVZhcnMpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdtb2RlbCc6XG4gICAgICAgICAgICByZWdpc3Rlck1vZGVsTGlzdGVuZXIodGhpcywgZWwsIG1vZGlmaWVycywgZXhwcmVzc2lvbiwgZXh0cmFWYXJzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXNvbHZlQm91bmRBdHRyaWJ1dGVzKGVsLCBpbml0aWFsVXBkYXRlID0gZmFsc2UsIGV4dHJhVmFycykge1xuICAgICAgbGV0IGF0dHJzID0gZ2V0WEF0dHJzKGVsLCB0aGlzKTtcbiAgICAgIGF0dHJzLmZvckVhY2goKHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIG1vZGlmaWVycyxcbiAgICAgICAgZXhwcmVzc2lvblxuICAgICAgfSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICBjYXNlICdtb2RlbCc6XG4gICAgICAgICAgICBoYW5kbGVBdHRyaWJ1dGVCaW5kaW5nRGlyZWN0aXZlKHRoaXMsIGVsLCAndmFsdWUnLCBleHByZXNzaW9uLCBleHRyYVZhcnMsIHR5cGUsIG1vZGlmaWVycyk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ2JpbmQnOlxuICAgICAgICAgICAgLy8gVGhlIDprZXkgYmluZGluZyBvbiBhbiB4LWZvciBpcyBzcGVjaWFsLCBpZ25vcmUgaXQuXG4gICAgICAgICAgICBpZiAoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndGVtcGxhdGUnICYmIHZhbHVlID09PSAna2V5JykgcmV0dXJuO1xuICAgICAgICAgICAgaGFuZGxlQXR0cmlidXRlQmluZGluZ0RpcmVjdGl2ZSh0aGlzLCBlbCwgdmFsdWUsIGV4cHJlc3Npb24sIGV4dHJhVmFycywgdHlwZSwgbW9kaWZpZXJzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgICAgICB2YXIgb3V0cHV0ID0gdGhpcy5ldmFsdWF0ZVJldHVybkV4cHJlc3Npb24oZWwsIGV4cHJlc3Npb24sIGV4dHJhVmFycyk7XG4gICAgICAgICAgICBoYW5kbGVUZXh0RGlyZWN0aXZlKGVsLCBvdXRwdXQsIGV4cHJlc3Npb24pO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdodG1sJzpcbiAgICAgICAgICAgIGhhbmRsZUh0bWxEaXJlY3RpdmUodGhpcywgZWwsIGV4cHJlc3Npb24sIGV4dHJhVmFycyk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ3Nob3cnOlxuICAgICAgICAgICAgdmFyIG91dHB1dCA9IHRoaXMuZXZhbHVhdGVSZXR1cm5FeHByZXNzaW9uKGVsLCBleHByZXNzaW9uLCBleHRyYVZhcnMpO1xuICAgICAgICAgICAgaGFuZGxlU2hvd0RpcmVjdGl2ZSh0aGlzLCBlbCwgb3V0cHV0LCBtb2RpZmllcnMsIGluaXRpYWxVcGRhdGUpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdpZic6XG4gICAgICAgICAgICAvLyBJZiB0aGlzIGVsZW1lbnQgYWxzbyBoYXMgeC1mb3Igb24gaXQsIGRvbid0IHByb2Nlc3MgeC1pZi5cbiAgICAgICAgICAgIC8vIFdlIHdpbGwgbGV0IHRoZSBcIngtZm9yXCIgZGlyZWN0aXZlIGhhbmRsZSB0aGUgXCJpZlwiaW5nLlxuICAgICAgICAgICAgaWYgKGF0dHJzLnNvbWUoaSA9PiBpLnR5cGUgPT09ICdmb3InKSkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIG91dHB1dCA9IHRoaXMuZXZhbHVhdGVSZXR1cm5FeHByZXNzaW9uKGVsLCBleHByZXNzaW9uLCBleHRyYVZhcnMpO1xuICAgICAgICAgICAgaGFuZGxlSWZEaXJlY3RpdmUodGhpcywgZWwsIG91dHB1dCwgaW5pdGlhbFVwZGF0ZSwgZXh0cmFWYXJzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnZm9yJzpcbiAgICAgICAgICAgIGhhbmRsZUZvckRpcmVjdGl2ZSh0aGlzLCBlbCwgZXhwcmVzc2lvbiwgaW5pdGlhbFVwZGF0ZSwgZXh0cmFWYXJzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnY2xvYWsnOlxuICAgICAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCd4LWNsb2FrJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZXZhbHVhdGVSZXR1cm5FeHByZXNzaW9uKGVsLCBleHByZXNzaW9uLCBleHRyYVZhcnMgPSAoKSA9PiB7fSkge1xuICAgICAgcmV0dXJuIHNhZmVyRXZhbChlbCwgZXhwcmVzc2lvbiwgdGhpcy4kZGF0YSwgX29iamVjdFNwcmVhZDIoX29iamVjdFNwcmVhZDIoe30sIGV4dHJhVmFycygpKSwge30sIHtcbiAgICAgICAgJGRpc3BhdGNoOiB0aGlzLmdldERpc3BhdGNoRnVuY3Rpb24oZWwpXG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgZXZhbHVhdGVDb21tYW5kRXhwcmVzc2lvbihlbCwgZXhwcmVzc2lvbiwgZXh0cmFWYXJzID0gKCkgPT4ge30pIHtcbiAgICAgIHJldHVybiBzYWZlckV2YWxOb1JldHVybihlbCwgZXhwcmVzc2lvbiwgdGhpcy4kZGF0YSwgX29iamVjdFNwcmVhZDIoX29iamVjdFNwcmVhZDIoe30sIGV4dHJhVmFycygpKSwge30sIHtcbiAgICAgICAgJGRpc3BhdGNoOiB0aGlzLmdldERpc3BhdGNoRnVuY3Rpb24oZWwpXG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgZ2V0RGlzcGF0Y2hGdW5jdGlvbihlbCkge1xuICAgICAgcmV0dXJuIChldmVudCwgZGV0YWlsID0ge30pID0+IHtcbiAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoZXZlbnQsIHtcbiAgICAgICAgICBkZXRhaWwsXG4gICAgICAgICAgYnViYmxlczogdHJ1ZVxuICAgICAgICB9KSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGxpc3RlbkZvck5ld0VsZW1lbnRzVG9Jbml0aWFsaXplKCkge1xuICAgICAgY29uc3QgdGFyZ2V0Tm9kZSA9IHRoaXMuJGVsO1xuICAgICAgY29uc3Qgb2JzZXJ2ZXJPcHRpb25zID0ge1xuICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICAgIHN1YnRyZWU6IHRydWVcbiAgICAgIH07XG4gICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9ucyA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXV0YXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgLy8gRmlsdGVyIG91dCBtdXRhdGlvbnMgdHJpZ2dlcmVkIGZyb20gY2hpbGQgY29tcG9uZW50cy5cbiAgICAgICAgICBjb25zdCBjbG9zZXN0UGFyZW50Q29tcG9uZW50ID0gbXV0YXRpb25zW2ldLnRhcmdldC5jbG9zZXN0KCdbeC1kYXRhXScpO1xuICAgICAgICAgIGlmICghKGNsb3Nlc3RQYXJlbnRDb21wb25lbnQgJiYgY2xvc2VzdFBhcmVudENvbXBvbmVudC5pc1NhbWVOb2RlKHRoaXMuJGVsKSkpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgaWYgKG11dGF0aW9uc1tpXS50eXBlID09PSAnYXR0cmlidXRlcycgJiYgbXV0YXRpb25zW2ldLmF0dHJpYnV0ZU5hbWUgPT09ICd4LWRhdGEnKSB7XG4gICAgICAgICAgICBjb25zdCB4QXR0ciA9IG11dGF0aW9uc1tpXS50YXJnZXQuZ2V0QXR0cmlidXRlKCd4LWRhdGEnKSB8fCAne30nO1xuICAgICAgICAgICAgY29uc3QgcmF3RGF0YSA9IHNhZmVyRXZhbCh0aGlzLiRlbCwgeEF0dHIsIHtcbiAgICAgICAgICAgICAgJGVsOiB0aGlzLiRlbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhyYXdEYXRhKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLiRkYXRhW2tleV0gIT09IHJhd0RhdGFba2V5XSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGRhdGFba2V5XSA9IHJhd0RhdGFba2V5XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG11dGF0aW9uc1tpXS5hZGRlZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG11dGF0aW9uc1tpXS5hZGRlZE5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlICE9PSAxIHx8IG5vZGUuX194X2luc2VydGVkX21lKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgaWYgKG5vZGUubWF0Y2hlcygnW3gtZGF0YV0nKSAmJiAhbm9kZS5fX3gpIHtcbiAgICAgICAgICAgICAgICBub2RlLl9feCA9IG5ldyBDb21wb25lbnQobm9kZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplRWxlbWVudHMobm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXROb2RlLCBvYnNlcnZlck9wdGlvbnMpO1xuICAgIH1cblxuICAgIGdldFJlZnNQcm94eSgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHZhciByZWZPYmogPSB7fTtcbiAgICAgIC8vIE9uZSBvZiB0aGUgZ29hbHMgb2YgdGhpcyBpcyB0byBub3QgaG9sZCBlbGVtZW50cyBpbiBtZW1vcnksIGJ1dCByYXRoZXIgcmUtZXZhbHVhdGVcbiAgICAgIC8vIHRoZSBET00gd2hlbiB0aGUgc3lzdGVtIG5lZWRzIHNvbWV0aGluZyBmcm9tIGl0LiBUaGlzIHdheSwgdGhlIGZyYW1ld29yayBpcyBmbGV4aWJsZSBhbmRcbiAgICAgIC8vIGZyaWVuZGx5IHRvIG91dHNpZGUgRE9NIGNoYW5nZXMgZnJvbSBsaWJyYXJpZXMgbGlrZSBWdWUvTGl2ZXdpcmUuXG4gICAgICAvLyBGb3IgdGhpcyByZWFzb24sIEknbSB1c2luZyBhbiBcIm9uLWRlbWFuZFwiIHByb3h5IHRvIGZha2UgYSBcIiRyZWZzXCIgb2JqZWN0LlxuXG4gICAgICByZXR1cm4gbmV3IFByb3h5KHJlZk9iaiwge1xuICAgICAgICBnZXQob2JqZWN0LCBwcm9wZXJ0eSkge1xuICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PT0gJyRpc0FscGluZVByb3h5JykgcmV0dXJuIHRydWU7XG4gICAgICAgICAgdmFyIHJlZjsgLy8gV2UgY2FuJ3QganVzdCBxdWVyeSB0aGUgRE9NIGJlY2F1c2UgaXQncyBoYXJkIHRvIGZpbHRlciBvdXQgcmVmcyBpblxuICAgICAgICAgIC8vIG5lc3RlZCBjb21wb25lbnRzLlxuXG4gICAgICAgICAgc2VsZi53YWxrQW5kU2tpcE5lc3RlZENvbXBvbmVudHMoc2VsZi4kZWwsIGVsID0+IHtcbiAgICAgICAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ3gtcmVmJykgJiYgZWwuZ2V0QXR0cmlidXRlKCd4LXJlZicpID09PSBwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICByZWYgPSBlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gcmVmO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbiAgY29uc3QgQWxwaW5lID0ge1xuICAgIHZlcnNpb246IFwiMi44LjBcIixcbiAgICBwYXVzZU11dGF0aW9uT2JzZXJ2ZXI6IGZhbHNlLFxuICAgIG1hZ2ljUHJvcGVydGllczoge30sXG4gICAgb25Db21wb25lbnRJbml0aWFsaXplZHM6IFtdLFxuICAgIG9uQmVmb3JlQ29tcG9uZW50SW5pdGlhbGl6ZWRzOiBbXSxcbiAgICBpZ25vcmVGb2N1c2VkRm9yVmFsdWVCaW5kaW5nOiBmYWxzZSxcbiAgICBzdGFydDogYXN5bmMgZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICBpZiAoIWlzVGVzdGluZygpKSB7XG4gICAgICAgIGF3YWl0IGRvbVJlYWR5KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZGlzY292ZXJDb21wb25lbnRzKGVsID0+IHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplQ29tcG9uZW50KGVsKTtcbiAgICAgIH0pOyAvLyBJdCdzIGVhc2llciBhbmQgbW9yZSBwZXJmb3JtYW50IHRvIGp1c3Qgc3VwcG9ydCBUdXJib2xpbmtzIHRoYW4gbGlzdGVuXG4gICAgICAvLyB0byBNdXRhdGlvbk9ic2VydmVyIG11dGF0aW9ucyBhdCB0aGUgZG9jdW1lbnQgbGV2ZWwuXG5cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0dXJib2xpbmtzOmxvYWRcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLmRpc2NvdmVyVW5pbml0aWFsaXplZENvbXBvbmVudHMoZWwgPT4ge1xuICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZUNvbXBvbmVudChlbCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmxpc3RlbkZvck5ld1VuaW5pdGlhbGl6ZWRDb21wb25lbnRzQXRSdW5UaW1lKCk7XG4gICAgfSxcbiAgICBkaXNjb3ZlckNvbXBvbmVudHM6IGZ1bmN0aW9uIGRpc2NvdmVyQ29tcG9uZW50cyhjYWxsYmFjaykge1xuICAgICAgY29uc3Qgcm9vdEVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1t4LWRhdGFdJyk7XG4gICAgICByb290RWxzLmZvckVhY2gocm9vdEVsID0+IHtcbiAgICAgICAgY2FsbGJhY2socm9vdEVsKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZGlzY292ZXJVbmluaXRpYWxpemVkQ29tcG9uZW50czogZnVuY3Rpb24gZGlzY292ZXJVbmluaXRpYWxpemVkQ29tcG9uZW50cyhjYWxsYmFjaywgZWwgPSBudWxsKSB7XG4gICAgICBjb25zdCByb290RWxzID0gKGVsIHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKCdbeC1kYXRhXScpO1xuICAgICAgQXJyYXkuZnJvbShyb290RWxzKS5maWx0ZXIoZWwgPT4gZWwuX194ID09PSB1bmRlZmluZWQpLmZvckVhY2gocm9vdEVsID0+IHtcbiAgICAgICAgY2FsbGJhY2socm9vdEVsKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgbGlzdGVuRm9yTmV3VW5pbml0aWFsaXplZENvbXBvbmVudHNBdFJ1blRpbWU6IGZ1bmN0aW9uIGxpc3RlbkZvck5ld1VuaW5pdGlhbGl6ZWRDb21wb25lbnRzQXRSdW5UaW1lKCkge1xuICAgICAgY29uc3QgdGFyZ2V0Tm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICAgIGNvbnN0IG9ic2VydmVyT3B0aW9ucyA9IHtcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlXG4gICAgICB9O1xuICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbnMgPT4ge1xuICAgICAgICBpZiAodGhpcy5wYXVzZU11dGF0aW9uT2JzZXJ2ZXIpIHJldHVybjtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG11dGF0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChtdXRhdGlvbnNbaV0uYWRkZWROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBtdXRhdGlvbnNbaV0uYWRkZWROb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgICAvLyBEaXNjYXJkIG5vbi1lbGVtZW50IG5vZGVzIChsaWtlIGxpbmUtYnJlYWtzKVxuICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSAhPT0gMSkgcmV0dXJuOyAvLyBEaXNjYXJkIGFueSBjaGFuZ2VzIGhhcHBlbmluZyB3aXRoaW4gYW4gZXhpc3RpbmcgY29tcG9uZW50LlxuICAgICAgICAgICAgICAvLyBUaGV5IHdpbGwgdGFrZSBjYXJlIG9mIHRoZW1zZWx2ZXMuXG5cbiAgICAgICAgICAgICAgaWYgKG5vZGUucGFyZW50RWxlbWVudCAmJiBub2RlLnBhcmVudEVsZW1lbnQuY2xvc2VzdCgnW3gtZGF0YV0nKSkgcmV0dXJuO1xuICAgICAgICAgICAgICB0aGlzLmRpc2NvdmVyVW5pbml0aWFsaXplZENvbXBvbmVudHMoZWwgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZUNvbXBvbmVudChlbCk7XG4gICAgICAgICAgICAgIH0sIG5vZGUucGFyZW50RWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXROb2RlLCBvYnNlcnZlck9wdGlvbnMpO1xuICAgIH0sXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudDogZnVuY3Rpb24gaW5pdGlhbGl6ZUNvbXBvbmVudChlbCkge1xuICAgICAgaWYgKCFlbC5fX3gpIHtcbiAgICAgICAgLy8gV3JhcCBpbiBhIHRyeS9jYXRjaCBzbyB0aGF0IHdlIGRvbid0IHByZXZlbnQgb3RoZXIgY29tcG9uZW50c1xuICAgICAgICAvLyBmcm9tIGluaXRpYWxpemluZyB3aGVuIG9uZSBjb21wb25lbnQgY29udGFpbnMgYW4gZXJyb3IuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZWwuX194ID0gbmV3IENvbXBvbmVudChlbCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgY2xvbmU6IGZ1bmN0aW9uIGNsb25lKGNvbXBvbmVudCwgbmV3RWwpIHtcbiAgICAgIGlmICghbmV3RWwuX194KSB7XG4gICAgICAgIG5ld0VsLl9feCA9IG5ldyBDb21wb25lbnQobmV3RWwsIGNvbXBvbmVudCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBhZGRNYWdpY1Byb3BlcnR5OiBmdW5jdGlvbiBhZGRNYWdpY1Byb3BlcnR5KG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLm1hZ2ljUHJvcGVydGllc1tuYW1lXSA9IGNhbGxiYWNrO1xuICAgIH0sXG4gICAgb25Db21wb25lbnRJbml0aWFsaXplZDogZnVuY3Rpb24gb25Db21wb25lbnRJbml0aWFsaXplZChjYWxsYmFjaykge1xuICAgICAgdGhpcy5vbkNvbXBvbmVudEluaXRpYWxpemVkcy5wdXNoKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIG9uQmVmb3JlQ29tcG9uZW50SW5pdGlhbGl6ZWQ6IGZ1bmN0aW9uIG9uQmVmb3JlQ29tcG9uZW50SW5pdGlhbGl6ZWQoY2FsbGJhY2spIHtcbiAgICAgIHRoaXMub25CZWZvcmVDb21wb25lbnRJbml0aWFsaXplZHMucHVzaChjYWxsYmFjayk7XG4gICAgfVxuICB9O1xuXG4gIGlmICghaXNUZXN0aW5nKCkpIHtcbiAgICB3aW5kb3cuQWxwaW5lID0gQWxwaW5lO1xuXG4gICAgaWYgKHdpbmRvdy5kZWZlckxvYWRpbmdBbHBpbmUpIHtcbiAgICAgIHdpbmRvdy5kZWZlckxvYWRpbmdBbHBpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3cuQWxwaW5lLnN0YXJ0KCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LkFscGluZS5zdGFydCgpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBBbHBpbmU7XG5cbn0pKSk7XG4iLCAiaW1wb3J0IFwiYWxwaW5lanNcIjtcclxuXHJcbmRlY2xhcmUgZ2xvYmFsIHtcclxuICBpbnRlcmZhY2UgV2luZG93IHtcclxuICAgIHRvZ2dsZU5hdmJhcjogdHlwZW9mIHRvZ2dsZU5hdmJhcjtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZU5hdmJhcihjb2xsYXBzZUlEOiBzdHJpbmcpIHtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb2xsYXBzZUlEKT8uY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb2xsYXBzZUlEKT8uY2xhc3NMaXN0LnRvZ2dsZShcImJsb2NrXCIpO1xyXG59XHJcblxyXG53aW5kb3cudG9nZ2xlTmF2YmFyID0gdG9nZ2xlTmF2YmFyO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQSxJQUFDLFVBQVUsUUFBUTtBQUNqQixhQUFPLFlBQVksWUFBWSxPQUFPLFdBQVcsY0FBYyxPQUFPLFVBQVUsWUFDaEYsT0FBTyxXQUFXLGNBQWMsT0FBTyxNQUFNLE9BQU8sV0FDbkQsVUFBUyxVQUFVLE1BQU0sT0FBTyxTQUFTO0FBQUEsT0FDMUMsU0FBTztBQUFjO0FBRXJCLCtCQUF5QixLQUFLLEtBQUs7QUFDakMsWUFBSSxPQUFPO0FBQ1QsaUJBQU8sZUFBZSxLQUFLLEtBQUs7QUFBQSxZQUM5QjtBQUFBLFlBQ0EsWUFBWTtBQUFBLFlBQ1osY0FBYztBQUFBLFlBQ2QsVUFBVTtBQUFBO0FBQUE7QUFHWixjQUFJLE9BQU87QUFBQTtBQUdiLGVBQU87QUFBQTtBQUdULHVCQUFpQixRQUFRO0FBQ3ZCLFlBQUksT0FBTyxPQUFPLEtBQUs7QUFFdkIsWUFBSSxPQUFPO0FBQ1QsY0FBSSxVQUFVLE9BQU8sc0JBQXNCO0FBQzNDLGNBQUk7QUFBZ0Isc0JBQVUsUUFBUSxPQUFPLFNBQVU7QUFDckQscUJBQU8sT0FBTyx5QkFBeUIsUUFBUSxLQUFLO0FBQUE7QUFFdEQsZUFBSyxLQUFLLE1BQU0sTUFBTTtBQUFBO0FBR3hCLGVBQU87QUFBQTtBQUdULDhCQUF3QjtBQUN0QixpQkFBUyxJQUFJLEdBQUcsSUFBSSxVQUFVLFFBQVE7QUFDcEMsY0FBSSxTQUFTLFVBQVUsTUFBTSxPQUFPLFVBQVUsS0FBSztBQUVuRCxjQUFJLElBQUk7QUFDTixvQkFBUSxPQUFPLFNBQVMsTUFBTSxRQUFRLFNBQVU7QUFDOUMsOEJBQWdCLFFBQVEsS0FBSyxPQUFPO0FBQUE7QUFBQSxxQkFFN0IsT0FBTztBQUNoQixtQkFBTyxpQkFBaUIsUUFBUSxPQUFPLDBCQUEwQjtBQUFBO0FBRWpFLG9CQUFRLE9BQU8sU0FBUyxRQUFRLFNBQVU7QUFDeEMscUJBQU8sZUFBZSxRQUFRLEtBQUssT0FBTyx5QkFBeUIsUUFBUTtBQUFBO0FBQUE7QUFBQTtBQUtqRixlQUFPO0FBQUE7QUFLVDtBQUNFLGVBQU8sSUFBSSxRQUFRO0FBQ2pCLGNBQUksU0FBUyxjQUFjO0FBQ3pCLHFCQUFTLGlCQUFpQixvQkFBb0I7QUFBQTtBQUU5QztBQUFBO0FBQUE7QUFBQTtBQUlOLDJCQUFxQjtBQUNuQixlQUFPLE1BQU0sS0FBSyxJQUFJLElBQUk7QUFBQTtBQUU1QjtBQUNFLGVBQU8sVUFBVSxVQUFVLFNBQVMsY0FBYyxVQUFVLFVBQVUsU0FBUztBQUFBO0FBRWpGLHVDQUFpQyxRQUFRO0FBQ3ZDLGVBQU8sVUFBVTtBQUFBO0FBRW5CLHVDQUFpQyxJQUFJO0FBQ25DLFlBQUksR0FBRyxRQUFRLGtCQUFrQjtBQUMvQixrQkFBUSxLQUFLLFlBQVksd0dBQXdHO0FBQUEsbUJBQ3hILEdBQUcsUUFBUSxzQkFBc0I7QUFDMUMsa0JBQVEsS0FBSyxnQ0FBZ0M7QUFBQTtBQUFBO0FBR2pELHlCQUFtQjtBQUNqQixlQUFPLFFBQVEsUUFBUSxtQkFBbUIsU0FBUyxRQUFRLFNBQVMsS0FBSztBQUFBO0FBRTNFLHlCQUFtQjtBQUNqQixlQUFPLFFBQVEsY0FBYyxRQUFRLFVBQVUsQ0FBQyxPQUFPLFNBQVMsS0FBSztBQUFBO0FBRXZFLG9CQUFjLElBQUk7QUFDaEIsWUFBSSxTQUFTLFFBQVE7QUFBTztBQUM1QixZQUFJLE9BQU8sR0FBRztBQUVkLGVBQU87QUFDTCxlQUFLLE1BQU07QUFDWCxpQkFBTyxLQUFLO0FBQUE7QUFBQTtBQUdoQix3QkFBa0IsTUFBTTtBQUN0QixZQUFJO0FBQ0osZUFBTztBQUNMLGNBQUksVUFBVSxNQUNWLE9BQU87QUFFWCxjQUFJLFFBQVE7QUFDVixzQkFBVTtBQUNWLGlCQUFLLE1BQU0sU0FBUztBQUFBO0FBR3RCLHVCQUFhO0FBQ2Isb0JBQVUsV0FBVyxPQUFPO0FBQUE7QUFBQTtBQUloQyxZQUFNLGNBQWMsQ0FBQyxJQUFJLFlBQVk7QUFDbkMsZ0JBQVEsS0FBSyxrQkFBa0I7QUFBQTtBQUFBLGVBQTBCO0FBQUEsV0FBeUI7QUFFbEYsWUFBSSxDQUFDO0FBQ0gsZ0JBQU07QUFBQTtBQUFBO0FBSVYsd0JBQWtCLElBQUk7QUFBQSxRQUNwQjtBQUFBLFFBQ0E7QUFBQTtBQUVBO0FBQ0UsZ0JBQU0sUUFBUTtBQUNkLGlCQUFPLGlCQUFpQixVQUFVLE1BQU0sTUFBTSxPQUFLLFlBQVksSUFBSSxZQUFZLE1BQU07QUFBQSxpQkFDOUU7QUFDUCxzQkFBWSxJQUFJLFlBQVk7QUFBQTtBQUFBO0FBSWhDLHlCQUFtQixJQUFJLFlBQVksYUFBYSw0QkFBNEI7QUFDMUUsZUFBTyxTQUFTO0FBQ2QsY0FBSSxPQUFPLGVBQWU7QUFDeEIsbUJBQU8sV0FBVyxLQUFLO0FBQUE7QUFHekIsaUJBQU8sSUFBSSxTQUFTLENBQUMsU0FBUyxHQUFHLE9BQU8sS0FBSyw2QkFBNkIsd0RBQXdELHdDQUF3QyxhQUFhLEdBQUcsT0FBTyxPQUFPO0FBQUEsV0FDdk07QUFBQSxVQUNEO0FBQUEsVUFDQTtBQUFBO0FBQUE7QUFHSixpQ0FBMkIsSUFBSSxZQUFZLGFBQWEsNEJBQTRCO0FBQ2xGLGVBQU8sU0FBUztBQUNkLGNBQUksT0FBTyxlQUFlO0FBQ3hCLG1CQUFPLFFBQVEsUUFBUSxXQUFXLEtBQUssYUFBYSwwQkFBMEI7QUFBQTtBQUdoRixjQUFJLGdCQUFnQjtBQUdwQiwwQkFBZ0IsT0FBTyxlQUFlO0FBQWtCO0FBQUE7QUFBQSxhQUFJO0FBSzVELGNBQUksT0FBTyxLQUFLLGFBQWEsU0FBUztBQUNwQyxnQkFBSSxrQkFBa0IsSUFBSSxTQUFTLENBQUMsZUFBZSxHQUFHLE9BQU8sS0FBSyw2QkFBNkIsOEJBQThCLGdCQUFnQixhQUFhLEdBQUcsT0FBTyxPQUFPO0FBRTNLLGdCQUFJLE9BQU8sb0JBQW9CO0FBQzdCLHFCQUFPLFFBQVEsUUFBUSxnQkFBZ0IsS0FBSyxhQUFhLDBCQUEwQjtBQUFBO0FBRW5GLHFCQUFPLFFBQVE7QUFBQTtBQUFBO0FBSW5CLGlCQUFPLFFBQVEsUUFBUSxJQUFJLGNBQWMsQ0FBQyxlQUFlLEdBQUcsT0FBTyxLQUFLLDZCQUE2Qix1QkFBdUIsZ0JBQWdCLGFBQWEsR0FBRyxPQUFPLE9BQU87QUFBQSxXQUN6SztBQUFBLFVBQ0Q7QUFBQSxVQUNBO0FBQUE7QUFBQTtBQUdKLFlBQU0sVUFBVTtBQUNoQix1QkFBaUI7QUFDZixjQUFNLE9BQU8sb0NBQW9DLEtBQUs7QUFDdEQsZUFBTyxRQUFRLEtBQUs7QUFBQTtBQUV0Qix5QkFBbUIsSUFBSSxXQUFXO0FBQ2hDLFlBQUksYUFBYSxNQUFNLEtBQUssR0FBRyxZQUFZLE9BQU8sU0FBUyxJQUFJO0FBRS9ELFlBQUksa0JBQWtCLFdBQVcsT0FBTyxlQUFhLFVBQVUsU0FBUyxVQUFVO0FBRWxGLFlBQUk7QUFDRixjQUFJLGVBQWUsVUFBVSxJQUFJLGdCQUFnQixZQUFZLFVBQVU7QUFFdkUsdUJBQWEsV0FBVyxPQUFPLE9BQU8sUUFBUSxjQUFjLElBQUksQ0FBQyxDQUFDLE1BQU0sV0FBVyxtQkFBbUI7QUFBQSxZQUNwRztBQUFBLFlBQ0E7QUFBQTtBQUFBO0FBSUosWUFBSTtBQUFNLGlCQUFPLFdBQVcsT0FBTyxPQUFLLEVBQUUsU0FBUztBQUNuRCxlQUFPLGVBQWU7QUFBQTtBQUd4Qiw4QkFBd0I7QUFDdEIsWUFBSSxpQkFBaUIsQ0FBQyxRQUFRLFNBQVMsUUFBUTtBQUMvQyxlQUFPLFdBQVcsS0FBSyxDQUFDLEdBQUc7QUFDekIsY0FBSSxRQUFRLGVBQWUsUUFBUSxFQUFFLFVBQVUsS0FBSyxjQUFjLEVBQUU7QUFDcEUsY0FBSSxRQUFRLGVBQWUsUUFBUSxFQUFFLFVBQVUsS0FBSyxjQUFjLEVBQUU7QUFDcEUsaUJBQU8sZUFBZSxRQUFRLFNBQVMsZUFBZSxRQUFRO0FBQUE7QUFBQTtBQUlsRSxrQ0FBNEI7QUFBQSxRQUMxQjtBQUFBLFFBQ0E7QUFBQTtBQUVBLGNBQU0saUJBQWlCLG9DQUFvQztBQUMzRCxjQUFNLFlBQVksZUFBZSxNQUFNO0FBQ3ZDLGNBQU0sYUFBYSxlQUFlLE1BQU07QUFDeEMsY0FBTSxZQUFZLGVBQWUsTUFBTSw0QkFBNEI7QUFDbkUsZUFBTztBQUFBLFVBQ0wsTUFBTSxZQUFZLFVBQVUsS0FBSztBQUFBLFVBQ2pDLE9BQU8sYUFBYSxXQUFXLEtBQUs7QUFBQSxVQUNwQyxXQUFXLFVBQVUsSUFBSSxPQUFLLEVBQUUsUUFBUSxLQUFLO0FBQUEsVUFDN0MsWUFBWTtBQUFBO0FBQUE7QUFHaEIsNkJBQXVCO0FBR3JCLGNBQU0sb0JBQW9CLENBQUMsWUFBWSxXQUFXLFlBQVksWUFBWSxVQUFVLFFBQVEsWUFBWSxhQUFhLGFBQWEsWUFBWSxjQUFjLG1CQUFtQix1QkFBdUIsa0JBQWtCLFlBQVksWUFBWSxRQUFRLFNBQVMsZUFBZSxXQUFXLFNBQVMsWUFBWSxTQUFTLFNBQVM7QUFDbFUsZUFBTyxrQkFBa0IsU0FBUztBQUFBO0FBRXBDLG1EQUE2QztBQUMzQyxZQUFJLEtBQUssV0FBVztBQUNsQixpQkFBTyxLQUFLLFFBQVEsS0FBSztBQUFBLG1CQUNoQixLQUFLLFdBQVc7QUFDekIsaUJBQU8sS0FBSyxRQUFRLEtBQUs7QUFBQTtBQUczQixlQUFPO0FBQUE7QUFFVCx5Q0FBbUMsV0FBVyxXQUFXO0FBQ3ZELGVBQU8sVUFBVSxNQUFNLEtBQUssT0FBTztBQUFBO0FBRXJDLFlBQU0scUJBQXFCO0FBQzNCLFlBQU0sc0JBQXNCO0FBQzVCLFlBQU0sdUJBQXVCO0FBQzdCLDRCQUFzQixJQUFJLE1BQU0sUUFBUSxXQUFXLFlBQVk7QUFFN0QsWUFBSTtBQUFXLGlCQUFPO0FBRXRCLFlBQUksR0FBRyxrQkFBa0IsR0FBRyxlQUFlLFNBQVM7QUFHbEQ7QUFBQTtBQUdGLGNBQU0sUUFBUSxVQUFVLElBQUksV0FBVztBQUN2QyxjQUFNLFdBQVcsVUFBVSxJQUFJLFdBQVcsUUFBUTtBQUVsRCxZQUFJLFlBQVksU0FBUyxVQUFVLFNBQVM7QUFDMUMsY0FBSSxZQUFZLFNBQVM7QUFFekIsY0FBSSxVQUFVLFNBQVMsVUFBVSxDQUFDLFVBQVUsU0FBUztBQUFPLG1CQUFPO0FBQ25FLGdCQUFNLCtCQUErQixVQUFVLFNBQVMsU0FBUyxVQUFVLFNBQVM7QUFFcEYsc0JBQVksK0JBQStCLFVBQVUsT0FBTyxDQUFDLEdBQUcsVUFBVSxRQUFRLFVBQVUsUUFBUSxVQUFVO0FBQzlHLDZCQUFtQixJQUFJLFdBQVcsTUFBTTtBQUFBLG1CQUMvQixNQUFNLEtBQUssVUFBUSxDQUFDLFNBQVMsZUFBZSxhQUFhLFNBQVMsS0FBSztBQUNoRiw4QkFBb0IsSUFBSSxXQUFXLE9BQU8sTUFBTTtBQUFBO0FBR2hEO0FBQUE7QUFBQTtBQUdKLDZCQUF1QixJQUFJLE1BQU0sUUFBUSxXQUFXLFlBQVk7QUFFOUQsWUFBSTtBQUFXLGlCQUFPO0FBRXRCLFlBQUksR0FBRyxrQkFBa0IsR0FBRyxlQUFlLFNBQVM7QUFHbEQ7QUFBQTtBQUdGLGNBQU0sUUFBUSxVQUFVLElBQUksV0FBVztBQUN2QyxjQUFNLFdBQVcsVUFBVSxJQUFJLFdBQVcsUUFBUTtBQUVsRCxZQUFJLFlBQVksU0FBUyxVQUFVLFNBQVM7QUFDMUMsY0FBSSxZQUFZLFNBQVM7QUFDekIsY0FBSSxVQUFVLFNBQVMsU0FBUyxDQUFDLFVBQVUsU0FBUztBQUFRLG1CQUFPO0FBQ25FLGdCQUFNLCtCQUErQixVQUFVLFNBQVMsU0FBUyxVQUFVLFNBQVM7QUFDcEYsc0JBQVksK0JBQStCLFVBQVUsT0FBTyxDQUFDLEdBQUcsVUFBVSxRQUFRLFVBQVUsUUFBUSxVQUFVO0FBQzlHLDhCQUFvQixJQUFJLFdBQVcsOEJBQThCLE1BQU07QUFBQSxtQkFDOUQsTUFBTSxLQUFLLFVBQVEsQ0FBQyxTQUFTLGVBQWUsYUFBYSxTQUFTLEtBQUs7QUFDaEYsK0JBQXFCLElBQUksV0FBVyxPQUFPLE1BQU07QUFBQTtBQUVqRDtBQUFBO0FBQUE7QUFHSixrQ0FBNEIsSUFBSSxXQUFXLGNBQWM7QUFFdkQsY0FBTSxjQUFjO0FBQUEsVUFDbEIsVUFBVSxjQUFjLFdBQVcsWUFBWTtBQUFBLFVBQy9DLFFBQVEsY0FBYyxXQUFXLFVBQVU7QUFBQSxVQUMzQyxPQUFPO0FBQUEsWUFDTCxTQUFTO0FBQUEsWUFDVCxPQUFPLGNBQWMsV0FBVyxTQUFTO0FBQUE7QUFBQSxVQUUzQyxRQUFRO0FBQUEsWUFDTixTQUFTO0FBQUEsWUFDVCxPQUFPO0FBQUE7QUFBQTtBQUdYLHlCQUFpQixJQUFJLFdBQVcsY0FBYztBQUFBLFdBQVUsUUFBUSxhQUFhO0FBQUE7QUFFL0UsbUNBQTZCLElBQUksV0FBVyw4QkFBOEIsY0FBYztBQUl0RixjQUFNLFdBQVcsK0JBQStCLGNBQWMsV0FBVyxZQUFZLE9BQU8sY0FBYyxXQUFXLFlBQVksT0FBTztBQUN4SSxjQUFNLGNBQWM7QUFBQSxVQUNsQjtBQUFBLFVBQ0EsUUFBUSxjQUFjLFdBQVcsVUFBVTtBQUFBLFVBQzNDLE9BQU87QUFBQSxZQUNMLFNBQVM7QUFBQSxZQUNULE9BQU87QUFBQTtBQUFBLFVBRVQsUUFBUTtBQUFBLFlBQ04sU0FBUztBQUFBLFlBQ1QsT0FBTyxjQUFjLFdBQVcsU0FBUztBQUFBO0FBQUE7QUFHN0MseUJBQWlCLElBQUksV0FBVztBQUFBLFdBQVUsY0FBYyxRQUFRLGFBQWE7QUFBQTtBQUcvRSw2QkFBdUIsV0FBVyxLQUFLO0FBRXJDLFlBQUksVUFBVSxRQUFRLFNBQVM7QUFBSSxpQkFBTztBQUUxQyxjQUFNLFdBQVcsVUFBVSxVQUFVLFFBQVEsT0FBTztBQUNwRCxZQUFJLENBQUM7QUFBVSxpQkFBTztBQUV0QixZQUFJLFFBQVE7QUFJVixjQUFJLENBQUMsVUFBVTtBQUFXLG1CQUFPO0FBQUE7QUFHbkMsWUFBSSxRQUFRO0FBRVYsY0FBSSxRQUFRLFNBQVMsTUFBTTtBQUMzQixjQUFJO0FBQU8sbUJBQU8sTUFBTTtBQUFBO0FBRzFCLFlBQUksUUFBUTtBQUVWLGNBQUksQ0FBQyxPQUFPLFNBQVMsUUFBUSxVQUFVLFVBQVUsU0FBUyxVQUFVLFVBQVUsUUFBUSxPQUFPO0FBQzNGLG1CQUFPLENBQUMsVUFBVSxVQUFVLFVBQVUsUUFBUSxPQUFPLElBQUksS0FBSztBQUFBO0FBQUE7QUFJbEUsZUFBTztBQUFBO0FBR1QsZ0NBQTBCLElBQUksV0FBVyxPQUFPLE9BQU8sUUFBUSxhQUFhO0FBRTFFLFlBQUksR0FBRztBQUNMLGFBQUcsZUFBZSxVQUFVLEdBQUcsZUFBZTtBQUFBO0FBSWhELGNBQU0sZUFBZSxHQUFHLE1BQU07QUFDOUIsY0FBTSxpQkFBaUIsR0FBRyxNQUFNO0FBQ2hDLGNBQU0sdUJBQXVCLEdBQUcsTUFBTTtBQUV0QyxjQUFNLGNBQWMsQ0FBQyxVQUFVLFNBQVMsY0FBYyxDQUFDLFVBQVUsU0FBUztBQUMxRSxjQUFNLG9CQUFvQixlQUFlLFVBQVUsU0FBUztBQUM1RCxjQUFNLGtCQUFrQixlQUFlLFVBQVUsU0FBUztBQUkxRCxjQUFNLFNBQVM7QUFBQSxVQUNiO0FBQ0UsZ0JBQUk7QUFBbUIsaUJBQUcsTUFBTSxVQUFVLFlBQVksTUFBTTtBQUM1RCxnQkFBSTtBQUFpQixpQkFBRyxNQUFNLFlBQVksU0FBUyxZQUFZLE1BQU0sUUFBUTtBQUFBO0FBQUEsVUFHL0U7QUFDRSxnQkFBSTtBQUFpQixpQkFBRyxNQUFNLGtCQUFrQixZQUFZO0FBQzVELGVBQUcsTUFBTSxxQkFBcUIsQ0FBQyxvQkFBb0IsWUFBWSxJQUFJLGtCQUFrQixjQUFjLElBQUksS0FBSyxLQUFLO0FBQ2pILGVBQUcsTUFBTSxxQkFBcUIsR0FBRyxZQUFZLFdBQVc7QUFDeEQsZUFBRyxNQUFNLDJCQUEyQjtBQUFBO0FBQUEsVUFHdEM7QUFDRTtBQUFBO0FBQUEsVUFHRjtBQUNFLGdCQUFJO0FBQW1CLGlCQUFHLE1BQU0sVUFBVSxZQUFZLE9BQU87QUFDN0QsZ0JBQUk7QUFBaUIsaUJBQUcsTUFBTSxZQUFZLFNBQVMsWUFBWSxPQUFPLFFBQVE7QUFBQTtBQUFBLFVBR2hGO0FBQ0U7QUFBQTtBQUFBLFVBR0Y7QUFDRSxnQkFBSTtBQUFtQixpQkFBRyxNQUFNLFVBQVU7QUFDMUMsZ0JBQUk7QUFBaUIsaUJBQUcsTUFBTSxZQUFZO0FBQzFDLGdCQUFJO0FBQWlCLGlCQUFHLE1BQU0sa0JBQWtCO0FBQ2hELGVBQUcsTUFBTSxxQkFBcUI7QUFDOUIsZUFBRyxNQUFNLHFCQUFxQjtBQUM5QixlQUFHLE1BQU0sMkJBQTJCO0FBQUE7QUFBQTtBQUl4QyxtQkFBVyxJQUFJLFFBQVEsTUFBTTtBQUFBO0FBRy9CLFlBQU0seUJBQXlCLENBQUMsWUFBWSxJQUFJO0FBQzlDLGVBQU8sT0FBTyxlQUFlLGFBQWEsVUFBVSx5QkFBeUIsSUFBSSxjQUFjO0FBQUE7QUFHakcsbUNBQTZCLElBQUksV0FBVyxZQUFZLGNBQWM7QUFDcEUsY0FBTSxRQUFRLDBCQUEwQix1QkFBd0IsWUFBVyxLQUFLLE9BQUssRUFBRSxVQUFVLFlBQVk7QUFBQSxVQUMzRyxZQUFZO0FBQUEsV0FDWCxZQUFZLElBQUk7QUFDbkIsY0FBTSxhQUFhLDBCQUEwQix1QkFBd0IsWUFBVyxLQUFLLE9BQUssRUFBRSxVQUFVLGtCQUFrQjtBQUFBLFVBQ3RILFlBQVk7QUFBQSxXQUNYLFlBQVksSUFBSTtBQUNuQixjQUFNLFdBQVcsMEJBQTBCLHVCQUF3QixZQUFXLEtBQUssT0FBSyxFQUFFLFVBQVUsZ0JBQWdCO0FBQUEsVUFDbEgsWUFBWTtBQUFBLFdBQ1gsWUFBWSxJQUFJO0FBQ25CLDBCQUFrQixJQUFJLE9BQU8sWUFBWSxVQUFVLGNBQWM7QUFBQSxXQUFVLG9CQUFvQjtBQUFBO0FBRWpHLG9DQUE4QixJQUFJLFdBQVcsWUFBWSxjQUFjO0FBQ3JFLGNBQU0sUUFBUSwwQkFBMEIsdUJBQXdCLFlBQVcsS0FBSyxPQUFLLEVBQUUsVUFBVSxZQUFZO0FBQUEsVUFDM0csWUFBWTtBQUFBLFdBQ1gsWUFBWSxJQUFJO0FBQ25CLGNBQU0sYUFBYSwwQkFBMEIsdUJBQXdCLFlBQVcsS0FBSyxPQUFLLEVBQUUsVUFBVSxrQkFBa0I7QUFBQSxVQUN0SCxZQUFZO0FBQUEsV0FDWCxZQUFZLElBQUk7QUFDbkIsY0FBTSxXQUFXLDBCQUEwQix1QkFBd0IsWUFBVyxLQUFLLE9BQUssRUFBRSxVQUFVLGdCQUFnQjtBQUFBLFVBQ2xILFlBQVk7QUFBQSxXQUNYLFlBQVksSUFBSTtBQUNuQiwwQkFBa0IsSUFBSSxPQUFPLFlBQVksVUFBVTtBQUFBLFdBQVUsY0FBYyxxQkFBcUI7QUFBQTtBQUVsRyxpQ0FBMkIsSUFBSSxlQUFlLGNBQWMsWUFBWSxPQUFPLE9BQU8sTUFBTTtBQUUxRixZQUFJLEdBQUc7QUFDTCxhQUFHLGVBQWUsVUFBVSxHQUFHLGVBQWU7QUFBQTtBQUdoRCxjQUFNLGtCQUFrQixHQUFHLHdCQUF3QjtBQUNuRCxjQUFNLFNBQVM7QUFBQSxVQUNiO0FBQ0UsZUFBRyxVQUFVLElBQUksR0FBRztBQUFBO0FBQUEsVUFHdEI7QUFDRSxlQUFHLFVBQVUsSUFBSSxHQUFHO0FBQUE7QUFBQSxVQUd0QjtBQUNFO0FBQUE7QUFBQSxVQUdGO0FBRUUsZUFBRyxVQUFVLE9BQU8sR0FBRyxhQUFhLE9BQU8sT0FBSyxDQUFDLGdCQUFnQixTQUFTO0FBQzFFLGVBQUcsVUFBVSxJQUFJLEdBQUc7QUFBQTtBQUFBLFVBR3RCO0FBQ0U7QUFBQTtBQUFBLFVBR0Y7QUFDRSxlQUFHLFVBQVUsT0FBTyxHQUFHLGNBQWMsT0FBTyxPQUFLLENBQUMsZ0JBQWdCLFNBQVM7QUFDM0UsZUFBRyxVQUFVLE9BQU8sR0FBRyxXQUFXLE9BQU8sT0FBSyxDQUFDLGdCQUFnQixTQUFTO0FBQUE7QUFBQTtBQUk1RSxtQkFBVyxJQUFJLFFBQVEsTUFBTTtBQUFBO0FBRS9CLDBCQUFvQixJQUFJLFFBQVEsTUFBTTtBQUNwQyxjQUFNLFNBQVMsS0FBSztBQUNsQixpQkFBTztBQUdQLGNBQUksR0FBRztBQUNMLG1CQUFPO0FBQUE7QUFHVCxpQkFBTyxHQUFHO0FBQUE7QUFFWixXQUFHLGlCQUFpQjtBQUFBLFVBRWxCO0FBQUEsVUFJQSxRQUFRLEtBQUs7QUFDWCxtQkFBTztBQUNQO0FBQUE7QUFBQSxVQUVGO0FBQUEsVUFFQSxXQUFXO0FBQUE7QUFFYixlQUFPO0FBQ1AsZUFBTztBQUNQLFdBQUcsZUFBZSxZQUFZLHNCQUFzQjtBQUdsRCxjQUFJLFdBQVcsT0FBTyxpQkFBaUIsSUFBSSxtQkFBbUIsUUFBUSxPQUFPLElBQUksUUFBUSxLQUFLLE9BQU87QUFFckcsY0FBSSxhQUFhO0FBQ2YsdUJBQVcsT0FBTyxpQkFBaUIsSUFBSSxrQkFBa0IsUUFBUSxLQUFLLE9BQU87QUFBQTtBQUcvRSxpQkFBTztBQUNQLGFBQUcsZUFBZSxZQUFZLHNCQUFzQjtBQUNsRCxtQkFBTztBQUNQLHVCQUFXLEdBQUcsZUFBZSxRQUFRO0FBQUE7QUFBQTtBQUFBO0FBSTNDLHlCQUFtQjtBQUNqQixlQUFPLENBQUMsTUFBTSxRQUFRLFlBQVksQ0FBQyxNQUFNO0FBQUE7QUFJM0Msb0JBQWM7QUFDWixZQUFJLFNBQVM7QUFDYixlQUFPO0FBQ0wsY0FBSSxDQUFDO0FBQ0gscUJBQVM7QUFDVCxxQkFBUyxNQUFNLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFLM0Isa0NBQTRCLFdBQVcsWUFBWSxZQUFZLGVBQWU7QUFDNUUsZ0NBQXdCLFlBQVk7QUFDcEMsWUFBSSxnQkFBZ0IsT0FBTyxlQUFlLGFBQWEsbUJBQW1CLFVBQVUseUJBQXlCLFlBQVksZUFBZSxtQkFBbUI7QUFDM0osWUFBSSxRQUFRLDJEQUEyRCxXQUFXLFlBQVksZUFBZTtBQUU3RyxZQUFJLFlBQVk7QUFDaEIsY0FBTSxRQUFRLENBQUMsTUFBTTtBQUNuQixjQUFJLDBCQUEwQiwyQkFBMkIsZUFBZSxNQUFNLE9BQU8sT0FBTztBQUM1RixjQUFJLGFBQWEsd0JBQXdCLFdBQVcsWUFBWSxPQUFPO0FBQ3ZFLGNBQUksU0FBUyxpREFBaUQsVUFBVSxvQkFBb0I7QUFFNUYsY0FBSSxDQUFDO0FBQ0gscUJBQVMsK0JBQStCLFlBQVk7QUFFcEQseUJBQWEsUUFBUTtBQUFBLGVBQVU7QUFBQSxlQUFVLFdBQVc7QUFDcEQsbUJBQU8sVUFBVTtBQUNqQixzQkFBVSxtQkFBbUIsUUFBUSxNQUFNLE9BQU87QUFBQTtBQUdsRCxtQkFBTyxPQUFPO0FBQ2QsbUJBQU8sVUFBVTtBQUNqQixzQkFBVSxlQUFlLFFBQVEsTUFBTSxPQUFPO0FBQUE7QUFHaEQsc0JBQVk7QUFDWixvQkFBVSxjQUFjO0FBQUE7QUFFMUIsb0RBQTRDLFdBQVc7QUFBQTtBQUd6RCxrQ0FBNEI7QUFDMUIsWUFBSSxnQkFBZ0I7QUFDcEIsWUFBSSxnQkFBZ0I7QUFDcEIsWUFBSSxhQUFhO0FBQ2pCLFlBQUksVUFBVSxXQUFXLE1BQU07QUFDL0IsWUFBSSxDQUFDO0FBQVM7QUFDZCxZQUFJLE1BQU07QUFDVixZQUFJLFFBQVEsUUFBUSxHQUFHO0FBQ3ZCLFlBQUksT0FBTyxRQUFRLEdBQUcsT0FBTyxRQUFRLGVBQWU7QUFDcEQsWUFBSSxnQkFBZ0IsS0FBSyxNQUFNO0FBRS9CLFlBQUk7QUFDRixjQUFJLE9BQU8sS0FBSyxRQUFRLGVBQWUsSUFBSTtBQUMzQyxjQUFJLFFBQVEsY0FBYyxHQUFHO0FBRTdCLGNBQUksY0FBYztBQUNoQixnQkFBSSxhQUFhLGNBQWMsR0FBRztBQUFBO0FBQUE7QUFHcEMsY0FBSSxPQUFPO0FBQUE7QUFHYixlQUFPO0FBQUE7QUFHVCwwQ0FBb0MsZUFBZSxNQUFNLE9BQU8sT0FBTztBQUVyRSxZQUFJLGlCQUFpQixZQUFZLGVBQWUsSUFBSSxhQUFhO0FBQ2pFLHVCQUFlLGNBQWMsUUFBUTtBQUNyQyxZQUFJLGNBQWM7QUFBTyx5QkFBZSxjQUFjLFNBQVM7QUFDL0QsWUFBSSxjQUFjO0FBQVkseUJBQWUsY0FBYyxjQUFjO0FBQ3pFLGVBQU87QUFBQTtBQUdULHVDQUFpQyxXQUFXLElBQUksT0FBTztBQUNyRCxZQUFJLG1CQUFtQixVQUFVLElBQUksV0FBVyxRQUFRLE9BQU8sVUFBUSxLQUFLLFVBQVUsT0FBTztBQUU3RixZQUFJLENBQUM7QUFBa0IsaUJBQU87QUFDOUIsZUFBTyxVQUFVLHlCQUF5QixJQUFJLGlCQUFpQixZQUFZLE1BQU07QUFBQTtBQUduRiwwRUFBb0UsV0FBVyxJQUFJLGVBQWU7QUFDaEcsWUFBSSxjQUFjLFVBQVUsSUFBSSxXQUFXLE1BQU07QUFFakQsWUFBSSxlQUFlLENBQUMsVUFBVSx5QkFBeUIsSUFBSSxZQUFZO0FBQ3JFLGlCQUFPO0FBQUE7QUFHVCxZQUFJLFFBQVEsVUFBVSx5QkFBeUIsSUFBSSxjQUFjLE9BQU87QUFFeEUsWUFBSSxVQUFVLFVBQVUsUUFBUTtBQUM5QixrQkFBUSxNQUFNLEtBQUssTUFBTSxPQUFPLFFBQVEsT0FBSyxJQUFJO0FBQUE7QUFHbkQsZUFBTztBQUFBO0FBR1QsOENBQXdDLFlBQVk7QUFDbEQsWUFBSSxRQUFRLFNBQVMsV0FBVyxXQUFXLFNBQVM7QUFDcEQsa0JBQVUsY0FBYyxhQUFhLE9BQU8sVUFBVTtBQUN0RCxlQUFPLFVBQVU7QUFBQTtBQUduQixnRUFBMEQsUUFBUTtBQUNoRSxZQUFJLENBQUM7QUFBUTtBQUViLFlBQUksT0FBTyxnQkFBZ0I7QUFBVztBQUV0QyxZQUFJLE9BQU8sZ0JBQWdCO0FBQVksaUJBQU87QUFHOUMsWUFBSSxZQUFZO0FBRWhCLGVBQU87QUFDTCxjQUFJLFVBQVUsZ0JBQWdCO0FBQzVCLG1CQUFPLFVBQVUsY0FBYyxhQUFhLFdBQVc7QUFBQTtBQUd6RCxzQkFBWSxVQUFVLHNCQUFzQixVQUFVLG1CQUFtQixnQkFBZ0IsU0FBWSxVQUFVLHFCQUFxQjtBQUFBO0FBQUE7QUFJeEksMkRBQXFELFdBQVc7QUFDOUQsWUFBSSx5QkFBeUIsVUFBVSxzQkFBc0IsVUFBVSxtQkFBbUIsZ0JBQWdCLFNBQVksVUFBVSxxQkFBcUI7QUFFckosZUFBTztBQUNMLGNBQUksa0NBQWtDO0FBQ3RDLGNBQUksY0FBYyx1QkFBdUI7QUFDekMsd0JBQWMsd0JBQXdCO0FBQ3BDLDRDQUFnQztBQUFBLGFBQy9CO0FBQUEsYUFBVTtBQUNiLG1DQUF5QixlQUFlLFlBQVksZ0JBQWdCLFNBQVksY0FBYztBQUFBO0FBQUE7QUFJbEcsK0NBQXlDLFdBQVcsSUFBSSxVQUFVLFlBQVksV0FBVyxVQUFVO0FBQ2pHLFlBQUksUUFBUSxVQUFVLHlCQUF5QixJQUFJLFlBQVk7QUFFL0QsWUFBSSxhQUFhO0FBQ2YsY0FBSSxPQUFPLGdDQUFnQyxTQUFTLGNBQWMsV0FBVztBQUFLO0FBRWxGLGNBQUksVUFBVSxVQUFhLFdBQVcsTUFBTTtBQUMxQyxvQkFBUTtBQUFBO0FBR1YsY0FBSSxHQUFHLFNBQVM7QUFJZCxnQkFBSSxHQUFHLFdBQVcsVUFBVSxVQUFhLGFBQWE7QUFDcEQsaUJBQUcsUUFBUTtBQUFBLHVCQUNGLGFBQWE7QUFDdEIsaUJBQUcsVUFBVSx3QkFBd0IsR0FBRyxPQUFPO0FBQUE7QUFBQSxxQkFFeEMsR0FBRyxTQUFTO0FBSXJCLGdCQUFJLE9BQU8sVUFBVSxhQUFhLENBQUMsQ0FBQyxNQUFNLFFBQVcsU0FBUyxVQUFVLGFBQWE7QUFDbkYsaUJBQUcsUUFBUSxPQUFPO0FBQUEsdUJBQ1QsYUFBYTtBQUN0QixrQkFBSSxNQUFNLFFBQVE7QUFJaEIsbUJBQUcsVUFBVSxNQUFNLEtBQUssU0FBTyx3QkFBd0IsS0FBSyxHQUFHO0FBQUE7QUFFL0QsbUJBQUcsVUFBVSxDQUFDLENBQUM7QUFBQTtBQUFBO0FBQUEscUJBR1YsR0FBRyxZQUFZO0FBQ3hCLHlCQUFhLElBQUk7QUFBQTtBQUVqQixnQkFBSSxHQUFHLFVBQVU7QUFBTztBQUN4QixlQUFHLFFBQVE7QUFBQTtBQUFBLG1CQUVKLGFBQWE7QUFDdEIsY0FBSSxNQUFNLFFBQVE7QUFDaEIsa0JBQU0sa0JBQWtCLEdBQUcsd0JBQXdCO0FBQ25ELGVBQUcsYUFBYSxTQUFTLFlBQVksZ0JBQWdCLE9BQU8sUUFBUSxLQUFLO0FBQUEscUJBQ2hFLE9BQU8sVUFBVTtBQUcxQixrQkFBTSwyQkFBMkIsT0FBTyxLQUFLLE9BQU8sS0FBSyxDQUFDLEdBQUcsTUFBTSxNQUFNLEtBQUssTUFBTTtBQUNwRixxQ0FBeUIsUUFBUTtBQUMvQixrQkFBSSxNQUFNO0FBQ1IsMENBQTBCLFlBQVksUUFBUSxlQUFhLEdBQUcsVUFBVSxJQUFJO0FBQUE7QUFFNUUsMENBQTBCLFlBQVksUUFBUSxlQUFhLEdBQUcsVUFBVSxPQUFPO0FBQUE7QUFBQTtBQUFBO0FBSW5GLGtCQUFNLGtCQUFrQixHQUFHLHdCQUF3QjtBQUNuRCxrQkFBTSxhQUFhLFFBQVEsMEJBQTBCLFNBQVM7QUFDOUQsZUFBRyxhQUFhLFNBQVMsWUFBWSxnQkFBZ0IsT0FBTyxhQUFhLEtBQUs7QUFBQTtBQUFBO0FBR2hGLHFCQUFXLFVBQVUsU0FBUyxXQUFXLFVBQVUsWUFBWTtBQUUvRCxjQUFJLENBQUMsTUFBTSxRQUFXLE9BQU8sU0FBUztBQUNwQyxlQUFHLGdCQUFnQjtBQUFBO0FBRW5CLDBCQUFjLFlBQVksYUFBYSxJQUFJLFVBQVUsWUFBWSxhQUFhLElBQUksVUFBVTtBQUFBO0FBQUE7QUFBQTtBQUtsRyw0QkFBc0IsSUFBSSxVQUFVO0FBQ2xDLFlBQUksR0FBRyxhQUFhLGFBQWE7QUFDL0IsYUFBRyxhQUFhLFVBQVU7QUFBQTtBQUFBO0FBSTlCLDRCQUFzQixJQUFJO0FBQ3hCLGNBQU0sb0JBQW9CLEdBQUcsT0FBTyxPQUFPLElBQUk7QUFDN0MsaUJBQU8sU0FBUTtBQUFBO0FBRWpCLGNBQU0sS0FBSyxHQUFHLFNBQVMsUUFBUTtBQUM3QixpQkFBTyxXQUFXLGtCQUFrQixTQUFTLE9BQU8sU0FBUyxPQUFPO0FBQUE7QUFBQTtBQUl4RSxtQ0FBNkIsSUFBSSxRQUFRO0FBRXZDLFlBQUksV0FBVyxVQUFhLFdBQVcsTUFBTTtBQUMzQyxtQkFBUztBQUFBO0FBR1gsV0FBRyxjQUFjO0FBQUE7QUFHbkIsbUNBQTZCLFdBQVcsSUFBSSxZQUFZO0FBQ3RELFdBQUcsWUFBWSxVQUFVLHlCQUF5QixJQUFJLFlBQVk7QUFBQTtBQUdwRSxtQ0FBNkIsV0FBVyxJQUFJLE9BQU8sV0FBVyxnQkFBZ0I7QUFDNUUsY0FBTSxPQUFPO0FBQ1gsYUFBRyxNQUFNLFVBQVU7QUFDbkIsYUFBRyxlQUFlO0FBQUE7QUFHcEIsY0FBTSxPQUFPO0FBQ1gsY0FBSSxHQUFHLE1BQU0sV0FBVyxLQUFLLEdBQUcsTUFBTSxZQUFZO0FBQ2hELGVBQUcsZ0JBQWdCO0FBQUE7QUFFbkIsZUFBRyxNQUFNLGVBQWU7QUFBQTtBQUcxQixhQUFHLGVBQWU7QUFBQTtBQUdwQixZQUFJLGtCQUFrQjtBQUNwQixjQUFJO0FBQ0Y7QUFBQTtBQUVBO0FBQUE7QUFHRjtBQUFBO0FBR0YsY0FBTSxTQUFTLENBQUMsU0FBUztBQUN2QixjQUFJO0FBQ0YsZ0JBQUksR0FBRyxNQUFNLFlBQVksVUFBVSxHQUFHO0FBQ3BDLDJCQUFhLElBQUk7QUFDZjtBQUFBLGlCQUNDLFFBQVE7QUFBQTtBQUdiLG9CQUFRO0FBQUE7QUFBQTtBQUVSLGdCQUFJLEdBQUcsTUFBTSxZQUFZO0FBQ3ZCLDRCQUFjLElBQUk7QUFDaEIsd0JBQVE7QUFDTjtBQUFBO0FBQUEsaUJBRUQsUUFBUTtBQUFBO0FBRVgsc0JBQVE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNkLFlBQUksVUFBVSxTQUFTO0FBQ3JCLGlCQUFPLFlBQVUsVUFBVTtBQUFBO0FBQzNCO0FBQUE7QUFNRixZQUFJLFVBQVUsNEJBQTRCLENBQUMsVUFBVSx5QkFBeUIsU0FBUztBQUNyRixvQkFBVTtBQUFBO0FBR1osa0JBQVUsbUJBQW1CLEtBQUs7QUFDbEMsa0JBQVUsMkJBQTJCO0FBQUE7QUFHdkMsaUNBQTJCLFdBQVcsSUFBSSxrQkFBa0IsZUFBZTtBQUN6RSxnQ0FBd0IsSUFBSTtBQUM1QixjQUFNLDZCQUE2QixHQUFHLHNCQUFzQixHQUFHLG1CQUFtQixvQkFBb0I7QUFFdEcsWUFBSSxvQkFBcUIsRUFBQyw4QkFBOEIsR0FBRztBQUN6RCxnQkFBTSxRQUFRLFNBQVMsV0FBVyxHQUFHLFNBQVM7QUFDOUMsYUFBRyxjQUFjLGFBQWEsT0FBTyxHQUFHO0FBQ3hDLHVCQUFhLEdBQUcsb0JBQW9CO0FBQUEsYUFBVTtBQUFBLGFBQVUsV0FBVztBQUNuRSxvQkFBVSxtQkFBbUIsR0FBRyxvQkFBb0I7QUFDcEQsYUFBRyxtQkFBbUIsa0JBQWtCO0FBQUEsbUJBQy9CLENBQUMsb0JBQW9CO0FBQzlCLHdCQUFjLEdBQUcsb0JBQW9CO0FBQ25DLGVBQUcsbUJBQW1CO0FBQUEsYUFDckI7QUFBQSxhQUFVLFdBQVc7QUFBQTtBQUFBO0FBSTVCLGdDQUEwQixXQUFXLElBQUksT0FBTyxXQUFXLFlBQVksWUFBWTtBQUNqRixjQUFNLFVBQVU7QUFBQSxVQUNkLFNBQVMsVUFBVSxTQUFTO0FBQUE7QUFHOUIsWUFBSSxVQUFVLFNBQVM7QUFDckIsa0JBQVEsVUFBVTtBQUFBO0FBR3BCLFlBQUksVUFBVSxTQUFTO0FBQ3JCLGNBQUksVUFBVTtBQUVaLGdCQUFJLEdBQUcsU0FBUyxFQUFFO0FBQVM7QUFFM0IsZ0JBQUksR0FBRyxjQUFjLEtBQUssR0FBRyxlQUFlO0FBQUc7QUFHL0MsK0JBQW1CLFdBQVcsWUFBWSxHQUFHO0FBRTdDLGdCQUFJLFVBQVUsU0FBUztBQUNyQix1QkFBUyxvQkFBb0IsT0FBTyxTQUFTO0FBQUE7QUFBQTtBQUtqRCxtQkFBUyxpQkFBaUIsT0FBTyxTQUFTO0FBQUE7QUFFMUMsY0FBSSxpQkFBaUIsVUFBVSxTQUFTLFlBQVksU0FBUyxVQUFVLFNBQVMsY0FBYyxXQUFXO0FBRXpHLGNBQUksVUFBVTtBQUdaLGdCQUFJLG1CQUFtQixVQUFVLG1CQUFtQjtBQUNsRCxrQkFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTO0FBQzFCLCtCQUFlLG9CQUFvQixPQUFPLFNBQVM7QUFDbkQ7QUFBQTtBQUFBO0FBSUosZ0JBQUksV0FBVztBQUNiLGtCQUFJLCtDQUErQyxHQUFHO0FBQ3BEO0FBQUE7QUFBQTtBQUlKLGdCQUFJLFVBQVUsU0FBUztBQUFZLGdCQUFFO0FBQ3JDLGdCQUFJLFVBQVUsU0FBUztBQUFTLGdCQUFFO0FBSWxDLGdCQUFJLENBQUMsVUFBVSxTQUFTLFdBQVcsRUFBRSxXQUFXO0FBQzlDLG9CQUFNLGNBQWMsbUJBQW1CLFdBQVcsWUFBWSxHQUFHO0FBQ2pFLDBCQUFZLEtBQUs7QUFDZixvQkFBSSxVQUFVO0FBQ1osb0JBQUU7QUFBQTtBQUVGLHNCQUFJLFVBQVUsU0FBUztBQUNyQixtQ0FBZSxvQkFBb0IsT0FBTyxTQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU83RCxjQUFJLFVBQVUsU0FBUztBQUNyQixnQkFBSSxlQUFlLFVBQVUsVUFBVSxRQUFRLGNBQWMsTUFBTTtBQUNuRSxnQkFBSSxPQUFPLFVBQVUsYUFBYSxNQUFNLE1BQU0sTUFBTSxPQUFPLGFBQWEsTUFBTSxNQUFNLE1BQU07QUFDMUYsc0JBQVUsU0FBUyxTQUFTO0FBQUE7QUFHOUIseUJBQWUsaUJBQWlCLE9BQU8sU0FBUztBQUFBO0FBQUE7QUFJcEQsa0NBQTRCLFdBQVcsWUFBWSxHQUFHO0FBQ3BELGVBQU8sVUFBVSwwQkFBMEIsRUFBRSxRQUFRLFlBQVk7QUFDL0QsaUJBQU8sZUFBZSxlQUFlLElBQUksY0FBYyxJQUFJO0FBQUEsWUFDekQsUUFBVTtBQUFBO0FBQUE7QUFBQTtBQUtoQiwwQkFBb0I7QUFDbEIsZUFBTyxDQUFDLFdBQVcsU0FBUyxTQUFTO0FBQUE7QUFHdkMsOERBQXdELEdBQUc7QUFDekQsWUFBSSxlQUFlLFVBQVUsT0FBTztBQUNsQyxpQkFBTyxDQUFDLENBQUMsVUFBVSxZQUFZLFdBQVcsUUFBUSxTQUFTO0FBQUE7QUFHN0QsWUFBSSxhQUFhLFNBQVM7QUFDeEIsY0FBSSxnQkFBZ0IsYUFBYSxRQUFRO0FBQ3pDLHVCQUFhLE9BQU8sZUFBZSxVQUFXLGNBQWEsZ0JBQWdCLE1BQU0sZ0JBQWdCLE1BQU0sTUFBTSxNQUFNLElBQUk7QUFBQTtBQUl6SCxZQUFJLGFBQWEsV0FBVztBQUFHLGlCQUFPO0FBRXRDLFlBQUksYUFBYSxXQUFXLEtBQUssYUFBYSxPQUFPLGNBQWMsRUFBRTtBQUFNLGlCQUFPO0FBRWxGLGNBQU0scUJBQXFCLENBQUMsUUFBUSxTQUFTLE9BQU8sUUFBUSxPQUFPO0FBQ25FLGNBQU0sNkJBQTZCLG1CQUFtQixPQUFPLGNBQVksYUFBYSxTQUFTO0FBQy9GLHVCQUFlLGFBQWEsT0FBTyxPQUFLLENBQUMsMkJBQTJCLFNBQVM7QUFFN0UsWUFBSSwyQkFBMkIsU0FBUztBQUN0QyxnQkFBTSw4QkFBOEIsMkJBQTJCLE9BQU87QUFFcEUsZ0JBQUksYUFBYSxTQUFTLGFBQWE7QUFBUyx5QkFBVztBQUMzRCxtQkFBTyxFQUFFLEdBQUc7QUFBQTtBQUdkLGNBQUksNEJBQTRCLFdBQVcsMkJBQTJCO0FBRXBFLGdCQUFJLGFBQWEsT0FBTyxjQUFjLEVBQUU7QUFBTSxxQkFBTztBQUFBO0FBQUE7QUFLekQsZUFBTztBQUFBO0FBR1QsNkJBQXVCO0FBQ3JCLGdCQUFRO0FBQUEsZUFDRDtBQUNILG1CQUFPO0FBQUEsZUFFSjtBQUFBLGVBQ0E7QUFDSCxtQkFBTztBQUFBO0FBR1AsbUJBQU8sT0FBTyxVQUFVO0FBQUE7QUFBQTtBQUk5QixxQ0FBK0IsV0FBVyxJQUFJLFdBQVcsWUFBWTtBQUduRSxZQUFJLFFBQVEsR0FBRyxRQUFRLGtCQUFrQixZQUFZLENBQUMsWUFBWSxTQUFTLFNBQVMsR0FBRyxTQUFTLFVBQVUsU0FBUyxVQUFVLFdBQVc7QUFDeEksY0FBTSxxQkFBcUIsR0FBRyw4Q0FBOEM7QUFDNUUseUJBQWlCLFdBQVcsSUFBSSxPQUFPLFdBQVcsb0JBQW9CO0FBQ3BFLGlCQUFPLGVBQWUsZUFBZSxJQUFJLGNBQWMsSUFBSTtBQUFBLFlBQ3pELHVCQUF1QixnQ0FBZ0MsSUFBSSxXQUFXO0FBQUE7QUFBQTtBQUFBO0FBSzVFLCtDQUF5QyxJQUFJLFdBQVc7QUFDdEQsWUFBSSxHQUFHLFNBQVM7QUFJZCxjQUFJLENBQUMsR0FBRyxhQUFhO0FBQVMsZUFBRyxhQUFhLFFBQVE7QUFBQTtBQUd4RCxlQUFPLENBQUMsT0FBTztBQUViLGNBQUksaUJBQWlCLGVBQWUsTUFBTTtBQUN4QyxtQkFBTyxNQUFNO0FBQUEscUJBQ0osR0FBRyxTQUFTO0FBRXJCLGdCQUFJLE1BQU0sUUFBUTtBQUNoQixvQkFBTSxXQUFXLFVBQVUsU0FBUyxZQUFZLGdCQUFnQixNQUFNLE9BQU8sU0FBUyxNQUFNLE9BQU87QUFDbkcscUJBQU8sTUFBTSxPQUFPLFVBQVUsYUFBYSxPQUFPLENBQUMsYUFBYSxhQUFhLE9BQU8sU0FBTSxDQUFDLHdCQUF3QixLQUFJO0FBQUE7QUFFdkgscUJBQU8sTUFBTSxPQUFPO0FBQUE7QUFBQSxxQkFFYixHQUFHLFFBQVEsa0JBQWtCLFlBQVksR0FBRztBQUNyRCxtQkFBTyxVQUFVLFNBQVMsWUFBWSxNQUFNLEtBQUssTUFBTSxPQUFPLGlCQUFpQixJQUFJO0FBQ2pGLG9CQUFNLFdBQVcsT0FBTyxTQUFTLE9BQU87QUFDeEMscUJBQU8sZ0JBQWdCO0FBQUEsaUJBQ3BCLE1BQU0sS0FBSyxNQUFNLE9BQU8saUJBQWlCLElBQUk7QUFDaEQscUJBQU8sT0FBTyxTQUFTLE9BQU87QUFBQTtBQUFBO0FBR2hDLGtCQUFNLFdBQVcsTUFBTSxPQUFPO0FBQzlCLG1CQUFPLFVBQVUsU0FBUyxZQUFZLGdCQUFnQixZQUFZLFVBQVUsU0FBUyxVQUFVLFNBQVMsU0FBUztBQUFBO0FBQUE7QUFBQTtBQUt2SCwrQkFBeUI7QUFDdkIsY0FBTSxTQUFTLFdBQVcsV0FBVyxZQUFZO0FBQ2pELGVBQU8sVUFBVSxVQUFVLFNBQVM7QUFBQTtBQU10QyxZQUFNLENBQUUsV0FBWTtBQUNwQixZQUFNLENBQUUsZ0JBQWdCLFFBQVEsY0FBYyxnQkFBZ0Isc0JBQXNCLGtCQUFrQix3QkFBd0IsY0FBYywwQkFBMEIscUJBQXFCLHVCQUF1QixtQkFBbUIsa0JBQW9CO0FBQ3pQLFlBQU0sQ0FBRSxNQUFNLFdBQVcsUUFBUSxhQUFhLEtBQUssWUFBYyxNQUFNO0FBQ3ZFLDJCQUFxQjtBQUNqQixlQUFPLFFBQVE7QUFBQTtBQUVuQiwwQkFBb0I7QUFDaEIsZUFBTyxPQUFPLFFBQVE7QUFBQTtBQUUxQix3QkFBa0I7QUFDZCxlQUFPLE9BQU8sUUFBUTtBQUFBO0FBRTFCLFlBQU0sa0JBQWtCLElBQUk7QUFDNUIsNkJBQXVCLE9BQU87QUFDMUIsd0JBQWdCLElBQUksT0FBTztBQUFBO0FBRS9CLFlBQU0sU0FBUyxDQUFDLGlCQUFpQixnQkFBZ0IsSUFBSSxpQkFBaUI7QUFFdEUseUJBQW1CLFVBQVU7QUFDekIsZUFBTyxTQUFTLGtCQUFrQixTQUFTLFNBQVMsU0FBUyxTQUFTO0FBQUE7QUFPMUUsZ0NBQTBCO0FBQ3RCLFlBQUksZUFBZSxLQUFLLFlBQVk7QUFDaEMscUJBQVcsUUFBUSxPQUFPLFdBQVc7QUFBQTtBQUV6QyxlQUFPO0FBQUE7QUFFWCxnQ0FBMEIsVUFBVSxjQUFjO0FBQzlDLGNBQU0sYUFBYSxZQUFZLEtBQUssb0JBQW9CLGlCQUFpQixzQkFBc0I7QUFDL0YsbUJBQVcsUUFBUSxDQUFDO0FBQ2hCLGNBQUksYUFBYSx5QkFBeUIsZ0JBQWdCO0FBTTFELGNBQUksQ0FBQyxXQUFXO0FBQ1oseUJBQWEsZUFBZSxVQUFVLFlBQVk7QUFBQTtBQUV0RCwrQkFBcUIsY0FBYyxLQUFLO0FBQUE7QUFFNUMsMEJBQWtCO0FBQUE7QUFoa0N4QjtBQUFBLFFBbWtDTSxZQUFZLFVBQVU7QUFDbEIsZUFBSyxpQkFBaUI7QUFDdEIsZUFBSyxXQUFXO0FBQUE7QUFBQSxRQUVwQixJQUFJLGNBQWM7QUFDZCxnQkFBTSxDQUFFLGdCQUFnQixZQUFhO0FBQ3JDLGdCQUFNLFFBQVEsZUFBZTtBQUM3QixnQkFBTSxDQUFFLGlCQUFrQjtBQUMxQix3QkFBYyxnQkFBZ0I7QUFDOUIsaUJBQU8sU0FBUyxTQUFTO0FBQUE7QUFBQSxRQUU3QixJQUFJLGNBQWMsS0FBSztBQUNuQixnQkFBTSxDQUFFLGdCQUFnQixVQUFVLENBQUUsaUJBQW1CO0FBQ3ZELGdCQUFNLFdBQVcsZUFBZTtBQUNoQyxjQUFJLGFBQWE7QUFDYiwyQkFBZSxPQUFPO0FBQ3RCLHlCQUFhLGdCQUFnQjtBQUFBLHFCQUV4QixRQUFRLFlBQVksUUFBUTtBQUtqQyx5QkFBYSxnQkFBZ0I7QUFBQTtBQUVqQyxpQkFBTztBQUFBO0FBQUEsUUFFWCxlQUFlLGNBQWM7QUFDekIsZ0JBQU0sQ0FBRSxnQkFBZ0IsVUFBVSxDQUFFLGlCQUFtQjtBQUN2RCxpQkFBTyxlQUFlO0FBQ3RCLHVCQUFhLGdCQUFnQjtBQUM3QixpQkFBTztBQUFBO0FBQUEsUUFFWCxNQUFNLGNBQWMsU0FBUztBQUFBO0FBQUEsUUFHN0IsVUFBVSxRQUFRLFVBQVU7QUFBQTtBQUFBLFFBRzVCLElBQUksY0FBYztBQUNkLGdCQUFNLENBQUUsZ0JBQWdCLFVBQVUsQ0FBRSxrQkFBb0I7QUFDeEQsd0JBQWMsZ0JBQWdCO0FBQzlCLGlCQUFPLE9BQU87QUFBQTtBQUFBLFFBRWxCLFFBQVE7QUFDSixnQkFBTSxDQUFFLGtCQUFtQjtBQUMzQixpQkFBTyxZQUFZLEtBQUssb0JBQW9CLGlCQUFpQixzQkFBc0I7QUFBQTtBQUFBLFFBRXZGLGFBQWE7QUFDVCxnQkFBTSxxQkFBcUIsYUFBYTtBQUN4QyxjQUFJLENBQUM7QUFDRCxtQkFBTztBQUFBO0FBRVgsZ0JBQU0sQ0FBRSxnQkFBZ0IsWUFBYTtBQUNyQyxnQkFBTSxxQkFBcUIsYUFBYTtBQUN4QyxjQUFJLENBQUM7QUFDRCw2QkFBaUIsVUFBVSxjQUFjO0FBQUE7QUFFN0MsaUJBQU87QUFBQTtBQUFBLFFBRVgsZUFBZSxjQUFjO0FBQUE7QUFBQSxRQUU3QixlQUFlO0FBQ1gsZ0JBQU0sQ0FBRSxrQkFBbUI7QUFDM0IsaUJBQU8sZUFBZTtBQUFBO0FBQUEsUUFFMUIseUJBQXlCLGNBQWM7QUFDbkMsZ0JBQU0sQ0FBRSxnQkFBZ0IsWUFBYTtBQUNyQyxnQkFBTSxDQUFFLGlCQUFrQixLQUFLO0FBRS9CLHdCQUFjLGdCQUFnQjtBQUM5QixjQUFJLE9BQU8seUJBQXlCLGdCQUFnQjtBQUNwRCxjQUFJLFlBQVk7QUFDWixtQkFBTztBQUFBO0FBRVgsZ0JBQU0sbUJBQW1CLHlCQUF5QixjQUFjO0FBQ2hFLGNBQUksQ0FBQyxZQUFZO0FBQ2IsbUJBQU87QUFBQTtBQUtYLGlCQUFPLGVBQWUsVUFBVSxNQUFNO0FBQ3RDLGNBQUksQ0FBQyxLQUFLO0FBTU4saUNBQXFCLGNBQWMsS0FBSztBQUFBO0FBRTVDLGlCQUFPO0FBQUE7QUFBQSxRQUVYLGtCQUFrQjtBQUNkLGdCQUFNLENBQUUsZ0JBQWdCLFlBQWE7QUFDckMsMkJBQWlCLFVBQVUsY0FBYztBQUN6Qyw0QkFBa0I7QUFDbEIsaUJBQU87QUFBQTtBQUFBLFFBRVgsZUFBZSxjQUFjLEtBQUs7QUFDOUIsZ0JBQU0sQ0FBRSxnQkFBZ0IsWUFBYTtBQUNyQyxnQkFBTSxDQUFFLGdCQUFpQjtBQUN6QixnQkFBTSxDQUFFLGdCQUFpQjtBQVF6QixjQUFJLGVBQWUsS0FBSyxZQUFZLGVBQWUsQ0FBQyxlQUFlLEtBQUssWUFBWTtBQUNoRixrQkFBTSxxQkFBcUIseUJBQXlCLGdCQUFnQjtBQUNwRSx1QkFBVyxRQUFRLG1CQUFtQjtBQUFBO0FBRTFDLCtCQUFxQixnQkFBZ0IsS0FBSyxpQkFBaUI7QUFDM0QsY0FBSSxpQkFBaUI7QUFDakIsaUNBQXFCLGNBQWMsS0FBSyxlQUFlLFVBQVUsWUFBWTtBQUFBO0FBRWpGLHVCQUFhLGdCQUFnQjtBQUM3QixpQkFBTztBQUFBO0FBQUE7QUFJZixpQ0FBMkIsVUFBVTtBQUNqQyxlQUFPLFNBQVMsa0JBQWtCLFNBQVMsU0FBUyxpQkFBaUIsU0FBUztBQUFBO0FBL3JDcEY7QUFBQSxRQWtzQ00sWUFBWSxVQUFVO0FBQ2xCLGVBQUssaUJBQWlCO0FBQ3RCLGVBQUssV0FBVztBQUFBO0FBQUEsUUFFcEIsSUFBSSxjQUFjO0FBQ2QsZ0JBQU0sQ0FBRSxVQUFVLGtCQUFtQjtBQUNyQyxnQkFBTSxRQUFRLGVBQWU7QUFDN0IsZ0JBQU0sQ0FBRSxpQkFBa0I7QUFDMUIsd0JBQWMsZ0JBQWdCO0FBQzlCLGlCQUFPLFNBQVMsaUJBQWlCO0FBQUE7QUFBQSxRQUVyQyxJQUFJLGNBQWMsS0FBSztBQUNuQixpQkFBTztBQUFBO0FBQUEsUUFFWCxlQUFlLGNBQWM7QUFDekIsaUJBQU87QUFBQTtBQUFBLFFBRVgsTUFBTSxjQUFjLFNBQVM7QUFBQTtBQUFBLFFBRzdCLFVBQVUsUUFBUSxVQUFVO0FBQUE7QUFBQSxRQUc1QixJQUFJLGNBQWM7QUFDZCxnQkFBTSxDQUFFLGdCQUFnQixVQUFVLENBQUUsa0JBQW9CO0FBQ3hELHdCQUFjLGdCQUFnQjtBQUM5QixpQkFBTyxPQUFPO0FBQUE7QUFBQSxRQUVsQixRQUFRO0FBQ0osZ0JBQU0sQ0FBRSxrQkFBbUI7QUFDM0IsaUJBQU8sWUFBWSxLQUFLLG9CQUFvQixpQkFBaUIsc0JBQXNCO0FBQUE7QUFBQSxRQUV2RixlQUFlLGNBQWM7QUFBQTtBQUFBLFFBRTdCLHlCQUF5QixjQUFjO0FBQ25DLGdCQUFNLENBQUUsZ0JBQWdCLFlBQWE7QUFDckMsZ0JBQU0sQ0FBRSxpQkFBa0I7QUFFMUIsd0JBQWMsZ0JBQWdCO0FBQzlCLGNBQUksT0FBTyx5QkFBeUIsZ0JBQWdCO0FBQ3BELGNBQUksWUFBWTtBQUNaLG1CQUFPO0FBQUE7QUFFWCxnQkFBTSxtQkFBbUIseUJBQXlCLGNBQWM7QUFDaEUsY0FBSSxDQUFDLFlBQVk7QUFDYixtQkFBTztBQUFBO0FBS1gsaUJBQU8sZUFBZSxVQUFVLE1BQU07QUFDdEMsY0FBSSxlQUFlLEtBQUssTUFBTTtBQUMxQixpQkFBSyxNQUFNO0FBQUE7QUFFZixjQUFJLENBQUMsS0FBSztBQU1OLGlDQUFxQixjQUFjLEtBQUs7QUFBQTtBQUU1QyxpQkFBTztBQUFBO0FBQUEsUUFFWCxrQkFBa0I7QUFDZCxpQkFBTztBQUFBO0FBQUEsUUFFWCxlQUFlLGNBQWMsS0FBSztBQUM5QixpQkFBTztBQUFBO0FBQUE7QUFHZixrQ0FBNEI7QUFDeEIsWUFBSSxlQUFlO0FBQ25CLFlBQUksUUFBUTtBQUNSLHlCQUFlO0FBQUEsbUJBRVYsU0FBUztBQUNkLHlCQUFlO0FBQUE7QUFFbkIsZUFBTztBQUFBO0FBRVgsWUFBTSxxQkFBcUIsT0FBTztBQUNsQyx3Q0FBa0M7QUFFOUIsWUFBSSxVQUFVO0FBQ1YsaUJBQU87QUFBQTtBQUdYLFlBQUksT0FBTyxVQUFVO0FBQ2pCLGlCQUFPO0FBQUE7QUFFWCxZQUFJLFFBQVE7QUFDUixpQkFBTztBQUFBO0FBRVgsY0FBTSxRQUFRLGVBQWU7QUFDN0IsZUFBUSxVQUFVLHNCQUFzQixVQUFVLFFBQVEsZUFBZSxXQUFXO0FBQUE7QUFFeEYsWUFBTSx1QkFBdUIsQ0FBQyxLQUFLO0FBQUE7QUFHbkMsWUFBTSxzQkFBc0IsQ0FBQyxLQUFLO0FBQUE7QUFHbEMsWUFBTSx5QkFBeUIsQ0FBQyxVQUFVO0FBQzFDLDhCQUF3QixVQUFVLFlBQVk7QUFDMUMsY0FBTSxDQUFFLEtBQUssT0FBUTtBQUNyQixZQUFJLGVBQWUsS0FBSyxZQUFZO0FBQ2hDLHFCQUFXLFFBQVEsU0FBUyxVQUFVLFdBQVc7QUFBQTtBQUdqRCxjQUFJLENBQUMsWUFBWTtBQUNiLHVCQUFXLE1BQU07QUFFYixxQkFBTyxTQUFTLFVBQVUsSUFBSSxLQUFLLE9BQU87QUFBQTtBQUFBO0FBR2xELGNBQUksQ0FBQyxZQUFZO0FBQ2IsdUJBQVcsTUFBTSxTQUFVO0FBTXZCLGtCQUFJLEtBQUssT0FBTyxPQUFPLFNBQVMsWUFBWTtBQUFBO0FBQUE7QUFBQTtBQUl4RCxlQUFPO0FBQUE7QUFqMENiO0FBQUEsUUFvMENNLFlBQVk7QUFDUixlQUFLLGtCQUFrQjtBQUN2QixlQUFLLGVBQWU7QUFDcEIsZUFBSyxnQkFBZ0I7QUFDckIsZUFBSyxvQkFBb0I7QUFDekIsZUFBSyxjQUFjLElBQUk7QUFDdkIsY0FBSSxDQUFDLFlBQVk7QUFDYixrQkFBTSxDQUFFLGlCQUFpQixjQUFjLGVBQWUscUJBQXNCO0FBQzVFLGlCQUFLLGtCQUFrQixXQUFXLG1CQUFtQixrQkFBa0I7QUFDdkUsaUJBQUssZUFBZSxXQUFXLGdCQUFnQixlQUFlO0FBQzlELGlCQUFLLGdCQUFnQixXQUFXLGlCQUFpQixnQkFBZ0I7QUFDakUsaUJBQUssb0JBQW9CLFdBQVcscUJBQXFCLG9CQUFvQjtBQUFBO0FBQUE7QUFBQSxRQUdyRixTQUFTO0FBQ0wsZ0JBQU0saUJBQWlCLE9BQU87QUFDOUIsZ0JBQU0sWUFBWSxLQUFLLGdCQUFnQjtBQUN2QyxjQUFJLEtBQUssa0JBQWtCO0FBQ3ZCLGtCQUFNLElBQUksS0FBSyxpQkFBaUIsZ0JBQWdCO0FBR2hELG1CQUFPLEVBQUUsYUFBYSxRQUFRLFFBQVEsRUFBRTtBQUFBO0FBRTVDLGlCQUFPO0FBQUE7QUFBQSxRQUVYLGlCQUFpQjtBQUNiLGtCQUFRLE9BQU87QUFDZixnQkFBTSxZQUFZLEtBQUssZ0JBQWdCO0FBQ3ZDLGNBQUksS0FBSyxrQkFBa0I7QUFDdkIsbUJBQU8sS0FBSyxpQkFBaUIsT0FBTyxXQUFXO0FBQUE7QUFFbkQsaUJBQU87QUFBQTtBQUFBLFFBRVgsWUFBWTtBQUNSLGlCQUFPLE9BQU87QUFBQTtBQUFBLFFBRWxCLGlCQUFpQixPQUFPO0FBQ3BCLGdCQUFNLENBQUUsZUFBaUI7QUFDekIsY0FBSSxnQkFBZ0IsWUFBWSxJQUFJO0FBQ3BDLGNBQUk7QUFDQSxtQkFBTztBQUFBO0FBRVgsZ0JBQU0sV0FBVztBQUNqQiwwQkFBZ0I7QUFBQSxnQkFDUjtBQUNBLG9CQUFNLGtCQUFrQixJQUFJLHFCQUFxQixVQUFVO0FBRTNELG9CQUFNLFFBQVEsSUFBSSxNQUFNLG1CQUFtQixpQkFBaUI7QUFDNUQsNEJBQWMsT0FBTztBQUNyQixtQ0FBcUIsTUFBTSxZQUFZLENBQUUsT0FBTztBQUNoRCxxQkFBTztBQUFBO0FBQUEsZ0JBRVA7QUFDQSxvQkFBTSxrQkFBa0IsSUFBSSxnQkFBZ0IsVUFBVTtBQUV0RCxvQkFBTSxRQUFRLElBQUksTUFBTSxtQkFBbUIsaUJBQWlCO0FBQzVELDRCQUFjLE9BQU87QUFDckIsbUNBQXFCLE1BQU0sWUFBWSxDQUFFLE9BQU87QUFDaEQscUJBQU87QUFBQTtBQUFBO0FBR2Ysc0JBQVksSUFBSSxnQkFBZ0I7QUFDaEMsaUJBQU87QUFBQTtBQUFBO0FBS2Ysb0JBQWMsTUFBTTtBQUVsQixZQUFJLFdBQVcsSUFBSSxpQkFBaUI7QUFBQSxVQUNsQyxhQUFhLFFBQVE7QUFDbkIsNkJBQWlCLFFBQVE7QUFBQTtBQUFBO0FBSTdCLGVBQU87QUFBQSxVQUNMLE1BQU0sU0FBUyxTQUFTO0FBQUEsVUFDeEI7QUFBQTtBQUFBO0FBR0osd0JBQWtCLFVBQVU7QUFDMUIsWUFBSSxnQkFBZ0IsU0FBUyxZQUFZO0FBQ3pDLFlBQUksT0FBTztBQUNYLGVBQU8sS0FBSyxlQUFlLFFBQVE7QUFDakMsY0FBSSxDQUFDLE9BQU8sU0FBUyxhQUFhLFVBQVUsU0FBUztBQUFNO0FBQzNELGVBQUssT0FBTyxjQUFjO0FBQUE7QUFFNUIsZUFBTztBQUFBO0FBMzVDWDtBQUFBLFFBKzVDSSxZQUFZLElBQUksb0JBQW9CO0FBQ2xDLGVBQUssTUFBTTtBQUNYLGdCQUFNLFdBQVcsS0FBSyxJQUFJLGFBQWE7QUFDdkMsZ0JBQU0saUJBQWlCLGFBQWEsS0FBSyxPQUFPO0FBQ2hELGdCQUFNLGlCQUFpQixLQUFLLElBQUksYUFBYTtBQUM3QyxjQUFJLGFBQWE7QUFBQSxZQUNmLEtBQUssS0FBSztBQUFBO0FBRVosY0FBSSxxQ0FBcUMsb0JBQW9CLGtCQUFrQixNQUFNLEtBQUs7QUFDMUYsaUJBQU8sUUFBUSxPQUFPLGlCQUFpQixRQUFRLENBQUMsQ0FBQyxNQUFNO0FBQ3JELG1CQUFPLGVBQWUsWUFBWSxJQUFJLFFBQVE7QUFBQSxjQUM1QyxLQUFLO0FBQ0gsdUJBQU8sU0FBUztBQUFBO0FBQUE7QUFBQTtBQUl0QixlQUFLLGlCQUFpQixvQkFBb0Isa0JBQWtCLHNCQUFzQixVQUFVLElBQUksZ0JBQWdCO0FBR2hILGNBQUk7QUFBQSxZQUNGO0FBQUEsWUFDQTtBQUFBLGNBQ0UsS0FBSyxxQkFBcUIsS0FBSztBQUNuQyxlQUFLLFFBQVE7QUFDYixlQUFLLFdBQVc7QUFHaEIsZUFBSyxlQUFlLE1BQU0sS0FBSztBQUMvQixlQUFLLGVBQWUsUUFBUSxLQUFLO0FBQ2pDLGVBQUssZ0JBQWdCO0FBRXJCLGVBQUssZUFBZSxZQUFZO0FBQzlCLGlCQUFLLGNBQWMsS0FBSztBQUFBO0FBRzFCLGVBQUssV0FBVztBQUVoQixlQUFLLGVBQWUsU0FBUyxDQUFDLFVBQVU7QUFDdEMsZ0JBQUksQ0FBQyxLQUFLLFNBQVM7QUFBVyxtQkFBSyxTQUFTLFlBQVk7QUFDeEQsaUJBQUssU0FBUyxVQUFVLEtBQUs7QUFBQTtBQVEvQixpQkFBTyxRQUFRLE9BQU8saUJBQWlCLFFBQVEsQ0FBQyxDQUFDLE1BQU07QUFDckQsbUJBQU8sZUFBZSxLQUFLLGdCQUFnQixJQUFJLFFBQVE7QUFBQSxjQUNyRCxLQUFLO0FBQ0gsdUJBQU8sU0FBUyxvQ0FBb0MsS0FBSztBQUFBO0FBQUE7QUFBQTtBQU0vRCxlQUFLLHFCQUFxQjtBQUMxQixlQUFLO0FBQ0wsK0JBQXFCLE9BQU8sOEJBQThCLFFBQVEsY0FBWSxTQUFTO0FBQ3ZGLGNBQUk7QUFFSixjQUFJLGtCQUFrQixDQUFDO0FBR3JCLGlCQUFLLGtCQUFrQjtBQUN2QixtQ0FBdUIsS0FBSyx5QkFBeUIsS0FBSyxLQUFLO0FBQy9ELGlCQUFLLGtCQUFrQjtBQUFBO0FBSXpCLGVBQUssbUJBQW1CLEtBQUs7QUFHN0IsZUFBSztBQUVMLGNBQUksT0FBTyx5QkFBeUI7QUFHbEMsaUNBQXFCLEtBQUssS0FBSztBQUFBO0FBR2pDLCtCQUFxQixXQUFXO0FBQzlCLG1CQUFPLHdCQUF3QixRQUFRLGNBQVksU0FBUztBQUFBLGFBQzNEO0FBQUE7QUFBQSxRQUdMO0FBQ0UsaUJBQU8sU0FBUyxLQUFLLFVBQVUsS0FBSztBQUFBO0FBQUEsUUFHdEMscUJBQXFCO0FBQ25CLGNBQUksUUFBTztBQUNYLGNBQUksWUFBWSxTQUFTO0FBQ3ZCLGtCQUFLLGVBQWUsTUFBSztBQUFBLGFBQ3hCO0FBQ0gsaUJBQU8sS0FBSyxNQUFNLENBQUMsUUFBUTtBQUN6QixnQkFBSSxNQUFLLFNBQVM7QUFFaEIsb0JBQUssU0FBUyxLQUFLLFFBQVEsY0FBWSxTQUFTLE9BQU87QUFBQSx1QkFDOUMsTUFBTSxRQUFRO0FBRXZCLHFCQUFPLEtBQUssTUFBSyxVQUFVLFFBQVE7QUFDakMsb0JBQUksbUJBQW1CLG1CQUFtQixNQUFNO0FBSWhELG9CQUFJLFFBQVE7QUFBVTtBQUN0QixpQ0FBaUIsT0FBTyxDQUFDLGdCQUFnQjtBQUN2QyxzQkFBSSxPQUFPLEdBQUcsUUFBUSxlQUFlO0FBQ25DLDBCQUFLLFNBQVMsb0JBQW9CLFFBQVEsY0FBWSxTQUFTO0FBQUE7QUFHakUseUJBQU8sZUFBZTtBQUFBLG1CQUNyQixNQUFLO0FBQUE7QUFBQTtBQUtWLHFCQUFPLEtBQUssTUFBSyxVQUFVLE9BQU8sT0FBSyxFQUFFLFNBQVMsTUFBTSxRQUFRO0FBQzlELG9CQUFJLG1CQUFtQixtQkFBbUIsTUFBTTtBQUdoRCxvQkFBSSxRQUFRLGlCQUFpQixpQkFBaUIsU0FBUztBQUFJO0FBRzNELGlDQUFpQixPQUFPLENBQUMsZ0JBQWdCO0FBQ3ZDLHNCQUFJLE9BQU8sR0FBRyxRQUFRO0FBRXBCLDBCQUFLLFNBQVMsb0JBQW9CLFFBQVEsY0FBWSxTQUFTLE9BQU87QUFBQTtBQUd4RSx5QkFBTyxlQUFlO0FBQUEsbUJBQ3JCLE1BQUs7QUFBQTtBQUFBO0FBS1osZ0JBQUksTUFBSztBQUFpQjtBQUMxQjtBQUFBO0FBQUE7QUFBQSxRQUlKLDRCQUE0QixJQUFJLFVBQVUsOEJBQThCO0FBQUE7QUFDdEUsZUFBSyxJQUFJO0FBRVAsZ0JBQUksSUFBRyxhQUFhO0FBRWxCLGtCQUFJLENBQUMsSUFBRyxXQUFXLEtBQUs7QUFFdEIsb0JBQUksQ0FBQyxJQUFHO0FBQUssOENBQTRCO0FBRXpDLHVCQUFPO0FBQUE7QUFBQTtBQUlYLG1CQUFPLFNBQVM7QUFBQTtBQUFBO0FBQUEsUUFJcEIsbUJBQW1CLFFBQVEsWUFBWTtBQUFBO0FBQ3JDLGVBQUssNEJBQTRCLFFBQVE7QUFFdkMsZ0JBQUksR0FBRyxnQkFBZ0I7QUFBVyxxQkFBTztBQUV6QyxnQkFBSSxHQUFHLG9CQUFvQjtBQUFXLHFCQUFPO0FBQzdDLGlCQUFLLGtCQUFrQixJQUFJO0FBQUEsYUFDMUI7QUFDRCxlQUFHLE1BQU0sSUFBSSxVQUFVO0FBQUE7QUFFekIsZUFBSztBQUNMLGVBQUssNkJBQTZCO0FBQUE7QUFBQSxRQUdwQyxrQkFBa0IsSUFBSTtBQUdwQixjQUFJLEdBQUcsYUFBYSxZQUFZLFVBQVUsSUFBSSxNQUFNLFNBQVM7QUFDM0QsZUFBRyx1QkFBdUIsMEJBQTBCLEdBQUcsYUFBYTtBQUFBO0FBR3RFLGVBQUssa0JBQWtCLElBQUk7QUFDM0IsZUFBSyx1QkFBdUIsSUFBSSxNQUFNO0FBQUE7QUFBQSxRQUd4QyxlQUFlLFFBQVEsWUFBWTtBQUFBO0FBQ2pDLGVBQUssNEJBQTRCLFFBQVE7QUFFdkMsZ0JBQUksR0FBRyxnQkFBZ0IsVUFBYSxDQUFDLEdBQUcsV0FBVyxLQUFLO0FBQU0scUJBQU87QUFDckUsaUJBQUssY0FBYyxJQUFJO0FBQUEsYUFDdEI7QUFDRCxlQUFHLE1BQU0sSUFBSSxVQUFVO0FBQUE7QUFFekIsZUFBSztBQUNMLGVBQUssNkJBQTZCO0FBQUE7QUFBQSxRQUdwQyw2QkFBNkI7QUFFM0IsY0FBSSxPQUFPLEtBQUssT0FBTyxLQUFLLGNBQWMsU0FBUztBQUdqRCxrQ0FBc0I7QUFDcEIscUJBQU8sS0FBSyxjQUFjLFNBQVM7QUFDakMscUJBQUssY0FBYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFNM0I7QUFJRSxlQUFLLG1CQUFtQixVQUFVLElBQUk7QUFDcEMsbUJBQU8sSUFBSSxRQUFRLENBQUMsU0FBUztBQUMzQixzQkFBUSxTQUFTO0FBQUE7QUFBQSxhQUVsQixPQUFPLENBQUMsY0FBYztBQUN2QixtQkFBTyxhQUFhLEtBQUs7QUFDdkIscUJBQU8sUUFBUSxLQUFLO0FBQ2xCO0FBQUE7QUFBQTtBQUFBLGFBR0gsUUFBUSxRQUFRO0FBQUEsY0FBVyxNQUFNO0FBQ2xDLGdCQUFJLE1BQU07QUFBc0Isb0JBQU07QUFBQTtBQUd4QyxlQUFLLHFCQUFxQjtBQUMxQixlQUFLLDJCQUEyQjtBQUFBO0FBQUEsUUFHbEMsY0FBYyxJQUFJO0FBQ2hCLGVBQUssdUJBQXVCLElBQUksT0FBTztBQUFBO0FBQUEsUUFHekMsa0JBQWtCLElBQUk7QUFDcEIsb0JBQVUsSUFBSSxNQUFNLFFBQVEsQ0FBQztBQUFBLFlBQzNCO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUE7QUFFQSxvQkFBUTtBQUFBLG1CQUNEO0FBQ0gsaUNBQWlCLE1BQU0sSUFBSSxPQUFPLFdBQVcsWUFBWTtBQUN6RDtBQUFBLG1CQUVHO0FBQ0gsc0NBQXNCLE1BQU0sSUFBSSxXQUFXLFlBQVk7QUFDdkQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUtSLHVCQUF1QixJQUFJLGdCQUFnQixPQUFPO0FBQ2hELGNBQUksUUFBUSxVQUFVLElBQUk7QUFDMUIsZ0JBQU0sUUFBUSxDQUFDO0FBQUEsWUFDYjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBO0FBRUEsb0JBQVE7QUFBQSxtQkFDRDtBQUNILGdEQUFnQyxNQUFNLElBQUksU0FBUyxZQUFZLFdBQVcsTUFBTTtBQUNoRjtBQUFBLG1CQUVHO0FBRUgsb0JBQUksR0FBRyxRQUFRLGtCQUFrQixjQUFjLFVBQVU7QUFBTztBQUNoRSxnREFBZ0MsTUFBTSxJQUFJLE9BQU8sWUFBWSxXQUFXLE1BQU07QUFDOUU7QUFBQSxtQkFFRztBQUNILG9CQUFJLFNBQVMsS0FBSyx5QkFBeUIsSUFBSSxZQUFZO0FBQzNELG9DQUFvQixJQUFJLFFBQVE7QUFDaEM7QUFBQSxtQkFFRztBQUNILG9DQUFvQixNQUFNLElBQUksWUFBWTtBQUMxQztBQUFBLG1CQUVHO0FBQ0gsb0JBQUksU0FBUyxLQUFLLHlCQUF5QixJQUFJLFlBQVk7QUFDM0Qsb0NBQW9CLE1BQU0sSUFBSSxRQUFRLFdBQVc7QUFDakQ7QUFBQSxtQkFFRztBQUdILG9CQUFJLE1BQU0sS0FBSyxPQUFLLEVBQUUsU0FBUztBQUFRO0FBQ3ZDLG9CQUFJLFNBQVMsS0FBSyx5QkFBeUIsSUFBSSxZQUFZO0FBQzNELGtDQUFrQixNQUFNLElBQUksUUFBUSxlQUFlO0FBQ25EO0FBQUEsbUJBRUc7QUFDSCxtQ0FBbUIsTUFBTSxJQUFJLFlBQVksZUFBZTtBQUN4RDtBQUFBLG1CQUVHO0FBQ0gsbUJBQUcsZ0JBQWdCO0FBQ25CO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFLUix5QkFBeUIsSUFBSSxZQUFZLFlBQVk7QUFBQTtBQUNuRCxpQkFBTyxVQUFVLElBQUksWUFBWSxLQUFLLE9BQU8sZUFBZSxlQUFlLElBQUksY0FBYyxJQUFJO0FBQUEsWUFDL0YsV0FBVyxLQUFLLG9CQUFvQjtBQUFBO0FBQUE7QUFBQSxRQUl4QywwQkFBMEIsSUFBSSxZQUFZLFlBQVk7QUFBQTtBQUNwRCxpQkFBTyxrQkFBa0IsSUFBSSxZQUFZLEtBQUssT0FBTyxlQUFlLGVBQWUsSUFBSSxjQUFjLElBQUk7QUFBQSxZQUN2RyxXQUFXLEtBQUssb0JBQW9CO0FBQUE7QUFBQTtBQUFBLFFBSXhDLG9CQUFvQjtBQUNsQixpQkFBTyxDQUFDLE9BQU8sU0FBUztBQUN0QixlQUFHLGNBQWMsSUFBSSxZQUFZLE9BQU87QUFBQSxjQUN0QztBQUFBLGNBQ0EsU0FBUztBQUFBO0FBQUE7QUFBQTtBQUFBLFFBS2Y7QUFDRSxnQkFBTSxhQUFhLEtBQUs7QUFDeEIsZ0JBQU0sa0JBQWtCO0FBQUEsWUFDdEIsV0FBVztBQUFBLFlBQ1gsWUFBWTtBQUFBLFlBQ1osU0FBUztBQUFBO0FBRVgsZ0JBQU0sV0FBVyxJQUFJLGlCQUFpQjtBQUNwQyxxQkFBUyxJQUFJLEdBQUcsSUFBSSxVQUFVLFFBQVE7QUFFcEMsb0JBQU0seUJBQXlCLFVBQVUsR0FBRyxPQUFPLFFBQVE7QUFDM0Qsa0JBQUksQ0FBRSwyQkFBMEIsdUJBQXVCLFdBQVcsS0FBSztBQUFPO0FBRTlFLGtCQUFJLFVBQVUsR0FBRyxTQUFTLGdCQUFnQixVQUFVLEdBQUcsa0JBQWtCO0FBQ3ZFLHNCQUFNLFFBQVEsVUFBVSxHQUFHLE9BQU8sYUFBYSxhQUFhO0FBQzVELHNCQUFNLFVBQVUsVUFBVSxLQUFLLEtBQUssT0FBTztBQUFBLGtCQUN6QyxLQUFLLEtBQUs7QUFBQTtBQUVaLHVCQUFPLEtBQUssU0FBUyxRQUFRO0FBQzNCLHNCQUFJLEtBQUssTUFBTSxTQUFTLFFBQVE7QUFDOUIseUJBQUssTUFBTSxPQUFPLFFBQVE7QUFBQTtBQUFBO0FBQUE7QUFLaEMsa0JBQUksVUFBVSxHQUFHLFdBQVcsU0FBUztBQUNuQywwQkFBVSxHQUFHLFdBQVcsUUFBUTtBQUM5QixzQkFBSSxLQUFLLGFBQWEsS0FBSyxLQUFLO0FBQWlCO0FBRWpELHNCQUFJLEtBQUssUUFBUSxlQUFlLENBQUMsS0FBSztBQUNwQyx5QkFBSyxNQUFNLElBQUksVUFBVTtBQUN6QjtBQUFBO0FBR0YsdUJBQUssbUJBQW1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLaEMsbUJBQVMsUUFBUSxZQUFZO0FBQUE7QUFBQSxRQUcvQjtBQUNFLGNBQUksUUFBTztBQUNYLGNBQUksU0FBUztBQU1iLGlCQUFPLElBQUksTUFBTSxRQUFRO0FBQUEsWUFDdkIsSUFBSSxRQUFRO0FBQ1Ysa0JBQUksYUFBYTtBQUFrQix1QkFBTztBQUMxQyxrQkFBSTtBQUdKLG9CQUFLLDRCQUE0QixNQUFLLEtBQUs7QUFDekMsb0JBQUksR0FBRyxhQUFhLFlBQVksR0FBRyxhQUFhLGFBQWE7QUFDM0Qsd0JBQU07QUFBQTtBQUFBO0FBR1YscUJBQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFmLFlBQU0sU0FBUztBQUFBLFFBQ2IsU0FBUztBQUFBLFFBQ1QsdUJBQXVCO0FBQUEsUUFDdkIsaUJBQWlCO0FBQUEsUUFDakIseUJBQXlCO0FBQUEsUUFDekIsK0JBQStCO0FBQUEsUUFDL0IsOEJBQThCO0FBQUEsUUFDOUIsT0FBTztBQUF1QjtBQUM1QixnQkFBSSxDQUFDO0FBQ0gsb0JBQU07QUFBQTtBQUdSLGlCQUFLLG1CQUFtQjtBQUN0QixtQkFBSyxvQkFBb0I7QUFBQTtBQUkzQixxQkFBUyxpQkFBaUIsbUJBQW1CO0FBQzNDLG1CQUFLLGdDQUFnQztBQUNuQyxxQkFBSyxvQkFBb0I7QUFBQTtBQUFBO0FBRzdCLGlCQUFLO0FBQUE7QUFBQTtBQUFBLFFBRVAsb0JBQW9CLDRCQUE0QjtBQUM5QyxnQkFBTSxVQUFVLFNBQVMsaUJBQWlCO0FBQzFDLGtCQUFRLFFBQVE7QUFDZCxxQkFBUztBQUFBO0FBQUE7QUFBQSxRQUdiLGlDQUFpQyx5Q0FBeUMsVUFBVSxLQUFLO0FBQ3ZGLGdCQUFNLFVBQVcsT0FBTSxVQUFVLGlCQUFpQjtBQUNsRCxnQkFBTSxLQUFLLFNBQVMsT0FBTyxTQUFNLElBQUcsUUFBUSxRQUFXLFFBQVE7QUFDN0QscUJBQVM7QUFBQTtBQUFBO0FBQUEsUUFHYiw4Q0FBOEM7QUFDNUMsZ0JBQU0sYUFBYSxTQUFTLGNBQWM7QUFDMUMsZ0JBQU0sa0JBQWtCO0FBQUEsWUFDdEIsV0FBVztBQUFBLFlBQ1gsWUFBWTtBQUFBLFlBQ1osU0FBUztBQUFBO0FBRVgsZ0JBQU0sV0FBVyxJQUFJLGlCQUFpQjtBQUNwQyxnQkFBSSxLQUFLO0FBQXVCO0FBRWhDLHFCQUFTLElBQUksR0FBRyxJQUFJLFVBQVUsUUFBUTtBQUNwQyxrQkFBSSxVQUFVLEdBQUcsV0FBVyxTQUFTO0FBQ25DLDBCQUFVLEdBQUcsV0FBVyxRQUFRO0FBRTlCLHNCQUFJLEtBQUssYUFBYTtBQUFHO0FBR3pCLHNCQUFJLEtBQUssaUJBQWlCLEtBQUssY0FBYyxRQUFRO0FBQWE7QUFDbEUsdUJBQUssZ0NBQWdDO0FBQ25DLHlCQUFLLG9CQUFvQjtBQUFBLHFCQUN4QixLQUFLO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLaEIsbUJBQVMsUUFBUSxZQUFZO0FBQUE7QUFBQSxRQUUvQixxQkFBcUIsNkJBQTZCO0FBQ2hELGNBQUksQ0FBQyxHQUFHO0FBR047QUFDRSxpQkFBRyxNQUFNLElBQUksVUFBVTtBQUFBLHFCQUNoQjtBQUNQLHlCQUFXO0FBQ1Qsc0JBQU07QUFBQSxpQkFDTDtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBSVQsT0FBTyxlQUFlLFdBQVc7QUFDL0IsY0FBSSxDQUFDLE1BQU07QUFDVCxrQkFBTSxNQUFNLElBQUksVUFBVSxPQUFPO0FBQUE7QUFBQTtBQUFBLFFBR3JDLGtCQUFrQiwwQkFBMEIsTUFBTTtBQUNoRCxlQUFLLGdCQUFnQixRQUFRO0FBQUE7QUFBQSxRQUUvQix3QkFBd0IsZ0NBQWdDO0FBQ3RELGVBQUssd0JBQXdCLEtBQUs7QUFBQTtBQUFBLFFBRXBDLDhCQUE4QixzQ0FBc0M7QUFDbEUsZUFBSyw4QkFBOEIsS0FBSztBQUFBO0FBQUE7QUFJNUMsVUFBSSxDQUFDO0FBQ0gsZUFBTyxTQUFTO0FBRWhCLFlBQUksT0FBTztBQUNULGlCQUFPLG1CQUFtQjtBQUN4QixtQkFBTyxPQUFPO0FBQUE7QUFBQTtBQUdoQixpQkFBTyxPQUFPO0FBQUE7QUFBQTtBQUlsQixhQUFPO0FBQUE7QUFBQTs7O0FDbjVEVCx3QkFBTztBQVFQLHdCQUFzQjtBQVJ0QjtBQVNFLG1CQUFTLGVBQWUsZ0JBQXhCLG1CQUFxQyxVQUFVLE9BQU87QUFDdEQsbUJBQVMsZUFBZSxnQkFBeEIsbUJBQXFDLFVBQVUsT0FBTztBQUFBO0FBR3hELFNBQU8sZUFBZTsiLAogICJuYW1lcyI6IFtdCn0K
