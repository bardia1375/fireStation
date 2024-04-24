import React, { Component, createRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { convertEnglishNumberToPersian } from "../Utils/commonFunctions";
class Waveform extends Component {
  state = {
    playing: false,
    audioLenght: 0,
    audioLeft: 0,
  };

  constructor(props) {
    super(props);
    this.handleDone = this.handleDone.bind(this);
    this.handleGetLenght = this.handleGetLenght.bind(this);
    this.handleGetPlayed = this.handleGetPlayed.bind(this);

    this.track = createRef(null);
    // console.log(this.props.src);
    document.addEventListener("load", () => {});
  }
  handleDone = () => {
    this.setState({ playing: !this.state.playing });
  };
  shouldComponentUpdate() {
    return true;
  }

  componentDidMount() {
    this.waveform = WaveSurfer.create({
      barWidth: 5,
      barHeight: 30,
      hideScrollbar: true,
      cursorWidth: 1,
      barRadius: 2,
      container: `#wave${this.props.id}`,
      backend: "WebAudio",
      height: 50,
      progressColor: `${this.props.isUploadingVoice ? "#37B3B8" : "#966C5A"}`,
      barGap: 3,
      responsive: true,
      waveColor: "#CBCBCB",
      cursorColor: "transparent",
    });
    this.waveform.load(this.track.current);
    this.waveform.on("finish", this.handleDone);
    this.waveform.on("ready", this.handleGetLenght);
    this.waveform.on("audioprocess", this.handleGetPlayed);
  }
  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    this.waveform.playPause();
  };
  handleDone = () => {
    this.setState({ playing: !this.state.playing });
    this.setState({ audioLeft: 0 });
  };
  handleGetLenght = () => {
    this.setState({ audioLenght: this.waveform.getDuration() });
  };
  handleGetPlayed = () => {
    this.setState({ audioLeft: this.waveform.getCurrentTime() });
  };

  render() {
    return (
      <>
        {!this.props.isUploadingVoice ? (
          <div className="ticket__Message-file-audiolength">
            <span
              style={{
                color: "#966C5A",
              }}
            >
              {`${convertEnglishNumberToPersian(
                new Date(this.state.audioLeft * 1000)
                  .toISOString()
                  .substr(14, 5)
              )}/`}
            </span>
            <span
              style={{
                color: "#9E9E9E",
              }}
            >
              {`${convertEnglishNumberToPersian(
                new Date(this.state.audioLenght.toFixed() * 1000)
                  .toISOString()
                  .substr(14, 5)
              )}`}
            </span>
          </div>
        ) : (
          <div
            style={{
              position: "absolute",
              top: "-30px",
              right: "50%",
              transform: "translate(50%, 0px)",
              zIndex: "2",
              background: "#333333b0",
              borderRadius: "2rem",
              width: "300px",
              height: "50px",
            }}
          >
            <img
              src={`/images/trashVoice.svg`}
              style={{
                right: "15px",
                top: "3px",
                opacity: "1",
              }}
              className="ticket__footer__replyMessage__close"
              onClick={this.props.deleteVoice}
            />

            {!this.state.playing ? (
              <img
                src={`/images/playVoice-white.svg`}
                alt=""
                onClick={this.handlePlay}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  right: "50%",
                  top: "6px",
                  transform: "translate(50%, 0px)",
                }}
              />
            ) : (
              <img
                src={`/images/pauseVoice-white.svg`}
                alt=""
                onClick={this.handlePlay}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  right: "50%",
                  top: "3px",
                  transform: "translate(50%, 0px)",
                }}
              />
            )}

            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                fontSize: "20px",
                color: "white",
              }}
            >
              <span>
                {`${convertEnglishNumberToPersian(
                  new Date(this.state.audioLeft * 1000)
                    .toISOString()
                    .substr(14, 5)
                )}/`}
              </span>
              <span>
                {`${convertEnglishNumberToPersian(
                  new Date(this.state.audioLenght.toFixed() * 1000)
                    .toISOString()
                    .substr(14, 5)
                )}`}
              </span>
            </div>
          </div>
        )}

        <div
          id={`wave${this.props.id}`}
          className="waveVoiceContainer"
          style={{
            background: this.props.isUploadingVoice ? "white" : "inherit",
          }}
        ></div>

        <audio style={{display:"none"}}  controls ref={this.track} src={`data:audio/mp3;base64,${this.props.src}` || "k"} />

        <div
          className="msgOption"
          onClick={this.handlePlay}
          style={{
            marginRight: "1rem",
          }}
        >
          <img
            src={`/images/${
              !this.state.playing ? "playVoice.svg" : "pauseVoice.svg"
            }`}
            alt=""
            style={{
              cursor: "pointer",
              display: "inline !important",
            }}
          />
        </div>
      </>
    );
  }
}

export default Waveform;
