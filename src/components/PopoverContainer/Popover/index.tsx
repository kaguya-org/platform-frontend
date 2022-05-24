import { useBoolean } from '@/hooks';
import { forwardRef, ForwardRefRenderFunction, HtmlHTMLAttributes, useEffect, useImperativeHandle, useRef } from 'react';
import * as S from './styles';

export type PopoverHandles = {
    openPopover: () => void;
    closePopover: () => void;
    togglePopover: () => void;
    contains: (target: HTMLElement | null) => boolean;
};

type PopoverProps = {
    content: string | JSX.Element;
} & HtmlHTMLAttributes<HTMLDivElement>;

const PopoverFC: ForwardRefRenderFunction<PopoverHandles, PopoverProps> = ({ content }, ref) => {
    const fadeIn = useBoolean(false);
    const open = useBoolean(false);
    const popoverRef = useRef<HTMLElement | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    const openPopover = () => {
        fadeIn.changeToTrue();
        open.changeToTrue();
    }
    
    const closePopover = (force?: boolean) => {
        if (force) {
            open.changeToFalse();
        }
        fadeIn.changeToFalse();
    }

    function togglePopover() {
        if(open.state) {
            closePopover(true)
        } else {
            openPopover();
        }
    }

    function contains(target: HTMLElement | null) {
      return !!popoverRef.current?.contains(target);
    }

    useImperativeHandle(ref, () => ({
        closePopover,
        openPopover,
        togglePopover,
        contains,
    }), [contains, openPopover, closePopover, togglePopover]);

    const timeForComponentAnimationEnding = 310
    
    useEffect(() => {
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if(!fadeIn.state) {
            timeoutRef.current = setTimeout(() => {
                closePopover(true);
            }, timeForComponentAnimationEnding)
        }
    }, [fadeIn.state])

    return (
        <>
            {open.state && (
                <S.Container ref={popoverRef} fadeout={!fadeIn.state} >
                    {content}
                </S.Container>
            )}
        </>
    );
}

const Popover = forwardRef(PopoverFC);

export { Popover };

