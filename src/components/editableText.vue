<template>
	<div>
		<component :is="tag" v-if="!editing">{{newText}}
			<font-awesome-icon v-on:click="edit()" v-if="!editing" icon="pen" size="xs"/>
		</component>
		<input type="text" v-model="newText" v-if="editing">
		<font-awesome-icon class="ml-3" v-on:click="save()" v-if="editing" icon="check" size="lg"/>
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
				this.saveState({'source':this.source, 'type':this.type, 'route':this.route, 'text':this.newText});
			}
		}
	}

</script>