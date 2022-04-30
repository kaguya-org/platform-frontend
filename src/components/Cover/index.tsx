import { HTMLAttributes } from 'react';
import { Loading } from '../Loading';
import { Container } from './styles';

export type CoverProps = HTMLAttributes<HTMLDivElement> & {
	hasLoading?: boolean;
	addStyleDefault?: boolean;
}

export function Cover({
	addStyleDefault = false, 
	hasLoading, 
	children, 
	...rest 
}: CoverProps) {
	return (
		<Container 
			addStyleDefault={addStyleDefault}
			hasLoading={hasLoading}
			{...rest}
		>
			{hasLoading ? (
				<Loading 
					size={48}
				/>
			) : children}
		</Container>
	)
}