import { Bar, HorizontalBar, Doughnut, Line, Pie, PolarArea, Radar, Bubble, Scatter, mixins, generateChart } from 'vue-chartjs';


console.log(Bar)

export default {
   extends: Doughnut,
   mixins: [mixins.reactiveProp],
   props: ['chartData', 'options', 'type'], // declare the props
   mounted() {
      //renderChart function renders the chart with the datacollection and options object.
      console.log(this)
      // this.renderChart(this.chartData, this.options)
      // var a = chart.generateChart('chart',this.type);
      // console.log(a.methods)
      // a.methods.renderChart(this.chartData, this.options)
   }
}