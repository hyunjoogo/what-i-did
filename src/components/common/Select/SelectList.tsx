import React, {
  HTMLAttributes,
  ReactNode,
  MouseEvent,
  Children,
  isValidElement,
  cloneElement,
  EventHandler,
  SyntheticEvent,
} from "react";
import styled, { css, CSSProp } from "styled-components";
import { useSelectContext } from "./SelectContext";
import color from "../../../styles/color";
import { ItemProps } from "./SelectItem";

export type ComposeEventHandlers = <E extends SyntheticEvent<unknown, Event>>(
  externalEventHandler?: EventHandler<E>,
  innerEventHandler?: EventHandler<E>,
) => EventHandler<E>;

const composeEventHandlers: ComposeEventHandlers = (
  externalEventHandler,
  innerEventHandler,
) => {
  return (event) => {
    externalEventHandler?.(event);
    innerEventHandler?.(event);
  };
};

type Props = {
  children: ReactNode;

  $style?: CSSProp;

  onChange: (e: MouseEvent<HTMLDivElement>) => void;
} & HTMLAttributes<HTMLDivElement>;

const SelectList = ({ children, onChange, $style, ...props }: Props) => {
  const { isOpen, changeSelectedItem, toggleOpen } = useSelectContext();

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    if ("dataset" in e.target) {
      changeSelectedItem((e.target.dataset as { value: string }).value);
      toggleOpen();
    }
  };

  const childrenArray = Children.toArray(children);

  return isOpen ? (
    <Layout {...props} $style={$style}>
      {childrenArray.map((child) => {
        if (isValidElement<ItemProps>(child)) {
          return cloneElement(child, {
            ...child.props,
            onClick: composeEventHandlers(onChange, onClick),
          });
        }
        return null;
      })}
    </Layout>
  ) : (
    <></>
  );
};

export default SelectList;

const Layout = styled.div<Pick<Props, "$style">>`
  ${({ $style }) => css`
    ${$style}
  `}

  height: 200px;
  overflow-y: scroll;
  border-bottom: 1px solid ${color.neutral[200]};
`;
