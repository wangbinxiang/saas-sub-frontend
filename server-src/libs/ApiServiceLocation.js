import config from 'config';

function prefixApiServiceLocation() {
    return 'apiServiceLocation.';
}

function getServiceLcation(serviceName) {
    let serviceLocation = prefixApiServiceLocation() + serviceName;
    return config.get(serviceLocation);
}

/**
 * saas微服务地址
 * @author wangbinxiang
 * @date   2016-09-12T20:35:12+0800
 * @return {[type]}                 [description]
 */
export function saasApiServiceLocation() {
    const saas = 'saas';
    return getServiceLcation(saas);
}

/**
 * attachment微服务地址
 * @author wangbinxiang
 * @date   2016-09-12T20:35:22+0800
 * @return {[type]}                 [description]
 */
export function attachmentApiServiceLocation() {
    const attachmentLocation = 'attachment';
    return getServiceLcation(attachmentLocation);
}


export function notifyApiServiceLocation() {
    const notifyLocation = 'notify';
    return getServiceLcation(notifyLocation);
}


export function productApiServiceLocation() {
    const productLocation = 'product';
    return getServiceLcation(productLocation);
}

export function memberApiServiceLocation() {
    const memberLocation = 'member';
    return getServiceLcation(memberLocation);
}

export function orderApiServiceLocation() {
    const orderLocation = 'order';
    return getServiceLcation(orderLocation);
}

export function shopApiServiceLocation() {
    const locationName = 'shop';
    return getServiceLcation(locationName);
}

export function cmsApiServiceLocation() {
    const locationName = 'cms';
    return getServiceLcation(locationName);
}