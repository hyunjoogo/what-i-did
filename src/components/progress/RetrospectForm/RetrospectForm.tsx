import React from 'react';
import styled, { css } from 'styled-components';
import QuestionAnswer from '../../common/QuestionAnswer/QuestionAnswer';
import color from '../../../styles/color';
import QuestionTextarea from '../../common/QuestionTextarea/QuestionTextarea';
import Button from '../../common/Button/Button';
import useRetrospectForm from '../hooks/useRetrospectForm';
import Input from '../../common/Input/Input';
import { PLAN_KEYWORDS } from '../../../constants/action';

const RetrospectForm = () => {
  const { whatIWill, memo, nameInput, questionTextareaProps, submitForm, isSubmitLoading, isDisabled } =
    useRetrospectForm();

  return (
    <Layout>
      <PlanResultList>
        <QuestionList>
          <QuestionAnswer question={PLAN_KEYWORDS['whatIWill']} answer={whatIWill} iconColor={color.green[600]} />
          <QuestionAnswer question={PLAN_KEYWORDS['memo']} answer={memo} iconColor={color.green[600]} />
        </QuestionList>
        <Input
          label="행동 제목"
          errorMessage="10자 이하로 적어주세요."
          $style={css`
            font-weight: 500;
          `}
        >
          <Input.TextField maxLength={10} error={nameInput.isInputError} onChange={nameInput.onChangeInput} />
        </Input>
        <QuestionTextarea question={PLAN_KEYWORDS['whatIDid']} {...questionTextareaProps.whatIDid} />
        <QuestionTextarea question={PLAN_KEYWORDS['whatILearned']} {...questionTextareaProps.whatILearned} />
        <QuestionTextarea question={PLAN_KEYWORDS['summary']} {...questionTextareaProps.summary} />
      </PlanResultList>
      <Button variant="danger" onClick={submitForm} $isLoading={isSubmitLoading} disabled={isDisabled()}>
        행동 종료
      </Button>
    </Layout>
  );
};

export default RetrospectForm;

const Layout = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const PlanResultList = styled.div`
  width: 100%;

  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 60px;

  padding: 50px;
  background-color: #f5f5f5;
  border-radius: 14px;

  overflow-y: auto;

  @media screen and (max-width: 768px) {
    padding: 50px 20px;

    gap: 40px;

    h5 {
      font-size: 2.2rem;
    }

    p {
      font-size: 1.8rem;
    }
  }
`;

const QuestionList = styled.div`
  background-color: #fff;
  padding: 16px 30px 10px 30px;
  border: 1px solid #fff;
  border-radius: 14px;

  display: flex;
  flex-direction: column;
  row-gap: 30px;

  @media screen and (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
    row-gap: 15px;
  }
`;
