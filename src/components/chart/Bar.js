import { Bar, HorizontalBar, Doughnut, Line, Pie, PolarArea, Radar, Bubble, Scatter, mixins } from 'vue-chartjs';


var commanData = {
   mixins: [mixins.reactiveProp],
   props: ['chartData', 'options'],
   mounted() {
      this.renderChart(this.chartData, this.options)
   }
}

export var BarChart = {
   extends: Bar,
   ...commanData
}
export var HorizontalBarChart = {
   extends: HorizontalBar,
   ...commanData
}
export var DoughnutChart = {
   extends: Doughnut,
   ...commanData
}
export var LineChart = {
   extends: Line,
   ...commanData
}
export var PieChart = {
   extends: Pie,
   ...commanData
}
export var PolarAreaChart = {
   extends: PolarArea,
   ...commanData
}
export var RadarChart = {
   extends: Radar,
   ...commanData
}
export var BubbleChart = {
   extends: Bubble,
   ...commanData
}
export var ScatterChart = {
   extends: Scatter,
   ...commanData
}

// export default { BarChart, HorizontalBarChart, DoughnutChart, LineChart, PieChart, PolarAreaChart, RadarChart, BubbleChart, ScatterChart }