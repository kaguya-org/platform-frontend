import { useBoolean } from '@/hooks';
import { forwardRef, ForwardRefRenderFunction, useEffect, useImperativeHandle, useRef } from 'react';
import * as S from './styles';

export type PopoverHandles = {
    openPopover: () => void;
    closePopover: () => void;
    changePopover: () => void;
}

type PopoverProps = {
    content: string | JSX.Element;
}

const PopoverFC: ForwardRefRenderFunction<PopoverHandles, PopoverProps> = ({ content }, ref) => {
    const isAnimate = useBoolean(false);
    const isOpen = useBoolean(false);
    
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

    useImperativeHandle(ref, () => ({
        closePopover,
        openPopover,
        changePopover,
    }), [openPopover, closePopover, changePopover]);

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
                <>
                    <S.Container fadeout={!isAnimate.state} >
                        {content}
                    </S.Container>
                </>
            )}
        </>
    );
}

const Popover = forwardRef(PopoverFC);

export { Popover };

