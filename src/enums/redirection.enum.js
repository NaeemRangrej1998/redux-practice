import roleEnum from "./role.enum";

export default {
    [roleEnum.CUSTOMER_ADMIN]: '/dashboard',
    [roleEnum.XT_ADMIN]: '/dashboard',
    [roleEnum.ADVANCE_USER]: '/dashboard',
    [roleEnum.STANDARD_USER]: '/dashboard',
    [roleEnum.XT_FACTORY_USER]: '/xt-admin/tcu-whitelisting',
    [roleEnum.XT_ADVANCE_USER]: '/dashboard',
    [roleEnum.XT_STANDARD_USER]: '/dashboard',
};