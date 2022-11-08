export default class ApiEndpoint {
    static MY_ADDRESS = 'https://65.2.156.144';
    static SOCKET_ENDPOINT = `${ApiEndpoint.MY_ADDRESS}`;
    static PEER_ENDPOINT = `${ApiEndpoint.MY_ADDRESS}/peer`;

    static TURN_URI = 'https://global.xirsys.net/_turn/MeetingPro';
    static TURN_AUTH = 'Basic ' + btoa('intesar:e5f7e820-1afb-11ed-ba6b-0242ac150002');
    static SERVICE_ENDPOINT = `${ApiEndpoint.MY_ADDRESS}/server`;
    static GROUP_ENDPOINT = `${ApiEndpoint.SERVICE_ENDPOINT}/group`
    static MEETING_ENDPOINT = `${ApiEndpoint.SERVICE_ENDPOINT}/meeting`
}
