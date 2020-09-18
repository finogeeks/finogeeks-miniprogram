const mockTimeline = [
  {
    content: {
      body:
        '定心贷产品借满3个月后可申请全额提前还款，需额外支付1个月的利息作为提前还款违约金；激励贷产品借满6个月后可申请提前还款，免收违约金。（提前还款申请链接）',
      msgid: '2fe7cac4-8f44-4963-9420-0342a2e86fa1',
      msgtype: 'fc.convo.ui',
      receivers: [],
      version: '1.0',
      layout: {
        title: '',
        type: 'table',
        display: {
          type: 'replace',
        },
        params: {
          text:
            '定心贷产品借满3个月后可申请全额提前还款，需额外支付1个月的利息作为提前还款违约金；激励贷产品借满6个月后可申请提前还款，免收违约金。（提前还款申请链接）',
          widgets: [
            [
              {
                expiration: -1,
                params: {
                  action: 'reply',
                  hide: false,
                  payload: '如何提前还款，是否有罚息？',
                  value: 'ok',
                },
                title: '已解决',
                type: 'button',
              },
              {
                expiration: -1,
                params: {
                  action: 'reply',
                  hide: false,
                  payload: '如何提前还款，是否有罚息？',
                  value: 'unsolved',
                },
                title: '未解决',
                type: 'button',
              },
            ],
          ],
        },
      },
    },
  },
  {
    content: {
      body: '很抱歉没能解决您的问题，试试换种说法',
      msgid: '2fe7cac4-8f44-4963-9420-0342a2e86fa2',
      msgtype: 'fc.convo.ui',
      receivers: [],
      version: '1.0',
      layout: {
        title: '',
        type: 'table',
        display: {
          type: 'replace',
        },
        params: {
          text: '很抱歉没能解决您的问题，试试换种说法',
          widgets: [
            [
              {
                expiration: -1,
                params: {
                  action: 'reply',
                  hide: false,
                  value: 'switchCustomerService',
                },
                title: '转人工',
                type: 'button',
              },
              {
                expiration: -1,
                params: {
                  action: 'reply',
                  hide: false,
                  value: 'leaveMsg',
                },
                title: '去留言',
                type: 'button',
              },
            ],
          ],
        },
      },
    },
  },
  {
    content: {
      body: '你的问题，一点就知道',
      msgid: 'fa8ab45a-4119-48b9-90d2-79cb509a9843',
      msgtype: 'fc.convo.ui',
      receivers: [],
      version: '1.0',
      layout: {
        title: 'linear',
        type: 'linear',
        display: {
          type: 'inplace',
        },
        params: {
          widgets: [
            {
              params: {
                href: '',
              },
              title: '你的问题，一点就知道',
              type: 'header',
            },
            {
              params: {
                color: '#d9d9d9',
                margin: 14.5,
              },
              title: '',
              type: 'line',
            },
            {
              params: {
                action: 'sendConvReply',
                href: '',
              },
              title: '如何查询人行征信报告？',
              type: 'item',
            },
            {
              params: {
                action: 'sendConvReply',
                href: '',
              },
              title: '如何查询人行征信报告？',
              type: 'item',
            },
            {
              params: {
                action: 'sendConvReply',
                href: '',
              },
              title: '如何查询人行征信报告？',
              type: 'item',
            },
            {
              params: {
                color: '#d9d9d9',
                margin: 14.5,
              },
              title: '',
              type: 'line',
            },
            {
              params: {
                action: 'sendConvReply',
                href: '',
              },
              title: '换一批',
              type: 'footer',
            },
          ],
        },
      },
    },
  },
  {
    content: {
      body: '[留言提醒]',
      layout: {
        title: '[留言提醒]',
        type: 'linear',
        display: {
          type: 'inplace',
        },
        params: {
          widgets: [
            {
              params: {
                icon:
                  'https://api.finolabs.com.cn/_matrix/media/v1/thumbnail/finolabs.com.cn/sMTesTPpdZzlefkprZdvbDVB?width=320&height=320',
                date: '2018/11/23 10:38',
                href: '',
              },
              title: '留言提醒',
              type: 'header',
            },
            {
              params: {
                color: '#d9d9d9',
                margin: 14.5,
              },
              title: '',
              type: 'line',
            },
            {
              params: {
                href: '',
              },
              title: '留言内容：回家吃饭\n留言日期：1970/01/01 08:00',
              type: 'hypertext',
            },
            {
              params: {
                color: '#d9d9d9',
                margin: 14.5,
              },
              title: '',
              type: 'line',
            },
            {
              params: {
                href: 'www.baidu.com',
              },
              title: '回复详情',
              type: 'footer',
            },
            {
              params: {
                color: '#d9d9d9',
                margin: 14.5,
              },
              title: '',
              type: 'line',
            },
            {
              params: {
                href: 'www.baidu.com',
              },
              title: '所有留言',
              type: 'footer',
            },
          ],
        },
      },
      msgid: '62727fb8-0d5d-43e4-80db-7ce4080225f9',
      msgtype: 'fc.convo.ui',
      receivers: [],
      version: '1.0',
    },
  },
  {
    content: {
      body: '2344234',
      msgtype: 'm.text',
    },
  },
  {
    content: {
      body: '测123.mov',
      info: {
        duration: 5.066667,
        h: 300,
        mimetype: 'video/quicktime',
        size: 199688,
        thumbnail_info: {
          h: 202,
          mimetype: 'image/png',
          size: 36776,
          w: 400,
        },
        thumbnail_url: '5bf60e9eddb363000b95d2a5',
        w: 592,
      },
      msgtype: 'm.video',
      url: '5bf60bc5ddb363000b95d2a1',
    },
  },
  {
    content: {
      body: 'FinChat-SDK-Design.pdf',
      info: {
        mimetype: 'application/pdf',
        size: 695852,
      },
      msgtype: 'm.file',
      url: '5bf60a73ddb363000b95d29f',
    },
  },
  {
    content: {
      body: '一段录音',
      info: {
        mimetype: 'audio/ogg; codecs=opus',
        duration: 10185,
        wx: false,
        size: 65188,
      },
      msgtype: 'm.audio',
      url: 'mxc://finolabs.com.cn/WBenTfsRGtGCmcQktMNQYHWr',
    },
  },
  {
    content: {
      body: 'DJI_0766.JPG',
      info: {
        mimetype: 'image/jpeg',
        h: 3078,
        thumbnail_info: {
          h: 450,
          w: 800,
        },
        w: 5472,
        size: 44299,
      },
      msgtype: 'm.image',
      url: '5bf61ac3ddb363000b95d2a9',
    },
  },
  {
    content: {
      body: 'https://mp.weixin.qq.com/s/M0S0sxJy3oxhgsyqTcLpaQ',
      info: {
        description: '“2-1-1”，能否消灭996？',
        domain: 'mp.weixin.qq.com',
        image:
          'https://mmbiz.qpic.cn/mmbiz_jpg/LwZPmXjm4WzIN3CRicTkwfJThAMk3SWKyM9lVqEhpCQ4vvQ2YWmA6z6iaKKibEZRtDU2UhyQx31rvPfUnzUwbxR4g/640?wx_fmt=jpeg',
        source: '',
        title: '如何在2周内交付85%以上需求？阿里工程师这么做',
        url: 'https://mp.weixin.qq.com/s/M0S0sxJy3oxhgsyqTcLpaQ',
      },
      msgtype: 'm.url',
    },
  },
];

export default mockTimeline;
