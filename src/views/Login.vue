<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="login-card">
    <div class="login-form">
      <div class="logo">
        <img src="/src/assets/sae-logo.png" alt="SAE Logo" />
      </div>
      
      <h2>PORTAL DE INSCRIPCIONES</h2>
      
      <div class="form-section">
        <div class="form-group">
          <label for="usuario">Nombre de usuario</label>
          <input type="text" id="usuario" name="usuario" />
        </div>
        
        <div class="form-group">
          <label for="contrasena">Contraseña</label>
          <div class="password-input">
            <input type="password" id="contrasena" name="contrasena" />
            <Icon icon="mdi:eye-off" class="eye-icon" />
          </div>
        </div>
        
        <div class="links">
          <a href="#" class="forgot-password">
            <Icon icon="mdi:help-circle-outline" class="link-icon" />
            ¿Olvidaste la contraseña?
          </a>
          <a href="#" class="register-link">
            <Icon icon="mdi:account-plus-outline" class="link-icon" />
            Registrarse
          </a>
        </div>
        
        <div class="button-container">
          <button class="login-button">
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
    
    <div class="login-image">
      <img src="/src/assets/campus.png" alt="Campus SAE" />
    </div>
  </div>
</template>

<style scoped>
.login-card {
  width: 100%;
  max-width: 1440px;
  max-height: 1320px;
  display: flex;
  background-color: white;
  border-radius: 25px;
  box-shadow: 0 15px 50px -10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  margin: 40px auto;
  gap: 0;
}

.login-form {
  flex: 0 0 40%;
  padding: 40px 0px 40px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;  
  max-width: 50%;
}

.logo {
  margin-bottom: 25px;
  text-align: center;
}

h2 {
  color: #2d6849;
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 40px 0;
  text-align: center;
}

.form-section {
  width: 100%;
  max-width: 350px;
}

.form-group {
  width: 100%;
  margin-bottom: 25px;
}

label {
  display: block;
  color: #333;
  font-size: 14px;
  margin-bottom: 8px;
  text-align: left;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 0;
  border: none;
  border-bottom: 2px solid #ddd;
  background-color: transparent;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-bottom-color: #2d6849;
}

.password-input {
  position: relative;
}

.eye-icon {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #999;
  font-size: 20px;
  transition: color 0.3s ease;
}

.eye-icon:hover {
  color: #2d6849;
}

.links {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 25px 0 35px 0;
  align-items: flex-end;
}

.links a {
  color: #2d6849;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.links a:hover {
  color: #1f4a33;
  text-decoration: underline;
}

.link-icon {
  font-size: 20px;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.login-button {
  background-color: #2d6849;
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  min-width: 180px;
  justify-content: center;
}

.login-button:hover {
  background-color: #1f4a33;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(45, 104, 73, 0.4);
}

.login-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 60px 80px 40px 0px;
  overflow: hidden;
  border-radius: 10px;
}

.login-image img {
  width: 100%;
  height: 100%;
  min-height: 600px;
  max-height: 800px;
  object-fit: contain;
  border-radius: 25px;
}
</style>
