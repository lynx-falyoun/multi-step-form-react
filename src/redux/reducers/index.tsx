
import { MOVE_STEP_FORWARD_OR_BACKWARD, FILL_STEP_DATA } from '../types/actions-types';
import { ReduxStateInterface } from '../../interfaces/redux-state';
import { ActionInterface } from '../../interfaces/action-interface';
import StepOneGeneral from '../../components/steps/step-one-general';
import StepTwoStore from '../../components/steps/step-two-store';
import StepThreeDocument from '../../components/steps/step-three-document';
import StepFourDocument from '../../components/steps/step-four-bank';
import StepFiveVAT from '../../components/steps/step-five-vat';
import EndStep from '../../components/steps/end-step';
import * as ICONS from '../../components/svg-icons';

import { fillDataReducer } from './fill-step-data-reducer';
import { moveStepReducer } from './move-step-reducer';
const initialState: ReduxStateInterface = {
    currentStep: 0,
    steps: [
        {
            title: 'General',
            icon: ICONS.BankSVGIcon,
            data: {},
            component: <StepOneGeneral />
        },
        {
            title: 'Store',
            icon: ICONS.StoreSVGIcon,
            data: {},
            component: <StepTwoStore />
        },
        {
            title: 'Document',
            icon: ICONS.DocumentSVGIcon,
            data: {},
            component: <StepThreeDocument />
        },
        {
            title: 'Bank',
            icon: ICONS.BankSVGIcon,
            data: {},
            component: <StepFourDocument />
        },
        {
            title: 'VAT',
            icon: ICONS.LaptopSVGIcon,
            data: {},
            component: <StepFiveVAT />
        },
        {
            title: 'End',
            icon: ICONS.CheckMarkSVGIcon,
            data: {},
            component: <EndStep />
        }
    ]
};

export default (state = initialState, action: ActionInterface) => {
    switch (action.type) {
        case MOVE_STEP_FORWARD_OR_BACKWARD:
            return moveStepReducer(state, action);
            
        case FILL_STEP_DATA:
            return fillDataReducer(state, action);
        default:
            return state;
    }
};