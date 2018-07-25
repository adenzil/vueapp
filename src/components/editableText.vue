<template>
	<div>
		<component :is="tag">{{newText}}</component>
		<button v-on:click="edit()" v-if="!editing">edit</button>
		<button v-on:click="save()" v-if="editing">save</button>
		<input type="text" v-model="newText" v-if="editing">
	</div>
</template>


<script>
	
	export default {
		name: 'editableText',
		props: ['text','tag','pol'],
		data () {
			return {
				editing: false,
				newText: this.text
			}
		},
		methods: {
			edit: function() {
				this.editing = true;
			},
			save: function() {
				this.editing = false;
				console.log(this.pol,this.tag)
				this.$emit('saveText', this.newText);
			}
		}
	}

</script>