import { environment } from '../../environments/environment';

export class ApiConstant {

    private static WEB_PREFIX = environment.apiUrl + '/api';

    static AUTH_LOGIN = ApiConstant.WEB_PREFIX + '/auth/token';
    static AUTH_AUTHORIZED = ApiConstant.WEB_PREFIX + '/auth/authenticated';

    static METRICS = ApiConstant.WEB_PREFIX + '/metrics';
    static LOGOUT = ApiConstant.WEB_PREFIX + '/logout';

    static WEBRTC_URL = environment.webrtcUrl;
}
