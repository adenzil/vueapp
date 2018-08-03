import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const options = {
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

export const store = new Vuex.Store({
	state: {
		Trackers: {
            name: 'Trackers',
            description: 'These are all your trackers',
            values: {
            	'weights' : {
            		name: 'weights',
                    description: 'weight',
                    dataType: 'number',
                    values: [],
                    newKey: null,
                    newValue:null,
                    options: options
            	},
            	'temperature' : {
            		name: 'temperature',
                    description: 'temp',
                    dataType: 'number',
                    values: [],
                    newKey: null,
                    newValue:null,
                    options: options
            	},
            },
            newTrackerName:null,
        },
        newTracker: {
        	name: 'new tracker',
        	description: 'a tracker description',
            dataType: 'number',
            values: [],
            newKey: null,
            newValue:null,
            options: options
        }
	},
	getters: {
		Trackers(state) {
			return state.Trackers;
		},
		TrackerData(state) {
			return route => state.Trackers.values[route];
		}
	},
	mutations: {
		initialiseStore(state) {
			if(localStorage.getItem('Trackers')) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('Trackers')))
				);
			}
		},
		addTracker(state) {
			var newTrackerName = state.Trackers.newTrackerName;
			if(! (newTrackerName in state.Trackers.values)) {
                Vue.set(state.Trackers.values,newTrackerName,JSON.parse(JSON.stringify(state.newTracker)));
                Vue.set(state.Trackers.values[newTrackerName],'name', newTrackerName);
                Vue.set(state.Trackers,'newTrackerName', null);
            }else {
                alert('Tracker already exists');
            }
		},
		saveState(state,payload){
            var changeSource;
            switch(payload.source) {
                case 'Trackers': 
                    changeSource = state.Trackers;
                    break;
                case 'TrackerData':
                    if(payload.type == 'name') {
                        Vue.set(state.Trackers.values,payload.text,state.Trackers.values[payload.route]);
                        Vue.delete(state.Trackers.values,payload.route);
                    }
                    changeSource = state.Trackers.values[payload.text];
                    break;
            }
            Vue.set(changeSource,payload.type,payload.text);
		},
		deleteTracker(state, payload) {
			Vue.delete(state.Trackers.values,payload);
		},
		updateTrackerName(state,payload) {

		},
		updateTrackerDescription(state,payload) {
			console.log(this.$refs)
		},
		addTrackerData(state, payload) {
			var currentTracker = state.Trackers.values[payload]
			currentTracker.values.push({'key':currentTracker.newKey, 'value':currentTracker.newValue, 'edit': false})
			currentTracker.newKey = currentTracker.newValue = null;
		},
		deleteTrackerData(state, payload, index) {
            state.Trackers.values[payload].values.splice(index,1);
		},
        editTrackerData(state, payload) {
            state.Trackers.values[payload.route].values[payload.index].edit = !state.Trackers.values[payload.route].values[payload.index].edit;
        },
		deleteAllTrackerData(state,payload) {
			// state.Trackers.values[payload].values = {};
            Vue.set(state.Trackers.values[payload], 'values', [])
		},
		test(state) {
			alert('tesst');
		},
        deleteAllTrackers(state) {
            Vue.set(state.Trackers,'values',{});
            localStorage.setItem('Trackers', JSON.stringify(state));
        }
	}
})

store.subscribe((mutation, state) => {
	// Store the state object as a JSON string
	localStorage.setItem('Trackers', JSON.stringify(state));
});