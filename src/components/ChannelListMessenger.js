import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { ChannelPreview } from './ChannelPreview';
import { ChannelPreviewMessenger } from './ChannelPreviewMessenger';
import { withChatContext } from '../context';
import { FlatList } from 'react-native-gesture-handler';


/**
 * ChannelList - A preview list of channels, allowing you to select the channel you want to open
 * @example ./examples/ChannelList.md
 */
class ChannelListMessenger extends PureComponent {
  static propTypes = {
    /** Channels can be either an array of channels or a promise which resolves to an array of channels */
    channels: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.objectOf({
        then: PropTypes.func,
      }),
      PropTypes.object,
    ]).isRequired,
    /** The Preview to use, defaults to ChannelPreviewMessenger */
    Preview: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

    /** The loading indicator to use */
    LoadingIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  };

  static defaultProps = {
    Preview: ChannelPreviewMessenger,
    LoadingIndicator: <Text>Loading Channels</Text>,
  };

  renderLoading = () => {
    const Loader = this.props.LoadingIndicator;
    return <Loader isLoading={true} />;
  };

  renderChannels = () =>
    <FlatList 
      data={this.props.channels}
      renderItem={({ item: channel }) => {
        return (
          <ChannelPreview
            {...this.props}
            activeChannel={channel}
            key={channel.cid}
            channel={channel}
            Preview={this.props.Preview}
          />
        );
      }}
      keyExtractor={(item, index) => item.cid}
    />

  render() {
    if (this.props.error) {
      return <Text>Error loading channels</Text>;
    } else if (this.props.loading) {
      return <Text>Loading Channels</Text>;
    } else {
      return (
        this.renderChannels()
      );
    }
  }
}

ChannelListMessenger = withChatContext(ChannelListMessenger);
export { ChannelListMessenger };
