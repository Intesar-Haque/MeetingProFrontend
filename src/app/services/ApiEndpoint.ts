export default class ApiEndpoint {
    static SOCKET_ENDPOINT = 'https://ds-meeting-socket.herokuapp.com';
    // static SOCKET_ENDPOINT = 'http://182.163.112.207:9001';
    static PEER_ENDPOINT = 'http://localhost:3001'
    // static PEER_ENDPOINT = 'http://182.163.112.207:9002';
    static SERVICE_ENDPOINT = 'http://localhost:8080';
//     static SERVICE_ENDPOINT = 'http://182.163.112.207:9003';
    // static MY_ADDRESS = 'http://182.163.112.207:9004';
    static MY_ADDRESS = 'https://datasoft-meeting.firebaseapp.com';

    static TURN_URI = 'https://global.xirsys.net/_turn/MeetingPro';
    static TURN_AUTH = 'Basic ' + btoa('intesar:e5f7e820-1afb-11ed-ba6b-0242ac150002');

    static GROUP_ENDPOINT = `${ApiEndpoint.SERVICE_ENDPOINT}/group`
    static MEETING_ENDPOINT = `${ApiEndpoint.SERVICE_ENDPOINT}/meeting`
}
