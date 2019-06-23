/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

assetsHelper.getCkeditorConfig = function() {
  var config = {};

  config.language = 'zh-cn';

  config.allowedContent = true;

  // config.entities = false;

  // config.height = 300;

  /**
   * 插件字体
   * @type {string}
   */
  config.font_names =
    '宋体/宋体;黑体/黑体;仿宋/仿宋_GB2312;楷体/楷体_GB2312;隶书/隶书;幼圆/幼圆;微软雅黑/微软雅黑;宋体/SimSun;' +
    '新宋体/NSimSun;仿宋_GB2312/FangSong_GB2312;楷体_GB2312/KaiTi_GB2312;黑体/SimHei;微软雅黑/Microsoft YaHei;幼圆/YouYuan;华文彩云/STCaiyun;华文行楷/STXingkai;' +
    '方正舒体/FZShuTi;方正姚体/FZYaoti;Arial;Comic Sans MS;Courier New;Georgia;Lucida Sans Unicode;Tahoma;Times New Roman;Trebuchet MS;Verdana;';
  /**
   * 插件默认字体
   * @type {string}
   */
  config.font_defaultLabel = '宋体';

  config.fontSize_defaultLabel = '16';

  /**
   * 工具栏是否可以被收缩
   * @type {boolean}
   */
  config.toolbarCanCollapse = true;

  config.resize_enabled = true;
  
  /**
   * 禁止图片上传完毕后自动填充长宽
   * @type {boolean}
   */
  config.image_prefillDimensions = false;

  /**
   * 字符统计插件
   * @type {{showParagraphs: boolean, showWordCount: boolean, showCharCount: boolean, countSpacesAsChars: boolean, countHTML: boolean, maxWordCount: number, maxCharCount: number, filter: *}}
   */
  config.wordcount = {
    // 段落统计
    showParagraphs: true,
    // 词数统计
    showWordCount: true,
    // 字数统计
    showCharCount: true,
    // 将空格计入字符
    countSpacesAsChars: false,
    // 统计html
    countHTML: false,
    // 最大词数 -1代表无上限
    maxWordCount: -1,
    // 最大字数 -1代表无上限
    maxCharCount: -1,
    // 移除关键词统计 类似mediaembed 节点之类，可以设置不统计
    filter: new CKEDITOR.htmlParser.filter({
      elements: {
        div: function(element) {
          if (element.attributes.class == 'mediaembed') {
            return false;
          }
        },
      },
    }),
  };

  config.toolbar = 'Full';

  config.toolbar_Full_ALL = [
    {
      name: 'document',
      items: [
        'Source',
        '-',
        'Save',
        'NewPage',
        'DocProps',
        'Preview',
        'Print',
        '-',
        'Templates',
      ],
    },
    {
      name: 'clipboard',
      items: [
        'Cut',
        'Copy',
        'Paste',
        'PasteText',
        'PasteFromWord',
        '-',
        'Undo',
        'Redo',
      ],
    },
    {
      name: 'editing',
      items: [
        'Find',
        'Replace',
        '-',
        'SelectAll',
        '-',
        'SpellChecker',
        'Scayt',
      ],
    },
    {
      name: 'forms',
      items: [
        'Form',
        'Checkbox',
        'Radio',
        'TextField',
        'Textarea',
        'Select',
        'Button',
        'ImageButton',
        'HiddenField',
      ],
    },
    '/',
    {
      name: 'basicstyles',
      items: [
        'Bold',
        'Italic',
        'Underline',
        'Strike',
        'Subscript',
        'Superscript',
        '-',
        'RemoveFormat',
      ],
    },
    {
      name: 'paragraph',
      items: [
        'NumberedList',
        'BulletedList',
        '-',
        'Outdent',
        'Indent',
        '-',
        'Blockquote',
        'CreateDiv',
        '-',
        'JustifyLeft',
        'JustifyCenter',
        'JustifyRight',
        'JustifyBlock',
        '-',
        'BidiLtr',
        'BidiRtl',
      ],
    },
    {
      name: 'links',
      items: ['Link', 'Unlink', 'Anchor'],
    },
    {
      name: 'insert',
      items: [
        'Image',
        'Flash',
        'Table',
        'HorizontalRule',
        'Smiley',
        'SpecialChar',
        'PageBreak',
        'Iframe',
      ],
    },
    '/',
    {
      name: 'styles',
      items: ['Styles', 'Format', 'Font', 'FontSize'],
    },
    {
      name: 'colors',
      items: ['TextColor', 'BGColor'],
    },
    {
      name: 'tools',
      items: ['Maximize', 'ShowBlocks'],
    },
  ];

  config.toolbar_Full = [
    {
      name: 'document',
      items: ['Source', '-'],
    },
    {
      name: 'clipboard',
      items: [
        'Cut',
        'Copy',
        'Paste',
        'PasteText',
        'PasteFromWord',
        '-',
        'Undo',
        'Redo',
      ],
    },
    {
      name: 'editing',
      items: ['Find', 'Replace', '-', 'SelectAll', '-'],
    },
    {
      name: 'basicstyles',
      items: [
        'Bold',
        'Italic',
        'Underline',
        'Strike',
        'Subscript',
        'Superscript',
        '-',
        'RemoveFormat',
      ],
    },
    {
      name: 'links',
      items: ['Link', 'Unlink'],
    },
    {
      name: 'insert',
      items: ['Image', 'Table', 'Smiley'],
    },
    '/',
    {
      name: 'styles',
      items: ['Styles', 'Format', 'Font', 'FontSize'],
    },
    {
      name: 'colors',
      items: ['TextColor', 'BGColor'],
    },
    {
      name: 'paragraph',
      items: [
        'NumberedList',
        'BulletedList',
        '-',
        'JustifyLeft',
        'JustifyCenter',
        'JustifyRight',
        'JustifyBlock',
      ],
    },
    {
      name: 'tools',
      items: ['Maximize'],
    },
  ];

  config.toolbar_Basic = [
    [
      'Bold',
      'Italic',
      '-',
      'NumberedList',
      'BulletedList',
      '-',
      'Link',
      'Unlink',
    ],
    ['Format', 'Font', 'FontSize']
  ];

  // Remove some buttons provided by the standard plugins, which are
  // not needed in the Standard(s) toolbar.
  config.removeButtons = 'Underline,Subscript,Superscript';

  // Set the most common block elements.
  config.format_tags = 'p;h1;h2;h3;pre';

  // Simplify the dialog windows.
  config.removeDialogTabs = 'image:advanced;link:advanced';

  config.image_previewText = ' ';

  // 文件上传路径
  config.filebrowserUploadUrl = '/file/upload/ckeditor';

  // 图片上传后端url
  config.filebrowserImageUploadUrl = '/file/upload/ckeditor';

  config.extraPlugins = 'table,tableresizerowandcolumn,tableresize';

  return config;
};

$(function() {
  CKEDITOR.editorConfig = function(config) {
    // Define changes to default configuration here.
    // For complete reference see:
    // https://docs.ckeditor.com/ckeditor4/latest/api/CKEDITOR_config.html
    Object.assign(config, assetsHelper.getCkeditorConfig());
  };
});
