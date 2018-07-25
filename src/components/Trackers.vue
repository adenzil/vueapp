<template>
	<div class="Element">
        <editableText :text="Trackers.name" tag="h1"></editableText>
        <editableText :text="Trackers.description" tag="h3"></editableText>
        <ul>
            <li class="entries" v-for="(value, index) in Trackers.values">
                <router-link :to="value">{{value}}</router-link>
                <button v-on:click="deleteEntry(index,value)">X</button>
            </li>
        </ul>
        <form v-on:submit="addElement">
            <input type="text" name="Trackers.newValue" v-model="Trackers.newValue">
            <input type="submit">
        </form>
    </div>
</template>

<script>

    import editableText from '@/components/editableText'

    export default {
        name: 'Trackers',
        components : {
            'editableText': editableText
        },
        data () {
            return {
                Trackers: {
                    name: 'Trackers',
                    description: 'These are all your trackers',
                    values: [],
                    newValue:null,
                },
                storage: 'Trackers'
            }
        },
        mounted() {
            // var ls = localStorage.getItem('Trackers');
            // if(ls != null) {
            //     if(typeof(JSON.parse(ls)) === 'object') {
            //         this.Trackers = JSON.parse(ls);
            //     }
            // }
            var localData = this.getFromLocalStorage();
            if(localData) {
                this.Trackers = this.getFromLocalStorage();
            }
        },
        methods: {
            addElement: function(e) {
                e.preventDefault();
                if(!this.Trackers.values.includes(this.Trackers.newValue)) {
                    this.Trackers.values.push(this.Trackers.newValue);
                    this.Trackers.newValue = null;
                    this.saveToLocalStroage();
                }else {
                    alert('Tracker already exists');
                }
            },
            deleteEntry: function(index,value) {
                this.Trackers.values.splice(index,1);
                this.saveToLocalStroage();
                this.deleteAllEntries(value);
            },
            // Delete all entries for a tracker
            deleteAllEntries: function(value) {
                console.log(value);
                this.TrackerData = this.getFromLocalStorage('TrackerData');
                delete this.TrackerData[value];
                this.saveToLocalStroage('TrackerData',this.TrackerData);
            },
            saveToLocalStroage: function(key,value) {
                if(!key) {
                    key = this.storage
                }
                if(!value) {
                    value = this.Trackers;
                }
                var value = JSON.stringify(value);
                localStorage.setItem(key,value);
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
                                return this.Trackers
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