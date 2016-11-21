/**
 * Created by Administrator on 2016/8/13.
 */
var baseUrl = '/ims';
module.exports = {
    /**
     * order
     */
    FIND_ORDERS : baseUrl + '/orders/findList',
    SAVE_ORDER : baseUrl + '/orders/save',
    DEL_ORDER : baseUrl + '/orders/delete',
    EXPORT_ORDER : baseUrl + '/orders/export',


    /**
     * menus
     */
    FIND_RESOURCE_LIST : baseUrl + "/role/findResourceList",
    SAVE_RESOURCES : baseUrl + "/role/save",
    DEL_RESOURCES : baseUrl + "/role/deleteMul",
    GET_ROLES : baseUrl + "/role/getRoles",
    GET_MENUS : baseUrl + "/role/getMenus",

    /**
     * users
     */

    ASS_RESOURCES : baseUrl + "/user/assRole",
    FIND_USER_LIST : baseUrl + "/user/findList",
    FIND_USER_BY_ID : baseUrl + "/user/findById",
    SAVE_USER : baseUrl + "/user/save",
    DEL_USERS : baseUrl + "/user/deleteMul",
    RESET_PWD : baseUrl + "/user/resetPwd",
    FIND_USER_ROLES : baseUrl + "/user/findUserRoles",
    CHANGE_PWD : baseUrl + "/user/changePwd",

    /**
     * role
     */
    FIND_ROLE_LIST : baseUrl + "/role/findRoleList",
    FIND_ROLE_RESOURCE_LIST : baseUrl + "/role/findRoleResourceList",
    SAVE_ROLE : baseUrl + "/role/saveRole",
    DEL_ROLE : baseUrl + "/role/deleteRoleMul",
    FIND_ROLE_BY_ID : baseUrl + "/role/findRoleById",
    SAVE_ROLE_RESOURCE : baseUrl + "/role/saveRoleResource",


    /**
     * client
     */
    FIND_CLIENT_LIST : baseUrl + "/client/findList",
    FIND_CLIENT_BY_ID : baseUrl + "/client/findById",
    FIND_CLIENT_BY_CON : baseUrl + "/client/findClientCon",
    SAVE_CLIENT : baseUrl + "/client/save",
    DEL_CLIENT : baseUrl + "/client/deleteMul",
    // CHECK_CLIENT_REPEAT : baseUrl + "/client/checkRepeat",

    /**
     * level
     */
    FIND_LEVEL_LIST : baseUrl + "/level/findList",


    /**
     * game
     */
    FIND_GAME_LIST : baseUrl + "/game/findList",
    FIND_GAME_BY_ID : baseUrl + "/game/findById",
    SAVE_GAME : baseUrl + "/game/save",
    DEL_GAME : baseUrl + "/game/deleteMul",
    SEARCH_GAME : baseUrl + "/game/search",


    /**
     *  platform
     */
    FIND_PLATFORM_LIST : baseUrl + "/platform/findList",
    FIND_PLATFORM_BY_ID : baseUrl + "/platform/findById",
    SAVE_PLATFORM : baseUrl + "/platform/save",
    DEL_PLATFORM : baseUrl + "/platform/deleteMul",
    SEARCH_PLATFORM : baseUrl + "/platform/search",

    /**
     *  trading
     */
    FIND_TRADING_LIST : baseUrl + "/trading/findList",
    FIND_TRADING_BY_ID : baseUrl + "/trading/findById",
    SAVE_TRADING : baseUrl + "/trading/save",
    DEL_TRADING : baseUrl + "/trading/deleteMul",


    /**
     *  discount
     */
    FIND_DISCOUNT_LIST : baseUrl + "/discount/findList",
    QUERY_DISCOUNT : baseUrl + "/discount/queryDiscount",
    SAVE_DISCOUNT : baseUrl + "/discount/save",
    DEL_DISCOUNT : baseUrl + "/discount/deleteMul",

    /**
     * account
     */
    FIND_ACCOUNT_LIST : baseUrl + "/account/findList",
    FIND_ACCOUNT_BY_ID : baseUrl + "/account/findById",
    FIND_ACCOUNT_BY_NAME : baseUrl + "/account/findListByName",
    SAVE_ACCOUNT : baseUrl + "/account/save",
    DEL_ACCOUNT : baseUrl + "/account/deleteMul",

    /**
     * statistics
     */
    STATISTICS : baseUrl + "/statistics/statistics",
    STATISTICS_ALL : baseUrl + "/statistics/statisticsAll"
}