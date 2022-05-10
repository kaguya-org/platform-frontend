import { useBoolean } from '@/hooks';
import { forwardRef, ForwardRefRenderFunction, HtmlHTMLAttributes, useEffect, useImperativeHandle, useRef } from 'react';
import * as S from './styles';

export type PopoverHandles = {
    openPopover: () => void;
    closePopover: () => void;
    changePopover: () => void;
    contains: (target: HTMLElement | null) => boolean;
};

type PopoverProps = {
    content: string | JSX.Element;
} & HtmlHTMLAttributes<HTMLDivElement>;

const PopoverFC: ForwardRefRenderFunction<PopoverHandles, PopoverProps> = ({ content, id }, ref) => {

    const isAnimate = useBoolean(false);
    const isOpen = useBoolean(false);
    const popoverRef = useRef<HTMLElement | null>(null);
    
    const openPopover = () => {
        isAnimate.changeToTrue();
        isOpen.changeToTrue();
    }
    
    const closePopover = (force?: boolean) => {
        if (force) {
            isOpen.changeToFalse();
        }
        isAnimate.changeToFalse();
    }

    function changePopover() {
        if(isOpen.state) {
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
        changePopover,
        contains,
    }), [contains, openPopover, closePopover, changePopover]);

    useEffect(() => {
        if(!isAnimate.state) {
            setTimeout(() => {
                closePopover(true);
            }, 310)
        }
    }, [isAnimate.state])

    return (
        <>
            {isOpen.state && (
                <S.Container ref={popoverRef}  id={id} fadeout={!isAnimate.state} >
                    {content}
                </S.Container>
            )}
        </>
    );
}

const Popover = forwardRef(PopoverFC);

export { Popover };

