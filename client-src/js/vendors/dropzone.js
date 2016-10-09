if (module.hot) {
    module.hot.accept()
}


export const dropzone = require('dropzone')
dropzone.autoDiscover = false;
dropzone.prototype.defaultOptions.dictDefaultMessage = "拖拽文件或者点击此处上传";
dropzone.prototype.defaultOptions.dictFallbackMessage = "您的浏览器不支持拖拽文件上传";
dropzone.prototype.defaultOptions.dictFallbackText = "Please use the fallback form below to upload your files like in the olden days.";
dropzone.prototype.defaultOptions.dictFileTooBig = "文件太大({{filesize}}MiB). 最大文件:{{maxFilesize}}MiB.";
dropzone.prototype.defaultOptions.dictInvalidFileType = "您不能上传此类型的文件";
dropzone.prototype.defaultOptions.dictResponseError = "服务器响应代码{{statusCode}}";
dropzone.prototype.defaultOptions.dictCancelUpload = "取消上传";
dropzone.prototype.defaultOptions.dictCancelUploadConfirmation = "确定取消该文件的上传?";
dropzone.prototype.defaultOptions.dictRemoveFile = "移除文件";
dropzone.prototype.defaultOptions.dictMaxFilesExceeded = "您不能上传更多文件";
 