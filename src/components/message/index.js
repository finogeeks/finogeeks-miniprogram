import Taro, { Component } from '@tarojs/taro';
import imModel from '@/model/im';
import extInfo from '@/utils/ext';
import { View } from '@tarojs/components';
import wxRouter from '@/router';

import TextMessage from './text-message';
import ImageMessage from './image-message';
import FileMessage from './file-message';
import AudioMessage from './audio-message';
import VideoMessage from './video-message';
import LinkMessage from './link-message';
import LocationMessage from './location-message';
import ConvoUI from './convo-ui';
import AppletMessage from './applet-message';
import UnknowMessage from './unknow-message';
import Avatar from '../avatar';
import { getCacheSync, removeCacheSync } from '@/utils/store';

import './index.scss';

const primaryBubbleStyle = {
  borderColor: extInfo.THEME_COLOR.Bubble_Host_border,
};

const primaryBubbleBackgroundStyle = {
  backgroundColor: extInfo.THEME_COLOR.Bubble_Host_fill,
};

class Message extends Component {
  getStyle = (msgtype, isMy) => {
    const ignoreTypes = ['m.image', 'm.video', 'fc.convo.ui'];
    const whiteTypes = ['m.url', 'm.file', 'm.location'];
    let arrowStyle = { backgroundColor: 'transparent' };
    let bubbleStyle = { border: 'none' };
    let contentStyle = { backgroundColor: '#ffffff' };
    if (ignoreTypes.includes(msgtype)) {
      return { arrowStyle, bubbleStyle, contentStyle };
    }
    if (whiteTypes.includes(msgtype)) {
      bubbleStyle = { borderColor: '#CFCFCF' };
      return { arrowStyle, bubbleStyle, contentStyle };
    }

    if (isMy) {
      arrowStyle = { ...primaryBubbleStyle, ...primaryBubbleBackgroundStyle };
      bubbleStyle = primaryBubbleStyle;
      contentStyle = primaryBubbleBackgroundStyle;
    } else {
      arrowStyle = { backgroundColor: '#ffffff', borderColor: '#CFCFCF' };
      bubbleStyle = { borderColor: '#CFCFCF' };
    }
    return { arrowStyle, bubbleStyle, contentStyle };
  };

  onLinkTextTap = message => {
    // console.log(message);
    // Taro.redirectTo({ url: message.content.url })
    wxRouter.redirectTo(message.content.url);
  };

  render() {
    const { message, roomType, showName } = this.props;
    const { isChannel, isGroup, isDirect } = this.props.room;
    const name = message.user ? message.user.name : '';
    const avatarUrl = message.user ? message.user.avatar : '';
    const msgtype =
      message.content.msgtype || message.content.msgType || message.type;
    const isMy = message.isMy;
    const { arrowStyle, bubbleStyle, contentStyle } = this.getStyle(
      msgtype,
      isMy,
    );
    const isRedacted = message.isRedacted;
    const userSession = getCacheSync('userSession');
    const myId = userSession['userId'];

    // Taro 限制，无法再 render 先计算好属性再渲染，只能按条件分别渲染，后续分组件优化
    if (msgtype === 'm.room.member' && message.content.membership === 'join') {
      return (
        <View className='notice'>
          <View className='content'>
            {`${message.state_key === myId ? '你' : `"${message.content.displayname}"`}加入了${
              isChannel ? '频道' : (isGroup ? '房间' : '会话')
            }`}
          </View>
        </View>
      );
    }
    // Taro 限制，无法再 render 先计算好属性再渲染，只能按条件分别渲染，后续分组件优化
    if (msgtype === 'm.room.member' && message.content.membership === 'leave') {
      return (
        <View className='notice'>
          <View className='content'>
            {`"${message.content.displayname}"离开了${
              isChannel ? '频道' : (isGroup ? '房间' : '会话')
            }`}
          </View>
        </View>
      );
    }
    // Taro 限制，无法再 render 先计算好属性再渲染，只能按条件分别渲染，后续分组件优化
    if (
      msgtype === 'm.room.member' &&
      message.content.membership === 'invite'
    ) {
      return (
        <View className='notice'>
          <View className='content'>
            {`${message.user.id === myId ? '你' : `"${message.user.name}"`}邀请${message.state_key === myId ? '你' : `"${message.content.displayname}"`}加入了${
              isChannel ? '频道' : (isGroup ? '房间' : '会话')
            }`}
          </View>
        </View>
      );
    }

    if (msgtype === 'm.room.name') {
      return (
        <View className='notice'>
          <View className='content'>
            {`${message.user.id === myId ? '你' : `"${message.user.name}"`}修改了${
              isChannel ? '频道' : (isGroup ? '房间' : '会话')
            }名称为：${message.content.name}`}
          </View>
        </View>
      );
    }

    if (msgtype === 'm.room.create') {
      return (
        <View className='notice'>
          <View className='content'>
            {`${message.user.id === myId ? '你' : `"${message.user.name}"`}创建了${
              isChannel ? '频道' : (isGroup ? '房间' : '会话')
            }`}
          </View>
        </View>
      );
    }

    if (msgtype === 'm.notice' || msgtype === 'm.local.time') {
      return (
        <View className='notice'>
          <View className='content'>{message.content.body}</View>
        </View>
      );
    }

    if (msgtype === 'm.local.notice') {
      return (
        <View className='notice'>
          <View className='content'>
            {message.content.body}
            <View
              className='link-url'
              onTap={() => this.onLinkTextTap(message)}
            >
              {message.content.linkText}
            </View>
          </View>
        </View>
      );
    }

    if (isRedacted) {
      return (
        <View className='notice'>
          <View className='content'>{
            `${message.user.id === myId ? '你' : `"${message.user.name}"`}`
          }撤回了一条消息</View>
        </View>
      )
    }

    return (
      <View className={`message ${isMy ? 'my' : ''}`}>
        <View className='avatar'>
          <Avatar url={avatarUrl} size={80} />
        </View>
        <View className='msg-body'>
          {/* {showName && !isMy ? <View className='user-name'>{name}</View> : null} */}
          <View
            className='content'
            style={bubbleStyle}
            onLongPress={this.props.onMessagePress}
          >
            <View className='arrow' style={arrowStyle}></View>
            <View className='wrap' style={contentStyle}>
              {msgtype === 'm.text' ||
              msgtype === 'fc.convo.reply' ||
              msgtype === 'm.alert' ? (
                <TextMessage message={message} />
              ) : null}
              {msgtype === 'm.image' && <ImageMessage message={message} />}
              {msgtype === 'm.file' && <FileMessage message={message} />}
              {msgtype === 'm.audio' && (
                <AudioMessage message={message} isMy={isMy} />
              )}
              {msgtype === 'm.video' && (
                <VideoMessage message={message} onVideo={this.props.onVideo} />
              )}
              {msgtype === 'm.url' && (
                <LinkMessage message={message} onLink={this.props.onLink} />
              )}
              {msgtype === 'm.location' && (
                <LocationMessage
                  message={message}
                  onLocation={this.props.onLocation}
                />
              )}
              {msgtype === 'fc.convo.ui' && (
                <ConvoUI message={message} onConvo={this.props.onConvo} />
              )}
              {/* {msgtype === 'fc.applet' && <AppletMessage message={message} />} */}
              {msgtype === 'fc.applet' && (
                <UnknowMessage message={message}/>
              )}
              {msgtype === 'm.combine_forward' && (
                <UnknowMessage message={message}/>
              )}
              {msgtype === 'm.businesscard' && (
                <UnknowMessage message={message}/>
              )}
              {msgtype === 'm.bad.encrypted' && (
                <UnknowMessage message={message}/>
              )}
            </View>
          </View>
        </View>
        <View className='status'>
          {(message.status === 'not_sent' || message.status === 'error') && (
            <View className='error' onTap={this.props.onReSend}>
              &#xe62f;
            </View>
          )}
          {message.status === 'sending' && (
            <View className='loading'>&#xe630;</View>
          )}
        </View>
      </View>
    );
  }
}

Message.defaultProps = {
  message: {
    user: {},
    content: {},
  },
  room: {},
  isMy: false,
  showName: false,
  onConvo: () => {},
  onVideo: () => {},
  onLink: () => {},
  onLocation: () => {},
  onMessagePress: () => {},
  onReSend: () => {},
};

export default Message;
