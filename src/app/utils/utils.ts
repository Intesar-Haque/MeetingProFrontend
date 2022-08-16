import { v4 as uuidV4 } from 'uuid';
export default class Utils {
    static genRoomId(): string {
        return uuidV4();
    }
    static getMediaStream(constraints?: MediaStreamConstraints): Promise<MediaStream> {
        return new Promise<MediaStream>((resolve, reject) => {
            navigator.mediaDevices.getUserMedia(constraints).then(stream => {
                resolve(stream);
            }).catch(() => {
                console.error('Failed to access camera/microphone');
                reject();
            })
        }
        )
    }
    static getUserStream(constraints?: MediaStreamConstraints): Promise<MediaStream> {
        return new Promise<MediaStream>((resolve, reject) => {
                // @ts-ignore
            navigator.mediaDevices.getDisplayMedia(constraints).then(stream => {
                    resolve(stream);
                }).catch(() => {
                    console.error('Failed to access display');
                    reject();
                })
            }
        )
    }
}