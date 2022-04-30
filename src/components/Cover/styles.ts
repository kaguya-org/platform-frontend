import styled, { css } from "styled-components";

export type ContainerProps = {
  addStyleDefault?: boolean;
  hasLoading?: boolean;
}

export const Container = styled.div<ContainerProps>`
	${props => (props.addStyleDefault || props.hasLoading) && css`
		display: flex;
		justify-content: center;
		align-items: center;

		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	`}
`