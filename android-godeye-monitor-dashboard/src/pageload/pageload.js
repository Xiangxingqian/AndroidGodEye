import React, {Component} from 'react';
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Row, Col, Clearfix, Grid, Panel, Modal, Button} from 'react-bootstrap'
import JSONPretty from '../../node_modules/react-json-pretty';

import Highcharts from '../../node_modules/highcharts/highcharts';
import exporting from '../../node_modules/highcharts/modules/exporting';
import ReactHighcharts from '../../node_modules/react-highcharts'
import {toast} from 'react-toastify';


exporting(Highcharts);

/**
 * Pageload
 */
class Pageload extends Component {

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.options = {
            credits: {
                enabled: false
            },
            chart: {
                type: 'column'
            },
            title: {
                text: null
            },
            tooltip: {
                shared: true,
                formatter: function () {
                    let point = this.points[0].point;
                    if (point.pageloadInfo) {
                        return point.pageloadInfo.pageId + ' ' + point.pageloadInfo.pageName + '<br/>'
                            + point.pageloadInfo.pageStatus + '<br/>';
                    }
                    return "";
                }
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: "Page load time(ms)",
                    align: "middle",
                },
                min: 0
            },
            plotOptions: {
                series: {
                    point: {
                        events: {
                            click: this.handleClick
                        }
                    }
                },
                column: {
                    grouping: false,
                    shadow: false,
                    borderWidth: 0
                }
            },
            series: [
                {
                    name: 'DrawTime(绘制耗时)',
                    color: 'rgba(126,86,134,.9)',
                    pointPadding: 0.4,
                    pointPlacement: -0.1,
                    data: (Pageload.initSeries())
                }, {
                    name: 'LoadTime(加载耗时)',
                    color: 'rgba(165,170,217,0.5)',
                    pointPadding: 0.2,
                    pointPlacement: -0.1,
                    data: (Pageload.initSeries())
                }
            ]
        };
        this.state = {
            show: false,
            pageloadInfo: {}
        };
        this.index = 0;
    }

    handleClick(e) {
        if (e.point.pageloadInfo) {
            this.setState({pageloadInfo: e.point.pageloadInfo, show: true});
        }
    }

    handleClose() {
        this.setState({show: false});
    }

    static initSeries() {
        let data = [];
        for (let i = 0; i < 30; i++) {
            data.push({
                x: i,
                y: 0
            });
        }
        return data;
    }

    generateIndex() {
        this.index = this.index + 1;
        return this.index;
    }

    refresh(pageloadInfo) {
        if (pageloadInfo && pageloadInfo.loadTimeInfo) {
            let axisData = pageloadInfo.pageId;
            let drawTime = pageloadInfo.loadTimeInfo.didDrawTime - pageloadInfo.loadTimeInfo.createTime;
            let loadTime = pageloadInfo.loadTimeInfo.loadTime - pageloadInfo.loadTimeInfo.createTime;
            if (drawTime < 0) {
                drawTime = 0;
            }
            if (loadTime < 0) {
                loadTime = 0;
            }
            this.refs.chart.getChart().series[0].addPoint({//绘制时间
                name: axisData,
                y: drawTime,
                pageloadInfo: pageloadInfo
            }, false, true, true);
            this.refs.chart.getChart().series[1].addPoint({//加载时间
                name: axisData,
                y: loadTime,
                pageloadInfo: pageloadInfo
            }, false, true, true);
            this.refs.chart.getChart().redraw(true);
            if (drawTime >= 1000) {
                toast.error("Page rendering performance poor.(页面绘制性能差)");
            }
        }
    }

    render() {
        return (
            <Panel style={{textAlign: "left"}}>
                <Panel.Heading>
                    <h5>Pageload(页面加载)
                    </h5>
                </Panel.Heading>
                <Panel.Body>
                    <ReactHighcharts
                        ref="chart"
                        config={this.options}
                    />
                </Panel.Body>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>Page load detail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <JSONPretty id="json-pretty" json={this.state.pageloadInfo}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Panel>);
    }
}

export default Pageload;
