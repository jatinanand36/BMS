const PARAM = 'params';
const QUERY = 'query';
const BODY = 'body';
const ERROR = 'error';
const ALERTMODULE = 'alert';
const REQUESTMODULE = 'request';
const ADDUSERMODULE = 'adduser';
const CONNECTED = 'connected';
const HEX = 'hex';
const MP = 'MP';
const TE = 'TE';
const GET = 'GET';
const HEAD = 'HEAD';
const PUT = 'PUT';
const PATCH = 'PATCH';
const POST = 'POST';
const DELETE = 'DELETE';
const IMS = 'IMS';
const REGASK = 'Regask';
const JWT_SECRET = 'JWT_SECRET';
const TOKEN_EXPIRY = 'TOKEN_EXPIRY';
const REGASK_URL = 'REGASK_URL';
const SUCCESS = 'success';
const AUTHORIZATION = 'authorization';
const COGNITOREGASK = 'cognito@regask.com';
const EXPERT = 'expert';
const MANAGER = 'manager';
const ADMIN = 'admin';
const CLIENT = 'client';
const EXTERNALEXPERT = 'externalexpert';
const ROLE = 'role';
const SESSION_SECRET = 'SESSION_SECRET';
const CERT_PATH = 'CERT_PATH';
const PASSPHRASE = 'PASSPHRASE';
const HTTP_CODES = { 'SUCCESS': 200, 'NOTFOUND': 404, 'BADREQUEST': 400, 'INTERNALERROR': 500, 'UNAUTHORIZE': 401, 'NOCONTENT': 204, 'FORBIDDEN': 403 }
const DUMMY_CANDIDATE_PASSWORD = '$2a$10$pWSC3X.xBhHH8mDF0DvN6e8BHwsSY8hv7LQZbSNfK4Xc7QeL.5zHq';
const USER_CONSTANTS_WITH_ALL_FIELDS = ['username', 'firstname', 'lastname', 'phone', 'ex', 'location', 'role', 'company', 'industry', 'password', 'monitoring_countries', 'pointOfContact', 'setting'];
const USER_PAYLOAD = {
    'username': 'manager@regask.com',
    'firstname': 'RegAsk',
    'lastname': 'Manager',
    'phone': '12345678',
    'ex': 'US',
    'location': [
        {
            '_id': '5e91d0dd02b6992eb422d099',
            'code': 'AO',
            'url': 'angola',
            'name': 'Angola',
            'latitude': '-12.5',
            'longitude': '18.5',
            'parent_regions': [],
            'region_level': '1'
        }
    ],
    'role': 'Manager',
    'company': 'RegAsk',
    'industry': {
        'name': 'Care/Cosmetic',
        'id': '5efaf438cf2efa72b8a19ba6'
    }
} 

module.exports = {
    PARAM,QUERY,BODY,ERROR,ALERTMODULE,REQUESTMODULE,ADDUSERMODULE,HEX,MP,TE,GET,HEAD,PUT,PATCH,POST,
    DELETE,IMS,REGASK,JWT_SECRET,TOKEN_EXPIRY,REGASK_URL,SUCCESS,AUTHORIZATION,COGNITOREGASK,
    EXPERT,MANAGER,ADMIN,CLIENT,EXTERNALEXPERT,ROLE,SESSION_SECRET,CERT_PATH,PASSPHRASE,HTTP_CODES, 
    DUMMY_CANDIDATE_PASSWORD, USER_CONSTANTS_WITH_ALL_FIELDS, USER_PAYLOAD, CONNECTED
}

