import React, { Component } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';


function formatTimeString(time) {
    let cs = Math.floor(time / 100) % 10;
    let seconds = Math.floor(time / 1000) % 60;
    let minutes = Math.floor(time / 60000);
    return `${minutes}:${seconds < 10 ? 0 : ""}${seconds}.${cs}`;
}

class StopWatch extends Component {
    static propTypes = {
        start: PropTypes.bool,
        reset: PropTypes.bool,
        style: PropTypes.object,
        startTime: PropTypes.number,
        setTime: PropTypes.func,
    }

    constructor(props) {
        super(props);
        const { startTime } = props;
        this.state = {
            initial: null,
            running: false,
            elapsed: startTime || 0,
        };
        this.start = this.start.bind(this);
        this.stop = this.pause.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        if (this.props.start) {
            this.start();
        }
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.start !== prevProps.start) {
            if (this.props.start) {
                this.start();
            } else {
                this.pause();
            }
        }
        // check for startTime prop
        if (this.props.startTime !== prevProps.startTime) {
            const newElapsed = this.props.startTime ? this.props.startTime : 0;
            this.setState({
                elapsed: newElapsed,
                initial: new Date() - newElapsed
            });
        }

        // if (newProps.reset) {
        //         this.reset();
        //     }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    start() {
        this.setState({
            initial: this.state.elapsed ? new Date() - this.state.elapsed :
                new Date(), running: true
        });

        this.interval = this.interval ? this.interval : setInterval(() => {
            const newElapsed = new Date() - this.state.initial;
            this.setState({ elapsed: newElapsed });
            if (this.props.setTime) this.props.setTime(newElapsed);
        }, 100);
    }

    pause() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.setState({ running: false });
    }

    reset() {
        const { startTime } = this.props;
        this.setState({
            elapsed: startTime || 0,
            initial: null,
            running: false,
        });
    }


    render() {
        const style = this.props.style ? this.props.style : {};
        return <Text style={style}>{formatTimeString(this.state.elapsed)}</Text>;
    }
}

export default StopWatch;
