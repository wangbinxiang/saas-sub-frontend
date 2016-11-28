export const REGISTER_CODE = Symbol();
export const BIND_CELLPHONE_CODE = Symbol();


const verificationCodeNameList = {
    [REGISTER_CODE]: 'REGISTER_CODE',
    [BIND_CELLPHONE_CODE]: 'BIND_CELLPHONE_CODE'
};

export default verificationCodeNameList;

