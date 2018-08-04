<template>
	<div class="Element">
        <editableText source="Trackers" type="name" :text="Trackers.name" tag="h2"></editableText>
        <editableText source="Trackers" type="description" :text="Trackers.description" tag="h3"></editableText>
        <br>
        <button class="btn btn-danger" v-on:click="deleteAllTrackers()">Delete all trackers</button>
        <br>
        <br>
        <ul class="list-group">
            <li class="entries list-group-item d-flex justify-content-between align-items-center" v-for="(value, index) in Trackers.values">
                <router-link class="" :to="index">{{index}}</router-link>
                <span class="badge badge-primary badge-pill">{{value.values.length}}</span>
                <!-- <button v-on:click="deleteEntry(index,value)">X</button> -->
            </li>
        </ul>
        <br>
        <form v-on:submit="addElement">
            <input type="text" name="Trackers.newTrackerName" v-model="Trackers.newTrackerName" placeholder="Add new Tracker">
            <input type="submit">
        </form>
    </div>
</template>

<script>

    import editableText from '@/components/editableText'
    import { mapGetters } from 'vuex'
    import { mapMutations } from 'vuex'

    export default {
        name: 'Trackers',
        components : {
            'editableText': editableText
        },
        methods: {
            ...mapMutations(['deleteAllTrackers','addTracker','deleteTracker']),
            addElement: function(e) {
                e.preventDefault();
                this.addTracker();
            },
            deleteEntry: function(index,value) {
                this.deleteTracker(index);
            }
        },
        computed: {
            ...mapGetters(['Trackers'])
        }
    }
</script>

<style scoped>
    ul li{
        list-style-type: none;
    }
</style>