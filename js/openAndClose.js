const Modal = {
  modal: document.querySelector('.modal-overlay'),
  cancel: document.querySelector('.cancel'),
  open: document.querySelector('.new'),

  getClose() {
    return Modal.cancel.onclick = () => {
      Modal.modal.classList.toggle('active');
    }
    ;
  },

  openAndClose() {
    //Abrir modal
    //Adicinar a classe active ao modal
    Modal.open.onclick = () => {
      Modal.modal.classList.toggle('active');
    }
    
    Modal.cancel.onclick = () => {
      Modal.modal.classList.toggle('active');
    }
  },

}

Modal.openAndClose();

export {
  Modal
}