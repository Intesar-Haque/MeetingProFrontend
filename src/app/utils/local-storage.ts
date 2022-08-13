export default class LocalStorageUtil {

    public static setInfo(key:string, value:any) {
        localStorage.setItem(key, value)
    }

    public static getString(key): string {
        return localStorage.getItem(key);
    }

    public static getJson(key) {
        return JSON.parse(JSON.stringify(localStorage.getItem(key)));
    }
}