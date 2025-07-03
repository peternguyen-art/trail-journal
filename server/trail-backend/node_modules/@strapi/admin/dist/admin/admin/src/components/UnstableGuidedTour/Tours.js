'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var designSystem = require('@strapi/design-system');
var styled = require('styled-components');
var Context = require('./Context.js');
var Step = require('./Step.js');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

/* -------------------------------------------------------------------------------------------------
 * Tours
 * -----------------------------------------------------------------------------------------------*/ const tours = {
    contentManager: createTour('contentManager', [
        {
            name: 'Introduction',
            content: (Step)=>/*#__PURE__*/ jsxRuntime.jsxs(Step.Root, {
                    sideOffset: -36,
                    children: [
                        /*#__PURE__*/ jsxRuntime.jsx(Step.Title, {
                            id: "tours.contentManager.Introduction.title",
                            defaultMessage: "Content manager"
                        }),
                        /*#__PURE__*/ jsxRuntime.jsx(Step.Content, {
                            id: "tours.contentManager.Introduction.content",
                            defaultMessage: "Create and manage content from your collection types and single types."
                        }),
                        /*#__PURE__*/ jsxRuntime.jsx(Step.Actions, {
                            showSkip: true
                        })
                    ]
                })
        }
    ])
};
const GuidedTourOverlay = styled.styled(designSystem.Box)`
  position: fixed;
  inset: 0;
  background-color: rgba(50, 50, 77, 0.2);
  z-index: 10;
  pointer-events: none;
`;
const UnstableGuidedTourTooltip = ({ children, content, tourName, step })=>{
    const state = Context.unstableUseGuidedTour('UnstableGuidedTourTooltip', (s)=>s.state);
    const dispatch = Context.unstableUseGuidedTour('UnstableGuidedTourTooltip', (s)=>s.dispatch);
    const Step$1 = React__namespace.useMemo(()=>Step.createStepComponents(tourName), [
        tourName
    ]);
    const isCurrentStep = state.tours[tourName].currentStep === step;
    const isPopoverOpen = isCurrentStep && !state.tours[tourName].isCompleted;
    // Lock the scroll
    React__namespace.useEffect(()=>{
        if (!isPopoverOpen) return;
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        return ()=>{
            document.body.style.overflow = originalStyle;
        };
    }, [
        isPopoverOpen
    ]);
    return /*#__PURE__*/ jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [
            isPopoverOpen && /*#__PURE__*/ jsxRuntime.jsx(GuidedTourOverlay, {}),
            /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Popover.Root, {
                open: isPopoverOpen,
                children: [
                    /*#__PURE__*/ jsxRuntime.jsx(designSystem.Popover.Anchor, {
                        children: children
                    }),
                    content(Step$1, {
                        state,
                        dispatch
                    })
                ]
            })
        ]
    });
};
function createTour(tourName, steps) {
    const tour = steps.reduce((acc, step, index)=>{
        if (step.name in acc) {
            throw Error(`The tour: ${tourName} with step: ${step.name} has already been registered`);
        }
        acc[step.name] = ({ children })=>/*#__PURE__*/ jsxRuntime.jsx(UnstableGuidedTourTooltip, {
                tourName: tourName,
                step: index,
                content: step.content,
                children: children
            });
        return acc;
    }, {});
    return tour;
}

exports.GuidedTourOverlay = GuidedTourOverlay;
exports.tours = tours;
//# sourceMappingURL=Tours.js.map
