import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { inject, observer } from 'mobx-react';
import {
  catchError,
  getMediaStream,
} from './util.js';
import './stylei.less';

const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1
};

@inject('webrtc')
@observer
export default class Root extends Component {
  state = {
    peerConnectionStatus: 'call'
  }

  componentDidMount() {
    this.start();
  }

  setMediaStream(uid, stream) {
    const videosDOM = findDOMNode(this.videosLayer);

    Array.prototype.slice.call(videosDOM.childNodes).map(node => {
      let temp = node.childNodes[0];

      if (temp.id === uid) {
        temp.srcObject = stream;
      }
    });
  }

  start() {
    const { webrtc } = this.props;
    const { localUser } = webrtc;

    getMediaStream()
    .then(stream => {
      this.setMediaStream(localUser, stream);
      this.localStream = stream;
      this.createPeerConnections();
    });
  }

  createPeerConnections() {
    const { webrtc } = this.props;
    const { uids, peerList, localUser } = webrtc;

    uids.map(uid => webrtc.setPeerList(uid));

    peerList.forEach((peerConnection, uid) => {
      if (uid !== localUser) {
        peerConnection.remote.ontrack = (event) => {
          window.console.log('get stream');
          this.setMediaStream(uid, event.streams[0]);
        };


        // 添加本地流
        this.localStream.getTracks().forEach(track => {
          peerConnection.local.addStream(
            // track,
            this.localStream
          );
        });
      }
    });

    this.createOffer();
  }

  createOffer() {
    const { webrtc } = this.props;
    const { peerList, localUser } = webrtc;

    peerList.forEach((peerConnection, uid) => {
      if (uid !== localUser) {
        peerConnection.local.createOffer(offerOptions)
        .then(offer => {
          this.setOffer(offer, peerConnection);
        })
        .catch(err => catchError(err));
      }
    });
  }

  setOffer (offer, peerConnection) {
    peerConnection.local.setLocalDescription(offer)
    .catch(err => catchError(err));

    peerConnection.remote.setRemoteDescription(offer)
    .catch(err => catchError(err));

    this.createAnswer(peerConnection);
  }

  createAnswer(peerConnection) {
    peerConnection.remote.createAnswer()
    .then(answer => {
      this.setAnswer(answer, peerConnection);
    })
    .catch(err => catchError(err));
  }

  setAnswer(answer, peerConnection) {
    peerConnection.remote.setLocalDescription(answer)
    .catch(err => catchError(err));

    peerConnection.local.setRemoteDescription(answer)
    .catch(err => catchError(err));
  }

  render() {
    const {
      webrtc: {
        uids
      }
    } = this.props;
    return (
      <div className="root">
        <div
          className="video_layer"
          ref={video => {this.videosLayer = video;}}
        >
          {
            uids.map(uid => (
              <div>
                <video id={uid} autoPlay>{''}</video>
              </div>
            ))
          }
        </div>
        <div className="action_layer">
          <button
            className="call"
            onClick={this.callClickHandle}
          >
            呼叫
          </button>
        </div>
      </div>
    );
  }
}
