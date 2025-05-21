interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className='modal-box relative'
        style={{
          backgroundColor: 'whitesmoke',
          color: 'black',
          // display: 'flex',
          // alignItems: 'center'
          paddingLeft: '50px',
          paddingRight: '50px',
          // padding: '130px',
          width: '200%',
          translate: '0 0',
          scale: '.9',
          maxWidth: '40rem',
          opacity: '1',

        }}>
        <label
          onClick={() => setModalOpen(false)}
          className='btn btn-sm btn-circle absolute right-2 top-2 '
        >
          ✕
        </label>
        {children}
      </div>
    </div>
  );
};

export default Modal;
