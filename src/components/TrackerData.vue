<template>
	<div class="Tracker">
		
        <editableText source="TrackerData" type="name" :route="$route.params.element" :text="TrackerData.name" pol="TrackerData.name" tag="h2" v-on:saveText="saveText"></editableText>
        
        <editableText source="TrackerData" type="description" :route="$route.params.element" :text="TrackerData.description" tag="h3" ></editableText>

        <br><br>

        <router-link class="btn btn-secondary" :to="{name:'Trackers'}"> GO BACK</router-link>
        <button class="btn btn-danger ml-3" v-on:click="deleteAllEntries">Clear all</button>
        <br><br>
        <ul class="list-group">
            <li class="entries list-group-item" v-for="(value, index) in TrackerData.values">
                <span v-if="!value.edit">{{value.key}} : {{value.value}}</span>
                <input type="text" v-if="value.edit" v-model="value.key">
                <input type="number" v-if="value.edit" v-model="value.value">
                <font-awesome-icon class="ml-2" v-on:click="editNewEntry(index)" v-if="!value.edit" icon="pen" />
                <Chrome v-if="value.edit" :value="TrackerData.backgroundColor" @input="updateColor($event,index)" class="m-3 ml-auto mr-auto"/>
                <font-awesome-icon class="ml-2" v-on:click="editNewEntry(index)" v-if="value.edit" icon="check" size="lg" />
                <font-awesome-icon class="ml-2" v-on:click="deleteEntry(index)" icon="times" size="lg" />
            </li>
        </ul>
        <br>
        <form v-on:submit="addValue">
            <input type="text" name="TrackerData.newKey" v-model="TrackerData.newKey" placeholder="Log a new entry" required> : <input type="number" name="TrackerData.newValue" v-model="TrackerData.newValue" placeholder="Add a number" required>
            <input class="btn btn-success ml-3" type="submit">
        </form>
        <br>
        <div class="container">
            <div class="row">
                <div class="col-4">
                    <h3>Change Chart : </h3>
                    <select v-bind:value="selectedChart" v-on:change="changeSelectedChart">
                        <option v-for="value in charts" :value="value">{{value}}</option>
                    </select>
                </div>
                <div class="col-8">
                    <h3>Change Background color : </h3>
                    <Chrome :value="TrackerData.backgroundColor" @input="updateValue" class="m-auto"/>
                </div>
            </div>
        </div>
        <br><br>
        <component v-bind:is="selectedChart" :chartData="chartData" :options="TrackerData.options"></component>
    </div>
</template>

<script>

    import { mapMutations } from 'vuex'
    import { Chrome } from 'vue-color'
    import * as charts from '@/components/chart/Bar'
    import editableText from '@/components/editableText'

    export default {
        name: 'TrackerData',
        components : {
            ...charts,
            editableText,
            Chrome,
        },
        computed: {
            TrackerData: function() {
                return this.$store.getters.TrackerData(this.$route.params.element);
            },
            chartData: function() {     
                return this.$store.getters.getChartData(this.TrackerData);
            },
            charts: function(){
                return Object.keys(charts);
            },
            selectedChart: function() {
                return this.TrackerData.options.type;
            }
        },
        methods: {
            ...mapMutations(['editTrackerData','addTrackerData','deleteTrackerData','deleteAllTrackerData','updateChartType','updateBackgroundColor','updateEntryColor']),
            editNewEntry: function(index) {
                this.editTrackerData({'route':this.$route.params.element, 'index':index});
            },
            saveText: function(newText) {
                console.log(this.TrackerData.name)
            },
            addValue: function(e) {
                e.preventDefault();
                this.addTrackerData(this.$route.params.element);
            },
            deleteEntry: function(index) {
                this.deleteTrackerData(this.$route.params.element, index);
            },
            deleteAllEntries: function() {
                this.deleteAllTrackerData(this.$route.params.element);
            },
            changeSelectedChart: function(value,vl) {
                this.updateChartType({route: this.$route.params.element, value: value.target.value})
            },
            updateColor: function(color,index) {
                this.updateEntryColor({route: this.$route.params.element, index, color: color.hex});
            },
            updateValue: function(color) {
                this.updateBackgroundColor({route: this.$route.params.element, color: color.hex});
            }
        },
        mounted: function() {

        },
        watch: {
            colors: function(val) {
                console.log(val)
            }
        }
    }
</script>