<template>
    <div id="favorites">
        <section>
            <h3>Listado de Mis Favoritos</h3>
            <template v-if="favorites.length">
                <b-card v-for="(favorite, index) in favorites" :key="index">
                    <b-row>
                        <b-col md="8" v-text="favorite.address"></b-col>
                        <b-col md="4">
                            <b-row>
                                <b-col cols="6">
                                    <b-button class="btn-favorite is-favorite" block @click="removeFavorite(favorite.id, favorite.latitude, favorite.longitude)">
                                        <b-icon icon="heart"></b-icon>
                                        <span class="ml-2">Eliminar</span>
                                    </b-button>
                                </b-col>
                                <b-col cols="6">
                                    <b-button class="btn-view-weather" block @click="viewWeather(favorite.latitude, favorite.longitude, favorite.address)">
                                        <b-icon icon="clouds"></b-icon>
                                        <span class="ml-2">Ver</span>
                                    </b-button>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-card>
            </template>
            <b-alert show variant="warning" v-else>Hasta el momento, no tienes favoritos. Realice su primera búsqueda y guárdelo como favorito: 

                <NuxtLink
                    to="/"
                >
                    Buscador
                </NuxtLink>
            </b-alert>
        </section>
        
        <b-modal ref="weather-modal-2" hide-footer title="INFORMACIÓN DEL CLIMA" size="lg" v-if="weatherJson">
            <div class="d-block text-center">
                <ul class="weather-list-info">
                    <li><strong>Dirección</strong>: {{ addressSave }}</li>
                    <li><strong>Última actualización</strong>: {{ formattedDate(weatherJson.current.last_updated) }}</li>
                    <li><strong>Temperatura</strong>: {{ weatherJson.current.temp_c }} °C</li>
                    <li><strong>Humedad</strong>: {{ weatherJson.current.humidity }}%</li>
                    <li><strong>Condición</strong>: {{ weatherJson.current.condition.text }}</li>
                </ul>

                <b-img :src="weatherJson.current.condition.icon" alt="clima" width="75" img-fluid></b-img>
            </div>
        </b-modal>
    </div>
</template>

<script>

    import moment from "moment";

    export default {
        data() {
            return {
                favorites: [],

                addressSave: '',
                weatherJson: null
            }
        },
        async mounted() {
            await this.getFavorites();
        },
        methods: {
            formattedDate (date){
                return moment(date).format('DD/MM/YYYY HH:mm:ss')
            },
            async getFavorites (){
                let response = await this.$axios.get('/dashboard/weather/favorites');
                this.favorites = response.data;
            },
            async viewWeather (latitude, longitude, address){
                try {

                    this.weatherJson = null;

                    let data = { latitude, longitude, address };

                    let response = await this.$axios.post(`/dashboard/weather/save-search`, data);

                    this.addressSave = address;
                    this.weatherJson = response.data.data;
                    this.$toast.success(response.data.message);

                    setTimeout(() => {
                        this.$refs['weather-modal-2'].show();
                    }, 1000);

                } catch (err) {
                    console.log('error?');
                    this.$toast.error(err.response.data.message);
                }
            },
            async removeFavorite (id, latitude, longitude){
                try {

                    let data = { latitude, longitude, favorite: true };
                    let response = await this.$axios.put(`/dashboard/weather/favorite`, data);

                    this.favorites = this.favorites.filter(i => i.id !== id);
                    this.$toast.success(response.data.message);

                } catch (err) {
                    this.$toast.error(err.response.data.message);
                }
            }
        }
    }

</script>