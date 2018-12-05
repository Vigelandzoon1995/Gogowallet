import Coordinate from "./coordinate";

export default class Location {
    id: number = null;
    user_id: number = null;
    device_id: number = null;
    timestamp: Date = null;
    coordinates: Coordinate = null;
}
