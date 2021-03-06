
import React, { useEffect, useState } from 'react';
import { Form, Radio, Skeleton } from 'antd';
import StepperInput from '../input-fields/stepper-input';
import FancySmallCard from '../card/fancy-small-card';
import { useSelector } from 'react-redux';
import { GeneralDataInterface } from '../../interfaces/steps-data';
import { STEPS_NAMES } from '../../enums/steps-names';
import { useTranslation } from 'react-i18next';
import { useAppAsyncDispatch, useAppDispatch } from '../../redux/store';
import { fillDataReducer, rootSelector, fetchPackages } from '../../redux/slices/root.slice';


const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 21 },
};



const StepOneGenerator = () => {
  const { steps, currentStep, shouldStepperMove} = useSelector(rootSelector);
  const plans: any = useSelector(rootSelector).plans;
  const initialData: any = steps[currentStep]?.data;
  const dispatch = useAppAsyncDispatch();
  const [form] = Form.useForm();
  const [cityValue, setCityValue] = useState(initialData.city || 'Riyadh')
  const [packageType, setPackageType] = useState(initialData.packageType || '1')
  const [stepOneData, setStepOneData] = useState<GeneralDataInterface>({ ...initialData });

  const { t, i18n } = useTranslation('common');


  useEffect(() => {
    // Getting all available plans
    dispatch(fetchPackages());
  }, []);


  useEffect(() => {
    if (shouldStepperMove) {
      if (!('city' in stepOneData) || (stepOneData.city == '')) {
        stepOneData.city = 'Riyadh';
      }
      if (!('packageType' in stepOneData) || (stepOneData.packageType == '')) {
        stepOneData.packageType = '1';
      }

      const formHasErrors = () => form.getFieldsError().some((item) => item.errors.length > 0)
      dispatch(fillDataReducer({ data: stepOneData, stepNumber: STEPS_NAMES.GENERAL, formHasErrors: formHasErrors() }))

    }
  }, [shouldStepperMove])


  const onEmailFieldValueChanged = (e: any) => {
    stepOneData.email = e.target.value;
  }

  const onFullNameFieldValueChanged = (e: any) => {
    stepOneData.fullname = e.target.value;
  }

  return (
    <div className="step-one-wrapper">
      <p>{t('general')}</p>
      <div className="form-wrapper">
        <div>
          <Form {...layout} form={form} name="control-hooks" scrollToFirstError>
            <div className="flex-row-flex-start-main-cross-center">
              <StepperInput
                value={stepOneData.email}
                onInputChanged={onEmailFieldValueChanged}
                placeHolder="Info@Example.com"
                size='large'
                bordered={false}
                className="full-flex-item column-flex-direction" name="email" label={t("email address")} rules={[
                  {
                    type: 'email',
                    message: t('the input is not valid E-mail!'),
                  },
                  {
                    required: true,
                    message: t('please input your E-mail!'),
                  },
                ]} />
              <StepperInput
                value={stepOneData.fullname}
                onInputChanged={onFullNameFieldValueChanged}
                placeHolder={t("your full name")}
                size='large'
                bordered={false}
                name="name" label={t("full name")}
                className="full-flex-item column-flex-direction"
                rules={[
                  {
                    required: true,
                    message: t('please input your full name!'),
                  },
                ]}
              />
            </div>
          </Form>
        </div>
        <div className='radio-group-wrapper'>
          <Radio.Group
            size='large'
            onChange={(e: any) => {
              stepOneData.city = e.target.value;
              setCityValue(e.target.value)
            }} value={cityValue}

          >
            <Radio value='Riyadh'>{t('riyadh')}</Radio>
            <Radio value='Dammam'>{t('dammam')}</Radio>
            <Radio value='Jaddah'>{t('jaddah')}</Radio>
          </Radio.Group>
        </div>
        <div className='fancy-cards-wrapper'>
          {
            plans && plans.length > 0 &&
            plans.map((plan: any) => {
              return (
                <FancySmallCard
                  title={(+plan.price === 0 ? 'free' : plan.price)}
                  bgColor='#595959'
                  txtStyle={{ color: '#FCEB55', letterSpacing: '.1rem' }}
                  periodText={`/${plan.periodicity}`}
                  headerColor={i18n.language == 'en' ? JSON.parse(plan.translations).en : JSON.parse(plan.translations).ar}
                  value={plan.plan_id}
                  cardSelected={plan.plan_id === packageType ? true : false}
                  onFancyCardClicked={(value: any) => {
                    stepOneData.packageType = value;
                    setPackageType(value);
                  }}
                />
              );
            })
          }
        </div>
        {
          plans.length === 0 && <div className="fancy-cards-wrapper">
            <Skeleton.Button className="skeleton-button-wrapper" active size='large' />
            <Skeleton.Button className="skeleton-button-wrapper" active size='large' />
            <Skeleton.Button className="skeleton-button-wrapper" active size='large' />
          </div>
        }
      </div>

    </div>

  );
};


export default StepOneGenerator;
