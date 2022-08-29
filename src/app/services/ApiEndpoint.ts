export default class ApiEndpoint {
    static SOCKET_ENDPOINT = 'https://ds-meeting-socket.herokuapp.com';
    static PEER_ENDPOINT = 'https://ds-meeting-peer.herokuapp.com'
    static MY_ADDRESS = 'https://datasoft-meeting.web.app';

    static TURN_URI = 'https://global.xirsys.net/_turn/MeetingPro';
    static TURN_AUTH = 'Basic ' + btoa('intesar:e5f7e820-1afb-11ed-ba6b-0242ac150002');

    static SERVICE_ENDPOINT = 'https://ds-meeting-backend.herokuapp.com';
    // static SERVICE_ENDPOINT = 'http://localhost:8080';
    static GROUP_ENDPOINT = `${ApiEndpoint.SERVICE_ENDPOINT}/group`
    static MEETING_ENDPOINT = `${ApiEndpoint.SERVICE_ENDPOINT}/meeting`
}
