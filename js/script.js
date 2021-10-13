document.addEventListener('DOMContentLoaded', () => {

  const model = document.querySelector('.modal-overlay')
  const cancel = document.querySelector('.cancel')
  const open = document.querySelector('.new')

  const Modal = {
    open() {
      //Abrir modal
      //Adicinar a classe active ao modal

      open.onclick = () => {
        model.classList.add('active');
      }

    },

    close() {
      //Fechar o modal
      //Remover a classe active do modal
      cancel.onclick = () => {
        model.classList.remove('active');
      }
    }
  }

  Modal.open();
  Modal.close();


})