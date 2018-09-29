import React from "react";
import ReactDOM from "react-dom";

/**
 * @typedef Props
 * @property {number} [begin] 开始数值
 * @property {number} [step] 步进数值
 * @property {number} [delay] 延迟, 毫秒
 * @property {function(number): JSX} [format] 格式化函数
 * @property {boolean} [recompute] begin 或 step 更新后是否强制重新计算
 */

class Stopwatches extends React.Component {
  state = { time: 0 };
  update = {};
  initFunc = () => {
    const delay = this.props.delay || 1000;
    const step = this.props.step || 1;
    const re = () => {
      this.setState(({ time }) => {
        return { time: time + step };
      });
    };
    this.setState({ time: 0 });
    clearInterval(this.update);
    this.update = setInterval(re, delay);
  };
  componentDidMount() {
    this.initFunc();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.props.recompute) {
      return;
    }
    if (
      prevProps.begin !== this.props.begin ||
      prevProps.step !== this.props.step ||
      prevProps.delay !== this.props.delay
    ) {
      this.initFunc();
    }
  }
  componentWillUnmount() {
    clearInterval(this.update);
  }
  render() {
    const time = (this.props.begin || 0) + this.state.time;
    if (typeof this.props.format === "function") {
      return this.props.format(time);
    }
    return <span>{time}</span>;
  }
}

ReactDOM.render(
  <Stopwatches begin={100} />,
  document.getElementById("container")
);
