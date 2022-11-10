export default class ApiEndpoint {
    static MY_ADDRESS = 'https://ec2-13-126-235-201.ap-south-1.compute.amazonaws.com';
    static SOCKET_ENDPOINT = `${ApiEndpoint.MY_ADDRESS}`;
    static PEER_ENDPOINT = `${ApiEndpoint.MY_ADDRESS}/peer`;

    static TURN_URI = 'https://global.xirsys.net/_turn/MeetingPro';
    static TURN_AUTH = 'Basic ' + btoa('poipoipoi:e060d35a-6000-11ed-9f51-0242ac130002');
    static SERVICE_ENDPOINT = `${ApiEndpoint.MY_ADDRESS}/server`;
    static GROUP_ENDPOINT = `${ApiEndpoint.SERVICE_ENDPOINT}/group`
    static MEETING_ENDPOINT = `${ApiEndpoint.SERVICE_ENDPOINT}/meeting`
}
