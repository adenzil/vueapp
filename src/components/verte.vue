<template>
	<div>
		<verte v-if="showVerte"></verte>
		<button class="btn btn-secondary" v-if="!showVerte" @click="showColorPicker">Show Colour</button>
		<button class="btn btn-secondary" v-if="showVerte" @click="showColorPicker">Hide Colour</button>
	</div>
</template>

<script>

import verte from 'verte';

export default {
  	components: { verte },
  	data: function() {
  		return {
  			showVerte: false
  		}
  	},
  	methods: {
  		showColorPicker: function() {
  			this.showVerte = !this.showVerte;
  		}
  	}
}
</script>