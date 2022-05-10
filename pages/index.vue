<template>
    <div id="home">
        <section style="position: relative; z-index: 1;">
            <div class="column">
                <form>
                    <b-alert show variant="danger" v-show="error">{{ error }}</b-alert>
                    <div>
                        <b-input-group>
                            <b-form-input
                                autocomplete="new-password"
                                size="lg"
                                placeholder="Introduce una dirección ..."
                                v-model="address"
                                id="autocomplete"></b-form-input>
                            <!-- 
                            <b-input-group-append>
                                <b-button variant="success" @click="locatorButtonPressed">
                                    <b-icon icon="search"></b-icon>
                                </b-button>
                            </b-input-group-append> 
                            -->
                        </b-input-group>
                    </div>
                    <b-row class="mt-3" v-show="addressSelected">
                        <b-col cols="6">
                            <b-button class="btn-favorite" :class="{ 'is-favorite': favorite }" block @click="addOrRemoveFavorite">
                                <b-icon icon="heart"></b-icon>
                                <span class="ml-2">{{ favorite ? 'Eliminar de favoritos' : 'Agregar a favoritos' }}</span>
                            </b-button>
                        </b-col>
                        <b-col cols="6">
                            <b-button class="btn-view-weather" block @click="showModal('weather-modal')">
                                <b-icon icon="clouds"></b-icon>
                                <span class="ml-2">Ver clima</span>
                            </b-button>
                        </b-col>
                    </b-row>
                </form>
            </div>
        </section>
        <section id="map"></section>
        
        <b-modal ref="weather-modal" hide-footer title="INFORMACIÓN DEL CLIMA" size="lg" v-if="weatherJson">
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
    import axios from "axios";

    export default {
        data() {
            return {
                error: '',
                address: '',
                addressSave: '',
                favorite: false,
                addressSelected: false,
                weatherJson: null,

                latitude: null,
                longitude: null
            }
        },
        mounted() {
            let autocomplete = new google.maps.places.Autocomplete(
                document.getElementById("autocomplete"),
                /*{
                    bounds: new google.maps.LatLngBounds(
                        new google.maps.LatLng(-12.0815616, -77.0441216)
                    )
                }*/
            );

            autocomplete.addListener("place_changed", () => {
                let place = autocomplete.getPlace();
                console.log('place', place);
                this.addressSelected = true;
                //console.log('formatted_address', place.formatted_address);
                this.addressSave = place.formatted_address;
                //console.log('place.geometry.location.lat()', place.geometry.location.lat());
                //console.log('place.geometry.location.lng()', place.geometry.location.lng());
                this.showUserLocationOnTheMap(place.geometry.location.lat(), place.geometry.location.lng());
            });
        },
        watch: {
            address (newValue){
                if (newValue == ''){
                    document.getElementById("map").innerHTML = '';
                    this.addressSelected = false;
                    this.weatherJson = null;
                }
            }
        },
        methods: {
            /*
            locatorButtonPressed() {
                if (navigator.geolocation){
                    
                    navigator.geolocation.getCurrentPosition(
                        position => {
                            this.getStreetAddressFrom(position.coords.latitude, position.coords.longitude);
                            this.showUserLocationOnTheMap(position.coords.latitude, position.coords.longitude);
                        },
                        error => {
                            this.error = error.message;
                        }
                    );

                } else {
                    this.error = 'Falta activar la geolocalización de tu navegador.';
                }
            },
            */
            formattedDate (date){
                return moment(date).format('DD/MM/YYYY HH:mm:ss')
            },
            async getStreetAddressFrom (lat, long) {
                try {
                    var {
                        data
                    } = await axios.get(
                        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
                        lat +
                        "," +
                        long +
                        "&key=AIzaSyB794yCkFpBgOFULAG3jAlqIFf11YInnak"
                    );

                    //console.log('data', data);

                    if (data.error_message) {
                        this.error = data.error_message;
                    } else {
                        this.address = data.results[0].formatted_address;
                    }
                } catch (error) {
                    this.error = error.message;
                }
            },
            async showUserLocationOnTheMap (lat, long){
                let map = new google.maps.Map(document.getElementById("map"), {
                    zoom: 15,
                    center: new google.maps.LatLng(lat, long),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

                new google.maps.Marker({
                    position: new google.maps.LatLng(lat, long),
                    map
                });

                this.latitude = lat;
                this.longitude = long;
                
                await this.saveSearch();
                await this.validateIsFavorite();
            },
            async saveSearch (){
                try {

                    let data = { latitude: this.latitude, longitude: this.longitude, address: this.addressSave };
                    let response = await this.$axios.post(`/dashboard/weather/save-search`, data);

                    //console.log('response.data', response.data);
                    this.weatherJson = response.data.data;
                    this.$toast.success(response.data.message);

                } catch (err) {
                    this.$toast.error(err.response.data.message);
                }
            },
            async validateIsFavorite (){
                let response = await this.$axios.get(`/dashboard/weather/validate-favorite?latitude=${this.latitude}&longitude=${this.longitude}`);
                this.favorite = response.data;
            },
            async addOrRemoveFavorite (){
                try {

                    let data = { latitude: this.latitude, longitude: this.longitude, address: this.addressSave, favorite: this.favorite };
                    let response = await this.$axios.put(`/dashboard/weather/favorite`, data);

                    this.favorite = !response.data.favorite;

                    this.$toast.success(response.data.message);

                } catch (err) {
                    this.$toast.error(err.response.data.message);
                }
            },
            showModal(modal) {
                this.$refs[modal].show();
            },
            hideModal(modal) {
                this.$refs[modal].hide();
            }
        }
    }

</script>

<style>

    .pac-icon {
        display: none;
    }

    .pac-item {
        padding: 10px;
        font-size: 16px;
        cursor: pointer;
    }

    .pac-item:hover {
        background-color: #ececec;
    }

    .pac-item-query {
        font-size: 16px;
    }

    #map {
        position: absolute;
        top: 260px;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .weather-list-info {
        text-align: left;
    }

</style>