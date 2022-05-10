<template>
    <div id="register">
        <section class="form-container">

        <form class="form">
            <h2 class="register-title">Registra tu cuenta</h2>

            <div class="form-field">
                <label>Nombre(s):</label>
                <b-form-input v-model="form.names"></b-form-input>
            </div>

            <div class="form-field">
                <label>Apellido(s):</label>
                <b-form-input v-model="form.surnames"></b-form-input>
            </div>

            <div class="form-field">
                <label>Correo:</label>
                <b-form-input v-model="form.email"></b-form-input>
            </div>
            
            <div class="form-field">
                <label>Contraseña:</label>
                <b-form-input v-model="form.password" type="password"></b-form-input>
            </div>

            <b-button class="submit-button" @click="registerForm">Registrarse</b-button>
        </form>
    
        </section>
    </div>
</template>

<script>

    export default {
        auth: 'guest',
        data() {
            return {
                form: {
                    names: '',
                    surnames: '',
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            validateFields (){
                if (this.form.surnames == '' || this.form.names == '' || this.form.email == '' || this.form.password == ''){
                    return false;
                }
                return true;
            },
            async registerForm (){

                if (this.validateFields()){

                    try {

                        await this.$axios.post('/dashboard/register', { data: this.form });
                        
                        this.$toast.success('Registro completado ...');

                        setTimeout(async () => {
                            await this.$router.push('/login');
                        }, 1000);

                    } catch (err) {
                        this.$toast.error(err.response.data.message);
                    }

                } else {
                    this.$toast.error('Complete todos los campos.');
                }

            }
        }
    }

</script>