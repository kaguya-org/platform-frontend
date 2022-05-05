import { useBoolean } from '@/hooks';
import { forwardRef, ForwardRefRenderFunction, useEffect, useImperativeHandle, useRef } from 'react';
import * as S from './styles';

export type PopoverHandles = {
    openPopover: () => void;
    closePopover: () => void;
    togglePopover: () => void;
}

type PopoverProps = {
    content: string | JSX.Element;
}

const PopoverFC: ForwardRefRenderFunction<PopoverHandles, PopoverProps> = ({ content }, ref) => {
    const isOpen = useBoolean(false);
    const isForceClose = useBoolean(true);
    
    const togglePopover = () => {
        if(isOpen.state) {
            closePopover()
        } else {
            openPopover()
        }
    }

    const openPopover = () => {
        isOpen.changeToTrue();
        isOpen.changeToTrue();
        isForceClose.changeToFalse();
    }
    
    const closePopover = (force?: boolean) => {
        if (force) {
            isForceClose.changeToTrue();
        }
        isOpen.changeToFalse();
    }

    useImperativeHandle(ref, () => ({
        closePopover,
        openPopover,
        togglePopover,
    }), [openPopover, closePopover, togglePopover]);


    useEffect(() => {
        if(!isOpen.state) {
            setTimeout(() => {
                closePopover(true);
            }, 310)
        }
    }, [isOpen.state])


    return (
        <>
            {!isForceClose.state && (
                <>
                    <S.Container fadeout={!isOpen.state} >
                        {content}
                    </S.Container>
                </>
            )}
        </>
    );
}

const Popover = forwardRef(PopoverFC);

export { Popover };

