import React, { Component } from 'react';

class YouTubeThumbnail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoIsReady: false,
    };

    this.player = null;
  }

  componentDidMount() {
    // Load the YouTube API script asynchronously
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/embed/tgbNymZ7vqY';
    script.async = true;
    script.defer = true; // Ensure it defers execution until the DOM is ready
    script.onload = this.initializePlayer;
    document.body.appendChild(script);
  }

  initializePlayer = () => {
    // Check if the YouTube API script has added the YT object to the window
    if (typeof window.YT === 'undefined' || typeof window.YT.Player === 'undefined') {
      // Retry initialization after a short delay if the YT object is not yet available
      setTimeout(this.initializePlayer, 100);
      return;
    }

    // Initialize the YouTube player
    this.player = new window.YT.Player('youtube-player', {
      videoId: this.props.videoId,
      events: {
        onReady: this.onPlayerReady,
      },
    });
  };

  onPlayerReady = (event) => {
    // The video player is ready
    this.setState({ videoIsReady: true });
  };

  playVideo = () => {
    // Ensure the player is ready before attempting to play
    if (this.state.videoIsReady) {
      this.player.playVideo();
    }
  };

  render() {
    return (
      <div>
        {!this.state.videoIsReady && (
          <img
            src={`https://github.com/Sreejit-K/onest-demo/blob/master/causeDetails/cause1/HBS3.jpeg?raw=true`}
            alt="Thumbnail"
            onClick={this.playVideo}
            style={{ cursor: 'pointer' }}
          />
        )}
        {this.state.videoIsReady && (
          <div id="youtube-player" />
        )}
      </div>
    );
  }
}

export default YouTubeThumbnail;