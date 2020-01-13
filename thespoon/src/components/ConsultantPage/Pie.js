import React, {Component} from "react";
import CanvasJSReact from "../../assets/canvas/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Pie extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.dataPoints);
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: this.props.theme,
            data: [{
                type: "pie", //change type to bar, line, area, pie, etc
                //indexLabel: "{y}", //Shows y value on all Data Points
                indexLabelFontColor: "#000",
                indexLabelPlacement: "outside",
                dataPoints: this.props.dataPoints
            }]
        }
        return (
            <div>
                <CanvasJSChart options = {options}
                    /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}

export default Pie;