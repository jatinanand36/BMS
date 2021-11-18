const { TE, MP, USER_CONSTANTS_WITH_ALL_FIELDS, USER_PAYLOAD, DUMMY_CANDIDATE_PASSWORD } = require('../../constants/constants');
const { 
    getEncryptedPassword,
    randomOrTempPasswordGenerate,
    createUserPayload 
} = require('../../src/utils/accountUtil');

const tempPassword = randomOrTempPasswordGenerate(10,8);
const encryptedPassword = getEncryptedPassword(tempPassword);

test('randomOrTempPasswordGenerate', ()=>{
   let hasTE = tempPassword.startsWith(TE);
   let hasMP = tempPassword.endsWith(MP);
   // Here, we test required prefix and suffix. 
   expect(hasTE).toEqual(true);
   expect(hasMP).toEqual(true); 
}); 

test('getEncryptedPassword', ()=>{
    let hasLengthAndDollarSign = encryptedPassword.includes('$');
    // Here, we test required length of encrypted password.
    expect(hasLengthAndDollarSign).toEqual(true);
}); 

test('createUserPayload', async ()=>{
    USER_PAYLOAD.password = tempPassword;
    let userPayload = await createUserPayload(USER_PAYLOAD);
    // Here, we test number of keys of user payload, compare keys of new user payload with defined payload, length of new password and required key like optedAlertEmail.
    let isOk = ((Object.keys(userPayload).length === 13) && (JSON.stringify(Object.keys(userPayload).keys) === JSON.stringify(Object.keys(USER_CONSTANTS_WITH_ALL_FIELDS).keys)) &&
               (userPayload.password && userPayload.password.length > tempPassword.length) &&  (userPayload.setting && userPayload.setting.optedAlertEmail));
    expect(isOk).toEqual(true);
}); 


 
