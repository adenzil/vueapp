<template>
	<div class="Element">
        <editableText source="Trackers" type="name" :text="Trackers.name" tag="h2"></editableText>
        <editableText source="Trackers" type="description" :text="Trackers.description" tag="h3"></editableText>
        <br>
        <button class="btn btn-danger" v-on:click="deleteAllTrackers()">Delete all trackers</button>
        <br>
        <br>
        <ul class="list-group">

            <router-link class="list-group-item d-flex align-items-center" v-for="(value, index) in Trackers.values" tag="li" :to="index" :key="index">
                <span>{{ index }}</span>
                <div class="ml-auto">
                    <span class="badge badge-primary badge-pill">{{value.values.length}}</span>
                    <button class="badge badge-danger badge-pill btn btn-danger" v-on:click="deleteEntry(index,value,$event)">X</button>
                </div>
            </router-link>
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
            deleteEntry: function(index,value,e) {
                e.preventDefault();
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