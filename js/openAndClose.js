const modal = document.querySelector('.modal-overlay');
const cancel = document.querySelector('.cancel');
const open = document.querySelector('.new');

const Modal = {

  //Abrir modal
  //Adicinar a classe active ao modal
  open() {
    open.onclick = () => {
      modal.classList.toggle('active');
    }
  },

  close() {
    cancel.onclick = () => {
      modal.classList.toggle('active');
    }
  },
  salveAndClose() {
    modal.classList.toggle('active')
  },

  execute() {
    Modal.open();
    Modal.close();
  }

}
Modal.execute();

export {
  Modal
}