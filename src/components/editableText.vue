<template>
	<div>
		<component :is="tag">{{newText}}</component>
		<button v-on:click="edit()" v-if="!editing">edit</button>
		<button v-on:click="save()" v-if="editing">save</button>
		<input type="text" v-model="newText" v-if="editing">
	</div>
</template>


<script>

    import { mapMutations } from 'vuex'

	export default {
		name: 'editableText',
		props: ['source','type','route','text','tag'],
		data () {
			return {
				editing: false,
				newText: this.text
			}
		},
		methods: {
			...mapMutations(['saveState']),
			edit: function() {
				this.editing = true;
			},
			save: function() {
				this.editing = false;
				this.saveState({'source':this.source, 'type':this.type, 'route':this.route, 'text':this.newText,});
			}
		}
	}

</script>