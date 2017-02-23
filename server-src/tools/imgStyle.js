import config from 'config';
import {
    inWehcat
} from './wechat';


export function slideStyle(ctx) {
	if (inWehcat(ctx)) {
		return config.get('qiniu.bucket.subImg.style.w640h427jpgslim');
	} else {
		return config.get('qiniu.bucket.subImg.style.w640h427jpg');
	}
}

export function slideOneStyle(ctx) {
	if (inWehcat(ctx)) {
		return config.get('qiniu.bucket.subImg.style.w640jpgslim');
	} else {
		return config.get('qiniu.bucket.subImg.style.w1980jpg');
	}
}

export function listStyle(ctx) {
	if (inWehcat(ctx)) {
		return config.get('qiniu.bucket.subImg.style.w640jpgslim');
	} else {
		return config.get('qiniu.bucket.subImg.style.w640jpg');
	}
}

export function detailSlideStyle(ctx) {
	if (inWehcat(ctx)) {
		return config.get('qiniu.bucket.subImg.style.w1200jpgslim');
	} else {
		return config.get('qiniu.bucket.subImg.style.w640jpg');
	}
}

export function detailStyle(ctx) {
	if (inWehcat(ctx)) {
		return config.get('qiniu.bucket.subImg.style.w1200jpgslim');
	} else {
		return config.get('qiniu.bucket.subImg.style.w1200jpg');
	}
}

