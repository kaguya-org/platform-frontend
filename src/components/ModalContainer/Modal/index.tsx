import { useBoolean } from '@/hooks';
import { forwardRef, ForwardRefRenderFunction, HtmlHTMLAttributes, useEffect, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import * as S from './styles';

export type ModalHandles = {
    openModal: () => void;
    closeModal: () => void;
    toggleModal: () => void;
    contains: (target: HTMLElement | null) => boolean;
};

type ModalProps = {
    content: string | JSX.Element;
} & HtmlHTMLAttributes<HTMLDivElement>;

const ModalFC: ForwardRefRenderFunction<ModalHandles, ModalProps> = ({ content }, ref) => {
    const fadeIn = useBoolean(false);
    const open = useBoolean(false);

    const modalRef = useRef<HTMLElement | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    const openModal = () => {
        open.changeToTrue();
        fadeIn.changeToTrue();
    }
    
    const closeModal = (force?: boolean) => {
        if (force) {
            open.changeToFalse();
        }
        fadeIn.changeToFalse();
    }

    function toggleModal() {
        if(open.state) {
            closeModal(true)
        } else {
            openModal();
        }
    }

    function contains(target: HTMLElement | null) {
      return !!modalRef.current?.contains(target);
    }

    useImperativeHandle(ref, () => ({
        closeModal,
        openModal,
        toggleModal,
        contains,
    }), [contains, openModal, closeModal, toggleModal]);

    const timeForComponentAnimationEnding = 310
    
    useEffect(() => {
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if(!fadeIn.state) {
            timeoutRef.current = setTimeout(() => {
                closeModal(true);
            }, timeForComponentAnimationEnding)
        }
    }, [fadeIn.state])

    return (
        <>
            {open.state && (
                <S.Container ref={modalRef} fadeOut={!fadeIn.state} >
                    {content}
                </S.Container>
            )}
        </>
    );
}

const Modal = forwardRef(ModalFC);

export { Modal };

