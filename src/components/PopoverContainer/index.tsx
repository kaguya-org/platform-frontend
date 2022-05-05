import { useBoolean } from '@/hooks';
import { HtmlHTMLAttributes, RefObject, useEffect, useLayoutEffect, useRef } from 'react';
import { Button } from '../Commons/Button';
import { Popover, PopoverHandles } from './Popover';
import { Container } from './styles';

type PopoverProps = {
    content: string | JSX.Element;
    triggerContent: string | JSX.Element;
} & HtmlHTMLAttributes<HTMLDivElement>;

const PopoverContainer: React.FC<PopoverProps> = ({ content, triggerContent, ...rest }) => {
    const popoverRef = useRef<PopoverHandles>(null);

    const callEvent = (event: MouseEvent) => {
        const target = event.target as PopoverHandles | null;
   
        if (
            target !== popoverRef.current
        ) {
            return popoverRef.current?.closePopover();
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', callEvent);

        return () => {
            document.removeEventListener('mousedown', callEvent);
        }
    }, [])

    return (
        <Container {...rest}>
            <Button 
                onClick={() => popoverRef.current?.changePopover()}  
                styleType='ternary'
            >
                {triggerContent}
            </Button>
            <Popover ref={popoverRef} content={content} />
        </Container>
    );
}


export { PopoverContainer };

