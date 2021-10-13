document.addEventListener('DOMContentLoaded', () => {

  const model = document.querySelector('.modal-overlay')
  const cancel = document.querySelector('.cancel')
  const open = document.querySelector('.new')

  const Modal = {
    openAndClose() {
      //Abrir modal
      //Adicinar a classe active ao modal
      open.onclick = () => {
        model.classList.toggle('active');
      }
      cancel.onclick = () => {
        model.classList.toggle('active');
      }
    },

  }

  Modal.openAndClose();


})