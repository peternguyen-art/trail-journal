import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { Box, Popover } from '@strapi/design-system';
import { styled } from 'styled-components';
import { unstableUseGuidedTour } from './Context.mjs';
import { createStepComponents } from './Step.mjs';

/* -------------------------------------------------------------------------------------------------
 * Tours
 * -----------------------------------------------------------------------------------------------*/ const tours = {
    contentManager: createTour('contentManager', [
        {
            name: 'Introduction',
            content: (Step)=>/*#__PURE__*/ jsxs(Step.Root, {
                    sideOffset: -36,
                    children: [
                        /*#__PURE__*/ jsx(Step.Title, {
                            id: "tours.contentManager.Introduction.title",
                            defaultMessage: "Content manager"
                        }),
                        /*#__PURE__*/ jsx(Step.Content, {
                            id: "tours.contentManager.Introduction.content",
                            defaultMessage: "Create and manage content from your collection types and single types."
                        }),
                        /*#__PURE__*/ jsx(Step.Actions, {
                            showSkip: true
                        })
                    ]
                })
        }
    ])
};
const GuidedTourOverlay = styled(Box)`
  position: fixed;
  inset: 0;
  background-color: rgba(50, 50, 77, 0.2);
  z-index: 10;
  pointer-events: none;
`;
const UnstableGuidedTourTooltip = ({ children, content, tourName, step })=>{
    const state = unstableUseGuidedTour('UnstableGuidedTourTooltip', (s)=>s.state);
    const dispatch = unstableUseGuidedTour('UnstableGuidedTourTooltip', (s)=>s.dispatch);
    const Step = React.useMemo(()=>createStepComponents(tourName), [
        tourName
    ]);
    const isCurrentStep = state.tours[tourName].currentStep === step;
    const isPopoverOpen = isCurrentStep && !state.tours[tourName].isCompleted;
    // Lock the scroll
    React.useEffect(()=>{
        if (!isPopoverOpen) return;
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        return ()=>{
            document.body.style.overflow = originalStyle;
        };
    }, [
        isPopoverOpen
    ]);
    return /*#__PURE__*/ jsxs(Fragment, {
        children: [
            isPopoverOpen && /*#__PURE__*/ jsx(GuidedTourOverlay, {}),
            /*#__PURE__*/ jsxs(Popover.Root, {
                open: isPopoverOpen,
                children: [
                    /*#__PURE__*/ jsx(Popover.Anchor, {
                        children: children
                    }),
                    content(Step, {
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
        acc[step.name] = ({ children })=>/*#__PURE__*/ jsx(UnstableGuidedTourTooltip, {
                tourName: tourName,
                step: index,
                content: step.content,
                children: children
            });
        return acc;
    }, {});
    return tour;
}

export { GuidedTourOverlay, tours };
//# sourceMappingURL=Tours.mjs.map
