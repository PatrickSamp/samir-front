<template>
    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <!-- Conteúdo do popup aqui -->
        <div class="popup-title">
          <h2 >{{ popupTitle }}</h2>
        </div>
        <div class="popup-message">
          <p>{{ popupMessage }}</p>
        </div>
        <button @click="closePopup" class="popup-close-btn">Fechar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showPopup: {
        type: Boolean,
        required: true,
      },
      popupTitle: {
        type: String,
        required: true,
      },
      popupMessage: {
        type: String,
        required: true,
      },
    },
    methods: {
      closePopup() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilize o popup como desejar aqui */
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup-content {
    height: 250px;
    width: 350px;
    background-color: rgb(29, 45, 161);
    padding: 20px;
    border-radius: 5px;
  }

  .popup-close-btn {
    width: 100px;
    margin-top: 40px;
    margin-left: 25px;
    padding: 10px 0;
    background-color: #e60909;
    color: #fff;
    border: 0;
    outline: none;
    font-size: 18px;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
}

.popup-title{
  margin-left: 28px;
}

.popup-message{
  text-align: center;
}

  </style>