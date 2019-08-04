import { environment } from '../../environments/environment';

export class ApiConstant {

    private static WEB_PREFIX = environment.apiUrl + '/api';

    static AUTH_LOGIN = ApiConstant.WEB_PREFIX + '/auth/login';
    static METRICS = ApiConstant.WEB_PREFIX + '/metrics';
    static LOGOUT = ApiConstant.WEB_PREFIX + '/logout';

    static WEBRTC_URL = environment.webrtcUrl;
}
