/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

assetsHelper.getCkeditorConfig = function () {
  var config = {};

  config.language = 'zh-cn';

  config.allowedContent = true;

  // config.entities = false;

  // config.height = 300;

  config.fontSize_defaultLabel = '16';

  config.toolbar = 'Full';

  config.toolbar_Full_ALL = [{
      name: 'document',
      items: ['Source', '-', 'Save', 'NewPage', 'DocProps', 'Preview', 'Print', '-', 'Templates']
    },
    {
      name: 'clipboard',
      items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']
    },
    {
      name: 'editing',
      items: ['Find', 'Replace', '-', 'SelectAll', '-', 'SpellChecker', 'Scayt']
    },
    {
      name: 'forms',
      items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton',
        'HiddenField'
      ]
    },
    '/',
    {
      name: 'basicstyles',
      items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']
    },
    {
      name: 'paragraph',
      items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv',
        '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl'
      ]
    },
    {
      name: 'links',
      items: ['Link', 'Unlink', 'Anchor']
    },
    {
      name: 'insert',
      items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe']
    },
    '/',
    {
      name: 'styles',
      items: ['Styles', 'Format', 'Font', 'FontSize']
    },
    {
      name: 'colors',
      items: ['TextColor', 'BGColor']
    },
    {
      name: 'tools',
      items: ['Maximize', 'ShowBlocks']
    }
  ];

  config.toolbar_Full = [{
      name: 'document',
      items: ['Source', '-', 'DocProps', 'Preview', 'Print', '-']
    },
    {
      name: 'clipboard',
      items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']
    },
    {
      name: 'editing',
      items: ['Find', 'Replace', '-', 'SelectAll', '-']
    },
    {
      name: 'basicstyles',
      items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']
    },
    {
      name: 'links',
      items: ['Link', 'Unlink', 'Anchor']
    },
    {
      name: 'insert',
      items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak']
    },
    '/',
    {
      name: 'styles',
      items: ['Styles', 'Format', 'Font', 'FontSize']
    },
    {
      name: 'colors',
      items: ['TextColor', 'BGColor']
    },
    {
      name: 'paragraph',
      items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl']
    },
    {
      name: 'tools',
      items: ['Maximize', 'ShowBlocks']
    }
  ];

  config.toolbar_Basic = [
    ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink']
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

  config.extraPlugins = 'divarea';

  return config;
}

CKEDITOR.editorConfig = function (config) {
  // Define changes to default configuration here.
  // For complete reference see:
  // https://docs.ckeditor.com/ckeditor4/latest/api/CKEDITOR_config.html
  Object.assign(config, assetsHelper.getCkeditorConfig());
};
