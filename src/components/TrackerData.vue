<template>
	<div class="Tracker">
		
        <editableText source="TrackerData" type="name" :route="route" :text="TrackerData.name" pol="TrackerData.name" tag="h1" v-on:saveText="saveText"></editableText>
        
        <editableText source="TrackerData" type="description" :route="route" :text="TrackerData.description" tag="h3" ></editableText>

        <br><br>

        <router-link :to="{name:'Trackers'}"> GO BACK</router-link>
        <button v-on:click="deleteAllEntries">Clear all</button>
        <ul>
            <li class="entries" v-for="(value, index) in TrackerData.values">
                <span v-if="!value.edit">{{value.key}} : {{value.value}}</span>
                <input type="text" v-if="value.edit" v-model="value.key">
                <input type="number" v-if="value.edit" v-model="value.value">
                <button v-on:click="editNewEntry(index)" v-if="!value.edit">edit</button>
                <button v-on:click="editNewEntry(index)" v-if="value.edit">save</button>
                <button v-on:click="deleteEntry(index)">X</button>
            </li>
        </ul>
        <br>
        <form v-on:submit="addValue">
            <input type="text" name="TrackerData.newKey" v-model="TrackerData.newKey" placeholder="Log a new entry" required> : <input type="number" name="TrackerData.newValue" v-model="TrackerData.newValue" placeholder="Add a number" required>
            <input type="submit">
        </form>
        <br>
        <MyChart :chartData="chartData" :options="TrackerData.options"></MyChart>
    </div>
</template>

<script>

    import MyChart from '@/components/MyChart'
    import editableText from '@/components/editableText'
    import { mapMutations } from 'vuex'

    export default {
        name: 'TrackerData',
        components : {
            MyChart,
            editableText
        },
        data () {
            return {
                route: this.$route.params.element,
            }
        },
        computed: {
            TrackerData: function() {
                return this.$store.getters.TrackerData(this.$route.params.element);
            },
            chartData: function() {
                var self = this;
                return {
                    labels: self.TrackerData.values.map(value => value.key),
                    datasets: [{
                       label: 'Data One',
                       backgroundColor: '#f87979',
                       pointBackgroundColor: 'white',
                       borderWidth: 1,
                       pointBorderColor: '#249EBF',
                       data: self.TrackerData.values.map(value => value.value)
                    }]
                }
            },
        },
        methods: {
            ...mapMutations(['editTrackerData','addTrackerData','deleteTrackerData','deleteAllTrackerData']),
            editNewEntry: function(index) {
                this.editTrackerData({'route':this.route, 'index':index});
            },
            saveText: function(newText) {
                console.log(this.TrackerData.name)
            },
            addValue: function(e) {
                e.preventDefault();
                this.addTrackerData(this.route);
            },
            deleteEntry: function(index) {
                this.deleteTrackerData(this.route, index);
            },
            deleteAllEntries: function() {
                this.deleteAllTrackerData(this.route);
            }
        }
    }
</script>