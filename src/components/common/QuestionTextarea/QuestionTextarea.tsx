import React, {
  ChangeEventHandler,
  InputHTMLAttributes,
  useState,
} from "react";
import styled from "styled-components";
import color from "../../../styles/color";
import Typography from "../Typography/Typography";

type Props = {
  question: string;
  errorMessage?: string;
  onClickGuideButton?: () => void;
} & InputHTMLAttributes<HTMLTextAreaElement>;

const QuestionTextarea = ({
  question,
  errorMessage,
  onClickGuideButton,
  ...props
}: Props) => {
  const required = true;
  const minLength = 5;
  const maxLength = 30;
  const [value, setValue] = useState("");
  const [message, setMessage] = useState(required ? "* 필수입력" : "");

  const validateValue = (updatedValue: string) => {
    if (required && updatedValue.length === 0) {
      setMessage("* 필수입력");
      return;
    }

    if (minLength && updatedValue.length < minLength) {
      setMessage(`최소 ${minLength}자 이상 입력해주세요.`);
      return;
    }

    setMessage("");
  };

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const updatedValue = event.target.value;

    validateValue(updatedValue);
    setValue(updatedValue);
  };

  return (
    <Layout>
      <Question>
        <Typography variant="h6">{question}</Typography>
      </Question>
      <Separator />
      <Textarea
        placeholder="답변을 입력해 주세요."
        {...props}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
      />
      <ErrorMessageWrapper>
        <Typography variant="p2" color={color.red[200]} fontSize="14px">
          {message}
        </Typography>
      </ErrorMessageWrapper>
    </Layout>
  );
};

export default QuestionTextarea;

const Layout = styled.div`
  width: 100%;

  padding: 16px 30px 10px 30px;
  background-color: #fff;

  border: 1px solid #fff;
  border-radius: 14px;

  &:focus-within {
    border-color: ${color.blue[500]};
  }
`;
const Question = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  word-break: keep-all;

  h6 {
    min-height: 42px;

    flex: 1;
    display: flex;
    align-items: center;
  }

  button {
    font-weight: 700;
  }
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;

  margin: 16px 0;

  background-color: ${color.neutral[200]};
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 130px;

  resize: none;
  outline: none;
  border: none;
`;

const ErrorMessageWrapper = styled.div`
  height: 20px;
`;