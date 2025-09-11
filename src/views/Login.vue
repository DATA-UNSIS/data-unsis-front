<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'

const router = useRouter();

function login() {
  console.log('Iniciar sesión');
  router.push('/alumnos');
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-form">
        <div class="logo">
          <img src="/src/assets/logo.png" alt="Escudo de la Universidad de la Sierra Sur" />
        </div>
        
        <h2>PORTAL DE ESTADISTICAS</h2>
        
        <div class="form-section">
          <div class="form-group">
            <label for="usuario">Nombre de usuario</label>
            <input type="text" id="usuario" name="usuario" placeholder="Ingresa tu nombre de usuario" />
          </div>
          
          <div class="form-group">
            <label for="contrasena">Contraseña</label>
            <div class="password-input">
              <input type="password" id="contrasena" name="contrasena" placeholder="Ingresa tu contraseña" />
              <Icon icon="mdi:eye-off" class="eye-icon" />
            </div>
          </div>
          
          <div class="button-container">
            <button class="login-button" @click="login()">
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
      
      <div class="login-image">
        <img src="/src/assets/campus.png" alt="Imagen animada del campus de la Universidad de la Sierra Sur" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Container principal para centrado perfecto */
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #2d6849 0%, #1f4a33 100%);
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
}

/* Base styles */
.login-card {
  width: 100%;
  max-width: 1200px;
  min-height: 600px;
  display: flex;
  background-color: white;
  border-radius: 25px;
  box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  gap: 0;
  position: relative;
}

.login-form {
  flex: 0 0 45%;
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  min-height: 600px;
}

.logo {
  margin-bottom: 25px;
  text-align: center;
}

.logo img {
  max-width: 120px;
  height: auto;
  transition: transform 0.3s ease;
}

.logo img:hover {
  transform: scale(1.05);
}

h2 {
  color: #2d6849;
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 40px 0;
  text-align: center;
  line-height: 1.3;
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
  font-weight: 500;
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
  transition: all 0.3s ease;
  box-sizing: border-box;
  min-height: 44px;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-bottom-color: #2d6849;
  transform: translateY(-1px);
}

input[type="text"]::placeholder,
input[type="password"]::placeholder {
  color: #999;
  font-size: 14px;
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
  transition: all 0.3s ease;
  padding: 8px;
  border-radius: 50%;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.eye-icon:hover {
  color: #2d6849;
  background-color: rgba(45, 104, 73, 0.1);
}

.links {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 25px 0 35px 0;
  align-items: flex-end;
}

.links a {
  color: #2d6849;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 6px;
  min-height: 44px;
}

.links a:hover {
  color: #1f4a33;
  background-color: rgba(45, 104, 73, 0.1);
  transform: translateX(-2px);
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
  min-height: 48px;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(45, 104, 73, 0.2);
}

.login-button:hover {
  background-color: #1f4a33;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(45, 104, 73, 0.4);
}

.login-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(45, 104, 73, 0.2);
}

.login-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  overflow: hidden;
  position: relative;
  border-radius: 25px;
}

.login-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.login-image img {
  width: 90%;
  height: auto;
  min-height: 500px;
  max-height: 600px;
  object-fit: cover;
  border-radius: 25px;
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
  margin: 0 auto;
  display: block;
}

.login-image img:hover {
  transform: scale(1.02);
}

/* Large tablets and small desktops */
@media (max-width: 1024px) {
  .login-container {
    padding: 15px;
  }
  
  .login-card {
    max-width: 100%;
    min-height: 500px;
  }
  
  .login-form {
    padding: 40px 30px;
  }
  
  .login-image {
    padding: 30px;
  }
  
  .login-image img {
    min-height: 400px;
    max-height: 500px;
  }
  
  h2 {
    font-size: 22px;
  }
}

/* Tablets */
@media (max-width: 768px) {
  .login-container {
    padding: 10px;
    align-items: flex-start;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  
  .login-card {
    flex-direction: column;
    max-width: 100%;
    min-height: auto;
    border-radius: 20px;
    margin: 0;
  }
  
  .login-form {
    flex: none;
    padding: 40px 30px;
    min-height: auto;
    order: 1;
  }
  
  .login-image {
    flex: none;
    padding: 30px 20px;
    min-height: 300px;
    order: 2;
  }
  
  .login-image img {
    min-height: 250px;
    max-height: 400px;
    border-radius: 20px;
  }
  
  h2 {
    font-size: 20px;
    margin-bottom: 35px;
  }
  
  .logo img {
    max-width: 100px;
  }
  
  .form-section {
    max-width: 400px;
  }
  
  .links {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }
  
  .links a {
    font-size: 13px;
    padding: 6px 10px;
  }
}

/* Mobile landscape and small tablets */
@media (max-width: 640px) {
  .login-container {
    padding: 8px;
    align-items: flex-start;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  
  .login-card {
    border-radius: 15px;
    margin: 0;
  }
  
  .login-form {
    padding: 30px 25px;
  }
  
  .login-image {
    padding: 25px 15px;
    min-height: 250px;
  }
  
  .login-image img {
    min-height: 200px;
    max-height: 300px;
    border-radius: 15px;
  }
  
  h2 {
    font-size: 18px;
    margin-bottom: 30px;
  }
  
  .logo img {
    max-width: 90px;
  }
  
  .form-section {
    max-width: 100%;
  }
  
  .links {
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
  }
}

/* Mobile portrait */
@media (max-width: 480px) {
  .login-container {
    padding: 5px;
    align-items: flex-start;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  
  .login-card {
    border-radius: 12px;
    margin: 0;
  }
  
  .login-form {
    padding: 25px 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    font-size: 13px;
    margin-bottom: 6px;
  }
  
  input[type="text"],
  input[type="password"] {
    padding: 10px 0;
    font-size: 16px; /* Prevent zoom on iOS */
    min-height: 48px;
  }
  
  h2 {
    font-size: 18px;
    margin-bottom: 25px;
    line-height: 1.2;
  }
  
  .logo {
    margin-bottom: 20px;
  }
  
  .logo img {
    max-width: 80px;
  }
  
  .links {
    gap: 10px;
    margin: 20px 0 30px 0;
  }
  
  .links a {
    font-size: 12px;
    padding: 8px 10px;
    min-height: 40px;
  }
  
  .link-icon {
    font-size: 18px;
  }
  
  .login-button {
    padding: 12px 28px;
    font-size: 15px;
    min-width: 160px;
    min-height: 48px;
  }
  
  .login-image {
    padding: 20px 15px;
    min-height: 200px;
  }
  
  .login-image img {
    min-height: 180px;
    max-height: 250px;
    border-radius: 12px;
  }
  
  .eye-icon {
    min-width: 40px;
    min-height: 40px;
    font-size: 18px;
  }
}

/* Very small screens */
@media (max-width: 360px) {
  .login-container {
    padding: 3px;
    align-items: flex-start;
    padding-top: 8px;
    padding-bottom: 8px;
  }
  
  .login-card {
    border-radius: 10px;
    margin: 0;
  }
  
  .login-form {
    padding: 20px 15px;
  }
  
  h2 {
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  .logo {
    margin-bottom: 15px;
  }
  
  .logo img {
    max-width: 70px;
  }
  
  .form-group {
    margin-bottom: 18px;
  }
  
  .form-group label {
    font-size: 12px;
  }
  
  input[type="text"],
  input[type="password"] {
    font-size: 15px;
    min-height: 44px;
  }
  
  .links a {
    font-size: 11px;
    padding: 6px 8px;
    min-height: 36px;
  }
  
  .login-button {
    padding: 10px 24px;
    font-size: 14px;
    min-width: 140px;
    min-height: 44px;
  }
  
  .login-image {
    padding: 15px 10px;
    min-height: 180px;
  }
  
  .login-image img {
    min-height: 160px;
    max-height: 220px;
    border-radius: 10px;
  }
}

/* Extra small screens */
@media (max-width: 320px) {
  .login-container {
    padding: 2px;
    align-items: flex-start;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  
  .login-card {
    margin: 0;
  }
  
  .login-form {
    padding: 15px 12px;
  }
  
  h2 {
    font-size: 15px;
  }
  
  .logo img {
    max-width: 60px;
  }
  
  .form-section {
    max-width: 100%;
  }
  
  .login-button {
    min-width: 120px;
    padding: 8px 20px;
    font-size: 13px;
  }
}
</style>
