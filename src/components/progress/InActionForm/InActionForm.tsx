import React from 'react';
import { useCurrentActionInfo } from '../../../Contexts/ActionProgressProvider';
import Button from '../../common/Button/Button';
import styled from 'styled-components';
import QuestionTextarea from '../../common/QuestionTextarea/QuestionTextarea';
import useInActionForm from '../hooks/useInActionForm';

const InActionForm = () => {
  const { whatIWill, questionTextareaProps, submitForm, isSubmitLoading } = useInActionForm();

  if (whatIWill === null) return null;

  return (
    <Layout>
      <PlanResultList>
        {/*{getKeys<Plan>(PLAN_KEYWORDS).map((planKey) => (*/}
        {/*  <QuestionAnswer*/}
        {/*    key={planKey}*/}
        {/*    question={PLAN_KEYWORDS[planKey]}*/}
        {/*    answer={planList[planKey]}*/}
        {/*    iconColor={color.red[600]}*/}
        {/*  />*/}
        {/*))}*/}

        <QuestionTextarea question="행동 메모" {...questionTextareaProps.memo} />
      </PlanResultList>
      <Button variant="danger" onClick={submitForm} isLoading={isSubmitLoading}>
        행동 마치기
      </Button>
    </Layout>
  );
};

export default InActionForm;

const Layout = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const PlanResultList = styled.ul`
  width: 100%;

  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 60px;

  padding: 50px;
  background-color: #fff;
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
