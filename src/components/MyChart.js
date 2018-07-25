import { Line, mixins } from 'vue-chartjs';

export default {
   extends: Line,
   mixins: [mixins.reactiveProp],
   props: ['chartData', 'options'], // declare the props
   mounted() {
      //renderChart function renders the chart with the datacollection and options object.
      this.renderChart(this.chartData, this.options)
   }
}