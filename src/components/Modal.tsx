import ctl from "@netlify/classnames-template-literals";
import { ReactNode } from "react";

interface Props {
  active: boolean;
  closeModal: () => void;
  children: ReactNode;
  size?: string;
}

const modalBackgroundStyle = ctl(`
  h-screen 
  w-screen 
  fixed 
  top-0 
  left-0 
  flex 
  justify-center 
  items-center 
  transition 
  backdrop-blur-sm
  bg-black/25`);

const Modal = ({ active, closeModal, children, size = "medium" }: Props) => {
  const modalStyle = ctl(`
    ${modalBackgroundStyle} 
    ${
      active
        ? "opacity-100 pointer-events-all"
        : "opacity-0 pointer-events-none bg-black/0"
    }
  `);

  return (
    <div className={modalStyle} onClick={closeModal}>
      <div className="rounded-lg bg-white" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
