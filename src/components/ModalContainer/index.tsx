import { useEffect, useRef } from 'react';
import { Button } from '../Commons/Button';
import { Modal, ModalHandles } from './Modal';

type ModalProps = {
    content: string | JSX.Element;
    type: 'primary' | 'secondary' | 'ternary' | 'quaternary' | 'quiternary';
    triggerContent: string | JSX.Element;
};

const ModalContainer: React.FC<ModalProps> = ({ content, type, triggerContent }) => {
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
                styleType={type}
                onClick={() => modalRef.current?.toggleModal()}
            >
                {triggerContent}
            </Button>
            <Modal ref={modalRef} content={content} />
        </>
    )
       
}


export { ModalContainer };

