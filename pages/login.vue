<template>
    <div id="login">
        <section class="form-container">

        <form class="form">
            <h2 class="login-title">Ingresa a tu cuenta</h2>

            <div class="form-field">
                <label>Correo:</label>
                <b-form-input v-model="form.email"></b-form-input>
            </div>
            
            <div class="form-field">
                <label>Contraseña:</label>
                <b-form-input v-model="form.password" type="password"></b-form-input>
            </div>

            <b-button class="submit-button" @click="loginForm">Ingresar</b-button>
        </form>
    
        </section>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                form: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            validateFields (){
                if (this.form.email == '' || this.form.password == ''){
                    return false;
                }
                return true;
            },
            async loginForm (){

                if (this.validateFields()){

                    try {
                        
                        await this.$auth.loginWith('local', { data: this.form });

                        this.$toast.success('Ingresando ...');

                        setTimeout(() => {
                            window.location.href = '/';
                        }, 1000);

                    } catch (err) {
                        this.$toast.error(err.response.data.error.email[0]);
                    }

                } else {
                    this.$toast.error('Complete todos los campos.');
                }

            }
        }
    }

</script>