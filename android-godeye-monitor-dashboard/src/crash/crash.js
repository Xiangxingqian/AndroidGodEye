import React, {Component} from 'react';
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Row, Col, Clearfix, Grid, Panel, Button, Modal} from 'react-bootstrap'
import JSONPretty from '../../node_modules/react-json-pretty';
import {toast} from 'react-toastify';

/**
 * Crash
 */
class Crash extends Component {

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleCrashDetailClick = this.handleCrashDetailClick.bind(this);
        this.handleCrashDetailClick = this.handleCrashDetailClick.bind(this);
        this.state = {
            crashInfo: {}
        };
    }

    refresh(crashInfo) {
        this.setState({crashInfo});
        toast.error("Crash!(发生崩溃)");
    }

    handleCrashDetailClick(e) {
        this.setState({show: true});
    }

    handleClose() {
        this.setState({show: false});
    }

    render() {
        let crashInfo = this.state.crashInfo;
        return (
            <Panel style={{textAlign: "left"}}>
                <Panel.Heading>
                    <Row>
                        <Col md={10}><h5>Last Crash Info(最新一次崩溃)</h5></Col>
                        <Col md={2}
                             style={{textAlign: 'right'}}><Button
                            onClick={this.handleCrashDetailClick}>Detail</Button></Col>
                    </Row>
                </Panel.Heading>
                <Panel.Body>
                    <p>
                        <strong>Time(崩溃时间):&nbsp;</strong>{crashInfo.timestampMillis ? new Date(crashInfo.timestampMillis).toLocaleTimeString() : "**"}
                    </p>
                    <p style={{wordWrap: "break-word", wordBreak: "break-all"}}>
                        <strong>Message(异常信息):&nbsp;</strong>{crashInfo.throwableMessage ? crashInfo.throwableMessage : "**"}
                    </p>
                    <p><strong>Stacktrace(异常堆栈)</strong></p>
                    {Crash.renderStacktraceItem(crashInfo.throwableStacktrace)}
                </Panel.Body>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>Crash detail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <JSONPretty id="json-pretty" json={this.state.crashInfo}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Panel>);
    }

    static renderStacktraceItem(throwableStacktraces) {
        if (throwableStacktraces) {
            let items = [];
            for (let i = 0; i < throwableStacktraces.length; i++) {
                items.push(
                    <p style={{wordWrap: "break-word", wordBreak: "break-all", margin: 0}} key={"crash" + i}>
                        <small>{throwableStacktraces[i]}</small>
                    </p>
                );
            }
            return items;
        }
    }
}

export default Crash;
