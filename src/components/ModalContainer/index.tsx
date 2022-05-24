import { SHADOW_COLORS } from '@/theme';
import { useEffect, useRef } from 'react';
import { Button } from '../Commons/Button';
import { Modal, ModalHandles } from './Modal';

type ModalProps = {
    content: string | JSX.Element;
    triggerContent: string | JSX.Element;
};

const ModalContainer: React.FC<ModalProps> = ({ content, triggerContent }) => {
    const modalRef = useRef<ModalHandles>(null);

    const callEvent = (event: MouseEvent) => {
        const target = event.target as HTMLElement | null;
        const wasClickedOutOfTheModal = !modalRef.current?.contains(target);
        
        if (wasClickedOutOfTheModal) {
            return modalRef.current?.closeModal();
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', callEvent);

        return () => {
            document.removeEventListener('mousedown', callEvent);
        }
    }, [])

    return (
        <>
            <Button
                onClick={() => modalRef.current?.toggleModal()}
            >
                {triggerContent}
            </Button>
            <Modal ref={modalRef} content={content} />
        </>
    )
       
}


export { ModalContainer };

