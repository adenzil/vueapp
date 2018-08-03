<template>
	<div class="Element">
        <editableText source="Trackers" type="name" :text="Trackers.name" tag="h1"></editableText>
        <editableText source="Trackers" type="description" :text="Trackers.description" tag="h3"></editableText>
        <br>
        <button v-on:click="deleteAllTrackers()">Delete all trackers</button>
        <ul>
            <li class="entries" v-for="(value, index) in Trackers.values">
                <router-link :to="index">{{index}}</router-link>
                <button v-on:click="deleteEntry(index,value)">X</button>
            </li>
        </ul>
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