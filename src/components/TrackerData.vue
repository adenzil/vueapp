<template>
	<div class="Tracker">
		
        <div>
            <!-- <h1>{{TrackerData.name}}</h1>
            <button v-on:click="editName" value="edit" v-if="!newName">Edit name</button>
            <button v-on:click="saveName" value="edit" v-if="newName">save</button>
            <input type="text" v-model="TrackerData.name" v-if="newName"> -->

            <editableText :text="TrackerData.name" pol="TrackerData" tag="h1" v-on:saveText="saveText"></editableText>

        </div>
        
        <div>
          <!--   <h3>{{TrackerData.description}}</h3>
            <button v-on:click="editDescription" value="edit" v-if="!newDescription">Edit Description</button>
            <button v-on:click="saveDescription" value="edit" v-if="newDescription">save</button>
            <input type="text" v-model="TrackerData.description" v-if="newDescription"> -->
            
            <editableText :text="TrackerData.description" tag="h3" ></editableText>

        </div>

        <br><br><br>

        <router-link :to="{name:'Trackers'}"> GO BACK</router-link>
        <button v-on:click="deleteAllEntries">Clear all</button>
        <ul>
            <li class="entries" v-for="(value, index) in TrackerData.values">
                <span v-if="!editEntry">{{value.key}} : {{value.value}}</span>
                <input type="text" v-if="editEntry" v-model="value.key">
                <input type="number" v-if="editEntry" v-model="value.value">
                <button v-on:click="editNewEntry()" v-if="!editEntry">edit</button>
                <button v-on:click="saveNewEntry(index,value.key,value.value)" v-if="editEntry">save</button>
                <button v-on:click="deleteEntry(index)">X</button>
            </li>
        </ul>
        <form v-on:submit="addValue">
            <input type="text" name="TrackerData.newKey" v-model="TrackerData.newKey"> : <input type="number" name="TrackerData.newValue" v-model="TrackerData.newValue">
            <input type="submit">
        </form>
        <MyChart :chartData="chartData" :options="TrackerData.options"></MyChart>
    </div>
</template>

<script>

    import MyChart from '@/components/MyChart'
    import editableText from '@/components/editableText'

    export default {
        name: 'TrackerData',
        components : {
            'MyChart': MyChart,
            'editableText': editableText
        },
        data () {
            return {
                TrackerData: {
                    name: 'Element',
                    description: 'Random values',
                    dataType: 'number',
                    values: [],
                    newKey: null,
                    newValue:null,
                    options: {
                        scales: {
                           yAxes: [{
                              ticks: {
                                 beginAtZero: true
                              },
                              gridLines: {
                                 display: true
                              }
                           }],
                           xAxes: [{
                              gridLines: {
                                 display: false
                              }
                           }]
                        },
                        legend: {
                           display: true
                        },
                        responsive: true,
                        maintainAspectRatio: false
                    }
                },
                route: this.$route.params.element,
                storage: 'TrackerData',
                newName: false,
                newDescription: false,
                editEntry: false
            }
        },
        mounted() {
            // var ls = localStorage.getItem('TrackerData');
            // if(ls != null) {
            //     if(typeof(JSON.parse(ls)) === 'object') {
            //         ls = JSON.parse(ls);
            //         if(this.route in ls) {
            //             this.TrackerData = ls[this.route];
            //         }
            //     }
            // }
            var localData = this.getFromLocalStorage(null,this.route);
            if(localData) {
                this.TrackerData = this.getFromLocalStorage(null,this.route);
            }
        },
        computed: {
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
            }
        },
        methods: {
            editName: function() {
                this.newName = true;
            },
            editDescription: function() {
                this.newDescription = true;
            },
            saveName: function() {
                this.saveToLocalStroage();
                this.newName = false;
            },
            saveDescription: function() {
                this.saveToLocalStroage();
                this.newDescription = false;
            },
            editNewEntry: function() {
                this.editEntry = true;
            },
            saveNewEntry: function(index,key,value) {
                this.TrackerData.values[index].key = key;
                this.TrackerData.values[index].value = value;
                this.saveToLocalStroage();
                this.editEntry = false;
            },
            saveText: function(newText) {
                console.log(this.TrackerData.name)
            },
            addValue: function(e) {
                e.preventDefault();
                var key = this.TrackerData.newKey;
                var value = this.TrackerData.newValue;
                if(key && value) {
                    this.TrackerData.values.push({'key':key,'value':value});
                    this.TrackerData.newKey = this.TrackerData.newValue = null;
                    this.saveToLocalStroage();
                }else {
                    alert('add valid inputs');
                }
            },
            deleteEntry: function(index) {
                this.TrackerData.values.splice(index,1);
                this.saveToLocalStroage();
            },
            deleteAllEntries: function() {
                this.TrackerData.values = [];
                this.saveToLocalStroage();
            },
            saveToLocalStroage: function(key,value) {
                if(!key) {
                    key = this.storage;
                }
                if(!value) {
                    value = this.getFromLocalStorage();
                    if(!value) {
                        value = null;
                    }
                    value[this.route] = this.TrackerData;
                }
                localStorage.setItem(key,JSON.stringify(value));
            },
            getFromLocalStorage: function(key,innerkey) {
                if(!key) {
                    key = this.storage;
                }
                var ls = localStorage.getItem(key);
                if(ls != 'null') {
                    if(typeof(JSON.parse(ls)) === 'object') {
                        ls = JSON.parse(ls);
                        if(innerkey){
                            if(innerkey in ls && Object.keys(ls[innerkey]).length !== 0) {
                                return ls[innerkey];
                            }else {
                                return this.TrackerData
                            }
                        }else {
                            return ls;
                        }
                    }
                }
            }
        }
    }
</script>